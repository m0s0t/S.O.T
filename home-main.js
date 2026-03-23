// 1. قاعدة البيانات الكاملة مع 5 محاضرات لكل مادة
const academyData = [
        { 
        id: "icu", name: "عناية مركزة", icon: "🏥", color: "#0891b2", 
        lectures: [
            { id: "i1", title: "Arterial blood pressure measurement", models: ["Q/icu1.html"] },
            { id: "i2", title: "Central venous pressure (CVP)", models: ["Q/icu2.html"] },
            { id: "i3", title: "Body temperature", models: ["Q/icu3.html"] },
            { id: "i4", title: "The Critical-Care Pain Observation Tool (CPOT)", models: ["Q/icu4.html"] },
            { id: "i5", title: "Feeding tubes", models: ["Q/icu5.html"] }
        ] 
    },
        
    { 
        id: "medicine", name: "باطني", icon: "🩺", color: "#2563eb", 
        lectures: [
        ] 
    },
    { 
        id: "surgery", name: "جراحة", icon: "🔪", color: "#dc2626", 
        lectures: [
        ] 
    },

    { 
         id: "anesthesia", name: "تخدير", icon: "💤", color: "#7c3aed", 
        
        lectures: [
            { id: "i4.1", title: "Geriatric", models: ["Anesthesia/ans4.html"] },
            { id: "i7-9", title: "Urology and Ophthalmic ", models: ["Anesthesia/ans7-9.html"] },
            { id: "i8", title: "orthopedics", models: ["Anesthesia/ans8.html"] },
            { id: "i10", title: "neurosurgery", models: ["Anesthesia/ans10.html"] },
            // الجزء الثاني لكل محاضرة
            { id: "i4.2", title: "Geriatric 2", models: ["Anesthesia/ans4 - Copy.html"] },
            { id: "i7-9.2", title: "Urology and Ophthalmic 2", models: ["Anesthesia/ans7-9 - Copy.html"] },
            { id: "i8.2", title: "orthopedics 2", models: ["Anesthesia/ans8 - Copy.html"] },
            { id: "i10.2", title: "Neurosurgery 2", models: ["Anesthesia/ans10 - Copy.html"] }
        ] 
    },
    { 
        id: "devices", name: "أجهزة طبية", icon: "🔌", color: "#059669", 
        lectures: [
        ] 
    }
];

const container = document.getElementById('main-container');
const homeBtn = document.getElementById('home-btn'); // زر العودة
const recentSection = document.getElementById('recent-activity');

// عرض المواد الرئيسية
function renderSubjects() {
    homeBtn.classList.add('hidden'); // إخفاء زر العودة في الرئيسية
    recentSection.style.display = 'block';
    
    container.innerHTML = academyData.map((sub, i) => `
        <div onclick="renderLectures('${sub.id}')" 
             class="subject-card animate-card bg-white p-8 rounded-[2.5rem] shadow-xl text-center cursor-pointer hover:-translate-y-2 transition-all"
             style="border-bottom: 8px solid ${sub.color}">
            <div class="text-7xl mb-4">${sub.icon}</div>
            <h3 class="text-2xl font-black" style="color: ${sub.color}">${sub.name}</h3>
            <p class="text-slate-400 font-bold mt-2">${sub.lectures.length} محاضرات</p>
        </div>
    `).join('');
    loadRecentActivity();
}

// عرض المحاضرات لمادة
function renderLectures(subId) {
    homeBtn.classList.remove('hidden'); // إظهار زر العودة
    recentSection.style.display = 'none';
    const sub = academyData.find(s => s.id === subId);

    container.innerHTML = sub.lectures.map(lec => `
        <div onclick="renderModels('${subId}', '${lec.id}')" 
             class="bg-white p-6 rounded-2xl shadow-md border-r-8 hover:bg-slate-50 cursor-pointer transition-all animate-card"
             style="border-color: ${sub.color}">
            <h3 class="text-xl font-black text-slate-800">📖 ${lec.title}</h3>
            <p class="text-sm text-slate-400 mt-2">انقر لبدء الاختبار</p>
        </div>
    `).join('');
}

// عرض النموذج الوحيد للمحاضرة
function renderModels(subId, lecId) {
    const sub = academyData.find(s => s.id === subId);
    const lec = sub.lectures.find(l => l.id === lecId);
    
    // بما أنك طلبت جزء أسئلة واحد، سنعرض بطاقة كبيرة واحدة
    container.innerHTML = `
        <div class="col-span-full max-w-md mx-auto w-full">
            <a href="${lec.models[0]}" onclick="saveActivity('${lec.title}', 'اختبار شامل', '${sub.color}')" 
               class="flex flex-col items-center bg-white p-12 rounded-[3rem] text-center border-4 border-dashed hover:border-solid transition-all animate-card"
               style="border-color: ${sub.color}">
                <div class="text-6xl mb-6">📝</div>
                <h4 class="font-black text-2xl text-slate-700 mb-2">ابدأ الاختبار الآن</h4>
                <p class="text-slate-400 font-bold">${lec.title}</p>
                <div class="mt-8 px-8 py-3 rounded-full text-white font-black shadow-lg" style="background: ${sub.color}">
                    دخول الامتحان
                </div>
            </a>
        </div>
    `;
}

// حفظ النشاط الأخير
function saveActivity(title, model, color) {
    let activities = JSON.parse(localStorage.getItem('recentMedicalTests') || '[]');
    const newEntry = { title, model, color, date: new Date().toLocaleDateString('ar-EG') };
    activities = activities.filter(a => a.title !== title);
    activities.unshift(newEntry);
    localStorage.setItem('recentMedicalTests', JSON.stringify(activities.slice(0, 4)));
}

// تحميل النشاط الأخير
function loadRecentActivity() {
    const list = document.getElementById('recent-list');
    const activities = JSON.parse(localStorage.getItem('recentMedicalTests') || '[]');
    if (activities.length === 0) {
        list.innerHTML = `<p class="text-slate-400 italic text-sm">لا توجد سجلات سابقة.</p>`;
        return;
    }
    list.innerHTML = activities.map(act => `
        <div class="min-w-[200px] bg-white p-4 rounded-2xl shadow-sm border-t-4" style="border-color: ${act.color}">
            <h4 class="font-black text-slate-700 text-xs truncate">${act.title}</h4>
            <div class="text-[9px] text-slate-300 mt-2">${act.date}</div>
        </div>
    `).join('');
}

// البحث
function handleSearch(q) {
    if(!q) { renderSubjects(); return; }
    homeBtn.classList.remove('hidden');
    recentSection.style.display = 'none';
    let resultsHTML = '';
    academyData.forEach(sub => {
        sub.lectures.forEach(lec => {
            if(lec.title.toLowerCase().includes(q.toLowerCase())) {
                resultsHTML += `<div onclick="renderModels('${sub.id}', '${lec.id}')" class="bg-white p-6 rounded-2xl shadow-md border-r-8 cursor-pointer mb-4 animate-card" style="border-color: ${sub.color}">
                    <span class="text-[10px] font-bold" style="color: ${sub.color}">${sub.name}</span>
                    <h3 class="text-lg font-black">${lec.title}</h3>
                </div>`;
            }
        });
    });
    container.innerHTML = resultsHTML || `<p class="col-span-full text-center py-10">لا توجد نتائج</p>`;
}

// البدء
document.addEventListener('DOMContentLoaded', renderSubjects);
