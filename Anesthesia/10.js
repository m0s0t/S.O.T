const examData = [
    { id: 0, text: "Cerebral perfusion pressure (CPP) is calculated as:", options: ["MAP + ICP", "ICP – MAP", "MAP – ICP", "MAP × ICP"], correct: 2 },
    { id: 1, text: "The normal intracranial pressure (ICP) in adults is:", options: ["15–20 mm Hg", "≤10 mm Hg", "20–25 mm Hg", "30 mm Hg"], correct: 1 },
    { id: 2, text: "In adults, normal total CSF production per day is approximately:", options: ["150 mL", "300 mL", "500 mL", "1000 mL"], correct: 2 },
    { id: 3, text: "The brain normally consumes approximately what percentage of total body oxygen?", options: ["5%", "10%", "15%", "20%"], correct: 3 },
    { id: 4, text: "Intracranial hypertension is defined as sustained ICP above:", options: ["10 mm Hg", "12 mm Hg", "15 mm Hg", "20 mm Hg"], correct: 2 },
    { id: 5, text: "In the cranial vault, brain tissue accounts for approximately:", options: ["60%", "70%", "80%", "90%"], correct: 2 },
    { id: 6, text: "CPP is normally maintained within which range?", options: ["40–60 mm Hg", "60–80 mm Hg", "80–100 mm Hg", "100–120 mm Hg"], correct: 2 },
    { id: 7, text: "In normal individuals, cerebral blood flow (CBF) remains nearly constant between MAP values of:", options: ["40–120 mm Hg", "60–160 mm Hg", "80–180 mm Hg", "100–200 mm Hg"], correct: 1 },
    { id: 8, text: "Which volatile anesthetic produces the greatest maximal depression of cerebral metabolic rate (CMR)?", options: ["Halothane", "Desflurane", "Sevoflurane", "Isoflurane"], correct: 3 },
    { id: 9, text: "Which intravenous anesthetic increases CBF by 50–60%?", options: ["Propofol", "Etomidate", "Ketamine", "Midazolam"], correct: 2 },
    { id: 10, text: "Barbiturates reduce ICP primarily by:", options: ["Increasing CSF production", "Increasing cerebral blood volume", "Decreasing CMR and CBF", "Causing cerebral vasodilation"], correct: 2 },
    { id: 11, text: "Moderate hyperventilation reduces ICP primarily by:", options: ["Increasing MAP", "Causing cerebral vasodilation", "Reducing CBF and CBV", "Increasing CSF absorption"], correct: 2 },
    { id: 12, text: "Mannitol reduces ICP by:", options: ["Increasing intracellular water", "Removing intracellular water from normal brain tissue", "Causing cerebral vasodilation", "Increasing sodium retention"], correct: 1 },
    { id: 13, text: "Sedative premedication in patients with suspected intracranial hypertension is avoided because it may:", options: ["Increase CSF production", "Cause respiratory depression and hypercapnia", "Cause hypertension", "Reduce CBF excessively"], correct: 1 },
    { id: 14, text: "The most common induction agent in neuroanesthesia is:", options: ["Ketamine", "Midazolam", "Propofol", "Thiopental"], correct: 2 },
    { id: 15, text: "Hypocapnia reduces ICP but may worsen cerebral ischemia because it:", options: ["Increases oxygen consumption", "Causes cerebral vasodilation", "Causes cerebral vasoconstriction", "Increases CSF production"], correct: 2 },
    { id: 16, text: "Nitrous oxide should be avoided in venous air embolism because it:", options: ["Decreases pulmonary artery pressure", "Shrinks intravascular air bubbles", "Diffuses into air bubbles and enlarges them", "Reduces cardiac output directly"], correct: 2 },
    { id: 17, text: "In patients with reduced intracranial compliance, volatile anesthetics may elevate ICP primarily due to:", options: ["Decreased CMR", "Expansion of cerebral blood volume", "Increased CSF absorption", "Decreased MAP"], correct: 1 },
    { id: 18, text: "Head elevation of 15–30° during craniotomy primarily facilitates:", options: ["Increased MAP", "Venous and CSF drainage", "Increased CBF", "Increased ICP"], correct: 1 },
    { id: 19, text: "Hyperglycemia worsens cerebral ischemic injury because it:", options: ["Decreases ATP production", "Promotes lactic acidosis and neuronal injury", "Reduces CBF", "Increases autoregulation"], correct: 1 },
    { id: 20, text: "A patient with ICP of 35 mm Hg develops decreased CBF. The most likely mechanism is:", options: ["Increased CPP", "Reduced CPP due to elevated ICP", "Increased autoregulation", "Increased CSF absorption"], correct: 1 },
    { id: 21, text: "During induction, severe hypertension may precipitate herniation primarily by:", options: ["Reducing cerebral oxygen consumption", "Increasing CBV and ICP", "Increasing CSF absorption", "Causing hypocapnia"], correct: 1 },
    { id: 22, text: "A sitting craniotomy patient develops hypotension and elevated pulmonary artery pressure. The most likely diagnosis is:", options: ["Pulmonary edema", "Myocardial infarction", "Venous air embolism", "Tension pneumothorax"], correct: 2 },
    { id: 23, text: "A patient with intracranial aneurysm requires osmotic therapy before cranium opening. Mannitol is avoided because it may:", options: ["Cause hypotension", "Increase CSF absorption", "Promote bleeding", "Increase oxygen consumption"], correct: 2 },
    { id: 24, text: "A patient under light anesthesia bucks during emergence after craniotomy. The most serious potential consequence is:", options: ["Hypoglycemia", "Intracranial hemorrhage", "Hypernatremia", "CSF overproduction"], correct: 1 }
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
function showResult() {
    let score = 0;
    examData.forEach((q, i) => { if(userAnswers[i] === q.correct) score++; });
    saveResultLocally("ICU", "10", score, examData.length);
    document.getElementById('final-result-text').innerText = `${score} / 25`;
    document.getElementById('result-modal').classList.remove('hidden');
    document.getElementById('result-modal').classList.add('flex');

    // ✅ إضافة الحفظ هنا فقط
    saveResultLocally("Cardiology", "Lecture 3", score, 25);

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