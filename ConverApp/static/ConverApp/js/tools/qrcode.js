/*
* DECLARATION DES VARIABLES*/

import {showAlert} from "../core/alert.js";

let qrData = document.getElementById('qr-data-input')
const fileName = document.getElementById('qr-filename-input')
const qrExtensionSelect = document.getElementById('qr-extension-select')
const qrDotsStyleBtn = document.querySelectorAll('#qr-dots-style button')
const qrDotsColor = document.querySelector('#qr-dots-color')
const qrCornersStyleBtn = document.querySelectorAll('#qr-corners-style button')
const qrCornersColor = document.querySelector('#qr-corners-color')
const qrCornersDotsStyleBtn = document.querySelectorAll('#qr-corners-dots-style button')
const qrCornersDotsColor = document.querySelector('#qr-corners-dots-color')
const qrBgColor = document.querySelector('#qr-bg-color')
const qrLogo = document.querySelector('#qr-logo-input')
const downloadBtn = document.querySelector('#qr-download-btn')
let qrCode


export function InitQrCode() {

    qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "svg",
        data: "",
        image: "",
        dotsOptions: {
            color: qrDotsColor.value,
            type: 'rounded'
        },
        cornersSquareOptions: {
            color: qrCornersColor.value,
            type: 'extra-rounded',
        },
        cornersDotOptions: {
            color: qrCornersDotsColor.value,
            type: 'dot',
        },
        backgroundOptions: {
            color: '#fff',
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        }
    })

    qrCode.append(document.getElementById("qr-code-canvas"));
    downloadBtn.addEventListener('click', () => {
        qrCode.download({name: fileName.value, extension: qrExtensionSelect.value});
    })
    qrData.addEventListener('input', () => {
        qrCode.update(
            {data: qrData.value}
        )
    })
    qrDotsStyleBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const style = btn.dataset.style
            qrCode.update({
                dotsOptions: {
                    type: style
                }
            })
        })
    })
    qrDotsColor.addEventListener('change', () => {
        qrCode.update({
            dotsOptions: {
                color: qrDotsColor.value,
            }
        })
    })
    qrCornersStyleBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const style = btn.dataset.style
            qrCode.update({
                cornersSquareOptions: {
                    color: qrCornersColor.value,
                    type: style
                }
            })
        })
    })
    qrCornersColor.addEventListener('change', () => {
        qrCode.update({
            cornersSquareOptions: {
                color: qrCornersColor.value,
            }
        })
    })
    qrCornersDotsStyleBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            const style = btn.dataset.style
            qrCode.update({
                cornersDotOptions: {
                    type: style
                }
            })
        })
    })
    qrCornersDotsColor.addEventListener('change', () => {
        qrCode.update({
            cornersDotOptions: {
                color: qrDotsColor.value,
            }
        })
    })

    qrBgColor.addEventListener('change', () => {
        qrCode.update({
            backgroundOptions: {
                color: qrBgColor.value,
            }
        })
    })

    document.querySelector("#qr-logo-input").addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) {
            showAlert("No file selected.")
            return
        }
        if (!file.type.startsWith('image/')) {
        showAlert("Please select a valid image file.");
        return;
    }
        const reader = new FileReader();


        reader.onload = () => {
            const logo = document.getElementById('logo-output')
            console.log(reader.result)
            qrCode.update({
                image: reader.result
            })
        };
        reader.onerror = function () {
            showAlert('Error reading file')
            console.error("Error reading file");
        };
        reader.readAsDataURL(file);
    })

}



