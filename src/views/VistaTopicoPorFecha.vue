<template>
    <div class="container">
        <div class="input-group mb-3">
            <span class="input-group-text">Path de csv a visualizar</span>
            <input v-model.lazy="path_csv" type="text" class="form-control">
        </div>
        <lienzo-control v-if="this.df" v-model="this.controles.lienzo"/>
    </div>

    <lineas
    v-if="this.df"
    :df="this.df"
    x="fecha"
    y="freq"
    :margen="this.controles.lienzo.margen"
    :alto="this.controles.lienzo.alto"
    :ancho="this.controles.lienzo.ancho"
    :estetica="this.medios"/>
</template>

<script>

import LienzoControl from '../components/controles/LienzoControl.vue'
import Lineas from '../components/modelos/Lineas.vue'

import * as d3 from 'd3';

export default {

    components: { Lineas, LienzoControl },

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
                    alto : 700,
                    ancho : 900,
                    margen :{
                        techo: 20,
                        derecha: 20,
                        piso: 30,
                        izquierda: 80
                    }
                },
            },
            df : null,
            path_csv : '',
        }
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
                    const clave_fecha = d.fecha
                    if (!(clave_fecha in mapa)) {
                        mapa[clave_fecha] = 0
                    }

                    mapa[clave_fecha] += Number(d.freq)
                })
                
                // armo df para pasarle a la visu 'lienas'
                this.df = []
                for(const d of Object.entries(mapa)) {
                    const fecha = d[0]

                    this.df.push({ ['fecha'] : new Date(fecha), ['freq'] : Number(d[1]) })
                }
            } );
        },
    }
}
</script>
