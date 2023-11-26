import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { data, error } from "jquery";

export default function CampGroundComments(props) {
  const { id, name, comment, time, infoId, setComments, owner, uid } = props;
  console.log(comment);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { comment: comment } });

  const a = new Date(time.slice(0, 10));
  const b = new Date();
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  const diffDays = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));

  const handleEditComment = async (data) => {
    try {
      await axios.put(`https://yelpcampbackend-production.up.railway.app/edit/comment/info/${id}`, {
        comment: data.comment,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`https://yelpcampbackend-production.up.railway.app/delete/comment/${id}`);

      const response = await axios.get(
        `https://yelpcampbackend-production.up.railway.app/fetch/info/comment/${infoId}`
      );
      setComments(response.data.result);
    } catch (error) {
      setComments([]);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <strong className="text-secondary">{name}</strong>
        <span>{diffDays} days ago</span>
      </div>
      <div className="row mt-2">
        <div className="col-9">
          <input
            type="text"
            className="bg-light comment-item text-secondary"
            {...register("comment", {
              required: "This is required",
              maxLength: {
                value: 50,
                message: "Max Length 50 characters allowed",
              },
            })}
            disabled={uid!=owner?true:false}
            style={{ borderColor: errors.comment && "red" }}
          />
        </div>
        {uid == owner && (
          <div className="col-3 btn-group  justify-content-end">
            <button
              className="border-0 me-2"
              onClick={handleSubmit(handleEditComment)}
            >
              <i class="bi bi-pen"></i>
            </button>
            <button className="border-0" onClick={handleDelete}>
              <i class="bi bi-trash"></i>
            </button>
          </div>
        )}
      </div>
      <p className="text-danger">{errors.comment?.message}</p>

      <hr />
    </div>
  );
}
