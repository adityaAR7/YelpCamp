import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const handleLogout = () => {
    window.open("https://yelpcampbackend-production.up.railway.app/auth/logout", "_self");
  };
  return (
    <header className="p-3 bg-light mb-4 border-bottom ">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img
              src="https://raw.githubusercontent.com/NikelausM/yelp-camp/master/Campground%20Logo.PNG"
              alt="YelpCamp"
              className="me-2 img-resp"
              style={{ width: "3em" }}
            />
            <span className="fs-4 text-dark span-responsive pt-1">YelpCamp</span>
          </a>
          {props.user && (
            <div className="row">
              <div className="col p-0">
                <Link to="/discover" className="text-secondary text-decoration-none fs-5 me-2 link-responsive">Discover</Link>
              </div>
              <div class="col flex-shrink-0 dropdown">
                <a
                  href="#"
                  class="d-block link-dark text-decoration-none dropdown-toggle"
                  id="dropdownUser2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      props.user.photo
                        ? props.user.photo
                        : "https://raw.githubusercontent.com/NikelausM/yelp-camp/master/Campground%20Logo.PNG"
                    }
                    alt="mdo"
                    width="32"
                    height="32"
                    class="rounded-circle img-responsive"
                  />
                </a>
                <ul
                  class="dropdown-menu text-small shadow"
                  aria-labelledby="dropdownUser2"
                  style={{}}
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      {props.user.name}
                    </a>
                  </li>
                  <hr className="dropdown-divider" />
                  <li>
                    <a class="dropdown-item" href="#" onClick={handleLogout}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
