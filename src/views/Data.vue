<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">البيانات</h1>
      <div class="flex space-x-2 space-x-reverse">
        <button @click="showAddChildModal = true" class="btn btn-primary ml-2">
          <i class="fas fa-user-plus ml-2"></i>إضافة طفل
        </button>
        <button @click="showAddWordModal = true" class="btn btn-secondary">
          <i class="fas fa-plus ml-2"></i>إضافة كلمة
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">إجمالي الأطفال</h3>
        <p class="dashboard-stat">{{ children.length }}</p>
        <p class="text-sm text-gray-500 mt-2">
          عدد الأطفال المشاركين في الدراسة
        </p>
      </div>

      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">إجمالي الكلمات</h3>
        <p class="dashboard-stat">{{ words.length }}</p>
        <p class="text-sm text-gray-500 mt-2">
          عدد الكلمات المستخدمة في الدراسة
        </p>
      </div>

      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">نسبة الإنجاز</h3>
        <p class="dashboard-stat">{{ completionPercentage }}%</p>
        <p class="text-sm text-gray-500 mt-2">نسبة اكتمال تسجيلات الكلمات</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">بيانات الأطفال</h2>

      <div class="responsive-table">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                الاسم
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                العمر
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                النوع
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                IQ
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                تقييم النطق
              </th>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                إجراءات
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="child in children" :key="child.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ child.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ child.age }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ child.gender }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ child.iq }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ child.speechEvaluation }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <button
                  @click="editChild(child)"
                  class="text-primary-600 hover:text-primary-900 ml-3"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteChild(child)"
                  class="text-red-600 hover:text-red-900"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
            <tr v-if="children.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                لا توجد بيانات متاحة
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">بيانات الكلمات</h2>

      <div class="responsive-table">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                اسم الطفل
              </th>
              <th
                v-for="word in words"
                :key="word"
                class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center gap-2">
                  <span>{{ word }}</span>
                  <button
                    @click="deleteWord(word)"
                    class="text-red-600 hover:text-red-800 text-sm"
                    title="حذف الكلمة"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="child in children" :key="child.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ child.name }}</div>
              </td>
              <td
                v-for="word in words"
                :key="`${child.id}-${word}`"
                class="px-6 py-4 whitespace-nowrap text-center"
              >
                <div class="flex flex-col items-center">
                  <select
                    :value="getWordLevel(child.id, word)"
                    @change="
                      updateWordLevel(child.id, word, $event.target.value)
                    "
                    class="form-input py-1 text-sm mb-1 w-24"
                  >
                    <option value="ضعيف">ضعيف</option>
                    <option value="متوسط">متوسط</option>
                    <option value="ممتاز">ممتاز</option>
                  </select>
                  <label class="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      :checked="isWordDone(child.id, word)"
                      @change="
                        updateWordDone(child.id, word, $event.target.checked)
                      "
                      class="form-checkbox h-4 w-4 text-primary-600 ml-1"
                    />
                    تمت
                  </label>
                </div>
              </td>
            </tr>
            <tr v-if="children.length === 0">
              <td
                :colspan="words.length + 1"
                class="px-6 py-4 text-center text-gray-500"
              >
                لا توجد بيانات متاحة
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">
        معلومات عامة عن قاعدة البيانات
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">الصيغة</h3>
          <p>WAV</p>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">معدل العينة</h3>
          <p>16 kHz</p>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">المدة</h3>
          <p>{{ averageDuration }} ثانية (متوسط)</p>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">مكان التسجيل</h3>
          <p>مراكز لذوي الاحتياجات الخاصة</p>
        </div>
      </div>

      <div class="mt-4">
        <a
          href="https://drive.google.com/drive/folders/1qim-5bbhoKnEE9NQ7e1LDVkXIOon0J1J?usp=sharing"
          target="_blank"
          class="btn btn-primary"
        >
          <i class="fab fa-google-drive ml-2"></i>عرض الملفات على Google Drive
        </a>
      </div>
    </div>

    <!-- Add Child Modal -->
    <div
      v-if="showAddChildModal"
      class="modal-overlay"
      @click.self="showAddChildModal = false"
    >
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            {{ editingChild ? "تعديل بيانات طفل" : "إضافة طفل جديد" }}
          </h2>
          <button
            @click="showAddChildModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mb-4">
          <label class="form-label">الاسم</label>
          <input
            type="text"
            v-model="childForm.name"
            class="form-input"
            required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="form-label">العمر</label>
            <input
              type="number"
              v-model="childForm.age"
              class="form-input"
              required
            />
          </div>

          <div>
            <label class="form-label">النوع</label>
            <select v-model="childForm.gender" class="form-input" required>
              <option value="ذكر">ذكر</option>
              <option value="أنثى">أنثى</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="form-label">IQ</label>
            <input
              type="number"
              v-model="childForm.iq"
              class="form-input"
              required
            />
          </div>

          <div>
            <label class="form-label">تقييم النطق</label>
            <select
              v-model="childForm.speechEvaluation"
              class="form-input"
              required
            >
              <option value="ضعيف">ضعيف</option>
              <option value="متوسط">متوسط</option>
              <option value="جيد">جيد</option>
              <option value="ممتاز">ممتاز</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end">
          <button
            @click="showAddChildModal = false"
            class="btn btn-outline ml-2"
          >
            إلغاء
          </button>
          <button @click="saveChild" class="btn btn-primary">
            {{ editingChild ? "حفظ التعديلات" : "إضافة الطفل" }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Word Modal -->
    <div
      v-if="showAddWordModal"
      class="modal-overlay"
      @click.self="showAddWordModal = false"
    >
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">إضافة كلمة جديدة</h2>
          <button
            @click="showAddWordModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mb-4">
          <label class="form-label">الكلمة</label>
          <input type="text" v-model="newWord" class="form-input" required />
        </div>

        <div class="flex justify-end">
          <button
            @click="showAddWordModal = false"
            class="btn btn-outline ml-2"
          >
            إلغاء
          </button>
          <button @click="addWord" class="btn btn-primary">إضافة الكلمة</button>
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
  set,
  push,
  remove,
} from "firebase/database";

