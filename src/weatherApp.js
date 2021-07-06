import './weatherApp.css';
import { useState, useEffect } from "react";

export default function WeatherApp() {

// calling the API hooks we need    
const [coords, setCoords] = useState('');
const [cityName, setCityName] = useState('');
const [countryName, setCountryName] = useState('');
const [weatherType, setWeatherType] = useState('');
const [clouds, setClouds] = useState(0);
const [cloudsText, setCloudsText] = useState('');
const [humidity, setHumidity] = useState(0);
const [temp, setTemp] = useState(0);
const [icon, setIcon] = useState(null);
const [tempMax, setTempMax] = useState(0);
const [tempMin, setTempMin] = useState(0);
const [wind, setWind] = useState(0)

// setting the API link with coords
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCoords(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
            // lat={lat}&lon={lon}
        })
    });

// Calling the API 
    useEffect(() => {
        if(coords) {
            const url = `http://api.openweathermap.org/data/2.5/weather?${coords}&appid=9cca990df9770fd6669bb4aa7f9ce7c5&units=metric`
            // const APIkey = '9cca990df9770fd6669bb4aa7f9ce7c5'
            fetch(url).then(res => res.json()).then(response => {
                console.log(response);
                setCityName(response.name);
                setCountryName(response.sys.country);
                setClouds(response.clouds.all);
                setWeatherType(response.weather[0].main);
                setCloudsText(response.weather[0].description);
                setTemp(response.main.temp);
                setIcon(`http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);
                setHumidity(response.main.humidity);
                setTempMax(response.main.temp_max);
                setTempMin(response.main.temp_min);
                setWind(response.wind.speed)
            })
        }
    }, [coords]);
    
 // Printing the data   
    return (
        <div className="weather-box"> 
    
            <h1 className="country-text">
                {cityName}, {countryName}
            </h1>

            <div className="cloud-text-box">

                <div className="clouds-text">
                    Clouds: {clouds}%
                </div>

                <div className="clouds-text">
                    {weatherType}: {cloudsText}
                </div>

            </div>

            <div className="cloud-text-box">

                <div className="clouds-text">
                    Humidity: {humidity}%
                </div>

                <div className="clouds-text">
                    Wind: {wind} m/s
                </div>

            </div>

            <h3><img alt="" className="icon" src={icon}></img></h3>

            <h2 className="main-temp">
                {temp}ºC
            </h2>

            <div className="high-lows">
                Max:{tempMax}ºC Min:{tempMin}ºC
            </div>
            
        </div>
    )
};