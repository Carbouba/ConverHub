import {initCurrency} from './tools/currency.js'
import {initUnits} from "./tools/units.js";
import {initNavigation} from "./core/navigation.js";
import {initAnimations} from "./core/animations.js";
import {InitQrCode} from "./tools/qrcode.js"
/*
* Attempt to load all the DOM content*/
document.addEventListener('DOMContentLoaded', () => {

    initCurrency()
    initUnits()
    initNavigation()
    initAnimations()
    InitQrCode()

})