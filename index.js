document.addEventListener('DOMContentLoaded', init)

function init() {
  const results = document.getElementById('results')

  document.getElementById('myForm').onsubmit = function (e) {
    myFunction(e)
  }

  document.getElementById('country').onfocus = function (e) {
    reset(e)
  }

  function myFunction(e) {
    e.preventDefault()
    let countryValue = document.getElementById('country').value

    if (countryValue) {
      fetch('https://api.covid19api.com/summary')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          let resultsText = ''
          data.Countries.forEach((item) => {
            if (item.Country.toLowerCase() === countryValue.toLowerCase()) {
              resultsText += '<h3>' + item.Country + '</h3>'
              resultsText += '<h3>New Confirmed: ' + item.NewConfirmed + '</h3>'
              resultsText += '<h3>New Deaths: ' + item.NewDeaths + '</h3>'
              resultsText += '<h3>New Recovered: ' + item.NewRecovered + '</h3>'
              resultsText +=
                '<h3>Tota Confirmed: ' + item.TotalConfirmed + '</h3>'
              resultsText += '<h3>Total Deaths: ' + item.TotalDeaths + '</h3>'
              resultsText +=
                '<h3>Total Recovered: ' + item.TotalRecovered + '</h3>'
              console.log(item)
            }
          })
          results.innerHTML = resultsText
        })
    }
  }

  function reset(e) {
    results.innerHTML = ''
  }
}
