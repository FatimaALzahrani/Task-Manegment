<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">مخططات سير العمل</h1>
      <button @click="showAddWorkflowModal = true" class="btn btn-primary">
        <i class="fas fa-plus ml-2"></i>إضافة مخطط جديد
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="workflow in workflows" :key="workflow.id" class="card hover:shadow-lg transition-shadow duration-200">
        <img :src="workflow.imageUrl" :alt="workflow.title" class="w-full h-48 object-cover rounded-t-lg">
        
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800">{{ workflow.title }}</h3>
          <p class="text-sm text-gray-600 mt-2">{{ workflow.description }}</p>
          
          <div class="flex justify-between mt-4 pt-4 border-t border-gray-100">
            <button @click="openWorkflowDetails(workflow)" class="text-primary-600 hover:text-primary-800">
              <i class="fas fa-info-circle ml-1"></i>التفاصيل
            </button>
            
            <button @click="deleteWorkflow(workflow)" class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash-alt ml-1"></i>حذف
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="workflows.length === 0" class="lg:col-span-3 text-center py-12 bg-white rounded-lg shadow-md">
        <i class="fas fa-project-diagram text-5xl text-gray-300 mb-4"></i>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">لا توجد مخططات بعد</h3>
        <p class="text-gray-500 mb-4">قم بإضافة مخططات سير العمل لتوثيق عملية البحث</p>
        <button @click="showAddWorkflowModal = true" class="btn btn-primary">
          <i class="fas fa-plus ml-2"></i>إضافة مخطط جديد
        </button>
      </div>
    </div>
    
    <!-- Workflow Details Modal -->
    <div v-if="selectedWorkflow" class="modal-overlay" @click.self="closeDetails">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">{{ selectedWorkflow.title }}</h2>
          <button @click="closeDetails" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <img :src="selectedWorkflow.imageUrl" :alt="selectedWorkflow.title" class="w-full h-64 object-contain rounded-lg mb-4">
        
        <div class="mb-4">
          <label class="form-label">العنوان</label>
          <input type="text" v-model="selectedWorkflow.title" class="form-input">
        </div>
        
        <div class="mb-4">
          <label class="form-label">الوصف</label>
          <textarea v-model="selectedWorkflow.description" rows="4" class="form-input"></textarea>
        </div>
        
        <div class="mb-4">
          <label class="form-label">الملاحظات</label>
          <textarea v-model="selectedWorkflow.notes" rows="4" class="form-input"></textarea>
        </div>
        
        <div class="mb-4">
          <label class="form-label">المهام المرتبطة</label>
          <div class="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto mb-2">
            <div v-if="!selectedWorkflow.relatedTasks || selectedWorkflow.relatedTasks.length === 0" class="text-gray-500 text-sm">
              لا توجد مهام مرتبطة بعد
            </div>
            <div v-else v-for="(task, index) in selectedWorkflow.relatedTasks" :key="index" class="mb-3 p-3 bg-white rounded-lg shadow-sm flex justify-between items-center">
              <span>{{ task }}</span>
              <button @click="removeRelatedTask(index)" class="text-red-600 text-xs hover:text-red-800">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <div class="flex">
            <input 
              type="text" 
              v-model="newRelatedTask" 
              placeholder="أضف مهمة مرتبطة..." 
              class="form-input flex-grow"
              @keyup.enter="addRelatedTask"
            >
            <button @click="addRelatedTask" class="btn btn-primary mr-2">إضافة</button>
          </div>
        </div>
        
        <div class="flex justify-between">
          <div>
            <button @click="saveWorkflowChanges" class="btn btn-primary ml-2">حفظ التغييرات</button>
            <button @click="closeDetails" class="btn btn-outline">إلغاء</button>
          </div>
          <button @click="deleteWorkflow(selectedWorkflow)" class="btn btn-danger">حذف المخطط</button>
        </div>
      </div>
    </div>
    
    <!-- Add Workflow Modal -->
    <div v-if="showAddWorkflowModal" class="modal-overlay" @click.self="showAddWorkflowModal = false">
      <div class="modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">إضافة مخطط جديد</h2>
          <button @click="showAddWorkflowModal = false" class="text-gray-500 hover:text-gray-700">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="form-label">العنوان</label>
          <input type="text" v-model="newWorkflow.title" class="form-input" required>
        </div>
        
        <div class="mb-4">
          <label class="form-label">الوصف</label>
          <textarea v-model="newWorkflow.description" rows="4" class="form-input" required></textarea>
        </div>
        
        <div class="mb-4">
          <label class="form-label">صورة المخطط</label>
          <input type="file" accept="image/*" @change="handleFileUpload" class="form-input" required>
        </div>
        
        <div class="flex justify-end">
          <button @click="showAddWorkflowModal = false" class="btn btn-outline ml-2">إلغاء</button>
          <button @click="addNewWorkflow" class="btn btn-primary" :disabled="isUploading">
            <i v-if="isUploading" class="fas fa-spinner fa-spin ml-1"></i>
            إضافة المخطط
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getDatabase, ref as dbRef, onValue, push, update, remove } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

