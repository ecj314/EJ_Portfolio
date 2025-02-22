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

    const width = 400, height = 300;

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

    function draw(words) {
        const svg = d3.select("#wordCloudContainer")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        svg.selectAll("text")
            .data(words)
            .enter().append("text")
            .style("fill", d => d.color)
            .attr("text-anchor", "middle")
            .style("font-family", "Playfair Display")
            .style("font-size", d => `${d.size}px`)
            .attr("opacity", 0)
            .transition()
            .duration(500)
            .attr("opacity", 1)
            .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
            .text(d => d.text);
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

