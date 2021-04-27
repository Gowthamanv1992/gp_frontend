import React, {Component} from 'react'
import './home.css';
import Logo from "../images/cashew.png";


class HomePage extends Component {

    render() {
        return(
            <div>

                <div class="flex-container" style={{padding:30}}>
                    <div class="flex-image"><img className="image" src={Logo} alt="Cashew"></img></div>
                    <div><button color="inherit"  classes="flex-item" onClick={() => {this.props.history.push("/about_us")}}>About Us</button></div>
                    <div><button color="inherit"  classes="flex-item" onClick={() => {this.props.history.push("/signin")}}>Login/Sign Up</button></div>
                </div>

            </div>
        )
    }

}


export default HomePage;