// 1. البيانات (الـ 25 سؤال)
const examData = [
    { id: 0, text: "What is the normal range of human body temperature?", options: ["34.0–35.5°C", "36.0–37.5°C", "37.5–39.0°C", "35.5–38.5°C"], correct: 1 },
    { id: 1, text: "Which part of the brain functions as the body's thermostat?", options: ["Cerebellum", "Hypothalamus", "Medulla oblongata", "Pituitary gland"], correct: 1 },
    { id: 2, text: "Core body temperature refers to the temperature of:", options: ["Skin tissues", "Internal organs such as brain and liver", "Peripheral muscles", "Subcutaneous fat"], correct: 1 },
    { id: 3, text: "Fever is medically referred to as:", options: ["Hypothermia", "Hyperthermia", "Pyrexia", "Hyperpyrexia"], correct: 2 },
    { id: 4, text: "Shell body temperature mainly represents the temperature of:", options: ["Internal organs", "Skin and underlying tissues", "Arterial blood", "Bone marrow"], correct: 1 },
    { id: 5, text: "Which factor can physiologically influence body temperature?", options: ["Blood group", "Exercise", "Eye color", "Hair color"], correct: 1 },
    { id: 6, text: "Body temperature is typically lower during which time of the day?", options: ["Late evening", "Morning", "Afternoon", "Midnight"], correct: 1 },
    { id: 7, text: "Which of the following is a possible cause of fever?", options: ["Vitamin deficiency", "Bacterial infection", "Low calcium intake", "Dehydration only"], correct: 1 },
    { id: 8, text: "In the oral temperature method, the thermometer is placed:", options: ["Between the teeth", "Under the tongue", "Inside the cheek", "On the palate"], correct: 1 },
    { id: 9, text: "Oral temperature measurement is recommended for children older than:", options: ["2 years", "3 years", "5 years", "10 years"], correct: 2 },
    { id: 10, text: "During oral temperature measurement, the patient should breathe through the:", options: ["Mouth", "Nose", "Both mouth and nose", "Neither"], correct: 1 },
    { id: 11, text: "The axillary method measures temperature at the:", options: ["Ear canal", "Rectum", "Armpit", "Esophagus"], correct: 2 },
    { id: 12, text: "How long should the thermometer remain in the axilla before reading?", options: ["1 minute", "2 minutes", "5 minutes", "10 minutes"], correct: 2 },
    { id: 13, text: "The tympanic method measures temperature from the:", options: ["Nasal cavity", "External auditory canal", "Oral cavity", "Esophagus"], correct: 1 },
    { id: 14, text: "When performing tympanic temperature measurement, the pinna should be pulled:", options: ["Downward and forward", "Upward and backward", "Downward and backward", "Upward and forward"], correct: 1 },
    { id: 15, text: "Shell temperature is less accurate because it:", options: ["Depends on blood pressure", "Changes with environmental temperature", "Depends on heart rate", "Changes with respiration"], correct: 1 },
    { id: 16, text: "To estimate core temperature from an oral measurement, approximately how much should be added?", options: ["0.1°C", "0.3°C", "0.5°C", "0.8°C"], correct: 1 },
    { id: 17, text: "To estimate core temperature from an axillary reading, approximately how much should be added?", options: ["0.3°C", "0.5°C", "0.7°C", "1°C"], correct: 1 },
    { id: 18, text: "Shivering increases body temperature primarily by:", options: ["Increasing sweat production", "Increasing metabolic heat production", "Increasing skin blood flow", "Reducing oxygen consumption"], correct: 1 },
    { id: 19, text: "Covering a person with a blanket when cold helps mainly by:", options: ["Increasing metabolism", "Reducing heat loss", "Increasing sweating", "Increasing blood pressure"], correct: 1 },
    { id: 20, text: "Which method is considered the gold standard for continuous core temperature monitoring?", options: ["Rectal method", "Tympanic method", "Pulmonary artery catheter", "Axillary method"], correct: 2 },
    { id: 21, text: "Rectal temperature may lag behind other core measurements by up to:", options: ["10 minutes", "30 minutes", "1 hour", "2 hours"], correct: 2 },
    { id: 22, text: "During rectal temperature measurement, the probe should typically be inserted about:", options: ["1 cm", "2 cm", "4 cm", "6 cm"], correct: 2 },
    { id: 23, text: "Temperature-sensing Foley catheters measure core temperature from:", options: ["Blood in arteries", "Urine in the bladder", "Peritoneal fluid", "Intestinal contents"], correct: 1 },
    { id: 24, text: "For accurate esophageal temperature monitoring, the probe should be positioned in the:", options: ["Upper third of esophagus", "Middle third of esophagus", "Distal third of esophagus", "Gastroesophageal junction"], correct: 2 }
];

