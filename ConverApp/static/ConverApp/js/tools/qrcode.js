/*
* DECLARATION DES VARIABLES*/

let qrData = document.getElementById('qr-data-input')
const fileName = document.getElementById('qr-filename-input')
const qrExtensionSelect = document.getElementById('qr-exention-select')
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
        data: qrData,
        image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
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
            color: qrBgColor.value,
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 20
        }
    })

    qrCode.append(document.getElementById("qr-code-canvas"));
    downloadBtn.addEventListener('click', () => {
        qrCode.download({name: fileName.value, extension: qrExtensionSelect.value});
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

}

