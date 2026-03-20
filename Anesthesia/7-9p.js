// 1. البيانات (الـ 25 سؤال)
const examData = [
    { id: 0, text: "Central venous pressure (CVP) refers to:", options: ["Pressure in the pulmonary artery", "Pressure in the thoracic vena cava near the right atrium", "Pressure in the left atrium", "Pressure in systemic capillaries"], correct: 1 },
    { id: 1, text: "Central venous pressure is considered a good approximation of:", options: ["Left ventricular pressure", "Pulmonary artery pressure", "Right atrial pressure", "Systemic arterial pressure"], correct: 2 },
    { id: 2, text: "A central venous catheter is typically inserted into which type of vessel?", options: ["Small superficial veins", "Large central veins", "Arteries of the arm", "Capillaries"], correct: 1 },
    { id: 3, text: "The ideal position of the catheter tip for CVP monitoring is:", options: ["Upper superior vena cava", "Right ventricle", "Lower third of the superior vena cava", "Pulmonary artery"], correct: 2 },
    { id: 4, text: "Which of the following conditions increases CVP?", options: ["Hypovolemia", "Deep inhalation", "Heart failure", "Distributive shock"], correct: 2 },
    { id: 5, text: "Which condition decreases central venous pressure?", options: ["Pulmonary embolism", "Hypervolemia", "Deep inhalation", "Cardiac tamponade"], correct: 2 },
    { id: 6, text: "Which respiratory action may increase CVP?", options: ["Deep inhalation", "Forced exhalation", "Normal breathing", "Breath holding"], correct: 1 },
    { id: 7, text: "Mechanical ventilation increases CVP mainly due to:", options: ["Increased venous return", "Positive end-expiratory pressure (PEEP)", "Reduced intrathoracic pressure", "Decreased blood volume"], correct: 1 },
    { id: 8, text: "Which shock type is associated with decreased CVP?", options: ["Cardiogenic shock", "Distributive shock", "Obstructive shock", "Septic embolism"], correct: 1 },
    { id: 9, text: "Central venous catheters are primarily inserted through which veins?", options: ["Internal jugular, subclavian, or femoral veins", "Radial or ulnar veins", "Digital veins", "Temporal veins"], correct: 0 },
    { id: 10, text: "Which patient position facilitates subclavian or jugular catheter insertion?", options: ["Supine position", "Trendelenburg position", "Sitting position", "Prone position"], correct: 1 },
    { id: 11, text: "After central venous catheter placement, which investigation is essential?", options: ["ECG monitoring", "Chest X-ray", "Ultrasound of the abdomen", "CT scan"], correct: 1 },
    { id: 12, text: "CVP can be measured using which methods?", options: ["Only electronic monitoring", "Manometer or transducer", "Only ultrasound", "Pulse oximetry"], correct: 1 },
    { id: 13, text: "During CVP measurement, the zero reference level corresponds to:", options: ["The left atrium", "The right atrium", "The pulmonary artery", "The inferior vena cava"], correct: 1 },
    { id: 14, text: "The right atrial level for zeroing CVP corresponds approximately to:", options: ["2nd intercostal space midclavicular line", "4th intercostal space mid-axillary line", "5th intercostal space parasternal line", "3rd intercostal space anterior axillary line"], correct: 1 },
    { id: 15, text: "Normal CVP measured with a manometer is:", options: ["1–3 cmH2O", "4–12 cmH2O", "15–20 cmH2O", "20–30 cmH2O"], correct: 1 },
    { id: 16, text: "Normal CVP measured using a transducer is:", options: ["1–2 mmHg", "2–8 mmHg", "10–15 mmHg", "15–20 mmHg"], correct: 1 },
    { id: 17, text: "Why are serial CVP measurements preferred over single readings?", options: ["They prevent infection", "They show hemodynamic trends", "They reduce catheter blockage", "They shorten procedure time"], correct: 1 },
    { id: 18, text: "During manual CVP measurement, the manometer scale measures pressure in:", options: ["mmHg", "kPa", "cmH2O", "dynes"], correct: 2 },
    { id: 19, text: "The fluid level in the manometer column falls until it equals:", options: ["Atmospheric pressure", "Arterial pressure", "Central venous pressure", "Capillary pressure"], correct: 2 },
    { id: 20, text: "Why must air bubbles be avoided in CVP tubing?", options: ["They damage the catheter", "They may cause air embolism", "They reduce pressure readings", "They stop fluid flow"], correct: 1 },
    { id: 21, text: "Which condition may elevate CVP due to impaired cardiac filling?", options: ["Hypovolemia", "Cardiac tamponade", "Deep inhalation", "Distributive shock"], correct: 1 },
    { id: 22, text: "Pulmonary embolism increases CVP primarily because it:", options: ["Increases systemic blood pressure", "Obstructs right ventricular outflow", "Reduces venous return", "Increases oxygen saturation"], correct: 1 },
    { id: 23, text: "Why does the CVP reading fluctuate during respiration?", options: ["Changes in blood viscosity", "Intrathoracic pressure changes", "Catheter movement", "Venous valve closure"], correct: 1 },
    { id: 24, text: "If the transducer is placed above the right atrium during CVP measurement, the reading will likely be:", options: ["Falsely high", "Falsely low", "Accurate", "Random"], correct: 1 }
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
function saveResultLocally(subjectName, lectureTitle, score, total) {
    let history = JSON.parse(localStorage.getItem("examHistory")) || [];

    history.push({
        subject: subjectName,
        lecture: lectureTitle,
        score: score,
        total: total,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("examHistory", JSON.stringify(history));
}