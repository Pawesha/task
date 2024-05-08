import { defineStore } from "pinia";

export const useTaskStore = defineStore("TaskStore", {
  state: () => ({
    tasksStore: [
      { id: "", title: "", description: "", deadline: "", status: "" },
    ],
  }),
  getters: {},
  actions: {},
});
