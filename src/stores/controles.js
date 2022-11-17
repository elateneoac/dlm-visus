import { defineStore } from 'pinia'

export const controles = defineStore({

    id : 'controles',
    actions: {
        leyenda(lienzo, grupos, estetica, x, y, espacio, radio, tamanio) {
            lienzo.selectAll('g.etiquetas').remove()
            const g = lienzo.append("g").attr('class', 'etiquetas').attr('transform',`translate(${x},${y})`);

            var i = 0
            for(let grupo of grupos) {

                if (!(grupo in estetica)) continue;

                g.append('circle')
                .attr('fill', estetica[grupo].color)
                .attr('cx', 0)
                .attr('cy', espacio * i)
                .attr('r', radio)
    
                g.append('text')
                .attr('color', 'red')
                .attr('x', 25)
                .attr('y', espacio * i)
                .attr("dy", "0.35em")
                .attr("dx", -4)
                .style("font", tamanio + "pt serif")
                .text(estetica[grupo].nombre)

                i = i + 1
            }
        },
        titulo(lienzo, texto, x, y, tamanio, color) {
            lienzo.selectAll('g.titulo').remove()
            const g = lienzo.append("g").attr('class', 'titulo').attr('transform',`translate(${x},${y})`);

            g.append('text')
            .attr('fill', color)
            .attr('x', 0)
            .attr('y', 0)
            .attr("font-weight", 700)
            .attr("font-size", tamanio + 'pt')
            .attr("font-family", 'serif')
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
        },
        descargar(svg, descarga) {
            // const svg = document.querySelector('svg');
            const data = (new XMLSerializer()).serializeToString(svg);
            const svgBlob = new Blob([data], {
                type: 'image/svg+xml;charset=utf-8'
            });

            // convert the blob object to a dedicated URL
            const url = URL.createObjectURL(svgBlob);

            // load the SVG blob to a flesh image object
            const img = new Image();
            img.addEventListener('load', () => {
                // draw the image on an ad-hoc canvas
                const bbox = svg.getBBox();

                const canvas = document.createElement('canvas');
                // canvas.width = bbox.width;
                // canvas.height = bbox.height;

                canvas.width = svg.getAttribute('width');
                canvas.height = svg.getAttribute('height');

                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                // context.drawImage(img, 0, 0, ancho, alto);

                URL.revokeObjectURL(url);

                // trigger a synthetic download operation with a temporary link
                const a = document.createElement('a');
                a.download = descarga;
                document.body.appendChild(a);
                a.href = canvas.toDataURL();
                a.click();
                a.remove();
            });
            img.src = url;
        }
    }

})