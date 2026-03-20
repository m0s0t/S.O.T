const examData = [
    { id: 0, text: "Most cerebral oxygen consumption is primarily used to:", options: ["Maintain CSF production", "Generate ATP for neuronal electrical activity", "Support glial proliferation", "Maintain venous drainage"], correct: 1 },
    { id: 1, text: "Loss of consciousness typically occurs after interruption of cerebral perfusion within:", options: ["2 seconds", "5 seconds", "10 seconds", "30 seconds"], correct: 2 },
    { id: 2, text: "The total cerebrospinal fluid (CSF) volume in adults is approximately:", options: ["50 mL", "100 mL", "150 mL", "500 mL"], correct: 2 },
    { id: 3, text: "Mean arterial pressures above 150–160 mm Hg may result in:", options: ["Improved autoregulation", "Blood–brain barrier disruption", "Reduced cerebral edema", "Decreased cerebral blood flow"], correct: 1 },
    { id: 4, text: "Cerebrospinal fluid primarily functions to:", options: ["Increase cerebral metabolism", "Cushion the central nervous system", "Increase intracranial pressure", "Enhance neuronal firing"], correct: 1 },
    { id: 5, text: "Sevoflurane is characterized by:", options: ["Greatest depression of CMR", "Most significant cerebral vasodilation", "Least cerebral vasodilation among volatiles", "Complete loss of autoregulation"], correct: 2 },
    { id: 6, text: "Isoflurane favorably affects CSF dynamics because it:", options: ["Increases CSF formation", "Blocks CSF absorption", "Facilitates CSF absorption", "Eliminates CSF production"], correct: 2 },
    { id: 7, text: "Cerebral autoregulation and CO2 responsiveness are preserved with:", options: ["Only barbiturates", "Only propofol", "All intravenous anesthetic agents", "All except ketamine"], correct: 2 },
    { id: 8, text: "Midazolam is preferred in neuroanesthesia mainly due to its:", options: ["Long half-life", "Short half-life", "Cerebral vasodilatory effect", "ICP-increasing effect"], correct: 1 },
    { id: 9, text: "Intravenous lidocaine affects cerebral physiology by:", options: ["Increasing CMR", "Increasing CBF", "Decreasing CMR, CBF, and ICP", "Increasing CSF production"], correct: 2 },
    { id: 10, text: "Hypothermia is suggested as a neuroprotective strategy during:", options: ["Hypertension", "Focal and global ischemia", "CSF overproduction", "Hypernatremia"], correct: 1 },
    { id: 11, text: "The brain is especially vulnerable to ischemia because it depends primarily on:", options: ["Anaerobic glycolysis", "Aerobic glucose metabolism", "Fat metabolism", "Ketone metabolism"], correct: 1 },
    { id: 12, text: "Hypercarbia during focal cerebral ischemia may worsen injury by causing:", options: ["Cerebral vasoconstriction", "Steal phenomenon", "Improved oxygen delivery", "Reduced intracellular acidosis"], correct: 1 },
    { id: 13, text: "A common clinical sign of intracranial hypertension is:", options: ["Polyuria", "Papilledema", "Hypothermia", "Peripheral edema"], correct: 1 },
    { id: 14, text: "Imaging evidence of significant mass effect includes:", options: ["Midline shift greater than 0.5 cm", "Thickened skull bones", "Increased scalp edema", "Reduced venous pressure"], correct: 0 },
    { id: 15, text: "When ICP exceeds 30 mm Hg, cerebral blood flow decreases primarily because:", options: ["MAP increases", "CPP is reduced", "CSF production increases", "Autoregulation improves"], correct: 1 },
    { id: 16, text: "High mean airway pressures during ventilation may increase ICP by:", options: ["Reducing PaCO2", "Increasing central venous pressure", "Increasing MAP", "Enhancing CSF absorption"], correct: 1 },
    { id: 17, text: "Lung-protective ventilation during craniotomy recommends tidal volumes of:", options: ["10 mL/kg", "8 mL/kg", "≤6 mL/kg", "12 mL/kg"], correct: 2 },
    { id: 18, text: "Excessive hypotension during induction is dangerous because it:", options: ["Raises ICP directly", "Reduces CPP", "Increases CBF excessively", "Increases CSF production"], correct: 1 },
    { id: 19, text: "Small amounts of venous air embolism are often tolerated because the air:", options: ["Enters systemic arteries", "Is absorbed in pulmonary circulation", "Is metabolized in the liver", "Instantly dissolves in plasma"], correct: 1 },
    { id: 20, text: "Aggressive hyperventilation to PaCO2 of 25 mm Hg may result in:", options: ["Cerebral vasodilation", "Improved oxygenation", "Cerebral ischemia due to vasoconstriction", "Increased ICP"], correct: 2 },
    { id: 21, text: "Coughing or straining during induction is avoided because it can:", options: ["Decrease MAP", "Suddenly increase ICP", "Reduce CBF", "Lower CSF production"], correct: 1 },
    { id: 22, text: "Nitrous oxide worsens venous air embolism by:", options: ["Reducing pulmonary pressure", "Shrinking air bubbles", "Diffusing into and enlarging air bubbles", "Improving right ventricular function"], correct: 2 },
    { id: 23, text: "Preoperative corticosteroid therapy requires glucose monitoring because steroids may cause:", options: ["Hypoglycemia", "Hyperglycemia", "Hyponatremia", "Hypocalcemia"], correct: 1 },
    { id: 24, text: "In venous air embolism, cardiac output decreases primarily due to:", options: ["Reduced preload", "Increased right ventricular afterload", "Systemic vasodilation", "Direct myocardial infarction"], correct: 1 }
];
const totalQuestions = examData.length; // عدد الأسئلة الفعلي من examData
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
    } 
    renderGrid();
}

function handleNext() {
    if (currentIdx === totalQuestions - 1 && !isReviewMode) {
        showResult();
    } else if (currentIdx < totalQuestions - 1) {
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
    saveResultLocally("ANS", "10-2", score, examData.length);
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
    document.getElementById('progress-bar').style.width = `${(count / totalQuestions) * 100}%`;
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