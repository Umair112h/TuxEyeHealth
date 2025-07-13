// Tux Animation System
class TuxAnimator {
    constructor() {
        this.tuxElement = document.getElementById('tuxCharacter');
        this.speechBubble = document.getElementById('speechBubble');
        this.currentAnimation = null;
        this.isAnimating = false;
        
        this.animations = {
            idle: this.idleAnimation.bind(this),
            talking: this.talkingAnimation.bind(this),
            celebrating: this.celebratingAnimation.bind(this),
            thinking: this.thinkingAnimation.bind(this),
            pointing: this.pointingAnimation.bind(this),
            waving: this.wavingAnimation.bind(this)
        };
        
        this.init();
    }
    
    init() {
        // Start with idle animation
        this.playAnimation('idle');
        
        // Set up event listeners for automatic animations
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Animate when speech bubble shows
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (this.speechBubble.classList.contains('show')) {
                        this.playAnimation('talking', 3000);
                    }
                }
            });
        });
        
        observer.observe(this.speechBubble, { attributes: true });
        
        // Level completion celebrations
        document.addEventListener('levelCompleted', (event) => {
            this.playAnimation('celebrating', 2000);
        });
        
        // Thinking animation for loading states
        document.addEventListener('showLoading', () => {
            this.playAnimation('thinking');
        });
        
        document.addEventListener('hideLoading', () => {
            this.playAnimation('idle');
        });
    }
    
    playAnimation(animationName, duration = null) {
        if (this.isAnimating && this.currentAnimation === animationName) {
            return; // Already playing this animation
        }
        
        this.stopCurrentAnimation();
        this.currentAnimation = animationName;
        this.isAnimating = true;
        
        if (this.animations[animationName]) {
            this.animations[animationName]();
        }
        
        if (duration) {
            setTimeout(() => {
                this.playAnimation('idle');
            }, duration);
        }
    }
    
    stopCurrentAnimation() {
        this.isAnimating = false;
        this.tuxElement.style.transform = '';
        this.tuxElement.style.animation = '';
    }
    
    // Animation implementations
    idleAnimation() {
        this.tuxElement.style.animation = 'tuxFloat 3s ease-in-out infinite';
    }
    
    talkingAnimation() {
        this.tuxElement.style.animation = 'tuxTalk 0.5s ease-in-out infinite';
    }
    
    celebratingAnimation() {
        this.tuxElement.style.animation = 'tuxCelebrate 1s ease-in-out infinite';
    }
    
    thinkingAnimation() {
        this.tuxElement.style.animation = 'tuxThink 2s ease-in-out infinite';
    }
    
    pointingAnimation() {
        this.tuxElement.style.animation = 'tuxPoint 1s ease-in-out infinite';
    }
    
    wavingAnimation() {
        this.tuxElement.style.animation = 'tuxWave 1s ease-in-out 3';
    }
    
    // Interactive gestures
    reactToClick() {
        this.playAnimation('waving', 2000);
    }
    
    reactToCorrectAnswer() {
        this.playAnimation('celebrating', 1500);
        this.updateSpeech("Great job! That's correct!");
    }
    
    reactToIncorrectAnswer() {
        this.playAnimation('thinking', 1500);
        this.updateSpeech("Don't worry, let's try the next one!");
    }
    
    reactToLevelComplete() {
        this.playAnimation('celebrating', 3000);
        this.updateSpeech("Excellent! You've completed this level!");
    }
    
    updateSpeech(message) {
        const speechText = document.getElementById('speechText');
        speechText.textContent = message;
        this.speechBubble.classList.remove('show');
        setTimeout(() => {
            this.speechBubble.classList.add('show');
        }, 100);
    }
}

// Add CSS animations for Tux
const tuxAnimationCSS = `
    @keyframes tuxFloat {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(1deg); }
    }
    
    @keyframes tuxTalk {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.05) rotate(-1deg); }
    }
    
    @keyframes tuxCelebrate {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(-15px) rotate(-5deg) scale(1.1); }
        75% { transform: translateY(-15px) rotate(5deg) scale(1.1); }
    }
    
    @keyframes tuxThink {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-2deg); }
        75% { transform: rotate(2deg); }
    }
    
    @keyframes tuxPoint {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        50% { transform: translateX(10px) rotate(5deg); }
    }
    
    @keyframes tuxWave {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }
    
    @keyframes speechBounce {
        0%, 100% { transform: scale(1) translateY(0); }
        50% { transform: scale(1.05) translateY(-5px); }
    }
    
    .speech-bubble.bounce {
        animation: speechBounce 0.6s ease-in-out;
    }
    
    .tux-character:hover {
        animation-play-state: paused;
        transform: scale(1.1) !important;
    }
    
    .tux-character.clicked {
        animation: tuxWave 1s ease-in-out;
    }
`;

