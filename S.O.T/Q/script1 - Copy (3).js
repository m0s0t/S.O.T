// 1. البيانات (الـ 25 سؤال)
const examData = [
    { id: 0, text: "What is the maximum total score of the Critical-Care Pain Observation Tool (CPOT)?", options: ["6", "8", "10", "12"], correct: 1 },

    { id: 1, text: "Which behavioral indicator is considered one of the best indicators for pain assessment in CPOT?", options: ["Body movement", "Facial expression", "Vocalization", "Ventilator compliance"], correct: 1 },

    { id: 2, text: "In CPOT, what score is assigned to a relaxed facial expression?", options: ["0", "1", "2", "3"], correct: 0 },

    { id: 3, text: "In extubated patients, which CPOT category replaces ventilator compliance?", options: ["Muscle tone", "Vocalization", "Respiratory rate", "Consciousness level"], correct: 1 },

    { id: 4, text: "What score corresponds to grimacing in CPOT facial expression scoring?", options: ["0", "1", "2", "3"], correct: 2 },

    { id: 5, text: "Which of the following describes a CPOT facial expression score of 1?", options: ["No muscle tension", "Brow lowering or frowning", "Eyes tightly closed with grimacing", "Complete facial paralysis"], correct: 1 },

    { id: 6, text: "What body movement score is assigned when a patient attempts to pull tubes or thrashes limbs?", options: ["0", "1", "2", "3"], correct: 2 },

    { id: 7, text: "Which body movement score indicates protective behavior?", options: ["0", "1", "2", "3"], correct: 1 },

    { id: 8, text: "A mechanically ventilated patient coughing but tolerating ventilation would receive what score?", options: ["0", "1", "2", "3"], correct: 1 },

    { id: 9, text: "What score is assigned when a patient fights the ventilator with frequent alarms?", options: ["0", "1", "2", "3"], correct: 2 },

    { id: 10, text: "Which vocalization corresponds to a CPOT score of 1?", options: ["Talking normally", "Silence", "Sighing or moaning", "Crying out"], correct: 2 },

    { id: 11, text: "What vocalization behavior corresponds to a CPOT score of 2?", options: ["Talking in normal tone", "Silence", "Sighing", "Crying out or sobbing"], correct: 3 },

    { id: 12, text: "How is muscle tension evaluated when the patient is at rest?", options: ["Palpating abdominal muscles", "Passive flexion and extension of the upper limbs", "Observing breathing pattern", "Checking reflexes"], correct: 1 },

    { id: 13, text: "What muscle tension score indicates resistance to passive movement?", options: ["0", "1", "2", "3"], correct: 1 },

    { id: 14, text: "What muscle tension score is given when passive movements cannot be completed?", options: ["0", "1", "2", "3"], correct: 2 },

    { id: 15, text: "Why is muscle tension evaluated last during CPOT assessment at rest?", options: ["It requires laboratory tests", "Touch stimulation may provoke behavioral reactions", "It is the least important parameter", "It requires imaging"], correct: 1 },

    { id: 16, text: "During baseline assessment, how long should the patient be observed before scoring CPOT?", options: ["30 seconds", "45 seconds", "1 minute", "2 minutes"], correct: 2 },

    { id: 17, text: "When scoring CPOT during an observation period, which score should be recorded?", options: ["Average score", "First observed score", "Highest observed score", "Lowest observed score"], correct: 2 },

    { id: 18, text: "Which CPOT indicator is considered less specific for pain but still useful?", options: ["Facial expression", "Body movements", "Muscle tension", "Vocalization"], correct: 1 },

    { id: 19, text: "CPOT assessment should be performed before and after analgesic administration primarily to:", options: ["Determine sedation level", "Evaluate drug pharmacokinetics", "Assess treatment effectiveness", "Reduce nurse workload"], correct: 2 },

    { id: 20, text: "A ventilated patient repeatedly triggers ventilator alarms and blocks ventilation despite reassurance. What CPOT ventilator score applies?", options: ["0", "1", "2", "Cannot be scored"], correct: 2 },

    { id: 21, text: "A patient shows no body movement but is sedated and mechanically ventilated. According to CPOT interpretation, this finding:", options: ["Confirms absence of pain", "Always indicates severe pain", "Does not necessarily indicate absence of pain", "Invalidates the CPOT score"], correct: 2 },

    { id: 22, text: "During turning, a patient attempts to reach the surgical incision while grimacing. What body movement score should be assigned?", options: ["0", "1", "2", "Cannot be scored"], correct: 1 },

    { id: 23, text: "During passive arm movement, the nurse cannot complete flexion because of strong resistance and clenched fists. What muscle tension score is appropriate?", options: ["0", "1", "2", "Not applicable"], correct: 2 },

    { id: 24, text: "During a nociceptive procedure, a patient grimaces, attempts to sit up, fights the ventilator, and demonstrates strong muscle resistance. What is the CPOT score?", options: ["4", "6", "7", "8"], correct: 3 }
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