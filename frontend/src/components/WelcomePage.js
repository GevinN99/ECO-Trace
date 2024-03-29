import React, {useEffect} from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {Link} from "react-router-dom";
import mountain1 from '../assets/images/Trees.png?lqip';
import mountain2 from '../assets/images/B-sm.png?lqip';
import mountain3 from '../assets/images/B-lg.png?lqip';
import sky from '../assets/images/bg-img.png?lqip';
import image from '../assets/images/Recycle-bg.jpg?lqip';
import logo from '../assets/images/logo.png?lqip';
import './WelcomePage.css';

const WelcomePage = () => {
    useEffect(() => {
        const handleScroll = () => {
            let scroll = window.pageYOffset;
            let section = document.querySelector("section");
            let sectionY = section.getBoundingClientRect();
            let translate = document.querySelectorAll(".translate");
            let big_title = document.querySelector(".big-title");
            let shadow = document.querySelector(".shadow");
            let content = document.querySelector(".content");
            let image_container = document.querySelector(".imgContainer");
            let opacity = document.querySelectorAll(".opacity");
            let border = document.querySelector(".border");
            let header = document.querySelector("header");

            let header_height = header.offsetHeight;
            let section_height = section.offsetHeight;

            translate.forEach((element) => {
                let speed = element.dataset.speed;
                element.style.transform = `translateY(${scroll * speed}px)`;
            });

            opacity.forEach((element) => {
                element.style.opacity = scroll / (sectionY.top + section_height);
            });

            big_title.style.opacity = -scroll / (header_height / 2) + 1;
            shadow.style.height = `${scroll * 0.5 + 300}px`;

            content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
            image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

            border.style.width = `${(scroll / (sectionY.top + section_height)) * 30}%`;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="WelcomePage">
            <header>
                <nav>
                    <div className="container">
                        <div>
                            <img src={logo} className="eco-trace-logo" alt="Eco-Trace"/>
                        </div>
                        <div className="sub-container">
                            <Link to="/login">
                                <button type="button" className="btn btn-dark btn-rounded">Login</button>
                            </Link>
                        </div>
                    </div>
                </nav>

                <h1 className="big-title translate" data-speed="0.1">WELCOME</h1>

                <img src={mountain1} className="mountain1 translate" data-speed="-0.2" alt=""/>
                <img src={mountain2} className="mountain2 translate" data-speed="0.4" alt=""/>
                <img src={mountain3} className="mountain3 translate" data-speed="0.3" alt=""/>
                <img src={sky} className="sky translate" data-speed="0.5" alt=""/>
            </header>

            <section>
                <div className="shadow"></div>

                <div className="container">
                    <div className="content opacity">
                        <h3 className="title">
                            About Eco-Trace
                            <div className="border"></div>
                        </h3>
                        <p className="text">ECO-TRACE, a comprehensive Recyclables Collection Tracking Application that streamlines data collection processes and empowers governmental authorities with real-time insights into waste collection progress.</p>
                    </div>

                    <div className="imgContainer opacity">
                        <img src={image} alt=""/>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WelcomePage;
