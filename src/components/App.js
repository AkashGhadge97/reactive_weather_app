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
      nearByCities : []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }
  componentDidMount() {
    console.log("Inside componnt did mount");
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

  handleChange = (event) =>  {
      this.setState({ city: event.target.value })
  }

  handleSubmit = (event) =>  {
      this.componentDidMount()
      event.preventDefault();
  }

  handleButtonClick = (event) => {
    this.setState({ city : event.target.value})
    this.componentDidMount()
    console.log("After component did mount");
  }

  render() {
    return (
      <div className="App">
        <div className="AppHeader">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.city} onChange={this.handleChange} />
            <input type="submit" value="Search" />
          </form>
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

