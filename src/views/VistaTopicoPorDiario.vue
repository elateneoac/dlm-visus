<template>
    <div class="container">
        <div class="input-group mb-3">
            <!-- <span class="input-group-text">csv</span>
            <input v-model.lazy="path_csv" type="text" class="form-control"> -->
            <input class="input-csv" type="file" accept=".csv" @change="cargar">
        </div>

        <lienzo-control v-if="this.df" v-model="this.controles.lienzo"/>
    </div>

    <chupetes
    v-if="this.df"
    :df="this.df"
    x="freq"
    y="diario"
    :margen="this.controles.lienzo.margen"
    :alto="this.controles.lienzo.alto"
    :ancho="this.controles.lienzo.ancho"
    :estetica="this.medios"/>
</template>

<script>

import LienzoControl from '../components/controles/LienzoControl.vue'
import Chupetes from '../components/modelos/Chupetes.vue'

import { estetica } from '../stores/estetica'

import { mapState } from 'pinia'

import * as d3 from 'd3';

export default {

    components: { Chupetes, LienzoControl },

    watch: {
        path_csv(nuevo, viejo) {
            this.leer_csv();
        },
        controles : {
            handler(nuevos, viejos) {
                this.df = this.df.filter(d => true)
            },
            deep: true
        },
    },

    data() {
        return {
            controles: {
                lienzo: {
                    alto : 1080,
                    ancho : 1080,
                    margen :{
                        techo: 90,
                        derecha: 40,
                        piso: 50,
                        izquierda: 150
                    }
                },
            },
            df : null,
            path_csv : '',
        }
    },
    
    computed: {
        ...mapState(estetica, ['medios'])
    },

    methods: {
        cargar(evento) {
            const file = evento.target.files[0]
            const reader = new FileReader()
            reader.onload = () => {
                const dataUrl = reader.result;
                this.leer_csv(dataUrl);
            }
            reader.readAsDataURL(file)
        },

        leer_csv(path) {
            d3.csv(path)
            .then( (data) => {
                
                // armo frecuencia por fecha y diario:
                var mapa = {}
                data.forEach( (d) => {                    
                    const clave_diario = d.diario

                    if (clave_diario == undefined) return;

                    if (!(clave_diario in mapa)) {
                        mapa[clave_diario] = 0
                    }

                    mapa[clave_diario] += Number(d.freq)
                })
                
                if (Object.keys(mapa).length == 0) {
                    alert("No se pudo cargar el csv.")
                    this.df = null
                    return;
                }

                // armo df para pasarle a la visu 'lienas'
                this.df = []
                for(const d of Object.entries(mapa)) {
                    const diario = d[0]

                    this.df.push({ ['diario'] : diario, ['freq'] : Number(d[1]) })
                }
                this.vacio = false
            } );
        },
    }
}
</script>
