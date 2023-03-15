import { createRouter, createWebHashHistory } from "vue-router";
import VistaInicio from "../vistas/VistaInicio.vue";

import VistaBarras from "../vistas/VistaBarras.vue";
import VistaChupetes from "../vistas/VistaChupetes.vue";
import VistaSeries from "../vistas/VistaSeries.vue";
import VistaNube from "../vistas/VistaNube.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: VistaInicio,
    },
    {
      path: "/barras",
      name: "barras",
      component: VistaBarras,
    },
    {
      path: "/series",
      name: "series",
      component: VistaSeries,
    },
    {
      path: "/chupetes",
      name: "chupetes",
      component: VistaChupetes,
    },
    {
      path: "/nube",
      name: "nube",
      component: VistaNube,
    },
  ],
});

export default router;
