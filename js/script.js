const autorName = document.getElementById("autor-name")
const references = document.getElementById("references")

const bitcoinInfo = document.getElementById("bitcoin-info")
const etherInfo = document.getElementById("ether-info")
const dogeInfo = document.getElementById("doge-info")
const rvnInfo = document.getElementById("rvn-info")
const errMessage = "Sorry , there was a mistake connecting to CoinGecko API"

const weatherIcon = document.getElementById("weather-icon")
const place = document.getElementById("place")
const temperature = document.getElementById("temperature")
const temperatureFeel = document.getElementById("temperature-feel")
const humidity = document.getElementById("humidity")

const temperatureMax = document.getElementById("temperature-max")
const temperatureMin = document.getElementById("temperature-min")




const time = document.getElementById("date-time")

console.log(autorName)
// adding background image from splash api

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then(res => res.json())
.then (data =>{
 console.log(data)
  console.log(data.urls.raw)
 document.body.style.backgroundImage = `url(${data.urls.full})`



// adding autor name  from splash api and default img when necesary

autorName.textContent=`autor : ${data.user.name}
` 
})
.catch(err=> {

    document.body.style.backgroundImage= `url("img/default.png")`


})

// adding references for icon and myself

references.innerHTML =`
<p class="spacing-right">written by: <a class="links-style" target="_blank" href="https://github.com/luis2605">luis2605</a></p>
`

//adding bitcoin 

fetch("https://api.coingecko.com/api/v3/coins/bitcoin")

.then(res => 
    
     res.json())
.then(data => {
    console.log(data)
  
    bitcoinInfo.innerHTML = `<p><img class="crypto-logos" src="${data.image.thumb}"> BTC :  ${Math.trunc(data.market_data.current_price.eur)} € </p>` 



})
.catch(err => {
    bitcoinInfo.innerHTML = `<p class="smaller-text">${errMessage}</p>` 
})

//adding eth info

fetch("https://api.coingecko.com/api/v3/coins/ethereum")
.then(res => 
    res.json())
.then(data => {

    console.log(data)
    etherInfo.innerHTML = `<p><img class="crypto-logos" src="${data.image.thumb}"> Eth : ${Math.trunc(data.market_data.current_price.eur)} € </p>` 
console.log(Math.trunc(data.tickers[3].last))


})
.catch(err => {
    bitcoinInfo.innerHTML = `<p class="smaller-text">${errMessage}</p>` 
})
//adding dogecoin info
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
.then(res=>
    res.json())
    .then(data =>{console.log(data)
    dogeInfo.innerHTML =`<p><img class="crypto-logos" src="${data.image.thumb}">Doge: ${data.market_data.current_price.eur} €</p>`
    
    })
    .catch(err => {
        dogeInfo.innerHTML = `<p class="smaller-text">${errMessage}</p>` 
    })

    //adding rvn info
fetch("https://api.coingecko.com/api/v3/coins/ravencoin")
.then(res=>
    res.json())
    .then(data =>{console.log(data)
    rvnInfo.innerHTML =`<p><img class="crypto-logos" src="${data.image.thumb}">RVN: ${data.market_data.current_price.eur} €</p>`
    
    })
    .catch(err => {
        rvnInfo.innerHTML = `<p class="smaller-text">${errMessage}</p>` 
    })

// adding date and time

function findTime(){
let current = new Date()
time.innerHTML = `<h2> ${current.toLocaleTimeString([] ,{  timeStyle:"short"})}</h2><h3>${current.toLocaleDateString()}</h3>`}

// refreshing time every second

setInterval(findTime,1000)



//finding out the geolocation  of user using geolocation api  for giving  the weather api geocoordinates

let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  
  function success(pos) {
    let crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    // getting the weather
    fetch (`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric`)

    .then (res => res.json ())
    .then (data => {
        
        console.log(data)
        const weather = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        weatherIcon.innerHTML =`<img src="${weather}"/>`
        place.textContent=`<_< ${data.name} >_>`
    temperature.textContent=`Temp: ${data.main.temp} °C`
    temperatureFeel.textContent=`Feels like : ${data.main.feels_like}°C`
    humidity.textContent=`Humidity :${data.main.humidity} %`
    temperatureMax.textContent=`Max :${data.main.temp_max} °C `
    temperatureMin.textContent=`Min :${data.main.temp_min} °C `
    
    
    
    })




  }
  
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  
  navigator.geolocation.getCurrentPosition(success, error, options);

  
 