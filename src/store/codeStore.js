import { defineStore } from 'pinia';
import { codeService } from '@/services/firebase';

export const useCodeStore = defineStore({
  id: 'code',
  
  state: () => ({
    codes: [],
    loading: false,
    error: null,
    selectedCode: null
  }),
  
  getters: {
    recentCodes: (state) => {
      return [...state.codes]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3);
    },
    
    codesByType: (state) => {
      const result = {
        github: [],
        colab: [],
        kaggle: [],
        other: []
      };
      
      state.codes.forEach(code => {
        if (result[code.type]) {
          result[code.type].push(code);
        } else {
          result.other.push(code);
        }
      });
      
      return result;
    }
  },
  
  actions: {
    async fetchCodes() {
      this.loading = true;
      this.error = null;
      
      try {
        codeService.getCodeLinks((codes) => {
          this.codes = codes;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addCode(code) {
      this.loading = true;
      this.error = null;
      
      try {
        await codeService.addCodeLink(code);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async updateCode(codeId, updates) {
      this.loading = true;
      this.error = null;
      
      try {
        await codeService.updateCodeLink(codeId, updates);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async deleteCode(codeId) {
      this.loading = true;
      this.error = null;
      
      try {
        await codeService.deleteCodeLink(codeId);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    setSelectedCode(code) {
      this.selectedCode = code ? { ...code } : null;
    }
  }
});
