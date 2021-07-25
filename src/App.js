import './App.css';
import React, {Component} from "react";
import shuffle from "shuffle-array";
import Form from "./Form";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
          showChoices: true,
          correct: false,
          names: [],
          imgLink: "",
          correctFlag: "",
          choice: ""
        }
    this.handleClick=this.handleClick.bind(this);
    this.handleInputChange=this.handleInputChange.bind(this);
    this.onMount=this.onMount.bind(this);
    }

    handleInputChange(event){
      const targetVal = event.target.value;
      console.log(targetVal);
      this.setState({
        choice: targetVal
      }, function(){
        console.log(this.state.choice)});
    }
    onMount(countryInfo){
      let countryArray = countryInfo.data;
      shuffle(countryArray);
      const countries = countryArray.slice(0,4).map(country=>{
      return country.name; });
      let random = Math.floor(Math.random() * countries.length);
      const imgLink =countryInfo.data[random].flag;

      this.setState({names: countries, imgLink, correctFlag: random});
    }

    handleClick(e){
        e.preventDefault();
        //compare
        let isCorrect=false;
        let index = this.state.correctFlag;
        if (this.state.choice===this.state.names[index]){
          isCorrect=true;
        }       
        this.setState(state=>({
          showChoices: !state.showChoices,
          correct: isCorrect
        }));
    }
    render(){
        return (<div>
          <header>

          </header>
          <div id="guessing-game">
          <p>{ !this.state.showChoices ? ( this.state.correct ? "Correct!" :
           `Incorrect! The correct answer was ${this.state.names[this.state.correctFlag]}` ): null}</p>
           <br />
          {this.state.showChoices ? <Form onClick={this.handleClick} handleChange={this.handleInputChange} 
          setup={this.onMount} names={this.state.names} chosenOne={this.state.choice}/> : 
          <button onClick={this.handleClick} id="next">Next</button> }
          </div>
         <div id="flag">
           <img src={this.state.imgLink} />
           </div></div>);
    }

}

export default App;