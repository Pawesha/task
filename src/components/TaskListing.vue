<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import draggable from "vuedraggable";

import { useTaskStore } from "@/stores/store";

const router = useRouter();
const fetchstore = useTaskStore();

const tasks = ref(JSON.parse(localStorage.getItem("tasks")) || []);
const showCreateForm = ref(false);

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const editTask = (index) => {
  showCreateForm.value = !showCreateForm.value;
  fetchstore.tasksStore = tasks.value.pop(index);
  const editedTask = fetchstore.tasksStore;
  router.push(`/create/${editedTask.id}`);
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};

const onDragEnd = (e) => {
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
  const updatedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.value = updatedTasks;
};

const startDrag = (event, task, index) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("taskValue", JSON.stringify(task));
  event.dataTransfer.setData("taskIndex", index);
  // Note:commented for reference
  // Convert task object to string natra task object ma save hunxa
};

const onDrop = (event, droppedTaskIndex) => {
  const taskValue = event.dataTransfer.getData("taskValue");
  const taskIndex = event.dataTransfer.getData("taskIndex");
  const droppedTask = JSON.parse(taskValue);
  tasks.value.splice(taskIndex, 1);
  tasks.value.splice(droppedTaskIndex, 0, droppedTask);
  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<!-- <template >
  <draggable v-model="tasks" @end="onDragEnd" tag="div" item-key="index" v-if="tasks?.length > 0">
    <template #item="{ element: task, index }" v-for="task in tasks">
      <div
        class="box-border-double border-teal-700 border-4 rounded-lg min-w-20 min-h-20 p-2 m-10 shadow-lg shadow-teal-800/40  ">
        <div v-if="task.status == 'Completed'" class="bg-green-500 p-0 m-1 mb-5 w-24 text-center rounded-2xl">
          {{ task.status }}
        </div>
        <div v-if="task.status == 'Ongoing'" class="bg-red-500 p-0 m-1 w-24 text-center rounded-2xl">{{ task.status }}
        </div>
        <h1 class="font-mono  text-2xl font-bold "> {{ task.title }}</h1>
        <p class="font-sans"> {{ task.description }}</p>
        <hr class="border-teal-600 mt-2.5 pt-2.5">
        <div class="flex gap-[90rem]">
          <h1>{{ task.deadline }}</h1>
          <div class="flex">
            <i class="fa-solid fa-trash-can p-2" @click="deleteTask(index)"></i>
            <i class="fa-solid fa-pen p-2" @click="editTask(index)"></i>
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template> -->

<template>
  <div
    v-for="(task, index) in tasks"
    :key="index"
    draggable="true"
    @dragstart="startDrag($event, task, index)"
    @drop="onDrop($event, index)"
    @dragenter.prevent
    @dragover.prevent
    class="box-border-double border-teal-700 border-4 rounded-lg min-w-20 min-h-20 p-2 m-10 shadow-lg shadow-teal-800/40"
  >
    <div
      v-if="task.status == 'Completed'"
      class="bg-green-500 p-0 m-1 mb-5 w-24 text-center rounded-2xl"
    >
      {{ task.status }}
    </div>
    <div
      v-if="task.status == 'Ongoing'"
      class="bg-red-500 p-0 m-1 w-24 text-center rounded-2xl"
    >
      {{ task.status }}
    </div>
    <h1 class="font-mono text-2xl font-bold">{{ task.title }}</h1>
    <p class="font-sans">{{ task.description }}</p>
    <hr class="border-teal-600 mt-2.5 pt-2.5" />
    <div class="flex gap-[90rem]">
      <h1>{{ task.deadline }}</h1>
      <div class="flex">
        <i class="fa-solid fa-trash-can p-2" @click="deleteTask(index)"></i>
        <i class="fa-solid fa-pen p-2" @click="editTask(index)"></i>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
