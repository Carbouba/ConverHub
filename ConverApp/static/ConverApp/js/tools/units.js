import {showAlert} from "../core/alert.js";

let firstUnitSelect
let secondUnitSelect
let unitInput = document.querySelector('#unit-input')

// UNITS CONVERT LOGIC
const UnitsCoeff = {
    'm': 1,
    'cm': 0.01,
    'mm': 0.001
}

const unitsOptions = [
    {value: 'm', text: 'Mètre'},
    {value: 'cm', text: 'Centimètre'},
    {value: 'mm', text: 'Millimètre'}
];


/*
* This function switch between BASE_CODE and TARGET_CODE
* Then call convert() function to update data */
function switchUnitCode() {
    const bUnit = firstUnitSelect.getValue()
    const tUnit = secondUnitSelect.getValue()


    firstUnitSelect.setValue(tUnit, true)
    secondUnitSelect.setValue(bUnit, true)

    units_convert(unitInput.value, UnitsCoeff[firstUnitSelect.getValue()], UnitsCoeff[secondUnitSelect.getValue()])

}

function units_convert(AMOUNT, BASE_COEFF, TARGET_COEFF) {

    if (AMOUNT <= 0 || !AMOUNT) {
        showAlert('Veuillez entrez un montant valide')
        return
    } else if (!BASE_COEFF || !TARGET_COEFF) {
        showAlert('Veuillez choisir une unité source et une unité cible')
        return
    }

    const meterValue = AMOUNT * BASE_COEFF
    const convertResult = meterValue / TARGET_COEFF
    // On arrondit à 4 chiffres après la virgule maximum.
    const resultatArrondi = parseFloat(convertResult.toFixed(4));

    console.log(resultatArrondi)
    document.querySelector('#result-meta').innerHTML = `${AMOUNT} ${firstUnitSelect.options[firstUnitSelect.getValue()].text} =  ${resultatArrondi} ${secondUnitSelect.options[secondUnitSelect.getValue()].text}`
    document.querySelector('#unit-result-input').value = `${resultatArrondi}`
}

export function initUnits() {
    // Initialize Tom Select
    firstUnitSelect = new TomSelect('#unit-first', {
        create: false, // disable user typing creation for this example
        closeAfterSelect: true,
        onChange: function (value) {
            // Get the coefficients units
            units_convert(unitInput.value, UnitsCoeff[firstUnitSelect.getValue()], UnitsCoeff[secondUnitSelect.getValue()])

        }
    });
    secondUnitSelect = new TomSelect('#unit-second', {
        create: false, // disable user typing creation for this example
        closeAfterSelect: true,
        onChange: function (value) {
            // Get the coefficients units
            units_convert(unitInput.value, UnitsCoeff[firstUnitSelect.getValue()], UnitsCoeff[secondUnitSelect.getValue()])

        }
    });

    // Create first select options
    unitsOptions.forEach(unit => {
        firstUnitSelect.addOption(
            {value: unit.value, text: unit.text},
        )
    })

// Create second select options
    unitsOptions.forEach(unit => {
        secondUnitSelect.addOption(
            {value: unit.value, text: unit.text},
        )
    })


    unitInput.addEventListener('input', () => {
        units_convert(unitInput.value, UnitsCoeff[firstUnitSelect.getValue()], UnitsCoeff[secondUnitSelect.getValue()])
    })

    /*
    * Attempt to an EventListener when user click on the
    switchBtn and call switchCode function*/
    document.querySelector('#switchUnitBtn').addEventListener('click', () => {
        switchUnitCode()
        console.log('Switch')
    })


}