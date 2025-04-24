<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">روابط الأكواد</h1>
      <button @click="showAddCodeModal = true" class="btn btn-primary">
        <i class="fas fa-plus ml-2"></i>إضافة رابط كود
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="code in codes" :key="code.id" class="card hover:shadow-lg transition-shadow duration-200">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-3" :class="getCodeTypeClass(code.type)">
              <i :class="['fas', getCodeTypeIcon(code.type), 'text-white']"></i>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">{{ code.title }}</h3>
          </div>
          
          <p class="text-sm text-gray-600">{{ code.description }}</p>
          
          <div class="flex items-center mt-4 text-sm text-gray-500">
            <span class="ml-4"><i class="fas fa-code-branch ml-1"></i>{{ code.language }}</span>
            <span><i class="fas fa-calendar-alt ml-1"></i>{{ formatDate(code.timestamp) }}</span>
          </div>
          
          <div class="flex justify-between mt-4 pt-4 border-t border-gray-100">
            <a :href="code.link" target="_blank" class="text-primary-600 hover:text-primary-800">
              <i class="fas fa-external-link-alt ml-1"></i>فتح الكود
            </a>
            
            <button @click="openCodeDetails(code)" class="text-primary-600 hover:text-primary-800">
              <i class="fas fa-info-circle ml-1"></i>التفاصيل
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="codes.length === 0" class="lg:col-span-3 text-center py-12 bg-white rounded-lg shadow-md">
        <i class="fas fa-code text-5xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">لا توجد روابط أكواد بعد</h3>
        <p class="text-gray-500 mb-4">قم بإضافة روابط الأكواد المستخدمة في البحث</p>
        <button @click="showAddCodeModal = true" class="btn btn-primary">
          <i class="fas fa-plus ml-2"></i>إضافة رابط كود
        </button>
      </div>
    </div>
    
    <!-- Code Details Modal -->
    <div v-if="selectedCode" class="modal-overlay" @click.self="closeDetails">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">{{ selectedCode.title }}</h2>
          <button @click="closeDetails" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="form-label">العنوان</label>
          <input type="text" v-model="selectedCode.title" class="form-input">
        </div>
        
        <div class="mb-4">
          <label class="form-label">الرابط</label>
          <input type="url" v-model="selectedCode.link" class="form-input">
        </div>
        
        <div class="mb-4">
          <label class="form-label">الوصف</label>
          <textarea v-model="selectedCode.description" rows="4" class="form-input"></textarea>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="form-label">نوع الكود</label>
            <select v-model="selectedCode.type" class="form-input">
              <option value="github">GitHub</option>
              <option value="colab">Google Colab</option>
              <option value="kaggle">Kaggle</option>
              <option value="other">أخرى</option>
            </select>
          </div>
          
          <div>
            <label class="form-label">لغة البرمجة</label>
            <select v-model="selectedCode.language" class="form-input">
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="R">R</option>
              <option value="MATLAB">MATLAB</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="form-label">الملاحظات</label>
          <textarea v-model="selectedCode.notes" rows="4" class="form-input"></textarea>
        </div>
        
        <div class="flex justify-between">
          <div>
            <button @click="saveCodeChanges" class="btn btn-primary ml-2">حفظ التغييرات</button>
            <button @click="closeDetails" class="btn btn-outline">إلغاء</button>
          </div>
          <button @click="deleteCode" class="btn btn-danger">حذف الرابط</button>
        </div>
      </div>
    </div>
    
    <!-- Add Code Modal -->
    <div v-if="showAddCodeModal" class="modal-overlay" @click.self="showAddCodeModal = false">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">إضافة رابط كود جديد</h2>
          <button @click="showAddCodeModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="form-label">العنوان</label>
          <input type="text" v-model="newCode.title" class="form-input" required>
        </div>
        
        <div class="mb-4">
          <label class="form-label">الرابط</label>
          <input type="url" v-model="newCode.link" class="form-input" required>
        </div>
        
        <div class="mb-4">
          <label class="form-label">الوصف</label>
          <textarea v-model="newCode.description" rows="4" class="form-input" required></textarea>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="form-label">نوع الكود</label>
            <select v-model="newCode.type" class="form-input" required>
              <option value="github">GitHub</option>
              <option value="colab">Google Colab</option>
              <option value="kaggle">Kaggle</option>
              <option value="other">أخرى</option>
            </select>
          </div>
          
          <div>
            <label class="form-label">لغة البرمجة</label>
            <select v-model="newCode.language" class="form-input" required>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="R">R</option>
              <option value="MATLAB">MATLAB</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
        </div>
        
        <div class="mb-4">
          <label class="form-label">الملاحظات</label>
          <textarea v-model="newCode.notes" rows="4" class="form-input"></textarea>
        </div>
        
        <div class="flex justify-end">
          <button @click="showAddCodeModal = false" class="btn btn-outline ml-2">إلغاء</button>
          <button @click="addNewCode" class="btn btn-primary">إضافة الرابط</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, onValue, push, update, remove } from 'firebase/database'

