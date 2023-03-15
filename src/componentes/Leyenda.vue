<template></template>

<script setup>
import { onUnmounted, watch, ref } from "vue";

import * as d3 from "d3";

// mapeo parametros
const props = defineProps(["grupos", "parametros"]);

// watchers
watch(
  () => props,
  (nuevo, viejo) => {
    d3.select("#leyenda").remove();

    const grupos = nuevo.grupos;
    const x = nuevo.parametros.x;
    const y = nuevo.parametros.y;
    const espaciado = nuevo.parametros.espaciado;
    const tamanio = nuevo.parametros.tamanio;

    const svg = d3
      .select("#lienzo")
      .append("g")
      .attr("id", "leyenda")
      .attr("transform", `translate(${x},${y})`);

    const data = Object.entries(grupos).map(([k, v]) => ({
      grupo: k,
      valores: v,
    }));

    svg
      .append("g")
      .attr("id", "circulos-leyenda")
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("fill", (d) => d.valores.color)
      .attr("cx", 0)
      .attr("cy", (d, i) => espaciado * i)
      .attr("r", tamanio * 0.5);

    svg
      .append("g")
      .attr("id", "grupos-leyenda")
      .selectAll()
      .data(data)
      .enter()
      .append("text")
      .attr("x", 25)
      .attr("y", (d, i) => espaciado * i)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .style("font", tamanio + "pt serif")
      .text((d) => d.grupo);
  },
  { deep: true }
);

// callbacks
onUnmounted(() => d3.select("#leyenda").remove());
</script>
