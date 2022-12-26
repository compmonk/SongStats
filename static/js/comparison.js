const selectYears = $('#select-years')
selectYears.on("select2:select", handleChange)
selectYears.on("select2:unselect", handleChange)
selectYears.on("select2:clear", handleChange)
const selectAggregateFunction = d3.select("#aggregate-function")
selectAggregateFunction.on("change", handleChange)

const initialValues = [
    "1922",
    "1932",
    "1942",
    "1952",
    "1962",
    "1972",
    "1982",
    "1992",
    "2002",
    "2012",
    "2021"
]
let songsData = null


function plotCharts(years, aggregateFunction) {
    const selectedYears = songsData.filter(_ => years.includes(_["year"].toString()))
    const metrics = [
        "Acousticness",
        "Danceability",
        "Energy",
        "Instrumentalness",
        "Liveness",
        "Speechiness",
        "Valence",
        "Acousticness"
    ]

    const yearlyRadialPlotTrace = selectedYears.map(_ => ({
        r: metrics.map(metric => _[`${metric.toLowerCase()}_${aggregateFunction}`]),
        theta: metrics,
        name: _["year"],
        type: "scatterpolar",
        fill: "toself"
    }))

    const yearlyRadialPlotLayout = {
        title: `${toTitleCase(aggregateFunctionLabel[aggregateFunction])} of metrics over the years`,
        xaxis: {
            title: "Year"
        },
        yaxis: {
            title: "Number of Songs each Year"
        },
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 1]
            }
        },
        font: {
            color: fontColor,
        },
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor
    }

    Plotly.newPlot("yearly-radial-plot", yearlyRadialPlotTrace, yearlyRadialPlotLayout, {responsive: true})

    const yearlyLoudnessTempoPlotTrace = [{
        x: selectedYears.map(_ => _["year"]),
        y: selectedYears.map(_ => _[`loudness_${aggregateFunction}`]),
        type: "scatter",
        name: "Loudness"
    }, {
        x: selectedYears.map(_ => _["year"]),
        y: selectedYears.map(_ => _[`tempo_${aggregateFunction}`]),
        type: "scatter",
        name: "Tempo"
    }]

    const yearlyLoudnessTempoLayout = {
        title: `${toTitleCase(aggregateFunctionLabel[aggregateFunction])} of Loudness and Tempo over the years`,
        xaxis: {
            title: "Year"
        },
        yaxis: {
            title: "Number of Songs each Year"
        },
        polar: {
            radialaxis: {
                visible: true,
                range: [0, 1]
            }
        },
        font: {
            color: fontColor,
        },
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor
    }

    Plotly.newPlot("yearly-loudness-tempo-plot", yearlyLoudnessTempoPlotTrace, yearlyLoudnessTempoLayout, {responsive: true})


    const keyPlotTrace = [...Array(12)].map((n, key) => ({
        x: selectedYears.map(_ => _["year"]),
        y: selectedYears.map(_ => _[`key_${key}`] / _["total"] * 100.0),
        type: "bar",
        name: `Key ${key}`
    }))

    const keyPlotLayout = {
        title: "Musical Key distribution over the years",
        xaxis: {
            title: "Musical Keys"
        },
        yaxis: {
            title: "Number of Songs each for each key"
        },
        barmode: "stack",
        font: {
            color: fontColor,
        },
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor
    }

    Plotly.newPlot("key-plot", keyPlotTrace, keyPlotLayout, {responsive: true})

    const timeSignaturePlotTrace = [0, 1, 3, 4, 5].map(key => ({
        x: selectedYears.map(_ => _["year"]),
        y: selectedYears.map(_ => _[`time_signature_${key}`] / _["total"] * 100.0),
        type: "bar",
        name: `TS ${key}`
    }))

    const timeSignaturePlotLayout = {
        title: "Time Signature distribution over the years",
        xaxis: {
            title: "Time Signature"
        },
        yaxis: {
            title: "Number of Songs for each time signature"
        },
        barmode: "stack",
        font: {
            color: fontColor,
        },
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor
    }

    Plotly.newPlot("time-signature-plot", timeSignaturePlotTrace, timeSignaturePlotLayout, {responsive: true})


    const yearlyTotalPlotTrace = [{
        x: selectedYears.map(_ => _["year"]),
        y: selectedYears.map(_ => _["total"]),
        type: "scatterplot"
    }]

    const yearlyTotalPlotLayout = {
        title: "Total songs over the years",
        xaxis: {
            title: "Year"
        },
        yaxis: {
            title: "Number of Songs each Year"
        },
        font: {
            color: fontColor,
        },
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor
    }

    Plotly.newPlot("yearly-total-plot", yearlyTotalPlotTrace, yearlyTotalPlotLayout, {responsive: true})

    const yearlyExplicitLinePlotTrace = [{
        x: selectedYears.map(_ => _["year"]),
        y: selectedYears.map(_ => _["explicit_ratio"]),
        type: "scatter",
        name: "Explicity"
    }]

    const yearlyExplicitLinePlotLayout = {
        title: "Explicity over the years",
        xaxis: {
            title: "Year"
        },
        yaxis: {
            title: "% of Explicit Songs each Year"
        },
        font: {
            color: fontColor,
        },
        paper_bgcolor: backgroundColor,
        plot_bgcolor: backgroundColor
    }

    Plotly.newPlot("yearly-explicit-plot", yearlyExplicitLinePlotTrace, yearlyExplicitLinePlotLayout, {responsive: true})
}

function handleChange() {
    plotCharts(selectYears.val(), selectAggregateFunction.property("value"))
}

(() => {
    d3.json(url).then(data => {
        songsData = data
        $(document).ready(function () {
            selectYears.select2({
                data: data.map(_ => ({id: _["year"], text: _["year"]})),
                placeholder: "Select Years",
                maximumSelectionLength: 10,
                allowClear: true
            });

            selectYears.val(initialValues)
            selectYears.trigger('change');
        });
        plotCharts(initialValues, "mean")
    });
})()
