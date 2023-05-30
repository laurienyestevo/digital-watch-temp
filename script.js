
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const app = document.querySelector('.weather-app');
const timeOutput = document.querySelector('.relogio');
const temp = document.querySelector('.temp');
const nameOutput = document.querySelector('.name');
const conditionOutput = document.querySelector('.condition');
const icon = document.querySelector('.icon');

let cityInput = "São Paulo";

form.addEventListener('submit', (e) => { //Botão de procurar
  e.preventDefault();
  if (search.value.length === 0) {
    alert('Insira o nome da cidade');
  } else {
    cityInput = search.value;
    fetchWeatherData(cityInput);
    search.value = "";
    app.style.opacity = "0";
  }
});

function updateTime() { //Relógio Digital
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');

  document.getElementById('hora').innerText = hours;
  document.getElementById('minutos').innerText = minutes;
  document.getElementById('segundos').innerText = seconds;
}

function fetchWeatherData(city) {
  fetch(`https://api.weatherapi.com/v1/current.json?key=682fbcb76bef4becb65232349232705&q=${city}&lang=pt`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      updateTime();
      setInterval(updateTime, 1000);

      temp.innerHTML = `${data.current.temp_c}&deg;C`;
      conditionOutput.innerHTML = data.current.condition.text;

      const iconId = data.current.condition.code;
      


      const isDay = data.current.is_day;
      const conditionCode = data.current.condition.code;

      let backgroundDirectory;

      if (conditionCode >= 113 && conditionCode <= 281) {
        // Dia ou noite chuvosa
        if (isDay === 1) {
          // Dia chuvoso
          backgroundDirectory = "imagens/day/rain.jpg";
        } else {
          // Noite chuvosa
          backgroundDirectory = "imagens/nigth/rain.jpg";
        }
      } else if (iconId === 113 || iconId === 116 || iconId === 119) {
        // Dia ou noite nublada
        if (isDay === 1) {
          // Dia nublado
          backgroundDirectory = "imagens/day/cloudy.jpg";
        } else {
          // Noite nublada
          backgroundDirectory = "imagens/night/cloudy.jpg";
        }
      } else {
        // Dia ou noite com outras condições
        if (isDay === 1) {
          // Dia
          backgroundDirectory = "imagens/day/clear.jpg";
        } else {
          // Noite
          backgroundDirectory = "imagens/nigth/cloudy.jpg";
        }
      }

      app.style.backgroundImage = `url(${backgroundDirectory})`;
    

      app.style.opacity = "1";
      nameOutput.innerHTML = city;
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao obter os dados meteorológicos');
    });
}

fetchWeatherData(cityInput);
app.style.opacity = "1";



