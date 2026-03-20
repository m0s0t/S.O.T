const examData = [
    { id: 0, text: "The lateral position with the flank elevated during nephrectomy is commonly referred to as:", options: ["Lithotomy position", "Kidney position", "Fowler’s position", "Trendelenburg position"], correct: 1 },
    { id: 1, text: "Which electrolyte abnormality is classically associated with TURP syndrome?", options: ["Hypernatremia", "Hyperkalemia", "Hyponatremia", "Hypocalcemia"], correct: 2 },
    { id: 2, text: "Cataract surgery is now frequently performed under:", options: ["General anesthesia only", "Spinal anesthesia", "Topical anesthesia", "Epidural anesthesia"], correct: 2 },
    { id: 3, text: "Which drug is listed as decreasing intraocular pressure?", options: ["Ketamine", "Acetazolamide", "Suxamethonium", "Hypercapnia"], correct: 1 },
    { id: 4, text: "Injection of local anesthetic directly into the muscle cone behind the eye describes:", options: ["Sub-Tenon block", "Peribulbar block", "Retrobulbar block", "Topical anesthesia"], correct: 2 },
    { id: 5, text: "During nephrectomy positioning, special attention must be given to:", options: ["Urinary catheter placement", "Patient’s head and airway", "Intravenous cannula size", "Nasogastric tube fixation"], correct: 1 },
    { id: 6, text: "The upper arm in the kidney position should:", options: ["Be fully abducted", "Be hyperextended", "Not be abducted extensively", "Be placed under the body"], correct: 2 },
    { id: 7, text: "Laser destruction of bladder tumors may sometimes be performed without:", options: ["Antibiotics", "Irrigation", "General anesthesia", "Lithotomy position"], correct: 2 },
    { id: 8, text: "Signs of TURP syndrome may appear:", options: ["Only after 24 hours", "Between 15 minutes intraoperatively and up to 12 hours postoperatively", "Only during resection", "Only in recovery room"], correct: 1 },
    { id: 9, text: "Pulmonary edema during TURP syndrome is primarily related to:", options: ["Hypoglycemia", "Fluid absorption", "Air embolism", "Blood transfusion reaction"], correct: 1 },
    { id: 10, text: "Patients with a joint prosthesis undergoing urologic surgery should receive:", options: ["No prophylaxis", "Oral antibiotics only", "Intravenous antibiotics", "Anticoagulation"], correct: 2 },
    { id: 11, text: "The laryngeal mask airway has largely replaced:", options: ["Nasal cannula", "Face mask ventilation", "Endotracheal tube", "Tracheostomy"], correct: 2 },
    { id: 12, text: "Increased IOP after cataract surgery is typically due to:", options: ["Hypertension", "Retained ophthalmic viscosurgical device", "Hypercapnia", "Ketamine administration"], correct: 1 },
    { id: 13, text: "Which factor decreases IOP by lowering venous pressure?", options: ["Head-down tilt", "Hypercapnia", "Head-up tilt", "Hypertension"], correct: 2 },
    { id: 14, text: "The oculocardiac reflex efferent pathway is mediated by the:", options: ["Optic nerve", "Vagus nerve", "Facial nerve", "Trochlear nerve"], correct: 1 },
    { id: 15, text: "Hypo-osmolality in TURP syndrome may directly cause:", options: ["Hyperkalemia", "Massive hemolysis", "Metabolic alkalosis", "Polycythemia"], correct: 1 },
    { id: 16, text: "Hypercapnia increases intraocular pressure primarily by:", options: ["Reducing aqueous humor formation", "Decreasing venous return", "Increasing choroidal blood volume", "Causing systemic hypotension"], correct: 2 },
    { id: 17, text: "Intravenous atropine is more effective than intramuscular administration in preventing the oculocardiac reflex because:", options: ["It has longer duration", "It produces deeper anesthesia", "It acts more rapidly", "It reduces IOP"], correct: 2 },
    { id: 18, text: "Etomidate is particularly useful in elderly ophthalmic patients because it:", options: ["Causes vasodilation", "Increases IOP", "Provides cardiac stability", "Causes prolonged sedation"], correct: 2 },
    { id: 19, text: "Peribulbar block provides greater akinesia compared to Sub-Tenon block because:", options: ["It is topical", "It diffuses into the muscle cone", "It increases IOP", "It avoids scleral contact"], correct: 1 },
    { id: 20, text: "A patient undergoing TURP develops convulsions and cerebral edema postoperatively. The most appropriate pharmacologic therapy includes:", options: ["Isotonic saline only", "Mannitol and hypertonic saline", "Glucose infusion", "Calcium gluconate"], correct: 1 },
    { id: 21, text: "During nephrectomy, pleural perforation occurs. Which intraoperative maneuver helps prevent postoperative complications?", options: ["Reducing FiO2", "Manual lung inflation before pleural closure", "Immediate extubation", "Trendelenburg positioning"], correct: 1 },
    { id: 22, text: "A child undergoing strabismus surgery develops sinus arrest after muscle traction. After stopping traction and ensuring oxygenation, bradycardia persists. The next step is:", options: ["Immediate cardioversion", "IV atropine 10 mcg/kg", "IM glycopyrrolate", "Epinephrine bolus"], correct: 1 },
    { id: 23, text: "During TURP, monitoring heart rate and arterial pressure may fail to detect early hemorrhage because:", options: ["They are unreliable monitors", "They show late signs of bleeding", "They increase with blood loss", "Irrigation fluid masks hypotension"], correct: 1 },
    { id: 24, text: "Retrobulbar block is increasingly considered unsafe primarily due to risk of:", options: ["Hypotension", "Globe perforation and intradural injection", "Hypertension", "Pulmonary embolism"], correct: 1 }
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