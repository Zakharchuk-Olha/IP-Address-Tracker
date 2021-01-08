var map = L.map('map');
const data_isp = document.getElementById("data_isp");
const data_location = document.getElementById("data_location");
const data_timezone = document.getElementById("data_timezone");
const data_ip = document.getElementById("data_ip");
const input = document.querySelector(".header__input");


const findIP = (data_ip = "") => {
  fetch(`https://geo.ipify.org/api/v1?apiKey=at_YmPq9TXnurcMHJvHDpTJyIsvoWAY8&ipAddress=${data_ip}`).then((response) => {
            return response.json()
        })
      .then((data) => {
        lat = data.location.lat;
        lng = data.location.lng;
        displayMap();
        displayIpInfo(data);
      })
}
findIP();

const displayIpInfo = (data) => {
  data_ip.innerText = `${data.ip}`;
  data_location.innerText =`${data.location.city}, ${data.location.country}, ${data.location.postalCode}`;
  data_timezone.innerText =`${data.location.timezone}`;
  data_isp.innerText =`${data.isp}`;
}


const displayMap = () => {
  map.setView([lat, lng], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: false
  }).addTo(map);

  let icon = L.icon({
         iconUrl: "images/icon-location.svg",
         iconAnchor: [lat, lng],
         iconSize: [35, 45],
     });
  L.marker([lat, lng], {icon: icon}).addTo(map)
};

  input.addEventListener("submit", event => {
    event.preventDefault()
    findIP(event.target[0].value);
    event.target[0].value = "";
    if (event.code === 'Enter') {
      event.preventDefault()
      findIP(event.target[0].value);
      event.target[0].value = "";
    }
  });
