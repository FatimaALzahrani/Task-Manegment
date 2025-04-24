import { defineStore } from 'pinia';
import { dataService } from '@/services/firebase';

export const useDataStore = defineStore({
  id: 'data',
  
  state: () => ({
    children: [],
    wordData: {},
    words: [],
    loading: false,
    error: null,
    selectedChild: null,
    averageDuration: 3.5 // Default value
  }),
  
  getters: {
    completionPercentage: (state) => {
      if (state.children.length === 0 || state.words.length === 0) return 0;
      
      let totalWords = state.children.length * state.words.length;
      let completedWords = 0;
      
      state.children.forEach(child => {
        state.words.forEach(word => {
          if (state.wordData[child.id] && 
              state.wordData[child.id][word] && 
              state.wordData[child.id][word].done) {
            completedWords++;
          }
        });
      });
      
      return Math.round((completedWords / totalWords) * 100);
    }
  },
  
  actions: {
    async fetchChildren() {
      this.loading = true;
      this.error = null;
      
      try {
        dataService.getChildren((children) => {
          this.children = children;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async fetchWordData() {
      this.loading = true;
      this.error = null;
      
      try {
        dataService.getWordData((data) => {
          this.wordData = data;
          
          // Extract unique words
          const allWords = new Set();
          Object.values(data).forEach(childWords => {
            Object.keys(childWords).forEach(word => {
              allWords.add(word);
            });
          });
          
          this.words = Array.from(allWords);
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async saveChild(childId, childData) {
      this.loading = true;
      this.error = null;
      
      try {
        await dataService.saveChild(childId, childData);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async deleteChild(childId) {
      this.loading = true;
      this.error = null;
      
      try {
        await dataService.deleteChild(childId);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addWord(word) {
      this.loading = true;
      this.error = null;
      
      try {
        await dataService.addWord(word, this.children);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async updateWordData(childId, word, data) {
      this.error = null;
      
      try {
        await dataService.updateWordData(childId, word, data);
      } catch (error) {
        this.error = error.message;
      }
    },
    
    getWordLevel(childId, word) {
      if (!this.wordData[childId] || !this.wordData[childId][word]) return 'ضعيف';
      return this.wordData[childId][word].level || 'ضعيف';
    },
    
    isWordDone(childId, word) {
      if (!this.wordData[childId] || !this.wordData[childId][word]) return false;
      return this.wordData[childId][word].done || false;
    },
    
    setSelectedChild(child) {
      this.selectedChild = child ? { ...child } : null;
    }
  }
});
