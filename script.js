function _repositionSearchBox() {
    document.querySelector(".search-box").style.top = "10%";
}

function _getWeatherData(cityName) {
    return axios.get(`https:/api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=99bf340ab3242744dbfe45645c790301`)
}

function getWeather() {
    document.querySelector('.my-cont').style.backgroundBlendMode = "normal";
    document.querySelector('section').style.display = "inline";

    _repositionSearchBox()

    const cityName = document.querySelector("input").value;
    _getWeatherData(cityName)

        .then(function (response) {

            console.log(response.data.sys.country);
            const country = response.data.sys.country;
            document.querySelector(".my-cont").style.backgroundImage = `url(images/${country}.jpg)`
            
            let ans;

            if (response.data.weather[0].main === "Clouds") 
            {
                document.querySelector('.weather-icon').innerHTML = `<img src="images/cloudy.png">`;
                ans = document.getElementById('cloudy-weather').innerHTML;
            } 

            else if (response.data.weather[0].main === "Rain" || response.data.weather[0].main === "Thunderstorm" || response.data.weather[0].main === "Drizzle") 
            {
                document.querySelector('.weather-icon').innerHTML = `<img src="images/rain.png">`;               
                ans = document.getElementById('rainy-weather').innerHTML;
            }

            else if (response.data.weather[0].main === "Snow") 
            {
                document.querySelector('.weather-icon').innerHTML = `<img src="images/snow.png">`;                
                ans = document.getElementById('snowy-weather').innerHTML;
            } 
            
            else if (response.data.weather[0].main === "Party Cloudly") 
            {
                document.querySelector('.weather-icon').innerHTML = `<img src="images/partly-cloudy.png">`;
                ans = document.getElementById('partly-cloudy-weather').innerHTML;
            } 
            
            else if (response.data.weather[0].main === "Sunny") 
            {
                document.querySelector('.weather-icon').innerHTML = `<img src="images/sun.png">`;
                ans = document.getElementById('sunny-weather').innerHTML;
            } 
            
            else if (response.data.weather[0].main === "Smoke" || response.data.weather[0].main === "Haze" || response.data.weather[0].main === "Mist") 
            {
                document.querySelector('.weather-icon').innerHTML = `<img src="images/fog2.png">`;                
                ans = document.getElementById('fog-weather').innerHTML;
            }
            
            document.querySelector("#animation-container").innerHTML = ans;
            document.querySelector("h1").innerHTML = "CURRENT WEATHER"
            document.querySelector('#city').innerHTML = `${response.data.name}, ${response.data.sys.country}`;
            document.querySelector("#main").innerHTML = response.data.weather[0].main;
            document.querySelector('#temp').innerHTML = `${Math.floor(response.data.main.temp - 273.15)}°C `;
            document.querySelector('#humidity').innerHTML = ` Humidity :  ${response.data.main.humidity}`;
            document.querySelector('#windspeed').innerHTML = `Windspeed : ${response.data.wind.speed} /mps`;
        })

        .catch(function (error) {
            alert("not found");
        })

        .finally(function () { });
}