export default {
  name: "Data",
  setup() {
    const db = getDatabase();

    const children = ref([]);
    const wordData = ref({});
    const words = ref([]);
    const averageDuration = ref(3.5);

    const showAddChildModal = ref(false);
    const showAddWordModal = ref(false);

    const childForm = ref({
      name: "",
      age: "",
      gender: "ذكر",
      iq: "",
      speechEvaluation: "متوسط",
    });
    const newWord = ref("");
    const editingChild = ref(false);
    const editingChildId = ref(null);

    const loadData = () => {
      const childrenRef = dbRef(db, "children");
      onValue(childrenRef, (snapshot) => {
        const data = snapshot.val();
        children.value = data
          ? Object.entries(data).map(([id, child]) => ({ id, ...child }))
          : [];
      });

      const wordsRef = dbRef(db, "words");
      onValue(wordsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          wordData.value = data;
          const allWords = new Set();
          Object.values(data).forEach((childWords) => {
            Object.keys(childWords).forEach((word) => {
              allWords.add(word);
            });
          });
          words.value = Array.from(allWords);
        } else {
          wordData.value = {};
          words.value = [];
        }
      });
    };

    const completionPercentage = computed(() => {
      if (children.value.length === 0 || words.value.length === 0) return 0;
      let totalWords = children.value.length * words.value.length;
      let completedWords = 0;

      children.value.forEach((child) => {
        words.value.forEach((word) => {
          if (isWordDone(child.id, word)) completedWords++;
        });
      });

      return Math.round((completedWords / totalWords) * 100);
    });

    const getWordLevel = (childId, word) => {
      return wordData.value[childId]?.[word]?.level || "ضعيف";
    };

    const isWordDone = (childId, word) => {
      return wordData.value[childId]?.[word]?.done || false;
    };

    const updateWordLevel = (childId, word, level) => {
      const wordRef = dbRef(db, `words/${childId}/${word}`);
      set(wordRef, {
        level: level,
        done: isWordDone(childId, word),
      });
    };

    const updateWordDone = (childId, word, done) => {
      const wordRef = dbRef(db, `words/${childId}/${word}`);
      set(wordRef, {
        level: getWordLevel(childId, word),
        done: done,
      });
    };

    const editChild = (child) => {
      childForm.value = {
        name: child.name,
        age: child.age,
        gender: child.gender,
        iq: child.iq,
        speechEvaluation: child.speechEvaluation,
      };
      editingChild.value = true;
      editingChildId.value = child.id;
      showAddChildModal.value = true;
    };

    const saveChild = () => {
      if (!childForm.value.name.trim()) {
        alert("يرجى إدخال اسم الطفل");
        return;
      }

      if (editingChild.value) {
        const childRef = dbRef(db, `children/${editingChildId.value}`);
        set(childRef, childForm.value);
      } else {
        const childRef = dbRef(db, `children/${childForm.value.name}`);
        set(childRef, childForm.value);
        words.value.forEach((word) => {
          const wordRef = dbRef(db, `words/${childForm.value.name}/${word}`);
          set(wordRef, { level: "ضعيف", done: false });
        });
      }

      childForm.value = {
        name: "",
        age: "",
        gender: "ذكر",
        iq: "",
        speechEvaluation: "متوسط",
      };
      editingChild.value = false;
      editingChildId.value = null;
      showAddChildModal.value = false;
    };

    const deleteChild = (child) => {
      if (confirm(`هل أنت متأكد من حذف بيانات الطفل "${child.name}"؟`)) {
        const childRef = dbRef(db, `children/${child.id}`);
        remove(childRef);
        const wordRef = dbRef(db, `words/${child.id}`);
        remove(wordRef);
      }
    };

    const addWord = () => {
      if (!newWord.value.trim()) {
        alert("يرجى إدخال الكلمة");
        return;
      }

      children.value.forEach((child) => {
        const wordRef = dbRef(db, `words/${child.id}/${newWord.value}`);
        set(wordRef, { level: "ضعيف", done: false });
      });

      newWord.value = "";
      showAddWordModal.value = false;
    };

    const deleteWord = (wordToDelete) => {
      if (
        confirm(`هل أنت متأكد من حذف الكلمة "${wordToDelete}" من جميع الأطفال؟`)
      ) {
        children.value.forEach((child) => {
          const wordRef = dbRef(db, `words/${child.id}/${wordToDelete}`);
          remove(wordRef);
        });
        words.value = words.value.filter((word) => word !== wordToDelete);
      }
    };

    onMounted(() => {
      loadData();
    });

    return {
      children,
      words,
      wordData,
      averageDuration,
      completionPercentage,
      showAddChildModal,
      showAddWordModal,
      childForm,
      newWord,
      editingChild,
      getWordLevel,
      isWordDone,
      updateWordLevel,
      updateWordDone,
      editChild,
      saveChild,
      deleteChild,
      addWord,
      deleteWord,
    };
  },
};
</script>
