import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";

import "../../css/Slider.css";

class Slider extends Component {
    showSettings(event) {
        event.preventDefault();
    }

    render() {
        return (
            <Menu right>
                <a id="home" className="menu-item" href="/">
                    Home
                </a>
                <a id="about" className="menu-item" href="/about">
                    About
                </a>
                <a id="contact" className="menu-item" href="/contact">
                    Contact
                </a>
                <a onClick={this.showSettings} className="menu-item" href="">
                    Settings
                </a>
            </Menu>
        );
    }
}

export default Slider;
