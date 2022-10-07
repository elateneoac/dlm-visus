<template>
    <div class="row">
        <div id="dibujo"></div>
    </div>
    <div class="row">
        <div class="row">
            <div class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">grosor</span>
                    <input v-model.lazy="this.linea.grosor" type="number" class="form-control">
                </div>
            </div>
            <div v-if="this.z == undefined" class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">color</span>
                    <input v-model.lazy="this.linea.color" type="text" class="form-control">
                </div>
            </div>
            <div class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">radio</span>
                    <input v-model.lazy="this.circulo.radio" type="number" class="form-control">
                </div>
            </div>
            <div v-if="this.z == undefined" class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">color circulo</span>
                    <input v-model.lazy="this.circulo.color" type="text" class="form-control">
                </div>
            </div>
            <div v-if="this.z" class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">espaciado</span>
                    <input v-model.lazy="this.grafico.espaciado" type="number" class="form-control">
                </div>
            </div>
            <div class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">ticks x</span>
                    <input v-model.lazy="this.grafico.ticks" type="number" class="form-control">
                </div>
            </div>
        </div>
        <EtiquetasControl v-if="this.z" v-model="etiquetas_parametros"/>
        <TituloControl v-model="titulo_parametros"/>
        <CuadriculaControl v-model="cuadricula"/>
    </div>
</template>


<script>
    import * as d3 from 'd3';
    import { mapActions } from 'pinia';
    
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
            circulo: {
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
            grafico: {
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
                linea : {
                    grosor : 2,
                    color : 'grey',
                },
                grafico: {
                    espaciado : 10,
                    ticks : 50
                },
                circulo : {
                    radio : 5,
                    color : 'grey'
                },
                cuadricula : {
                    mostrar : false,
                    color : 'grey',
                    grosor : 0.5
                },
                titulo_parametros : {
                    x : 320,
                    y : 50,
                    tamanio : 14,
                    texto : "un gráfico de lineas",
                    negrita : true,
                    cursiva : true
                }
            }
        },
    
        computed: {
            grupos() {
                return [ ...new Set(this.df.map(f => f[this.z])) ].filter(d => this.etiquetas_parametros.estetica[d].mostrar);
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
            
            ejex() {
                return d3.scaleLinear()
                .domain([0, d3.max(this.df.map(d => d[this.x]))])
                .range([this.margen.izquierda, this.ancho - this.margen.derecha]);
            },

            ejey() {
                return d3.scaleBand()
                .domain([
                    ...new Set(this.df.map(f => f[this.y]))].filter(d => this.etiquetas_parametros.estetica[d].mostrar).map(d => this.etiquetas_parametros.estetica[d].nombre))
                .range([this.margen.techo, this.alto - this.margen.piso])
                .padding(1)
            },
            
            dibujo_x(svg, eje) {
                let _ejex = g => g.attr("class", "xAxis").attr("transform", `translate(0,${this.alto - this.margen.piso})`).call(d3.axisBottom(eje).ticks(this.ancho / this.grafico.ticks).tickSizeOuter(0));
                svg.append('g').call(_ejex);
            },
    
            dibujo_y(svg, eje) {
                let _ejey = g => g
                // .attr("class", "yAxis")
                .attr("transform",`translate(${this.margen.izquierda},0)`)
                .call(d3.axisLeft(eje))
                .selectAll('text')
                    .attr('class', 'h6')
                    .attr("transform", "translate(-10,0)rotate(-25)")
                    .style("text-anchor", "end");
                svg.append('g').call(_ejey);
            },
    
            dibujar() {
                const svg = this.nuevo_svg();
    
                let x = this.ejex();
                this.dibujo_x(svg, x);
    
                let y = this.ejey();
                this.dibujo_y(svg, y);
    
                if (this.cuadricula.mostrar) {
                    this.dibujar_cuadricula(svg,
                    this.cuadricula.grosor,
                    this.cuadricula.color,
                    (this.alto - this.margen.techo - this.margen.piso),
                    this.ancho - this.margen.derecha - this.margen.izquierda,
                    false,
                    false)
                }

                if (this.z !== undefined) {
                    var i = 0
                    var espaciado = this.grafico.espaciado
                    var offset = Number(espaciado) * this.grupos.length * 0.25
                    for(let grupo of this.grupos) {
        
                        if (grupo == 'casarosada' || !(grupo in this.etiquetas_parametros.estetica)) {
                            continue;
                        }
                        
                        var df_grupo = this.df.filter(d => d[this.z] == grupo && this.etiquetas_parametros.estetica[d[this.y]].mostrar).sort((a, b) => a[this.x] > b[this.x] ? 1 : -1)
                        svg.selectAll('lineas')
                            .data(df_grupo)
                            .enter()
                            .append('line')
                                .attr('x1', (d) => x(d.freq) )
                                .attr('x2', (d) => x(0) )
                                .attr('y1', (d) => y(this.etiquetas_parametros.estetica[d.diario].nombre) + i * espaciado - offset)
                                .attr('y2', (d) => y(this.etiquetas_parametros.estetica[d.diario].nombre) + i * espaciado - offset)
                                .attr('stroke', (d) => this.etiquetas_parametros.estetica[grupo].color)
                                .attr('stroke-width', this.linea.grosor)

                        svg.selectAll("mycircle")
                            .data(df_grupo)
                            .enter()
                            .append("circle")
                                .attr("cx", (d) => x(d.freq))
                                .attr("cy", (d) => y(this.etiquetas_parametros.estetica[d.diario].nombre) + i * espaciado - offset)
                                .attr("r", this.circulo.radio)
                                .style("fill", (d) => this.etiquetas_parametros.estetica[grupo].color)

                        i = i + 1
                    }
    
                    this.leyenda(svg, this.grupos, this.etiquetas_parametros.estetica,
                    this.etiquetas_parametros.x,
                    this.etiquetas_parametros.y, 
                    this.etiquetas_parametros.espaciado,
                    this.etiquetas_parametros.radio)
                } else {
                    svg.selectAll('lineas')
                    .data(this.df)
                    .enter()
                    .append('line')
                        .attr('x1', (d) => x(d.freq) )
                        .attr('x2', (d) => x(0) )
                        .attr('y1', (d) => y(this.etiquetas_parametros.estetica[d.diario].nombre) )
                        .attr('y2', (d) => y(this.etiquetas_parametros.estetica[d.diario].nombre) )
                        .attr('stroke', this.linea.color)
                        .attr('stroke-width', this.linea.grosor)

                    svg.selectAll("mycircle")
                    .data(this.df)
                    .enter()
                    .append("circle")
                        .attr("cx", (d) => x(d.freq))
                        .attr("cy", (d) => y(this.etiquetas_parametros.estetica[d.diario].nombre))
                        .attr("r", this.circulo.radio)
                        .style("fill", this.circulo.color)
                }
    
                this.dibujar_titulo(svg,
                this.titulo_parametros.texto,
                this.titulo_parametros.x,
                this.titulo_parametros.y,
                this.titulo_parametros.tamanio)}
        }
    }
    </script>