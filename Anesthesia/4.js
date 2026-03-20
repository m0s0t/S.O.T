const examData = [
    { id: 0, text: "Ageing is primarily characterized by which cellular process?", options: ["Cellular hypertrophy", "Progressive cell loss", "Increased mitosis", "Stem cell proliferation"], correct: 1 },
    { id: 1, text: "Functional reserve is best defined as:", options: ["Maximum organ output at rest", "Difference between basal and maximal organ function", "Cardiac output during anesthesia", "Renal clearance at baseline"], correct: 1 },
    { id: 2, text: "In elderly patients, total body water is:", options: ["Increased", "Unchanged", "Decreased", "Doubled"], correct: 2 },
    { id: 3, text: "Minimum Alveolar Concentration (MAC) with increasing age:", options: ["Increases steadily", "Remains constant", "Decreases steadily", "Becomes unpredictable"], correct: 2 },
    { id: 4, text: "Basal metabolic rate in elderly individuals is generally:", options: ["Elevated", "Decreased", "Unchanged", "Variable but usually high"], correct: 1 },
    { id: 5, text: "Reduced physiological reserve in elderly patients leads to:", options: ["Reduced perioperative risk", "Increased morbidity and mortality", "Improved recovery", "Increased cardiac output"], correct: 1 },
    { id: 6, text: "Ischaemic heart disease in elderly patients results in a net reduction of:", options: ["Heart rate", "Cardiac output", "Blood viscosity", "Pulmonary compliance"], correct: 1 },
    { id: 7, text: "In developing countries, valvular heart disease in the elderly is commonly secondary to:", options: ["Hypertension", "Rheumatic fever", "Diabetes mellitus", "Hyperlipidaemia"], correct: 1 },
    { id: 8, text: "Reduced baroreceptor sensitivity in elderly patients causes:", options: ["Enhanced tachycardia", "Blunted response to hypovolaemia", "Increased autonomic activity", "Improved stress response"], correct: 1 },
    { id: 9, text: "Preoperative ventricular rate control in atrial fibrillation should ideally be less than:", options: ["120/min", "110/min", "100/min", "80/min"], correct: 2 },
    { id: 10, text: "Pulmonary elasticity in elderly patients is:", options: ["Increased", "Decreased", "Unchanged", "Hyperactive"], correct: 1 },
    { id: 11, text: "Closing capacity exceeding functional residual capacity results primarily in:", options: ["Improved oxygenation", "Airway collapse", "Increased tidal volume", "Hyperventilation"], correct: 1 },
    { id: 12, text: "Glomerular filtration rate in elderly patients is typically:", options: ["Increased", "Unchanged", "Reduced", "Doubled"], correct: 2 },
    { id: 13, text: "Reduced albumin levels in elderly patients lead to:", options: ["Decreased free drug fraction", "Increased protein binding", "Increased free drug fraction", "Reduced drug toxicity"], correct: 2 },
    { id: 14, text: "An ECG is required preoperatively for:", options: ["Selected high-risk patients only", "All elderly patients", "Only cardiac patients", "Emergency cases only"], correct: 1 },
    { id: 15, text: "Pseudocholinesterase levels in older men are:", options: ["Increased", "Unchanged", "Decreased", "Absent"], correct: 2 },
    { id: 16, text: "Increased arm-brain circulation time during induction requires:", options: ["Rapid bolus dosing", "Higher induction doses", "Slow titration of drugs", "Avoidance of IV agents"], correct: 2 },
    { id: 17, text: "Excess perioperative fluid administration in elderly patients most commonly leads to:", options: ["Renal stones", "Pulmonary oedema", "Hyperglycaemia", "Hypertension only"], correct: 1 },
    { id: 18, text: "Age-related CNS decline predisposes elderly patients to:", options: ["Seizures", "Delirium and POCD", "Increased reflexes", "Hyperthermia"], correct: 1 },
    { id: 19, text: "Early mobilization after abdominal surgery helps prevent:", options: ["Renal failure", "Atelectasis", "Arrhythmia", "Hyperglycaemia"], correct: 1 },
    { id: 20, text: "An elderly patient receiving propofol induction develops hypotension primarily due to:", options: ["Increased hepatic clearance", "Reduced physiological reserve and increased sensitivity", "Increased total body water", "Elevated MAC"], correct: 1 },
    { id: 21, text: "Dehydration in elderly patients may rapidly precipitate:", options: ["Pulmonary embolism", "Renal failure", "Hepatic cirrhosis", "Myocardial hypertrophy"], correct: 1 },
    { id: 22, text: "Postoperative oxygen therapy is recommended particularly after:", options: ["Dermatological surgery", "Abdominal or thoracic surgery", "Minor dental procedures", "Ophthalmic surgery"], correct: 1 },
    { id: 23, text: "NSAIDs should be used cautiously in elderly patients due to increased risk of:", options: ["Hepatic necrosis only", "Renal impairment and peptic ulceration", "Hyperglycaemia", "Respiratory depression"], correct: 1 },
    { id: 24, text: "Avoidance of benzodiazepines in elderly patients reduces the risk of:", options: ["Hypertension", "Delirium", "Bradycardia", "Pulmonary oedema"], correct: 1 }
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