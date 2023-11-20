import React, { useEffect, useState } from "react";
import CampGroundItems from "./campgroundpage/CampGroundItems";
import axios from "axios";


export default function CampGroundDiscover() {
  const [items, setItems] = useState([]);
  
  const handleDiscover = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/fetch/all`
      );
      let result = response.data.result;
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
    handleDiscover();
  }, []);

  return (
    <div className="container">
      <div className="container py-5">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
          {items.map((item, index) => {
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
