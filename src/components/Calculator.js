import React, { Component } from "react";
import "../styles/Calculator.css";
import Button from "./Button";
import Output from "./Output";

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { showing: null, previous: null, operator: null };
        this.compute = this.compute.bind(this);
    }
    render() {
        return (
            <div className="Calculator">
                <Output display={this.state.showing ? this.state.showing : 0} />
                <div className="row">
                    <Button name="AC" type="other large" click={this.compute} />
                    <Button name="%" type="other" click={this.compute} />
                    <Button name="÷" type="operator" click={this.compute} />
                </div>
                <div className="row">
                    <Button name="7" type="number" click={this.compute} />
                    <Button name="8" type="number" click={this.compute} />
                    <Button name="9" type="number" click={this.compute} />
                    <Button name="×" type="operator" click={this.compute} />
                </div>
                <div className="row">
                    <Button name="4" type="number" click={this.compute} />
                    <Button name="5" type="number" click={this.compute} />
                    <Button name="6" type="number" click={this.compute} />
                    <Button name="-" type="operator" click={this.compute} />
                </div>
                <div className="row">
                    <Button name="1" type="number" click={this.compute} />
                    <Button name="2" type="number" click={this.compute} />
                    <Button name="3" type="number" click={this.compute} />
                    <Button name="+" type="operator" click={this.compute} />
                </div>
                <div className="row">
                    <Button name="0" type="number large" click={this.compute} />
                    <Button name="." type="number" click={this.compute} />
                    <Button name="=" type="operator" click={this.compute} />
                </div>
            </div>
        );
    }

    compute(thing) {
        if (!isNaN(thing) || thing === ".") {
            // is number
            if (this.state.showing) {
                if (this.state.showing.length >= 16) {
                    return;
                }
                if (this.state.showing.includes(".") && thing === ".") {
                    return;
                }
            }
            this.setState({
                showing: (this.state.showing ? this.state.showing : "") + thing,
            });
        } else {
            // is operator
            if (thing === "AC") {
                this.setState({
                    showing: null,
                    operator: null,
                    previous: null
                })
                return;
            }
            if (thing === "=") {
                if (this.state.operator != null) {
                    this.setState({
                        showing: this.compitewithsign(
                            this.state.operator,
                            this.state.previous ? this.state.previous : 0,
                            this.state.showing ? this.state.showing : 0
                        ),
                        operator: null,
                        previous: null,
                    });
                }
                return;
            }
            let todo = this.state.showing;
            if (this.state.previous && this.state.operator) {
                todo = this.compitewithsign(
                    this.state.operator,
                    this.state.previous,
                    this.state.showing ? this.state.showing : 0
                );
            }
            if (thing === "×") {
                this.setState({ operator: "*" });
            } else if (thing === "-") {
                this.setState({ operator: "-" });
            } else if (thing === "+") {
                this.setState({ operator: "+" });
            } else if (thing === "÷") {
                this.setState({ operator: "/" });
            } else if (thing === "%") {
                this.setState({ operator: "%" });
            }
            this.setState({ previous: todo });
            this.setState({ showing: null });
        }
    }

    compitewithsign(sign, number1, number2) {
        number1 = parseFloat(number1);
        number2 = parseFloat(number2);
        if (sign === "*") {
            return number1 * number2;
        }
        if (sign === "/") {
            return number1 / number2;
        }
        if (sign === "+") {
            return number1 + number2;
        }
        if (sign === "-") {
            return number1 - number2;
        }
        if (sign === "%") {
            return number1 % number2;
        }
        return null;
    }
}

export default Calculator;
