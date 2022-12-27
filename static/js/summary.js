d3.select("#aggregate-function").on("change", handleChange)

function plotCharts(aggregateFunction) {
    d3.json(url).then(data => {
        const metrics = [
            "acousticness",
            "danceability",
            "energy",
            "instrumentalness",
            "liveness",
            "speechiness",
            "valence",
        ]


        const traces = metrics.map(metric => ({
            x: data.map(_ => _["year"]),
            y: data.map(_ => _[`${metric}_${aggregateFunction}`]),
            type: "scatter",
            name: toTitleCase(metric)
        }))

        const summaryLinePlotLayout = {
            title: `${aggregateFunctionLabel[aggregateFunction]} of Acousticness, Danceability, Energy, Instrumentalness, Liveness, Speechiness, Valence over the years`,
            xaxis: {
                title: "Year"
            },
            font: {
                color: fontColor,
            },
            paper_bgcolor: backgroundColor,
            plot_bgcolor: backgroundColor
        }

        Plotly.newPlot("summary-line-plot", traces, summaryLinePlotLayout, {responsive: true})

        const loudnessTempoLinePlotTrace = [{
            x: data.map(_ => _["year"]),
            y: data.map(_ => _[`loudness_${aggregateFunction}`]),
            type: "scatter",
            name: "Loudness"
        }, {
            x: data.map(_ => _["year"]),
            y: data.map(_ => _[`tempo_${aggregateFunction}`]),
            type: "scatter",
            name: "Tempo"
        }, {
            x: data.map(_ => _["year"]),
            y: data.map(_ => _[`duration_${aggregateFunction}`]),
            type: "scatter",
            name: "Duration (s)"
        }]

        const loudnessTempoLinePlotLayout = {
            title: `${aggregateFunctionLabel[aggregateFunction]} of Loudness and Tempo over the years`,
            xaxis: {
                title: "Year"
            },
            font: {
                color: fontColor,
            },
            paper_bgcolor: backgroundColor,
            plot_bgcolor: backgroundColor
        }

        Plotly.newPlot("loudness-tempo-line-plot", loudnessTempoLinePlotTrace, loudnessTempoLinePlotLayout, {responsive: true})

        const explicitLinePlotTrace = [{
            x: data.map(_ => _["year"]),
            y: data.map(_ => _["explicit_ratio"]),
            type: "scatter",
            name: "Explicity"
        }]

        const explicitLinePlotLayout = {
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

        Plotly.newPlot("explicit-line-plot", explicitLinePlotTrace, explicitLinePlotLayout, {responsive: true})

        const totalLinePlotTrace = [{
            x: data.map(_ => _["year"]),
            y: data.map(_ => _["total"]),
            type: "scatter",
            name: "Total Songs"
        }]

        const totalLinePlotLayout = {
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

        Plotly.newPlot("total-line-plot", totalLinePlotTrace, totalLinePlotLayout, {responsive: true})


    })

}

function handleChange(event) {
    const aggregateFunction = event.target.value
    plotCharts(aggregateFunction)
}

(() => {
    plotCharts("mean")
})()