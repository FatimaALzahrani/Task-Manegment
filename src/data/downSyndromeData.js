// مكونات خاصة بالبحث العلمي عن متلازمة داون

// قائمة بالمصطلحات الطبية المتعلقة بمتلازمة داون
export const downSyndromeTerms = [
  {
    term: "التثلث الصبغي 21",
    definition: "حالة وراثية تحدث عندما يكون هناك نسخة إضافية من الكروموسوم 21، وهو السبب الوراثي لمتلازمة داون."
  },
  {
    term: "الشق المنغولي",
    definition: "سمة مميزة في العين لدى الأشخاص المصابين بمتلازمة داون، حيث تكون زاوية العين مائلة للأعلى."
  },
  {
    term: "رخاوة العضلات",
    definition: "انخفاض في توتر العضلات يؤثر على الأطفال المصابين بمتلازمة داون، مما يؤثر على تطور المهارات الحركية."
  },
  {
    term: "عيوب القلب الخلقية",
    definition: "مشاكل في القلب موجودة منذ الولادة، وتظهر في حوالي 50% من الأطفال المصابين بمتلازمة داون."
  },
  {
    term: "صعوبات النطق",
    definition: "مشاكل في إنتاج الكلام والتواصل اللفظي، شائعة لدى الأشخاص المصابين بمتلازمة داون."
  },
  {
    term: "التدخل المبكر",
    definition: "برامج علاجية تبدأ في سن مبكرة لتحسين النمو البدني والمعرفي واللغوي للأطفال المصابين بمتلازمة داون."
  },
  {
    term: "تأخر النمو",
    definition: "بطء في اكتساب المهارات التنموية مقارنة بالأطفال الآخرين في نفس العمر."
  },
  {
    term: "العلاج الطبيعي",
    definition: "علاج يركز على تحسين الحركة والوظائف البدنية للأطفال المصابين بمتلازمة داون."
  },
  {
    term: "العلاج النطقي",
    definition: "علاج يركز على تحسين مهارات التواصل والنطق لدى الأطفال المصابين بمتلازمة داون."
  },
  {
    term: "العلاج الوظيفي",
    definition: "علاج يساعد الأطفال على تطوير المهارات اللازمة للأنشطة اليومية والمدرسية."
  }
];

// قائمة بالمراجع العلمية الأساسية عن متلازمة داون
export const downSyndromeReferences = [
  {
    title: "Language development in children with Down syndrome: A systematic review",
    authors: "Chapman, R. S., & Hesketh, L. J.",
    year: 2020,
    journal: "Journal of Speech, Language, and Hearing Research",
    url: "https://pubs.asha.org/journal/jslhr"
  },
  {
    title: "Speech and language therapy for children with Down syndrome",
    authors: "Buckley, S., & Bird, G.",
    year: 2018,
    journal: "Down Syndrome Education International",
    url: "https://www.down-syndrome.org/en-us/research/"
  },
  {
    title: "Phonological awareness in children with Down syndrome",
    authors: "Lemons, C. J., & Fuchs, D.",
    year: 2019,
    journal: "Reading and Writing",
    url: "https://link.springer.com/journal/11145"
  },
  {
    title: "Early communication intervention for children with Down syndrome",
    authors: "Roberts, J. E., Price, J., & Malkin, C.",
    year: 2021,
    journal: "American Journal on Intellectual and Developmental Disabilities",
    url: "https://www.aaidd.org/publications/journals"
  },
  {
    title: "Literacy skills in children with Down syndrome",
    authors: "Næss, K. A., Melby-Lervåg, M., Hulme, C., & Lyster, S. A.",
    year: 2017,
    journal: "Reading and Writing",
    url: "https://link.springer.com/journal/11145"
  }
];

