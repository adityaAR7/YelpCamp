import React, { useState } from "react";
import CampGroundItems from "./CampGroundItems";
import { Link } from "react-router-dom";

export default function CampGroundTaskBar(props) {
  return (
    <div className="container">
      <div className="p-5 mb-4 bg-light rounded-3">
        <div className="container-fluid py-5">
          <h1 class="display-5 fw-bold">Welcome To YelpCamp!</h1>
          <p className="col-md-8 fs-4">
            View your hand-pick Campgrounds from all over the world
          </p>

          <Link to="/createCampGrounds" className="btn btn-primary btn-lg">
            Create New YelpCamp
          </Link>
        </div>
      </div>
      <div className="container py-5">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
          {props.items.map((item, index) => {
            return (
              <CampGroundItems
                key={index}
                id={item.id}
                title={item.title}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
