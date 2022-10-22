<template>
    <div class="container">
        <div class="row mb-3">
            <div v-if="true" class="col-6">
                <div class="input-group mb-3">
                    <span class="input-group-text">csv</span>
                    <input v-model.lazy="path_csv" type="text" class="form-control">
                </div>
            </div>            
        </div>

        <div v-if="this.df_completo" class="col-12">
            <div class="row">
                <div class="form-label my-0" data-bs-toggle="collapse" href="#desplegable" role="button"><strong>AGRUPAR</strong></div>
                <hr class="my-2">
                <template v-for="(value, key) in this.usuarios">
                    <div class="col-2 collapse" id="desplegable">
                        <div class="input-group input-group-sm mb-3">
                            <div class="form-check form-switch">
                                <input :checked="true" :value="value" v-model.lazy="this.controles.usuarios_seleccionados" class="form-check-input me-3" type="checkbox">
                            </div>
                            <span :value="value">{{value}}</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <div v-if="this.df_completo" class="col-12">
            <div class="row">
                <div class="form-label my-0"><strong>INCLUIR</strong></div>
                <hr class="my-2">
                <template v-for="(value, key) in this.tipos">
                    <div class="col-2">
                        <div class="input-group input-group-sm mb-3">
                            <div class="form-check form-switch">
                                <input :value="value" v-model.lazy="this.controles.tipos_seleccionados" class="form-check-input me-3" type="checkbox">
                            </div>
                            <span :value="value">{{value}}</span>
                        </div>
                    </div>
                </template>
            </div>
            <div class="col-2">
                <div class="input-group mb-3">
                    <span class="input-group-text">top</span>
                    <input v-model.lazy="this.controles.top" type="number" class="form-control">
                </div>
            </div>
        </div>
        
        <lienzo-control v-if="this.df" v-model="this.controles.lienzo"/>

    </div>
    <nube
    v-if="this.df"
    :df="this.df"
    palabra="termino"
    tamanio="freq"
    grupo="tipo"
    :margen="this.controles.lienzo.margen"
    :alto="this.controles.lienzo.alto"
    :ancho="this.controles.lienzo.ancho"
    :estetica="this.estetica"/>
</template>

<script>

import LienzoControl from '../components/controles/LienzoControl.vue'
import Nube from '../components/modelos/NubeDePalabras.vue'

import * as d3 from 'd3';

export default {

    components: { LienzoControl, Nube },

    // created() {
    //     this.leer_csv();
    // },

    watch: {
        path_csv(nuevo, viejo) {
            this.leer_csv();
        },
        // top(nuevo, viejo) {
        //     if (this.ok) {
        //         this.actualizar()
        //     }
        // },
        // usuarios_seleccionados(nuevo, viejo) {
        //     if (this.ok) {
        //         this.actualizar()
        //     }
        // },
        // tipos_seleccionados(nuevo, viejo) {
        //     if (this.ok) {
        //         this.actualizar()
        //     }
        // },
        controles : {
            handler(nuevos, viejos) {
                if (this.ok) {
                    this.actualizar()
                }
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
                usuarios_seleccionados : [],
                tipos_seleccionados : [],
                top : 50
            },
            path_csv : null,
            df_completo : null,
            df : null,
            estetica : null,
            estetica_completo : null,
            usuarios : [],
            tipos : ['sustantivos', 'adjetivos', 'verbos', 'menciones', 'hashtags'],
        }
    },
    
    computed: {
        ok() {
            return this.path_csv && this.controles.usuarios_seleccionados.length && this.controles.tipos_seleccionados.length
        }
    },

    methods: {
        actualizar() {
            let mapa = {}
            for(const d of this.df_completo) {
                if (!this.controles.usuarios_seleccionados.includes(d.usuario)) continue;
                if (!this.controles.tipos_seleccionados.includes(d.tipo)) continue;

                let k = d.termino + '_' + d.tipo
                if( !(k in mapa) ) {
                    mapa[k] = 0
                }
                
                mapa[k] += d.freq
            }
            
            this.df = []
            for(const m of Object.entries(mapa)) {
                const termino = m[0].split('_')[0]
                const tipo = m[0].split('_')[1]
                
                this.df.push({
                    ['termino'] : termino,
                    ['tipo'] : tipo,
                    ['freq'] : Number(m[1])
                })
            }
            
            this.df = this.df
            .sort((a, b) => a['freq'] > b['freq'] ? -1 : 1)
            .slice(0, this.controles.top)
            
            this.estetica = {}
            this.estetica = Object.fromEntries(Object.entries(this.estetica_completo).filter(([key]) => this.df.map(d => d.termino).includes(key) || this.tipos.includes(key)));
        },
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
                this.estetica_completo = {}
                var i = 0
                for(const d of Object.entries(mapa)) {
                    const u = d[0].split('_')[0]
                    const tipo = d[0].split('_')[1]
                    const termino = d[0].split('_')[2]
                    const freq = d[1]

                    let hashtipo = tipo.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
                    if (!(termino in this.estetica_completo)) {
                        this.estetica_completo[termino] = {
                            'nombre' : termino,
                            'color' : d3.schemeTableau10[hashtipo % this.top],
                            'mostrar' : true,
                            'tipo' : tipo
                        }
                    }
                    if (!(tipo in this.estetica_completo)) {
                        this.estetica_completo[tipo] = {
                            'nombre' : tipo,
                            'color' : d3.schemeTableau10[i],
                            'mostrar' : true,
                            'tipo' : tipo
                        }
                        i += 1
                    }                    

                    this.df_completo.push({
                        ['usuario']: u,
                        ['tipo'] : tipo,
                        ['termino'] : termino,
                        ['freq'] : Number(freq)
                    })
                }

                this.controles.usuarios_seleccionados = this.usuarios
            } );
        },
    }
}
</script>
