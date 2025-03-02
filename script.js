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

// ========== WORD CLOUD (D3.js) ========== //
document.addEventListener("DOMContentLoaded", function () {
    console.log("Word Cloud section loaded");  // Debugging line
    const words = [
        { text: "Gen AI", size: 40 },
        { text: "Blockchain", size: 35 },
        { text: "IoT", size: 30 },
        { text: "NLP", size: 25 },
        { text: "Machine Learning", size: 45 },
        { text: "Automation", size: 38 },
        { text: "Python", size: 32 },
        { text: "SQL", size: 28 },
        { text: "Power BI", size: 42 },
        { text: "GCP", size: 36 }
    ];

    const canvas= document.getElementById("wordCloudCanvas");
    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get canvas context!");
        return;
    }

    canvas.width = window.innerWidth * 0.6;  // 60% of screen width  
    canvas.height = window.innerHeight * 0.4; // 40% of screen height  

    const placedWords = [];
    let index = 0;

    function findPosition(word) {
        console.log("Finding position for word:", word.text);  // Debugging line
        let x, y, attempts = 0, overlap;
        const padding = word.size * 1.5; // Increase padding for spacing

        do {
            x = Math.random() * (canvas.width - word.size * 5) + padding;
            y = Math.random() * (canvas.height - word.size * 3) + padding;

            // Ensure words stay inside the canvas
            if (x + ctx.measureText(word.text).width > canvas.width - padding) {
                x = canvas.width - ctx.measureText(word.text).width - padding;
            }
            if (y + word.size > canvas.height - padding) {
                y = canvas.height - padding;
            }

            // Check for overlap
            overlap = placedWords.some(w =>
                Math.abs(x - w.x) < word.size * 3 &&
                Math.abs(y - w.y) < word.size * 2
            );

            attempts++;
        } while (overlap && attempts < 100);

        return { x, y };
    }

    function drawWord(word, x, y, color) {
        console.log("Drawing word:", word.text);  // Debugging line
        ctx.fillStyle = color;
        ctx.font = `${word.size}px Playfair Display`;
        ctx.fillText(word.text, x, y);
    }

    function animateWordCloud() {
        if (index < words.length) {
            const word = words[index];
            const { x, y } = findPosition(word);

            placedWords.push({ x, y, text: word.text });

            const colors = ["#887561", "#9e8f7a", "#b7aca0"]; // Gradient effect
            const color = colors[index % colors.length];

            drawWord(word, x, y, color);
            index++;

            setTimeout(animateWordCloud, 500); // Delay before next word
        }
    }

    animateWordCloud();
});

// ========== LOTTIE ANIMATION ========== //
document.addEventListener("DOMContentLoaded", function () {
    console.log("Lottie animation section loaded");  // Debugging line
    const animationContainer = document.getElementById("coding-animation");

    if (!animationContainer) {
        console.error("❌ ERROR: Lottie animation container not found! Ensure you have <div id='coding-animation'></div> in your HTML.");
        return;
    }

    const animation = lottie.loadAnimation({
        container: animationContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://cdn.jsdelivr.net/gh/ecj314/EJ_Portfolio@main/Coding%20animation.json",
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    });

    animation.addEventListener("data_failed", function () {
        console.error("❌ ERROR: Animation failed to load! Check JSON URL and format.");
    });

    animation.addEventListener("DOMLoaded", function () {
        console.log("✅ Animation successfully loaded!");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".carousel-slide");
    const container = document.querySelector(".carousel-container");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let index = 0;

    function showSlide(newIndex) {
        if (newIndex < 0) {
            index = slides.length - 1; // Go to last slide if moving backward from first
        } else if (newIndex >= slides.length) {
            index = 0; // Go back to first slide when reaching the end
        } else {
            index = newIndex;
        }

        const offset = -index * 100 + "%";
        container.style.transform = `translateX(${offset})`;
    }

    // Ensure buttons exist before adding event listeners
    if (prevButton && nextButton) {
        prevButton.addEventListener("click", function () {
            showSlide(index - 1);
        });

        nextButton.addEventListener("click", function () {
            showSlide(index + 1);
        });
    }

    showSlide(index); // Initialize carousel
});



