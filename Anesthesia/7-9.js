const examData = [
    { id: 0, text: "What is the normal range of intraocular pressure (IOP)?", options: ["5–10 mmHg", "10–20 mmHg", "20–30 mmHg", "25–35 mmHg"], correct: 1 },
    { id: 1, text: "In which position is nephrectomy commonly performed?", options: ["Supine position", "Lithotomy position", "Lateral position with flank raised", "Prone position"], correct: 2 },
    { id: 2, text: "Which irrigating solution is commonly used during TURP?", options: ["Normal saline", "Lactated Ringer’s", "Glycine", "Dextrose 5%"], correct: 2 },
    { id: 3, text: "Which nerve forms the afferent limb of the oculocardiac reflex?", options: ["Facial nerve", "Trigeminal nerve (V1)", "Glossopharyngeal nerve", "Optic nerve"], correct: 1 },
    { id: 4, text: "Which anesthetic drug transiently increases intraocular pressure?", options: ["Propofol", "Etomidate", "Suxamethonium", "Mannitol"], correct: 2 },
    { id: 5, text: "“Breaking the table” during nephrectomy primarily serves to:", options: ["Improve ventilation", "Reduce blood loss", "Increase space between ribs and pelvis", "Prevent nerve injury"], correct: 2 },
    { id: 6, text: "A potential intraoperative complication of nephrectomy is:", options: ["Cardiac tamponade", "Pneumothorax", "Cerebral edema", "Retinal detachment"], correct: 1 },
    { id: 7, text: "The lithotomy position is commonly used for:", options: ["Nephrectomy", "Cystectomy", "Bladder tumor resection", "Renal transplantation"], correct: 2 },
    { id: 8, text: "Obturator nerve stimulation during bladder tumor diathermy may cause:", options: ["Bradycardia", "Severe hypotension", "Leg jerking", "Pulmonary edema"], correct: 2 },
    { id: 9, text: "A large-gauge cannula is recommended during bladder tumor resection because of:", options: ["Risk of air embolism", "Rapid blood loss", "Need for contrast injection", "Long operative time"], correct: 1 },
    { id: 10, text: "One suggested method to estimate blood loss during TURP is:", options: ["Measuring urine output", "Monitoring respiratory rate", "Hemoglobin concentration of irrigation fluid", "Central venous pressure"], correct: 2 },
    { id: 11, text: "TURP syndrome is primarily caused by:", options: ["Surgical trauma", "Absorption of hypotonic irrigating fluid", "Excessive anesthesia depth", "Infection"], correct: 1 },
    { id: 12, text: "Hyponatremia in TURP syndrome results from:", options: ["Hemorrhage", "Hyperglycemia", "Hypo-osmolality from fluid absorption", "Renal artery obstruction"], correct: 2 },
    { id: 13, text: "Patients with urinary tract infection undergoing urologic surgery should receive:", options: ["Oral steroids", "Intravenous antibiotics", "Anticoagulation", "Antihistamines"], correct: 1 },
    { id: 14, text: "Which anesthetic agent is widely used in ophthalmic surgery due to rapid recovery and reduced postoperative nausea?", options: ["Ketamine", "Thiopental", "Propofol", "Halothane"], correct: 2 },
    { id: 15, text: "Massive hemolysis during TURP syndrome may lead to acute renal failure due to:", options: ["Hypokalemia", "Hemoglobinemia and hypotension", "Hyperglycemia", "Hypercapnia"], correct: 1 },
    { id: 16, text: "Hyperventilation during ophthalmic surgery improves surgical conditions by:", options: ["Increasing IOP", "Reducing PaCO2", "Increasing venous pressure", "Enhancing choroidal blood flow"], correct: 1 },
    { id: 17, text: "Sub-Tenon block may be unsatisfactory in vitreoretinal surgery because:", options: ["It increases IOP significantly", "It provides inadequate akinesia", "It causes globe perforation", "It causes systemic toxicity"], correct: 1 },
    { id: 18, text: "The oculocardiac reflex may present with nausea in:", options: ["Sedated patients", "Paralyzed patients", "Awake patients", "Mechanically ventilated patients"], correct: 2 },
    { id: 19, text: "Raised venous pressure (e.g., head-down tilt) affects IOP by:", options: ["Decreasing it", "Not affecting it", "Increasing it", "Causing retinal ischemia"], correct: 2 },
    { id: 20, text: "Fifteen minutes into TURP, a patient develops confusion, bradycardia, hypertension, and visual disturbance. The most likely diagnosis is:", options: ["Hypoglycemia", "Pulmonary embolism", "TURP syndrome", "Myocardial infarction"], correct: 2 },
    { id: 21, text: "During bladder tumor resection with diathermy, sudden violent leg movement occurs. The most appropriate anesthetic intervention is:", options: ["Increase opioid dose", "Deepen sedation only", "Administer muscle relaxant and ventilate", "Stop IV fluids"], correct: 2 },
    { id: 22, text: "During strabismus surgery in a child, bradycardia develops after traction on extraocular muscles. Initial management should be:", options: ["Immediate defibrillation", "Administer atropine immediately", "Inform surgeon and stop traction", "Start chest compressions"], correct: 2 },
    { id: 23, text: "A patient undergoing nephrectomy develops intraoperative pneumothorax. Prevention of postoperative complications includes:", options: ["Immediate extubation", "Manual lung inflation before pleural closure", "Fluid restriction", "Hyperventilation"], correct: 1 },
    { id: 24, text: "An elderly patient with cardiac instability requires ophthalmic surgery under GA. The most appropriate induction agent is:", options: ["Ketamine", "Thiopental", "Etomidate", "Suxamethonium"], correct: 2 }
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