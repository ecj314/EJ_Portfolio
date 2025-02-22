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
    const width = window.innerWidth * 0.6;
    const height = window.innerHeight * 0.4;
    
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

    const colorScale = d3.scaleLinear()
        .domain([0, words.length - 1])
        .range(["#887561", "#b7aca0"]);

    const layout = d3.layout.cloud()
        .size([width, height])
        .words(words.map((d, i) => ({ text: d.text, size: d.size, color: colorScale(i) })))
        .padding(5)
        .rotate(() => (Math.random() > 0.5 ? 0 : 90))
        .font("Playfair Display")
        .fontSize(d => d.size)
        .on("end", draw);

    layout.start();

    function draw(words) {
        d3.select("#wordCloudCanvas").html(""); // Clear existing content before drawing

        d3.select("#wordCloudCanvas")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`)
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", d => `${d.size}px`)
            .style("fill", d => d.color)
            .attr("text-anchor", "middle")
            .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
            .text(d => d.text);
    }
});

// ========== LOTTIE ANIMATION ========== //
document.addEventListener("DOMContentLoaded", function () {
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
