import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function CampGroundSignup(props) {
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}}  = useForm();
  
  const handleLocalAuth = async(data)=>{
    try{
      const response = await axios.post("http://localhost:3000/auth/local/register",data);
      if(response.status == 200){
        props.setUser(response.data.user);
        navigate("/")
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <section class="vh-100">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card shadow-2-strong" style={{borderRadius: "1rem"}}>
            <div class="card-body p-5 text-center">
  
              <h3 class="mb-5">Register</h3>
  
              <div class="form-outline mb-4">
                <input {...register("username",{required:"Username is required",minLength:{
                  value:5,
                  message:"Username should be of min length 5"
                }})} type="email" id="typeEmailX-2" class="form-control form-control-lg" placeholder="Username" style={{borderColor:errors.username && "red"}}/>
                
              </div>
  
              <div class="form-outline mb-4">
                <input {...register("password",{required:"Password is required",minLength:{
                  value:10,
                  message:"Password should be of min length 10"
                }})} type="password" id="typePasswordX-2" class="form-control form-control-lg" placeholder="Password" style={{borderColor:errors.password && "red"}}/>
               
                
              </div>
  
              
              <div class="form-check d-flex justify-content-start mb-4">
                <input class="form-check-input me-2" type="checkbox" value="" id="form1Example3" />
                <label class="form-check-label" for="form1Example3"> Remember password </label>
              </div>
  
              <button class="btn btn-primary btn-lg btn-block w-100" type="submit" onClick={handleSubmit(handleLocalAuth)}>Register</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
