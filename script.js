document.addEventListener("DOMContentLoaded", function () {
    console.log("Portfolio section loaded");  // Debugging line
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach(item => {
        console.log("Processing portfolio item");  // Debugging line
        const bgColor = item.getAttribute("data-bg");
        const textColor = item.getAttribute("data-text");

        if (bgColor) {
            item.style.backgroundColor = bgColor;
        }
        if (textColor) {
            item.style.color = textColor;
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("Time Series Chart section loaded");  // Debugging line
    const ctx = document.getElementById("timeSeriesChart").getContext("2d");

    const fullData = [5, 4, 3, 2, 3, 4, 3, 4, 5, 6, 7, 6];
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let visibleData = Array(fullData.length).fill(null);

    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Attrition Rate %",
                data: visibleData,
                borderColor: "#887561",
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointRadius: 5,
                pointBackgroundColor: "#887561"
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: { y: { beginAtZero: true } }
        }
    });

    let index = 0;
    function revealData() {
        if (index < fullData.length) {
            visibleData[index] = fullData[index];
            chart.update();
            index++;
            setTimeout(revealData, 500);
        }
    }
    revealData();
});

// ========== LOTTIE ANIMATION ========== //
document.addEventListener("DOMContentLoaded", function () {
    console.log("Lottie animations initializing..."); // Debugging

    // Function to load a Lottie animation
    function loadLottieAnimation(containerId, jsonPath) {
        const container = document.getElementById(containerId);

        if (!container) {
            console.error(`❌ ERROR: Lottie animation container '${containerId}' not found!`);
            return;
        }

        const animation = lottie.loadAnimation({
            container: container,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: jsonPath,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        });

        animation.addEventListener("data_failed", function () {
            console.error(`❌ ERROR: Failed to load Lottie animation from ${jsonPath}`);
        });

        animation.addEventListener("DOMLoaded", function () {
            console.log(`✅ Animation '${containerId}' loaded successfully!`);
        });
    }

    // Load the "Building This Website" animation
    loadLottieAnimation("coding-animation", "https://cdn.jsdelivr.net/gh/ecj314/EJ_Portfolio/Website_Files/Coding%20animation.json");

    // Load the "Stock Market LLM Tool" animation
    loadLottieAnimation("llm-animation", "https://cdn.jsdelivr.net/gh/ecj314/EJ_Portfolio/Website_Files/LLM-Animation.json");
});


// JavaScript for the Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    function showSlide(index) {
        // Ensure the index wraps around
        currentIndex = (index + slides.length) % slides.length;

        // Remove "active" from all slides and add it to the current one
        slides.forEach((slide, idx) => {
            slide.classList.remove("active");
            if (idx === currentIndex) {
                slide.classList.add("active");
            }
        });
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener("click", () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentIndex + 1);
    });

    // Initialize the first slide
    showSlide(currentIndex);
});


document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".carousel-slide");

    slides.forEach((slide) => {
        let player = slide.querySelector("lottie-player");
        if (player) {
            slide.addEventListener("transitionstart", () => {
                player.play(); // Restart animation when slide appears
            });
        }
    });
});