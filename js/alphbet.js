let selectedColor = 'white'; // Default selected color
        let originalColor = '#007bff'; // Original color of the alphabet letters
        let clickTimeouts = {}; // Store timeouts for each alphabet to manage speech delay

        // Function to change the selected color
        function selectColor(color) {
            selectedColor = color;
        }

        // Alphabet to word mapping
        const alphabetWords = {
            A: 'Apple',
            B: 'Ball',
            C: 'Cat',
            D: 'Dog',
            E: 'Eggs',
            F: 'Fish',
            G: 'Goat',
            H: 'Horse',
            I: 'Ice-Cream',
            J: 'Juice',
            K: 'Kite',
            L: 'Lion',
            M: 'Monkey',
            N: 'Nest',
            O: 'Orange',
            P: 'Paint',
            Q: 'Queen',
            R: 'Rose',
            S: 'Sun',
            T: 'Tiger',
            U: 'Umbrella',
            V: 'Violin',
            W: 'Whale',
            X: 'Xylophone',
            Y: 'Yellow',
            Z: 'Zebra'
        };

        // Function to make the browser speak the alphabet and its word
        function speakAlphabet(letter) {
            const word = alphabetWords[letter];
            
            // Cancel any ongoing speech synthesis
            speechSynthesis.cancel();
            
            // Create a new utterance and speak it
            const utterance = new SpeechSynthesisUtterance(`${letter} for ${word}`);
            speechSynthesis.speak(utterance);
        }

        // Function to handle click or keyboard input
        function handleInput(letter) {
            // Clear any existing timeout to reset the interval
            if (clickTimeouts[letter]) {
                clearTimeout(clickTimeouts[letter]);
            }

            // Set the background color of the clicked alphabet
            const alphabetDiv = document.getElementById(letter);
            if (alphabetDiv) {
                alphabetDiv.style.backgroundColor = selectedColor;

                // Set a timeout to reset the color back to the original color after 2 seconds
                clickTimeouts[letter] = setTimeout(() => {
                    if (alphabetDiv) {
                        alphabetDiv.style.backgroundColor = originalColor;
                    }
                }, 1000); // 2000 milliseconds (2 seconds)
            }

            // Speak the alphabet and corresponding word immediately
            speakAlphabet(letter);

            // Display the word for 1 second
            const wordDisplay = document.getElementById('word-display');

            // Show the word
            wordDisplay.textContent = `${letter} for ${alphabetWords[letter]}`;
            wordDisplay.style.display = 'block'; // Show the div

            // Hide the word after 1 second
            setTimeout(() => {
                wordDisplay.style.display = 'none'; // Hide the div
            }, 3000); // 1000 milliseconds (1 second)
        }

        // Adding click event listeners to each alphabet div
        document.querySelectorAll('.alphabet').forEach(alphabet => {
            alphabet.addEventListener('click', function() {
                handleInput(this.innerText); // Handle click event
            });
        });

        // Adding keyboard input functionality
        document.addEventListener('keydown', function(event) {
            const key = event.key.toUpperCase(); // Convert key to uppercase (since we have capital letters)
            if (alphabetWords[key]) { // Check if the key corresponds to an alphabet
                handleInput(key); // Handle keyboard input
            }
        });