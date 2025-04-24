<template>
  <div class="fade-in">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">تحليل بيانات النطق</h1>
      <div class="flex space-x-2 space-x-reverse">
        <button @click="exportData" class="btn btn-secondary ml-2">
          <i class="fas fa-download ml-2"></i>تصدير البيانات
        </button>
        <button @click="generateReport" class="btn btn-primary">
          <i class="fas fa-chart-bar ml-2"></i>إنشاء تقرير
        </button>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">إجمالي الأطفال</h3>
        <p class="dashboard-stat">{{ childrenData.length }}</p>
        <p class="text-sm text-gray-500 mt-2">عدد الأطفال المشاركين في الدراسة</p>
      </div>
      
      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">متوسط العمر</h3>
        <p class="dashboard-stat">{{ averageAge }} سنوات</p>
        <p class="text-sm text-gray-500 mt-2">متوسط عمر الأطفال المشاركين</p>
      </div>
      
      <div class="dashboard-card">
        <h3 class="text-lg font-semibold text-gray-700 mb-2">نسبة إتقان الكلمات</h3>
        <p class="dashboard-stat">{{ masteryPercentage }}%</p>
        <p class="text-sm text-gray-500 mt-2">نسبة الكلمات التي تم إتقانها</p>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">تحليل الكلمات حسب الفئة</h2>
      <div class="h-80">
        <canvas ref="categoryChart"></canvas>
      </div>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">تحليل الكلمات حسب الصعوبة</h2>
        <div class="h-64">
          <canvas ref="difficultyChart"></canvas>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">تقدم الأطفال</h2>
        <div class="h-64">
          <canvas ref="progressChart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">جدول مقارنة أداء الأطفال</h2>
      
      <div class="mb-4 flex flex-wrap gap-4">
        <div class="relative">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="بحث..." 
            class="form-input py-2 pl-10 pr-4"
          >
          <i class="fas fa-search absolute right-3 top-3 text-gray-400"></i>
        </div>
        
        <select v-model="filterCategory" class="form-input py-2">
          <option value="">كل الفئات</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
        
        <select v-model="filterDifficulty" class="form-input py-2">
          <option value="">كل مستويات الصعوبة</option>
          <option value="سهل">سهل</option>
          <option value="متوسط">متوسط</option>
          <option value="صعب">صعب</option>
        </select>
      </div>
      
      <div class="responsive-table">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الكلمة
              </th>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الفئة
              </th>
              <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الصعوبة
              </th>
              <th v-for="child in childrenData" :key="child.id" class="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ child.name }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="word in filteredWords" :key="word.word">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ word.word }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ word.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="{
                  'px-2 py-1 rounded-full text-xs font-medium': true,
                  'bg-green-100 text-green-800': word.difficulty === 'سهل',
                  'bg-yellow-100 text-yellow-800': word.difficulty === 'متوسط',
                  'bg-red-100 text-red-800': word.difficulty === 'صعب'
                }">
                  {{ word.difficulty }}
                </span>
              </td>
              <td v-for="child in childrenData" :key="`${word.word}-${child.id}`" class="px-6 py-4 whitespace-nowrap text-center">
                <span :class="{
                  'px-2 py-1 rounded-full text-xs font-medium': true,
                  'bg-green-100 text-green-800': getWordPerformance(child.id, word.word) === 'ممتاز',
                  'bg-yellow-100 text-yellow-800': getWordPerformance(child.id, word.word) === 'متوسط',
                  'bg-red-100 text-red-800': getWordPerformance(child.id, word.word) === 'ضعيف'
                }">
                  {{ getWordPerformance(child.id, word.word) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-4">معايير تقييم النطق</h2>
      
      <div class="space-y-6">
        <div v-for="category in evaluationCriteria" :key="category.category" class="border-b border-gray-200 pb-4 last:border-0">
          <h3 class="text-lg font-semibold text-gray-800 mb-3">{{ category.category }}</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="criterion in category.criteria" :key="criterion" class="bg-gray-50 p-3 rounded-lg">
              <p class="text-sm text-gray-700">{{ criterion }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { commonTestWords, speechEvaluationCriteria } from '@/data/downSyndromeData'
import { useDataStore } from '@/store/dataStore'

// Register Chart.js components
Chart.register(...registerables)

export default {
  name: 'SpeechAnalysis',
  setup() {
    const dataStore = useDataStore()
    
    // Chart references
    const categoryChart = ref(null)
    const difficultyChart = ref(null)
    const progressChart = ref(null)
    
    // Data
    const testWords = ref([...commonTestWords])
    const evaluationCriteria = ref([...speechEvaluationCriteria])
    const childrenData = ref([])
    const wordPerformance = ref({})
    
    // Filters
    const searchQuery = ref('')
    const filterCategory = ref('')
    const filterDifficulty = ref('')
    
    // Computed properties
    const categories = computed(() => {
      const uniqueCategories = new Set(testWords.value.map(word => word.category))
      return Array.from(uniqueCategories)
    })
    
    const filteredWords = computed(() => {
      return testWords.value.filter(word => {
        // Filter by search query
        if (searchQuery.value && !word.word.includes(searchQuery.value)) {
          return false
        }
        
        // Filter by category
        if (filterCategory.value && word.category !== filterCategory.value) {
          return false
        }
        
        // Filter by difficulty
        if (filterDifficulty.value && word.difficulty !== filterDifficulty.value) {
          return false
        }
        
        return true
      })
    })
    
    const averageAge = computed(() => {
      if (childrenData.value.length === 0) return 0
      
      const sum = childrenData.value.reduce((total, child) => total + parseInt(child.age), 0)
      return (sum / childrenData.value.length).toFixed(1)
    })
    
    const masteryPercentage = computed(() => {
      if (childrenData.value.length === 0 || testWords.value.length === 0) return 0
      
      let totalAssessments = 0
      let excellentCount = 0
      
      childrenData.value.forEach(child => {
        testWords.value.forEach(word => {
          totalAssessments++
          if (getWordPerformance(child.id, word.word) === 'ممتاز') {
            excellentCount++
          }
        })
      })
      
      return Math.round((excellentCount / totalAssessments) * 100)
    })
    
    // Methods
    const getWordPerformance = (childId, word) => {
      if (!wordPerformance.value[childId] || !wordPerformance.value[childId][word]) {
        return 'ضعيف'
      }
      
      return wordPerformance.value[childId][word]
    }
    
    const initCharts = () => {
      // Category Chart
      const categoryData = {}
      categories.value.forEach(category => {
        categoryData[category] = {
          excellent: 0,
          average: 0,
          poor: 0
        }
      })
      
      childrenData.value.forEach(child => {
        testWords.value.forEach(word => {
          const performance = getWordPerformance(child.id, word.word)
          if (performance === 'ممتاز') {
            categoryData[word.category].excellent++
          } else if (performance === 'متوسط') {
            categoryData[word.category].average++
          } else {
            categoryData[word.category].poor++
          }
        })
      })
      
      new Chart(categoryChart.value, {
        type: 'bar',
        data: {
          labels: categories.value,
          datasets: [
            {
              label: 'ممتاز',
              data: categories.value.map(category => categoryData[category].excellent),
              backgroundColor: 'rgba(34, 197, 94, 0.7)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 1
            },
            {
              label: 'متوسط',
              data: categories.value.map(category => categoryData[category].average),
              backgroundColor: 'rgba(234, 179, 8, 0.7)',
              borderColor: 'rgba(234, 179, 8, 1)',
              borderWidth: 1
            },
            {
              label: 'ضعيف',
              data: categories.value.map(category => categoryData[category].poor),
              backgroundColor: 'rgba(239, 68, 68, 0.7)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true
            }
          }
        }
      })
      
      // Difficulty Chart
      const difficultyData = {
        easy: { excellent: 0, average: 0, poor: 0 },
        medium: { excellent: 0, average: 0, poor: 0 },
        hard: { excellent: 0, average: 0, poor: 0 }
      }
      
      childrenData.value.forEach(child => {
        testWords.value.forEach(word => {
          const performance = getWordPerformance(child.id, word.word)
          const difficulty = word.difficulty === 'سهل' ? 'easy' : (word.difficulty === 'متوسط' ? 'medium' : 'hard')
          
          if (performance === 'ممتاز') {
            difficultyData[difficulty].excellent++
          } else if (performance === 'متوسط') {
            difficultyData[difficulty].average++
          } else {
            difficultyData[difficulty].poor++
          }
        })
      })
      
      new Chart(difficultyChart.value, {
        type: 'pie',
        data: {
          labels: ['سهل - ممتاز', 'سهل - متوسط', 'سهل - ضعيف', 'متوسط - ممتاز', 'متوسط - متوسط', 'متوسط - ضعيف', 'صعب - ممتاز', 'صعب - متوسط', 'صعب - ضعيف'],
          datasets: [
            {
              data: [
                difficultyData.easy.excellent,
                difficultyData.easy.average,
                difficultyData.easy.poor,
                difficultyData.medium.excellent,
                difficultyData.medium.average,
                difficultyData.medium.poor,
                difficultyData.hard.excellent,
                difficultyData.hard.average,
                difficultyData.hard.poor
              ],
              backgroundColor: [
                'rgba(34, 197, 94, 0.9)',
                'rgba(34, 197, 94, 0.6)',
                'rgba(34, 197, 94, 0.3)',
                'rgba(234, 179, 8, 0.9)',
                'rgba(234, 179, 8, 0.6)',
                'rgba(234, 179, 8, 0.3)',
                'rgba(239, 68, 68, 0.9)',
                'rgba(239, 68, 68, 0.6)',
                'rgba(239, 68, 68, 0.3)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
      
      // Progress Chart
      const childrenNames = childrenData.value.map(child => child.name)
      const childrenProgress = childrenData.value.map(child => {
        let excellentCount = 0
        let totalWords = testWords.value.length
        
        testWords.value.forEach(word => {
          if (getWordPerformance(child.id, word.word) === 'ممتاز') {
            excellentCount++
          }
        })
        
        return (excellentCount / totalWords) * 100
      })
      
      new Chart(progressChart.value, {
        type: 'bar',
        data: {
          labels: childrenNames,
          datasets: [
            {
              label: 'نسبة التقدم',
              data: childrenProgress,
              backgroundColor: 'rgba(59, 130, 246, 0.7)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      })
    }
    
    const exportData = () => {
      // In a real app, this would export data to CSV or Excel
      alert('سيتم تصدير البيانات (هذه وظيفة تجريبية)')
    }
    
    const generateReport = () => {
      // In a real app, this would generate a detailed report
      alert('سيتم إنشاء تقرير مفصل (هذه وظيفة تجريبية)')
    }
    
    // Initialize
    onMounted(() => {
      // Load children data
      dataStore.fetchChildren()
        .then(() => {
          childrenData.value = dataStore.children
          
          // Generate random performance data for demo
          childrenData.value.forEach(child => {
            wordPerformance.value[child.id] = {}
            
            testWords.value.forEach(word => {
              const rand = Math.random()
              let performance
              
              if (word.difficulty === 'سهل') {
                performance = rand < 0.7 ? 'ممتاز' : (rand < 0.9 ? 'متوسط' : 'ضعيف')
              } else if (word.difficulty === 'متوسط') {
                performance = rand < 0.4 ? 'ممتاز' : (rand < 0.8 ? 'متوسط' : 'ضعيف')
              } else {
                performance = rand < 0.2 ? 'ممتاز' : (rand < 0.6 ? 'متوسط' : 'ضعيف')
              }
              
              wordPerformance.value[child.id][word.word] = performance
            })
          })
          
          // Initialize charts after data is loaded
          setTimeout(() => {
            initCharts()
          }, 500)
        })
    })
    
    return {
      testWords,
      evaluationCriteria,
      childrenData,
      searchQuery,
      filterCategory,
      filterDifficulty,
      categories,
      filteredWords,
      averageAge,
      masteryPercentage,
      categoryChart,
      difficultyChart,
      progressChart,
      getWordPerformance,
      exportData,
      generateReport
    }
  }
}
</script>
