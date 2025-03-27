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


// <!-- JavaScript for Slider -->

const slider = document.querySelector('.slider');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;

        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        // Add smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });


