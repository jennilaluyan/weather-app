const apiKey = "54894e6eacc642c77191898cce57d0cd"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon img")

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"
    } else {
        var data = await response.json()

        document.querySelector(".city h2").textContent = data.name
        document.querySelector(".temperature h1").textContent = Math.round(data.main.temp - 273.15) + "°c"
        document.querySelector(".humidity h3").textContent = data.main.humidity + "%"
        document.querySelector(".wind-speed h3").textContent = data.wind.speed + " km/h"

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "./assets/cloudy.png"
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "./assets/clear.png"
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "./assets/rain.png"
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./assets/drizzle.png"
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "./assets/mist.png"
        }

        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"
    }
}

searchButton.addEventListener("click", function(){
    checkWeather(searchBox.value)
})