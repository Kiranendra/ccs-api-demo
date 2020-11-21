/*
JSON DUMMY DATA: https://jsonplaceholder.typicode.com/

TUTORIAL: https://levelup.gitconnected.com/all-possible-ways-of-making-an-api-call-in-plain-javascript-c0dee3c11b8b

COVID API: https://covid19api.com/
FOREIGN EXCHANGE RATES: https://exchangeratesapi.io/
GLOBAL STOCK MARKET: https://marketstack.com/

*/

// API keys file path
const filePath = "./APIs.txt"

/* 

The text file looks like this:

// place APIs here
Key_1
Key_2
Key_3

*/
var covidKey = null
var ferKey = null
var stockKey = null

function getAPIKeys(path) {
    // getting API keys from the text file
    let file = new XMLHttpRequest()
    file.open("GET", path, false)
    file.onreadystatechange = function () {
        if (file.readyState == 4) {
            if (file.status == 200 || file.status == 0) {
                let data = file.responseText.split('\n')
                covidKey = data[1]
                ferKey = data[2]
                stockKey = data[3]
            }
        }
    }
    file.send(null)   
}

getAPIKeys(filePath)

// COVID SECTION -- START
const covid_table = document.getElementById("covid-table")
var covid_data = null

function getCovidData() {
    // Old method of sending and receiving requests
    let covid_request = new XMLHttpRequest()
    covid_request.open("GET", covidKey)
    covid_request.send()
    covid_request.onload = () => {
        if (covid_request.status == 200) {
            covid_data = JSON.parse(covid_request.response)
            addElementsCovid(covid_data["Countries"])
        } else {
            console.log("Error ${covid_request.status} ${covid_request.statusText}")
        }
    }    
}

getCovidData()

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
// COVID SECTION -- END

// EXCHANGE SECTION -- START
const fer_table = document.getElementById("fer-table")
var fer_data = null

function getFERData() {
    // Old method of sending and receiving requests
    let fer_request = new XMLHttpRequest()
    fer_request.open("GET", ferKey)
    fer_request.send()
    fer_request.onload = () => {
        if (fer_request.status == 200) {
            fer_data = JSON.parse(fer_request.response)
            // addElementsCovid(fer_data["Countries"])
            console.log(fer_data["base"])
            console.log(fer_data["date"])
            console.log(fer_data["rates"])
        } else {
            console.log("Error ${covid_request.status} ${covid_request.statusText}")
        }
    }    
}

getFERData()

// EXCHANGE SECTION -- END
