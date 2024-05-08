<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useTaskStore } from "@/stores/store";
import TaskListing from "./TaskListing.vue";

const showCreateForm = ref(false);

const router = useRouter();
const fetchstore = useTaskStore();
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const searchData = ref("");
const searchValue = ref(false);
const filteredTasks = ref([]);
const statusValue = ref("");
const filteredStatusTasks = ref([]);
const filterValue = ref(false);
const filteredDateTasks = ref([]);
const filterDateValue = ref("");
const dateValue = ref(false);

const goToTaskCreation = () => {
  // router.push({ name: "CreateTask" })
  showCreateForm.value = !showCreateForm.value;
  router.push("/create/:id");
  fetchstore.tasksStore = "";
};

const searchByTitle = () => {
  const lowerSearchData = searchData.value.toLowerCase();
  const tempFilteredTasks = [];
  searchValue.value = true;
  for (const task of tasks) {
    if (task.title.toLowerCase().includes(lowerSearchData)) {
      tempFilteredTasks.push(task);
    }
  }
  filteredTasks.value = tempFilteredTasks;
};

const filterByStatus = () => {
  const lowerFilterData = statusValue.value.toLowerCase();
  const filteredByStatusTasks = [];
  filterValue.value = true;
  for (const task of tasks) {
    if (task.status.toLowerCase().includes(lowerFilterData)) {
      filteredByStatusTasks.push(task);
    }
  }
  filteredStatusTasks.value = filteredByStatusTasks;
};
const filterByDate = () => {
  const filteredByTasks = [];
  dateValue.value = true;
  for (const task of tasks) {
    if (task.deadline <= filterDateValue.value) {
      filteredByTasks.push(task);
    }
  }
  filteredDateTasks.value = filteredByTasks;
};
</script>

<template>
  <div
    class="inset-0 overflow-auto bg-gradient-to-r from-teal-100 to-pink-100"
    style="width: 100vw; height: 100vh"
  >
    <div class="grid grid-cols-5">
      <button
        class="middle none center rounded-lg m-4 bg-pink-500 py-2 px-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none w-20 h-16"
        data-ripple-light="true"
        @click.prevent="goToTaskCreation"
      >
        <i class="fa-solid fa-plus" style="color: #e8eaee"></i> Create Task
      </button>

      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search by Title"
        v-model="searchData"
        class="border-4 bg-transparent px-4 py-1 mt-6 text-gray-900 border-teal-900 outline-none focus:outline-none rounded-lg min-w-40 h-12"
        @keyup.enter="searchByTitle()"
      />
      <button class="m-4 rounded bg-teal-800 px-4 py-2 text-white w-20 h-16">
        <i
          class="fa-solid fa-magnifying-glass"
          style="color: #eff0f0"
          @click="searchByTitle()"
        ></i
        >Search
      </button>

      <div class="flex flex-row-reverse">
        <div class="m-4 rounded bg-teal-800 px-4 py-2 text-white w-44">
          <i class="fa-solid fa-filter fa-lg" style="color: #f5f5f5"></i> Filter
          <label for="status" class="block mt-1">By Status:</label>
          <select
            class="p-0 mt-1 m-1 mb-1 w-30 text-center rounded-2xl text-black"
            v-model="statusValue"
            @change="filterByStatus()"
          >
            <option disabled value="">Please Select one</option>
            <option>Completed</option>
            <option>Ongoing</option>
          </select>
        </div>

        <div class="m-4 rounded bg-teal-800 px-4 py-2 text-white">
          <i class="fa-solid fa-filter fa-lg" style="color: #f5f5f5"></i> Filter

          <label for="deadline" class="block mb-2">By Deadline:</label>
          <input
            type="date"
            id="deadline"
            v-model.trim="filterDateValue"
            @change="filterByDate()"
            class="border border-gray-300 rounded-md px-4 py-2 text-black h-5"
          />
        </div>
      </div>
    </div>

    <div
      v-if="searchValue == false && filterValue == false && dateValue == false"
    >
      <TaskListing />
    </div>
    <div v-if="searchValue == true">
      <div class="grid grid-cols-2">
        <div
          v-for="(task, index) in filteredTasks"
          :key="index"
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

          <div class="flex gap-[36rem]">
            <p>{{ task.deadline }}</p>
            <div class="flex">
              <i
                class="fa-solid fa-trash-can p-2"
                @click="deleteTask(index)"
              ></i>
              <i class="fa-solid fa-pen p-2" @click="editTask(index)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filterValue == true">
      <div class="grid grid-cols-2">
        <div
          v-for="(task, index) in filteredStatusTasks"
          :key="index"
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

          <div class="flex gap-[36rem]">
            <p>{{ task.deadline }}</p>
            <div class="flex">
              <i
                class="fa-solid fa-trash-can p-2"
                @click="deleteTask(index)"
              ></i>
              <i class="fa-solid fa-pen p-2" @click="editTask(index)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="dateValue == true">
      <div class="grid grid-cols-2">
        <div
          v-for="(task, index) in filteredDateTasks"
          :key="index"
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

          <div class="flex gap-[36rem]">
            <p>{{ task.deadline }}</p>
            <div class="flex">
              <i
                class="fa-solid fa-trash-can p-2"
                @click="deleteTask(index)"
              ></i>
              <i class="fa-solid fa-pen p-2" @click="editTask(index)"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
