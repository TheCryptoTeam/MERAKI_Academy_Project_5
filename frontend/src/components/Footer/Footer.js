


import "./Footer.css";
import { BsFacebook } from 'react-icons/bs';
import { ImGooglePlus3 } from 'react-icons/im';
import { FaInstagram } from 'react-icons/fa';
import { useRef, useState } from "react";
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { init } from '@emailjs/browser';
init("user_SBk74LXiwtQFn10I8H4vW");




const Footer = () => {

    const [txtFeedBack, setTxtFeedBack] = useState("")
    const dispatch = useDispatch();
    const form = useRef();
    const state = useSelector((state) => {
        return {
            token: state.loginReducer.token,
            products: state.productsReducer.products,
            isLoggedIn: state.loginReducer.isLoggedIn,
        };
    });


    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.send("service_6fetmt6", "template_i0a03na", {
            from_name: localStorage.getItem('userName'),
            to_name: 'Crypto team',
            message: txtFeedBack,
            reply_to: "crypto",
        }, 'user_SBk74LXiwtQFn10I8H4vW')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            }, (err) => {
                console.log('FAILED...', err);
            });
    }



    return (

        <div className="footerImg">
            <div className="footer">
                <div>

                    <h1>Crypto</h1><br />
                    <p>Get 10% discount with notified about<br /> the latest news and updates. </p>
                </div>
                <div>
                    <h3>any suggestion</h3>
                    <br />
                    <form ref={form} onSubmit={sendEmail}>
                        <input className="emailAddress" placeholder="Email Address" onChange={(e) => {
                            setTxtFeedBack(e.target.value)
                        }}
                        />
                        <button className="go" onClick={() => {
                            Swal.fire({

                                icon: 'success',
                                title: 'Your work has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }}>send</button></form>
                </div>
                <div>
                    <h3>Contact Us</h3><br />
                    <p>Your address or<br />
                        contact info goes here</p>
                </div>
                <div>
                    <h3>Follow Us</h3><br />
                    <div className="icon">
                        <div className="icon1">
                            <BsFacebook />
                        </div>
                        <div className="icon1">
                            <ImGooglePlus3 />
                        </div>
                        <div className="icon1">
                            <FaInstagram />
                        </div>


                    </div>

                </div>
            </div>


            <hr />
            <br />
            <p>© 2022 Crypto All Right Reserved</p>
            <br />

        </div>
    )
}

export default Footer;
