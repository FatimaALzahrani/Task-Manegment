// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, update, remove } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAFeXFfvJLVBqmpdxFklKGdlA0vu1etiLs",
  authDomain: "grass-b5acb.firebaseapp.com",
  databaseURL: "https://grass-b5acb-default-rtdb.firebaseio.com",
  projectId: "grass-b5acb",
  storageBucket: "grass-b5acb.appspot.com",
  messagingSenderId: "998170531141",
  appId: "1:998170531141:web:55131f3d38a1d55d821a2c",
  measurementId: "G-BYF7JHV7WM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

// Task Management Service
export const taskService = {
  // Get all tasks
  getTasks(callback) {
    const tasksRef = ref(database, 'tasks');
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const tasks = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          tasks.push({
            id: key,
            ...data[key],
            comments: data[key].comments || [],
            tags: data[key].tags || []
          });
        });
      }
      callback(tasks);
    });
  },

  // Add a new task
  addTask(task) {
    const tasksRef = ref(database, 'tasks');
    return push(tasksRef, {
      ...task,
      dateCreated: new Date().toISOString()
    });
  },

  // Update an existing task
  updateTask(taskId, updates) {
    const taskRef = ref(database, `tasks/${taskId}`);
    return update(taskRef, updates);
  },

  // Delete a task
  deleteTask(taskId) {
    const taskRef = ref(database, `tasks/${taskId}`);
    return remove(taskRef);
  },

  // Move a task to a different column
  moveTask(taskId, newColumn) {
    const taskRef = ref(database, `tasks/${taskId}`);
    return update(taskRef, { column: newColumn });
  },

  // Add a comment to a task
  addComment(taskId, comment) {
    return new Promise((resolve, reject) => {
      const taskRef = ref(database, `tasks/${taskId}`);
      
      // First get the current task to access its comments
      onValue(taskRef, (snapshot) => {
        const task = snapshot.val();
        if (task) {
          const comments = task.comments || [];
          comments.push({
            text: comment,
            timestamp: new Date().toISOString(),
            user: 'باحث' // In a real app, this would be the current user
          });
          
          // Update the task with the new comments
          update(taskRef, { comments })
            .then(resolve)
            .catch(reject);
        } else {
          reject(new Error('Task not found'));
        }
      }, { onlyOnce: true });
    });
  }
};

// Literature Management Service
export const literatureService = {
  // Get all papers
  getPapers(callback) {
    const papersRef = ref(database, 'papers');
    onValue(papersRef, (snapshot) => {
      const data = snapshot.val();
      const papers = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          papers.push({
            id: key,
            ...data[key],
            quotes: data[key].quotes || [],
            notes: data[key].notes || ''
          });
        });
      }
      callback(papers);
    });
  },

  // Add a new paper
  addPaper(paper) {
    const papersRef = ref(database, 'papers');
    return push(papersRef, {
      ...paper,
      timestamp: Date.now()
    });
  },

  // Update an existing paper
  updatePaper(paperId, updates) {
    const paperRef = ref(database, `papers/${paperId}`);
    return update(paperRef, updates);
  },

  // Delete a paper
  deletePaper(paperId) {
    const paperRef = ref(database, `papers/${paperId}`);
    return remove(paperRef);
  }
};

// Data Management Service
export const dataService = {
  // Get all children
  getChildren(callback) {
    const childrenRef = ref(database, 'children');
    onValue(childrenRef, (snapshot) => {
      const data = snapshot.val();
      const children = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          children.push({
            id: key,
            ...data[key]
          });
        });
      }
      callback(children);
    });
  },

  // Get all word data
  getWordData(callback) {
    const wordsRef = ref(database, 'words');
    onValue(wordsRef, (snapshot) => {
      const data = snapshot.val();
      callback(data || {});
    });
  },

  // Add or update a child
  saveChild(childId, childData) {
    const childRef = ref(database, `children/${childId}`);
    return update(childRef, childData);
  },

  // Delete a child
  deleteChild(childId) {
    const childRef = ref(database, `children/${childId}`);
    return remove(childRef);
  },

  // Add a new word
  addWord(word, children) {
    const updates = {};
    
    children.forEach(child => {
      updates[`words/${child.id}/${word}`] = { level: 'ضعيف', done: false };
    });
    
    return update(ref(database), updates);
  },

  // Update word data
  updateWordData(childId, word, data) {
    const wordRef = ref(database, `words/${childId}/${word}`);
    return update(wordRef, data);
  }
};

