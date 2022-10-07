<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link to="/">
        <a class="navbar-brand">visus</a>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Un sólo tópicos
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- <router-link to="topico-conteo">
                <li class="dropdown-item">
                Rápido
                </li>
            </router-link> -->
            <router-link to="topico-por-fecha">
                <li class="dropdown-item">
                Por fecha
                </li>
            </router-link>
            <router-link to="topico-por-diario">
                <li class="dropdown-item">
                Por diario
                </li>
            </router-link>
            <router-link to="topico-por-fecha-y-diario">
                <li class="dropdown-item">
                Por fecha y diario
                </li>
            </router-link>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dos o más tópicos
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <!-- <router-link to="topicos-conteo">
                <li class="dropdown-item">
                Rápido
                </li>
            </router-link> -->
            <router-link to="topicos-por-fecha">
                <li class="dropdown-item">
                Por fecha
                </li>
            </router-link>
            <router-link to="topicos-por-diario">
                <li class="dropdown-item">
                Por diario
                </li>
            </router-link>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>