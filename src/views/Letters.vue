<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">الخطابات والموافقات</h1>
      <div class="flex space-x-2 space-x-reverse">
        <button
          @click="showAddDoctorLetterModal = true"
          class="btn btn-primary ml-2"
        >
          <i class="fas fa-plus ml-2"></i>إضافة موافقة دكتور
        </button>
        <button
          @click="showAddParentLetterModal = true"
          class="btn btn-secondary"
        >
          <i class="fas fa-plus ml-2"></i>إضافة موافقة ولي أمر
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">موافقات الدكاترة</h2>

        <div
          v-if="doctorLetters.length === 0"
          class="text-center py-8 text-gray-500"
        >
          لا توجد موافقات دكاترة حتى الآن
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="letter in doctorLetters"
            :key="letter.id"
            class="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 class="font-medium text-gray-800">{{ letter.name }}</h3>
              <p class="text-sm text-gray-500">
                {{ formatDate(letter.timestamp) }}
              </p>
            </div>

            <div class="flex items-center">
              <a
                :href="letter.url"
                target="_blank"
                class="text-primary-600 hover:text-primary-800 ml-4"
              >
                <i class="fas fa-external-link-alt ml-1"></i>عرض
              </a>
              <button
                @click="deleteLetter('doctor', letter)"
                class="text-red-600 hover:text-red-800"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
          موافقات أولياء الأمور
        </h2>

        <div
          v-if="parentLetters.length === 0"
          class="text-center py-8 text-gray-500"
        >
          لا توجد موافقات أولياء أمور حتى الآن
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="letter in parentLetters"
            :key="letter.id"
            class="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <h3 class="font-medium text-gray-800">{{ letter.name }}</h3>
              <p class="text-sm text-gray-500">
                {{ formatDate(letter.timestamp) }}
              </p>
            </div>

            <div class="flex items-center">
              <a
                :href="letter.url"
                target="_blank"
                class="text-primary-600 hover:text-primary-800 ml-4"
              >
                <i class="fas fa-external-link-alt ml-1"></i>عرض
              </a>
              <button
                @click="deleteLetter('parent', letter)"
                class="text-red-600 hover:text-red-800"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">حالة الموافقات</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">
            إجمالي موافقات الدكاترة
          </h3>
          <p class="text-2xl font-bold text-primary-600">
            {{ doctorLetters.length }}
          </p>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">
            إجمالي موافقات أولياء الأمور
          </h3>
          <p class="text-2xl font-bold text-primary-600">
            {{ parentLetters.length }}
          </p>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">
            نسبة اكتمال موافقات الدكاترة
          </h3>
          <p class="text-2xl font-bold text-primary-600">
            {{ doctorCompletionPercentage }}%
          </p>
        </div>

        <div class="p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold text-gray-700 mb-2">
            نسبة اكتمال موافقات أولياء الأمور
          </h3>
          <p class="text-2xl font-bold text-primary-600">
            {{ parentCompletionPercentage }}%
          </p>
        </div>
      </div>
    </div>

    <!-- Add Doctor Letter Modal -->
    <div
      v-if="showAddDoctorLetterModal"
      class="modal-overlay"
      @click.self="showAddDoctorLetterModal = false"
    >
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">إضافة موافقة دكتور</h2>
          <button
            @click="showAddDoctorLetterModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mb-4">
          <label class="form-label">ملف الموافقة (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            @change="handleDoctorFileUpload"
            class="form-input"
            required
          />
        </div>

        <div class="flex justify-end">
          <button
            @click="showAddDoctorLetterModal = false"
            class="btn btn-outline ml-2"
          >
            إلغاء
          </button>
          <button
            @click="uploadDoctorLetter"
            class="btn btn-primary"
            :disabled="isUploading"
          >
            <i v-if="isUploading" class="fas fa-spinner fa-spin ml-1"></i>
            رفع الملف
          </button>
        </div>
      </div>
    </div>

    <!-- Add Parent Letter Modal -->
    <div
      v-if="showAddParentLetterModal"
      class="modal-overlay"
      @click.self="showAddParentLetterModal = false"
    >
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">إضافة موافقة ولي أمر</h2>
          <button
            @click="showAddParentLetterModal = false"
            class="text-gray-500 hover:text-gray-700"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="mb-4">
          <label class="form-label">ملف الموافقة (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            @change="handleParentFileUpload"
            class="form-input"
            required
          />
        </div>

        <div class="flex justify-end">
          <button
            @click="showAddParentLetterModal = false"
            class="btn btn-outline ml-2"
          >
            إلغاء
          </button>
          <button
            @click="uploadParentLetter"
            class="btn btn-primary"
            :disabled="isUploading"
          >
            <i v-if="isUploading" class="fas fa-spinner fa-spin ml-1"></i>
            رفع الملف
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
  name: "Letters",
  setup() {
    const db = getDatabase();
    const storage = getStorage();

    // Letters data
    const doctorLetters = ref([]);
    const parentLetters = ref([]);

    // Modals
    const showAddDoctorLetterModal = ref(false);
    const showAddParentLetterModal = ref(false);

    // Upload state
    const selectedDoctorFile = ref(null);
    const selectedParentFile = ref(null);
    const isUploading = ref(false);

    // Load letters from Firebase
    const loadLetters = () => {
      // Load doctor letters
      const doctorLettersRef = dbRef(db, "doctor_letters");
      onValue(doctorLettersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          doctorLetters.value = Object.entries(data).map(([id, letter]) => ({
            id,
            ...letter,
          }));
        } else {
          doctorLetters.value = [];
        }
      });

      // Load parent letters
      const parentLettersRef = dbRef(db, "parent_letters");
      onValue(parentLettersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          parentLetters.value = Object.entries(data).map(([id, letter]) => ({
            id,
            ...letter,
          }));
        } else {
          parentLetters.value = [];
        }
      });
    };

    // Computed properties
    const doctorCompletionPercentage = computed(() => {
      // Assuming we need 5 doctor approvals
      const targetCount = 5;
      return Math.min(
        Math.round((doctorLetters.value.length / targetCount) * 100),
        100
      );
    });

    const parentCompletionPercentage = computed(() => {
      // Assuming we need 10 parent approvals
      const targetCount = 10;
      return Math.min(
        Math.round((parentLetters.value.length / targetCount) * 100),
        100
      );
    });

    // File upload handlers
    const handleDoctorFileUpload = (event) => {
      selectedDoctorFile.value = event.target.files[0];
    };

    const handleParentFileUpload = (event) => {
      selectedParentFile.value = event.target.files[0];
    };

    // Upload doctor letter
    const uploadDoctorLetter = () => {
      if (!selectedDoctorFile.value) {
        alert("يرجى اختيار ملف");
        return;
      }

      isUploading.value = true;
      const fileName = selectedDoctorFile.value.name;
      const storagePath = `doctor_letters/${fileName}`;

      // Upload file to Firebase Storage
      const fileRef = storageRef(storage, storagePath);
      const uploadTask = uploadBytesResumable(
        fileRef,
        selectedDoctorFile.value
      );

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
            // Save letter data to Firebase Database
            const lettersRef = dbRef(db, "doctor_letters");
            push(lettersRef, {
              name: fileName,
              url: downloadURL,
              storagePath: storagePath,
              timestamp: Date.now(),
            });

            selectedDoctorFile.value = null;
            isUploading.value = false;
            showAddDoctorLetterModal.value = false;
          });
        }
      );
    };

    // Upload parent letter
    const uploadParentLetter = () => {
      if (!selectedParentFile.value) {
        alert("يرجى اختيار ملف");
        return;
      }

      isUploading.value = true;
      const fileName = selectedParentFile.value.name;
      const storagePath = `parent_letters/${fileName}`;

      // Upload file to Firebase Storage
      const fileRef = storageRef(storage, storagePath);
      const uploadTask = uploadBytesResumable(
        fileRef,
        selectedParentFile.value
      );

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
            // Save letter data to Firebase Database
            const lettersRef = dbRef(db, "parent_letters");
            push(lettersRef, {
              name: fileName,
              url: downloadURL,
              storagePath: storagePath,
              timestamp: Date.now(),
            });

            selectedParentFile.value = null;
            isUploading.value = false;
            showAddParentLetterModal.value = false;
          });
        }
      );
    };

    // Delete letter
    const deleteLetter = (type, letter) => {
      if (!confirm("هل أنت متأكد من حذف هذا الملف؟")) return;

      // Delete file from storage
      const fileRef = storageRef(storage, letter.storagePath);
      deleteObject(fileRef).catch((error) => {
        console.error("Error deleting file:", error);
      });

      // Delete data from database
      const letterRef = dbRef(db, `${type}_letters/${letter.id}`);
      remove(letterRef);
    };

    // Download templates
    const downloadDoctorTemplate = () => {
      // In a real app, this would download a template file
      alert("سيتم تنزيل نموذج موافقة الدكاترة (هذه وظيفة تجريبية)");
    };

    const downloadParentTemplate = () => {
      // In a real app, this would download a template file
      alert("سيتم تنزيل نموذج موافقة أولياء الأمور (هذه وظيفة تجريبية)");
    };

    // Helper functions
    const formatDate = (timestamp) => {
      if (!timestamp) return "";
      const date = new Date(timestamp);
      return date.toLocaleDateString("ar-EG");
    };

    // Initialize
    onMounted(() => {
      loadLetters();
    });

    return {
      doctorLetters,
      parentLetters,
      showAddDoctorLetterModal,
      showAddParentLetterModal,
      isUploading,
      doctorCompletionPercentage,
      parentCompletionPercentage,
      handleDoctorFileUpload,
      handleParentFileUpload,
      uploadDoctorLetter,
      uploadParentLetter,
      deleteLetter,
      downloadDoctorTemplate,
      downloadParentTemplate,
      formatDate,
    };
  },
};
</script>
