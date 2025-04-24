<template>
  <nav class="navbar px-4 py-3 flex justify-between items-center">
    <div class="flex items-center">
      <button
        @click="$emit('toggle-sidebar')"
        class="text-gray-600 hover:text-gray-900 ml-2"
      >
        <i class="fas fa-bars"></i>
      </button>
      <h1 class="text-xl font-bold text-primary-700 mr-4">
        إدارة مهام البحث العلمي - متلازمة داون
      </h1>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";

export default {
  name: "Navbar",
  emits: ["toggle-sidebar"],
  setup() {
    const isUserMenuOpen = ref(false);

    return {
      isUserMenuOpen,
    };
  },
};
</script>
