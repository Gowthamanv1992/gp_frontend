import React from 'react';
import './about-us.css';
import Alice from "../images/Alice.png";
import Enara from "../images/Enara.png";
import Carmen from "../images/Carmen.png";
import Gowthaman from "../images/Gowthaman.png";
import Pierre from "../images/Pierre.png";
import {Link, withRouter} from "react-router-dom";
import Logo from "../images/cashew.png";
import { useHistory } from 'react-router'


function AboutUs() {

    let history = useHistory();

    return(
        <div>

                <div class="flex-container" style={{padding:30}}>
                        <Link to="/">
                            <img className="image" src={Logo} alt="Cashew"></img>
                        </Link>
                    
                </div>

                <h1 style={{textAlign : "center"}}>About Us</h1>

                <h3 style={{textAlign : "center"}}>Cashew is developed by Cranfield University students provides platform to integrate and run Simulation as a Service. It uses advanced state-of-the-art Machine Learning techniques to optimise the simulations. </h3>
                
                <br/>
                <br/>

                <h1 style={{textAlign : "center"}}>Our Team</h1>
                <div className="about-us-flex" style={{paddingTop : 80}}>
                    <div>
                        <img className="about-us-image" src={Alice} alt="Alice"></img>
                        <div className="name">ALICE DRAILLARD</div>
                        <div className="role">Software Engineer & Frontend Lead</div>
                    </div>
                    <div>
                        <img className="about-us-image" src={Carmen} alt="Carmen"></img>
                        <div className="name">CARMEN YANGUAS</div>
                        <div className="role">CFD Engineer & Design Lead</div>
                    </div>
                    <div>
                        <img className="about-us-image" src={Enara} alt="Enara"></img>
                        <div className="name">ENARA MARTIN</div>
                        <div className="role">Data Science & Machine Learning Engineer</div>
                    </div>
                    <div>
                        <img className="about-us-image" src={Gowthaman} alt="Gowthaman"></img>
                        <div className="name">GOWTHAMAN VIVEKANANDAN</div>
                        <div className="role">Software Engineer & Frontend Lead</div>
                    </div>
                    <div>
                        <img className="about-us-image" src={Pierre} alt="Pierre"></img>
                        <div className="name">PIERRE JOUMARD</div>
                        <div className="role">Subject Matter Expert, CFD & Simulations</div>
                    </div>
                </div>
        </div>
    )
}

export default AboutUs;