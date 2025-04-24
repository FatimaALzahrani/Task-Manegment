<template>
  <div class="settings-container p-6">
    <h1 class="text-2xl font-bold mb-6 text-primary-900">إعدادات الموقع</h1>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-primary-800">إعدادات المستخدم</h2>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
        <input 
          type="text" 
          v-model="userSettings.name" 
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
        <input 
          type="email" 
          v-model="userSettings.email" 
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">الدور</label>
        <select 
          v-model="userSettings.role" 
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="researcher">باحث رئيسي</option>
          <option value="assistant">مساعد باحث</option>
          <option value="supervisor">مشرف</option>
        </select>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-primary-800">إعدادات الإشعارات</h2>
      
      <div class="mb-4">
        <label class="flex items-center">
          <input 
            type="checkbox" 
            v-model="notificationSettings.emailNotifications" 
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span class="mr-2 text-sm text-gray-700">تفعيل إشعارات البريد الإلكتروني</span>
        </label>
      </div>
      
      <div class="mb-4">
        <label class="flex items-center">
          <input 
            type="checkbox" 
            v-model="notificationSettings.taskReminders" 
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span class="mr-2 text-sm text-gray-700">تذكير بالمهام قبل موعد الاستحقاق</span>
        </label>
      </div>
      
      <div class="mb-4">
        <label class="flex items-center">
          <input 
            type="checkbox" 
            v-model="notificationSettings.weeklyReport" 
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <span class="mr-2 text-sm text-gray-700">تقرير أسبوعي عن تقدم المشروع</span>
        </label>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4 text-primary-800">إعدادات المظهر</h2>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">النمط</label>
        <select 
          v-model="appearanceSettings.theme" 
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="light">فاتح</option>
          <option value="dark">داكن</option>
          <option value="system">حسب النظام</option>
        </select>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">اللون الرئيسي</label>
        <select 
          v-model="appearanceSettings.primaryColor" 
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="blue">أزرق</option>
          <option value="green">أخضر</option>
          <option value="purple">بنفسجي</option>
          <option value="red">أحمر</option>
        </select>
      </div>
      
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">حجم الخط</label>
        <select 
          v-model="appearanceSettings.fontSize" 
          class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="small">صغير</option>
          <option value="medium">متوسط</option>
          <option value="large">كبير</option>
        </select>
      </div>
    </div>
    
    <div class="flex justify-end">
      <button 
        @click="saveSettings" 
        class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        حفظ الإعدادات
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      userSettings: {
        name: 'الباحث الرئيسي',
        email: 'researcher@example.com',
        role: 'researcher'
      },
      notificationSettings: {
        emailNotifications: true,
        taskReminders: true,
        weeklyReport: false
      },
      appearanceSettings: {
        theme: 'light',
        primaryColor: 'blue',
        fontSize: 'medium'
      }
    }
  },
  methods: {
    saveSettings() {
      // هنا يمكن إضافة كود لحفظ الإعدادات في قاعدة البيانات
      console.log('تم حفظ الإعدادات:', {
        user: this.userSettings,
        notifications: this.notificationSettings,
        appearance: this.appearanceSettings
      });
      
      // إظهار رسالة نجاح
      this.$toast.success('تم حفظ الإعدادات بنجاح');
    }
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
