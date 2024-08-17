import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import editIcon from "./../assets/pencil.png";
import deleteIcon from "./../assets/trash-bin.png";
import "../App.css";


const CommentList = () => {

    const navigate = useNavigate();
    const baseURL = "http://localhost:4000";
    const [comments, setComments] = useState([]);

    const setCommentData = () => {
        axios.get(baseURL + "/comments").then((response) => {
            // Ensure response data is an array
            if (Array.isArray(response.data.comments)) {
                setComments(response.data.comments);
            } else {
                setComments([]);
                alert("Unexpected data format received from server.");
            }
        }).catch(error => {
            alert("Error Ocurred while loading data:" + error);
        });
    }

    useEffect(() => {
        setCommentData();
    }, []);


    const removeComment = (id) => {
        axios.delete(baseURL + "/comments/deleteSingleComment/" + id).then((response) => {
            alert("Comment record " + id + " deleted!");
            setCommentData();
            navigate('/read')

        }).catch(error => {
            alert("Error Ocurred in removeComment:" + error);
        });
    }

    // const removeAllEmployee = (id) => {
    //     axios.delete(baseURL + "/employees").then((response) => {
    //         alert("All Employees deleted!");
    //         setCommentData();
    //         navigate('/read')
    //     }).catch(error => {
    //         alert("Error Ocurred in removeEmployee:" + error);
    //     });
    // }

    return (
        <div class="card-body">
            <br>
            </br>
            <nav>
                <button
                className="btn btn-primary nav-item active"
                onClick={() => navigate("/create")}>
                    Create New Comment
                </button>
            </nav>


            <br></br>
            <div className="col-md-6">
                <h4>Comments List</h4>

                <div class="container">
                <div class="row">
                    <div class="col-12">
                    <table class="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Movie Id</th>
                            <th>Text</th>
                            <th>Date</th>
                            <th scope="col">Action</th>

                        </tr>
                        </thead>
                        <tbody>

                        {
                            comments &&
                            comments.map((comment, index) => (

                                <tr>
                                    <th scope="row">{comment._id}</th>
                                    <td>{comment.name}</td>
                                    <td>{comment.email}</td>
                                    <td>{comment.movie_id}</td>
                                    <td>{comment.text}</td>
                                    <td>{comment.date}</td>

                                    <td >

                                    <Link to={"/edit/" + comment._id}><img src={editIcon} alt="Edit" width="50" height="30" title="Edit" />
                                    </Link>


                                    <button
                                        onClick={() => removeComment(comment._id)} className="button"
                                    > <img src={deleteIcon} alt="Remove" title="Remove" width="30" height="30" />
                                    </button>

                                    </td>
                                </tr>

                            ))
                        }

                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
                {/* <button className="btn btn-sm btn-danger"
                onClick={() => removeAllEmployee()}>
                    Remove All
                </button> */}
            </div>

        </div>

    );
}
export default CommentList;