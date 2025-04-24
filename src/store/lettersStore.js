import { defineStore } from 'pinia';
import { lettersService } from '@/services/firebase';

export const useLettersStore = defineStore({
  id: 'letters',
  
  state: () => ({
    doctorLetters: [],
    parentLetters: [],
    loading: false,
    error: null
  }),
  
  getters: {
    doctorCompletionPercentage: (state) => {
      // Assuming we need 5 doctor approvals
      const targetCount = 5;
      return Math.min(Math.round((state.doctorLetters.length / targetCount) * 100), 100);
    },
    
    parentCompletionPercentage: (state) => {
      // Assuming we need 10 parent approvals
      const targetCount = 10;
      return Math.min(Math.round((state.parentLetters.length / targetCount) * 100), 100);
    }
  },
  
  actions: {
    async fetchDoctorLetters() {
      this.loading = true;
      this.error = null;
      
      try {
        lettersService.getDoctorLetters((letters) => {
          this.doctorLetters = letters;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async fetchParentLetters() {
      this.loading = true;
      this.error = null;
      
      try {
        lettersService.getParentLetters((letters) => {
          this.parentLetters = letters;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addDoctorLetter(letter) {
      this.loading = true;
      this.error = null;
      
      try {
        await lettersService.addDoctorLetter(letter);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addParentLetter(letter) {
      this.loading = true;
      this.error = null;
      
      try {
        await lettersService.addParentLetter(letter);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async deleteDoctorLetter(letterId) {
      this.loading = true;
      this.error = null;
      
      try {
        await lettersService.deleteDoctorLetter(letterId);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async deleteParentLetter(letterId) {
      this.loading = true;
      this.error = null;
      
      try {
        await lettersService.deleteParentLetter(letterId);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    }
  }
});
