<template>
  <div class="my-3 text-center">
    <svg
      id="lienzo"
      :style="{ 'background-color': props.fondo }"
      :width="props.ancho"
      :height="props.alto"
    >
      <text
        :fill="props.titulo_color"
        :x="props.titulo_x"
        :y="props.titulo_y"
        :font-size="props.titulo_tamanio + 'pt'"
        font-family="Merienda"
      >
        {{ props.titulo_texto }}
      </text>
    </svg>
  </div>
</template>

<script setup>
const props = defineProps([
  "ancho",
  "alto",
  "fondo",
  "titulo_color",
  "titulo_x",
  "titulo_y",
  "titulo_tamanio",
  "titulo_texto",
]);
</script>
