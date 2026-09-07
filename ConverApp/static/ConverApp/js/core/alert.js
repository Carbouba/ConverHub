const alertBtn = document.querySelector('#alert-btn')
const alertDiv = document.querySelector('#alert-div')

 // Close the alert PopUp when the user click on the button
    // alertBtn.addEventListener('click', hideAlert)

let alertTimeout
alertDiv.hidden = true


export function showAlert(message) {
    document.querySelector('#alert-message').textContent = message
    clearTimeout(alertTimeout)
    alertDiv.hidden = false
    alertTimeout = setTimeout(hideAlert, 3000)
}

function hideAlert() {
    alertDiv.hidden = true
    clearTimeout(alertTimeout)
}