<template>

    <div class="input-group mb-3">
        <span class="input-group-text">Path de csv a visualizar</span>
        <input v-model.lazy="path_csv" type="text" class="form-control">
    </div>

    <lineas
    v-if="this.df"
    :df="this.df"
    x="fecha"
    y="freq"
    z="topico"
    :margen="this.margen"
    :alto="this.alto"
    :ancho="this.ancho"
    :estetica="this.estetica"/>
</template>

<script>

import Lineas from '../components/modelos/Lineas.vue'

import * as d3 from 'd3';

import { estetica } from '../stores/estetica'

import { mapState } from 'pinia'

export default {

    components: { Lineas },

    watch: {
        path_csv(nuevo, viejo) {
            this.leer_csv();
        }
    },

    data() {
        return {
            margen :{
                techo: 20,
                derecha: 20,
                piso: 30,
                izquierda: 30
            },
            alto : 700,
            ancho : 900,
            df : null,
            path_csv : '',
            topicos : null
        }
    },

    computed: {
        ...mapState(estetica, ['medios'])
    },

    methods: {
        descargar() {
            download();
        },

        leer_csv() {
            d3.csv(this.path_csv)
            .then( (data) => {

                // armo frecuencia por fecha y diario:
                var mapa = {}
                data.forEach( (d) => {
                    const clave_fecha_topico = d.fecha + '_' + d.topico
                    if (!(clave_fecha_topico in mapa)) {
                        mapa[clave_fecha_topico] = 0
                    }

                    mapa[clave_fecha_topico] += Number(d.freq)
                })
                                
                if (Object.keys(mapa).length == 0) {
                    alert("No se pudo cargar el csv.")
                    this.df = null
                    return;
                }
                
                // armo df para pasarle a la visu 'lineas'
                this.df = []
                this.estetica = {}
                var i = 0
                for(const d of Object.entries(mapa)) {
                    const fecha = d[0].split('_')[0]
                    const topico = d[0].split('_')[1]

                    if (!(topico in this.estetica)) {
                        this.estetica[topico] = {
                            'nombre' : topico,
                            'color' : d3.schemeTableau10[i],
                            'mostrar' : true
                        }
                        i = i + 1
                    }

                    this.df.push({ ['fecha'] : new Date(fecha), ['topico']: topico, ['freq'] : Number(d[1]) })
                }
            } );
        },
    }
}
</script>
