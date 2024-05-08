<script setup>
import { ref } from "vue";
import { RouterLink, RouterView } from "vue-router";

const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<template>
  <div>
    <div id="header" class="text-center bg-teal-800 py-4 flex justify-between">
      <h1 class="text-4xl text-white font-bold p-4">
        Task Management Application
      </h1>
      <i
        class="fa-solid fa-bars fa-2xl p-6"
        style="color: #ffffff"
        id="btn"
        @click="toggleSidebar"
      ></i>
    </div>
    <nav
      class="bg-teal-800 left-0 min-h-[100vh] w-44 flex flex-col"
      id="sidebar"
      v-if="isSidebarVisible"
    >
      <RouterLink
        to="/"
        class="hover:text-orange-400 text-2xl text-white font-semibold"
        @click="toggleSidebar()"
        ><i class="fa-solid fa-house p-4"></i>Home</RouterLink
      ><br />
      <RouterLink
        to="/create/:id"
        class="hover:text-orange-400 text-2xl text-white font-semibold"
        @click="toggleSidebar()"
      >
        <i class="fa-solid fa-plus"></i>Task Creation </RouterLink
      ><br />

      <RouterLink
        to="/taskListing"
        class="hover:text-orange-400 text-2xl font-semibold text-white"
        @click="toggleSidebar()"
        ><i class="fa-solid fa-list"></i> Task Listing</RouterLink
      ><br />
    </nav>
    <RouterView />
  </div>
</template>

<style scoped></style>
