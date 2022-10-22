import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import VistaPrincipal from "../views/VistaPrincipal.vue";
import VistaTwitterMetricasPorFechaYUsuario from "../views/VistaTwitterMetricasPorFechaYUsuario.vue";
import VistaTwitterMetricasPorGrupos from "../views/VistaTwitterMetricasPorGrupos.vue";
import VistaTwitterDiscursoPorTerminoYUsuario from "../views/VistaTwitterDiscursoPorTerminoYUsuario.vue";
import VistaTwitterDiscursoPorGrupos from "../views/VistaTwitterDiscursoPorGrupos.vue";
import VistaTwitterDiscursoNube from "../views/VistaTwitterDiscursoNube.vue";

import VistaTopicoPorFecha from "../views/VistaTopicoPorFecha.vue"
import VistaTopicoPorDiario from "../views/VistaTopicoPorDiario.vue"
import VistaTopicoPorFechaYDiario from "../views/VistaTopicoPorFechaYDiario.vue"

import VistaTopicosPorFecha from "../views/VistaTopicosPorFecha.vue"
import VistaTopicosPorDiario from "../views/VistaTopicosPorDiario.vue"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Principal",
      component: VistaPrincipal,
    },
    {
      path: "/twitter-metricas-por-fecha-y-usuario",
      name: "Métricas: por fecha y usuario",
      component: VistaTwitterMetricasPorFechaYUsuario
    },
    {
      path: "/twitter-metricas-por-grupos",
      name: "Métricas: por grupos de usuarios",
      component: VistaTwitterMetricasPorGrupos
    },
    {
      path: "/twitter-discurso-por-termino-y-usuario",
      name: "Discurso: por término y usuario",
      component: VistaTwitterDiscursoPorTerminoYUsuario
    },
    {
      path: "/twitter-discurso-por-grupos",
      name: "Discurso: por grupos de términos y usuarios",
      component: VistaTwitterDiscursoPorGrupos
    },
    {
      path: "/twitter-discurso-nube",
      name: "Discurso: nube de palabras",
      component: VistaTwitterDiscursoNube
    },

    {
      path: "/topico-por-diario",
      name: "Un tópico: por diario",
      component: VistaTopicoPorDiario
    },
    {
      path: "/topico-por-fecha",
      name: "Un tópico: por fecha",
      component: VistaTopicoPorFecha
    },
    {
      path: "/topico-por-fecha-y-diario",
      name: "Un tópico: por fecha y diario",
      component: VistaTopicoPorFechaYDiario
    },
    {
      path: "/topicos-por-diario",
      name: "Dos o más tópicos: por diario",
      component: VistaTopicosPorDiario
    },
    {
      path: "/topicos-por-fecha",
      name: "Dos o más tópicos: por fecha",
      component: VistaTopicosPorFecha
    },
  ],
});

export default router;
