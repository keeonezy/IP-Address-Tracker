const inputIp = document.querySelector(".tracker__input");
const searchButton = document.querySelector(".tracker__button");
ipInfo = document.querySelector(".tracker__ip");
locationInfo = document.querySelector(".tracker__location");
utcInfo = document.querySelector(".tracker__utc");
ispInfo = document.querySelector(".tracker__isp");

async function getInfoIp() {
    ;
    const url = `https://geo.ipify.org/api/v2/country?apiKey=at_UbtFHbOTZFhcutSCRny7FfB7O44vm&ipAddress=${inputIp.value}`;
    const res = await fetch(url);
    const data = await res.json();

    ipInfo.textContent = data.ip;
    locationInfo.textContent = `${data.location.region} ${data.location.country}`;
    utcInfo.textContent = data.location.timezone;
    ispInfo.textContent = data.isp;
}

getInfoIp();

searchButton.addEventListener("click", getInfoIp);