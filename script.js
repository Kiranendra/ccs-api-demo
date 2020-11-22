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

function addElementsCovid(data){
    for (let index = 0; index < data.length; index++) {
        let element = data[index]
        let date = element["Date"]

        // creating the rows and columns to add data dynamically
        let covid_row = document.createElement('tr')

        let row_head = document.createElement('th')
        row_head.setAttribute('scope', 'row')
        row_head.innerText = element["Country"]

        let row_col_1 = document.createElement('td')
        row_col_1.innerText = element["NewConfirmed"]

        let row_col_2 = document.createElement('td')
        row_col_2.innerText = element["TotalConfirmed"]

        let row_col_3 = document.createElement('td')
        row_col_3.innerText = element["NewRecovered"]

        let row_col_4 = document.createElement('td')
        row_col_4.innerText = element["TotalRecovered"]

        let row_col_5 = document.createElement('td')
        row_col_5.innerText = element["NewDeaths"]

        let row_col_6 = document.createElement('td')
        row_col_6.innerText = element["TotalDeaths"]

        let row_col_7 = document.createElement('td')
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

// COVID SECTION -- END

// EXCHANGE SECTION -- START
const fer_table = document.getElementById("fer-table")
var fer_data = null

function addElementsFER(rates, base, date) {
    for (let index = 0; index < Object.keys(rates).length; index++) {
        // creating the rows and columns to add data dynamically
        let fer_row = document.createElement('tr')

        let row_col_1 = document.createElement('td')
        row_col_1.innerText = base

        let row_col_2 = document.createElement('td')
        row_col_2.innerText = Object.keys(rates)[index]

        let row_col_3 = document.createElement('td')
        row_col_3.innerText = rates[Object.keys(rates)[index]]

        let row_col_4 = document.createElement('td')
        row_col_4.innerText = date

        // appending the 'th' & 'td' tags to the 'tr'
        fer_row.appendChild(row_col_1)
        fer_row.appendChild(row_col_2)
        fer_row.appendChild(row_col_3)
        fer_row.appendChild(row_col_4)

        // appending the 'tr' tag to the 'tbody'
        fer_table.appendChild(fer_row)
    }
}

function getFERData() {
    // Old method of sending and receiving requests
    let fer_request = new XMLHttpRequest()
    fer_request.open("GET", ferKey)
    fer_request.send()
    fer_request.onload = () => {
        if (fer_request.status == 200) {
            fer_data = JSON.parse(fer_request.response)
            addElementsFER(fer_data["rates"], fer_data["base"], fer_data["date"])
        } else {
            console.log("Error ${covid_request.status} ${covid_request.statusText}")
        }
    }    
}

getFERData()

// EXCHANGE SECTION -- END

// STOCK SECTION -- START
const stock_table = document.getElementById("stock-table")
var stock_data = null

function addElementsStock(data) {
    for (let index = 0; index < data.length; index++) {
        let element = stock_data["data"][index]
        let date = element["date"]

        // creating the rows and columns to add data dynamically
        let stock_row = document.createElement('tr')

        let row_col_1 = document.createElement('td')
        row_col_1.innerText = date.substring(0, 10)

        let row_col_2 = document.createElement('td')
        row_col_2.innerText = element["exchange"]

        let row_col_3 = document.createElement('td')
        row_col_3.innerText = element["symbol"]

        let row_col_4 = document.createElement('td')
        row_col_4.innerText = element["volume"]

        let row_col_5 = document.createElement('td')
        row_col_5.innerText = element["open"]

        let row_col_6 = document.createElement('td')
        row_col_6.innerText = element["high"]

        let row_col_7 = document.createElement('td')
        row_col_7.innerText = element["low"]

        let row_col_8 = document.createElement('td')
        row_col_8.innerText = element["close"]

        // appending the 'th' & 'td' tags to the 'tr'
        stock_row.appendChild(row_col_1)
        stock_row.appendChild(row_col_2)
        stock_row.appendChild(row_col_3)
        stock_row.appendChild(row_col_4)
        stock_row.appendChild(row_col_5)
        stock_row.appendChild(row_col_6)
        stock_row.appendChild(row_col_7)
        stock_row.appendChild(row_col_8)

        // appending the 'tr' tag to the 'tbody'
        stock_table.appendChild(stock_row)
    }
}

function getStockData() {
    // Old method of sending and receiving requests
    let stock_request = new XMLHttpRequest()
    stock_request.open("GET", stockKey)
    stock_request.send()
    stock_request.onload = () => {
        if (stock_request.status == 200) {
            stock_data = JSON.parse(stock_request.response)
            addElementsStock(stock_data["data"])
        } else {
            console.log("Error ${covid_request.status} ${covid_request.statusText}")
        }
    }    
}

getStockData()

// STOCK SECTION -- END
