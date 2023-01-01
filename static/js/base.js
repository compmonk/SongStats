const lightModeButton = d3.select("#light-mode")
const darkModeButton = d3.select("#dark-mode")
const root = document.querySelector(":root")
const html = d3.select("html")
const images = d3.selectAll("img")

const theme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
const plots = d3.selectAll(".plot")

lightModeButton.on("click.tr", transitionToLightMode);
lightModeButton.on("click.up", updatePlotly);
darkModeButton.on("click.tr", transitionToDarkMode);
darkModeButton.on("click.up", updatePlotly);

const aggregateFunctionLabel = {
    mean: "Average",
    min: "Minimum",
    max: "Maximum",
    var: "Variance",
    std: "Standard Deviation"
};

const darkModeColors = {
    "--border-color": "#495057",
    "--background-color": "#212529",
    "--font-color": "#FFFFFF"
}

const lightModeColors = {
    "--border-color": "#dee2e6",
    "--background-color": "#FFFFFF",
    "--font-color": "#000000",
}

let backgroundColor = lightModeColors["--background-color"];
let fontColor = lightModeColors["--font-color"];

function toTitleCase(string) {
    return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`
}

function transitionToLightMode() {
    html.attr("data-bs-theme", null)
    lightModeButton.classed("hide", true)
    darkModeButton.classed("hide", false)
    Object.entries(lightModeColors).map(([key, value]) => root.style.setProperty(key, value))
    backgroundColor = lightModeColors["--background-color"];
    fontColor = lightModeColors["--font-color"];
    images.select(function () {
        const img = d3.select(this)
        img.property("src", img.property("src").replace("dark", "light"))
    })
    localStorage.setItem("theme", "light")
}

function transitionToDarkMode() {
    html.attr("data-bs-theme", "dark")
    lightModeButton.classed("hide", false)
    darkModeButton.classed("hide", true)
    Object.entries(darkModeColors).map(([key, value]) => root.style.setProperty(key, value))
    backgroundColor = darkModeColors["--background-color"];
    fontColor = darkModeColors["--font-color"];
    images.select(function () {
        const img = d3.select(this)
        img.property("src", img.property("src").replace("light", "dark"))
    })
    localStorage.setItem("theme", "dark")
}

function updatePlotly() {
    plots.select(function () {
        Plotly.relayout(this, {
            font: {
                color: fontColor,
            },
            paper_bgcolor: backgroundColor,
            plot_bgcolor: backgroundColor
        })
    })
}

(() => {
    if (theme === "light") {
        transitionToLightMode();
    } else {
        transitionToDarkMode()
    }
})()