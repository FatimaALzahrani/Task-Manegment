import { ref, onMounted, onUnmounted } from 'vue';
import Sortable from 'sortablejs';
import { useTaskStore } from '@/store/taskStore';

export default function useDragAndDrop() {
  const taskStore = useTaskStore();
  const sortables = ref([]);
  
  const initDragAndDrop = () => {
    // Get all task columns
    const columns = document.querySelectorAll('.task-column');
    
    // Initialize Sortable for each column
    columns.forEach(column => {
      const columnId = column.getAttribute('data-column');
      const taskList = column.querySelector('.task-list');
      
      if (taskList) {
        const sortable = Sortable.create(taskList, {
          group: 'tasks',
          animation: 150,
          ghostClass: 'task-ghost',
          chosenClass: 'task-chosen',
          dragClass: 'task-drag',
          
          onEnd: (evt) => {
            const taskId = evt.item.getAttribute('data-task-id');
            const newColumn = evt.to.parentElement.getAttribute('data-column');
            
            if (taskId && newColumn) {
              // Update task column in Firebase
              taskStore.moveTask(taskId, newColumn);
            }
          }
        });
        
        sortables.value.push(sortable);
      }
    });
  };
  
  const destroyDragAndDrop = () => {
    // Destroy all Sortable instances
    sortables.value.forEach(sortable => {
      sortable.destroy();
    });
    sortables.value = [];
  };
  
  onMounted(() => {
    // Initialize after component is mounted
    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(() => {
      initDragAndDrop();
    }, 500);
  });
  
  onUnmounted(() => {
    // Clean up when component is unmounted
    destroyDragAndDrop();
  });
  
  return {
    initDragAndDrop,
    destroyDragAndDrop
  };
}
