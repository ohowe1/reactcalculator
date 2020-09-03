import React, { Component } from "react";
import "../styles/Button.css";

class Button extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
    }
    render() {
        return (
            <button
                onClick={this.click}
                className={this.props.type + " button"}
            >
                {this.props.name}
            </button>
        );
    }
    click() {
        if (this.props.click) {
            this.props.click(this.props.name);
        } else {
            console.warn("This button does not have any handler! I assume this is a bug.")
        }
    }
}

export default Button;
