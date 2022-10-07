<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from './components/Navbar.vue';
</script>

<template>
    <Navbar/>
    <div class="container-fluid mt-3"> 
      <router-view></router-view>
    </div>
</template>