// قائمة بالكلمات الشائعة المستخدمة في اختبارات النطق للأطفال المصابين بمتلازمة داون
export const commonTestWords = [
  { word: "بابا", category: "أفراد العائلة", difficulty: "سهل" },
  { word: "ماما", category: "أفراد العائلة", difficulty: "سهل" },
  { word: "ماء", category: "طعام وشراب", difficulty: "سهل" },
  { word: "حليب", category: "طعام وشراب", difficulty: "متوسط" },
  { word: "خبز", category: "طعام وشراب", difficulty: "متوسط" },
  { word: "تفاح", category: "طعام وشراب", difficulty: "متوسط" },
  { word: "موز", category: "طعام وشراب", difficulty: "متوسط" },
  { word: "كلب", category: "حيوانات", difficulty: "متوسط" },
  { word: "قطة", category: "حيوانات", difficulty: "متوسط" },
  { word: "عصفور", category: "حيوانات", difficulty: "صعب" },
  { word: "سيارة", category: "وسائل نقل", difficulty: "متوسط" },
  { word: "باص", category: "وسائل نقل", difficulty: "متوسط" },
  { word: "شمس", category: "طبيعة", difficulty: "متوسط" },
  { word: "قمر", category: "طبيعة", difficulty: "متوسط" },
  { word: "نجمة", category: "طبيعة", difficulty: "صعب" },
  { word: "كتاب", category: "أدوات مدرسية", difficulty: "متوسط" },
  { word: "قلم", category: "أدوات مدرسية", difficulty: "متوسط" },
  { word: "كرة", category: "ألعاب", difficulty: "متوسط" },
  { word: "دمية", category: "ألعاب", difficulty: "صعب" },
  { word: "باب", category: "منزل", difficulty: "متوسط" },
  { word: "نافذة", category: "منزل", difficulty: "صعب" },
  { word: "سرير", category: "منزل", difficulty: "متوسط" },
  { word: "كرسي", category: "منزل", difficulty: "متوسط" },
  { word: "طاولة", category: "منزل", difficulty: "صعب" }
];

// معايير تقييم النطق للأطفال المصابين بمتلازمة داون
export const speechEvaluationCriteria = [
  {
    category: "الأصوات الساكنة",
    criteria: [
      "نطق الأصوات الشفوية (ب، م، و)",
      "نطق الأصوات الأسنانية (ث، ذ)",
      "نطق الأصوات اللثوية (ت، د، ط، ض، ل، ن)",
      "نطق الأصوات الغارية (ج، ش)",
      "نطق الأصوات الطبقية (ك، غ، خ)",
      "نطق الأصوات الحلقية (ع، ح)",
      "نطق الأصوات الحنجرية (ء، هـ)"
    ]
  },
  {
    category: "الأصوات المتحركة",
    criteria: [
      "نطق الفتحة القصيرة",
      "نطق الفتحة الطويلة (ا)",
      "نطق الكسرة القصيرة",
      "نطق الكسرة الطويلة (ي)",
      "نطق الضمة القصيرة",
      "نطق الضمة الطويلة (و)"
    ]
  },
  {
    category: "بنية الكلمة",
    criteria: [
      "نطق الكلمات أحادية المقطع",
      "نطق الكلمات ثنائية المقطع",
      "نطق الكلمات متعددة المقاطع",
      "الحفاظ على بنية الكلمة دون حذف مقاطع"
    ]
  },
  {
    category: "الطلاقة",
    criteria: [
      "سرعة الكلام",
      "إيقاع الكلام",
      "التوقف المناسب بين الكلمات والجمل"
    ]
  },
  {
    category: "الصوت",
    criteria: [
      "نبرة الصوت",
      "علو الصوت",
      "جودة الصوت"
    ]
  }
];

// مراحل تطور النطق واللغة لدى الأطفال المصابين بمتلازمة داون
export const speechDevelopmentStages = [
  {
    age: "0-6 أشهر",
    milestones: [
      "الاستجابة للأصوات",
      "إصدار أصوات المناغاة البسيطة",
      "الابتسام استجابة للتفاعل الاجتماعي"
    ],
    activities: [
      "التحدث مع الطفل بشكل متكرر",
      "الغناء والترنيم",
      "استخدام الإيماءات والتعبيرات الوجهية"
    ]
  },
  {
    age: "6-12 شهر",
    milestones: [
      "المناغاة المتكررة (مثل بابابا، ماماما)",
      "فهم بعض الكلمات الشائعة",
      "استخدام الإشارات للتواصل"
    ],
    activities: [
      "لعب ألعاب الإشارة والتسمية",
      "قراءة الكتب المصورة البسيطة",
      "تعزيز التواصل البصري"
    ]
  },
  {
    age: "12-24 شهر",
    milestones: [
      "نطق الكلمات الأولى (قد يتأخر حتى 21 شهرًا)",
      "فهم التعليمات البسيطة",
      "استخدام الإيماءات بشكل أكثر تعقيدًا"
    ],
    activities: [
      "استخدام لغة الإشارة المبسطة",
      "تسمية الأشياء في البيئة المحيطة",
      "تشجيع المحاولات الكلامية"
    ]
  },
  {
    age: "2-3 سنوات",
    milestones: [
      "زيادة المفردات (حوالي 50 كلمة)",
      "بدء تكوين جمل من كلمتين",
      "فهم المفاهيم البسيطة"
    ],
    activities: [
      "ألعاب المطابقة والتصنيف",
      "سرد القصص البسيطة",
      "تمارين تقوية عضلات الفم"
    ]
  },
  {
    age: "3-5 سنوات",
    milestones: [
      "استخدام جمل أطول (3-4 كلمات)",
      "تحسن في وضوح النطق",
      "فهم الأسئلة البسيطة والإجابة عليها"
    ],
    activities: [
      "ألعاب الأدوار والتمثيل",
      "تمارين الوعي الصوتي",
      "استخدام الصور والرموز لدعم التواصل"
    ]
  },
  {
    age: "5-7 سنوات",
    milestones: [
      "استخدام جمل أكثر تعقيدًا",
      "تحسن في السرد والحوار",
      "بدء تعلم القراءة البسيطة"
    ],
    activities: [
      "تمارين القراءة المبكرة",
      "ألعاب القافية والتجزئة الصوتية",
      "تشجيع المحادثات الطويلة"
    ]
  }
];

