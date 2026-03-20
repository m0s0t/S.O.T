const examData = [
    { id: 0, text: "Rheumatoid arthritis may cause limitation of mouth opening due to involvement of the:", options: ["Sternoclavicular joint", "Temporomandibular joint", "Acromioclavicular joint", "Costochondral joint"], correct: 1 },

    { id: 1, text: "The typical tourniquet pressure for the lower limb is:", options: ["200 mmHg", "250 mmHg", "280 mmHg", "300 mmHg"], correct: 3 },

    { id: 2, text: "One hematological manifestation of rheumatoid arthritis mentioned in the document is:", options: ["Polycythemia", "Leukopenia", "Anemia", "Hemophilia"], correct: 2 },

    { id: 3, text: "Cement implantation syndrome may lead to:", options: ["Increased cardiac output", "Pulmonary hypertension", "Hypothermia", "Metabolic alkalosis"], correct: 1 },

    { id: 4, text: "Procedures lasting more than how many minutes increase the risk of deep venous thrombosis?", options: ["15 minutes", "20 minutes", "30 minutes", "45 minutes"], correct: 2 },

    { id: 5, text: "Chronic steroid therapy in rheumatoid arthritis patients may result in:", options: ["Thyroid suppression", "Adrenocortical impairment", "Renal failure", "Hyperparathyroidism"], correct: 1 },

    { id: 6, text: "Tourniquet inflation causes hemodynamic changes primarily due to:", options: ["Blood loss", "Peripheral vasodilation", "Rapid shift of blood into central circulation", "Decreased venous return"], correct: 2 },

    { id: 7, text: "One arrhythmia associated with bone cement implantation syndrome is:", options: ["Atrial fibrillation only", "Ventricular tachycardia exclusively", "Heart block", "Wolff-Parkinson-White syndrome"], correct: 2 },

    { id: 8, text: "Lower extremity fractures increase the risk of:", options: ["Malignant hyperthermia", "Venous air embolism", "Deep venous thrombosis", "Hypocalcemia"], correct: 2 },

    { id: 9, text: "The prone position during spinal surgery is associated with risk of:", options: ["Laryngospasm", "Venous air embolism", "Bronchospasm", "Hyperkalemia"], correct: 1 },

    { id: 10, text: "Regional anesthesia reduces the incidence of:", options: ["Myocardial infarction", "Pulmonary embolism", "Hyperglycemia", "Stroke"], correct: 1 },

    { id: 11, text: "Target-Controlled Infusion (TCI) propofol is particularly useful during:", options: ["Prone positioning", "Supine awake procedures", "Lateral positioning", "Sitting neurosurgery"], correct: 2 },

    { id: 12, text: "In hip replacement, maintaining adequate blood pressure in elderly patients with vascular disease is important because:", options: ["They tolerate hypotension well", "Hypotension may cause organ hypoperfusion", "It reduces bleeding", "It shortens surgery time"], correct: 1 },

    { id: 13, text: "Intraoperative antibiotic prophylaxis during hip replacement is:", options: ["Optional", "Not required", "Required", "Contraindicated"], correct: 2 },

    { id: 14, text: "Urinary catheter insertion during hip replacement mainly helps monitor:", options: ["Blood glucose", "Fluid balance", "Electrolytes", "Oxygen saturation"], correct: 1 },

    { id: 15, text: "Why should tourniquets on more than one limb not be deflated simultaneously?", options: ["Risk of hyperthermia", "Sudden systemic metabolic load and hemodynamic instability", "Increased surgical bleeding", "Airway obstruction"], correct: 1 },

    { id: 16, text: "Cement pressurization causes hypotension primarily due to:", options: ["Severe hemorrhage", "Vasodilation and myocardial depression", "Increased preload", "Bronchospasm"], correct: 1 },

    { id: 17, text: "Creating a vent hole in the distal femur during cementing helps by:", options: ["Increasing oxygenation", "Reducing intramedullary pressure", "Preventing arrhythmias", "Enhancing cement fixation"], correct: 1 },

    { id: 18, text: "Long operations under regional anesthesia may result in discomfort mainly due to:", options: ["Drug toxicity", "Postural strain", "Hypercapnia", "Hypoglycemia"], correct: 1 },

    { id: 19, text: "In fixed cardiac output states such as aortic stenosis, anesthetic management should prioritize:", options: ["Controlled hypotension", "Tachycardia", "Maintenance of sinus rhythm and intravascular volume", "Deep spinal blockade"], correct: 2 },

    { id: 20, text: "A patient undergoing hip replacement develops hypoxia, hypotension, pulmonary hypertension, and decreased cardiac output shortly after cement insertion. The most likely mechanism is:", options: ["Fat embolism", "Anaphylaxis", "Cement implantation syndrome with pulmonary microthrombi", "Tension pneumothorax"], correct: 2 },

    { id: 21, text: "A pediatric patient undergoing lower limb surgery with prolonged tourniquet use develops elevated body temperature. The most likely contributing factor is:", options: ["Sepsis", "Tourniquet-associated temperature increase", "Malignant hyperthermia", "Thyroid storm"], correct: 1 },

    { id: 22, text: "A patient with rheumatoid arthritis and cervical spine instability requires hip replacement. The safest airway strategy should primarily account for:", options: ["Rapid sequence induction only", "Avoidance of neck hyperextension", "High-dose muscle relaxants", "Deep extubation"], correct: 1 },

    { id: 23, text: "A patient immobilized for 5 days following a lower limb fracture is at highest risk of:", options: ["Hyperkalemia", "Deep venous thrombosis", "Malignant hyperthermia", "Adrenal crisis"], correct: 1 },

    { id: 24, text: "During spinal anesthesia for a 3.5-hour complex hip replacement, the most appropriate modification is:", options: ["Increase local anesthetic dose only", "Convert to local anesthesia", "Use combined spinal-epidural technique", "Avoid sedation"], correct: 2 }
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
    saveResultLocally("ANS", "8-2", score, examData.length);
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