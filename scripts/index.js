const inputIp = document.querySelector(".tracker__input");
const searchButton = document.querySelector(".tracker__button");
ipInfo = document.querySelector(".tracker__ip");
locationInfo = document.querySelector(".tracker__location");
utcInfo = document.querySelector(".tracker__utc");
ispInfo = document.querySelector(".tracker__isp");

async function getInfoIp() {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_UbtFHbOTZFhcutSCRny7FfB7O44vm&ipAddress=${inputIp.value}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    ipInfo.textContent = data.ip;
    locationInfo.textContent = `${data.location.region} ${data.location.country}`;
    utcInfo.textContent = `UTC: ${data.location.timezone}`;
    ispInfo.textContent = data.isp;

    // Ставим паркер на карте
    marker.setLatLng([data.location.lat, data.location.lng]);
    mymap.setView([data.location.lat, data.location.lng], 4);
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
    iconUrl: '../images/icon-location.svg',
    iconSize: [45, 55], // size of the icon
    iconAnchor: [26.47, 54], // point of the icon which will correspond to marker's location
});

const marker = L.marker([0, 0], { icon: locationIcon }).addTo(mymap);