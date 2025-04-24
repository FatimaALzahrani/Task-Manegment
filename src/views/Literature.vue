<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">مراجعة الأدبيات</h1>
      <button @click="showAddPaperModal = true" class="btn btn-primary">
        <i class="fas fa-plus ml-2"></i>إضافة ورقة علمية
      </button>
    </div>

    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="بحث في الأوراق العلمية..."
            class="form-input py-2 pl-10 pr-4"
          />
          <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>

        <select v-model="filterYear" class="form-input py-2">
          <option value="">كل السنوات</option>
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <select v-model="filterMethodology" class="form-input py-2">
          <option value="">كل المنهجيات</option>
          <option value="تجريبية">تجريبية</option>
          <option value="تحليلية">تحليلية</option>
          <option value="وصفية">وصفية</option>
          <option value="مقارنة">مقارنة</option>
          <option value="تطبيقية">تطبيقية</option>
        </select>
      </div>
    </div>

    <div class="dashboard-card mb-8">
      <a
        href="https://drive.google.com/drive/folders/1wJs8KFii_ETNb7RS-HFhFeZCpgMrq1sK?usp=sharing"
        target="_blank"
        class="btn btn-primary flex items-center justify-center"
      >
        <i class="fas fa-file-alt ml-2"></i>
        كل الأوراق
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="paper in filteredPapers"
        :key="paper.id"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-semibold text-gray-800">{{ paper.title }}</h3>
          <span
            class="bg-primary-100 text-primary-800 text-xs py-1 px-2 rounded-full"
            >{{ paper.year }}</span
          >
        </div>

        <p class="text-sm text-gray-600 mt-3">
          {{ truncateText(paper.summary, 150) }}
        </p>

        <div class="flex items-center mt-4 text-sm text-gray-500">
          <span class="ml-4"
            ><i class="fas fa-flask ml-1"></i>{{ paper.methodology }}</span
          >
          <span
            ><i class="fas fa-calendar-alt ml-1"></i
            >{{ formatDate(paper.timestamp) }}</span
          >
        </div>

        <div class="flex justify-between mt-4 pt-4 border-t border-gray-100">
          <button
            @click="openPaperDetails(paper)"
            class="text-primary-600 hover:text-primary-800"
          >
            <i class="fas fa-info-circle ml-1"></i>التفاصيل
          </button>

          <a
            :href="paper.url"
            target="_blank"
            class="text-primary-600 hover:text-primary-800"
          >
            <i class="fas fa-external-link-alt ml-1"></i>عرض الورقة
          </a>
        </div>
      </div>
    </div>

    <!-- Paper Details Modal -->
    <div v-if="selectedPaper" class="modal-overlay" @click.self="closeDetails">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            {{ selectedPaper.title }}
          </h2>
          <button
            @click="closeDetails"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="form-label">السنة</label>
            <input
              type="text"
              v-model="selectedPaper.year"
              class="form-input"
            />
          </div>

          <div>
            <label class="form-label">المنهجية</label>
            <select v-model="selectedPaper.methodology" class="form-input">
              <option value="تجريبية">تجريبية</option>
              <option value="تحليلية">تحليلية</option>
              <option value="وصفية">وصفية</option>
              <option value="مقارنة">مقارنة</option>
              <option value="تطبيقية">تطبيقية</option>
            </select>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">ملخص الورقة</label>
          <textarea
            v-model="selectedPaper.summary"
            rows="6"
            class="form-input"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="form-label">الاقتباسات المهمة</label>
          <div class="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto mb-2">
            <div
              v-if="!selectedPaper.quotes || selectedPaper.quotes.length === 0"
              class="text-gray-500 text-sm"
            >
              لا توجد اقتباسات بعد
            </div>
            <div
              v-else
              v-for="(quote, index) in selectedPaper.quotes"
              :key="index"
              class="mb-3 p-3 bg-white rounded-lg shadow-sm"
            >
              <p class="text-sm">{{ quote }}</p>
              <button
                @click="removeQuote(index)"
                class="text-red-600 text-xs hover:text-red-800 mt-2"
              >
                <i class="fas fa-trash-alt ml-1"></i>حذف
              </button>
            </div>
          </div>

          <div class="flex">
            <input
              type="text"
              v-model="newQuote"
              placeholder="أضف اقتباسًا..."
              class="form-input flex-grow"
              @keyup.enter="addQuote"
            />
            <button @click="addQuote" class="btn btn-primary mr-2">
              إضافة
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">الملاحظات</label>
          <textarea
            v-model="selectedPaper.notes"
            rows="4"
            class="form-input"
          ></textarea>
        </div>

        <div class="flex justify-between">
          <div>
            <button @click="savePaperChanges" class="btn btn-primary ml-2">
              حفظ التغييرات
            </button>
            <button @click="closeDetails" class="btn btn-outline">إلغاء</button>
          </div>
          <button @click="deletePaper" class="btn btn-danger">
            حذف الورقة
          </button>
        </div>
      </div>
    </div>

    <!-- Add Paper Modal -->
    <div
      v-if="showAddPaperModal"
      class="modal-overlay"
      @click.self="showAddPaperModal = false"
    >
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            إضافة ورقة علمية جديدة
          </h2>
          <button
            @click="showAddPaperModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mb-4">
          <label class="form-label">عنوان الورقة</label>
          <input
            type="text"
            v-model="newPaper.title"
            class="form-input"
            required
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="form-label">السنة</label>
            <input
              type="text"
              v-model="newPaper.year"
              class="form-input"
              required
            />
          </div>

          <div>
            <label class="form-label">المنهجية</label>
            <select v-model="newPaper.methodology" class="form-input" required>
              <option value="تجريبية">تجريبية</option>
              <option value="تحليلية">تحليلية</option>
              <option value="وصفية">وصفية</option>
              <option value="مقارنة">مقارنة</option>
              <option value="تطبيقية">تطبيقية</option>
            </select>
          </div>
        </div>

        <div class="mb-4">
          <label class="form-label">ملخص الورقة</label>
          <textarea
            v-model="newPaper.summary"
            rows="4"
            class="form-input"
            required
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="form-label">ملف الورقة (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            @change="handleFileUpload"
            class="form-input"
            required
          />
        </div>

        <div class="flex justify-end">
          <button
            @click="showAddPaperModal = false"
            class="btn btn-outline ml-2"
          >
            إلغاء
          </button>
          <button
            @click="addNewPaper"
            class="btn btn-primary"
            :disabled="isUploading"
          >
            <i v-if="isUploading" class="fas fa-spinner fa-spin ml-1"></i>
            إضافة الورقة
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
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export default {
  name: "Literature",
  setup() {
    const db = getDatabase();
    const storage = getStorage();

    // Papers data
    const papers = ref([]);
    const selectedPaper = ref(null);
    const newQuote = ref("");

    // Filters
    const searchQuery = ref("");
    const filterYear = ref("");
    const filterMethodology = ref("");

    // New paper modal
    const showAddPaperModal = ref(false);
    const newPaper = ref({
      title: "",
      summary: "",
      year: "",
      methodology: "تجريبية",
      notes: "",
      quotes: [],
    });
    const selectedFile = ref(null);
    const isUploading = ref(false);

    // Load papers from Firebase
    const loadPapers = () => {
      const papersRef = dbRef(db, "papers");
      onValue(papersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          papers.value = Object.entries(data).map(([id, paper]) => ({
            id,
            ...paper,
            quotes: paper.quotes || [],
            notes: paper.notes || "",
          }));
        } else {
          papers.value = [];
        }
      });
    };

    // Computed properties
    const availableYears = computed(() => {
      const years = [...new Set(papers.value.map((paper) => paper.year))];
      return years.sort((a, b) => b - a); // Sort descending
    });

    const filteredPapers = computed(() => {
      return papers.value.filter((paper) => {
        // Filter by search query
        if (
          searchQuery.value &&
          !paper.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) &&
          !paper.summary.toLowerCase().includes(searchQuery.value.toLowerCase())
        ) {
          return false;
        }

        // Filter by year
        if (filterYear.value && paper.year !== filterYear.value) {
          return false;
        }

        // Filter by methodology
        if (
          filterMethodology.value &&
          paper.methodology !== filterMethodology.value
        ) {
          return false;
        }

        return true;
      });
    });

    // Paper details
    const openPaperDetails = (paper) => {
      selectedPaper.value = { ...paper };
    };

    const closeDetails = () => {
      selectedPaper.value = null;
      newQuote.value = "";
    };

    const savePaperChanges = () => {
      if (!selectedPaper.value) return;

      const paperRef = dbRef(db, `papers/${selectedPaper.value.id}`);
      update(paperRef, {
        title: selectedPaper.value.title,
        summary: selectedPaper.value.summary,
        year: selectedPaper.value.year,
        methodology: selectedPaper.value.methodology,
        quotes: selectedPaper.value.quotes || [],
        notes: selectedPaper.value.notes || "",
      });

      closeDetails();
    };

    const deletePaper = () => {
      if (!selectedPaper.value) return;

      if (confirm("هل أنت متأكد من حذف هذه الورقة العلمية؟")) {
        // Delete file from storage
        if (selectedPaper.value.storagePath) {
          const fileRef = storageRef(storage, selectedPaper.value.storagePath);
          deleteObject(fileRef).catch((error) => {
            console.error("Error deleting file:", error);
          });
        }

        // Delete data from database
        const paperRef = dbRef(db, `papers/${selectedPaper.value.id}`);
        remove(paperRef);
        closeDetails();
      }
    };

    // Quote management
    const addQuote = () => {
      if (!newQuote.value.trim() || !selectedPaper.value) return;

      if (!selectedPaper.value.quotes) {
        selectedPaper.value.quotes = [];
      }

      selectedPaper.value.quotes.push(newQuote.value.trim());
      newQuote.value = "";
    };

    const removeQuote = (index) => {
      if (!selectedPaper.value || !selectedPaper.value.quotes) return;

      selectedPaper.value.quotes.splice(index, 1);
    };

    // File upload
    const handleFileUpload = (event) => {
      selectedFile.value = event.target.files[0];
    };

    // Add new paper
    const addNewPaper = () => {
      if (
        !newPaper.value.title.trim() ||
        !newPaper.value.summary.trim() ||
        !newPaper.value.year.trim() ||
        !selectedFile.value
      ) {
        alert("يرجى ملء جميع الحقول المطلوبة");
        return;
      }

      isUploading.value = true;

      // Create a unique filename
      const ext = selectedFile.value.name.split(".").pop();
      const fileName = `${newPaper.value.title
        .trim()
        .replace(/\s+/g, "_")}_${Date.now()}.${ext}`;
      const storagePath = `papers/${fileName}`;

      // Upload file to Firebase Storage
      const fileRef = storageRef(storage, storagePath);
      const uploadTask = uploadBytesResumable(fileRef, selectedFile.value);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Error handling
          console.error("Error uploading file:", error);
          isUploading.value = false;
          alert("حدث خطأ أثناء رفع الملف");
        },
        () => {
          // Upload completed successfully
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Save paper data to Firebase Database
            const papersRef = dbRef(db, "papers");
            push(papersRef, {
              title: newPaper.value.title,
              summary: newPaper.value.summary,
              year: newPaper.value.year,
              methodology: newPaper.value.methodology,
              fileName: fileName,
              url: downloadURL,
              storagePath: storagePath,
              timestamp: Date.now(),
              quotes: [],
              notes: "",
            });

            // Reset form
            newPaper.value = {
              title: "",
              summary: "",
              year: "",
              methodology: "تجريبية",
              notes: "",
              quotes: [],
            };
            selectedFile.value = null;
            isUploading.value = false;
            showAddPaperModal.value = false;
          });
        }
      );
    };

    // Helper functions
    const truncateText = (text, maxLength) => {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return date.toLocaleDateString("ar-EG");
    };

    // Initialize
    onMounted(() => {
      loadPapers();
    });

    return {
      papers,
      selectedPaper,
      newQuote,
      searchQuery,
      filterYear,
      filterMethodology,
      availableYears,
      filteredPapers,
      showAddPaperModal,
      newPaper,
      isUploading,
      openPaperDetails,
      closeDetails,
      savePaperChanges,
      deletePaper,
      addQuote,
      removeQuote,
      handleFileUpload,
      addNewPaper,
      truncateText,
      formatDate,
    };
  },
};
</script>
