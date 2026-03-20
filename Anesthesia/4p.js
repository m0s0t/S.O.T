// 1. البيانات (الـ 25 سؤال)
const examData = [
    { id: 0, text: "What does arterial blood pressure refer to?", options: ["Pressure inside capillaries", "Pressure within large arteries of systemic circulation", "Pressure in pulmonary veins", "Pressure within cardiac chambers"], correct: 1 },
    { id: 1, text: "Blood pressure is commonly measured in which unit?", options: ["Pascal (Pa)", "Centimeters of water (cmH2O)", "Millimeters of mercury (mmHg)", "Newtons (N)"], correct: 2 },
    { id: 2, text: "Systolic blood pressure represents:", options: ["Pressure during ventricular relaxation", "Maximum arterial pressure during heart contraction", "Minimum arterial pressure in arteries", "Average pressure in veins"], correct: 1 },
    { id: 3, text: "Diastolic blood pressure represents:", options: ["Maximum arterial pressure", "Pressure during ventricular contraction", "Lowest arterial pressure during cardiac relaxation", "Pressure inside capillaries"], correct: 2 },
    { id: 4, text: "How many main methods exist for arterial blood pressure measurement?", options: ["One", "Two", "Three", "Four"], correct: 1 },
    { id: 5, text: "Mean arterial pressure (MAP) is calculated using which formula?", options: ["Systolic + Diastolic / 2", "Diastolic + 1/3 (Systolic - Diastolic)", "Systolic - Diastolic", "Diastolic x 2"], correct: 1 },
    { id: 6, text: "The 'whooshing' sound heard during blood pressure measurement represents:", options: ["Venous flow", "Laminar arterial flow", "Turbulent arterial flow", "Capillary pulsation"], correct: 2 },
    { id: 7, text: "The first Korotkoff sound corresponds to:", options: ["Mean arterial pressure", "Diastolic pressure", "Systolic pressure", "Pulse pressure"], correct: 2 },
    { id: 8, text: "Korotkoff sounds disappear when cuff pressure:", options: ["Equals systolic pressure", "Is above systolic pressure", "Falls below diastolic pressure", "Equals mean arterial pressure"], correct: 2 },
    { id: 9, text: "The recommended bladder width of the cuff should be approximately:", options: ["20% of limb circumference", "30% of limb circumference", "40% of limb circumference", "60% of limb circumference"], correct: 2 },
    { id: 10, text: "The cuff used for blood pressure measurement should cover:", options: ["One-third of the upper arm", "Half of the upper arm", "Two-thirds of the upper arm", "Entire arm"], correct: 2 },
    { id: 11, text: "If the cuff is too small, the blood pressure reading will:", options: ["Be normal", "Be underestimated", "Be overestimated", "Not change"], correct: 2 },
    { id: 12, text: "Which condition may reduce the accuracy of blood pressure measurement?", options: ["Asthma", "Atrial fibrillation", "Pneumonia", "Anemia"], correct: 1 },
    { id: 13, text: "Frequent cuff inflation may cause which complication?", options: ["Radial artery thrombosis", "Ulnar nerve palsy", "Carpal tunnel syndrome", "Venous thrombosis"], correct: 1 },
    { id: 14, text: "Digital blood pressure cuffs may be placed on:", options: ["Neck only", "Arm, wrist, or finger", "Chest wall", "Thigh only"], correct: 1 },
    { id: 15, text: "Why is rapid inflation but slow cuff deflation recommended?", options: ["Prevent arterial thrombosis", "Avoid venous congestion and allow pulse detection", "Reduce measurement time", "Prevent nerve injury"], correct: 1 },
    { id: 16, text: "In a noisy environment where auscultation is difficult, systolic blood pressure may be estimated by:", options: ["Measuring capillary refill", "Palpating the radial pulse during cuff deflation", "Observing skin color", "Using ECG monitoring"], correct: 1 },
    { id: 17, text: "Phase IV Korotkoff sound is clinically used when:", options: ["Phase V is not detectable", "Systolic pressure cannot be measured", "Arrhythmia is present", "Pulse pressure is narrow"], correct: 0 },
    { id: 18, text: "Which artery is the preferred site for arterial cannulation?", options: ["Brachial artery", "Radial artery", "Dorsalis pedis artery", "Axillary artery"], correct: 1 },
    { id: 19, text: "Why should the brachial artery generally be avoided for cannulation?", options: ["High infection risk", "Difficult anatomical access", "Risk of distal hand ischemia", "Poor pressure transmission"], correct: 2 },
    { id: 20, text: "A patient has a BP of 150/90 mmHg. What is the approximate mean arterial pressure?", options: ["100 mmHg", "105 mmHg", "110 mmHg", "115 mmHg"], correct: 2 },
    { id: 21, text: "During sphygmomanometry, no sound is heard when cuff pressure exceeds systolic pressure because:", options: ["Blood flow becomes turbulent", "Blood flow is completely occluded", "Venous flow increases", "Capillary flow increases"], correct: 1 },
    { id: 22, text: "In invasive arterial pressure monitoring, the pressure wave is transmitted to the transducer via:", options: ["Air-filled tubing", "Electrical cable", "Continuous column of saline", "Carbon dioxide tubing"], correct: 2 },
    { id: 23, text: "The saline bag in an arterial flushing system is typically pressurized to:", options: ["100 mmHg", "200 mmHg", "300 mmHg", "400 mmHg"], correct: 2 },
    { id: 24, text: "Which clinical situation particularly benefits from invasive arterial pressure monitoring?", options: ["Mild hypertension screening", "Routine outpatient examination", "Patients with rapidly changing blood pressure during surgery", "Healthy athletes"], correct: 2 }
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