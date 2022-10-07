<template>
    <div class="row">
        <div id="dibujo"></div>
    </div>
        <div class="row">
            <div class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">grosor</span>
                    <input v-model="this.linea.grosor" type="number" class="form-control">
                </div>
            </div>
            <div v-if="!this.z" class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">color</span>
                    <input v-model.lazy="this.linea.color" type="text" class="form-control">
                </div>
            </div>
            <div class="col-2">
                <div class="form-check form-switch">
                    <label class="form-check-label">suavizado</label>
                    <input v-model="this.linea.suavizado" class="form-check-input" type="checkbox">
                </div>
            </div>
            <div class="col-2">
                <div class="form-check form-switch">
                    <label class="form-check-label">eje y derecha</label>
                    <input v-model="this.grafico.ejey_derecha" class="form-check-input" type="checkbox">
                </div>
            </div>
            <div class="col-2">
                <div class="form-check form-switch">
                    <label class="form-check-label">eje x arriba</label>
                    <input v-model="this.grafico.ejex_arriba" class="form-check-input" type="checkbox">
                </div>
            </div>
            <div class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">ticks x</span>
                    <input v-model.lazy="this.grafico.ticks.x" type="number" class="form-control">
                </div>
            </div>
            <div class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">ticks y</span>
                    <input v-model.lazy="this.grafico.ticks.y" type="number" class="form-control">
                </div>
            </div>
        </div>
        <EtiquetasControl v-if="this.z" v-model="etiquetas_parametros"/>
        <TituloControl v-model="titulo_parametros"/>
        <CuadriculaControl v-model="cuadricula"/>
</template>

<script>
import * as d3 from 'd3';
import { mapActions, mapState } from 'pinia';

import { controles } from '../../stores/controles'
import EtiquetasControl from '../controles/EtiquetasControl.vue'
import TituloControl from '../controles/TituloControl.vue'
import CuadriculaControl from '../controles/CuadriculaControl.vue'

