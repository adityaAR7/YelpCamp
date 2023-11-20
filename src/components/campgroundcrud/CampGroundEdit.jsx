import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CampGroundEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id,infoId, name, image, content } = location.state;
  const {register,handleSubmit,formState:{errors}} = useForm({defaultValues:{content:content,name:name}});

  const onSubmitEdit = async(data)=>{
    try {
      const {name,image,content} = data;
      // const image_url = URL.createObjectURL(image[0],{type: "image/png"});
      const image_content = [...new Uint8Array(await image[0].arrayBuffer())];

      await axios.put(`http://localhost:3000/edit/info/${infoId}/${id}`,{name:name,image:image_content,content:content});
      navigate("/info",{state:{id:id}});
  } catch (error) {
      console.log(error);
  }
  }
  return (
    <div className="container my-5 d-flex flex-column  align-items-center ">
      <h1 className="mb-5">
        {" "}
        <Link to="/info" state={{id:id,name:name}}>
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
        Edit the CampGround {name}
      </h1>
      <form className="col-12 col-lg-6">
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Upload New Image"
            {...register("image",{required:"This is required"})}
            style={{borderColor:errors.image && "red"}}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Name"
            {...register("name",{required:"This is required"})}
            style={{borderColor:errors.name && "red"}}
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Details"
            rows="4"
            {...register("content",{required:"This is required"})}
            style={{borderColor:errors.content && "red"}}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={handleSubmit(onSubmitEdit)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
