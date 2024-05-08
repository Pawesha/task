<script setup>
import { ref, reactive } from "vue";
import { uid } from "uid";
import { useRouter, useRoute } from "vue-router";

import { useTaskStore } from "@/stores/store";

const router = useRouter();
const route = useRoute();
const fetchstore = useTaskStore();
const FormSubmitted = ref(true);
const today = new Date().toISOString().split("T")[0];

const formData = reactive({
  title: fetchstore.tasksStore.title || "",
  description: fetchstore.tasksStore.description || "",
  deadline: fetchstore.tasksStore.deadline || "",
  status: fetchstore.tasksStore.status || "",
});

const errorChecking = () => {
  if (
    !formData.title ||
    !formData.description ||
    !formData.deadline ||
    !formData.status
  ) {
    FormSubmitted.value = false;
  } else {
    FormSubmitted.value = true;
    addTasks();
    router.push("/");
  }
};

const errorTitle = () => {
  if (formData.title === "") {
    return true;
  } else {
    return false;
  }
};

const errorDescription = () => {
  if (formData.description === "") {
    return true;
  } else {
    return false;
  }
};

const errorStatus = () => {
  if (formData.status === "") {
    return true;
  } else {
    return false;
  }
};

const errorDate = () => {
  if (formData.deadline === "") {
    return true;
  } else {
    return false;
  }
};

const addTasks = () => {
  const uniqueId = uid();
  const taskData = {
    id: uniqueId,
    title: formData.title,
    description: formData.description,
    deadline: formData.deadline,
    status: formData.status,
  };
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const cancelGoToHome = () => {
  router.push("/");
};
</script>

<template>
  <!-- {{ route.params.id }} -->
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Task Creation</h2>

    <div class="mb-2">
      <label for="title" class="block mb-2">Title:</label>
      <input
        type="text"
        id="title"
        v-model.trim="formData.title"
        class="w-full border border-gray-300 rounded-md px-4 py-2 mb-0"
      />
    </div>
    <div v-if="errorTitle() && !FormSubmitted" class="p-0 m-0 text-red-600">
      Please enter a title.
    </div>
    <div>
      <label for="description" class="block mb-2">Description:</label>
      <textarea
        type="text"
        v-model.trim="formData.description"
        class="w-full border border-gray-300 rounded-md px-4 py-2"
      ></textarea>
    </div>
    <div
      v-if="errorDescription() && !FormSubmitted"
      class="p-0 m-0 text-red-600"
    >
      Please enter description.
    </div>
    <div class="mb-2">
      <label for="deadline" class="block mb-2">Deadline:</label>
      <input
        type="date"
        id="deadline"
        v-model.trim="formData.deadline"
        class="w-full border border-gray-300 rounded-md px-4 py-2"
        :min="today"
      />
    </div>
    <div v-if="errorDate() && !FormSubmitted" class="p-0 m-0 text-red-600">
      Please enter a date.
    </div>
    <div class="mb-2">
      <label for="status" class="block mb-2">Status:</label>
      <select
        v-model="formData.status"
        class="w-full border border-gray-300 rounded-md px-4 py-2"
      >
        <option disabled value="">Please Select one</option>
        <option>Completed</option>
        <option>Ongoing</option>
      </select>
      <div v-if="errorStatus() && !FormSubmitted" class="p-0 m-0 text-red-600">
        Please select status.
      </div>
    </div>
    <button
      class="middle none center rounded-lg m-4 bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      data-ripple-light="true"
      @click="errorChecking()"
    >
      Submit
    </button>
    <button
      class="middle none center rounded-lg m-4 bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      data-ripple-light="true"
      @click="cancelGoToHome()"
    >
      Cancel
    </button>
  </div>
</template>
