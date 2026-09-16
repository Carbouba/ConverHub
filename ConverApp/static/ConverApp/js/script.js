import {initCurrency} from './tools/currency.js'
import {initUnits} from "./tools/units.js";
import {initNavigation} from "./core/navigation.js";
import {initAnimations} from "./core/animations.js";
import {InitQrCode} from "./tools/qrcode.js"
import {initWeather} from "./tools/weather.js";
/*
* Attempt to load all the DOM content*/
document.addEventListener('DOMContentLoaded', () => {

    initCurrency()
    initUnits()
    initNavigation()
    initAnimations()
    InitQrCode()
    initWeather()

    // window.onscroll = () => {
    //     const featureScreen = document.querySelector('#feature-screen')
    //     // featureScreen.classList.add('grow-onscroll')
    //     featureScreen.style.animationPlayState = 'running'
    //     console.log('scrolled')
    // }
    window.addEventListener('scroll', () => {
        const featureScreen = document.querySelector('#feature-screen')
        // featureScreen.classList.add('grow-onscroll')
        featureScreen.style.animationPlayState = 'running'
        console.log('scrolled')
    })

})