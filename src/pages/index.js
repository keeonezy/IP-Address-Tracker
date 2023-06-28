import "./index.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const inputIp = document.querySelector(".tracker__input");
const searchButton = document.querySelector(".tracker__button");
const ipInfo = document.querySelector(".tracker__ip");
const locationInfo = document.querySelector(".tracker__location");
const utcInfo = document.querySelector(".tracker__utc");
const ispInfo = document.querySelector(".tracker__isp");

async function getInfoIp() {
  fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_UbtFHbOTZFhcutSCRny7FfB7O44vm&ipAddress=${inputIp.value}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      ipInfo.textContent = data.ip;
      locationInfo.textContent = `${data.location.region} ${data.location.country}`;
      utcInfo.textContent = data.location.timezone;
      ispInfo.textContent = data.isp;

      // Ставим паркер на карте
      marker.setLatLng([data.location.lat, data.location.lng]);
      mymap.setView([data.location.lat, data.location.lng], 4);

      // console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

getInfoIp();

searchButton.addEventListener("click", getInfoIp);


// Определяем место расположененеи карты на сайте
const mymap = L.map('mapid').setView([0, 0], 3);

// Загружаем отбражение карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

// Добавляем иконку
const locationIcon = L.icon({
  iconUrl: require('../images/icon-location.svg'),
  iconSize: [45, 55], // size of the icon
  iconAnchor: [26.47, 54], // point of the icon which will correspond to marker's location
});

const marker = L.marker([0, 0], { icon: locationIcon }).addTo(mymap);
