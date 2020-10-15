import React from 'react';
import Weather from './Weather.js';
import {CallWeatherAPI,  CallCitiesAPI } from '../helper/helper.js'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      temperature: null,
      icon: null,
      description: null,
      precip: null,
      humidity: null,
      name: null,
      region: null,
      country: null,
      city: "",
      isCityChanged : false,
      nearByCities : []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }
  componentDidMount() {
    let cityName = this.state.city
    CallWeatherAPI(cityName?cityName:"Satara")
      .then((data) => {
        this.setState({
          temperature: data.current.temperature,
          icon: data.current.weather_icons,
          description: data.current.weather_descriptions,
          precip: data.current.precip,
          humidity: data.current.humidity,
          name: data.location.name,
          region: data.location.region,
          country: data.location.country
        })
      })
      .catch((err) => {
        console.log("Error Occurred while fethcing Wetaher data.");
      })

      CallCitiesAPI(cityName?cityName:"Satara")
        .then((data) => {
          this.setState({
            nearByCities: data
          })
        })
        .catch((err) => {
          console.log("Error Occurred while fethcing newarby cities .");
        })
  }

  componentDidUpdate(){
     if (this.state.isCityChanged){
       console.log("Update==========================================================");
      let cityName = this.state.city
      CallWeatherAPI(cityName?cityName:"Satara")
        .then((data) => {
          this.setState({
            temperature: data.current.temperature,
            icon: data.current.weather_icons,
            description: data.current.weather_descriptions,
            precip: data.current.precip,
            humidity: data.current.humidity,
            name: data.location.name,
            region: data.location.region,
            country: data.location.country
          })
        })
        .catch((err) => {
          console.log("Error Occurred while fethcing Wetaher data.");
        })
  
        CallCitiesAPI(cityName?cityName:"Satara")
          .then((data) => {
            this.setState({
              nearByCities: data
            })
          })
          .catch((err) => {
            console.log("Error Occurred while fethcing newarby cities .");
          })
          this.setState({isCityChanged : false})
     }
  }

  handleChange = (event) =>  {
      this.setState({ city: event.target.value , isCityChanged : true })
  }


  handleButtonClick = (event) => {
    this.setState({ city : event.target.value ,  isCityChanged : true })
  }

  render() {
    return (
      <div className="App">
        <div className="AppHeader">
            <input type="text" value={this.state.city} onChange={this.handleChange} />
        </div>
        <div className="LeftWindow">
          <div>
             {
               this.state.nearByCities.map((item,index) => {
                return <button key= {index} value = {item} onClick = {this.handleButtonClick}>{item}</button>
               }) 
             }
          </div>
        </div>
        <div className="RightWindow">
          <Weather data={this.state} />
        </div>
      </div>
    );
  }
}

