// =========================================
// KALASETU - STEP 2
// =========================================


document.addEventListener("DOMContentLoaded", function () {

    console.log("Kalasetu has started!");


    // =====================================
    // GET HTML ELEMENTS
    // =====================================

    const craftImage = document.getElementById("craftImage");

    const imagePreview =
        document.getElementById("imagePreview");

    const imagePreviewContainer =
        document.getElementById("imagePreviewContainer");

    const storyInput =
        document.getElementById("storyInput");

    const storyLanguage =
        document.getElementById("storyLanguage");

    const voiceButton =
        document.getElementById("voiceButton");

    const voiceStatus =
        document.getElementById("voiceStatus");

    const createCraftButton =
        document.getElementById("createCraftButton");

    const craftError =
        document.getElementById("craftError");
        const productImage =
    document.getElementById("productImage");

const productImageContainer =
    document.getElementById("productImageContainer");

const productImagePlaceholder =
    document.getElementById("productImagePlaceholder");


    // =====================================
    // 1. IMAGE UPLOAD
    // =====================================

    craftImage.addEventListener("change", function () {

        const file = craftImage.files[0];


        // If user didn't select anything

        if (!file) {
            return;
        }


        // Check whether selected file is an image

        if (!file.type.startsWith("image/")) {

            craftError.textContent =
                "Please choose an image file.";

            return;
        }


        // Create temporary URL for image

        const imageURL =
            URL.createObjectURL(file);


        // Put image inside preview

        imagePreview.src = imageURL;


        // Show preview

        imagePreviewContainer.style.display = "block";


        // Remove error

        craftError.textContent = "";

    });


    // =====================================
    // 2. SPEECH RECOGNITION
    // =====================================

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    let recognition = null;


    if (SpeechRecognition) {

        recognition = new SpeechRecognition();

        recognition.continuous = false;

        recognition.interimResults = false;


        // When speech recognition gets result

        recognition.onresult = function (event) {

            const transcript =
                event.results[0][0].transcript;


            // Put spoken words into textarea

            storyInput.value +=
                (storyInput.value ? " " : "") +
                transcript;


            voiceStatus.textContent =
                "Story captured successfully.";

        };


        // When recognition ends

        recognition.onend = function () {

            voiceButton.classList.remove("recording");

            voiceButton.textContent =
                "🎙️ Speak Your Story";

        };


        // If there is an error

        recognition.onerror = function () {

            voiceButton.classList.remove("recording");

            voiceButton.textContent =
                "🎙️ Speak Your Story";

            voiceStatus.textContent =
                "Could not capture your voice. Please try again.";

        };


    } else {

        voiceButton.disabled = true;

        voiceButton.textContent =
            "🎙️ Voice not supported";

    }


    // =====================================
    // 3. MICROPHONE BUTTON
    // =====================================

    voiceButton.addEventListener("click", function () {

        if (!recognition) {
            return;
        }


        // Get selected language

        const language =
            storyLanguage.value;


        // Set speech recognition language

        if (language === "hindi") {

            recognition.lang = "hi-IN";

        } else if (language === "kannada") {

            recognition.lang = "kn-IN";

        } else {

            recognition.lang = "en-IN";

        }


        // Start listening

        recognition.start();


        voiceButton.classList.add("recording");

        voiceButton.textContent =
            "🔴 Listening...";

        voiceStatus.textContent =
            "Speak now...";

    });


    // =====================================
    // 4. CREATE BUTTON
    // =====================================

    createCraftButton.addEventListener("click", function () {

        const story =
            storyInput.value.trim();


        const selectedLanguage =
            storyLanguage.value;


        // Check image

        if (!craftImage.files[0]) {

            craftError.textContent =
                "Please upload a photo of your craft.";

            return;
        }


        // Check story

        if (!story) {

            craftError.textContent =
                "Please tell us the story of your craft.";

            return;
        }


        // Everything is okay

        craftError.textContent = "";


        console.log("Craft image:", craftImage.files[0]);

        console.log("Story:", story);

        console.log("Language:", selectedLanguage);


        // Save data temporarily

        // =====================================
// SHOW IMAGE IN YOUR PRODUCT
// =====================================

productImage.src = imagePreview.src;

productImage.style.display = "block";

productImagePlaceholder.style.display = "none";

productImageContainer.classList.add("has-image");


// =====================================
// SAVE STORY AND LANGUAGE
// =====================================

localStorage.setItem(
    "kalasetuStory",
    story
);

localStorage.setItem(
    "kalasetuLanguage",
    selectedLanguage
);


// =====================================
// MOVE TO YOUR PRODUCT
// =====================================

document
    .querySelector(".product-section")
    .scrollIntoView({
        behavior: "smooth"
    });

    });

});
