import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usarLienzoStore = defineStore('lienzo', () => {
  var modificado = ref(false);
  const fondo = computed(() => modificado.value ? '#E31C1C' : '#1F45A0');

  return { modificado, fondo };
});