import './App.css';
import React, {Component} from "react";
import shuffle from "shuffle-array";
import Form from "./Form";

/* App will have a form , which does the API call
in component did Mount
can include image in App component
  -Show Form(country choices + GUESS) OR (correct/incorrect +NEXT)
  -(country choices + GUESS) inside Form
  -callback: Take form data and send to App
  -make App.state.show
  -then compare to App.state.Correct Guess -> correct/incorrect 
Clicking "Guess" should remove current form text (showChoices false) components and
  -(correct OR incorrect) + NEXT
Clicking the NEXT button should make showChoices true 
  and also set the Correct Guess in App.state
  -this will make the get call in componentDidMount
  -get 4 countries and one flag image (later make it randomly chosen)
  -in componentDidMount it should change the image


Because they are removed then added in, they should do componentDidMount each time and this
will cause the country names/flags to change*/

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
        return (<div id="guessing-game">
          <p>{ !this.state.showChoices ? ( this.state.correct ? "Correct!" : "Incorrect!" ): null}</p>
           <br />
          {this.state.showChoices ? <Form onClick={this.handleClick} handleChange={this.handleInputChange} 
          setup={this.onMount} names={this.state.names} chosenOne={this.state.choice}/> : 
          <button onClick={this.handleClick} id="next">Next</button> }
          <img src={this.state.imgLink} />
         </div>);
    }

}

export default App;