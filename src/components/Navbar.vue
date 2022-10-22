<script setup>
import { RouterLink, RouterView } from "vue-router";

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/">
          <a class="navbar-brand me-3">visus</a>
      </router-link>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <!-- twitter -->
          <li v-if="false" class="nav-item dropdown me-3">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Twitter
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="twitter-metricas-por-fecha-y-usuario">
                  <li class="dropdown-item">
                    Métricas / por <strong>fecha</strong> y <strong>usuario</strong>
                  </li>
              </router-link>
              <router-link to="twitter-metricas-por-grupos">
                  <li class="dropdown-item">
                    Métricas / por <strong>fecha</strong> y agrupando <strong>usuarios</strong>
                  </li>
              </router-link>
              <router-link to="twitter-discurso-por-termino-y-usuario">
                  <li class="dropdown-item">
                    Discurso / por <strong>término</strong> y <strong>usuario</strong>
                  </li>
              </router-link>
              <router-link to="twitter-discurso-por-grupos">
                  <li class="dropdown-item">
                    Discurso / agrupando <strong>términos</strong> y <strong>usuarios</strong> / chupetes
                  </li>
              </router-link>
              <router-link to="twitter-discurso-nube">
                  <li class="dropdown-item">
                    Discurso / agrupando <strong>términos</strong> y <strong>usuarios</strong> / nube
                  </li>
              </router-link>
            </ul>
          </li>

          <!-- medios -->
          <li class="nav-item dropdown me-3">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Medios
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">            
              <router-link to="topico-por-diario">
                  <li class="dropdown-item">
                    Un tópico / por <strong>diario</strong>
                  </li>
              </router-link>
              <router-link to="topico-por-fecha">
                  <li class="dropdown-item">
                    Un tópico / por <strong>fecha</strong>
                  </li>
              </router-link>
              <router-link to="topico-por-fecha-y-diario">
                  <li class="dropdown-item">
                    Un tópico / por <strong>fecha</strong> y <strong>diario</strong>
                  </li>
              </router-link>
              <router-link to="topicos-por-diario">
                  <li class="dropdown-item">
                    Dos o más tópicos / por <strong>diario</strong>
                  </li>
              </router-link>
              <router-link to="topicos-por-fecha">
                  <li class="dropdown-item">
                    Dos o más tópicos / por <strong>fecha</strong>
                  </li>
              </router-link>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>