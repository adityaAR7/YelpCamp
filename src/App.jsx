import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateCampGroundForm from "./components/campgroundcrud/CampGroundCreateForm";
import CampGroundTaskBar from "./components/campgroundpage/CampGroundTaskBar";
import CampGroundInfo from "./components/campgroundpage/CampGroundInfo";
import CampGroundEdit from "./components/campgroundcrud/CampGroundEdit";
import CampGroundLogin from "./components/CampGroundLogin";
import axios from "axios";
import CampGroundSignup from "./components/CampGroundSignup";
import CampGroundDiscover from "./components/CampGroundDiscover";

axios.defaults.withCredentials = true; //to allow cross origin credetinals solution

export default function App() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);

  const handleAuthProcess = async () => {
    try {
      const response = await axios.get(
        "https://yelpcampbackend-production.up.railway.app/auth/login/success"
      );
      setUser(response.data.user);
      const response1 = await axios.get(
        `https://yelpcampbackend-production.up.railway.app/fetch/` + response.data.user.id
      );
      let result = response1.data.result;
      result = result.map((item) => {
        const imageContent = new Uint8Array(JSON.parse(item["image"]));
        const image_url = URL.createObjectURL(
          new Blob([imageContent.buffer], {
            type: "image/png",
          })
        );
        return { ...item, image: image_url };
      });
      setItems(result);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleAuthProcess();
  }, []);

  return (
    <div className="root">
      <Router>
        <Header user={user} />
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/home" />
              ) : (
                <CampGroundLogin setUser={setUser} />
              )
            }
          />
          <Route
            path="/register"
            element={<CampGroundSignup setUser={setUser} />}
          />
          <Route
            path="/home"
            element={
              user ? <CampGroundTaskBar items={items} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/createCampGrounds"
            element={
              user ? (
                <CreateCampGroundForm
                  user={user}
                  items={items}
                  setItems={setItems}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/info"
            element={
              user ? (
                <CampGroundInfo user={user} setItems={setItems} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/editCampGround"
            element={user ? <CampGroundEdit /> : <Navigate to="/" />}
          />
          <Route
            path="/discover"
            element={user ? <CampGroundDiscover /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
