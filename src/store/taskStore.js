import { createStore } from 'pinia';
import { taskService } from '@/services/firebase';

export const useTaskStore = createStore({
  id: 'tasks',
  
  state: () => ({
    tasks: [],
    loading: false,
    error: null,
    selectedTask: null,
    filterPriority: '',
    filterTag: '',
    searchQuery: ''
  }),
  
  getters: {
    getTasksByColumn: (state) => (column) => {
      return state.tasks.filter(task => {
        // Filter by column
        if (task.column !== column) return false;
        
        // Filter by search query
        if (state.searchQuery && !task.name.toLowerCase().includes(state.searchQuery.toLowerCase()) && 
            !task.description.toLowerCase().includes(state.searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filter by priority
        if (state.filterPriority && task.priority !== state.filterPriority) {
          return false;
        }
        
        // Filter by tag
        if (state.filterTag && (!task.tags || !task.tags.includes(state.filterTag))) {
          return false;
        }
        
        return true;
      });
    },
    
    totalTasks: (state) => state.tasks.length,
    
    completedTasks: (state) => state.tasks.filter(task => task.column === 'approved').length,
    
    completionPercentage: (state) => {
      const total = state.tasks.length;
      if (total === 0) return 0;
      const completed = state.tasks.filter(task => task.column === 'approved').length;
      return Math.round((completed / total) * 100);
    },
    
    upcomingTasks: (state) => {
      return state.tasks
        .filter(task => task.column !== 'approved')
        .sort((a, b) => {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        })
        .slice(0, 3);
    }
  },
  
  actions: {
    async fetchTasks() {
      this.loading = true;
      this.error = null;
      
      try {
        taskService.getTasks((tasks) => {
          this.tasks = tasks;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addTask(task) {
      this.loading = true;
      this.error = null;
      
      try {
        await taskService.addTask(task);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async updateTask(taskId, updates) {
      this.loading = true;
      this.error = null;
      
      try {
        await taskService.updateTask(taskId, updates);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async deleteTask(taskId) {
      this.loading = true;
      this.error = null;
      
      try {
        await taskService.deleteTask(taskId);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async moveTask(taskId, newColumn) {
      this.loading = true;
      this.error = null;
      
      try {
        await taskService.moveTask(taskId, newColumn);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addComment(taskId, comment) {
      this.error = null;
      
      try {
        await taskService.addComment(taskId, comment);
      } catch (error) {
        this.error = error.message;
      }
    },
    
    setSelectedTask(task) {
      this.selectedTask = task ? { ...task } : null;
    },
    
    setFilters({ priority = '', tag = '', query = '' }) {
      this.filterPriority = priority;
      this.filterTag = tag;
      this.searchQuery = query;
    }
  }
});
