<template>
  <vista-grafico>
    <template #controles="{ mostrar }">
      <control-series v-show="mostrar" v-model="parametros_particulares" />
    </template>
    <template #grafico="{ lienzo, margenes, data }">
      <series
        :ancho="lienzo.ancho"
        :alto="lienzo.alto"
        :izq="margenes.izq"
        :techo="margenes.techo"
        :der="margenes.der"
        :piso="margenes.piso"
        :grosor="parametros_particulares.grosor"
        :tamanio_x="parametros_particulares.tamanio_x"
        :tamanio_y="parametros_particulares.tamanio_y"
        :ticks_x="parametros_particulares.ticks_x"
        :ticks_y="parametros_particulares.ticks_y"
        :data="data"
      />
    </template>
  </vista-grafico>
</template>

<script setup>
import VistaGrafico from "./VistaGrafico.vue";
import series from "../componentes/graficos/Series.vue";
import ControlSeries from "../componentes/controles/ControlSeries.vue";

import { ref } from "vue";
var parametros_particulares = ref({});
</script>
