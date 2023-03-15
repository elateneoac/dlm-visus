<template>
  <vista-grafico>
    <template #controles="{ mostrar }">
      <control-nube v-show="mostrar" v-model="parametros_particulares" />
    </template>
    <template #grafico="{ lienzo, margenes, data }">
      <nube
        :alto="lienzo.alto"
        :ancho="lienzo.ancho"
        :izq="margenes.izq"
        :techo="margenes.techo"
        :der="margenes.der"
        :piso="margenes.piso"
        :tamanio_max="parametros_particulares.tamanio_max"
        :tamanio_min="parametros_particulares.tamanio_min"
        :espaciado="parametros_particulares.espaciado"
        :rotacion="parametros_particulares.rotacion"
        :data="data"
      />
    </template>
  </vista-grafico>
</template>

<script setup>
import VistaGrafico from "./VistaGrafico.vue";
import nube from "../componentes/graficos/Nube.vue";
import ControlNube from "../componentes/controles/ControlNube.vue";

import { ref } from "vue";
var parametros_particulares = ref({});
</script>
