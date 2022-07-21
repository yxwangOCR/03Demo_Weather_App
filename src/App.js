import React, { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=0c6a0a2c24be6a2bac0f492e38ea7cff`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  // if typing mistake? How?

  return (
    <div className='App'>
      <div className='search'>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter location'
          type='text'
        />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            {data.main ? (
              <h1>{(((data.main.temp - 32) * 5) / 9).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className='description'>
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && ( // shows only when there is an input city name
          <div className='bottom'>
            <div className='pressure'>
              {data.main ? <p>{data.main.pressure}</p> : null}
              <p>Pressure</p>
            </div>
            <div className='humidity'>
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? <p>{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
