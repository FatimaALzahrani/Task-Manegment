import { defineStore } from 'pinia';
import { literatureService } from '@/services/firebase';

export const useLiteratureStore = defineStore({
  id: 'literature',
  
  state: () => ({
    papers: [],
    loading: false,
    error: null,
    selectedPaper: null,
    filterYear: '',
    filterMethodology: '',
    searchQuery: ''
  }),
  
  getters: {
    filteredPapers: (state) => {
      return state.papers.filter(paper => {
        // Filter by search query
        if (state.searchQuery && !paper.title.toLowerCase().includes(state.searchQuery.toLowerCase()) && 
            !paper.summary.toLowerCase().includes(state.searchQuery.toLowerCase())) {
          return false;
        }
        
        // Filter by year
        if (state.filterYear && paper.year !== state.filterYear) {
          return false;
        }
        
        // Filter by methodology
        if (state.filterMethodology && paper.methodology !== state.filterMethodology) {
          return false;
        }
        
        return true;
      });
    },
    
    availableYears: (state) => {
      const years = [...new Set(state.papers.map(paper => paper.year))];
      return years.sort((a, b) => b - a); // Sort descending
    },
    
    recentPapers: (state) => {
      return [...state.papers]
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 3);
    }
  },
  
  actions: {
    async fetchPapers() {
      this.loading = true;
      this.error = null;
      
      try {
        literatureService.getPapers((papers) => {
          this.papers = papers;
          this.loading = false;
        });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async addPaper(paper) {
      this.loading = true;
      this.error = null;
      
      try {
        await literatureService.addPaper(paper);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async updatePaper(paperId, updates) {
      this.loading = true;
      this.error = null;
      
      try {
        await literatureService.updatePaper(paperId, updates);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    async deletePaper(paperId) {
      this.loading = true;
      this.error = null;
      
      try {
        await literatureService.deletePaper(paperId);
        this.loading = false;
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    
    setSelectedPaper(paper) {
      this.selectedPaper = paper ? { ...paper } : null;
    },
    
    setFilters({ year = '', methodology = '', query = '' }) {
      this.filterYear = year;
      this.filterMethodology = methodology;
      this.searchQuery = query;
    }
  }
});