// Letters Management Service
export const lettersService = {
  // Get all doctor letters
  getDoctorLetters(callback) {
    const lettersRef = ref(database, 'doctor_letters');
    onValue(lettersRef, (snapshot) => {
      const data = snapshot.val();
      const letters = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          letters.push({
            id: key,
            ...data[key]
          });
        });
      }
      callback(letters);
    });
  },

  // Get all parent letters
  getParentLetters(callback) {
    const lettersRef = ref(database, 'parent_letters');
    onValue(lettersRef, (snapshot) => {
      const data = snapshot.val();
      const letters = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          letters.push({
            id: key,
            ...data[key]
          });
        });
      }
      callback(letters);
    });
  },

  // Add a new doctor letter
  addDoctorLetter(letter) {
    const lettersRef = ref(database, 'doctor_letters');
    return push(lettersRef, {
      ...letter,
      timestamp: Date.now()
    });
  },

  // Add a new parent letter
  addParentLetter(letter) {
    const lettersRef = ref(database, 'parent_letters');
    return push(lettersRef, {
      ...letter,
      timestamp: Date.now()
    });
  },

  // Delete a doctor letter
  deleteDoctorLetter(letterId) {
    const letterRef = ref(database, `doctor_letters/${letterId}`);
    return remove(letterRef);
  },

  // Delete a parent letter
  deleteParentLetter(letterId) {
    const letterRef = ref(database, `parent_letters/${letterId}`);
    return remove(letterRef);
  }
};

// Workflow Management Service
export const workflowService = {
  // Get all workflows
  getWorkflows(callback) {
    const workflowsRef = ref(database, 'workflows');
    onValue(workflowsRef, (snapshot) => {
      const data = snapshot.val();
      const workflows = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          workflows.push({
            id: key,
            ...data[key],
            notes: data[key].notes || '',
            relatedTasks: data[key].relatedTasks || []
          });
        });
      }
      callback(workflows);
    });
  },

  // Add a new workflow
  addWorkflow(workflow) {
    const workflowsRef = ref(database, 'workflows');
    return push(workflowsRef, {
      ...workflow,
      timestamp: Date.now()
    });
  },

  // Update an existing workflow
  updateWorkflow(workflowId, updates) {
    const workflowRef = ref(database, `workflows/${workflowId}`);
    return update(workflowRef, updates);
  },

  // Delete a workflow
  deleteWorkflow(workflowId) {
    const workflowRef = ref(database, `workflows/${workflowId}`);
    return remove(workflowRef);
  }
};

// Code Links Management Service
export const codeService = {
  // Get all code links
  getCodeLinks(callback) {
    const codesRef = ref(database, 'codes');
    onValue(codesRef, (snapshot) => {
      const data = snapshot.val();
      const codes = [];
      if (data) {
        Object.keys(data).forEach((key) => {
          codes.push({
            id: key,
            ...data[key],
            notes: data[key].notes || ''
          });
        });
      }
      callback(codes);
    });
  },

  // Add a new code link
  addCodeLink(code) {
    const codesRef = ref(database, 'codes');
    return push(codesRef, {
      ...code,
      timestamp: Date.now()
    });
  },

  // Update an existing code link
  updateCodeLink(codeId, updates) {
    const codeRef = ref(database, `codes/${codeId}`);
    return update(codeRef, updates);
  },

  // Delete a code link
  deleteCodeLink(codeId) {
    const codeRef = ref(database, `codes/${codeId}`);
    return remove(codeRef);
  }
};

export default {
  app,
  database,
  storage,
  taskService,
  literatureService,
  dataService,
  lettersService,
  workflowService,
  codeService
};
