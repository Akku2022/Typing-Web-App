const paragraphs = [
    "The digital age has transformed how we access and share information. Technology enables instant communication, data analysis, and online learning. However, it also presents challenges such as cybersecurity threats and information overload. Navigating the digital landscape requires understanding its benefits and risks.",
    "Innovation drives progress and change in various fields. It involves developing new ideas, products, or processes that improve existing systems. Innovation requires creativity, experimentation, and risk-taking. Embracing innovation fosters growth and adaptation in rapidly evolving environments.",
    "Health and wellness involve maintaining physical and mental well-being. Regular exercise, balanced nutrition, and stress management contribute to overall health. Wellness practices include mindfulness, adequate sleep, and preventive care. Prioritizing health and wellness leads to a better quality of life.",
    "Globalization connects countries through trade, technology, and culture. It leads to increased economic opportunities and cultural exchange. However, globalization also presents challenges, such as economic disparities and cultural homogenization. Understanding globalization’s impact helps navigate its effects on society and economy.",
    "History provides insights into past events and cultures. Studying historical records and artifacts helps understand different societies. History informs decision-making and highlights achievements and mistakes. Learning from history enhances appreciation of cultural heritage and human development.",
    "Traveling broadens one’s perspective by experiencing new cultures and traditions. It involves exploring different places, languages, and histories. Responsible travel includes respecting local customs and minimizing environmental impact. Traveling enriches personal experiences and fosters global understanding.",
    "Psychology studies behavior and mental processes. It explores emotions, cognition, and social interactions. Psychologists use research methods to understand how individuals think and feel. Psychology also addresses mental health and well-being. Understanding psychological principles enhances personal growth and relationships.",
    "Entrepreneurship involves starting and managing a new business venture. Entrepreneurs identify opportunities, develop ideas, and take risks to achieve goals. Strategic planning, financial management, and adaptability are key to success. Entrepreneurship drives innovation and economic growth, creating new solutions and jobs.",
    "Artificial intelligence (AI) involves creating systems that perform tasks requiring human intelligence. AI technologies include machine learning and natural language processing. Applications range from virtual assistants to autonomous vehicles. Understanding AI’s capabilities and implications is crucial for navigating its impact on society.",
    "Sustainable living focuses on reducing environmental impact. Adopting practices like recycling, conserving energy, and supporting eco-friendly products helps in promoting ecological balance. Sustainable living involves being mindful of resource consumption and supporting environmental initiatives. Making informed choices contributes to a healthier planet.",
    "Research skills are vital for gathering and evaluating information. Identifying reliable sources and analyzing data helps in making informed decisions. Research involves using various methods and tools to collect information. Strong research skills contribute to a deeper understanding of complex topics.",
    "Project management involves planning and overseeing tasks to achieve goals. Setting objectives, managing resources, and coordinating efforts are key aspects. Effective communication and time management are crucial for project success. Monitoring progress and addressing issues ensure that objectives are met.",
    "Analytical skills involve evaluating information and making informed decisions. Analyzing data, identifying patterns, and drawing conclusions are essential. Critical thinking and attention to detail are important for effective analysis. Strong analytical skills contribute to better decision-making and problem-solving.",
    "Organizational skills help in managing tasks effectively. Planning, prioritizing, and executing tasks in an orderly manner increase productivity. Creating systems and setting deadlines are key to staying organized. Managing multiple responsibilities and maintaining focus on objectives enhance performance.",
    "Effective communication is key in any organization. Clear communication helps in understanding tasks and expectations. Listening actively and providing feedback ensures that everyone is on the same page. Good communication can prevent misunderstandings and improve teamwork. It also plays a crucial role in problem-solving and decision-making. Practicing clear, concise, and respectful communication can enhance relationships and productivity.",
    "Time management helps in achieving goals efficiently. Prioritizing tasks and setting deadlines ensures that important activities are completed on time. By organizing tasks and avoiding procrastination, one can manage workload effectively. Time management also involves balancing work and personal life, reducing stress. Using tools like planners or apps can aid in staying organized.",
    "Teamwork is a fundamental aspect of achieving collective goals. Working effectively with others involves collaboration, communication, and a shared commitment to success. Teamwork requires individuals to contribute their skills and knowledge, support one another, and work towards common objectives. It also involves resolving conflicts, sharing responsibilities, and leveraging diverse perspectives. Effective teamwork can lead to increased creativity, improved problem-solving, and greater overall performance. Building strong team relationships and fostering a positive team environment are key to successful collaboration.",
    "Customer service skills are vital for building positive relationships with clients and customers. Providing excellent service involves understanding customer needs, addressing concerns, and delivering solutions in a timely manner. Good customer service requires effective communication, empathy, and problem-solving abilities. It also involves maintaining a professional demeanor and striving to exceed customer expectations. Developing strong customer service skills can lead to increased customer satisfaction, loyalty, and positive word-of-mouth. Providing exceptional service is essential for business success and reputation.",
    "Goal-setting is an important practice for achieving personal and professional success. Setting clear, achievable goals helps individuals stay focused and motivated. It involves defining specific objectives, creating a plan of action, and tracking progress. Effective goal-setting also requires setting realistic deadlines and making adjustments as needed. By setting and pursuing goals, individuals can create a sense of purpose and direction. Regularly reviewing and adjusting goals can lead to continuous improvement and achievement. Developing goal-setting skills can enhance motivation and lead to greater success.",
    "Conflict resolution skills are essential for maintaining healthy relationships and effective teamwork. The ability to address and resolve conflicts constructively involves active listening, empathy, and negotiation. It requires understanding different perspectives, finding common ground, and working towards mutually acceptable solutions. Effective conflict resolution helps prevent escalation and promotes a positive environment. Developing conflict resolution skills can lead to better communication, stronger relationships, and improved collaboration. Practicing these skills can enhance one's ability to manage and resolve disputes effectively.",
    "Emotional intelligence involves understanding and managing emotions. It includes recognizing one’s own feelings and empathizing with others. High emotional intelligence can improve relationships and communication. It also helps in handling stress and resolving conflicts. Developing emotional intelligence requires self-awareness and effective interpersonal skills.",
    "Analytical skills are important for evaluating information and making informed decisions. The ability to analyze data, identify patterns, and draw conclusions is valuable in various fields. Analytical skills involve critical thinking, problem-solving, and attention to detail. They also require the ability to interpret complex information and make data-driven decisions. Developing strong analytical skills can lead to better decision-making and the ability to tackle complex challenges. Practicing analytical techniques can enhance one's ability to process and evaluate information effectively.",
    "Leadership involves guiding and motivating a team towards achieving goals. Effective leaders set clear objectives and provide support to their team members. Good leadership requires communication skills, decision-making abilities, and empathy. Leaders should also be adaptable and able to handle conflicts. Developing leadership skills can improve team performance and drive success.",
    "Creativity drives innovation and problem-solving. It involves thinking outside the box and exploring new ideas. Creativity can be fostered by experimenting with different approaches and embracing new perspectives. Encouraging a creative environment can lead to unique solutions and improvements. Creativity also helps in adapting to change and overcoming challenges."
];

