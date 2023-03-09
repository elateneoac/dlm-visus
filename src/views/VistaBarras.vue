<template>
    <div class="container mb-3">
        <div class="input-group mb-3">
            <!-- <span class="input-group-text">csv</span>
            <input v-model.lazy="path_csv" type="text" class="form-control"> -->
            <input class="input-csv" type="file" accept=".csv" @change="cargar">
        </div>
        <lienzo-control v-if="this.path_csv" v-model="this.controles.lienzo"/>
        <x-y-grupo-control v-if="this.path_csv" v-model="this.xygrupo"/>
        <button v-if="this.path_csv" type="button" class="btn btn-primary" @click="dibujar">Dibujar</button>
    </div>

    <barras
    v-if="this.df"
    :df="this.df"
    :x="this.xygrupo.x"
    :y="this.xygrupo.y"
    :grupo="this.xygrupo.grupo"
    :margen="this.controles.lienzo.margen"
    :alto="this.controles.lienzo.alto"
    :ancho="this.controles.lienzo.ancho"
    :estetica="this.estetica"/>
</template>

<script>

import LienzoControl from '../components/controles/LienzoControl.vue'
import XYGrupoControl from '../components/controles/XYGrupoControl.vue'
import Barras from '../components/modelos/Barras.vue'

import * as d3 from 'd3';

export default {

    components: { Barras, LienzoControl, XYGrupoControl },

    watch: {
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
            xygrupo : {
                x : "",
                y : "",
                grupo : ""
            },
            df : null,
            path_csv : '',
            estetica : {}
        }
    },

    methods: {
        cargar(evento) {
            this.path_csv = evento.target.files[0]
        },
        dibujar() {
            const reader = new FileReader()
            reader.onload = () => {
                const data = reader.result;
                this.leer_csv(data);
                
            }
            reader.readAsDataURL(this.path_csv)
        },

        leer_csv(path) {
            d3.csv(path)
            .then( (data) => {
                
                // armo frecuencia por fecha y diario:
                var mapa = {}
                data.forEach( (d) => {     
                    
                    let clave = d[this.xygrupo.y]
                    if (d[this.xygrupo.grupo]) {
                        clave = d[this.xygrupo.y] + '_' + d[this.xygrupo.grupo]
                    }

                    if (clave == undefined) return;

                    if (!(clave in mapa)) {
                        mapa[clave] = 0
                    }

                    mapa[clave] += Number(d[this.xygrupo.x])
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
                for(const d of Object.entries(mapa).sort((a, b) => Number(a[1]) < Number(b[1]) ? 1 : -1)) {
                    const y = d[0].split('_')[0]
                    
                    this.estetica[y] = {
                        'nombre' : y,
                        'color' : d3.schemeTableau10[i],
                        'mostrar' : true
                    }
                    
                    if (this.xygrupo.grupo.length) {
                        let grupo = ""
                        grupo = d[0].split('_')[1]
                        if (grupo.length && !(grupo in this.estetica)) {
                            this.estetica[grupo] = {
                                'nombre' : grupo,
                                'color' : d3.schemeCategory10[i],
                                'mostrar' : true
                            }
                            i = i + 1
                        }
                        this.df.push({ [this.xygrupo.x] : Number(d[1]), [this.xygrupo.y] : y, [this.xygrupo.grupo] : grupo})
                    } else {
                        this.df.push({ [this.xygrupo.x] : Number(d[1]), [this.xygrupo.y] : y})
                    }

                }
            } );
        },
    }
}
</script>
