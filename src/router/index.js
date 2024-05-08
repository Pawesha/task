import { createRouter, createWebHistory } from "vue-router";

// Defining route component by importing
import TaskCreationForm from "../components/TaskCreationForm.vue";
import Home from "../components/Home.vue";
import TaskListing from "@/components/TaskListing.vue";

//Define Routes, each route is mapping to a component
const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
  },
  {
    path: "/create/:id",
    component: TaskCreationForm,
    name: "CreateTask",
  },
  {
    path: "/taskListing",
    component: TaskListing,
    name: "TaskListing",
  },
];

const router = createRouter({
  //Provide the history implementation
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
