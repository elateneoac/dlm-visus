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
                    <span class="input-group-text" id="grosor">radio circulos</span>
                    <input v-model.lazy="this.circulo.radio" type="number" class="form-control">
                </div>
            </div>
            <div v-if="this.z == undefined" class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">color circulos</span>
                    <input v-model.lazy="this.circulo.color" type="text" class="form-control">
                </div>
            </div>
            <div v-if="this.z" class="col-2">
                <div class="input-group input-group-sm mb-3">
                    <span class="input-group-text" id="grosor">espaciado</span>
                    <input v-model.lazy="this.grafico.espaciado" type="number" class="form-control">
                </div>
            </div>
        </div>
        <div class="row justify-content-between">
            <div class="col-5">
                <div class="form-label my-0"><strong>EJE X</strong></div>
                <hr class="my-2">
                <div class="row justify-content-between">
                    <div class="col-5">
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="grosor">tamaño</span>
                            <input v-model.lazy="this.grafico.tamaniox" type="number" class="form-control">
                            <span class="input-group-text" id="grosor">pt</span>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="grosor">ticks</span>
                            <input v-model.lazy="this.grafico.ticks" type="number" class="form-control">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <div class="form-label my-0"><strong>EJE Y</strong></div>
                <hr class="my-2">
                <div class="row justify-content-between">
                    <div class="col-5">
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="grosor">tamaño</span>
                            <input v-model.lazy="this.grafico.tamanioy" type="number" class="form-control">
                            <span class="input-group-text" id="grosor">pt</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="my-5"></div>
        <TituloControl v-model="titulo_parametros"/>
        <div class="my-5"></div>
        <EtiquetasControl v-if="this.z" v-model="etiquetas_parametros"/>
        <div class="my-5"></div>
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
            estetica(nuevo, viejo) {
                this.etiquetas_parametros = {
                    ...this.etiquetas_parametros,
                    ['estetica'] : this.estetica
                }
            }
        },
    
        data() {
            return {
                etiquetas_parametros : {
                    x : 210,
                    y: 100,
                    espaciado : 30,
                    radio: 10,
                    tamanio : 14,
                    estetica : this.estetica
                },
                linea : {
                    grosor : 2,
                    color : 'grey',
                },
                grafico: {
                    espaciado : 0,
                    ticks : 50,
                    tamaniox : 11,
                    tamanioy : 11
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
                    texto : "un gráfico de chupetes",
                    negrita : true,
                    cursiva : true,
                    color : 'black'
                },
                descarga : 'chupetes.png'
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
                    dibujar_cuadricula : 'cuadricula',
                    descargar_svg : 'descargar'
                }),
    
            descargar() {
                this.descargar_svg(document.querySelector('svg'), this.descarga);
            },
            
            nuevo_svg() {
                this.resetear();
                return d3.select("#dibujo")
                    .append('svg')
                    .style('background-color', 'white')
                    .attr('width', this.ancho + this.margen.izquierda + this.margen.derecha)
                    .attr('height', this.alto + this.margen.techo + this.margen.piso)
                    .append('g')
                    .attr('transform', `translate(${[this.margen.izquierda, this.margen.techo]})`);
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
                    ...new Set(this.df.filter(d => this.etiquetas_parametros.estetica[d[this.y]].mostrar).map(d => this.etiquetas_parametros.estetica[d[this.y]].nombre))])
                .range([this.margen.techo, this.alto - this.margen.piso])
                .padding(1)
            },
            
            dibujo_x(svg, eje) {
                let _ejex = g => g
                .attr("class", "xAxis")
                .style("font", String(this.grafico.tamaniox) + "pt sans serif")
                .attr("transform", `translate(0,${this.alto - this.margen.piso})`)
                .call(d3.axisBottom(eje).ticks(this.ancho / this.grafico.ticks)
                .tickSizeOuter(0));

                svg.append('g').call(_ejex);
            },
    
            dibujo_y(svg, eje) {
                let _ejey = g => g
                // .attr("class", "yAxis")
                .attr("transform",`translate(${this.margen.izquierda},0)`)
                .call(d3.axisLeft(eje))
                .selectAll('text')
                    // .attr('class', 'h4')
                    .style("font", String(this.grafico.tamanioy) + "pt sans serif")
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
                                .attr('x1', (d) => x(d[this.x]) )
                                .attr('x2', (d) => x(0) )
                                .attr('y1', (d) => y(this.etiquetas_parametros.estetica[d[this.y]].nombre) + i * espaciado - offset)
                                .attr('y2', (d) => y(this.etiquetas_parametros.estetica[d[this.y]].nombre) + i * espaciado - offset)
                                .attr('stroke', (d) => this.etiquetas_parametros.estetica[grupo].color)
                                .attr('stroke-width', this.linea.grosor)

                        svg.selectAll("mycircle")
                            .data(df_grupo)
                            .enter()
                            .append("circle")
                                .attr("cx", (d) => x(d[this.x]))
                                .attr("cy", (d) => y(this.etiquetas_parametros.estetica[d[this.y]].nombre) + i * espaciado - offset)
                                .attr("r", this.circulo.radio)
                                .style("fill", (d) => this.etiquetas_parametros.estetica[grupo].color)

                        i = i + 1
                    }
    
                    this.leyenda(svg, this.grupos, this.etiquetas_parametros.estetica,
                    this.etiquetas_parametros.x,
                    this.etiquetas_parametros.y, 
                    this.etiquetas_parametros.espaciado,
                    this.etiquetas_parametros.radio,
                    this.etiquetas_parametros.tamanio)
                } else {
                    svg.selectAll('lineas')
                    .data(this.df)
                    .enter()
                    .append('line')
                        .attr('x1', (d) => x(d[this.x]) )
                        .attr('x2', (d) => x(0) )
                        .attr('y1', (d) => y(this.etiquetas_parametros.estetica[d[this.y]].nombre) )
                        .attr('y2', (d) => y(this.etiquetas_parametros.estetica[d[this.y]].nombre) )
                        .attr('stroke', this.linea.color)
                        .attr('stroke-width', this.linea.grosor)

                    svg.selectAll("mycircle")
                    .data(this.df)
                    .enter()
                    .append("circle")
                        .attr("cx", (d) => x(d[this.x]))
                        .attr("cy", (d) => y(this.etiquetas_parametros.estetica[d[this.y]].nombre))
                        .attr("r", this.circulo.radio)
                        .style("fill", this.circulo.color)
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