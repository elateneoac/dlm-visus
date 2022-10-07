import { defineStore } from 'pinia'

export const controles = defineStore({

    id : 'controles',
    actions: {
        leyenda(svg, grupos, estetica, x, y, espacio, radio) {
            var i = 0
            for(let grupo of grupos) {

                if (!(grupo in estetica)) continue;

                svg.append('circle')
                .attr('fill', estetica[grupo].color)
                .attr('cx', x)
                .attr('cy', y + espacio * i)
                .attr('r', radio)
    
                svg.append('text')
                .attr('color', 'red')
                .attr('x', x + 25)
                .attr('y', y + espacio * i)
                .attr("dy", "0.35em")
                .attr("dx", -4)
                .style("font","18px serif")
                .text(estetica[grupo].nombre)

                i = i + 1
            }
        },
        titulo(svg, texto, x, y, tamanio, color) {
            svg.append('text')
            .attr('fill', color)
            .attr('x', x)
            .attr('y', y)
            .attr('class', 'fw-bolder')
            .style('font', tamanio + 'pt serif')
            .text(texto)

        },
        cuadricula(svg, grosor, color, alto, ancho, ejey_derecha, ejex_arriba) {
            svg.selectAll("g.yAxis g.tick")
                .append("line")
                .attr("class", "gridline")
                .attr('stroke', color)
                .attr('stroke-width', Number(grosor))
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", ejey_derecha ? -ancho : ancho)
                .attr("y2", 0);

            svg.selectAll("g.xAxis g.tick")
                .append("line")
                .attr("class", "gridline")
                .attr('stroke', color)
                .attr("x1", 0)
                .attr('stroke-width', Number(grosor))
                .attr("y1", ejex_arriba ? alto : -alto)
                .attr("x2", 0)
                .attr("y2", 0);
        }
    }

})