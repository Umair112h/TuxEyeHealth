// Color Blindness Test Configuration
// Easy to modify - just replace image URLs and correct answers
const COLOR_BLINDNESS_TESTS = [
    {
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUwIiBmaWxsPSIjNDQ5OTQ0Ii8+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwxMDApIj4KPGNpcmNsZSBjeD0iMjUiIGN5PSIyNSIgcj0iOCIgZmlsbD0iI0ZGNjY2NiIvPgo8Y2lyY2xlIGN4PSI3NSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjRkY2NjY2Ii8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iNzUiIHI9IjgiIGZpbGw9IiNGRjY2NjYiLz4KPGNpcmNsZSBjeD0iNzUiIGN5PSI3NSIgcj0iOCIgZmlsbD0iI0ZGNjY2NiIvPgo8L2c+Cjwvc3ZnPg==",
        correctAnswer: "8",
        description: "Red dots forming number 8 on green background"
    },
    {
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUwIiBmaWxsPSIjNjY5OTY2Ii8+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwNSwxMDUpIj4KPGNpcmNsZSBjeD0iNDUiIGN5PSIxNSIgcj0iNiIgZmlsbD0iI0ZGODg4OCIvPgo8Y2lyY2xlIGN4PSI0NSIgY3k9IjMwIiByPSI2IiBmaWxsPSIjRkY4ODg4Ii8+CjxjaXJjbGUgY3g9IjQ1IiBjeT0iNDUiIHI9IjYiIGZpbGw9IiNGRjg4ODgiLz4KPGNpcmNsZSBjeD0iNDUiIGN5PSI2MCIgcj0iNiIgZmlsbD0iI0ZGODg4OCIvPgo8Y2lyY2xlIGN4PSI0NSIgY3k9Ijc1IiByPSI2IiBmaWxsPSIjRkY4ODg4Ii8+CjwvZz4KPC9zdmc+",
        correctAnswer: "1",
        description: "Red dots forming number 1 on green background"
    },
    {
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUwIiBmaWxsPSIjOTk2NjY2Ii8+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwxMTApIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iNSIgZmlsbD0iIzY2RkY2NiIvPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjIwIiByPSI1IiBmaWxsPSIjNjZGRjY2Ii8+CjxjaXJjbGUgY3g9IjgwIiBjeT0iMjAiIHI9IjUiIGZpbGw9IiM2NkZGNjYiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSI0MCIgcj0iNSIgZmlsbD0iIzY2RkY2NiIvPgo8Y2lyY2xlIGN4PSI4MCIgY3k9IjQwIiByPSI1IiBmaWxsPSIjNjZGRjY2Ii8+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNjAiIHI9IjUiIGZpbGw9IiM2NkZGNjYiLz4KPC9nPgo8L3N2Zz4=",
        correctAnswer: "5",
        description: "Green dots forming number 5 on reddish background"
    },
    {
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUwIiBmaWxsPSIjRkZEREREIi8+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExMCwxMTApIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSIxNSIgcj0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjMwIiByPSI0IiBmaWxsPSIjMzMzMzMzIi8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iNDUiIHI9IjQiIGZpbGw9IiMzMzMzMzMiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0NSIgcj0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8Y2lyY2xlIGN4PSI2NSIgY3k9IjQ1IiByPSI0IiBmaWxsPSIjMzMzMzMzIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNjAiIHI9IjQiIGZpbGw9IiMzMzMzMzMiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI3NSIgcj0iNCIgZmlsbD0iIzMzMzMzMyIvPgo8L2c+Cjwvc3ZnPg==",
        correctAnswer: "7",
        description: "Dark dots forming number 7 on light background"
    },
    {
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE1MCIgY3k9IjE1MCIgcj0iMTUwIiBmaWxsPSIjNjY5OTk5Ii8+CjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExMCwxMDUpIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSIyMCIgcj0iNSIgZmlsbD0iI0ZGQkI2NiIvPgo8Y2lyY2xlIGN4PSI0MCIgY3k9IjQ1IiByPSI1IiBmaWxsPSIjRkZCQjY2Ii8+CjxjaXJjbGUgY3g9IjIwIiBjeT0iNzAiIHI9IjUiIGZpbGw9IiNGRkJCNjYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI3MCIgcj0iNSIgZmlsbD0iI0ZGQkI2NiIvPgo8Y2lyY2xlIGN4PSI2MCIgY3k9IjcwIiByPSI1IiBmaWxsPSIjRkZCQjY2Ii8+CjwvZz4KPC9zdmc+",
        correctAnswer: "3",
        description: "Orange dots forming number 3 on blue-green background"
    }
];

