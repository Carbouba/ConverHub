from django.core.serializers import json
from django.http import JsonResponse
from django.shortcuts import render
import requests

from decouple import config
from django.views.decorators.http import require_GET

from ConverApp.api_calls import get_coordinates, get_current_weather

api_key = config('WEATHER_API_KEY')
get_symbole_urls = 'https://allratestoday.com/api/v1/symbols'


def home(request):
    return render(request, "ConverApp/home.html")


def tools(request, tool):
    return render(request, 'ConverApp/tools.html', {
        'tool': tool,
    })


@require_GET
def get_weather(request):
    city = request.GET.get('city')

    try:
        coordonnee = get_coordinates(city, api_key)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Impossible de trouver la ville'}, status=500)
    # # Obtension des coordonnées par nom de ville

    l_at = coordonnee[0]
    l_on = coordonnee[1]

    try:
        current_weather = get_current_weather(l_at, l_on, api_key)
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Erreur API externe'}, status=502)


    return JsonResponse(current_weather, safe=False)



@require_GET
def convert_currency(request):

    source = request.GET.get('source')
    target = request.GET.get('target')
    amount = request.GET.get('amount')

    try:
        float(amount)
    except ValueError, TypeError:
        return JsonResponse({'error': 'Entrez un montant valide'})

    if not source or not target:
        return JsonResponse({'error': 'source et target requis'}, status=400)

    try:
        response = requests.get(url=f"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{source.lower()}.json", timeout=5)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Erreur API externe'}, status=502)

    data = response.json()
    rate = data[source.lower()][target.lower()]
    conversion_result = float(amount) * float(rate)
    date = data['date']
    result = {
        'date': date,
        'source': source,
        'target': target,
        'amount': amount,
        'conversion': conversion_result,
        'rate': rate,
    }

    return JsonResponse(result, safe=False)

@require_GET
def get_symbols(request):
    try:
        response = requests.get(get_symbole_urls)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return JsonResponse({'error': 'Erreur API externe'}, status=502)

    return JsonResponse(response.json())


