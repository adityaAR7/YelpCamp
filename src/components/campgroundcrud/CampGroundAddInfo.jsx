import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function CampGroundAddInfo(props) {
  const {register,handleSubmit,formState:{errors}} = useForm()
  const { name, id,setImage,setContent,handleListItem,user} = props;

  const onSubmitInfo = async(data)=>{
    try {
        const {image,content} = data;
        const image_url = URL.createObjectURL(image[0],{type: "image/png"});
        const image_content = [...new Uint8Array(await image[0].arrayBuffer())];
  
        const response = await axios.post(`https://yelpcampbackend-production.up.railway.app/new/info/${id}/${user.id}`,{image:image_content,content:content});
        setImage(image_url);
        setContent(content);
        handleListItem();
        document.getElementById("1").click();
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div className="container col-9 my-5 d-flex flex-column  align-items-center ">
      <h1 className="mb-5 text-center">Add Information About {name}</h1>
      <form className="col-12 col-lg-6">
        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="image"
            {...register("image",{required:"This is required"})}
            style={{borderColor:errors.image && "red"}}
          />
        </div>
        <div className="mb-3">
          <textarea
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="content"
            rows="4"
            {...register("content",{required:"This is required"})}
            style={{borderColor:errors.content && "red"}}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={handleSubmit(onSubmitInfo)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
