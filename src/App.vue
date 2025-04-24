<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar :is-collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />

    <div
      :class="[
        'transition-all duration-300 ease-in-out',
        isSidebarCollapsed ? 'mr-16' : 'mr-64',
      ]"
    >
      <Navbar @toggle-sidebar="toggleSidebar" />

      <main class="container mx-auto px-4 py-6">
        <router-view />
      </main>

      <footer class="bg-white shadow-inner p-4 text-center text-gray-600">
        <p>د.مها 🤍 فاطمة &copy; {{ new Date().getFullYear() }}</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import Sidebar from "./components/layout/Sidebar.vue";
import Navbar from "./components/layout/Navbar.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    Navbar,
  },
  setup() {
    const isSidebarCollapsed = ref(false);

    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value;
    };

    return {
      isSidebarCollapsed,
      toggleSidebar,
    };
  },
};
</script>
