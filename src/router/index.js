import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import VistaPrincipal from "../views/VistaPrincipal.vue";
import VistaTopicoPorFechaYDiario from "../views/VistaTopicoPorFechaYDiario.vue";
import VistaTopicoPorFecha from "../views/VistaTopicoPorFecha.vue";
import VistaTopicoPorDiario from "../views/VistaTopicoPorDiario.vue";
import VistaTopicosPorFecha from "../views/VistaTopicosPorFecha.vue";
import VistaTopicosPorDiario from "../views/VistaTopicosPorDiario.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Principal",
      component: VistaPrincipal,
    },
    {
      path: "/topico-por-fecha-y-diario",
      name: "Topico: por fecha y diario",
      component: VistaTopicoPorFechaYDiario
    },
    {
      path: "/topico-por-fecha",
      name: "Topico: por fecha",
      component: VistaTopicoPorFecha
    },
    {
      path: "/topico-por-diario",
      name: "Topico: por diario",
      component: VistaTopicoPorDiario
    },
    {
      path: "/topicos-por-fecha",
      name: "Topicos: por fecha",
      component: VistaTopicosPorFecha
    },
    {
      path: "/topicos-por-diario",
      name: "Topicos: por diario",
      component: VistaTopicosPorDiario
    },
  ],
});

export default router;
