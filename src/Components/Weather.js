import React, { useState } from 'react';
import axios from "axios"
import Map from './map';
import styled from "./weather.module.css" ;

const Weather = () => {
    const [data , setData] = useState([]) ;
    const [input , setInput] = useState({name : ""}) ;

    const base_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.name}&appid=edc228562ac0a8aa3116d41c0687cf56&units=metric` ;

    const Api = async() => {
            const get_API = await axios.get(`${base_URL}`) ;

            return get_API.data ;
    } ;

    const changeHandler = e => {
        setInput({...input , name : e.target.value}) 
    } ;
    
    const submitHaandler = async (e) => {
        e.preventDefault() ; 
        setData([...data , await Api() ]) ;
        setInput({name : ""})
    }

    return (
        <div className={styled.component}  onSubmit={submitHaandler}>
            <h1 className={styled.header}>Weather App</h1>
            <form  onSubmit={submitHaandler}>
                    <input 
                        name="search" 
                        type="text" 
                        value={input.name} 
                        onChange={changeHandler} 
                        placeholder="search for a sity">
                    </input>
                    <button type="submit" className={styled.submit}><span className={styled.span}></span>SUBMIT</button>
            </form>
            <p className={styled.new}>
            {data.length !== 0 && data.map(item =><div key={item.main.temp}> <Map 
                name={item.name} 
                country={item.sys.country} 
                temp={Math.round(item.main.temp)} 
                weather={item.weather[0]["description"]}
                icon={`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${item.weather[0]["icon"]}.svg`}
                data={data}
                set={setData}
                id={item.id}/></div>
            )}
             </p>
        </div>
    );
};

export default Weather;