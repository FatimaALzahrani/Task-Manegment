<template>
  <aside :class="['sidebar', { 'sidebar-collapsed': isCollapsed }]">
    <div class="p-4 flex justify-between items-center">
      <div v-if="!isCollapsed" class="text-xl font-bold text-white">
        إدارة البحث
      </div>
      <button @click="$emit('toggle')" class="text-gray-300 hover:text-white">
        <i
          :class="isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left'"
        ></i>
      </button>
    </div>

    <nav class="mt-6">
      <router-link
        to="/"
        class="sidebar-link"
        :title="isCollapsed ? 'الرئيسية' : ''"
      >
        <i class="fas fa-home mr-3"></i>
        <span v-if="!isCollapsed">الرئيسية</span>
      </router-link>

      <router-link
        to="/tasks"
        class="sidebar-link"
        :title="isCollapsed ? 'إدارة المهام' : ''"
      >
        <i class="fas fa-tasks mr-3"></i>
        <span v-if="!isCollapsed">إدارة المهام</span>
      </router-link>

      <router-link
        to="/literature"
        class="sidebar-link"
        :title="isCollapsed ? 'مراجعة الأدبيات' : ''"
      >
        <i class="fas fa-book mr-3"></i>
        <span v-if="!isCollapsed">مراجعة الأدبيات</span>
      </router-link>

      <router-link
        to="/data"
        class="sidebar-link"
        :title="isCollapsed ? 'البيانات' : ''"
      >
        <i class="fas fa-database mr-3"></i>
        <span v-if="!isCollapsed">البيانات</span>
      </router-link>

      <router-link
        to="/letters"
        class="sidebar-link"
        :title="isCollapsed ? 'الخطابات' : ''"
      >
        <i class="fas fa-envelope mr-3"></i>
        <span v-if="!isCollapsed">الخطابات</span>
      </router-link>

      <router-link
        to="/workflow"
        class="sidebar-link"
        :title="isCollapsed ? 'ورك فلو' : ''"
      >
        <i class="fas fa-project-diagram mr-3"></i>
        <span v-if="!isCollapsed">ورك فلو</span>
      </router-link>

      <router-link
        to="/code-links"
        class="sidebar-link"
        :title="isCollapsed ? 'روابط الأكواد' : ''"
      >
        <i class="fas fa-code mr-3"></i>
        <span v-if="!isCollapsed">روابط الأكواد</span>
      </router-link>
    </nav>

    <div class="absolute bottom-0 w-full p-4">
      <div v-if="!isCollapsed" class="text-sm text-gray-400">
        <p>متلازمة داون - البحث العلمي</p>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle"],
};
</script>
