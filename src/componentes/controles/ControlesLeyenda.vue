<template>
  <div class="container-fluid">
    <div class="row">
      <div
        v-if="modelValue.tuplas && modelValue.tuplas.length != 0"
        class="col"
      >
        <div v-if="Object.keys(modelValue.grupos).length != 0">
          <div class="row mb-3">
            <div class="row my-2">
              <label for="leyenda" class="fw-bold">Leyenda</label>
            </div>
            <div class="col-3 text-center">
              Tamanio
              <input
                v-model="parametros.tamanio"
                type="number"
                id="tamanio"
                class="col-12"
              />
            </div>
            <div class="col-3 text-center">
              x
              <input
                v-model="parametros.x"
                type="number"
                id="leyenda_x"
                class="col-12"
              />
            </div>
            <div class="col-3 text-center">
              y
              <input
                v-model="parametros.y"
                type="number"
                id="leyenda-y"
                class="col-12"
              />
            </div>
            <div class="col-3 text-center">
              espaciado
              <input
                v-model="parametros.espaciado"
                type="number"
                id="espaciado"
                class="col-12"
              />
            </div>
          </div>
          <div class="row my-2">
            <span class="fw-bolder">Grupos</span>
          </div>
          <template v-for="(value, key) in modelValue.grupos">
            <div class="row">
              <div class="col-1">
                <input
                type="checkbox"
                id="checkbox"
                :checked="value.ver"
                @change="
                    emit('update:modelValue', {
                      grupos: {
                        ...modelValue.grupos,
                        [key]: { ...modelValue.grupos[key], ver : $event.target.checked },
                      },
                      tuplas: modelValue.tuplas.map((d) =>
                        d.grupo == key
                          ? {
                              ...d,
                              ver : $event.target.checked
                            }
                          : d
                      ),
                    })
                  "
                >
              </div>
              <div class="col">
                <label :for="'color-' + key" class="fst-italic">{{
                  key
                }}</label>
              </div>
              <div class="col-2">
                <input
                  :value="value.color"
                  type="color"
                  @input="
                    emit('update:modelValue', {
                      grupos: {
                        ...modelValue.grupos,
                        [key]: {
                          ...modelValue.grupos[key],
                          color: $event.target.value
                        },
                      },
                      tuplas: modelValue.tuplas.map((d) =>
                        d.grupo == key
                          ? {
                              ...d,
                              color: $event.target.value,
                            }
                          : d
                      ),
                    })
                  "
                  class="form-control form-control-color"
                  :id="'color-' + key"
                  :title="'color de' + key"
                />
              </div>
            </div>
          </template>
        </div>

        <div v-if="!son_fechas">
          <div class="row my-2">
            <span class="fw-bolder">Etiquetas</span>
          </div>
          <template v-for="(value, i) in modelValue.tuplas">
            <div class="row">
              <div class="col-1">
                <input
                type="checkbox"
                id="checkbox"
                :checked="value.ver"
                @change="
                    emit('update:modelValue', {
                      ...modelValue,
                      tuplas: modelValue.tuplas.map((d) =>
                          d.etiqueta == value.etiqueta && d.grupo == value.grupo
                          ? {
                              ...d,
                              ver: $event.target.checked,
                            }
                          : d
                      ),
                      visibilidad : {
                        ...modelValue.visibilidad,
                        [value.etiqueta] : $event.target.checked
                      }
                    })
                  "
                >
              </div>
              <div class="col">
                <span>
                  {{ value.etiqueta }}
                </span>
                <span class="fst-italic">
                  {{ value.grupo ? " " + value.grupo + "" : "" }}
                </span>
              </div>
              <div class="col-2">
                <input
                  :value="value.color"
                  type="color"
                  @input="
                    emit('update:modelValue', {
                      ...modelValue,
                      tuplas: modelValue.tuplas.map((d) =>
                        d.etiqueta == value.etiqueta && d.grupo == value.grupo
                          ? {
                              ...d,
                              color: $event.target.value,
                            }
                          : d
                      ),
                      colores : {
                        ...modelValue.colores,
                        [value.etiqueta] : $event.target.value
                      }
                    })
                  "
                  class="form-control form-control-color"
                  id="color-{{key}}"
                  title="color de {{key}}"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue", "update:parametros"]);

var parametros = ref({
  x: 700,
  y: 600,
  tamanio: 18,
  espaciado: 28,
});

watch(
  parametros,
  (nuevo, viejo) => {
    emit("update:parametros", nuevo);
  },
  { deep: true, immediate: true }
);

const son_fechas = computed(() => {
  let v = props.modelValue.tuplas[0].etiqueta
  return Date.parse(v) > 0 && isNaN(v)
} )
</script>
