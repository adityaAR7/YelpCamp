import React from "react";
import { Link } from "react-router-dom";

export default function CampGroundItems(props) {
  const { id ,title, image} = props;
  return (
    <div class="col">
      <div class="card shadow-sm">
        <img src={image} class="card-img-top" alt="..." />

        <div class="card-body text-center">
          <h5 class="card-title mb-4">{title}</h5>
          <Link
            className="btn btn-primary"
            to="/info"
            state={{
              id: id
            }}
          >
            More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
