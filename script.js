/*
JSON DUMMY DATA: https://jsonplaceholder.typicode.com/

TUTORIAL: https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b

COVID API: https://covid19api.com/
FOREIGN EXCHANGE RATES: https://fixer.io/
GLOBAL STOCK MARKET: https://marketstack.com/

*/

const covid_table = document.getElementById("covid-table")

var covid_test_api = "https://api.covid19api.com/summary"
var covid_data = null

// Old method of sending and receiving requests
let covid_request = new XMLHttpRequest()
covid_request.open("GET", covid_test_api)
covid_request.send()
covid_request.onload = () => {
    if (covid_request.status == 200) {
        covid_data = JSON.parse(covid_request.response)
        addElementsCovid(covid_data["Countries"])
    } else {
        console.log("Error ${covid_request.status} ${covid_request.statusText}")
    }
}

function addElementsCovid(data){
    for (var index = 0; index < data.length; index++) {
        var element = data[index]
        var date = element["Date"]
        // creating the rows and columns to add data dynamically
        var covid_row = document.createElement('tr')

        var row_head = document.createElement('th')
        row_head.setAttribute('scope', 'row')
        row_head.innerText = element["Country"]

        var row_col_1 = document.createElement('td')
        row_col_1.innerText = element["NewConfirmed"]

        var row_col_2 = document.createElement('td')
        row_col_2.innerText = element["TotalConfirmed"]

        var row_col_3 = document.createElement('td')
        row_col_3.innerText = element["NewRecovered"]

        var row_col_4 = document.createElement('td')
        row_col_4.innerText = element["TotalRecovered"]

        var row_col_5 = document.createElement('td')
        row_col_5.innerText = element["NewDeaths"]

        var row_col_6 = document.createElement('td')
        row_col_6.innerText = element["TotalDeaths"]

        var row_col_7 = document.createElement('td')
        row_col_7.innerText = date.substring(0, 10)

        // adding the 'th' & 'td' tags to the 'tr'
        covid_row.appendChild(row_head)
        covid_row.appendChild(row_col_1)
        covid_row.appendChild(row_col_2)
        covid_row.appendChild(row_col_3)
        covid_row.appendChild(row_col_4)
        covid_row.appendChild(row_col_5)
        covid_row.appendChild(row_col_6)
        covid_row.appendChild(row_col_7)

        // adding the 'tr' tag to the 'tbody'
        covid_table.appendChild(covid_row)
    }
}

