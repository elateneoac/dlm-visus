<template>
  <div class="container-fluid">
    <div class="row">
      <label for="columnas" class="fw-bold">Chupetes</label>
      <div class="col">
        <div class="row">
          <div class="col my-auto text-center">
            grosor
            <input
              v-model="controles.grosor"
              type="number"
              id="grosor_linea"
              class="col-12"
            />
          </div>
          <div class="col my-auto text-center">
            radio
            <input
              v-model="controles.radio"
              type="number"
              id="grosor_circulo"
              class="col-12"
            />
          </div>
          <div class="col my-auto text-center">
            espaciado
            <input
              v-model="controles.espaciado"
              type="number"
              id="espaciado"
              class="col-12"
            />
          </div>
        </div>
        <div class="row">
          <div class="col my-auto text-center">
            ticks x
            <input
              v-model="controles.ticks_x"
              type="number"
              id="ticks_x"
              class="col-12"
            />
          </div>
          <div class="col my-auto text-center">
            tamaño x
            <input
              v-model="controles.tamanio_x"
              type="number"
              id="tamanio_x"
              class="col-12"
            />
          </div>
          <div class="col my-auto text-center">
            tamaño y
            <input
              v-model="controles.tamanio_y"
              type="number"
              id="tamanio_y"
              class="col-12"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

import { usarLienzoStore } from '../../stores/lienzo.js' 
const lienzoStore = usarLienzoStore()

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

var controles = ref({
  grosor: 5,
  radio: 5,
  espaciado: 7,

  tamanio_x: 18,
  ticks_x: 200,
  tamanio_y: 18,
});

watch(
  controles,
  (nuevo, viejo) => {
    lienzoStore.modificado = true
    emit("update:modelValue", nuevo);
  },
  { deep: true, immediate: true }
);
</script>
