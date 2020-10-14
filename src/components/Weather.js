import React from 'react';

export default function Weather(props) {
    return (

        <div>
            <h3>{props.data.name}  {props.data.region} , {props.data.country}</h3>
            <img src={props.data.icon} alt="test" />
            <h2>{props.data.temperature}</h2>
            <h2>{props.data.description}</h2>
            <h2>{props.data.precip}</h2>
            <h2>{props.data.humidity}</h2>
        </div>

    )
}
