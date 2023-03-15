<template>
  <vista-grafico
  :tick="tick"
  >
    <template #controles="{ mostrar }">
      <control-barras
      v-show="mostrar"
      v-model="parametros_particulares"
      />
    </template>
    <template #grafico="{ lienzo, margenes, data }">
      <barras
        :alto="lienzo.alto"
        :ancho="lienzo.ancho"
        :izq="margenes.izq"
        :techo="margenes.techo"
        :der="margenes.der"
        :piso="margenes.piso"
        :grosor="parametros_particulares.grosor"
        :top="parametros_particulares.top"
        :tamanio_x="parametros_particulares.tamanio_x"
        :tamanio_y="parametros_particulares.tamanio_y"
        :ticks_x="parametros_particulares.ticks_x"
        :data="data"
      />
    </template>
  </vista-grafico>
</template>

<script setup>
import VistaGrafico from "./VistaGrafico.vue";
import barras from "../componentes/graficos/Barras.vue";
import ControlBarras from "../componentes/controles/ControlBarras.vue";

import { ref, } from "vue";
var parametros_particulares = ref({});
</script>
