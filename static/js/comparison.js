const url = "/api/summary.json"
d3.json(url).then(data => {
    console.log(data)
})