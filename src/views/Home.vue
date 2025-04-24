<template>
  <div class="fade-in">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">
          المهام الإجمالية
        </h3>
        <p class="dashboard-stat">{{ totalTasks }}</p>
        <p class="text-sm text-gray-500 mt-2">إجمالي عدد المهام في المشروع</p>
      </div>

      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">
          المهام المكتملة
        </h3>
        <p class="dashboard-stat">{{ completedTasks }}</p>
        <p class="text-sm text-gray-500 mt-2">
          {{ completionPercentage }}% من المهام مكتملة
        </p>
      </div>

      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">
          الأوراق العلمية
        </h3>
        <p class="dashboard-stat">{{ papersCount }}</p>
        <p class="text-sm text-gray-500 mt-2">عدد الأوراق العلمية المراجعة</p>
      </div>

      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">المشاركون</h3>
        <p class="dashboard-stat">{{ participantsCount }}</p>
        <p class="text-sm text-gray-500 mt-2">عدد المشاركين في الدراسة</p>
      </div>
    </div>

    <div class="dashboard-card mb-8">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">
        رابط الورقة العلمية
      </h3>
      <div class="flex justify-center">
        <a
          href="https://www.overleaf.com/4646177466qdcvydfgtqbh#dbd4ca"
          target="_blank"
          class="btn btn-primary flex items-center justify-center"
        >
          <i class="fas fa-file-alt ml-2"></i>
          الورقة العلمية على Overleaf
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="dashboard-card lg:col-span-2">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-700">تقدم المهام</h3>
          <router-link
            to="/tasks"
            class="text-primary-600 hover:text-primary-800 text-sm"
          >
            عرض الكل <i class="fas fa-arrow-left mr-1"></i>
          </router-link>
        </div>

        <div class="mb-4">
          <div class="flex justify-between mb-1">
            <span class="text-sm font-medium text-gray-700"
              >التقدم الإجمالي</span
            >
            <span class="text-sm font-medium text-gray-700"
              >{{ completionPercentage }}%</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div
              class="bg-primary-600 h-2.5 rounded-full"
              :style="{ width: completionPercentage + '%' }"
            ></div>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="(category, index) in taskCategories"
            :key="index"
            class="flex items-center"
          >
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center mr-3"
              :class="category.bgColor"
            >
              <i :class="['fas', category.icon, 'text-white']"></i>
            </div>
            <div class="flex-grow">
              <div class="flex justify-between mb-1">
                <span class="text-sm font-medium text-gray-700">{{
                  category.name
                }}</span>
                <span class="text-sm font-medium text-gray-700"
                  >{{ category.percentage }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="h-2 rounded-full"
                  :class="category.barColor"
                  :style="{ width: category.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">المهام القادمة</h3>

        <div v-if="loading" class="text-center py-4">
          <i class="fas fa-spinner fa-spin text-primary-600 text-xl"></i>
          <p class="text-gray-600 mt-2">جاري تحميل البيانات...</p>
        </div>

        <div v-else-if="upcomingTasks.length === 0" class="text-center py-4">
          <i class="fas fa-check-circle text-green-600 text-xl"></i>
          <p class="text-gray-600 mt-2">لا توجد مهام قادمة حالياً</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="task in upcomingTasks"
            :key="task.id"
            class="p-3 bg-gray-50 rounded-lg"
          >
            <h4 class="font-medium text-gray-800">
              {{ task.title || task.name }}
            </h4>
            <p class="text-sm text-gray-600 mt-1">{{ task.description }}</p>
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs text-gray-500">
                <i class="far fa-calendar-alt ml-1"></i
                >{{ formatDate(task.dueDate) }}
              </span>
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getPriorityClass(task.priority)"
              >
                {{ task.priority }}
              </span>
            </div>
          </div>
        </div>

        <div class="mt-4 text-center">
          <router-link to="/tasks" class="btn btn-outline text-sm">
            <i class="fas fa-plus ml-1"></i>إضافة مهمة جديدة
          </router-link>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div class="dashboard-card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-700">
            آخر الأوراق العلمية
          </h3>
          <router-link
            to="/literature"
            class="text-primary-600 hover:text-primary-800 text-sm"
          >
            عرض الكل <i class="fas fa-arrow-left mr-1"></i>
          </router-link>
        </div>

        <div v-if="loading" class="text-center py-4">
          <i class="fas fa-spinner fa-spin text-primary-600 text-xl"></i>
          <p class="text-gray-600 mt-2">جاري تحميل البيانات...</p>
        </div>

        <div v-else-if="recentPapers.length === 0" class="text-center py-4">
          <i class="fas fa-book text-primary-600 text-xl"></i>
          <p class="text-gray-600 mt-2">لا توجد أوراق علمية مضافة حالياً</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="paper in recentPapers"
            :key="paper.id"
            class="flex items-start p-3 bg-gray-50 rounded-lg"
          >
            <div
              class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center ml-3"
            >
              <i class="fas fa-file-alt text-primary-600"></i>
            </div>
            <div class="flex-grow">
              <h4 class="font-medium text-gray-800">{{ paper.title }}</h4>
              <p class="text-sm text-gray-600 mt-1">
                {{ paper.summary || paper.abstract }}
              </p>
              <div class="flex items-center mt-2 text-xs text-gray-500">
                <span class="ml-3"
                  ><i class="far fa-calendar-alt ml-1"></i
                  >{{ paper.year }}</span
                >
                <span
                  ><i class="fas fa-tag ml-1"></i
                  >{{ paper.methodology || paper.type }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-card">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-700">آخر التحديثات</h3>
          <router-link
            to="/tasks"
            class="text-primary-600 hover:text-primary-800 text-sm"
          >
            عرض الكل <i class="fas fa-arrow-left mr-1"></i>
          </router-link>
        </div>

        <div v-if="loading" class="text-center py-4">
          <i class="fas fa-spinner fa-spin text-primary-600 text-xl"></i>
          <p class="text-gray-600 mt-2">جاري تحميل البيانات...</p>
        </div>

        <div v-else-if="recentUpdates.length === 0" class="text-center py-4">
          <i class="fas fa-bell-slash text-gray-500 text-xl"></i>
          <p class="text-gray-600 mt-2">لا توجد تحديثات حديثة</p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="update in recentUpdates"
            :key="update.id"
            class="border-r-2 pr-4"
            :class="getUpdateBorderColor(update.type)"
          >
            <span class="text-xs text-gray-500 block mb-1">{{
              formatDate(update.timestamp || update.date)
            }}</span>
            <h4 class="font-medium text-gray-800">{{ update.title }}</h4>
            <p class="text-sm text-gray-600 mt-1">{{ update.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import {
  taskService,
  literatureService,
  dataService,
} from "../services/firebase";

export default {
  name: "Home",
  setup() {
    // Data states
    const tasks = ref([]);
    const papers = ref([]);
    const children = ref([]);
    const updates = ref([]);
    const loading = ref(true);

    // Computed values
    const totalTasks = computed(() => tasks.value.length);

    const completedTasks = computed(
      () =>
        tasks.value.filter(
          (task) => task.status === "done" || task.column === "done"
        ).length
    );

    const completionPercentage = computed(() => {
      if (totalTasks.value === 0) return 0;
      return Math.round((completedTasks.value / totalTasks.value) * 100);
    });

    const papersCount = computed(() => papers.value.length);

    const participantsCount = computed(() => children.value.length);

    // Task categories with dynamic percentages
    const taskCategories = computed(() => {
      // Define categories and their corresponding tags or identifiers
      const categories = [
        {
          name: "جمع البيانات",
          tags: ["جمع البيانات", "تسجيل", "مقابلة"],
          icon: "fa-database",
          bgColor: "bg-blue-500",
          barColor: "bg-blue-500",
        },
        {
          name: "تحليل البيانات",
          tags: ["تحليل", "إحصاء", "معالجة"],
          icon: "fa-chart-bar",
          bgColor: "bg-green-500",
          barColor: "bg-green-500",
        },
        {
          name: "كتابة البحث",
          tags: ["كتابة", "توثيق", "مراجعة أدبية"],
          icon: "fa-pen",
          bgColor: "bg-purple-500",
          barColor: "bg-purple-500",
        },
        {
          name: "المراجعة",
          tags: ["مراجعة", "تدقيق", "تصحيح"],
          icon: "fa-check",
          bgColor: "bg-yellow-500",
          barColor: "bg-yellow-500",
        },
      ];

      // Calculate completion percentage for each category
      return categories.map((category) => {
        // Filter tasks that belong to this category
        const categoryTasks = tasks.value.filter((task) => {
          // Check if task has any tag that matches this category
          if (task.tags && Array.isArray(task.tags)) {
            return task.tags.some((tag) => category.tags.includes(tag));
          }
          // Check if task title or description contains category keywords
          return category.tags.some(
            (tag) =>
              (task.title && task.title.includes(tag)) ||
              (task.description && task.description.includes(tag))
          );
        });

        // Calculate completion percentage
        const totalCategoryTasks = categoryTasks.length;
        const completedCategoryTasks = categoryTasks.filter(
          (task) => task.status === "done" || task.column === "done"
        ).length;

        const percentage =
          totalCategoryTasks > 0
            ? Math.round((completedCategoryTasks / totalCategoryTasks) * 100)
            : 0;

        return {
          ...category,
          percentage,
        };
      });
    });

    // Get upcoming tasks (not completed, sorted by due date)
    const upcomingTasks = computed(() => {
      return tasks.value
        .filter(
          (task) =>
            task.status !== "done" && task.column !== "done" && task.dueDate
        )
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 3); // Get only the first 3 upcoming tasks
    });

    // Get recent papers (sorted by timestamp, newest first)
    const recentPapers = computed(() => {
      return [...papers.value]
        .sort((a, b) => {
          const dateA = a.timestamp || new Date(a.year).getTime();
          const dateB = b.timestamp || new Date(b.year).getTime();
          return dateB - dateA;
        })
        .slice(0, 3); // Get only the first 3 recent papers
    });

    // Generate recent updates based on tasks and papers
    const recentUpdates = computed(() => {
      const taskUpdates = tasks.value
        .filter((task) => task.dateCreated || task.lastModified)
        .map((task) => ({
          id: task.id,
          title: `تم ${
            task.status === "done" || task.column === "done" ? "إكمال" : "تحديث"
          } مهمة: ${task.title || task.name}`,
          description: task.description || "تم تحديث حالة المهمة",
          timestamp: task.lastModified || task.dateCreated,
          type: "task",
        }));

      const paperUpdates = papers.value
        .filter((paper) => paper.timestamp)
        .map((paper) => ({
          id: paper.id,
          title: `تمت إضافة ورقة علمية جديدة`,
          description: paper.title,
          timestamp: paper.timestamp,
          type: "paper",
        }));

      // Combine and sort all updates by timestamp (newest first)
      return [...taskUpdates, ...paperUpdates]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 3); // Get only the first 3 recent updates
    });

    // Helper functions
    const formatDate = (dateString) => {
      if (!dateString) return "غير محدد";

      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return as is if invalid date

      // Format date in Arabic style
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("ar-SA", options);
    };

    const getPriorityClass = (priority) => {
      switch (priority?.toLowerCase()) {
        case "high":
        case "عالي":
        case "عاجل":
          return "bg-red-100 text-red-800";
        case "medium":
        case "متوسط":
          return "bg-yellow-100 text-yellow-800";
        case "low":
        case "منخفض":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    const getUpdateBorderColor = (type) => {
      switch (type) {
        case "task":
          return "border-blue-500";
        case "paper":
          return "border-green-500";
        case "child":
          return "border-purple-500";
        default:
          return "border-gray-500";
      }
    };

    // Fetch data from Firebase
    onMounted(() => {
      loading.value = true;

      // Helper function to check if all data is loaded
      const checkLoading = () => {
        if (
          tasks.value !== undefined &&
          papers.value !== undefined &&
          children.value !== undefined
        ) {
          loading.value = false;
        }
      };

      // Fetch tasks
      taskService.getTasks(
        (data) => {
          tasks.value = data;
          checkLoading();
        },
        (error) => {
          console.error("خطأ في تحميل المهام:", error);
          loading.value = false;
        }
      );

      // Fetch papers
      literatureService.getPapers((data) => {
        papers.value = data;
        checkLoading();
      });

      // Fetch children
      dataService.getChildren((data) => {
        children.value = data;
        checkLoading();
      });
    });

    return {
      // Data
      tasks,
      papers,
      children,
      loading,

      // Computed values
      totalTasks,
      completedTasks,
      completionPercentage,
      papersCount,
      participantsCount,
      taskCategories,
      upcomingTasks,
      recentPapers,
      recentUpdates,

      // Helper functions
      formatDate,
      getPriorityClass,
      getUpdateBorderColor,
    };
  },
};
</script>