// Vision Conditions Configuration
const VISION_CONDITIONS = {
    normal: {
        name: "Normal Vision",
        description: "With normal vision (20/20), light focuses directly on the retina, providing clear vision at all distances. Objects appear sharp and well-defined.",
        symptoms: [
            "Clear vision at all distances",
            "No difficulty reading or seeing far objects",
            "Colors appear vibrant and distinct",
            "No eye strain during normal activities"
        ],
        videoUrl: null // Replace with actual video URL
    },
    myopia: {
        name: "Myopia (Nearsightedness)",
        description: "In myopia, the eye is longer than normal or the cornea is too curved, causing light to focus in front of the retina. This results in blurred distance vision.",
        symptoms: [
            "Blurred vision when looking at distant objects",
            "Clear vision for close-up tasks",
            "Squinting to see far objects",
            "Headaches from eye strain",
            "Difficulty seeing the blackboard or road signs"
        ],
        videoUrl: null // Replace with actual video URL
    },
    hyperopia: {
        name: "Hyperopia (Farsightedness)",
        description: "In hyperopia, the eye is shorter than normal or the cornea is too flat, causing light to focus behind the retina. This can make close-up vision blurry.",
        symptoms: [
            "Blurred vision for close-up tasks",
            "Eye strain when reading or doing close work",
            "Headaches after close work",
            "Difficulty focusing on nearby objects",
            "Good distance vision (in mild cases)"
        ],
        videoUrl: null // Replace with actual video URL
    },
    astigmatism: {
        name: "Astigmatism",
        description: "Astigmatism occurs when the cornea or lens has an irregular shape, causing light to focus at multiple points. This results in blurred or distorted vision at all distances.",
        symptoms: [
            "Blurred or distorted vision at all distances",
            "Eye strain and discomfort",
            "Headaches",
            "Difficulty seeing at night",
            "Squinting to try to see clearly"
        ],
        videoUrl: null // Replace with actual video URL
    },
    presbyopia: {
        name: "Presbyopia",
        description: "Presbyopia is an age-related condition where the lens of the eye becomes less flexible, making it difficult to focus on close objects. It typically begins around age 40.",
        symptoms: [
            "Difficulty reading small print",
            "Need to hold reading material farther away",
            "Eye strain when doing close work",
            "Headaches after reading or close work",
            "Need for brighter lighting when reading"
        ],
        videoUrl: null // Replace with actual video URL
    }
};

// Test Images Configuration
// To replace test images, update the URLs below
const TEST_IMAGE_URLS = {
    colorBlindness: {
        // Format: "test1": "URL_TO_YOUR_IMAGE"
        test1: "https://example.com/color-test-1.jpg",
        test2: "https://example.com/color-test-2.jpg",
        test3: "https://example.com/color-test-3.jpg",
        test4: "https://example.com/color-test-4.jpg",
        test5: "https://example.com/color-test-5.jpg"
    }
};

// Video URLs Configuration
const EDUCATION_VIDEOS = {
    normal: {
        url: "https://www.youtube.com/embed/NORMAL_VISION_VIDEO_ID",
        title: "How Normal Vision Works"
    },
    myopia: {
        url: "https://www.youtube.com/embed/MYOPIA_VIDEO_ID",
        title: "Understanding Myopia (Nearsightedness)"
    },
    hyperopia: {
        url: "https://www.youtube.com/embed/HYPEROPIA_VIDEO_ID",
        title: "Understanding Hyperopia (Farsightedness)"
    },
    astigmatism: {
        url: "https://www.youtube.com/embed/ASTIGMATISM_VIDEO_ID",
        title: "Understanding Astigmatism"
    },
    presbyopia: {
        url: "https://www.youtube.com/embed/PRESBYOPIA_VIDEO_ID",
        title: "Understanding Presbyopia"
    }
};

