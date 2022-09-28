import React from "react";
import { Link } from "react-router-dom";

export default function Cards(props) {
  return (
    <div className="card" id="card_cont">
      {/* <div className="cardim im1"></div> */}
      <img className="card-image-top" src={require(`./${props.imageDir}.png`)} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <Link to={props.linked} className="btn btn-primary">
          Click Me
        </Link>
      </div>
    </div>
  );
}
