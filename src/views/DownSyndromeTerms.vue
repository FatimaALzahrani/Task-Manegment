<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">مصطلحات متلازمة داون</h1>
      <button @click="showAddTermModal = true" class="btn btn-primary">
        <i class="fas fa-plus ml-2"></i>إضافة مصطلح
      </button>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-4 mb-6">
      <div class="relative">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="بحث في المصطلحات..." 
          class="form-input py-2 pl-10 pr-4 w-full"
        >
        <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="term in filteredTerms" :key="term.term" class="card hover:shadow-lg transition-shadow duration-200">
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ term.term }}</h3>
          <p class="text-sm text-gray-600">{{ term.definition }}</p>
          
          <div class="flex justify-end mt-4 pt-4 border-t border-gray-100">
            <button @click="editTerm(term)" class="text-primary-600 hover:text-primary-800 ml-3">
              <i class="fas fa-edit ml-1"></i>تعديل
            </button>
            <button @click="deleteTerm(term)" class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash-alt ml-1"></i>حذف
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">المراجع العلمية الأساسية</h2>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                العنوان
              </th>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المؤلفون
              </th>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                السنة
              </th>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المجلة
              </th>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الرابط
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="reference in references" :key="reference.title">
              <td class="px-6 py-4 whitespace-normal">
                <div class="text-sm font-medium text-gray-900">{{ reference.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-normal">
                <div class="text-sm text-gray-500">{{ reference.authors }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ reference.year }}</div>
              </td>
              <td class="px-6 py-4 whitespace-normal">
                <div class="text-sm text-gray-500">{{ reference.journal }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <a :href="reference.url" target="_blank" class="text-primary-600 hover:text-primary-900">
                  <i class="fas fa-external-link-alt ml-1"></i>فتح
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="mt-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">مراحل تطور النطق واللغة</h2>
      
      <div class="space-y-4">
        <div v-for="stage in developmentStages" :key="stage.age" class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ stage.age }}</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium text-gray-700 mb-2">المؤشرات التطورية:</h4>
              <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li v-for="milestone in stage.milestones" :key="milestone">{{ milestone }}</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-medium text-gray-700 mb-2">الأنشطة المقترحة:</h4>
              <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li v-for="activity in stage.activities" :key="activity">{{ activity }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-8">
      <h2 class="text-xl font-bold text-gray-800 mb-4">استراتيجيات التدخل المبكر</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="strategy in interventionStrategies" :key="strategy.name" class="bg-white rounded-lg shadow-md p-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ strategy.name }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ strategy.description }}</p>
          
          <h4 class="font-medium text-gray-700 mb-2">الفوائد:</h4>
          <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li v-for="benefit in strategy.benefits" :key="benefit">{{ benefit }}</li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Add/Edit Term Modal -->
    <div v-if="showAddTermModal" class="modal-overlay" @click.self="showAddTermModal = false">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">{{ isEditing ? 'تعديل مصطلح' : 'إضافة مصطلح جديد' }}</h2>
          <button @click="showAddTermModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="form-label">المصطلح</label>
          <input type="text" v-model="currentTerm.term" class="form-input" required>
        </div>
        
        <div class="mb-4">
          <label class="form-label">التعريف</label>
          <textarea v-model="currentTerm.definition" rows="4" class="form-input" required></textarea>
        </div>
        
        <div class="flex justify-end">
          <button @click="showAddTermModal = false" class="btn btn-outline ml-2">إلغاء</button>
          <button @click="saveTerm" class="btn btn-primary">{{ isEditing ? 'حفظ التعديلات' : 'إضافة المصطلح' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { downSyndromeTerms, downSyndromeReferences, speechDevelopmentStages, earlyInterventionStrategies } from '@/data/downSyndromeData'

export default {
  name: 'DownSyndromeTerms',
  setup() {
    // Data
    const terms = ref([...downSyndromeTerms])
    const references = ref([...downSyndromeReferences])
    const developmentStages = ref([...speechDevelopmentStages])
    const interventionStrategies = ref([...earlyInterventionStrategies])
    const searchQuery = ref('')
    
    // Modal state
    const showAddTermModal = ref(false)
    const isEditing = ref(false)
    const currentTerm = ref({ term: '', definition: '' })
    
    // Computed properties
    const filteredTerms = computed(() => {
      if (!searchQuery.value) return terms.value
      
      const query = searchQuery.value.toLowerCase()
      return terms.value.filter(term => 
        term.term.toLowerCase().includes(query) || 
        term.definition.toLowerCase().includes(query)
      )
    })
    
    // Methods
    const editTerm = (term) => {
      currentTerm.value = { ...term }
      isEditing.value = true
      showAddTermModal.value = true
    }
    
    const deleteTerm = (term) => {
      if (confirm('هل أنت متأكد من حذف هذا المصطلح؟')) {
        const index = terms.value.findIndex(t => t.term === term.term)
        if (index !== -1) {
          terms.value.splice(index, 1)
        }
      }
    }
    
    const saveTerm = () => {
      if (!currentTerm.value.term.trim() || !currentTerm.value.definition.trim()) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
      
      if (isEditing.value) {
        // Update existing term
        const index = terms.value.findIndex(t => t.term === currentTerm.value.term)
        if (index !== -1) {
          terms.value[index] = { ...currentTerm.value }
        }
      } else {
        // Add new term
        terms.value.push({ ...currentTerm.value })
      }
      
      // Reset form
      currentTerm.value = { term: '', definition: '' }
      isEditing.value = false
      showAddTermModal.value = false
    }
    
    return {
      terms,
      references,
      developmentStages,
      interventionStrategies,
      searchQuery,
      filteredTerms,
      showAddTermModal,
      isEditing,
      currentTerm,
      editTerm,
      deleteTerm,
      saveTerm
    }
  }
}
</script>
