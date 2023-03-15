<template>
  <div class="container-fluid">
    <div class="row">
      <!-- columna con los controles -->
      <div v-if="mostrar" style="overflow: hidden">
        <div class="row my-3">
          <div class="col">
            <input
              type="file"
              @change="
                levantar($event);
                levantando = true;
              "
            />
          </div>
        </div>

        <div v-if="levantando" class="row">
          <div class="col">
            <label for="columnas" class="fw-bold">Columnas</label>
            <div id="columnas" class="mb-3">
              <div class="row">
                <div class="col-auto">
                  <label for="valores">valores (integer)</label>
                </div>
                <div class="col">
                  <select
                    name="valores"
                    id="valores"
                    v-model="entrada.valores"
                    class="col-12"
                  >
                    <option
                      v-for="columna in columnas.numeros"
                      :value="columna"
                    >
                      {{ columna }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-auto">
                  <label for="etiquetas"
                    >etiquetas ({{
                      ruta.name == "series" ? "fecha" : "string"
                    }})</label
                  >
                </div>
                <div class="col">
                  <select
                    name="etiquetas"
                    id="etiquetas"
                    v-model="entrada.etiquetas"
                    class="col-12"
                  >
                    <template v-if="ruta.name !== 'series'">
                      <option
                        v-for="columna in columnas.textos"
                        :value="columna"
                      >
                        {{ columna }}
                      </option>
                    </template>
                    <template v-else>
                      <option
                        v-for="columna in columnas.fechas"
                        :value="columna"
                      >
                        {{ columna }}
                      </option>
                    </template>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="col-auto">
                  <label for="grupos">grupos (string)</label>
                </div>
                <div class="col">
                  <select
                    name="grupos"
                    id="grupos"
                    v-model="entrada.grupos"
                    class="col-12"
                  >
                    <option
                      v-for="columna in [...columnas.textos, '']"
                      :value="columna"
                    >
                      {{ columna }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="columnasok" class="row mb-3">
          <div class="col">
            <input
              :disabled="!columnasok"
              class="col-12"
              type="button"
              :value="'🖌️ ' + (lienzoStore.modificado ? 're-' : '') + 'dibujar'"
              @click="
                $emit('dibujar', {
                  contenido,
                  entrada,
                  color: color,
                });
                dibujando = true;
                lienzoStore.modificado = false;
              "
            />
          </div>
        </div>
        <div v-if="columnasok" class="row mb-3">
          <div class="col-6 my-auto">
            <input
              :disabled="!columnasok"
              class="col-12"
              type="button"
              value="⏬ descargar"
              @click="descargar()"
            />
          </div>
          <div class="col-6">
            <input type="text" v-model.lazy="descarga" />
          </div>
        </div>

        <div v-if="dibujando">
          <div class="row">
            <div class="col">
              <label for="tamanio" class="fw-bold">Tamaño</label>
              <div id="tamanio" class="mb-3">
                <div class="row">
                  <div class="col-auto">
                    <label for="ancho">↔️</label>
                  </div>
                  <div class="col ps-0">
                    <input
                      v-model="controles_lienzo.ancho"
                      type="number"
                      name="ancho"
                      id="ancho"
                      placeholder="ancho..."
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-auto">
                    <label for="alto">↕️</label>
                  </div>
                  <div class="col ps-0">
                    <input
                      v-model="controles_lienzo.alto"
                      type="number"
                      name="alto"
                      id="alto"
                      placeholder="alto..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <label for="margenes" class="fw-bold">Margenes</label>
              <div id="margenes" class="mb-3">
                <div class="row">
                  <div class="col-auto">
                    <label for="izq">➡️</label>
                  </div>
                  <div class="col ps-0">
                    <input
                      v-model="controles_margenes.izq"
                      type="number"
                      name="izq"
                      id="izq"
                      placeholder="izquierda..."
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-auto">
                    <label for="techo">⬇️</label>
                  </div>
                  <div class="col ps-0">
                    <input
                      v-model="controles_margenes.techo"
                      type="number"
                      name="techo"
                      id="techo"
                      placeholder="techo..."
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-auto">
                    <label for="der">⬅️</label>
                  </div>
                  <div class="col ps-0">
                    <input
                      v-model="controles_margenes.der"
                      type="number"
                      name="der"
                      id="der"
                      placeholder="derecha..."
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-auto">
                    <label for="piso">⬆️</label>
                  </div>
                  <div class="col ps-0">
                    <input
                      v-model="controles_margenes.piso"
                      type="number"
                      name="piso"
                      id="piso"
                      placeholder="piso..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="row mb-3 justify-content-between">
            <div class="col-4 text-center">
              <div class="row">
                <label for="color-fondo" class="fw-bold">Fondo</label>
              </div>
              <div class="row">
                <input
                  v-model="controles_lienzo.fondo"
                  type="color"
                  id="color-fondo"
                  title="color de fondo"
                />
              </div>
            </div>
            <div
              v-if="['', undefined].includes(entrada.grupos)"
              class="col-4 text-center"
            >
              <div class="row">
                <label for="color-principal" class="fw-bold">Principal</label>
              </div>
              <div class="row">
                <input
                  v-model="color"
                  type="color"
                  id="color-principal"
                  title="color principal"
                  @input="$emit('color', $event.target.value)"
                />
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-8">
              <div class="row">
                <label for="color-fondo" class="fw-bold">Título</label>
              </div>
              <div class="row">
                <textarea
                  v-model="controles_titulo.texto"
                  type="text-area"
                  id="titulo-texto"
                  class="col-12"
                ></textarea>
              </div>
            </div>
            <div class="col-4 my-auto">
              <input
                v-model="controles_titulo.color"
                type="color"
                id="color-titulo"
                title="color de titulo"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <div class="row">
                <div class="col-4 text-center">
                  Tamanio
                  <input
                    v-model="controles_titulo.tamanio"
                    type="number"
                    id="titulo-tamanio"
                    class="col-12"
                  />
                </div>
                <div class="col-4 text-center">
                  x<input
                    v-model="controles_titulo.x"
                    type="number"
                    id="titulo-x"
                    class="col-12"
                  />
                </div>
                <div class="col-4 text-center">
                  y<input
                    v-model="controles_titulo.y"
                    type="number"
                    id="titulo-y"
                    class="col-12"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <slot> </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

import { usarLienzoStore } from '../../stores/lienzo.js' 
const lienzoStore = usarLienzoStore()

const ruta = useRoute();

// props
const mostrar = defineProps(["mostrar", "modelValue"]);

const emit = defineEmits(["update:lienzo", "update:titulo", "update:margenes"]);

var dibujando = ref(false);
var levantando = ref(false);

// data
var contenido = ref(null);
var columnas = ref({
  textos: [],
  numeros: [],
  fechas: [],
});
var descarga = ref("visu.png");

var controles_lienzo = ref({
  alto: 1080,
  ancho: 1080,
  fondo: "#FFFFFF",
});
watch(
  controles_lienzo,
  (nuevo, viejo) => {
    lienzoStore.modificado = true;
    emit("update:lienzo", nuevo);
  },
  { deep: true, immediate: true }
);

var controles_titulo = ref({
  texto: "",
  color: "#000000",
  tamanio: 40,
  x: 250,
  y: 100,
});
watch(
  controles_titulo,
  (nuevo) => {
    emit("update:titulo", nuevo);
  },
  { deep: true, immediate: true }
);

var controles_margenes = ref({
  izq: 200,
  techo: 100,
  der: 200,
  piso: 100,
});
watch(
  controles_margenes,
  (nuevo) => {
    lienzoStore.modificado = true;
    emit("update:margenes", nuevo);
  },
  { deep: true, immediate: true }
);

var color = ref("#000000");

var entrada = ref({
  valores: undefined,
  etiquetas: undefined,
  grupos: undefined,
});

const columnasok = computed(() => {
  return (
    entrada.value.valores !== undefined && entrada.value.etiquetas !== undefined
  );
});

const levantar = (e) => {
  const uri = e.target.files[0];

  // leo contenido
  let lector = new FileReader();
  lector.onload = (r) => (contenido.value = r.target.result);
  lector.readAsDataURL(uri);

  // leo columnas
  lector = new FileReader();
  lector.onload = (r) => {
    let lineas = r.target.result.split("\n");
    let nombres_columnas = lineas.shift().split(","); // primera linea
    let valores = lineas.shift().split(","); // segunda linea

    let indices_que_son_fechas = valores
      .map((v, i) => (Date.parse(v) > 0 && isNaN(v) ? i : -1))
      .filter((v) => v >= 0);
    let indices_que_son_texto = valores
      .map((v, i) => (isNaN(v) ? i : -1))
      .filter((v) => v >= 0 && !indices_que_son_fechas.includes(v));
    let indices_que_son_numeros = valores
      .map((v, i) => (!isNaN(v) ? i : -1))
      .filter((v) => v >= 0);

    columnas.value.textos = nombres_columnas.filter((_, i) =>
      indices_que_son_texto.includes(i)
    );
    columnas.value.numeros = nombres_columnas.filter((_, i) =>
      indices_que_son_numeros.includes(i)
    );
    columnas.value.fechas = nombres_columnas.filter((_, i) =>
      indices_que_son_fechas.includes(i)
    );
  };
  lector.readAsText(uri, "UTF-8");
};

const descargar = () => {
  const svg = document.querySelector("svg");
  const data = new XMLSerializer().serializeToString(svg);
  const svgBlob = new Blob([data], {
    type: "image/svg+xml;charset=utf-8",
  });

  // convert the blob object to a dedicated URL
  const url = URL.createObjectURL(svgBlob);

  // load the SVG blob to a flesh image object
  const img = new Image();
  img.addEventListener("load", () => {
    // draw the image on an ad-hoc canvas
    const bbox = svg.getBBox();

    const canvas = document.createElement("canvas");

    canvas.width = svg.getAttribute("width");
    canvas.height = svg.getAttribute("height");

    const context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    URL.revokeObjectURL(url);

    // trigger a synthetic download operation with a temporary link
    const a = document.createElement("a");
    a.download = descarga.value;
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.click();
    a.remove();
  });
  img.src = url;
};
</script>
