<template>
  <div class="container-fluid" :style="{'background-color': lienzoStore.fondo}">
    <div class="row">
      <div class="col-2" style="background-color: rgb(220, 220, 220)">
        <!-- columna controles -->
        <controles-comunes
          :mostrar="!es_inicio"
          v-model:lienzo="parametros_lienzo"
          v-model:titulo="parametros_titulo"
          v-model:margenes="parametros_margenes"
          @levantar="levantar"
          @dibujar="dibujar"
          @color="color"
        >
          <slot :mostrar="data.tuplas.length" name="controles"> </slot>
        </controles-comunes>
      </div>

      <div class="col">
        <!-- columna lienzo -->
        <lienzo
          :ancho="parametros_lienzo.ancho"
          :alto="parametros_lienzo.alto"
          :fondo="parametros_lienzo.fondo"
          :titulo_color="parametros_titulo.color"
          :titulo_x="parametros_titulo.x"
          :titulo_y="parametros_titulo.y"
          :titulo_tamanio="parametros_titulo.tamanio"
          :titulo_texto="parametros_titulo.texto"
        />

        <slot
          name="grafico"
          :lienzo="parametros_lienzo"
          :margenes="parametros_margenes"
          :data="data"
        ></slot>

        <leyenda :grupos="data.grupos" :parametros="parametros_leyenda" />
      </div>

      <div class="col-3" style="background-color: rgb(220, 220, 220)">
        <controles-leyenda
          v-model="data"
          v-model:parametros="parametros_leyenda"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import * as d3 from "d3";

import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import lienzo from "../componentes/Lienzo.vue";
import leyenda from "../componentes/Leyenda.vue";
import ControlesComunes from "../componentes/controles/ControlesComunes.vue";
import ControlesLeyenda from "../componentes/controles/ControlesLeyenda.vue";

import { usarLienzoStore } from '../stores/lienzo.js' 
const lienzoStore = usarLienzoStore()

const ruta = useRoute();

const es_inicio = computed(() => ruta.name == "inicio");

var parametros_lienzo = ref({});
var parametros_titulo = ref({});
var parametros_margenes = ref({});
var parametros_leyenda = ref({});

var data = ref({
  tuplas: [],
  grupos: {},
});

const color = (color) => {
  data.value.tuplas = data.value.tuplas.map((t) => ({ ...t, color: color }));
};

const dibujar = ({ contenido, entrada, color }) => {
  entrada = { 
    etiquetas : entrada.etiquetas.trim(),
    valores : entrada.valores.trim(),
    grupos : entrada.grupos.trim(),
  }
  d3.csv(contenido).then((filas) => {
    let grupos = ["", undefined].includes(entrada.grupos) ? undefined : [];

    let conteo = {};
    data.value.grupos = {};
    filas.forEach((fila) => {
      let clave = fila[entrada.etiquetas];
      if (grupos !== undefined) {
        let grupo = fila[entrada.grupos];
        clave += "_" + grupo;

        if (!(grupo in data.value.grupos)) {
          data.value.grupos[grupo] = { color: str2hexacolor(grupo) };
        }
      }

      if (!(clave in conteo)) conteo[clave] = 0;

      conteo[clave] += Number(fila[entrada.valores]);
    });

    if (Object.keys(conteo).length == 0) {
      alert("No se pudo cargar el csv.");
      data.value.tuplas = null;
      return;
    }

    let tuplas = [];
    for (const c of Object.entries(conteo).sort((a, b) =>
      Number(a[1]) < Number(b[1]) ? 1 : -1
    )) {
      const valor = c[1];
      const etiqueta = c[0].split("_")[0];
      const grupo = grupos !== undefined ? c[0].split("_")[1] : null;

      color = grupos !== undefined ? data.value.grupos[grupo].color : color;
      tuplas.push({ valor, etiqueta, grupo, color });
    }
    data.value.tuplas = tuplas;
  });
};

var str2hexacolor = function (str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
};
</script>
