<template>
  <div class="container-fluid">
    <div class="row">
      <label for="columnas" class="fw-bold">Nube</label>
      <div class="col">
        <div class="row">
          <div class="col my-auto text-center">
            tamaño max
            <input
              v-model="controles.tamanio_max"
              type="number"
              id="tamanio_max"
              class="col-12"
            />
          </div>
          <div class="col my-auto text-center">
            tamaño min
            <input
              v-model="controles.tamanio_min"
              type="number"
              id="tamanio_min"
              class="col-12"
            />
          </div>
        </div>
        <div class="row">
          <div class="col my-auto text-center">
            espaciado
            <input
              v-model="controles.espaciado"
              type="number"
              id="espaciado"
              class="col-12"
            />
          </div>
          <div class="col my-auto text-center">
            rotacion
            <input
              v-model="controles.rotacion"
              type="number"
              id="rotacion"
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

defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

var controles = ref({
  tamanio_max: 100,
  tamanio_min: 10,
  espaciado: 10,
  rotacion: 0,
});

watch(
  controles,
  (nuevo, viejo) => {
    emit("update:modelValue", nuevo);
  },
  { deep: true, immediate: true }
);
</script>
