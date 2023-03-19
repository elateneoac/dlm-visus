<template>
  <div class="my-3 text-center">
    <svg
      id="lienzo"
      :style="{ 'background-color': props.fondo }"
      :width="props.ancho"
      :height="props.alto"
    >
      <!-- <text
        :fill="props.titulo_color"
        :x="props.titulo_x"
        :y="props.titulo_y"
        :font-size="props.titulo_tamanio + 'pt'"
        font-family="Roboto Serif"
      >
        {{ props.titulo_texto }}
      </text> -->
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
  // "titulo_color",
  // "titulo_x",
  // "titulo_y",
  // "titulo_tamanio",
  // "titulo_texto",
]);
</script>
