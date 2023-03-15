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
  "radio",
  "espaciado",
  "tamanio_x",
  "tamanio_y",
  "ticks_x",
  "data",
]);

const dibujar = () => {
  d3.select("#chupetes").remove();

  const svg = d3.select("#lienzo").append("g").attr("id", "chupetes");

  const data = props.data.tuplas;

  const ancho = props.ancho;
  const alto = props.alto;

  const izq = props.izq;
  const techo = props.techo;
  const der = props.der;
  const piso = props.piso;

  const grosor = props.grosor;
  const radio = props.radio;
  const espaciado = props.espaciado;
  const tamanio_x = props.tamanio_x;
  const ticks_x = props.ticks_x;
  const tamanio_y = props.tamanio_y;

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.valor))])
    .range([izq, ancho - der]);

  const y = d3
    .scaleBand()
    .domain([...new Set(data.map((d) => d.etiqueta))])
    .range([techo, alto - piso])
    .padding(1);

  let offsets = new Map();
  data.forEach((d) => {
    if (!offsets.has(d.grupo)) {
      offsets.set(d.grupo, offsets.size * Number(espaciado));
    }
  });
  offsets.forEach((v, k, map) =>
    map.set(k, v - (offsets.size - 1) * espaciado * 0.5)
  );

  // linea chupete
  svg
    .append("g")
    .attr("id", "lineas-chupete")
    .selectAll()
    .data(data)
    .enter()
    .append("line")
    .attr("class", (d) => d.grupo)
    .attr("x1", (d) => x(d.valor))
    .attr("x2", x(0))
    .attr("y1", (d) => y(d.etiqueta) + offsets.get(d.grupo))
    .attr("y2", (d) => y(d.etiqueta) + offsets.get(d.grupo))
    .attr("stroke", (d) => d.color)
    .attr("stroke-width", grosor);

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

  // bola chupete
  svg
    .append("g")
    .attr("id", "lineas-circulo")
    .selectAll()
    .data(data)
    .enter()
    .append("circle")
    .attr("class", (d) => d.grupo)
    .attr("cx", (d) => x(d.valor))
    .attr("cy", (d) => y(d.etiqueta) + offsets.get(d.grupo))
    .attr("r", radio)
    .style("fill", (d) => d.color);
};

watch(
  () => props.data,
  (nuevo, viejo) => {
    dibujar();
  },
  { deep: true }
);
</script>
