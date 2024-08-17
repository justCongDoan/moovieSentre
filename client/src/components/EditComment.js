import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const CommentForm = () => {
    const editURL = "http://localhost:4000/comments/";
    const navigate = useNavigate();
    const param = useParams();
    const [commentId, setCommentId] = useState('');
    const [enteredName, setName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredMovieId, setMovieId] = useState('');
    const [enteredText, setText] = useState('');
    const [enteredDate, setDate] = useState('');

    useEffect(() => {

        axios.get(editURL+param.id).then((response) => {
            const commentData = response.data.data;
            setCommentId(param.id);
            setName(commentData.name);
            setEmail(commentData.email);
            setMovieId(commentData.movie_id);
            setText(commentData.text);
            setDate(formatDate(commentData.date));
      
        }).catch(error => {
            alert("Error Ocurred getting comment detail:"+ error);
        });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    };

    const movieIdChangeHandler = (event) => {
        setMovieId(event.target.value);
    };

    const textChangeHandler = (event) => {
        setText(event.target.value);
    };

    const dateChangeHandler = (event) => {
        setDate(event.target.value);
    };


    const submitActionHandler = (event) => {
        event.preventDefault();
        axios
        .put(editURL+'updateSingleComment/'+param.id, {
            id: commentId,
            name: enteredName,
            email: enteredEmail,
            movie_id: enteredMovieId,
            text: enteredText,
            date: enteredDate
        })
        .then((response) => {
            alert("Comment "+ enteredName +" updated!");
            navigate("/read");
        }).catch(error => {
            alert("error==="+error);
        });

    };
    
    return(
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler}>
        <Form.Group  controlId="form.id">
            <Form.Label>Id</Form.Label>
            <Form.Control value={commentId} readonly='readonly'/>
        </Form.Group>
        <Form.Group controlId="form.Name">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={enteredName} onChange={nameChangeHandler} placeholder="Enter User Name" required/>
        </Form.Group>
        <Form.Group  controlId="form.Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={enteredEmail} onChange={emailChangeHandler} placeholder="Enter Email" required/>
        </Form.Group>
        <Form.Group controlId="form.MovieId">
            <Form.Label>Movie Id</Form.Label>
            <Form.Control type="text" value={enteredMovieId} onChange={movieIdChangeHandler} placeholder="Enter Movie ID" required/>
        </Form.Group>
        <Form.Group  controlId="form.Text">
            <Form.Label>Text</Form.Label>
            <Form.Control as="textarea" rows={3} value={enteredText} onChange={textChangeHandler} placeholder="Enter Text" required/>
        </Form.Group>
        <Form.Group  controlId="form.Date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={enteredDate} onChange={dateChangeHandler} placeholder="Enter Date" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Update Comment</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>navigate("/read")}>Cancel</Button>
      </Form>

    </Container>
    </Alert>

    );
}
export default CommentForm;