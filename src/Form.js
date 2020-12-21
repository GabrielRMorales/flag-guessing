import React,{Component} from "react";
import axios from "axios";

class Form extends Component {
    constructor(props){
        super(props);
        

    }
    
    componentDidMount(){
        axios.get("https://restcountries.eu/rest/v2/all").then((data)=>{            
            this.props.setup(data);
        });
    }

    render(){
        let names = this.props.names.map((name)=>{
            let countryName=name;
            return <label>       
            <input 
                  name={countryName}
                  value = {countryName}
                  type="radio"
                  checked={this.props.chosenOne === countryName}
                  onChange={this.props.handleChange}/>
                     {countryName}
          </label>;
        });
        return (<form onSubmit={this.props.onClick}>
            {names}
            <button >GUESS</button>
        </form>);
    }


}


export default Form;