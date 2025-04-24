import { defineStore } from 'pinia';
import { workflowService } from '@/services/firebase';

export const useWorkflowStore = defineStore({
  id: 'workflow',
  
  state: () => ({
    workflows: [],
    loading: false,
    error: null,
    selectedWorkflow: null
  }),
  
  getters: {
    recentWorkflows: (state) => {
      return [...state.workflows]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3);
    }
  },
  
  actions: {
    async fetchWorkflows() {
      this.loading = true;
      this.error = null;
      
      try {
        workflowService.getWorkflows((workflows) => {
          this.workflows = workflows;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addWorkflow(workflow) {
      this.loading = true;
      this.error = null;
      
      try {
        await workflowService.addWorkflow(workflow);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async updateWorkflow(workflowId, updates) {
      this.loading = true;
      this.error = null;
      
      try {
        await workflowService.updateWorkflow(workflowId, updates);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async deleteWorkflow(workflowId) {
      this.loading = true;
      this.error = null;
      
      try {
        await workflowService.deleteWorkflow(workflowId);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    setSelectedWorkflow(workflow) {
      this.selectedWorkflow = workflow ? { ...workflow } : null;
    }
  }
});
