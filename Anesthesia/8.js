const examData = [
    { id: 0, text: "Malignant hyperthermia susceptibility is higher in which group of patients?", options: ["Elderly patients with diabetes", "Young patients with musculoskeletal abnormalities", "Patients with hypertension", "Patients with liver disease"], correct: 1 },

    { id: 1, text: "Rheumatoid arthritis is classified as:", options: ["A localized joint disease", "A multisystem disease", "A neurological disorder", "A metabolic bone disorder"], correct: 1 },

    { id: 2, text: "The typical tourniquet pressure for the upper limb is:", options: ["200 mmHg", "220 mmHg", "250 mmHg", "300 mmHg"], correct: 2 },

    { id: 3, text: "Bone cement implantation syndrome is primarily associated with absorption of:", options: ["Nitrous oxide", "Propofol", "Methyl methacrylate monomer", "Sevoflurane"], correct: 2 },

    { id: 4, text: "Deep venous thrombosis is particularly common after:", options: ["Shoulder surgery", "Wrist surgery", "Hip surgery", "Cervical spine surgery"], correct: 2 },

    { id: 5, text: "One pulmonary complication associated with rheumatoid arthritis is:", options: ["Asthma", "Pulmonary fibrosis", "Pneumothorax", "Bronchiectasis"], correct: 1 },

    { id: 6, text: "Atlantooccipital subluxation in rheumatoid arthritis primarily affects the:", options: ["Lumbar spine", "Thoracic spine", "Cervical spine", "Sacrum"], correct: 2 },

    { id: 7, text: "Succinylcholine administration in patients with neurological lesions may cause:", options: ["Hypocalcemia", "Hypoglycemia", "Massive hyperkalemia", "Metabolic alkalosis"], correct: 2 },

    { id: 8, text: "Maximum recommended safe tourniquet time for the lower limb is approximately:", options: ["60 minutes", "90 minutes", "120 minutes", "180 minutes"], correct: 2 },

    { id: 9, text: "Tourniquet pain typically begins:", options: ["Immediately after inflation", "Within 10 minutes", "Around 1 hour after inflation", "After 3 hours"], correct: 2 },

    { id: 10, text: "Cement implantation syndrome may cause:", options: ["Hypertension", "Hyperglycemia", "Hypotension", "Bradycardia without arrhythmia"], correct: 2 },

    { id: 11, text: "A major risk factor for deep venous thrombosis includes:", options: ["Age less than 30 years", "Immobilization for more than 4 days", "Short procedures under 15 minutes", "Hyperthyroidism"], correct: 1 },

    { id: 12, text: "The sitting position during shoulder surgery increases the risk of:", options: ["Pneumothorax", "Venous air embolism", "Hypercapnia", "Laryngospasm"], correct: 1 },

    { id: 13, text: "Regional anesthesia for hip replacement reduces:", options: ["Cardiac output", "Blood loss", "Renal perfusion", "Body temperature"], correct: 1 },

    { id: 14, text: "Addition of intrathecal opioid during spinal anesthesia primarily:", options: ["Shortens surgery time", "Prevents hypotension", "Extends analgesia duration", "Eliminates need for sedation"], correct: 2 },

    { id: 15, text: "Tourniquet inflation may cause significant hemodynamic changes in patients with:", options: ["Hyperthyroidism", "Noncompliant ventricles and diastolic dysfunction", "Asthma", "Anemia"], correct: 1 },

    { id: 16, text: "Rheumatoid arthritis patients on chronic steroid therapy require perioperative steroid replacement to prevent:", options: ["Hyperglycemia", "Adrenal insufficiency", "Airway edema", "Delayed wound healing"], correct: 1 },

    { id: 17, text: "Hypoxia during bone cement implantation syndrome is mainly due to:", options: ["Bronchospasm", "Increased pulmonary shunt", "Atelectasis", "Pneumothorax"], correct: 1 },

    { id: 18, text: "Transient hypotension during femoral cement pressurization correlates primarily with:", options: ["Circulating monomer levels", "Blood volume deficit", "Depth of anesthesia", "Patient age"], correct: 1 },

    { id: 19, text: "A combined spinal-epidural technique is preferred when:", options: ["Surgery lasts less than 1 hour", "Surgery exceeds 3 hours", "Patient refuses regional anesthesia", "Airway is difficult"], correct: 1 },

    { id: 20, text: "A patient with severe aortic stenosis undergoing hip replacement is safest with:", options: ["Pure spinal anesthesia", "Regional anesthesia with heavy sedation", "General anesthesia maintaining sinus rhythm and preload", "No anesthesia"], correct: 2 },

    { id: 21, text: "Tachycardia, hypertension, and diaphoresis occurring 70 minutes after tourniquet inflation most likely indicate:", options: ["Malignant hyperthermia", "Hypovolemia", "Tourniquet pain with sympathetic activation", "Pulmonary embolism"], correct: 2 },

    { id: 22, text: "Sudden cardiovascular collapse during hip surgery in the lateral position with open veins suggests:", options: ["Cement implantation syndrome", "Venous air embolism", "Myocardial infarction", "Anaphylaxis"], correct: 1 },

    { id: 23, text: "Prolonged tourniquet inflation exceeding 2 hours may lead to postoperative muscle weakness due to:", options: ["Hypocalcemia", "Ischemia-induced muscle dysfunction", "Central nervous system injury", "Myasthenia gravis"], correct: 1 },

    { id: 24, text: "In a rheumatoid arthritis patient with limited neck movement and reduced mouth opening, the primary airway concern is:", options: ["Laryngospasm", "Difficult mask ventilation only", "Difficult intubation due to cervical instability", "Excess salivation"], correct: 2 }
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