export default {
  name: 'Workflow',
  setup() {
    const db = getDatabase()
    const storage = getStorage()
    
    // Workflows data
    const workflows = ref([])
    const selectedWorkflow = ref(null)
    const newRelatedTask = ref('')
    
    // New workflow modal
    const showAddWorkflowModal = ref(false)
    const newWorkflow = ref({
      title: '',
      description: '',
      notes: '',
      relatedTasks: []
    })
    const selectedFile = ref(null)
    const isUploading = ref(false)
    
    // Load workflows from Firebase
    const loadWorkflows = () => {
      const workflowsRef = dbRef(db, 'workflows')
      onValue(workflowsRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          workflows.value = Object.entries(data).map(([id, workflow]) => ({
            id,
            ...workflow,
            notes: workflow.notes || '',
            relatedTasks: workflow.relatedTasks || []
          }))
        } else {
          workflows.value = []
        }
      })
    }
    
    // Workflow details
    const openWorkflowDetails = (workflow) => {
      selectedWorkflow.value = { ...workflow }
    }
    
    const closeDetails = () => {
      selectedWorkflow.value = null
      newRelatedTask.value = ''
    }
    
    const saveWorkflowChanges = () => {
      if (!selectedWorkflow.value) return
      
      const workflowRef = dbRef(db, `workflows/${selectedWorkflow.value.id}`)
      update(workflowRef, {
        title: selectedWorkflow.value.title,
        description: selectedWorkflow.value.description,
        notes: selectedWorkflow.value.notes || '',
        relatedTasks: selectedWorkflow.value.relatedTasks || []
      })
      
      closeDetails()
    }
    
    const deleteWorkflow = (workflow) => {
      if (!workflow) return
      
      if (confirm('هل أنت متأكد من حذف هذا المخطط؟')) {
        // Delete image from storage
        if (workflow.storagePath) {
          const fileRef = storageRef(storage, workflow.storagePath)
          deleteObject(fileRef).catch(error => {
            console.error('Error deleting file:', error)
          })
        }
        
        // Delete data from database
        const workflowRef = dbRef(db, `workflows/${workflow.id}`)
        remove(workflowRef)
        
        if (selectedWorkflow.value && selectedWorkflow.value.id === workflow.id) {
          closeDetails()
        }
      }
    }
    
    // Related tasks management
    const addRelatedTask = () => {
      if (!newRelatedTask.value.trim() || !selectedWorkflow.value) return
      
      if (!selectedWorkflow.value.relatedTasks) {
        selectedWorkflow.value.relatedTasks = []
      }
      
      selectedWorkflow.value.relatedTasks.push(newRelatedTask.value.trim())
      newRelatedTask.value = ''
    }
    
    const removeRelatedTask = (index) => {
      if (!selectedWorkflow.value || !selectedWorkflow.value.relatedTasks) return
      
      selectedWorkflow.value.relatedTasks.splice(index, 1)
    }
    
    // File upload
    const handleFileUpload = (event) => {
      selectedFile.value = event.target.files[0]
    }
    
    // Add new workflow
    const addNewWorkflow = () => {
      if (!newWorkflow.value.title.trim() || !newWorkflow.value.description.trim() || !selectedFile.value) {
        alert('يرجى ملء جميع الحقول المطلوبة')
        return
      }
      
      isUploading.value = true
      
      // Create a unique filename
      const ext = selectedFile.value.name.split('.').pop()
      const fileName = `workflow_${Date.now()}.${ext}`
      const storagePath = `workflow_images/${fileName}`
      
      // Upload file to Firebase Storage
      const fileRef = storageRef(storage, storagePath)
      const uploadTask = uploadBytesResumable(fileRef, selectedFile.value)
      
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Progress monitoring if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        }, 
        (error) => {
          // Error handling
          console.error('Error uploading file:', error)
          isUploading.value = false
          alert('حدث خطأ أثناء رفع الملف')
        }, 
        () => {
          // Upload completed successfully
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Save workflow data to Firebase Database
            const workflowsRef = dbRef(db, 'workflows')
            push(workflowsRef, {
              title: newWorkflow.value.title,
              description: newWorkflow.value.description,
              imageUrl: downloadURL,
              storagePath: storagePath,
              timestamp: Date.now(),
              notes: '',
              relatedTasks: []
            })
            
            // Reset form
            newWorkflow.value = {
              title: '',
              description: '',
              notes: '',
              relatedTasks: []
            }
            selectedFile.value = null
            isUploading.value = false
            showAddWorkflowModal.value = false
          })
        }
      )
    }
    
    // Initialize
    onMounted(() => {
      loadWorkflows()
    })
    
    return {
      workflows,
      selectedWorkflow,
      newRelatedTask,
      showAddWorkflowModal,
      newWorkflow,
      isUploading,
      openWorkflowDetails,
      closeDetails,
      saveWorkflowChanges,
      deleteWorkflow,
      addRelatedTask,
      removeRelatedTask,
      handleFileUpload,
      addNewWorkflow
    }
  }
}
</script>
