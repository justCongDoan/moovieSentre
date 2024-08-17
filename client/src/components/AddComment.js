import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const CommentForm = () => {
    const baseURL = "http://localhost:4000/comments/";
    const navigate = useNavigate();
    const [enteredName, setName] = useState('');
    const [enteredEmail, setEmail] = useState('');
    const [enteredMovieId, setMovieId] = useState('');
    const [enteredText, setText] = useState('');
    const [enteredDate, setDate] = useState('');

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

    const formatDateToISOString = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toISOString();
    };

    const submitActionHandler = (event) => {
        event.preventDefault();
        const formattedDate = formatDateToISOString(enteredDate);
        console.log(formattedDate)
        axios
        .post(baseURL+'/addSingleComment', {
            name: enteredName,
            email: enteredEmail,
            movie_id: enteredMovieId,
            text: enteredText,
            date: 
            // enteredDate
            formattedDate
        })
        .then((response) => {
            alert("Comment "+ enteredName +" added!");
            navigate("/read");
        }).catch(error => {
            alert("error==="+error);
        });

    };

    const cancelHandler = () =>{
        //reset the values of input fields
        setName('');
        setEmail('');
        setMovieId('');
        setText('');
        setDate('');
        navigate("/read");

    }
    return(
      <Alert variant='primary'>
      <Container>
      <Form onSubmit={submitActionHandler}>
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
            <Form.Control type="text" value={enteredText} onChange={textChangeHandler} placeholder="Enter Text" required/>
        </Form.Group>
        <Form.Group  controlId="form.Date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={enteredDate} onChange={dateChangeHandler} placeholder="Enter Date" required/>
        </Form.Group>
        <br></br>
        <Button type='submit'>Add Comment</Button>
        &nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={()=>cancelHandler()}>Cancel</Button>
      </Form>

    </Container>
    </Alert>

    );
}
export default CommentForm;