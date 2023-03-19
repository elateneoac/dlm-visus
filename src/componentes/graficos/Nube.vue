<template></template>

<script setup>
import { onUnmounted, watch, ref } from "vue";

import * as d3 from "d3";
import cloud from "d3-cloud/build/d3.layout.cloud";

const props = defineProps([
  "alto",
  "ancho",
  "izq",
  "techo",
  "der",
  "piso",
  "tamanio_max",
  "tamanio_min",
  "espaciado",
  "rotacion",
  "data",
]);

const dibujar = () => {
  d3.select("#nube").remove();

  const svg = d3.select("#lienzo").append("g").attr("id", "nube");

  // const tuplas = props.data.tuplas.filter((d) => d.ver).map((d) => ({ ...d }));
  const tuplas = props.data.tuplas.filter((d) => d.ver).map((d) => ({ ...d }));

  const ancho = props.ancho;
  const alto = props.alto;

  const izq = props.izq;
  const techo = props.techo;
  const der = props.der;
  const piso = props.piso;

  const tamanio_max = props.tamanio_max;
  const tamanio_min = props.tamanio_min;
  const espaciado = props.espaciado;
  const rotacion = props.rotacion;

  const x = d3
    .scaleLinear()
    .domain(d3.extent(tuplas.map((d) => d.valor)))
    .range([tamanio_min, tamanio_max]);

  const nube = cloud()
    .size([ancho - izq - der, alto - techo - piso])
    .words(tuplas.sort((a, b) => d3.descending(a.valor, b.valor)))
    .padding(espaciado)
    // .spiral('archimedean')
    .spiral("rectangular")
    .rotate(rotacion)
    .font("Serif")
    .fontSize((d) => x(d.valor))
    .on("word", (d) => {
      let palabra = d.etiqueta;
      palabra = palabra.replace("#", "hashtag");
      palabra = palabra.replace("@", "arroba");
      palabra = palabra.replace(" ", "_");

      svg
        .append("text")
        .attr("class", palabra + " " + d.grupo)
        .style("font-size", `${x(d.valor)}px`)
        .attr("transform", `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .attr("fill", d.color)
        .text(d.etiqueta);
    });

  nube.start();
};

watch(
  () => props.data,
  (nuevo, viejo) => {
    dibujar();
  },
  { deep: true }
);
</script>
