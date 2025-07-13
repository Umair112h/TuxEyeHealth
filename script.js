// Global state management
let gameState = {
    currentLevel: 1,
    maxUnlockedLevel: 1,
    colorTestResults: [],
    visionTestResults: {
        distance: null,
        near: null
    },
    prescriptionData: {
        rightEye: { sphere: null, cylinder: null, axis: null },
        leftEye: { sphere: null, cylinder: null, axis: null }
    },
    colorTestCurrentQuestion: 0,
    colorTestScore: 0
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadGameState();
    initializeEventListeners();
    showLevel(gameState.currentLevel);
    updateProgressBar();
    initializeTux();
    setupColorBlindnessTest();
});

// Save and load game state
function saveGameState() {
    localStorage.setItem('eyeHealthGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('eyeHealthGameState');
    if (saved) {
        gameState = { ...gameState, ...JSON.parse(saved) };
    }
}

// Event listeners setup
function initializeEventListeners() {
    // Answer buttons for color blindness test
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectAnswer(this.dataset.answer);
        });
    });

    // Vision test type selector
    document.querySelectorAll('.test-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchVisionTest(this.dataset.test);
        });
    });

    // Condition tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchConditionTab(this.dataset.condition);
        });
    });

    // Level dots for navigation
    document.querySelectorAll('.level-dot').forEach(dot => {
        dot.addEventListener('click', function() {
            const level = parseInt(this.dataset.level);
            if (level <= gameState.maxUnlockedLevel) {
                showLevel(level);
            }
        });
    });

    // Tux character interaction
    document.getElementById('tuxCharacter').addEventListener('click', function() {
        showTuxMessage();
    });
}

// Level management
function showLevel(levelNumber) {
    // Hide all levels
    document.querySelectorAll('.level-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show current level
    const currentLevelSection = document.getElementById(`level${levelNumber}`);
    if (currentLevelSection) {
        currentLevelSection.classList.add('active');
        gameState.currentLevel = levelNumber;
        updateProgressBar();
        updateLevelDots();
        saveGameState();
        
        // Trigger level-specific initialization
        initializeLevelContent(levelNumber);
        
        // Update Tux message for current level
        updateTuxMessage(levelNumber);
    }
}

function nextLevel() {
    if (gameState.currentLevel < 6) {
        gameState.maxUnlockedLevel = Math.max(gameState.maxUnlockedLevel, gameState.currentLevel + 1);
        showLevel(gameState.currentLevel + 1);
    }
}

function initializeLevelContent(levelNumber) {
    switch(levelNumber) {
        case 2:
            setupColorBlindnessTest();
            break;
        case 3:
            setupVisionTest();
            break;
        case 4:
            setupPrescriptionAnalysis();
            break;
        case 5:
            setupConditionEducation();
            break;
        case 6:
            displayResults();
            break;
    }
}

// Progress bar management
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progress = (gameState.currentLevel / 6) * 100;
    progressFill.style.width = `${progress}%`;
}

function updateLevelDots() {
    document.querySelectorAll('.level-dot').forEach((dot, index) => {
        const level = index + 1;
        dot.classList.remove('active', 'completed', 'locked');
        
        if (level < gameState.currentLevel) {
            dot.classList.add('completed');
        } else if (level === gameState.currentLevel) {
            dot.classList.add('active');
        } else if (level <= gameState.maxUnlockedLevel) {
            // Unlocked but not current
        } else {
            dot.classList.add('locked');
        }
    });
}

// Color Blindness Test
function setupColorBlindnessTest() {
    gameState.colorTestCurrentQuestion = 0;
    gameState.colorTestResults = [];
    gameState.colorTestScore = 0;
    loadColorTest();
}

function loadColorTest() {
    const currentTest = COLOR_BLINDNESS_TESTS[gameState.colorTestCurrentQuestion];
    if (!currentTest) {
        completeColorTest();
        return;
    }

    document.getElementById('colorTestImage').src = currentTest.image;
    document.getElementById('colorTestProgress').textContent = gameState.colorTestCurrentQuestion + 1;
    document.getElementById('colorTestTotal').textContent = COLOR_BLINDNESS_TESTS.length;

    // Reset answer buttons
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
}

