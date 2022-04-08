let weather = {
    "apiKey": "3b81ebede925f70faef548f7e16c5982", 
    fetchWeather: function (zip) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${this.apiKey}`
            )
            .then((response) => response.json()) 
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function(data) {
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, feels_like, temp_max, temp_min} = data.main;
        const {speed} = data.wind;
        console.log(name,icon,description,temp,feels_like,temp_min,temp_max,speed);
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".feelsLike").innerText = "Feels like: " + feels_like;
        document.querySelector(".wind").innerText = "Wind Speed is: " + speed + " mph";
        document.querySelector(".low").innerText = "Low of: " + temp_min;
        document.querySelector(".high").innerText = "High of: " + temp_max;
    },
    search: function () {
        this.fetchWeather(document.querySelector(".searchButn").value);
    }
    
}

document.querySelector(".search button").addEventListener("click", function() {
weather.search();
});

