import { ref, computed } from 'vue';

export default function useTaskDetails() {
  const showTaskDetailsModal = ref(false);
  const currentTask = ref(null);
  const newComment = ref('');
  
  const formattedDate = computed(() => {
    if (!currentTask.value || !currentTask.value.dueDate) return '';
    
    const date = new Date(currentTask.value.dueDate);
    return date.toLocaleDateString('ar-EG');
  });
  
  const formattedCreationDate = computed(() => {
    if (!currentTask.value || !currentTask.value.dateCreated) return '';
    
    const date = new Date(currentTask.value.dateCreated);
    return date.toLocaleDateString('ar-EG');
  });
  
  const openTaskDetails = (task) => {
    currentTask.value = { ...task };
    showTaskDetailsModal.value = true;
  };
  
  const closeTaskDetails = () => {
    showTaskDetailsModal.value = false;
    currentTask.value = null;
    newComment.value = '';
  };
  
  const addComment = (taskStore) => {
    if (!newComment.value.trim() || !currentTask.value) return;
    
    taskStore.addComment(currentTask.value.id, newComment.value.trim())
      .then(() => {
        newComment.value = '';
      });
  };
  
  const updateTaskDetails = (taskStore) => {
    if (!currentTask.value) return;
    
    taskStore.updateTask(currentTask.value.id, {
      name: currentTask.value.name,
      description: currentTask.value.description,
      priority: currentTask.value.priority,
      dueDate: currentTask.value.dueDate,
      assignedTo: currentTask.value.assignedTo,
      tags: currentTask.value.tags
    })
      .then(() => {
        closeTaskDetails();
      });
  };
  
  const deleteTask = (taskStore) => {
    if (!currentTask.value) return;
    
    if (confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      taskStore.deleteTask(currentTask.value.id)
        .then(() => {
          closeTaskDetails();
        });
    }
  };
  
  const addTag = (tag) => {
    if (!currentTask.value) return;
    
    if (!currentTask.value.tags) {
      currentTask.value.tags = [];
    }
    
    if (!currentTask.value.tags.includes(tag)) {
      currentTask.value.tags.push(tag);
    }
  };
  
  const removeTag = (tag) => {
    if (!currentTask.value || !currentTask.value.tags) return;
    
    const index = currentTask.value.tags.indexOf(tag);
    if (index !== -1) {
      currentTask.value.tags.splice(index, 1);
    }
  };
  
  return {
    showTaskDetailsModal,
    currentTask,
    newComment,
    formattedDate,
    formattedCreationDate,
    openTaskDetails,
    closeTaskDetails,
    addComment,
    updateTaskDetails,
    deleteTask,
    addTag,
    removeTag
  };
}
