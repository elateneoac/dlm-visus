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
    z="diario"
    :margen="this.margen"
    :alto="this.alto"
    :ancho="this.ancho"
    :estetica="this.medios"/>
</template>

<script>

import Lineas from '../components/modelos/Lineas.vue'

import { estetica } from '../stores/estetica'

import { mapState } from 'pinia'

import * as d3 from 'd3';

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
            path_csv : ''
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
                    const clave_fecha_diario = d.fecha + '_' + d.diario
                    if (!(clave_fecha_diario in mapa)) {
                        mapa[clave_fecha_diario] = 0
                    }

                    mapa[clave_fecha_diario] += Number(d.freq)
                })
                
                // armo df para pasarle a la visu 'lienas'
                this.df = []
                for(const d of Object.entries(mapa)) {
                    const fecha = d[0].split('_')[0]
                    const diario = d[0].split('_')[1]

                    this.df.push({ ['fecha'] : new Date(fecha), ['diario']: diario, ['freq'] : Number(d[1]) })
                }
            } );
        },
    }
}
</script>
