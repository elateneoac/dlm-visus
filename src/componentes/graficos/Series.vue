<template></template>

<script setup>
import { onUnmounted, watch, ref } from "vue";

import * as d3 from "d3";

// mapeo parametros
const props = defineProps([
  "alto",
  "ancho",
  "izq",
  "techo",
  "der",
  "piso",
  "grosor",
  "tamanio_x",
  "tamanio_y",
  "ticks_x",
  "ticks_y",
  "data",
]);

const dibujar = () => {
  d3.select("#series").remove();

  const svg = d3.select("#lienzo").append("g").attr("id", "series");

  const data = props.data.tuplas.filter((d) => d.ver).map((d) => ({
    ...d,
    etiqueta: new Date(d.etiqueta + "T00:00:00"),
  }));

  const grupos = props.data.grupos;

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
  const ticks_y = props.ticks_y;

  const x = d3
    .scaleUtc()
    .domain(d3.extent(data.map((d) => d.etiqueta)))
    .range([izq, ancho - der]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.valor))])
    .range([alto - piso, techo]);

  // series
  const punto = d3
    .line()
    .curve(d3.curveMonotoneX)
    .x((d) => x(d.etiqueta))
    .y((d) => y(d.valor));

  if (Object.keys(grupos).length) {
    for (let [grupo, propiedades] of Object.entries(grupos)) {
      svg
        .append("g")
        .attr("id", grupo)
        .append("path")
        .attr("fill", "none")
        .attr("stroke", propiedades.color)
        .attr("stroke-width", grosor)
        .attr(
          "d",
          punto(
            data
              .filter((d) => d.grupo == grupo)
              .sort((a, b) => (a.etiqueta > b.etiqueta ? 1 : -1))
          )
        );
    }
  } else {
    svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", data[0].color)
      .attr("stroke-width", grosor)
      .attr(
        "d",
        punto(data.sort((a, b) => (a.etiqueta > b.etiqueta ? 1 : -1)))
      );
  }

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
    .call(d3.axisLeft(y).ticks(alto / ticks_y));
};

watch(
  () => props.data,
  (nuevo, viejo) => {
    dibujar();
  },
  { deep: true }
);
</script>
