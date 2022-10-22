<template>
    <div class="container">
        <div class="row mb-3">
            <div v-if="true" class="col-6">
                <div class="input-group mb-3">
                    <span class="input-group-text">csv</span>
                    <input v-model.lazy="path_csv" type="text" class="form-control">
                </div>
            </div>
            <div v-if="this.df" class="col-12">
                <div class="input-group mb-3">
                    <span class="input-group-text"><strong>a medir</strong></span>
                    <select v-model.lazy="variable" class="form-select">
                        <option value="freq" selected>tweets publicados</option>
                        <option value="rts">retweets recibidos</option>
                        <option value="rtas">respuestas recibidas</option>
                        <option value="mgs">me gustas recibidos</option>
                        <option value="qts">citaciones (quotes) recibidas</option>
                    </select>
                </div>
            </div>
        </div>

        <lienzo-control v-if="this.df" v-model="this.controles.lienzo"/>

    </div>

    <lineas
    v-if="this.df"
    :df="this.df"
    x="fecha"
    y="a_medir"
    z="usuario"
    :margen="this.controles.lienzo.margen"
    :alto="this.controles.lienzo.alto"
    :ancho="this.controles.lienzo.ancho"
    :estetica="this.estetica"/>
</template>

<script>

import LienzoControl from '../components/controles/LienzoControl.vue'
import Lineas from '../components/modelos/Lineas.vue'

import * as d3 from 'd3';

import { estetica } from '../stores/estetica'

import { mapState } from 'pinia'

export default {

    components: { Lineas, LienzoControl },

    created() {
        this.leer_csv();
    },

    watch: {
        path_csv(nuevo, viejo) {
            this.leer_csv();
        },
        variable(nuevo, viejo) {
            if (this.path_csv) {
                this.df = this.df.map(d => ({ ...d, ['a_medir'] : d[this.variable]}))
            }
        },
        controles : {
            handler(nuevos, viejos) {
                this.df = this.df.map(d => ({ ...d, ['a_medir'] : d[this.variable]}))
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
            // path_csv : 'tweets.csv',
            path_csv : null,
            variable : undefined,
            estetica : null
        }
    },

    methods: {
        leer_csv() {
            d3.csv(this.path_csv)
            .then( (data) => {

                // armo frecuencia por fecha y usuario:
                var mapa = {}
                var fechas = []
                var usuarios = []
                data.forEach( (d) => {
                    const fecha = d.fecha.substring(0,10)
                    const clave_fecha_usuario = fecha + '_' + d.usuario
                    if (!(clave_fecha_usuario in mapa)) {
                        mapa[clave_fecha_usuario] = {'freq' : 0, 'rts' : 0, 'rtas' : 0, 'mgs' : 0, 'qts' : 0}
                    }

                    if (!(fecha in fechas)) fechas.push(fecha)
                    if (!(d.usuario in usuarios)) usuarios.push(d.usuario)

                    mapa[clave_fecha_usuario].freq += 1
                    mapa[clave_fecha_usuario].rts += Number(d.rts)
                    mapa[clave_fecha_usuario].rtas += Number(d.rtas)
                    mapa[clave_fecha_usuario].mgs += Number(d.mgs)
                    mapa[clave_fecha_usuario].qts += Number(d.qts)
                })

                // completo con 0 los fecha_usuario q no existen
                for(const fecha of fechas) {
                    for(const usuario of usuarios) {
                        const clave_fecha_usuario = fecha + '_' + usuario
                        if (!(clave_fecha_usuario in mapa)) {
                            mapa[clave_fecha_usuario] = {'freq' : 0, 'rts' : 0, 'rtas' : 0, 'mgs' : 0, 'qts' : 0}
                        }   
                    }
                }

                // armo df para pasarle a la visu 'lineas'
                this.df = []
                this.estetica = {}
                var i = 0
                for(const d of Object.entries(mapa)) {
                    const fecha = d[0].split('_')[0]
                    const usuario = d[0].split('_')[1]

                    if (!(usuario in this.estetica)) {
                        this.estetica[usuario] = {
                            'nombre' : usuario,
                            'color' : d3.schemeTableau10[i % 10],
                            'mostrar' : true
                        }
                        i = i + 1
                    }

                    this.df.push({
                        ['fecha'] : new Date(fecha), ['usuario']: usuario,
                        ['a_medir'] : Number(d[1][this.variable]),
                        ['freq'] : Number(d[1]['freq']),
                        ['rts'] : Number(d[1]['rts']),
                        ['rtas'] : Number(d[1]['rtas']),
                        ['mgs'] : Number(d[1]['mgs']),
                        ['qts'] : Number(d[1]['qts'])
                    })
                }
            } );
        },
    }
}
</script>