export default {

    props : ['df', 'x', 'y', 'z', 'margen', 'ancho', 'alto','estetica'],

    components: { EtiquetasControl, TituloControl, CuadriculaControl },

    mounted() {
            this.dibujar()
        },

    watch: {
        df(nuevo, viejo) {
            this.dibujar()
        },
        etiquetas_parametros(nuevos, viejos) {
            this.dibujar()
        },
        titulo_parametros(nuevos, viejos) {
            this.dibujar()
        },
        linea: {
            handler(nuevos, viejos) {
            this.dibujar()
            },
            deep: true
        },
        grafico: {
            handler(nuevos, viejos) {
            this.dibujar()
            },
            deep: true
        },
        cuadricula: {
            handler(nuevos, viejos) {
            this.dibujar()
            },
            deep: true
        },
    },

    data() {
        return {
            etiquetas_parametros : {
                x : 210,
                y: 100,
                espaciado : 30,
                radio: 10,
                estetica : this.estetica
            },
            grafico: {
                ejey_derecha : false,
                ejex_arriba : false,
                ticks : {
                    x : 150,
                    y : 40
                }            
            },
            cuadricula : {
                mostrar : false,
                color : 'grey',
                grosor : 0.5
            },
            linea : {
                grosor : 2,
                color : 'grey',
                suavizado : true
            },
            titulo_parametros : {
                x : 320,
                y : 50,
                tamanio : 14,
                texto : "un gráfico de lineas",
                color : 'black',
                negrita : true,
                cursiva : true,
                fondo : null,
                base : null,
                altura : null
            }
        }
    },

    computed: {
        grupos() {
            return [ ...new Set(this.df.map(f => f[this.z]).filter(f => f !== 'casarosada' && this.etiquetas_parametros.estetica[f].mostrar) ) ];
        },
    },

    methods: {
        ...mapActions(controles, {
                leyenda : 'leyenda',
                dibujar_titulo : 'titulo',
                dibujar_cuadricula : 'cuadricula'
            }),

        descargar() {
            download();
        },
        
        nuevo_svg() {
            this.resetear();
            return d3.select("#dibujo")
                .append('svg')
                .attr('width', this.ancho + this.margen.izquierda + this.margen.derecha)
                .attr('height', this.alto + this.margen.techo + this.margen.piso)
                .append('g')
                .attr('transform', `translate(${[this.margen.izquierda, this.margen.techo]})`)
        },

        resetear() {
            d3.select("#dibujo").html(null);
        },
        
        x_fechas() {
            return d3.scaleUtc()
            .domain(d3.extent(this.df.values(), f => f[this.x]))
            .range([this.margen.izquierda, this.ancho - this.margen.derecha])
        },

        y_freqs() {
            return d3.scaleLinear()
            .domain([0, d3.max(this.df.map(d => d[this.y]))])
            .range([this.alto - this.margen.techo, this.margen.piso]);
        },

        dibujo_x(svg, eje) {
            let ejex = null
            if (this.grafico.ejex_arriba) {
                ejex = g => g.attr("class", "xAxis").attr("transform", `translate(0,${this.margen.techo})`).call(d3.axisTop(eje).ticks(this.ancho / this.grafico.ticks.x).tickSizeOuter(0));
            } else {
                ejex = g => g.attr("class", "xAxis").attr("transform", `translate(0,${this.alto - this.margen.piso})`).call(d3.axisBottom(eje).ticks(this.ancho / this.grafico.ticks.x).tickSizeOuter(0));
            }
            svg.append('g').call(ejex);
        },

        dibujo_y(svg, eje) {
            let ejey = null
            if (this.grafico.ejey_derecha) {
                ejey = g => g.attr("class", "yAxis").attr("transform",`translate(${this.ancho - this.margen.derecha},${this.margen.techo - this.margen.piso})`).call(d3.axisRight(eje).ticks(this.alto / this.grafico.ticks.y))
            } else {
                ejey = g => g.attr("class", "yAxis").attr("transform",`translate(${this.margen.izquierda},${this.margen.techo - this.margen.piso})`).call(d3.axisLeft(eje).ticks(this.alto / this.grafico.ticks.y))
            }
            svg.append('g').call(ejey);
        },

        curva(x, y) {
            var tipo = this.linea.suavizado ? d3.curveMonotoneX : d3.curveLinear;
            return d3.line().curve(tipo).x(d => x(d[this.x])).y(d => y(d[this.y]) + this.margen.techo - this.margen.piso)
        },

        dibujar() {
            const svg = this.nuevo_svg();

            let _x = this.x_fechas();
            this.dibujo_x(svg, _x);

            let _y = this.y_freqs();
            this.dibujo_y(svg, _y);

            let punto = this.curva(_x, _y);
            
            if (this.cuadricula.mostrar) {
                this.dibujar_cuadricula(svg,
                this.cuadricula.grosor,
                this.cuadricula.color,
                (this.alto - this.margen.techo - this.margen.piso),
                this.ancho - this.margen.derecha - this.margen.izquierda,
                this.grafico.ejey_derecha,
                this.grafico.ejex_arriba)
            }

            if (this.z !== undefined) {
                for(let grupo of this.grupos) {
    
                    if (grupo == 'casarosada' || !(grupo in this.estetica)) continue;
                    
                    svg.append('path')
                    .attr('fill', 'none')
                    .attr('stroke',  this.etiquetas_parametros.estetica[grupo].color)
                    .attr('stroke-width', Number(this.linea.grosor))
                    .attr('d', punto(this.df.filter(d => d[this.z] == grupo && this.etiquetas_parametros.estetica[d[this.z]].mostrar).sort((a, b) => a[this.x] > b[this.x] ? 1 : -1)));
                }

                this.leyenda(svg, this.grupos, this.etiquetas_parametros.estetica,
                this.etiquetas_parametros.x,
                this.etiquetas_parametros.y, 
                this.etiquetas_parametros.espaciado,
                this.etiquetas_parametros.radio)
            } else {
                svg.append('path')
                    .attr('fill', 'none')
                    .attr('stroke', this.linea.color)
                    .attr('stroke-width', Number(this.linea.grosor))
                    .attr('d', punto(this.df.sort((a, b) => a[this.x] > b[this.x] ? 1 : -1)));   
            }

            
            this.dibujar_titulo(svg,
            this.titulo_parametros.texto,
            this.titulo_parametros.x,
            this.titulo_parametros.y,
            this.titulo_parametros.tamanio,
            this.titulo_parametros.color)}
    }
}
</script>