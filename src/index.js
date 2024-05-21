import _ from 'lodash';
import './style.css';

const cityName = document.getElementById('cityInput');
cityName.value = 'London';
const temperature = document.querySelector('.temp');
const clouds = document.querySelector('.clouds');
const humidity = document.querySelector('.humidity');
const winds = document.querySelector('.winds');
const weatherCondition = document.getElementById('weather');
const feelsLike = document.getElementById('feelsLike');
const dates = document.querySelectorAll('.date');
const nextTemp = document.querySelectorAll('.nextTemp');
const icons = document.querySelectorAll('.icon');
const todayIcon = document.querySelector('.todayIcon');
const grad = document.querySelector('.grad');
const celsiusText = document.querySelector('.celsius');
const fahrenheitText = document.querySelector('.fahrenheit');
let celsius = true;

ShowTemp('London');

async function ShowTemp(name){
    try{
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f4047df59b024d8f9b4164352241805&q=${name}&days=3&aqi=yes&alerts=yes`, {mode: 'cors'});
        let weather = await response.json();
        console.log(weather);
        if(celsius){
            temperature.textContent = weather.current.temp_c + ' °C';
            feelsLike.textContent = weather.current.feelslike_c + '°C';
            winds.textContent = weather.current.wind_kph +' km/h';
        } else {
            temperature.textContent = weather.current.temp_f + ' °F';
            feelsLike.textContent = weather.current.feelslike_f + ' °F';
            winds.textContent = weather.current.wind_mph +' mph';
        }
        clouds.textContent = weather.current.cloud + '%';
        humidity.textContent = weather.current.humidity + '%';
        weatherCondition.textContent = weather.current.condition.text;
        todayIcon.src = 'https:'+ weather.current.condition.icon;
        for(let i = 0; i < weather.forecast.forecastday.length; i++){
            if(i < dates.length){
                dates[i].textContent = weather.forecast.forecastday[i].date;
                if(celsius){
                    nextTemp[i].textContent = 'Avg: ' + weather.forecast.forecastday[i].day.avgtemp_c + ' °C';
                } else {
                    nextTemp[i].textContent = 'Avg: ' +  weather.forecast.forecastday[i].day.avgtemp_f + ' °F';
                }
                icons[i].src = 'https:' + weather.forecast.forecastday[i].day.condition.icon;
            }
        }
        return weather;
    } 
    catch(err){
        console.log(err);
        alert(`Please refresh the page if it isn't working properly!`);
    }
}

cityName.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
        ShowTemp(cityName.value);
    }
});

if(celsius){
    celsiusText.style.fontWeight = 'bold';
    fahrenheitText.style.fontWeight = 'normal';
}else {
    celsiusText.style.fontWeight = 'normal';
    fahrenheitText.style.fontWeight = 'bold';
}

grad.addEventListener('click', (event) =>{
    celsius = !celsius;
    if(celsius){
        celsiusText.style.fontWeight = 'bold';
        fahrenheitText.style.fontWeight = 'normal';
    }else {
        celsiusText.style.fontWeight = 'normal';
        fahrenheitText.style.fontWeight = 'bold';
    }
    ShowTemp(cityName.value);
});

document.addEventListener("DOMContentLoaded", function() {
    function resizeInput() {
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.style.whiteSpace = 'pre';
        span.style.fontSize = window.getComputedStyle(cityName).fontSize;
        span.textContent = cityName.value || cityName.placeholder;

        document.body.appendChild(span);
        cityName.style.width = `${span.offsetWidth + 15}px`;
        document.body.removeChild(span);
    }
    resizeInput();
    cityName.addEventListener('input', resizeInput);
});