let currentIdx = 0;
let userAnswers = {};
let isReviewMode = false;

window.onload = () => {
    renderApp();
    if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');
};

function renderApp() {
    const q = examData[currentIdx];
    document.getElementById('q-number').innerText = `السؤال ${currentIdx + 1}`;
    document.getElementById('q-text').innerText = q.text;
    
    const list = document.getElementById('options-list');
    list.innerHTML = '';
    
    q.options.forEach((opt, i) => {
        const card = document.createElement('div');
        card.className = `option-card en p-5 rounded-2xl font-bold flex items-center gap-4 cursor-pointer border-2 transition-all dark:bg-slate-700/50 `;
        
        if (isReviewMode) {
            if (i === q.correct) card.classList.add('bg-green-100', 'border-green-500', 'text-green-800');
            else if (userAnswers[currentIdx] === i) card.classList.add('bg-red-100', 'border-red-500', 'text-red-800');
        } else {
            if (userAnswers[currentIdx] === i) card.classList.add('border-blue-900', 'bg-blue-50', 'dark:border-yellow-500');
            card.onclick = () => { userAnswers[currentIdx] = i; renderApp(); updateProgress(); };
        }
        
        card.innerHTML = `<span class="w-8 h-8 rounded-full border-2 flex items-center justify-center">${String.fromCharCode(65+i)}</span> ${opt}`;
        list.appendChild(card);
    });

    const nextBtn = document.getElementById('next-btn');
    if (currentIdx === 24 && !isReviewMode) {
        nextBtn.innerText = "إنهاء الاختبار";
    } else {
        nextBtn.innerText = "التالي";
    }
    renderGrid();
}

function handleNext() {
    if (currentIdx === 24 && !isReviewMode) {
        showResult();
    } else if (currentIdx < 24) {
        currentIdx++;
        renderApp();
    }
}

function prevQuestion() {
    if (currentIdx > 0) {
        currentIdx--;
        renderApp();
    }
}

function showResult() {
    let score = 0;
    examData.forEach((q, i) => { if(userAnswers[i] === q.correct) score++; });
    
    document.getElementById('final-result-text').innerText = `${score} / 25`;
    document.getElementById('result-modal').classList.remove('hidden');
    document.getElementById('result-modal').classList.add('flex');

    if (score >= 12) {
        playCelebration();
    }
}

// دالة الاحتفال المطورة
function playCelebration() {
    // تشغيل الصوت
    const sound = document.getElementById('success-sound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("الصوت بانتظار تفاعل المستخدم"));
    }

    // إطلاق القصاصات بتأثير مكثف
    const end = Date.now() + (3 * 1000);
    const colors = ['#1e3a8a', '#facc15', '#22c55e'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

function renderGrid() {
    const grid = document.getElementById('question-grid');
    grid.innerHTML = '';
    examData.forEach((_, i) => {
        const item = document.createElement('div');
        item.className = `h-10 w-10 flex items-center justify-center rounded-xl text-xs font-bold cursor-pointer border-b-4 ${i === currentIdx ? 'ring-4 ring-blue-400' : ''}`;
        
        if (isReviewMode) {
            item.className += userAnswers[i] === examData[i].correct ? ' bg-green-500 text-white' : ' bg-red-500 text-white';
        } else {
            item.className += userAnswers[i] !== undefined ? ' bg-blue-900 text-white dark:bg-yellow-500 dark:text-blue-900' : ' bg-slate-100 dark:bg-slate-700 text-slate-400';
        }
        
        item.innerText = i + 1;
        item.onclick = () => { currentIdx = i; renderApp(); };
        grid.appendChild(item);
    });
}

function updateProgress() {
    const count = Object.keys(userAnswers).length;
    document.getElementById('progress-bar').style.width = `${(count / 25) * 100}%`;
}

function startReview() {
    isReviewMode = true;
    currentIdx = 0;
    document.getElementById('result-modal').classList.add('hidden');
    document.getElementById('exit-review-btn').classList.remove('hidden');
    document.getElementById('mode-badge').innerText = "وضع المراجعة";
    renderApp();
}

function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

function exitReview() {
    location.reload();
}