document.addEventListener('DOMContentLoaded', init)

function init() {
  const results = document.getElementById('results')
  const resultsparent = document.querySelector('.resultsparent')
  resultsparent.style.display = 'none'

  document.getElementById('myForm').onsubmit = function (e) {
    myFunction(e)
  }

  document.getElementById('country').onfocus = function (e) {
    reset(e)
  }

  document.getElementById('button1').onclick = function (e) {
    reset(e)
  }

  function myFunction(e) {
    e.preventDefault()
    let countryInput = document.getElementById('country')
    let countryValue = countryInput.value
    let loading = document.getElementById('loading')

    if (countryValue) {
      resultsparent.style.display = 'block'
      fetch('https://api.covid19api.com/summary')
        .then((res) => {
          return res.json()
        })
        .then((data) => {
          let resultsText = ''
          data.Countries.forEach((item) => {
            if (item.Country.toLowerCase() === countryValue.toLowerCase()) {
              resultsText +=
                '<h3 id="countryresults">' +
                'Results for ' +
                item.Country +
                '</h3>'
              resultsText +=
                '<h3 class="result">New Confirmed: ' +
                item.NewConfirmed +
                '</h3>'
              resultsText +=
                '<h3 class="result">New Deaths: ' + item.NewDeaths + '</h3>'
              resultsText +=
                '<h3 class="result">New Recovered: ' +
                item.NewRecovered +
                '</h3>'
              resultsText +=
                '<h3 class="result">Total Confirmed: ' +
                item.TotalConfirmed +
                '</h3>'
              resultsText +=
                '<h3 class="result">Total Deaths: ' + item.TotalDeaths + '</h3>'
              resultsText +=
                '<h3 class="result">Total Recovered: ' +
                item.TotalRecovered +
                '</h3>'
              console.log(item)
            }
          })
          loading.style.display = 'none'
          resultsparent.style.display = 'block'
          results.innerHTML = resultsText
        })
    } else {
      console.log('empty')
      countryInput.style.border = '1px solid red'
      countryInput.placeholder = 'Please enter a country..'
    }
  }

  function reset(e) {
    results.innerHTML = ''
    resultsparent.style.display = 'none'
    document.getElementById('country').value = ''
  }
}