export default {
  name: 'CodeLinks',
  setup() {
    const db = getDatabase()
    
    // Codes data
    const codes = ref([])
    const selectedCode = ref(null)
    
    // New code modal
    const showAddCodeModal = ref(false)
    const newCode = ref({
      title: '',
      link: '',
      description: '',
      type: 'github',
      language: 'Python',
      notes: ''
    })
    
    // Load codes from Firebase
    const loadCodes = () => {
      const codesRef = dbRef(db, 'codes')
      onValue(codesRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          codes.value = Object.entries(data).map(([id, code]) => ({
            id,
            ...code,
            notes: code.notes || ''
          }))
        } else {
          codes.value = []
        }
      })
    }
    
    // Code details
    const openCodeDetails = (code) => {
      selectedCode.value = { ...code }
    }
    
    const closeDetails = () => {
      selectedCode.value = null
    }
    
    const saveCodeChanges = () => {
      if (!selectedCode.value) return
      
      const codeRef = dbRef(db, `codes/${selectedCode.value.id}`)
      update(codeRef, {
        title: selectedCode.value.title,
        link: selectedCode.value.link,
        description: selectedCode.value.description,
        type: selectedCode.value.type,
        language: selectedCode.value.language,
        notes: selectedCode.value.notes || ''
      })
      
      closeDetails()
    }
    
    const deleteCode = () => {
      if (!selectedCode.value) return
      
      if (confirm('هل أنت متأكد من حذف هذا الرابط؟')) {
        const codeRef = dbRef(db, `codes/${selectedCode.value.id}`)
        remove(codeRef)
        closeDetails()
      }
    }
    
    // Add new code
    const addNewCode = () => {
      if (!newCode.value.title.trim() || !newCode.value.link.trim() || !newCode.value.description.trim()) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
      
      // Save code data to Firebase Database
      const codesRef = dbRef(db, 'codes')
      push(codesRef, {
        title: newCode.value.title,
        link: newCode.value.link,
        description: newCode.value.description,
        type: newCode.value.type,
        language: newCode.value.language,
        notes: newCode.value.notes || '',
        timestamp: Date.now()
      })
      
      // Reset form
      newCode.value = {
        title: '',
        link: '',
        description: '',
        type: 'github',
        language: 'Python',
        notes: ''
      }
      showAddCodeModal.value = false
    }
    
    // Helper functions
    const formatDate = (timestamp) => {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleDateString('ar-EG')
    }
    
    const getCodeTypeClass = (type) => {
      switch (type) {
        case 'github': return 'bg-gray-800'
        case 'colab': return 'bg-yellow-600'
        case 'kaggle': return 'bg-blue-600'
        default: return 'bg-purple-600'
      }
    }
    
    const getCodeTypeIcon = (type) => {
      switch (type) {
        case 'github': return 'fa-github'
        case 'colab': return 'fa-google'
        case 'kaggle': return 'fa-kaggle'
        default: return 'fa-code'
      }
    }
    
    // Initialize
    onMounted(() => {
      loadCodes()
    })
    
    return {
      codes,
      selectedCode,
      showAddCodeModal,
      newCode,
      openCodeDetails,
      closeDetails,
      saveCodeChanges,
      deleteCode,
      addNewCode,
      formatDate,
      getCodeTypeClass,
      getCodeTypeIcon
    }
  }
}
</script>
