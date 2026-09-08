import {showAlert} from "../core/alert.js";

const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");
const weatherIcon = document.querySelector("#weather-icon");


const weatherIcons = {
    Clouds: "ConverApp/static/ConverApp/weather-images/cloudy-1-day.svg",
    Clear:  "ConverApp/static/ConverApp/weather-images/clear-day.svg",
    Rain:   "ConverApp/static/ConverApp/weather-images/rainy-3-day.svg",
    Snow:   "ConverApp/static/ConverApp/weather-images/snowy-3.svg",
    Mist:   "ConverApp/static/ConverApp/weather-images/fog.svg",
    Dust:   "ConverApp/static/ConverApp/weather-images/dust.svg"
};


async function checkWeather(cityName) {
    const city = cityName.trim()
    if (!cityName || cityName === '') {
        showAlert('Entrez un nom de ville valide')
        return
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
                document.querySelector('#city').innerHTML = data.name
                document.querySelector('#condition-description').innerHTML = data.weather[0].description
                document.querySelector('#temp').innerHTML = Math.round(data.main.temp) + "°C"
                document.querySelector('#temp-max').innerHTML = data.main.temp_max
                document.querySelector('#temp-min').innerHTML = data.main.temp_min
                const iconDescription =  data.weather[0].main
                weatherIcon.src = weatherIcons[iconDescription]



            }
        } catch (error) {
            showAlert('Erreur : impossible d\'atteindre le serveur. Réessaie plus tard.')
            // console.error(`Erreur : ${error}`)
        }
    }
}

export function initWeather() {
    searchBtn.addEventListener("click", () => {
        checkWeather(searchInput.value);
    })
}