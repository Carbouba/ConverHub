import locale

from decouple import config

locale.setlocale(locale.LC_TIME, "fr_FR.UTF-8")
import requests
from datetime import datetime


# Ce fichier regroupe les appels HTTP vers l'API OpenWeatherMap:
# - Geo API (direct geocoding): convertir "nom de ville" -> (lat, lon)
# - Weather API: recuperer la meteo courante a partir de (lat, lon)

def get_coordinates(city_name, api_key):

    url = "https://api.openweathermap.org/geo/1.0/direct"
    params = {
    "q": city_name,
    "limit": 1,
    "appid": api_key
}

    reponse = requests.get(url, params=params)

    data = reponse.json()
    print(data)

    dico = data[0]
    lat = dico["lat"]
    lon = dico["lon"]
    country = dico["country"]

    coord = [lat, lon, country]

    return coord

def get_current_weather(lat, lon, api_key):
    # Objectif: recuperer la meteo courante a partir des coordonnees (lat, lon).
    url = "https://api.openweathermap.org/data/2.5/weather"

    # 2. définir les params (city_name et api_key à la place des valeurs fixes)
    params = {
    "lat": lat,      # le nom de la ville
    "lon": lon,
    "appid": api_key,
    "units": "metric"
}

    reponse = requests.get(url, params=params)

    data = reponse.json()
    #
    # # Champs utiles dans la reponse JSON.
    # name = data["name"]
    # temp = data["main"]["temp"]
    # humidity = data["main"]["humidity"]
    # dt = data["dt"]
    # wind = data["wind"]["speed"]
    #
    # # Conversion du timestamp Unix (dt) en date lisible (YYYY-MM-DD).
    # date = datetime.fromtimestamp(dt).strftime("%Y-%m-%d")
    # date_labl = datetime.fromtimestamp(dt).strftime("%a, %d %B %Y à %H:%M:%S")
    #
    # # "mesure" est une liste dans un ordre fixe utilise par queries.py
    # # (city, temp, humidity, dt, date).
    # mesure = [name, temp, humidity, dt, date, wind]

    return data

# get_coordinates("niamey", "56269a58b30f0552429caf704b7d9db3")
coordonnee = get_coordinates("Niamey", "56269a58b30f0552429caf704b7d9db3")

# `get_coordinates` renvoie [lat, lon]
l_at = coordonnee[0]
l_on = coordonnee[1]
country = coordonnee[2]

Current_Weather = get_current_weather(l_at, l_on, "56269a58b30f0552429caf704b7d9db3")
print(Current_Weather)





