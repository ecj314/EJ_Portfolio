document.addEventListener("DOMContentLoaded", function () {
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach(item => {
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
    const ctx = document.getElementById("timeSeriesChart").getContext("2d");

    // Full dataset but initially hidden
    const fullData = [5,4,3,2,3,4,3,4,5,6,7,6];
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"];

    // Start with an empty dataset
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
            animation: false, // Disable default animation
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Animate data appearing from left to right
    let index = 0;
    function revealData() {
        if (index < fullData.length) {
            visibleData[index] = fullData[index]; // Reveal one data point
            chart.update();
            index++;
            setTimeout(revealData, 500); // Delay between points
        }
    }

    revealData(); // Start animation
});

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("wordCloudCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;  // Ensure the canvas matches container size
    canvas.height = 300;

    const words = [
        { text: "Gen AI", size: 18 },
        { text: "Blockchain", size: 19 },
        { text: "IoT", size: 20 },
        { text: "NLP", size: 15 },
        { text: "Machine Learning", size: 22},
        { text: "Automation", size: 24 },
        { text: "Python", size: 24 },
        { text: "SQL", size: 16 },
        { text: "Power BI", size: 27 },
        { text: "GCP", size: 24 },
    ];

    let index = 0;
    let placedWords = [];

    function getGradientColor(index, totalWords) {
        const darkBrown = [136, 117, 97];  // RGB for #887561
        const lightBrown = [183, 172, 160];  // RGB for #b7aca0

        let r = darkBrown[0] + ((lightBrown[0] - darkBrown[0]) * index / totalWords);
        let g = darkBrown[1] + ((lightBrown[1] - darkBrown[1]) * index / totalWords);
        let b = darkBrown[2] + ((lightBrown[2] - darkBrown[2]) * index / totalWords);

        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
    }

    function drawWord(word, x, y, color) {
        ctx.fillStyle = color;
        ctx.font = `${word.size}px Playfair Display`;
        ctx.fillText(word.text, x, y);
    }

    function findPosition(word) {
        let x, y, attempts = 0, overlap;
        const padding = 20;  // More padding to prevent cutoff

        do {
            x = Math.random() * (canvas.width - word.size * 4) + padding;
            y = Math.random() * (canvas.height - word.size * 2) + word.size + padding;

            // Check for overlap
            overlap = placedWords.some(w =>
                Math.abs(x - w.x) < w.text.length * 10 &&
                Math.abs(y - w.y) < word.size + 5
            );

            attempts++;
        } while (overlap && attempts < 50);

        return { x, y };
    }

    function animateWordCloud() {
        if (index < words.length) {
            const word = words[index];
            const { x, y } = findPosition(word);

            // Ensure the word stays within the canvas
            if (x + ctx.measureText(word.text).width > canvas.width - 10) {
                x = canvas.width - ctx.measureText(word.text).width - 10;
            }
            if (y - word.size < 10) {
                y = word.size + 10;
            }

            placedWords.push({ x, y, text: word.text });

            const color = getGradientColor(index, words.length);
            drawWord(word, x, y, color);

            index++;
            setTimeout(animateWordCloud, 500);
        }
    }

    animateWordCloud();
});

document.addEventListener("DOMContentLoaded", function () {
    lottie.loadAnimation({
        container: document.getElementById("coding-animation"), // The div where the animation will appear
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "coding animation.json" // Replace with the path to your downloaded Lottie JSON file
    });
});

