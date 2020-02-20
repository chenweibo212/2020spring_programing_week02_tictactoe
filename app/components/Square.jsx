const React = require("react");

function Square(props){
    return(
        <button className = "square" onClick = {props.onClick}>
            {props.value}
        </button>
    )
}

module.exports = Square;