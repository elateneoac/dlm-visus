<template>
  <vista-grafico>
    <template #controles="{ mostrar }">
      <control-chupetes v-show="mostrar" v-model="parametros_particulares" />
    </template>
    <template #grafico="{ lienzo, margenes, data }">
      <chupetes
        :ancho="lienzo.ancho"
        :alto="lienzo.alto"
        :izq="margenes.izq"
        :techo="margenes.techo"
        :der="margenes.der"
        :piso="margenes.piso"
        :grosor="parametros_particulares.grosor"
        :radio="parametros_particulares.radio"
        :espaciado="parametros_particulares.espaciado"
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
import chupetes from "../componentes/graficos/Chupetes.vue";
import ControlChupetes from "../componentes/controles/ControlChupetes.vue";

import { ref } from "vue";
var parametros_particulares = ref({});
</script>
