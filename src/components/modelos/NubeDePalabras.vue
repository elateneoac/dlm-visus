<template>
    <div class="row text-center" style="background-color: lightgrey;">
        <div id="dibujo" class="my-3"></div>        
    </div>
    <div class="container mt-3">
        <div class="form-label my-0"><strong>GRÁFICO</strong></div>
        <hr class="my-2">
        <div class="row mb-3 justify-content-between">
            <div class="col-3">
                <div class="input-group input-group-sm mb-3">
                    <input type="button" class="btn btn-success" value="Descargar" @click="this.descargar()">
                    <input type="text" v-model.lazy="this.descarga" class="form-control">
                </div>
            </div>
            <div class="col-3">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">espaciado</span>
                    <input v-model.lazy="this.grafico.espaciado" max="10" type="number" class="form-control">
                    <span class="input-group-text" id="grados">(máximo 10)</span>
                </div>
            </div>
            <div class="col-3">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">rotacion</span>
                    <input v-model.lazy="this.grafico.rotacion" type="number" class="form-control">
                    <span class="input-group-text" id="grados">grados</span>
                </div>
            </div>
        </div>
        
        <div class="my-5"></div>
        <EtiquetasControl v-if="this.grupo" v-model="etiquetas_parametros"/>
        <div class="my-5"></div>
        <TituloControl v-model="titulo_parametros"/>
    </div>
</template>

<script>

import { mapActions } from 'pinia';

import * as d3 from 'd3';
import * as cloud from 'd3-cloud';

import { controles } from '../../stores/controles'

import EtiquetasControl from '../controles/EtiquetasControl.vue'
import TituloControl from '../controles/TituloControl.vue'

export default {
    props : ['df', 'palabra', 'tamanio', 'grupo', 'margen', 'ancho', 'alto','estetica'],

    components: { EtiquetasControl, TituloControl },

    data() {
        return {
            grafico : {
                espaciado : 1,
                rotacion : 0
            },
            titulo_parametros : {
                x : 320,
                y : 50,
                tamanio : 14,
                texto : "un gráfico de chupetes",
                negrita : true,
                cursiva : true,
                color : 'black'
            },
            etiquetas_parametros : {
                x : 210,
                y: 100,
                espaciado : 30,
                radio: 10,
                tamanio : 14,
                estetica : this.estetica
            },
            descarga : 'nube.png'
        }
    },

    watch: {
        df(nuevo, viejo) {
            this.dibujar()
        },
        grafico: {
            handler(nuevos, viejos) {
                this.dibujar()
            },
            deep: true
        },
        titulo_parametros: {
            handler(nuevos, viejos) {
                this.dibujar_titulo()
            },
            deep: true
        },
        etiquetas_parametros: {
            handler(nuevos, viejos) {
                this.dibujar_etiquetas()
                this.actualizar_estetica()
            },
            deep: true
        },
        estetica(nuevo, viejo) {
            this.etiquetas_parametros = {
                ...this.etiquetas_parametros,
                ['estetica'] : this.estetica
            }
        }
    },

    mounted() {
        this.dibujar()
    },

    computed: {
        grupos() {
            return [ ...new Set(this.df.map(f => f[this.grupo])) ].filter(d => this.etiquetas_parametros.estetica[d].mostrar);
        },
    },

    methods: {
        ...mapActions(controles, {
                leyenda : 'leyenda',
                titulo : 'titulo',
                descargar_svg : 'descargar'
            }),

        descargar() {
            this.descargar_svg(document.querySelector('svg'), this.descarga);
        },

        nuevo_svg() {
            this.resetear();
            return d3.select("#dibujo")
                .append('svg')
                .attr('class', 'lienzo')
                .style('background-color', 'white')
                .attr('width', this.ancho + this.margen.izquierda + this.margen.derecha)
                .attr('height', this.alto + this.margen.techo + this.margen.piso)
                .append('g')
                .attr('transform', `translate(${[this.margen.izquierda, this.margen.techo]})`)
        },

        resetear() {
            d3.select("#dibujo").html(null);
        },

        escala() {
            return d3.scaleLinear()
            .domain([d3.min(this.df.map(d => d[this.tamanio])), d3.max(this.df.map(d => d[this.tamanio]))])
            .range([15, 50])
        },

        dibujar() {

            const svg = this.nuevo_svg();

            const g = svg.append("g")
                .attr('class','nube')
                .attr("text-anchor", "middle")
                .attr("transform", `translate(${this.margen.izquierda},${this.margen.derecha})`);

            const nube = cloud()
            .size([this.ancho - this.margen.izquierda - this.margen.derecha, this.alto - this.margen.techo - this.margen.piso])
            .words(this.df.filter(d => this.estetica[d[this.palabra]].mostrar).sort((a,b) => d3.descending(a[this.tamanio],b[this.tamanio])))
            .padding(this.grafico.espaciado <= 10 ? this.grafico.espaciado : 10)
            .spiral('archimedean')
            .rotate(this.grafico.rotacion)
            .font('Serif')
            .fontSize(d => d[this.tamanio] * 1)
            .on('word', (d) => {

                let palabra = d[this.palabra]
                palabra = palabra.replace('#', 'hashtag');
                palabra = palabra.replace('@', 'arroba');
                palabra = palabra.replace(' ', '_');
                
                g.append("text")
                    .attr('class', palabra + ' ' + d[this.grupo])
                    .attr("font-size", `${d[this.tamanio]}pt`)
                    .attr("transform", `translate(${d.x},${d.y}) rotate(${d.rotate})`)
                    .attr("fill", this.grupo ? this.estetica[d[this.grupo]].color : 'black')
                    .text(d[this.palabra]);
            });
            
            nube.start();

            if (this.grupo) {
                this.dibujar_etiquetas();
            }
            this.dibujar_titulo();
        },

        dibujar_etiquetas() {
            this.leyenda(d3.selectAll('svg.lienzo'), this.grupos,
                this.etiquetas_parametros.estetica,
                this.etiquetas_parametros.x,
                this.etiquetas_parametros.y, 
                this.etiquetas_parametros.espaciado,
                this.etiquetas_parametros.radio,
                this.etiquetas_parametros.tamanio)
        },

        dibujar_titulo() {
            this.titulo(d3.selectAll('svg.lienzo'),
                this.titulo_parametros.texto,
                this.titulo_parametros.x,
                this.titulo_parametros.y,
                this.titulo_parametros.tamanio,
                this.titulo_parametros.color)
        },
        
        actualizar_estetica() {
            for(const d of Object.entries(this.etiquetas_parametros.estetica)) {

                let palabra = d[0]
                palabra = palabra.replace('#', 'hashtag');
                palabra = palabra.replace('@', 'arroba');
                palabra = palabra.replace(' ', '_');

                d3.selectAll(`text.${palabra}`)
                .style('visibility', d[1].mostrar ? 'visible' : 'hidden')

                d3.selectAll(`text.${d[1].tipo}`)
                .attr("fill", this.grupo ? this.etiquetas_parametros.estetica[d[1].tipo].color : 'black')
            }
        }
    }
}

</script>