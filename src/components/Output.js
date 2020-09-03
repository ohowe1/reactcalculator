import React from "react";
import "../styles/Output.css";

function Output(props) {
    return (
        <div className="output">
            <p>{props.display}</p>
        </div>
    );
}

export default Output;
