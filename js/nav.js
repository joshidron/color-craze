document.addEventListener("DOMContentLoaded", () => {
    const featureCards = document.querySelectorAll(".feature-card");

    featureCards.forEach((card) => {
        let hoverTimeout;

        card.addEventListener("mouseenter", () => {
            hoverTimeout = setTimeout(() => {
                const featureName = card.querySelector("h3").textContent;
                speakText(featureName);
            }, 1000); // 1 second delay
        });

        card.addEventListener("mouseleave", () => {
            clearTimeout(hoverTimeout);
            speechSynthesis.cancel(); // Stop speaking when the mouse leaves
        });
    });

    function speakText(text) {
        speechSynthesis.cancel(); // Ensure only one speech instance is active

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1.2;  // Slightly faster for a playful tone
        utterance.pitch = 1.8; // Higher pitch for a cuter sound
        utterance.volume = 1;   // Full volume

        const voices = speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.name.includes("Google UK English Female")) || 
                          voices.find(voice => voice.name.includes("Google US English Female")) || 
                          voices[0];

        speechSynthesis.speak(utterance);
    }

    // Ensure voices are loaded before using
    function loadVoices() {
        const voices = speechSynthesis.getVoices();
        if (voices.length === 0) {
            setTimeout(loadVoices, 100);
        }
    }

    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial call
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".glass-nav");
    const gameContainer = document.querySelector(".container");

    // Ensure the sidebar appears above the cards without fixing its position
    sidebar.style.zIndex = "1000";

    // Apply will-change to optimize performance
    gameContainer.style.willChange = "transform";

    sidebar.addEventListener("mouseenter", () => {
        gameContainer.classList.add("shift-right");
    });

    sidebar.addEventListener("mouseleave", () => {
        gameContainer.classList.remove("shift-right");
    });

    // Optimized Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetElement = document.querySelector(this.getAttribute("href"));

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    let synth = window.speechSynthesis;
    let hoverTimeout;

    document.querySelectorAll('.nav-link').forEach(item => {
        item.addEventListener('mouseenter', function() {
            let text = this.getAttribute('data-text');

            hoverTimeout = setTimeout(() => {
                if (synth.speaking) {
                    synth.cancel();
                }
                let utterance = new SpeechSynthesisUtterance(text);
                synth.speak(utterance);
            }, 1000);
        });

        item.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
            if (synth.speaking) {
                synth.cancel();
            }
        });
    });
});

document.querySelector(".hamburger").addEventListener("click", function() {
    document.querySelector(".navbar").classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function () {
    let synth = window.speechSynthesis;
    let hoverTimeout;

    document.querySelectorAll('.nav-link').forEach(item => {
        item.addEventListener('mouseenter', function() {
            let text = this.getAttribute('data-text');

            hoverTimeout = setTimeout(() => {
                if (synth.speaking) {
                    synth.cancel();
                }
                let utterance = new SpeechSynthesisUtterance(text);
                synth.speak(utterance);
            }, 1000);
        });

        item.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
            if (synth.speaking) {
                synth.cancel();
            }
        });
    });
});