// استراتيجيات التدخل المبكر للأطفال المصابين بمتلازمة داون
export const earlyInterventionStrategies = [
  {
    name: "العلاج النطقي المكثف",
    description: "جلسات منتظمة مع أخصائي النطق لتحسين مهارات النطق والتواصل",
    benefits: [
      "تحسين نطق الأصوات",
      "زيادة المفردات اللغوية",
      "تحسين فهم اللغة"
    ]
  },
  {
    name: "لغة الإشارة المبسطة",
    description: "استخدام الإشارات البسيطة لدعم التواصل قبل تطور النطق",
    benefits: [
      "تقليل الإحباط الناتج عن صعوبات التواصل",
      "تعزيز التواصل المبكر",
      "دعم تطور اللغة المنطوقة"
    ]
  },
  {
    name: "التواصل المعزز والبديل (AAC)",
    description: "استخدام الأدوات والتقنيات لدعم التواصل، مثل الصور والأجهزة الإلكترونية",
    benefits: [
      "توفير وسيلة تواصل للأطفال ذوي الصعوبات النطقية الشديدة",
      "تعزيز المشاركة الاجتماعية",
      "دعم التطور اللغوي"
    ]
  },
  {
    name: "تمارين عضلات الفم",
    description: "تمارين لتقوية عضلات الفم واللسان والشفاه لتحسين النطق",
    benefits: [
      "تحسين التحكم في عضلات النطق",
      "تقليل سيلان اللعاب",
      "تحسين وضوح الكلام"
    ]
  },
  {
    name: "القراءة المبكرة",
    description: "تعليم القراءة في سن مبكرة كوسيلة لدعم تطور اللغة",
    benefits: [
      "تعزيز المفردات اللغوية",
      "تحسين الوعي الصوتي",
      "دعم التطور المعرفي"
    ]
  },
  {
    name: "التدخل القائم على اللعب",
    description: "استخدام الأنشطة الترفيهية والألعاب لتعزيز مهارات التواصل",
    benefits: [
      "زيادة الدافعية للتواصل",
      "تعزيز التفاعل الاجتماعي",
      "تطوير مهارات اللغة في سياقات طبيعية"
    ]
  }
];

// أدوات تقييم النطق واللغة للأطفال المصابين بمتلازمة داون
export const assessmentTools = [
  {
    name: "اختبار النطق العربي",
    type: "تقييم النطق",
    ageRange: "3-8 سنوات",
    description: "يقيم قدرة الطفل على نطق الأصوات العربية في مواقع مختلفة من الكلمة"
  },
  {
    name: "مقياس المفردات اللغوية المصور",
    type: "تقييم المفردات",
    ageRange: "2-6 سنوات",
    description: "يقيم حجم المفردات اللغوية التعبيرية والاستقبالية لدى الطفل"
  },
  {
    name: "اختبار فهم اللغة العربية",
    type: "تقييم الفهم",
    ageRange: "3-7 سنوات",
    description: "يقيم قدرة الطفل على فهم التعليمات والجمل بمستويات مختلفة من التعقيد"
  },
  {
    name: "مقياس التواصل الاجتماعي",
    type: "تقييم التواصل",
    ageRange: "2-10 سنوات",
    description: "يقيم مهارات التواصل الاجتماعي والتفاعل مع الآخرين"
  },
  {
    name: "بطارية تقييم الوعي الصوتي",
    type: "تقييم الوعي الصوتي",
    ageRange: "4-8 سنوات",
    description: "تقيس قدرة الطفل على التعرف على أصوات اللغة ومعالجتها"
  }
];

export default {
  downSyndromeTerms,
  downSyndromeReferences,
  commonTestWords,
  speechEvaluationCriteria,
  speechDevelopmentStages,
  earlyInterventionStrategies,
  assessmentTools
};
