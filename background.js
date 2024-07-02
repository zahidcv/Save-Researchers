console.log("Background js Execution started")
// chrome.action.onClicked.addListener((tab) => {
//     // chrome.tabs.create({ url: 'https://www.example.com' });
//     console.log("Hello js")
//     console.log(tab)
//   });


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    const type = message.type
    const reciever = message.reciever
    if (reciever == "background" && type == 'researcherDetails') {

        console.log("Message recieved in background JS: ", message.content)
        saveDetails(message.content)
    }
})

function saveDetails(message) {
    console.log("Printing from saveDetails()", message)
    let key = message.Researcher
    // console.log(key)
    // console.log("type of key is: ", typeof key)
    chrome.storage.local.set({
        [key]: message
    })
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Do something with the message
    const type = message.type
    const reciever = message.reciever

    if (reciever == "background" && type == 'askingfordetails') {
        var details = fetchDetails()
        // console.log("details request is recieved in background.")
        
        // console.log("details are sent to the popup", details)
    }

});

function sendDetailstoPopup(details) {
    // console.log("inside sendDetailstoPopup function")
    chrome.runtime.sendMessage({
        reciever: 'popup',
        type: 'sendingdetails',
        content: details
    });
    console.log('details object in sendDetailstoPopup', details)
    // console.log("details are finally sent to the popup")
}


function fetchDetails() {
    // deleteAll()

    chrome.storage.local.get(null, (items) => {
        
        // copyText(items)
        // navigator.clipboard.writeText("copied from clipboard");
        // console.log("type of items:", typeof items)
        sendDetailstoPopup(items)
        console.log("Printing from fetchDetails()", items); 
        // toCSV(items)
    });

}


function copyText(text) {


    // Step 1: Create a temporary textarea element.
    const textarea = document.createElement("textarea");
    textarea.value = text;

    // Step 2: Append the textarea to the DOM (it must be in the DOM to execute "execCommand").
    document.body.appendChild(textarea);

    // Step 3: Select the text inside the textarea.
    textarea.select();

    // Step 4: Copy the selected text to the clipboard.
    try {
        document.execCommand("copy");
    } catch (err) {
        console.error('Unable to copy to the clipboard.')
    }

    // Step 5: Remove the temporary textarea from the DOM.
    document.body.removeChild(textarea);
}

function deleteAll() {
    chrome.storage.local.clear(() => {
        console.log("All entries in Chrome local storage have been cleared.");
    });
}
// chrome.storage.local.removeItem("myKey");

// chrome.runtime.onMessage.addListener((message_pop, sender, sendResponse) => {
//     if (message_pop.topicinput) {
//       const topicinput = message_pop.topicinput;
//       // Do something with the userInput, e.g., log it
//       console.log("User input:", topicinput);
//       // Add your extension's functionality here using the userInput
//     }
//   });