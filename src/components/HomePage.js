import React, {Component} from 'react'
import './home.css';
import Logo from "../images/cashew.png";


class HomePage extends Component {

    render() {
        return(
            <div>

                <div class="flex-container" style={{padding:30}}>
                    <div class="flex-image"><img className="image" style={{width : 200}} src={Logo} alt="Cashew"></img></div>
                    <div><button color="inherit"  classes="flex-item" onClick={() => {this.props.history.push("/about_us")}}>About Us</button></div>
                    <div><button color="inherit"  classes="flex-item" onClick={() => {this.props.history.push("/signin")}}>Login/Sign Up</button></div>
                </div>

                <br/>
                <br/>
                <h1 style={{textAlign : "center", color : "grey"}}>
                    Welcome to Cashew, your Cloud based application for simulation operations. 
                </h1>

                <br/>
                <br/>
                <h2 style ={{paddingLeft: 50}}>
                    Why Cashew?
                </h2>

                <div style={{paddingLeft : 140, fontSize : 20}}>
                <li style={{paddingTop : 30}}>Run as much of parallel simulations as you want. Sky is the limit!!</li>
                <li style={{paddingTop : 30}}>Provides simple but powerful UI and improves efficiency.</li>
                <li style={{paddingTop : 30}}>Uses advanced Machine Learning techniques to optimize the workflow.</li>
                </div>
            </div>
        )
    }

}


export default HomePage;