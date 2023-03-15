<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link to="/">
        <a class="navbar-brand">visus</a>
      </router-link>
      <div class="collapse navbar-collapse" id="navbarText">
        <div class="container">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <template v-for="vista in vistas">
              <div class="col">
                <router-link :to="vista.ruta">
                  <li class="nav-item">
                    <span :class="clases_para(vista.ruta)">{{
                      vista.etiqueta
                    }}</span>
                  </li>
                </router-link>
              </div>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const vistas = [
  { ruta: "barras", etiqueta: "📊 barras" },
  { ruta: "series", etiqueta: "📈 series de tiempo" },
  { ruta: "chupetes", etiqueta: "🍭 chupetes" },
  { ruta: "nube", etiqueta: "☁️ nube" },
];

const clases_para = (ruta) => {
  return {
    "nav-link": true,
    active: route.name == ruta,
    "fw-bold": route.name == ruta,
  };
};
</script>
