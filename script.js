/*
JSON DUMMY DATA: https://jsonplaceholder.typicode.com/

TUTORIAL: https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b

COVID API: https://covid19api.com/
FOREIGN EXCHANGE RATES: https://fixer.io/
GLOBAL STOCK MARKET: https://marketstack.com/

*/

const covid_table = document.getElementById("covid-table")

var covid_test_api = "https://api.covid19api.com/total/country/india"

// Old method of sending and receiving requests
let covid_request = new XMLHttpRequest()
covid_request.open("GET", covid_test_api)
covid_request.send()
covid_request.onload = () => {
    if (covid_request.status == 200) {
        var covid_data = JSON.parse(covid_request.response)
        // getting the latest data
        covid_data = covid_data[covid_data.length-1]
        var covid_date = covid_data["Date"]

        // creating the rows and columns to add data dynamically
        var covid_row = document.createElement('tr')

        var covid_row_head = document.createElement('th')
        covid_row_head.setAttribute('scope', 'row')
        covid_row_head.innerText = covid_data["Country"]

        var covid_row_col_1 = document.createElement('td')
        covid_row_col_1.innerText = covid_data["Active"]

        var covid_row_col_2 = document.createElement('td')
        covid_row_col_2.innerText = covid_data["Confirmed"]

        var covid_row_col_3 = document.createElement('td')
        covid_row_col_3.innerText = covid_data["Recovered"]

        var covid_row_col_4 = document.createElement('td')
        covid_row_col_4.innerText = covid_data["Deaths"]

        var covid_row_col_5 = document.createElement('td')
        covid_row_col_5.innerText = covid_date.substring(0, 10)

        covid_row.appendChild(covid_row_head)
        covid_row.appendChild(covid_row_col_1)
        covid_row.appendChild(covid_row_col_2)
        covid_row.appendChild(covid_row_col_3)
        covid_row.appendChild(covid_row_col_4)
        covid_row.appendChild(covid_row_col_5)

        covid_table.appendChild(covid_row)
        
    } else {
        console.log("Error ${covid_request.status} ${covid_request.statusText}")
    }
}

