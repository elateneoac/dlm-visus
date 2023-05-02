<template>
  <div class="my-3 text-center">
    <svg
      id="lienzo"
      :style="{ 'background-color': props.fondo }"
      :width="props.ancho"
      :height="props.alto"
    >
      <template v-for="(texto, index) in props.textos">
        <text
        :fill="texto.color"
        :x="texto.x"
        :y="texto.y"
        :font-size="texto.tamanio + 'pt'"
        font-family="Roboto Serif"
        >
          {{ texto.texto }}
        </text>
      </template>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps([
  "ancho",
  "alto",
  "fondo",
  "textos"
]);
</script>
