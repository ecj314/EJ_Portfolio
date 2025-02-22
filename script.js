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

    canvas.width = window.innerWidth * 0.6; // 60% of screen width  
    canvas.height = window.innerHeight * 0.4; // 40% of screen height  

    const colorScale = d3.scaleLinear()
        .domain([0, words.length - 1])
        .range(["#887561", "#b7aca0"]); // Gradient from dark to light brown

    const layout = d3.layout.cloud()
        .size([width, height])
        .words(words.map((d, i) => ({ text: d.text, size: d.size, color: colorScale(i) })))
        .padding(5)
        .rotate(() => (Math.random() > 0.5 ? 0 : 90)) // Some words rotated
        .font("Playfair Display")
        .fontSize(d => d.size)
        .on("end", draw);

    layout.start();
    
    function findPosition(word) {
    let x, y, attempts = 0, overlap;
    const padding = word.size * 2; // Increase padding for spacing

    do {
        x = Math.random() * (canvas.width - word.size * 5) + padding;
        y = Math.random() * (canvas.height - word.size * 3) + padding;

        // Ensure words don't exceed canvas width
        if (x + ctx.measureText(word.text).width > canvas.width - padding) {
            x = canvas.width - ctx.measureText(word.text).width - padding;
        }

        // Ensure words don't go beyond canvas height
        if (y + word.size > canvas.height - padding) {
            y = canvas.height - padding;
        }

        // Ensure words don’t overlap too much
        overlap = placedWords.some(w => 
            Math.abs(x - w.x) < word.size * 3 && 
            Math.abs(y - w.y) < word.size * 2
        );

        attempts++;
    } while (overlap && attempts < 100);

    return { x, y };
}
    function drawWord(word, x, y, color) {
        const margin = 10; // Add margin to prevent cutoff
        x = Math.max(margin, Math.min(x, canvas.width - ctx.measureText(word.text).width - margin));
        y = Math.max(word.size + margin, Math.min(y, canvas.height - margin));
    
        ctx.fillStyle = color;
        ctx.font = `${word.size}px Playfair Display`;
        ctx.fillText(word.text, x, y);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    lottie.loadAnimation({
        container: document.getElementById("coding-animation"), 
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "https://raw.githubusercontent.com/ecj314/EJ_Portfolio/refs/heads/main/Coding%20animation.json"
    });
});

