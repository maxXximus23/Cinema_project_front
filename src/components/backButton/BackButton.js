import React from "react";

export default function BackButton(props) {
    return <button onClick={props.backPath} className="movie-back-button">&#8637; Go back</button>
}