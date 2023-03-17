<template></template>

<script setup>
import { onUnmounted, watch, ref } from "vue";

import * as d3 from "d3";

// mapeo parametros
// const props = defineProps(['parametros_comunes', 'parametros_particulares', 'data'])
const props = defineProps([
  "alto",
  "ancho",
  "izq",
  "techo",
  "der",
  "piso",
  "grosor",
  "top",
  "tamanio_x",
  "tamanio_y",
  "ticks_x",
  "data",
]);

const dibujar = () => {
  d3.select("#barras").remove();

  const svg = d3.select("#lienzo").append("g").attr("id", "barras");

  
  const ancho = props.ancho;
  const alto = props.alto;
  
  const izq = props.izq;
  const techo = props.techo;
  const der = props.der;
  const piso = props.piso;
  
  const grosor = props.grosor;
  const tamanio_x = props.tamanio_x;
  const ticks_x = props.ticks_x;
  const tamanio_y = props.tamanio_y;
  
  const top = props.top;

  const tuplas = props.data.tuplas.slice(0, top);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(tuplas.map((d) => d.valor))])
    .range([izq, ancho - der]);

  const y = d3
    .scaleBand()
    .domain([...new Set(tuplas.map((d) => d.etiqueta))])
    .range([techo, alto - piso])
    .padding(1);

  // lineas
  svg
    .append("g")
    .attr("id", "lineas")
    .selectAll()
    .data(tuplas)
    .enter()
    .append("line")
    .attr("class", (d) => d.grupo)
    .attr("x1", (d) => x(d.valor))
    .attr("x2", x(0))
    .attr("y1", (d) => y(d.etiqueta))
    .attr("y2", (d) => y(d.etiqueta))
    .attr("stroke", (d) => d.color)
    .attr("stroke-width", (d) => d.valor ? grosor : 0);

  // bolas
  svg
    .append("g")
    .attr("id", "bolas")
    .selectAll()
    .data(tuplas)
    .enter()
    .append("circle")
    .attr("class", (d) => d.grupo)
    .attr("cx", (d) => x(d.valor))
    .attr("cy", (d) => y(d.etiqueta))
    .attr("r", (d) => d.valor ? grosor * 0.5 : 0)
    .style("fill", (d) => d.color);

  // numero
  svg
    .append("g")
    .attr("id", "numeros")
    .selectAll()
    .data(tuplas)
    .enter()
    .append("text")
    .attr("class", (d) => d.grupo)
    .attr("x", (d) => x(d.valor) + grosor)
    .attr("y", (d) => y(d.etiqueta) + grosor * 0.35)
    .attr("font-size", grosor)
    .attr("font-family", "Arial")
    .text((d) => d.valor ? d.valor : '');

  // dibujo ejex
  svg
    .append("g")
    .attr("id", "ejex")
    .style("font-size", tamanio_x + "pt")
    .style("font-family", "Sans,Calibri")
    .attr("transform", `translate(0,${alto - piso})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(ancho / ticks_x)
        .tickSizeOuter(0)
    );

  // dibujo ejey
  svg
    .append("g")
    .attr("id", "ejey")
    .style("font-size", tamanio_y + "pt")
    .style("font-family", "Sans,Calibri")
    .attr("transform", `translate(${izq},0)`)
    .call(d3.axisLeft(y));
};

watch(
  () => props.data,
  (nuevo, viejo) => {
    dibujar();
  },
  { deep: true }
);
</script>
