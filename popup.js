window.onload = (event) => {
  console.log("page is fully loaded: from poup js onload function")

  chrome.runtime.sendMessage({
    reciever: "background",
    type: "askingfordetails"
  })

}

chrome.runtime.onMessage.addListener((message) => {
  const type = message.type
  // console.log("Inside the popup reciever")
  const reciever = message.reciever
  if (reciever == "popup" && type == 'sendingdetails') {
    console.log("Message recieved in pop JS : ", message.content)

    showTable(message.content)

    exportBtn = document.getElementById('export-btn')
    exportBtn.addEventListener("click", () => {
      exportCSV(message.content)
    })
  }



})


function showTable(details) {
  TABLE = document.getElementById('researchers-table')

  const header_row = document.createElement("tr");
  header_row.className = "table-header"
  const headers = ["University", "Researcher", "Area", "Scholar & Homapage"]

  headers.forEach((h) => {
    const cell = document.createElement("td");
    cell.textContent = h
    header_row.appendChild(cell);

  })
  TABLE.appendChild(header_row)



  const ALL_KEYS = Object.keys(details)
  console.log("All Keys:", ALL_KEYS)

  ALL_KEYS.forEach((key) => {
    let row = document.createElement("tr");
    row.className = "table-row"
    console.log(key)
    this_researcher = details[key]

    let this_row = [this_researcher.University, this_researcher.Researcher, this_researcher.Area, this_researcher.Scholar + '    ' + this_researcher.Homepage]

    this_row.forEach((item) => {
      const cell = document.createElement("td")
      cell.textContent = item
      cell.className = 'table-data'
      row.appendChild(cell)
    })
    console.log("Row", row)
    TABLE.appendChild(row)
  })

}

function exportCSV(data) {
  const ALL_KEYS = Object.keys(data)
  // first_value = data[ALL_KEYS[0]]
  let csvRows = []
  const headers = ["University", "Researcher", "Area", "Scholar & Homapage", ]
  csvRows.push(headers.join(","))

  ALL_KEYS.forEach((key) => {
    console.log(key)
    this_researcher = data[key]
    let this_row = [this_researcher.University, this_researcher.Researcher, this_researcher.Area, this_researcher.Scholar + '    ' + this_researcher.Homepage]
    csvRows.push(this_row.join(','))
  })
  // console.log("first_value", first_value)
  let csvString = csvRows.join('\n')
  console.log("rows", csvRows)

  downloadCSV(csvString)
}

function downloadCSV(csvString) {

  const today = new Date();
  const date = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const year  = today.getFullYear();

  const month = today.getMonth() + 1;

  const filename = "Researchers list " + minute + ":" + hour + "__" +date + "_" + month + "_"+year

  const blob = new Blob([csvString], {
    type: "text/csv;charset=utf-8;"
  })
  console.log("Blob", blob)

  const link = document.createElement('a')
  link.setAttribute("href", URL.createObjectURL(blob))
  link.setAttribute("download", filename)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}


// console.log("hello from pop up")
// chrome.runtime.onMessage.addListener(function (message) {
//   // Handle the message received from the background script
//   console.log("message recived in the popup js: ", message)


//   document.getElementById("researcher").innerText = message.Researcher
//   document.getElementById("university").innerText = message.University
//   document.getElementById("homepage").innerText = message.Homepage
//   document.getElementById("scholar").innerText = message.Scholar
// })

// const submitBtn = document.getElementById("submitBtn")
// submitBtn.addEventListener("click", function () {
//   const topicinput = document.getElementById("topicinput").value
//   // Send the user input to the background script
//   chrome.runtime.sendMessage({
//     topicinput: topicinput
//   })
//   // Close the popup
//   document.getElementById("topic").innerText = topicinput
//   // window.close()
// })