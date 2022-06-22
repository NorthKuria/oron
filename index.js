document.addEventListener('DOMContentLoaded', init)

function init() {
  document.getElementById('myForm').onsubmit = function (e) {
    myFunction(e)
  }

  function myFunction(e) {
    e.preventDefault()
    let countryValue = document.getElementById('country').value
    const results = document.getElementById('results')

    if (countryValue) {
      fetch('https://api.covid19api.com/summary')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          let resultsText = ''
          data.Countries.forEach((item) => {
            if (item.Country.toLowerCase() === countryValue.toLowerCase()) {
              resultsText += '<h3>New Confirmed: ' + item.NewConfirmed + '</h3>'
              resultsText += '<h3>New Deaths: ' + item.NewDeaths + '</h3>'
              resultsText += '<h3>New Recovered' + item.NewRecovered + '</h3>'
            }
          })
          results.innerHTML = resultsText
        })
    }
  }
}