const paragraph = document.getElementById('paragraph');
const userInput = document.getElementById('userInput');
const timer = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const cpmDisplay = document.getElementById('cpm');
const mistakesDisplay = document.getElementById('mistakes');
const accuracyDisplay = document.getElementById('accuracy');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const newParagraphBtn = document.getElementById('newParagraphBtn');
const progressBar = document.getElementById('progressBar');

let timeLeft = 60;
let timerInterval;
let mistakes = 0;
let typedCharacters = 0;
let correctCharacters = 0;
let gameInProgress = false;

function getRandomParagraph() {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    return paragraphs[randomIndex];
}

function startGame() {
    if (gameInProgress) return;
    
    gameInProgress = true;
    toggleButtons(true);

    initializeGameState();
    startTimer();
}

function initializeGameState() {
    const currentParagraph = getRandomParagraph();
    paragraph.innerHTML = highlightText(currentParagraph);
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    mistakes = 0;
    typedCharacters = 0;
    correctCharacters = 0;
    updateDisplay();
}

function startTimer() {
    timeLeft = 60;
    timer.innerText = `Time left: ${timeLeft}s`;
    progressBar.style.width = '100%';

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        timer.innerText = `Time left: ${timeLeft}s`;
        progressBar.style.width = `${(timeLeft / 60) * 100}%`;
        updateDisplay();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    userInput.disabled = true;
    gameInProgress = false;
    toggleButtons(false);
    calculateAccuracy();
}

function resetGame() {
    clearInterval(timerInterval);
    paragraph.innerText = "Click 'Start' to begin the typing test.";
    userInput.value = '';
    userInput.disabled = true;
    resetDisplay();
    toggleButtons(false);
}

function newParagraph() {
    if (gameInProgress) return;
    
    initializeGameState();
}

function handleUserInput() {
    const currentParagraph = paragraph.innerText.replace(/\n/g, '');
    const userText = userInput.value;

    const textToHighlight = highlightText(currentParagraph, userText);
    paragraph.innerHTML = textToHighlight;

    typedCharacters = userText.length;
    correctCharacters = countCorrectCharacters(currentParagraph, userText);
    mistakes = typedCharacters - correctCharacters;

    updateDisplay();
}

function countCorrectCharacters(paragraph, userText) {
    let correctCount = 0;
    for (let i = 0; i < userText.length; i++) {
        if (userText[i] === paragraph[i]) {
            correctCount++;
        }
    }
    return correctCount;
}

function highlightText(paragraph, userText = '') {
    let highlightedText = '';
    for (let i = 0; i < paragraph.length; i++) {
        if (i < userText.length) {
            highlightedText += userText[i] === paragraph[i]
                ? `<span class="correct">${paragraph[i]}</span>`
                : `<span class="incorrect">${paragraph[i]}</span>`;
        } else {
            highlightedText += paragraph[i];
        }
    }
    return highlightedText;
}

function calculateWPM() {
    return Math.round((correctCharacters / 5) / ((60 - timeLeft) / 60));
}

function calculateCPM() {
    return Math.round(correctCharacters / ((60 - timeLeft) / 60));
}

function calculateAccuracy() {
    const accuracy = correctCharacters / typedCharacters * 100;
    return isNaN(accuracy) ? 0 : accuracy.toFixed(2);
}

function updateDisplay() {
    wpmDisplay.innerText = `WPM: ${calculateWPM()}`;
    cpmDisplay.innerText = `CPM: ${calculateCPM()}`;
    mistakesDisplay.innerText = `Mistakes: ${mistakes}`;
    accuracyDisplay.innerText = `Accuracy: ${calculateAccuracy()}%`;
}

function resetDisplay() {
    timer.innerText = 'Time left: 60s';
    wpmDisplay.innerText = 'WPM: 0';
    cpmDisplay.innerText = 'CPM: 0';
    mistakesDisplay.innerText = 'Mistakes: 0';
    accuracyDisplay.innerText = 'Accuracy: 0%';
    progressBar.style.width = '100%';
}

function toggleButtons(disableStart) {
    startBtn.disabled = disableStart;
    resetBtn.disabled = !disableStart;
    newParagraphBtn.disabled = disableStart;
}

userInput.addEventListener('input', handleUserInput);
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
newParagraphBtn.addEventListener('click', newParagraph);

resetGame();
