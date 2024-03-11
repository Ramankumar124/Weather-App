const container=document.querySelector('#container');
const search = document.querySelector("#search-box button");
const weatherBox = document.querySelector("#weather-box");
const weatherDetails = document.querySelector("#weather-details");
const error404=document.querySelector("#not-found");


search.addEventListener("click", () => {

  let ApiKey = "8ee27445eb42697e60777cd64bb84108";
  const city = document.querySelector("#search-box input").value;
  const image = document.querySelector("#weather img");
  const temp = document.querySelector("#weather #temperature");
  const discrptn = document.querySelector("#weather #weather-discr");
  const humidity = document.querySelector("#humidity  #percentage");
  const  windspeed = document.querySelector("#wind-speed  #percentage");

  if (city == "") return;
  (async () => {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`
    );
    let json = await response.json();
    console.log(json.weather);

    if(json.cod=='404'){
      container.style.height="400px";
      weatherBox.classList.remove('active');
      weatherDetails.classList.remove('active');
      error404.classList.add('active');
    
      return;
    }
    container.style.height="555px";
    weatherBox.classList.add('active');
    weatherDetails.classList.add('active');
    error404.classList.remove('active');

    let weather = json.weather[0].main;
    console.log(weather);

    switch (weather) {
      case "Clear":
        image.src = "images/clear.png";
        break;
      case "Clouds":
        image.src = "images/Cloud.png";
        break;
      case "Mist":
        image.src = "images/mist.png";
        break;
      case "Rain":
        image.src = "images/rain.png";
        break;
      case "Snow":
        image.src = "images/snow.png";
        break;
    }
    temp.innerHTML=`${parseInt(json.main.temp)}<span>°C</span>`;
    discrptn.innerHTML=`${json.weather[0].description}`;
    humidity.innerHTML=`${json.main.humidity}%`;
    windspeed.innerHTML=`${parseInt(json.wind.speed)}Km/h`;
  })();
});