function selectAnswer(answer) {
    // Visual feedback
    document.querySelectorAll('.answer-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');

    // Store answer and check if correct
    const currentTest = COLOR_BLINDNESS_TESTS[gameState.colorTestCurrentQuestion];
    const isCorrect = answer === currentTest.correctAnswer;
    
    gameState.colorTestResults.push({
        question: gameState.colorTestCurrentQuestion + 1,
        userAnswer: answer,
        correctAnswer: currentTest.correctAnswer,
        isCorrect: isCorrect
    });

    if (isCorrect) {
        gameState.colorTestScore++;
    }

    // Auto-advance after a short delay
    setTimeout(() => {
        gameState.colorTestCurrentQuestion++;
        loadColorTest();
    }, 1000);
}

function completeColorTest() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        nextLevel();
    }, 1500);
}

// Vision Test
function setupVisionTest() {
    switchVisionTest('distance');
}

function switchVisionTest(testType) {
    document.querySelectorAll('.test-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const instructions = document.getElementById('visionTestInstructions');
    if (testType === 'distance') {
        instructions.textContent = "Cover one eye and read the smallest line you can see clearly from 6 feet away.";
    } else {
        instructions.textContent = "Hold this screen 14-16 inches from your eyes and read the smallest line you can see clearly.";
    }
}

function submitVisionTest() {
    const selectedLine = document.getElementById('visionResult').value;
    if (!selectedLine) {
        alert('Please select the smallest line you can read clearly.');
        return;
    }

    const testType = document.querySelector('.test-type-btn.active').dataset.test;
    gameState.visionTestResults[testType] = selectedLine;

    // Check if both tests are completed
    if (gameState.visionTestResults.distance && gameState.visionTestResults.near) {
        showLoading();
        setTimeout(() => {
            hideLoading();
            nextLevel();
        }, 1500);
    } else {
        // Switch to the other test
        const nextTest = testType === 'distance' ? 'near' : 'distance';
        const nextBtn = document.querySelector(`[data-test="${nextTest}"]`);
        if (nextBtn) {
            nextBtn.click();
        }
        document.getElementById('visionResult').value = '';
    }
}

// Prescription Analysis
function setupPrescriptionAnalysis() {
    // Clear previous results
    document.getElementById('prescriptionResults').classList.remove('show');
}

function analyzePrescription() {
    // Get input values
    const rightSphere = parseFloat(document.getElementById('rightSphere').value) || 0;
    const rightCylinder = parseFloat(document.getElementById('rightCylinder').value) || 0;
    const rightAxis = parseInt(document.getElementById('rightAxis').value) || 0;
    
    const leftSphere = parseFloat(document.getElementById('leftSphere').value) || 0;
    const leftCylinder = parseFloat(document.getElementById('leftCylinder').value) || 0;
    const leftAxis = parseInt(document.getElementById('leftAxis').value) || 0;

    // Store in game state
    gameState.prescriptionData = {
        rightEye: { sphere: rightSphere, cylinder: rightCylinder, axis: rightAxis },
        leftEye: { sphere: leftSphere, cylinder: leftCylinder, axis: leftAxis }
    };

    // Generate analysis
    const analysis = generatePrescriptionAnalysis(gameState.prescriptionData);
    
    // Display results
    const resultsDiv = document.getElementById('prescriptionResults');
    resultsDiv.innerHTML = analysis;
    resultsDiv.classList.add('show');

    // Enable next level after a delay
    setTimeout(() => {
        nextLevel();
    }, 3000);
}

function generatePrescriptionAnalysis(data) {
    let analysis = '<h3>Your Prescription Analysis</h3>';
    
    // Analyze sphere values
    const avgSphere = (Math.abs(data.rightEye.sphere) + Math.abs(data.leftEye.sphere)) / 2;
    
    if (avgSphere === 0) {
        analysis += '<p><strong>Vision Type:</strong> You appear to have normal distance vision or very mild prescription needs.</p>';
    } else if (data.rightEye.sphere < 0 || data.leftEye.sphere < 0) {
        analysis += '<p><strong>Vision Type:</strong> You have myopia (nearsightedness). You can see nearby objects clearly but distant objects appear blurry.</p>';
        
        if (avgSphere <= 3) {
            analysis += '<p><strong>Severity:</strong> Mild myopia</p>';
        } else if (avgSphere <= 6) {
            analysis += '<p><strong>Severity:</strong> Moderate myopia</p>';
        } else {
            analysis += '<p><strong>Severity:</strong> High myopia</p>';
        }
    } else {
        analysis += '<p><strong>Vision Type:</strong> You have hyperopia (farsightedness). You may have difficulty seeing nearby objects clearly.</p>';
    }

    // Analyze astigmatism
    const avgCylinder = (Math.abs(data.rightEye.cylinder) + Math.abs(data.leftEye.cylinder)) / 2;
    if (avgCylinder > 0) {
        analysis += `<p><strong>Astigmatism:</strong> You have ${avgCylinder <= 1 ? 'mild' : avgCylinder <= 2 ? 'moderate' : 'significant'} astigmatism, which can cause blurred or distorted vision.</p>`;
    }

    analysis += '<p><strong>Note:</strong> This analysis is for educational purposes only. Please consult an eye care professional for accurate diagnosis and treatment.</p>';
    
    return analysis;
}

// Condition Education
function setupConditionEducation() {
    switchConditionTab('normal');
}

function switchConditionTab(condition) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const conditionData = VISION_CONDITIONS[condition];
    if (conditionData) {
        document.getElementById('conditionInfo').innerHTML = `
            <h3>${conditionData.name}</h3>
            <p>${conditionData.description}</p>
            <ul>
                ${conditionData.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
            </ul>
        `;

        const videoDiv = document.getElementById('conditionVideo');
        if (conditionData.videoUrl) {
            videoDiv.innerHTML = `<iframe width="100%" height="100%" src="${conditionData.videoUrl}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            videoDiv.innerHTML = `
                <p>Educational video about ${conditionData.name} would be embedded here.</p>
                <p class="video-note">Replace this placeholder with actual video content in the configuration.</p>
            `;
        }
    }

    // Auto-advance after viewing for a while
    setTimeout(() => {
        if (condition === 'presbyopia') {
            nextLevel();
        }
    }, 5000);
}

// Results Display
function displayResults() {
    displayColorVisionResults();
    displayVisualAcuityResults();
    displayPrescriptionResults();
    generateRecommendations();
}

function displayColorVisionResults() {
    const resultsDiv = document.getElementById('colorVisionResult');
    const score = gameState.colorTestScore;
    const total = COLOR_BLINDNESS_TESTS.length;
    const percentage = Math.round((score / total) * 100);

    let interpretation = '';
    if (percentage >= 80) {
        interpretation = 'Normal color vision';
    } else if (percentage >= 60) {
        interpretation = 'Possible mild color vision deficiency';
    } else {
        interpretation = 'Possible color vision deficiency - recommend professional testing';
    }

    resultsDiv.innerHTML = `
        <div class="score-display">
            <div class="score-number">${score}/${total}</div>
            <div class="score-percentage">${percentage}%</div>
        </div>
        <p class="result-interpretation">${interpretation}</p>
    `;
}

function displayVisualAcuityResults() {
    const resultsDiv = document.getElementById('visualAcuityResult');
    const distance = gameState.visionTestResults.distance;
    const near = gameState.visionTestResults.near;

    const distanceVision = distance ? getVisionDescription(distance) : 'Not tested';
    const nearVision = near ? getVisionDescription(near) : 'Not tested';

    resultsDiv.innerHTML = `
        <div class="vision-results">
            <div class="vision-result">
                <strong>Distance Vision:</strong> ${distanceVision}
            </div>
            <div class="vision-result">
                <strong>Near Vision:</strong> ${nearVision}
            </div>
        </div>
    `;
}

function getVisionDescription(lineNumber) {
    const descriptions = {
        '1': '20/200 - Legally blind',
        '2': '20/160 - Severe visual impairment',
        '3': '20/120 - Significant visual impairment',
        '4': '20/80 - Moderate visual impairment',
        '5': '20/60 - Mild visual impairment',
        '6': '20/40 - Slight visual impairment',
        '7': '20/30 - Better than average',
        '8': '20/20 - Normal vision'
    };
    return descriptions[lineNumber] || 'Unknown';
}

function displayPrescriptionResults() {
    const resultsDiv = document.getElementById('prescriptionAnalysisResult');
    const data = gameState.prescriptionData;

    if (data.rightEye.sphere === null && data.leftEye.sphere === null) {
        resultsDiv.innerHTML = '<p>No prescription data entered</p>';
        return;
    }

    const analysis = generatePrescriptionAnalysis(data);
    resultsDiv.innerHTML = analysis;
}

function generateRecommendations() {
    const recommendationsDiv = document.getElementById('recommendationsContent');
    const recommendations = [];

    // Based on color vision results
    const colorScore = (gameState.colorTestScore / COLOR_BLINDNESS_TESTS.length) * 100;
    if (colorScore < 80) {
        recommendations.push('Consider a comprehensive color vision test with an eye care professional.');
    }

    // Based on visual acuity
    const distanceVision = parseInt(gameState.visionTestResults.distance) || 8;
    const nearVision = parseInt(gameState.visionTestResults.near) || 8;
    
    if (distanceVision < 6 || nearVision < 6) {
        recommendations.push('Schedule a comprehensive eye examination for visual acuity concerns.');
    }

    // General recommendations
    recommendations.push('Maintain regular eye exams - annually after age 60, every 2 years before.');
    recommendations.push('Protect your eyes from UV rays with quality sunglasses.');
    recommendations.push('Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds.');
    recommendations.push('Maintain a healthy diet rich in omega-3 fatty acids and antioxidants.');

    recommendationsDiv.innerHTML = recommendations.map(rec => `<p><i class="fas fa-check-circle"></i> ${rec}</p>`).join('');
}

// Utility functions
function showLoading() {
    document.getElementById('loadingOverlay').classList.add('show');
}

function hideLoading() {
    document.getElementById('loadingOverlay').classList.remove('show');
}

function restartJourney() {
    if (confirm('Are you sure you want to restart your eye health journey? All progress will be lost.')) {
        localStorage.removeItem('eyeHealthGameState');
        location.reload();
    }
}

function downloadResults() {
    const results = generateResultsReport();
    const blob = new Blob([results], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eye-health-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateResultsReport() {
    const date = new Date().toLocaleDateString();
    let report = `Eye Health Assessment Results\n`;
    report += `Date: ${date}\n`;
    report += `Generated by Tux's Vision Guide\n\n`;

    report += `COLOR VISION TEST RESULTS:\n`;
    report += `Score: ${gameState.colorTestScore}/${COLOR_BLINDNESS_TESTS.length}\n`;
    report += `Percentage: ${Math.round((gameState.colorTestScore / COLOR_BLINDNESS_TESTS.length) * 100)}%\n\n`;

    report += `VISUAL ACUITY TEST RESULTS:\n`;
    report += `Distance Vision: ${getVisionDescription(gameState.visionTestResults.distance)}\n`;
    report += `Near Vision: ${getVisionDescription(gameState.visionTestResults.near)}\n\n`;

    report += `PRESCRIPTION DATA:\n`;
    if (gameState.prescriptionData.rightEye.sphere !== null) {
        report += `Right Eye: SPH ${gameState.prescriptionData.rightEye.sphere}, CYL ${gameState.prescriptionData.rightEye.cylinder}, AXIS ${gameState.prescriptionData.rightEye.axis}\n`;
        report += `Left Eye: SPH ${gameState.prescriptionData.leftEye.sphere}, CYL ${gameState.prescriptionData.leftEye.cylinder}, AXIS ${gameState.prescriptionData.leftEye.axis}\n\n`;
    } else {
        report += `No prescription data entered\n\n`;
    }

    report += `DISCLAIMER:\n`;
    report += `This assessment is for educational purposes only and does not replace professional eye care. Please consult an eye care professional for accurate diagnosis and treatment.\n`;

    return report;
}

// Tux Animation and Interaction
function initializeTux() {
    updateTuxMessage(gameState.currentLevel);
    
    // Show speech bubble initially
    setTimeout(() => {
        document.getElementById('speechBubble').classList.add('show');
    }, 1000);
}

function updateTuxMessage(level) {
    const messages = {
        1: "Hello! I'm Tux, your eye health guide. Let's start your vision journey!",
        2: "Time for a color vision test! Look carefully at each image and tell me what number you see.",
        3: "Now let's check your visual acuity. Read the smallest line you can see clearly!",
        4: "Do you wear glasses or contacts? Let's analyze your prescription to understand your vision better.",
        5: "Let me show you how different eye conditions affect vision. This will help you understand various eye health issues.",
        6: "Excellent work! Here are your results. Remember, this is just a screening - always consult a professional for proper eye care."
    };

    document.getElementById('speechText').textContent = messages[level] || messages[1];
}

function showTuxMessage() {
    const bubble = document.getElementById('speechBubble');
    bubble.classList.remove('show');
    setTimeout(() => {
        bubble.classList.add('show');
    }, 100);
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.key === ' ') {
        if (gameState.currentLevel < 6 && gameState.currentLevel < gameState.maxUnlockedLevel) {
            nextLevel();
        }
    } else if (event.key === 'ArrowLeft') {
        if (gameState.currentLevel > 1) {
            showLevel(gameState.currentLevel - 1);
        }
    }
});

// Accessibility improvements
function announceLevel(level) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Level ${level} loaded`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add screen reader support
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;
document.head.appendChild(style);
