console.log("Content js Execution started")



let dict = {}
let b = document.getElementsByClassName("gs_gray")
res_name = document.getElementById("gsc_prf_in").textContent

console.log(res_name)
let links = document.getElementsByClassName("gsc_prf_ila")
const homepage_grabber = document.querySelector('#gsc_prf_ivh a')

let uni_name = "N/A"
let homepage = "N/A"


if (links.length == 2) {
    homepage = homepage_grabber.href
    uni_name = links[0].textContent
} 
else if (links.length == 1) {
    if (homepage_grabber) {
        homepage = homepage_grabber.href
    } else {
        uni_name = links[0].textContent
    }
}


dict = {
    "Researcher": res_name,
    "University": uni_name,
    "Homepage": homepage,
    "Scholar": window.location.href,
    "Area": "Computer Vision"
}
console.log("Newly created Dictionary in content js", dict)


const saveBtnExists = document.getElementsByClassName("save-btn")[0]
// console.log("**************")
// console.log(saveBtnExists)


if (!saveBtnExists) {
    var container = document.createElement("div");
    var topicField = document.createElement("INPUT");
    topicField.size = 90;
    topicField.setAttribute("type", "text");
    topicField.style = "margin:5px"
    const saveBtn = document.createElement("button")
    saveBtn.textContent = "Save Me";
    // const saveBtn = document.createElement("img")
    // saveBtn.src = "https://toppng.com/uploads/preview/file-save-icon-vector-11563149077xoobqgozjt.png"


    topicField.id = 'topicfield'
    // saveBtn.src = chrome.runtime.getURL("assets/save.png")
    // saveBtn.className = 'gs_ico ' + 'save-btn'

    saveBtn.title = "click to save the details"
    let toolParent = document.getElementById("gsc_prf_i")
    container.appendChild(topicField)
    container.appendChild(saveBtn)
    toolParent.appendChild(container)

    

    saveBtn.addEventListener('click', saveBtnHandler)

}

function saveBtnHandler() {
    // console.log("Inside SaveBtnHandler")
    const topicinput = document.getElementById("topicfield").value
    // console.log(topicinput)
    dict.Area = topicinput
    console.log(dict)
    // window.open('popup.html', 'PopupWindow', 'width=300,height=200');
    chrome.runtime.sendMessage({
        reciever: "background",
        type: "researcherDetails",
        content: dict
    });
}