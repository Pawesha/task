<script setup>
import SideBar from "@/components/SideBar.vue";
import { useTaskStore } from "@/stores/store.js";

const taskStore = useTaskStore();
</script>

<template class="flex bg-gradient-to-r from-teal-100 to-pink-100 " style="width: 100vw; height: 100vh;">
  <SideBar />
</template>

<style  scoped></style>