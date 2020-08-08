import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Header from "./../../component/header/Header";
import { Link, useHistory } from "react-router-dom";

export default function LoginComponent() {
    const [errorMessage, seterrorMessage] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const headers = { 'Content-Type': 'application/json' };
    useEffect(() => {
        localStorage.setItem("userId", '');
    }, []);
    const onSubmit = data => {
        axios.post('http://localhost:4000/login', {
            email: data.userName,
            password: data.password
        }, { headers })
            .then(function (response) {
                if (response.data.status == 400) {
                    seterrorMessage(response.data.message);
                } else {
                    if (response.data.status == 200) {
                        localStorage.setItem("userId", response.data.userId);
                        history.push("/dashboard");
                    }
                }
            })
            .catch(function (error) {
                seterrorMessage("Try after sometime");
            });
        console.log(data);
    };

    return (
        <>
            <Header />
            <div class="signup-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 class="display-4">Login</h1>
            </div>

            <div class="login-signup-container box-shadow">
                <div className="error-message">{errorMessage}</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" name="userName" id="exampleInputEmail1" aria-describedby="emailHelp" ref={register({ required: true })} />
                        {errors.userName && <div className="error-message">This field is required</div>}
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" name="password" id="exampleInputPassword1" ref={register({ required: true })} />
                        {errors.password && <div className="error-message">This field is required</div>}
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    );
}