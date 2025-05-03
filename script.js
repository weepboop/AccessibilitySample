console.log("Script active.");

const increaseBtn = document.getElementById('increaseText');
const decreaseBtn = document.getElementById('decreaseText');
const readTextBtn = document.getElementById('readText');
const stopTextBtn = document.getElementById('stopText');
const translateTextBtn = document.getElementById('translateText');
const contentText = document.querySelector('.content-box');
const root = document.documentElement;

// Adjust text size
function adjustFontSize(change) {
    const currentSize = parseFloat(getComputedStyle(root).fontSize);
    root.style.fontSize = (currentSize + change) + "px";
}

increaseBtn.addEventListener('click', () => adjustFontSize(2));
decreaseBtn.addEventListener('click', () => adjustFontSize(-2));

// High contrast toggle
const toggleContrastBtn = document.getElementById('toggleContrast');

toggleContrastBtn.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// Text-to-speech
readTextBtn.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(contentText.innerText);

    // Show the stop button
    stopTextBtn.style.display = 'inline-block';

    // Hide button when speech ends
    utterance.onend = () => {
        stopTextBtn.style.display = 'none';
    };

    speechSynthesis.cancel(); // cancel ongoing speech
    speechSynthesis.speak(utterance);
});

// Stop reading
stopTextBtn.addEventListener('click', () => {
    speechSynthesis.cancel();
    stopTextBtn.style.display = 'none';
});

// Translate text to another language
translateTextBtn.addEventListener('click', async function() {
    const targetLanguage = 'es';  // Example: Spanish ('es'), can be changed to other languages
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(contentText.innerText)}&langpair=en|${targetLanguage}`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.responseData) {
            contentText.innerText = data.responseData.translatedText;
        } else {
            alert("Translation failed. Please try again.");
        }
    } catch (error) {
        console.error("Error with translation:", error);
        alert("Error occurred while translating.");
    }
});
