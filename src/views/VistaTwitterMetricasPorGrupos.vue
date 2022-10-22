<template>
    <div class="container">
        <div class="row mb-3">
            <div v-if="true" class="col-6">
                <div class="input-group mb-3">
                    <span class="input-group-text">csv</span>
                    <input v-model.lazy="path_csv" type="text" class="form-control">
                </div>
            </div>
            <div v-if="this.df_completo" class="col-12 mb-3">
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
            <div v-if="this.df_completo" class="col-12">
                <div class="row">
                    <div class="form-label my-0" data-bs-toggle="collapse" href="#desplegable" role="button"><strong>AGRUPAR</strong></div>
                    <hr class="my-2">
                    <template v-for="(value, key) in this.usuarios">
                        <div class="col-2 collapse" id="desplegable" >
                            <div class="input-group input-group-sm mb-3">
                                <div class="form-check form-switch">
                                    <input :checked="true" v-model="this.usuarios_seleccionados" class="form-check-input me-3" type="checkbox">
                                </div>
                                <span :value="value">{{value}}</span>
                            </div>
                        </div>
                    </template>
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
    :margen="this.controles.lienzo.margen"
    :alto="this.controles.lienzo.alto"
    :ancho="this.controles.lienzo.ancho"
    :estetica="this.estetica"/>
</template>

<script>

import LienzoControl from '../components/controles/LienzoControl.vue'
import Lineas from '../components/modelos/Lineas.vue'

import * as d3 from 'd3';

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
            if (this.path_csv && this.usuarios_seleccionados.length) {
                this.actualizar()
            }
        },
        usuarios_seleccionados(nuevo, viejo) {
            if (this.path_csv && this.variable) {
                this.actualizar()
            }
        },
        controles : {
            handler(nuevos, viejos) {
                this.actualizar()
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
            df_completo : null,
            // path_csv : 'tweets.csv',
            path_csv : null,
            variable : undefined,
            usuarios : [],
            usuarios_seleccionados : [],
            estetica : null
        }
    },

    methods: {
        actualizar() {
            let mapa = {}
            for(const d of this.df_completo) {
                if (!this.usuarios_seleccionados.includes(d.usuario)) continue;

                if( !(d.fecha in mapa) ) {
                    mapa[d.fecha] = 0
                }
                
                mapa[d.fecha] += d[this.variable]
            }
            
            this.df = []
            for(const m of Object.entries(mapa)) {
                const fecha = m[0]

                this.df.push({
                    ['fecha'] : new Date(fecha),
                    ['a_medir'] : Number(m[1])
                })
            }
        },
        leer_csv() {
            d3.csv(this.path_csv)
            .then( (data) => {

                // armo frecuencia por fecha y usuario:
                var mapa = {}
                var fechas = []
                var usuarios = []
                data.forEach( (d) => {
                    if (!(this.usuarios.includes(d.usuario))) this.usuarios.push(d.usuario)

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
                this.df_completo = []
                this.estetica = {}
                var i = 0
                for(const d of Object.entries(mapa)) {
                    const fecha = d[0].split('_')[0]
                    const usuario = d[0].split('_')[1]

                    this.df_completo.push({
                        ['fecha'] : new Date(fecha),
                        ['usuario']: usuario,
                        ['a_medir'] : Number(d[1][this.variable]),
                        ['freq'] : Number(d[1]['freq']),
                        ['rts'] : Number(d[1]['rts']),
                        ['rtas'] : Number(d[1]['rtas']),
                        ['mgs'] : Number(d[1]['mgs']),
                        ['qts'] : Number(d[1]['qts'])
                    })
                }
                this.usuarios_seleccionados = this.usuarios
            } );
        },
    }
}
</script>
