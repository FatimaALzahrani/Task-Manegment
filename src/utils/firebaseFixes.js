// إصلاح خطأ Firebase المتعلق بقيمة undefined في خاصية assignee

// تعديل دالة saveTaskChanges في ملف Tasks.vue
export function fixFirebaseUndefinedError() {
  // التحقق من وجود قيمة قبل حفظها
  const saveTaskChanges = (task) => {
    // التأكد من أن جميع الخصائص لها قيم صالحة
    const sanitizedTask = {
      ...task,
      // التحقق من وجود قيمة assignee وتعيين قيمة افتراضية إذا كانت غير موجودة
      assignee: task.assignee || 'غير معين',
      // التحقق من باقي الخصائص المهمة
      title: task.title || 'مهمة بدون عنوان',
      description: task.description || '',
      status: task.status || 'todo',
      priority: task.priority || 'medium',
      dueDate: task.dueDate || null
    };
    
    // الآن يمكن حفظ المهمة بأمان في Firebase
    return firebase.database().ref(`tasks/${task.id}`).update(sanitizedTask);
  };
  
  return saveTaskChanges;
}

// تعديل دالة إضافة مهمة جديدة
export function fixNewTaskCreation() {
  const createNewTask = (taskData) => {
    // التأكد من أن جميع الخصائص الضرورية موجودة
    const newTask = {
      id: generateUniqueId(), // دالة لإنشاء معرف فريد
      title: taskData.title || 'مهمة جديدة',
      description: taskData.description || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      assignee: taskData.assignee || 'غير معين',
      createdAt: new Date().toISOString(),
      dueDate: taskData.dueDate || null
    };
    
    // إضافة المهمة الجديدة إلى Firebase
    return firebase.database().ref('tasks').push(newTask);
  };
  
  return createNewTask;
}

// دالة مساعدة لإنشاء معرف فريد
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
