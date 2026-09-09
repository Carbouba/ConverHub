import {showAlert} from "../core/alert.js";

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector("#weather-icon");
const errorLabel = document.querySelector("#error");
const today = new Date()


const weatherIcons = {
    Clouds: "/static/ConverApp/weather-images/cloudy-1-day.svg",
    Clear: "/static/ConverApp/weather-images/clear-day.svg",
    Rain: "/static/ConverApp/weather-images/rainy-3-day.svg",
    Snow: "/static/ConverApp/weather-images/snowy-3.svg",
    Mist: "/static/ConverApp/weather-images/fog.svg",
    Dust: "/static/ConverApp/weather-images/dust.svg"
};


async function checkWeather(cityName) {
    const city = cityName.trim()
    if (!cityName || cityName === '') {
        // showAlert('Entrez un nom de ville valide')
        errorLabel.innerHTML = 'Entrez un nom de ville valide'
        errorLabel.style.display = 'block';
        setTimeout(function () {
            errorLabel.style.display = 'none'
        }, 2000)
    } else {
        try {
            const params = new URLSearchParams(
                {city})

            const response = await fetch(`/api/weather?${params}`, {
                method: 'GET',
            })
            if (!response.ok) {
                throw new Error(response.status)
            }
            if (response.ok) {
                const data = await response.json()
                console.log(data)

                document.querySelector('#country').innerHTML = data.sys.country
                document.querySelector('#city').innerHTML = data.name + ', '
                if (data.state) {
                    document.querySelector('#state').innerHTML = data.state
                }
                document.querySelector('#weather-date').innerHTML = `Mise a jour le : ${today.toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}`
                document.querySelector('#condition-description').innerHTML = data.weather[0].description
                document.querySelector('#description-icon').classList.add('ch-animate-in')
                document.querySelector('#description-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.querySelector('#description-icon').alt = data.weather[0].description
                document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + " °C"
                document.querySelector('#temp-max').innerHTML = Math.round(data.main.temp_max) + '°'
                document.querySelector('#temp-min').innerHTML = Math.round(data.main.temp_min) + '°'
                document.querySelector("#wind").innerHTML = data.wind.speed + " Km/h"
                document.querySelector('#wind-dir-icon').classList.add('animate')
                document.querySelector('#wind-dir-icon').style.transform = `rotate(${data.wind.deg}deg)`
                document.querySelector("#humidity").innerHTML = data.main.humidity + " %"
                document.querySelector("#visibility").innerHTML = data.visibility / 1000 + " Km"
                const iconDescription = data.weather[0].main
                console.log(iconDescription)
                weatherIcon.classList.add('ch-animate-in')
                weatherIcon.src = weatherIcons[iconDescription] || "/static/ConverApp/weather-images/cloudy.svg"

                document.querySelector('#weather-container').style.display = 'block'


            }
        } catch (error) {
            // showAlert('Erreur : impossible d\'atteindre le serveur. Réessaie plus tard.')
            // console.error(`Erreur : ${error}`)
            console.log(error.message)
            errorLabel.innerHTML = `Erreur: Impossible de trouver la ville`
            errorLabel.style.display = 'block';
            setTimeout(function () {
                errorLabel.style.display = 'none'
            }, 2000)
        }
    }
}

export function initWeather() {
    searchBtn.addEventListener("click", () => {
        checkWeather(searchInput.value);
    })
    // Execute a function when the user presses a key on the keyboard
    searchInput.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            event.preventDefault()
            searchBtn.click()
        }
    })
}