<template>
    <div class="container">
        <div class="row mb-3">
            <div v-if="true" class="col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text">csv</span>
                    <input v-model.lazy="path_csv" type="text" class="form-control">
                </div>
            </div>
            <div v-if="this.df_completo" class="col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text"><strong>usuario</strong></span>
                    <select v-model.lazy="usuario" class="form-select">
                        <template v-for="(value, key) in this.usuarios">
                            <option :value="value">{{value}}</option>
                        </template>
                    </select>
                </div>
            </div>
            <div v-if="this.df_completo" class="col-3">
                <div class="input-group mb-3">
                    <span class="input-group-text"><strong>a medir</strong></span>
                    <select v-model.lazy="variable" class="form-select">
                        <option value="sustantivos" selected>sustantivos</option>
                        <option value="adjetivos">adjetivos</option>
                        <option value="verbos">verbos</option>
                        <option value="menciones">menciones (@)</option>
                        <option value="hashtags">hashtags (#)</option>
                    </select>
                </div>
            </div>
        </div>

        <lienzo-control v-if="this.df" v-model="this.controles.lienzo"/>

    </div>

    <chupetes
    v-if="this.df"
    :df="this.df"
    x="freq"
    y="termino"
    :margen="this.controles.lienzo.margen"
    :alto="this.controles.lienzo.alto"
    :ancho="this.controles.lienzo.ancho"
    :estetica="this.estetica"/>
</template>

<script>

import LienzoControl from '../components/controles/LienzoControl.vue'
import Chupetes from '../components/modelos/Chupetes.vue'

import { estetica } from '../stores/estetica'

import { mapState } from 'pinia'

import * as d3 from 'd3';

export default {

    components: { Chupetes, LienzoControl },

    created() {
        this.leer_csv();
    },

    watch: {
        path_csv(nuevo, viejo) {
            this.leer_csv();
        },
        variable(nuevo, viejo) {
            if (this.ok) {
                this.df = this.df_completo
                .filter(d => d.tipo == this.variable && d.usuario == this.usuario)
                .sort((a, b) => a['freq'] > b['freq'] ? -1 : 1)
                .slice(0, 10)
                
                this.df.forEach((d) => {
                    this.estetica[d.termino] = {
                        'nombre' : d.termino,
                        'color' : d3.schemeTableau10[this.tipos.indexOf(this.variable)],
                        'mostrar' : true
                    }
                })
            }
        },
        usuario(nuevo, viejo) {
            if (this.ok) {
                this.df = this.df_completo
                .filter(d => d.tipo == this.variable && d.usuario == this.usuario)
                .sort((a, b) => a['freq'] > b['freq'] ? -1 : 1)
                .slice(0, 10)

                this.df
                .forEach((d) => {
                    this.estetica[d.termino] = {
                        'nombre' : d.termino,
                        'color' : d3.schemeTableau10[this.tipos.indexOf(this.variable)],
                        'mostrar' : true
                    }
                })
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
            df_completo : null,
            df : null,
            // path_csv : 'tweets.csv',
            path_csv : null,
            variable : undefined,
            usuario : undefined,
            usuarios : [],
            tipos : ['sustantivos', 'adjetivos', 'verbos', 'menciones', 'hashtags']
        }
    },
    
    computed: {
        ...mapState(estetica, ['medios']),
        ok() {
            return this.path_csv && this.variable && this.usuario
        }
    },

    methods: {
        leer_csv() {
            d3.csv(this.path_csv)
            .then( (data) => {
              
                // armo frecuencia por usuario y variable a medir:
                var mapa = {}
                data.forEach( (d) => {
                    const usuario = d.usuario
                    if (!(this.usuarios.includes(usuario))) this.usuarios.push(usuario)

                    for (const t of this.tipos) {
                        for(const i of d[t].split(',')) {
                            let k = usuario + '_' + t + '_' + i;
                            if (i.length < 2) continue;

                            if (!(k in mapa)) {
                                mapa[k] = 0
                            }
                            mapa[k] += d[t].split(i).length - 1
                        }
                    }
                })

                // armo df para pasarle al modelo'chupetes'
                this.df_completo = []
                this.estetica = {}
                var i = 0
                for(const d of Object.entries(mapa)) {
                    const u = d[0].split('_')[0]
                    const tipo = d[0].split('_')[1]
                    const termino = d[0].split('_')[2]
                    const freq = d[1]

                    this.df_completo.push({
                        ['usuario']: u,
                        ['tipo'] : tipo,
                        ['termino'] : termino,
                        ['freq'] : Number(freq)
                    })
                }
            } );
        },
    }
}
</script>
