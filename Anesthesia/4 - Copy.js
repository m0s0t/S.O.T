const examData = [
    { id: 0, text: "Which physiological similarity between elderly patients and infants increases perioperative risk?", options: ["Increased renal clearance", "Reduced heart rate response to stress", "Increased lung elasticity", "Enhanced thermoregulation"], correct: 1 },
    { id: 1, text: "Cough reflex in elderly patients is typically:", options: ["Increased", "Normal", "Reduced", "Exaggerated during anesthesia"], correct: 2 },
    { id: 2, text: "With ageing, the percentage of body fat:", options: ["Decreases", "Remains constant", "Increases", "Becomes negligible"], correct: 2 },
    { id: 3, text: "Age-related decline in the central nervous system includes reduction in:", options: ["Neurotransmitter levels", "Renal blood flow", "Pulmonary elasticity", "Total lung capacity only"], correct: 0 },
    { id: 4, text: "Basal heat production in elderly individuals is:", options: ["Increased", "Decreased", "Unchanged", "Variable but usually elevated"], correct: 1 },
    { id: 5, text: "The net cardiac effect of ischaemic heart disease in elderly patients is:", options: ["Increased stroke volume", "Reduced cardiac output", "Increased heart rate variability", "Enhanced contractility"], correct: 1 },
    { id: 6, text: "Over 50% of elderly patients with valvular disease commonly have:", options: ["Aortic stenosis", "Tricuspid regurgitation", "Mitral valve disease", "Pulmonary stenosis"], correct: 2 },
    { id: 7, text: "Pulmonary changes in ageing include a decrease in:", options: ["Residual volume", "Functional residual capacity", "Lung compliance", "Chest wall compliance"], correct: 3 },
    { id: 8, text: "Closing capacity exceeds FRC in the supine position at approximately:", options: ["30 years", "44 years", "60 years", "70 years"], correct: 1 },
    { id: 9, text: "Pulmonary embolism and chest infections are more common in elderly patients particularly after:", options: ["Minor dermatological surgery", "Orthopedic casting", "Abdominal or thoracic surgery", "Day-case procedures"], correct: 2 },
    { id: 10, text: "Renal function in elderly patients is characterized by:", options: ["Increased drug clearance", "Reduced glomerular filtration", "Enhanced fluid tolerance", "Improved dehydration response"], correct: 1 },
    { id: 11, text: "Fluid balance in elderly patients is critical because responses to fluid loading are:", options: ["Exaggerated", "Impaired", "Hyperdynamic", "Predictable"], correct: 1 },
    { id: 12, text: "Which drug should be avoided to reduce postoperative cognitive dysfunction?", options: ["Paracetamol", "Benzodiazepines", "Regional anesthetics", "Oxygen therapy"], correct: 1 },
    { id: 13, text: "Decreased liver mass in elderly patients results in:", options: ["Increased drug metabolism", "Reduced drug metabolism", "Increased albumin production", "Enhanced detoxification"], correct: 1 },
    { id: 14, text: "Diabetes prevalence in patients older than 70 years is approximately:", options: ["5%", "10%", "15%", "25%"], correct: 2 },
    { id: 15, text: "Preoperative assessment in elderly patients must include documentation of:", options: ["Only cardiac history", "Baseline cognitive and functional status", "Family medical history only", "Nutritional supplements only"], correct: 1 },
    { id: 16, text: "Reduced β-adrenergic response in elderly patients primarily causes:", options: ["Increased tachycardia", "Blunted stress response", "Enhanced myocardial oxygen demand", "Increased cardiac reserve"], correct: 1 },
    { id: 17, text: "Induction agents such as propofol should be administered slowly in elderly patients because:", options: ["MAC is increased", "Arm-brain circulation time is prolonged", "Renal clearance is increased", "Protein binding is elevated"], correct: 1 },
    { id: 18, text: "Hypovolaemia in elderly patients most rapidly compromises which organ function?", options: ["Renal", "Hepatic", "Pancreatic", "Splenic"], correct: 0 },
    { id: 19, text: "Early postoperative mobilization helps reduce:", options: ["Hyperglycaemia", "Atelectasis", "Liver enzyme elevation", "Cardiac hypertrophy"], correct: 1 },
    { id: 20, text: "An 82-year-old patient becomes confused postoperatively. The most likely physiological contributor is:", options: ["Increased cerebral blood flow", "Age-related CNS decline", "Elevated neurotransmitter levels", "Increased brain mass"], correct: 1 },
    { id: 21, text: "Excessive intraoperative fluid administration in elderly patients most commonly leads to:", options: ["Pulmonary oedema", "Hypoglycaemia", "Hepatic necrosis", "Bradycardia"], correct: 0 },
    { id: 22, text: "A patient on ACE inhibitors may demonstrate exaggerated hypotension due to:", options: ["Enhanced baroreceptor sensitivity", "Blunted autonomic compensation", "Increased renal reserve", "Elevated MAC"], correct: 1 },
    { id: 23, text: "Postoperative oxygen therapy is recommended for elderly patients particularly because of:", options: ["Increased oxygen reserve", "Reduced oxygen reserve and V/Q mismatch", "Enhanced pulmonary elasticity", "Improved diffusion capacity"], correct: 1 },
    { id: 24, text: "High-dependency or intensive care facilities may improve outcomes in elderly patients because of:", options: ["Increased metabolic rate", "Reduced functional reserve and higher complication risk", "Elevated albumin levels", "Increased drug metabolism"], correct: 1 }
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
    
    document.getElementById('final-result-text').innerText = `${score} / 25`;
    document.getElementById('result-modal').classList.remove('hidden');
    document.getElementById('result-modal').classList.add('flex');

    // ✅ إضافة الحفظ هنا فقط
    saveResultLocally("icu", "Lecture 1", score, 25);

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