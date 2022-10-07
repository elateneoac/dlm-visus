<template>
    <div class="container-fluid">
        <div class="row">
            <div class="form-check form-switch">
                <input v-model="por_medios" class="form-check-input" type="checkbox" id="por_medios">
                <label class="form-check-label" for="por_medios">agrupar por <strong>medios</strong></label>
            </div>
            <div class="form-check form-switch">
                <input v-model="por_fechas" class="form-check-input" type="checkbox" id="por_fechas">
                <label class="form-check-label" for="por_fechas">agrupar por <strong>fechas</strong></label>
            </div>
        </div>
        <div class="row">
            <lineas
            :df="this.dfs.a_dibujar"
            x="fecha"
            y="freq"
            z="diario"
            :margen="this.margen"
            :alto="this.alto"
            :ancho="this.ancho"
            :estetica="this.medios"/>
        </div>
    </div>
</template>

<script>

import Lineas from './modelos/Lineas.vue'

import { estetica } from '../stores/estetica'

import { mapState } from 'pinia'

import * as d3 from 'd3';

export default {

    components: { Lineas },

    created() {
        this.leer_csv();
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
            por_medios : false,
            por_fechas : false,
            dfs : {
                original : null,
                a_dibujar : null,
                por_medios : null,
                por_fechas : null
            }
        }
    },

    watch: {
        por_medios(nuevo, viejo) {
            if (nuevo) {
                this.dfs.a_dibujar = this.dfs.por_medios
            } else {
                this.dfs.a_dibujar = this.dfs.original
            }
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
            d3.csv("./topicos-fecha-diario-seccion_2022-09-14-20:20:58.csv")
            .then( (data) => {
                this.dfs.original = []

                
                var mapa = {}
                data.forEach( (d) => {
                    this.dfs.original.push({ ...d, ['fecha']: new Date(d.fecha), ['freq'] : Number(d.freq)});
                    
                    const clave_fecha = d.fecha
                    const clave_medio = d.diario
                    const clave_fecha_diario = d.fecha + '_' + d.diario
                    if (!(clave_fecha_diario in mapa)) {
                        mapa[clave_fecha_diario] = 0
                    }

                    mapa[clave_fecha_diario] += Number(d.freq)
                })
                
                this.dfs.por_medios = []
                for(const d of Object.entries(mapa)) {
                    const fecha = d[0].split('_')[0]
                    const diario = d[0].split('_')[1]

                    this.dfs.por_medios.push({ ['fecha'] : new Date(fecha), ['diario']: diario, ['freq'] : Number(d[1]) })
                }
                this.dfs.a_dibujar = this.dfs.original
            } );
        },
    }
}
</script>
