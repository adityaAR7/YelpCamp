import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import {  Link, useNavigate } from "react-router-dom";

export default function CreateCampGroundForm(props) {
  const navigate = useNavigate();
  const {user,items,setItems} = props;
  const {register,handleSubmit,formState:{errors}} = useForm()

  const handleCreateForm = async(data) =>{
    try {
      const {title,image,content} = data;
      const image_url = URL.createObjectURL(image[0],{type: "image/png"});
      const image_content = [...new Uint8Array(await image[0].arrayBuffer())];

      const response = await axios.post("https://yelpcampbackend-production.up.railway.app/new/campground",{title:title,image:image_content,content:content,uid:user["id"]});
      setItems((prevItems)=>{
        return [...prevItems,{title:title,image:image_url,id:response.data.result}]
      })
      navigate("/home");
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className="container my-5 d-flex flex-column align-items-center">
        <h1 className="mb-5">
          {" "}
          <Link to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="50"
              fill="currentColor"
              class="me-4 bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </Link>
          Create a New CampGround
        </h1>
        <form className="col-12 col-lg-6">
          <div className="mb-3">
            <input
              type="file"
              accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Image URL"
              {...register("image",{required:"This is required"})}
              style={{borderColor:errors.image && "red"}}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
             {...register("title",{required:"This is required"})} 
             style={{borderColor:errors.title && "red"}}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Content"
              rows="4"
              {...register("content",{required:"This is required"})}
              style={{borderColor:errors.content && "red"}}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={handleSubmit(handleCreateForm)}
          >
            Submit
          </button>
        </form>
      </div>
  );
}
