import React  from 'react';
import styled from "./map.module.css";
import { Delete , svg } from './svg';

const Map = ({ name , country , temp , weather , icon , data , set , id }) => {
    const clickHandler = id => {
        const remove = data.filter(item => item.id !== id)
        set(remove)
    }

    let date = new Date();

    let y = date.getFullYear();
    let m = date.getMonth();
    let d = date.getDay();

    m = m < 10 ? `0${m}` : m ;
    d = d < 10 ? `0${d}`: d ;

    const history = `${y}/${m}/${d}` ;
    
    return (
        <div  className={temp >= 31 ?styled.top : styled.bottom}>
            <h3>{name}<sup className={styled.count}>{country}</sup></h3>
            <p>{temp}<sup>{svg}</sup></p>
            <img className={styled.icon} src={icon}></img>
            <h4>{weather}</h4>
            <div className={styled.delete} onClick={() => clickHandler(id)}>{Delete}</div>
            <div className={styled.history}>{history}</div>
        </div>   
    );
};

export default Map;