// Inject Tux animation styles
const tuxStyleElement = document.createElement('style');
tuxStyleElement.textContent = tuxAnimationCSS;
document.head.appendChild(tuxStyleElement);

// Initialize Tux animator when DOM is ready
let tuxAnimator;
document.addEventListener('DOMContentLoaded', function() {
    tuxAnimator = new TuxAnimator();
    
    // Add click handler to Tux
    document.getElementById('tuxCharacter').addEventListener('click', function() {
        this.classList.add('clicked');
        tuxAnimator.reactToClick();
        
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 1000);
    });
});

// Enhanced speech system
class TuxSpeechSystem {
    constructor() {
        this.messageQueue = [];
        this.isDisplaying = false;
        this.defaultDelay = 3000;
    }
    
    speak(message, duration = this.defaultDelay, priority = false) {
        const speechData = { message, duration, priority };
        
        if (priority) {
            this.messageQueue.unshift(speechData);
        } else {
            this.messageQueue.push(speechData);
        }
        
        this.processQueue();
    }
    
    async processQueue() {
        if (this.isDisplaying || this.messageQueue.length === 0) {
            return;
        }
        
        this.isDisplaying = true;
        const speechData = this.messageQueue.shift();
        
        await this.displayMessage(speechData.message, speechData.duration);
        
        this.isDisplaying = false;
        
        // Process next message in queue
        if (this.messageQueue.length > 0) {
            setTimeout(() => this.processQueue(), 500);
        }
    }
    
    displayMessage(message, duration) {
        return new Promise((resolve) => {
            const speechBubble = document.getElementById('speechBubble');
            const speechText = document.getElementById('speechText');
            
            // Hide current message
            speechBubble.classList.remove('show');
            
            setTimeout(() => {
                speechText.textContent = message;
                speechBubble.classList.add('show', 'bounce');
                
                // Start talking animation
                if (tuxAnimator) {
                    tuxAnimator.playAnimation('talking', duration);
                }
                
                setTimeout(() => {
                    speechBubble.classList.remove('bounce');
                    resolve();
                }, duration);
            }, 200);
        });
    }
    
    clearQueue() {
        this.messageQueue = [];
    }
    
    // Predefined messages for different contexts
    welcomeMessage() {
        this.speak("Welcome to your eye health journey! I'm Tux, and I'll be your guide through all the tests.", 4000, true);
    }
    
    encouragementMessage() {
        const messages = [
            "You're doing great! Keep it up!",
            "Excellent progress! Let's continue!",
            "Nice work! Ready for the next challenge?",
            "Perfect! You're really focused today!"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.speak(randomMessage, 2500);
    }
    
    helpMessage() {
        this.speak("Need help? Click on me anytime for guidance!", 3000);
    }
    
    completionMessage() {
        this.speak("Congratulations! You've completed all the tests. Your results are ready!", 4000, true);
    }
}

// Initialize speech system
let tuxSpeech;
document.addEventListener('DOMContentLoaded', function() {
    tuxSpeech = new TuxSpeechSystem();
    
    // Welcome message after a short delay
    setTimeout(() => {
        tuxSpeech.welcomeMessage();
    }, 2000);
});

// Export for use in main script
window.tuxAnimator = tuxAnimator;
window.tuxSpeech = tuxSpeech;

// Contextual animations based on user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate when user selects correct answer
    document.addEventListener('correctAnswer', function() {
        if (tuxAnimator) {
            tuxAnimator.reactToCorrectAnswer();
        }
    });
    
    // Animate when user selects incorrect answer
    document.addEventListener('incorrectAnswer', function() {
        if (tuxAnimator) {
            tuxAnimator.reactToIncorrectAnswer();
        }
    });
    
    // Animate when level is completed
    document.addEventListener('levelCompleted', function() {
        if (tuxAnimator) {
            tuxAnimator.reactToLevelComplete();
        }
    });
    
    // Encourage user periodically
    setInterval(() => {
        if (tuxSpeech && Math.random() > 0.7) { // 30% chance every interval
            tuxSpeech.encouragementMessage();
        }
    }, 30000); // Every 30 seconds
});

// Responsive animations for different screen sizes
function updateTuxForScreenSize() {
    const screenWidth = window.innerWidth;
    const tuxContainer = document.getElementById('tuxContainer');
    
    if (screenWidth < 768) {
        // Mobile adjustments
        tuxContainer.style.bottom = '10px';
        tuxContainer.style.right = '10px';
        tuxContainer.style.transform = 'scale(0.8)';
    } else {
        // Desktop
        tuxContainer.style.bottom = '20px';
        tuxContainer.style.right = '20px';
        tuxContainer.style.transform = 'scale(1)';
    }
}

// Listen for window resize
window.addEventListener('resize', updateTuxForScreenSize);
document.addEventListener('DOMContentLoaded', updateTuxForScreenSize);
