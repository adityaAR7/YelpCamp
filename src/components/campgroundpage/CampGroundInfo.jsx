import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CampGroundComments from "./CampGroundComments";
import axios from "axios";
import CampGroundAddInfo from "../campgroundcrud/CampGroundAddInfo";
import CampGroundList from "./CampGroundList";
import { useForm } from "react-hook-form";

let infoId,owner;
export default function CampGroundInfo(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [addInfo, setAddInfo] = useState(false);
  const [ownerName,setOwnerName] = useState("");
  // const [infoId, setInfoId] = useState();
  const [title, setTitle] = useState("");
  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState(1);
  const [count, setCount] = useState(1);
  const [comments, setComments] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;

  const reload = async () => {
    const response = await axios.get(
      `https://yelpcampbackend-production.up.railway.app/fetch/` + props.user.id
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
    props.setItems(result);
    navigate("/home");
  };

  const handleItemInfo = async (e) => {
    try {
      setSelectedId(Number(e.target.id));
      setComments([]);
      const response = await axios.get(
        `https://yelpcampbackend-production.up.railway.app/fetch/info/${id}/${e.target.id}`
      );
      const result = response.data.result;
      const imageContent = new Uint8Array(JSON.parse(result["image"]));
      const image_url = URL.createObjectURL(
        new Blob([imageContent.buffer], {
          type: "image/png",
        })
      );
      infoId = result.id;
      owner = result.uid;
      setTitle(result.name);
      setContent(result.content);
      setImage(image_url);
      setAddInfo(false);

      const response2 = await axios.get(`https://yelpcampbackend-production.up.railway.app/name/${owner}`)
      setOwnerName(response2.data.result);

      const response1 = await axios.get(
        `https://yelpcampbackend-production.up.railway.app/fetch/info/comment/${infoId}`
      );
      setComments(response1.data.result);


    } catch (error) {
      setComments([]);
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://yelpcampbackend-production.up.railway.app/delete/info/${infoId}/${id}/${props.user.id}`
      );
      if (response.data.isEmpty == true) {
        reload();
        navigate("/home");
      }
      handleListItem();
      document.getElementById("1").click();
    } catch (error) {
      console.log(error);
    }
  };
  const handleListItem = async () => {
    try {
      const response = await axios.get(
        `https://yelpcampbackend-production.up.railway.app/fetch/total/info/${id}`
      );
      let result = [];
      for (let i = 2; i <= response.data.count; i++) {
        result.push(
          <CampGroundList id={i} key={i} handleItemInfo={handleItemInfo} />
        );
      }
      setList(result);
      setCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async (data) => {
    try {
      const date = new Date().toISOString().slice(0, 10);
      const response = await axios.post(
        `https://yelpcampbackend-production.up.railway.app/new/comment/info`,
        {
          infoId: infoId,
          comment: data.comment,
          name: props.user.name,
          uid: props.user.id,
          date: date,
        }
      );
      setComments((prevValue) => {
        return [...prevValue, response.data.result];
      });
      setIsShow(false);
      reset();
    } catch (error) {
      console.log(error);
    }

    // // setComments(response.data.result);
    // setIsShow(false);
  };

  useEffect(() => {
    document.getElementById(1).click();
    handleListItem();
  }, []);

  useEffect(() => {
    for (let i = 0; i <= count; i++) {
      document.getElementById(i).style.backgroundColor = "white";
    }
    document.getElementById(selectedId).style.backgroundColor = "#adb5bd";
    
  }, [selectedId]);

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-12 col-md-3">
          <h2 className="mb-4">YelpCamp</h2>
          <ul class="list-group mb-4">
            <li
              className="list-group-item text-center"
              id="1"
              onClick={handleItemInfo}
            >
              Info 1
            </li>
            {list}
            <li
              class="list-group-item text-center"
              id="0"
              onClick={() => {
                setSelectedId(0);
                setAddInfo(true);
              }}
            >
              Add More Information
            </li>
          </ul>
          <button
            className="btn btn-outline text-secondary"
            onClick={() => {
              reload();
              navigate("/home");
            }}
          >
            Go Back
          </button>
        </div>

        {addInfo ? (
          <CampGroundAddInfo
            name={title}
            id={id}
            user={props.user}
            setImage={setImage}
            setContent={setContent}
            handleListItem={handleListItem}
          />
        ) : (
          <div className="col-12 col-md-9">
            <div className="card mb-5">
              <img
                src={image}
                className="img-fuild"
                alt={title}
                style={{ width: "100%", height: "40em" }}
              />
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4 className="text-secondary">{title}</h4>
                  <h4 className="pull-right">$9.00/Night</h4>
                </div>
                <p className="card-text">{content}</p>
                <div className="d-flex justify-content-between">
                  {owner == props.user.id && (
                    <div>
                      <Link
                        to="/editCampGround"
                        state={{
                          id: id,
                          infoId: infoId,
                          name: title,
                          content: content,
                          image: image,
                        }}
                        className="btn btn-warning me-2"
                      >
                        Edit
                      </Link>
                      <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                      </button>
                    </div>
                  )}
                  <h5 className="text-secondary">-:By {ownerName}</h5>
                </div>
              </div>
            </div>
            <div className="container p-5 bg-light">
              <div className="row justify-content-between mb-2">
                {isShow ? (
                  <input
                    type="text"
                    className="  col-6 border rounded "
                    placeholder="Add Comment"
                    {...register("comment", { required: "This is required" })}
                    style={{
                      borderColor: errors.comment && "red",
                      padding: "10px",
                    }}
                  />
                ) : (
                  ""
                )}
                {isShow ? (
                  <div className="col-3 btn-group  justify-content-end">
                    <button
                      className="bg-light border-0 me-2"
                      onClick={handleSubmit(handleSubmitComment)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        class="bi bi-check"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                      </svg>
                    </button>
                    <button
                      className="bg-light border-0"
                      onClick={() => {
                        setIsShow(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        class="bi bi-x"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-light col-1 border-0"
                    onClick={() => {
                      setIsShow(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-plus-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                  </button>
                )}
              </div>
              <hr />
              {comments.map((comment, index) => {
                return (
                  <CampGroundComments
                    key={index}
                    id={comment.id}
                    owner={comment.uid}
                    uid={props.user.id}
                    name={comment.name}
                    time={comment.comment_date}
                    comment={comment.comment}
                    infoId={infoId}
                    setComments={setComments}
                  />
                );
              })}
              {/* */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
