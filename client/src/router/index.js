import Vue from "vue";
import VueRouter from "vue-router";
import Frontpage from "../views/Frontpage.vue";
import Dashboard from "../views/Dashboard.vue";
import Letsstart from "../components/Letsstart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Frontpage",
    component: Frontpage
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "/letsstart",
        name: "Letsstart",
        component: Letsstart
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
