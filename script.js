let input = document.querySelector(".input-box input");
let humidity = document.querySelector(".humidity-value");
let speed = document.querySelector(".speed-value");
let searchBtn = document.querySelector(".search-btn");
let temperature = document.querySelector(".temp-value");

const apikey = "9993e8ddb94abd25cdc2ebe73dbb0dc0";

searchBtn.addEventListener("click", async () => {
    let city = input.value.trim(); // Get the current input value
    if (city === "") {
        alert("Enter a valid city");
        return;
    }
    try {
        await checkWeather(city); // Call the function with the current city
    } catch (error) {
        console.error(error);
        alert("City not found or API request failed.");
    }
});

async function checkWeather(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    let response = await fetch(URL);
    if (!response.ok) {
        throw new Error("City not found or bad request");
    }

    let data = await response.json();
    console.log(data);

    // Update the DOM with fetched weather data
    humidity.textContent = `${data.main.humidity} %`;
    speed.textContent = `${data.wind.speed} km/h`;
    temperature.textContent = `${data.main.temp} °C`;
}
