import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Card from './components/Card/Card';
import { API_KEY, LAT, LON } from './env';
import BarGraph from "./components/VXGraph/VXGraph";
import Hourly from './components/Hourly/Hourly';



function App() {

  const [zone, setZone] = useState('');
  const [data, setData] = useState();
  const [hData, setHData] = useState();
  const [hShown, setHShown] = useState();
  const [day, setDay] = useState();

  useEffect(()=>{
    let p = new Promise((resolve, reject)=>{
      resolve(
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${LAT}&lon=${LON}&exclude=minutely,current,alerts&appid=${API_KEY}`)
        .then(res=>res.json())
      );
    });
    p.then((data)=>{
      const { daily, timezone, hourly } = data;
      setHData(hourly);
      setZone(timezone);

      //as just 5 days required
      setData(daily.filter((f, idx) => idx < 5).map(d => (
        { 
          dt: d.dt,
          day: DayIndex[new Date(d.dt * 1000).getDay()].short,
          min: d.temp.min,
          max: d.temp.max,
          //app should not crash when there is no weather back from response, and show clear day
          img: `./${d.weather[0]?.icon ?? '01d'}.png`
        }
      )));
      
    })
    .catch(e=>{
      alert("Data is not fetched!");
      console.log(e)
    })
  }, []);


  //if day or data changes, we should change hourly weather data
  useEffect(()=>{
    let dayIndex = DayIndex.findIndex(d => d.short === day);
    
    //find the dt of the day
    let id = data?.find(d => new Date(d.dt * 1000).getDay() === dayIndex)?.dt;
    

    if (id) {
      //set hourly data to show
      setHShown(hData.filter(item => parseInt(item.dt / (3600 * 24)) === parseInt(id / (3600 * 24))).map(f => (
        {
          day: new Date(f.dt * 1000).getHours() + ":00",
          dt: f.dt,
          temp: f.temp,
          img: `./${f.weather[0]?.icon}.png`
        }
      )))
    }
  }, [day, data])

  return (
    <div className="App">
      <h3 style={{textAlign: 'center'}}>Weather App: {zone}</h3>
      <Switch>
        <Route 
          key="daily" 
          path="/" 
          exact 
          render={() => (
            <div 
              style={{ display: 'flex', justifyContent: 'space-around', width: '60%', margin: '30px auto' }}>
              {
                //when data is not fetched or still fetching, it must not crash
                data?.map((item, idx) =><Link
                  key={`link-${idx}`} 
                  to={`/${item.day}`} 
                  style={{ color: '#000', textDecoration: 'none' }}>
                  {
                    <Card {...item} key={idx} />
                  }
                  
                </Link>) ?? 'Loading...'
              }
        </div>)}/>
        <Route 
          key="hourly"
          path="/:day" 
          exact 
          render={({ match: {params} })=><Hourly 
            handleShowHourly={setDay} 
            params={params} 
            hShown={hShown} />
        } />


      </Switch>
      
    </div>
  );
}

export default App;

export const DayIndex = [
  { short: "Sun", long: "Sunday" },
  { short: "Mon", long: "Monday" },
  { short: "Thue", long: "Thuesday" },
  { short: "Wed", long: "Wednesday" },
  { short: "Thur", long: "Thursday" },
  { short: "Fri", long: "Friday" },
  { short: "Sat", long: "Saturday" },
]


export const sample = [
  {
    day: 'Wed',
    min: 78,
    max: 67,
    img: './cloud.png'
  },
  {
    day: 'Thu',
    min: 78,
    max: 67,
    img: './sunny.jpg'
  },
  {
    day: 'Fri',
    min: 78,
    max: 67,
    img: './cloud.png'
  },
  {
    day: 'Sat',
    min: 78,
    max: 67,
    img: './rainy.png'
  },
  {
    day: 'San',
    min: 78,
    max: 67,
    img: './snow.png'
  }
]

