<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">إدارة المهام</h1>
      <button @click="showAddTaskModal = true" class="btn btn-primary">
        <i class="fas fa-plus ml-2"></i>إضافة مهمة جديدة
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="بحث في المهام..."
            class="form-input py-2 pl-10 pr-4"
          />
          <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>

        <select v-model="filterPriority" class="form-input py-2">
          <option value="">كل الأولويات</option>
          <option value="عاجل">عاجل</option>
          <option value="متوسط">متوسط</option>
          <option value="منخفض">منخفض</option>
        </select>

        <select v-model="filterTag" class="form-input py-2">
          <option value="">كل التصنيفات</option>
          <option value="بحث">بحث</option>
          <option value="كتابة">كتابة</option>
          <option value="تحليل">تحليل</option>
          <option value="تسجيل">تسجيل</option>
          <option value="مراجعة">مراجعة</option>
        </select>
      </div>
    </div>

    <div class="task-board">
      <div v-for="column in columns" :key="column.id" class="task-column">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-gray-700">{{ column.name }}</h3>
          <span
            class="bg-gray-200 text-gray-700 text-sm py-1 px-2 rounded-full"
          >
            {{ getTasksForColumn(column.id).length }}
          </span>
        </div>

        <div class="min-h-[200px]" :id="column.id" :data-column-id="column.id">
          <div
            v-for="task in getTasksForColumn(column.id)"
            :key="task.id"
            class="task-card"
            :data-task-id="task.id"
            @click="openTaskDetails(task)"
          >
            <div class="flex justify-between items-start">
              <h4 class="font-medium text-gray-800">{{ task.name }}</h4>
              <span
                class="px-2 py-1 text-xs rounded-full"
                :class="getPriorityClass(task.priority)"
              >
                {{ task.priority }}
              </span>
            </div>

            <p v-if="task.description" class="text-sm text-gray-600 mt-2">
              {{ truncateText(task.description, 100) }}
            </p>

            <div class="flex justify-between items-center mt-3">
              <div class="flex space-x-1 space-x-reverse">
                <span
                  v-for="tag in task.tags"
                  :key="tag"
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>

              <div class="text-xs text-gray-500">
                <i class="far fa-calendar-alt ml-1"></i
                >{{ task.dueDate || "لا يوجد موعد" }}
              </div>
            </div>

            <div
              v-if="task.assignee"
              class="mt-3 flex items-center text-xs text-gray-500"
            >
              <img
                src="..\assets\images\researcher.png"
                alt="task.assignee"
                class="w-6 h-6 rounded-full ml-2"
              />
              {{ task.assignee }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Details Modal -->
    <div
      v-if="selectedTask"
      class="modal-overlay"
      @click.self="closeTaskDetails"
    >
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            {{ selectedTask.name }}
          </h2>
          <button
            @click="closeTaskDetails"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="form-label">الحالة</label>
            <select v-model="selectedTask.column" class="form-input">
              <option
                v-for="column in columns"
                :key="column.id"
                :value="column.id"
              >
                {{ column.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="form-label">الأولوية</label>
            <select v-model="selectedTask.priority" class="form-input">
              <option value="عاجل">عاجل</option>
              <option value="متوسط">متوسط</option>
              <option value="منخفض">منخفض</option>
            </select>
          </div>

          <div>
            <label class="form-label">تاريخ الاستحقاق</label>
            <input
              type="date"
              v-model="selectedTask.dueDate"
              class="form-input"
            />
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">الوصف</label>
          <textarea
            v-model="selectedTask.description"
            rows="4"
            class="form-input"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="form-label">التصنيفات</label>
          <div class="flex flex-wrap gap-2 mt-2">
            <div
              v-for="tag in availableTags"
              :key="tag"
              @click="toggleTag(tag)"
              :class="[
                'px-3 py-1 rounded-full text-sm cursor-pointer transition-colors',
                selectedTask.tags && selectedTask.tags.includes(tag)
                  ? 'bg-primary-100 text-primary-800 border border-primary-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200',
              ]"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">المسؤول</label>
          <select v-model="selectedTask.assignee" class="form-input">
            <option value="">غير معين</option>
            <option v-for="user in users" :key="user">{{ user }}</option>
          </select>
        </div>

        <div class="mb-4">
          <label class="form-label">التعليقات</label>
          <div class="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto mb-2">
            <div
              v-if="
                !selectedTask.comments || selectedTask.comments.length === 0
              "
              class="text-gray-500 text-sm"
            >
              لا توجد تعليقات بعد
            </div>
            <div
              v-else
              v-for="(comment, index) in selectedTask.comments"
              :key="index"
              class="mb-3"
            >
              <div class="flex items-start">
                <img
                  src="..\assets\images\researcher.png"
                  alt="صورة المستخدم"
                  class="w-8 h-8 rounded-full ml-2"
                />
                <div class="bg-white p-2 rounded-lg shadow-sm flex-grow">
                  <p class="text-sm">{{ comment }}</p>
                  <span class="text-xs text-gray-500">منذ دقائق</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex">
            <input
              type="text"
              v-model="newComment"
              placeholder="أضف تعليقًا..."
              class="form-input flex-grow"
              @keyup.enter="addComment"
            />
            <button @click="addComment" class="btn btn-primary mr-2">
              إضافة
            </button>
          </div>
        </div>

        <div class="flex justify-between">
          <div>
            <button @click="saveTaskChanges" class="btn btn-primary ml-2">
              حفظ التغييرات
            </button>
            <button @click="closeTaskDetails" class="btn btn-outline">
              إلغاء
            </button>
          </div>
          <button @click="deleteTask" class="btn btn-danger">حذف المهمة</button>
        </div>
      </div>
    </div>

    <!-- Add Task Modal -->
    <div
      v-if="showAddTaskModal"
      class="modal-overlay"
      @click.self="showAddTaskModal = false"
    >
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">إضافة مهمة جديدة</h2>
          <button
            @click="showAddTaskModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mb-4">
          <label class="form-label">اسم المهمة</label>
          <input
            type="text"
            v-model="newTask.name"
            class="form-input"
            required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="form-label">الحالة</label>
            <select v-model="newTask.column" class="form-input">
              <option
                v-for="column in columns"
                :key="column.id"
                :value="column.id"
              >
                {{ column.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="form-label">الأولوية</label>
            <select v-model="newTask.priority" class="form-input">
              <option value="عاجل">عاجل</option>
              <option value="متوسط">متوسط</option>
              <option value="منخفض">منخفض</option>
            </select>
          </div>

          <div>
            <label class="form-label">تاريخ الاستحقاق</label>
            <input type="date" v-model="newTask.dueDate" class="form-input" />
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">الوصف</label>
          <textarea
            v-model="newTask.description"
            rows="4"
            class="form-input"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="form-label">التصنيفات</label>
          <div class="flex flex-wrap gap-2 mt-2">
            <div
              v-for="tag in availableTags"
              :key="tag"
              @click="toggleNewTaskTag(tag)"
              :class="[
                'px-3 py-1 rounded-full text-sm cursor-pointer transition-colors',
                newTask.tags.includes(tag)
                  ? 'bg-primary-100 text-primary-800 border border-primary-300'
                  : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200',
              ]"
            >
              {{ tag }}
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">المسؤول</label>
          <select v-model="newTask.assignee" class="form-input">
            <option value="">غير معين</option>
            <option v-for="user in users" :key="user">{{ user }}</option>
          </select>
        </div>

        <div class="flex justify-end">
          <button
            @click="showAddTaskModal = false"
            class="btn btn-outline ml-2"
          >
            إلغاء
          </button>
          <button @click="addNewTask" class="btn btn-primary">
            إضافة المهمة
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  getDatabase,
  ref as dbRef,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";

export default {
  name: "Tasks",
  setup() {
    const db = getDatabase();

    // Task board columns
    const columns = ref([
      { id: "tasks", name: "لم تبدأ بعد" },
      { id: "inprogress", name: "يتم العمل عليها" },
      { id: "review", name: "تحتاج مراجعة" },
      { id: "approved", name: "تمت" },
    ]);

    // Available tags and users
    const availableTags = ref(["بحث", "كتابة", "تحليل", "تسجيل", "مراجعة"]);
    const users = ref(["د. مها", "فاطمة"]);

    // Tasks data
    const tasks = ref([]);
    const selectedTask = ref(null);
    const newComment = ref("");

    // Filters
    const searchQuery = ref("");
    const filterPriority = ref("");
    const filterTag = ref("");

    // New task modal
    const showAddTaskModal = ref(false);
    const newTask = ref({
      name: "",
      description: "",
      column: "tasks",
      priority: "متوسط",
      dueDate: "",
      tags: [],
      assignee: "",
      comments: [],
    });

    // Load tasks from Firebase
    const loadTasks = () => {
      const tasksRef = dbRef(db, "tasks");
      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          tasks.value = Object.entries(data).map(([id, task]) => ({
            id,
            ...task,
            comments: task.comments || [],
            tags: task.tags || [],
          }));
        } else {
          tasks.value = [];
        }
      });
    };

    // Filter tasks by column
    const getTasksForColumn = (columnId) => {
      return tasks.value.filter((task) => {
        // Filter by column
        if (task.column !== columnId) return false;

        // Filter by search query
        if (
          searchQuery.value &&
          !task.name.includes(searchQuery.value) &&
          !task.description.includes(searchQuery.value)
        ) {
          return false;
        }

        // Filter by priority
        if (filterPriority.value && task.priority !== filterPriority.value) {
          return false;
        }

        // Filter by tag
        if (
          filterTag.value &&
          (!task.tags || !task.tags.includes(filterTag.value))
        ) {
          return false;
        }

        return true;
      });
    };

    // Task details
    const openTaskDetails = (task) => {
      selectedTask.value = { ...task };
    };

    const closeTaskDetails = () => {
      selectedTask.value = null;
      newComment.value = "";
    };

    const saveTaskChanges = () => {
      if (!selectedTask.value) return;

      const taskRef = dbRef(db, `tasks/${selectedTask.value.id}`);
      update(taskRef, {
        name: selectedTask.value.name,
        description: selectedTask.value.description,
        column: selectedTask.value.column,
        priority: selectedTask.value.priority,
        dueDate: selectedTask.value.dueDate,
        tags: selectedTask.value.tags || [],
        assignee: selectedTask.value.assignee,
        comments: selectedTask.value.comments || [],
      });

      closeTaskDetails();
    };

    const deleteTask = () => {
      if (!selectedTask.value) return;

      if (confirm("هل أنت متأكد من حذف هذه المهمة؟")) {
        const taskRef = dbRef(db, `tasks/${selectedTask.value.id}`);
        remove(taskRef);
        closeTaskDetails();
      }
    };

    const addComment = () => {
      if (!newComment.value.trim() || !selectedTask.value) return;

      if (!selectedTask.value.comments) {
        selectedTask.value.comments = [];
      }

      selectedTask.value.comments.push(newComment.value.trim());
      newComment.value = "";
    };

    // Tag management
    const toggleTag = (tag) => {
      if (!selectedTask.value) return;

      if (!selectedTask.value.tags) {
        selectedTask.value.tags = [];
      }

      const index = selectedTask.value.tags.indexOf(tag);
      if (index === -1) {
        selectedTask.value.tags.push(tag);
      } else {
        selectedTask.value.tags.splice(index, 1);
      }
    };

    const toggleNewTaskTag = (tag) => {
      const index = newTask.value.tags.indexOf(tag);
      if (index === -1) {
        newTask.value.tags.push(tag);
      } else {
        newTask.value.tags.splice(index, 1);
      }
    };

    // Add new task
    const addNewTask = () => {
      if (!newTask.value.name.trim()) {
        alert("يرجى إدخال اسم المهمة");
        return;
      }

      const tasksRef = dbRef(db, "tasks");
      push(tasksRef, {
        name: newTask.value.name,
        description: newTask.value.description,
        column: newTask.value.column,
        priority: newTask.value.priority,
        dueDate: newTask.value.dueDate,
        tags: newTask.value.tags,
        assignee: newTask.value.assignee,
        comments: newTask.value.comments,
        dateCreated: new Date().toISOString(),
      });

      // Reset form
      newTask.value = {
        name: "",
        description: "",
        column: "tasks",
        priority: "متوسط",
        dueDate: "",
        tags: [],
        assignee: "",
        comments: [],
      };

      showAddTaskModal.value = false;
    };

    // Helper functions
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    const getPriorityClass = (priority) => {
      switch (priority) {
        case "عاجل":
          return "bg-red-100 text-red-800";
        case "متوسط":
          return "bg-yellow-100 text-yellow-800";
        case "منخفض":
          return "bg-green-100 text-green-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };

    // Initialize
    onMounted(() => {
      loadTasks();

      // Initialize drag and drop (would be implemented with vuedraggable in a real app)
      // This is a placeholder for the actual implementation
      console.log("Drag and drop would be initialized here");
    });

    return {
      columns,
      tasks,
      selectedTask,
      newComment,
      searchQuery,
      filterPriority,
      filterTag,
      availableTags,
      users,
      showAddTaskModal,
      newTask,
      getTasksForColumn,
      openTaskDetails,
      closeTaskDetails,
      saveTaskChanges,
      deleteTask,
      addComment,
      toggleTag,
      toggleNewTaskTag,
      addNewTask,
      truncateText,
      getPriorityClass,
    };
  },
};
</script>