// Tux Messages Configuration
const TUX_MESSAGES = {
    level1: {
        intro: "Hello! I'm Tux, your friendly eye health guide. Let's embark on this vision journey together!",
        instructions: "We'll go through several tests to check different aspects of your vision. Don't worry, it's completely safe and educational!",
        encouragement: "Ready to learn about your eyes? Let's start!"
    },
    level2: {
        intro: "Time for our color vision test! This will help us understand how well you can distinguish different colors.",
        instructions: "Look at each image carefully and tell me what number you see. Take your time!",
        encouragement: "You're doing great! Each test teaches us something new about your vision."
    },
    level3: {
        intro: "Now let's check your visual acuity - how clearly you can see details at different distances.",
        instructions: "We'll test both your distance and near vision. Cover one eye at a time and read the smallest line you can see clearly.",
        encouragement: "Excellent! Your eyes are working hard to show you the world clearly."
    },
    level4: {
        intro: "Do you wear glasses or contact lenses? Let's learn about your prescription and what it means!",
        instructions: "Enter your prescription details if you have them. Don't worry if you don't - we can still learn a lot!",
        encouragement: "Understanding your prescription helps you take better care of your eyes."
    },
    level5: {
        intro: "Now I'll show you how different eye conditions affect vision. This helps us understand and empathize with various visual experiences.",
        instructions: "Click through each condition to see educational content and simulations.",
        encouragement: "Knowledge is power! Understanding these conditions helps us appreciate healthy vision."
    },
    level6: {
        intro: "Fantastic! You've completed all the tests. Let's review your results and discuss recommendations.",
        instructions: "Remember, this is educational screening only. Always consult an eye care professional for proper diagnosis.",
        encouragement: "Great job completing your eye health journey! Your eyes deserve the best care."
    }
};

// Scoring System Configuration
const SCORING_CONFIG = {
    colorVision: {
        excellent: { min: 90, message: "Excellent color vision!" },
        good: { min: 70, message: "Good color vision with minor variations." },
        fair: { min: 50, message: "Fair color vision - consider professional testing." },
        poor: { min: 0, message: "Possible color vision deficiency - recommend professional evaluation." }
    },
    visualAcuity: {
        excellent: { lines: [7, 8], message: "Excellent visual acuity!" },
        good: { lines: [5, 6], message: "Good visual acuity." },
        fair: { lines: [3, 4], message: "Fair visual acuity - may benefit from correction." },
        poor: { lines: [1, 2], message: "Significant visual impairment - recommend professional evaluation." }
    }
};

// Customization Guidelines
const CUSTOMIZATION_NOTES = {
    colorBlindnessImages: "To add your own color blindness test images, replace the base64 encoded SVGs in COLOR_BLINDNESS_TESTS array with your image URLs and update the correctAnswer values.",
    
    visionConditionVideos: "Replace the videoUrl values in VISION_CONDITIONS with your educational video URLs. Use YouTube embed format or direct video file URLs.",
    
    tuxMessages: "Customize Tux's personality by editing the messages in TUX_MESSAGES. You can make him more formal, playful, or educational based on your audience.",
    
    scoringCriteria: "Adjust the scoring thresholds in SCORING_CONFIG to match your desired sensitivity for detecting vision issues.",
    
    styling: "All visual customization can be done through the CSS file. Look for color variables, animation timings, and layout properties to match your brand.",
    
    additionalTests: "To add more test types, extend the COLOR_BLINDNESS_TESTS array and add corresponding level handling in the main script."
};

// Export configuration for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        COLOR_BLINDNESS_TESTS,
        VISION_CONDITIONS,
        TEST_IMAGE_URLS,
        EDUCATION_VIDEOS,
        TUX_MESSAGES,
        SCORING_CONFIG,
        CUSTOMIZATION_NOTES
    };
}
