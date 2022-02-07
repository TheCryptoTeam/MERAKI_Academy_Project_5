


import "./Footer.css";
import { BsFacebook } from 'react-icons/bs';
import { ImGooglePlus3 } from 'react-icons/im';
import { FaInstagram } from 'react-icons/fa';




const Footer=()=>{



    return(

        <div className="footerImg">
<div className="footer">
    <div>
<h1>Crypto</h1><br/>
<p>Get 10% discount with notified about<br/> the latest news and updates. </p>
</div>
<div>
    <h3>feedback</h3>
    <br/>
    <input className="emailAddress" placeholder="Email Address"/>
    <button className="go">Go</button>
</div>
<div>
    <h3>Contact Us</h3><br/>
    <p>Your address or<br/>
contact info goes here</p>
</div>
<div>
   <h3>Follow Us</h3><br/>
   <div className="icon">
       <div className="icon1">
       <BsFacebook/>
       </div>
       <div className="icon1">
       <ImGooglePlus3/>
       </div>
       <div className="icon1">
       <FaInstagram/>
       </div>
   

   </div>
 
</div>
</div>


<hr/>
<br/>
<p>© 2022 Uniqlo All Right Reserved</p>
<br/>

        </div>
    )
}

export default Footer;
