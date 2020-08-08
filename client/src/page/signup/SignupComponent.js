import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Header from "./../../component/header/Header";
import { Link } from "react-router-dom";

export default function SignupComponent() {

    const [errorMessage, seterrorMessage] = useState('');
    const { register, handleSubmit, errors } = useForm();
    const headers = { 'Content-Type': 'application/json' };
    const onSubmit = data => {
        axios.post('http://localhost:4000/signup', {
            firstName: data.firstName,
            lastName: data.lastName || '',
            companyName: data.companyName,
            companyShortCode: data.companyShortCode || '',
            email: data.emailAddress,
            password: data.password
        }, { headers })
            .then(function (response) {
                if (response.data.status == 400) {
                    seterrorMessage(response.data.message);
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
                <h1 class="display-4">SignUp</h1>
            </div>

            <div class="login-signup-container box-shadow">
                <div className="error-message">{errorMessage}</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">First Name *</label>
                        <input type="text" name="firstName" class="form-control" id="exampleInputEmail1" aria-label="First Name" ref={register({ required: true })} />
                        {errors.firstName && <div className="error-message">This field is required</div>}
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Last Name</label>
                        <input type="text" name="lastName" class="form-control" id="exampleInputEmail1" aria-label="Last Name" />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Company Name *</label>
                        <input type="text" name="companyName" class="form-control" id="exampleInputEmail1" aria-label="Company Name" ref={register({ required: true })} />
                        {errors.companyName && <div className="error-message">This field is required</div>}
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Company short code</label>
                        <input type="text" name="companyShortCode" class="form-control" id="exampleInputEmail1" aria-label="Company short code" />
                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail">Email address *</label>
                        <input type="email" name="emailAddress" class="form-control" id="exampleInputEmail" aria-label="Email address" ref={register({ required: true })} />
                        {errors.emailAddress && <div className="error-message">This field is required</div>}
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword">Password *</label>
                        <input type="password" name="password" class="form-control" id="exampleInputPassword" ref={register({ required: true })} />
                        {errors.password && <div className="error-message">This field is required</div>}
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Confirm Password *</label>
                        <input type="password" name="confirmPassword" class="form-control" id="exampleInputPassword1" ref={register({ required: true })} />
                        {errors.emailAddress && <div className="error-message">This field is required</div>}
                    </div>
                    <button type="submit" class="btn btn-primary">SignUp</button>
                    <div class="form-label-group mt-5">
                        <label>If you have account already <Link to="/login">Login</Link> </label>
                    </div>
                </form>
            </div>
        </>
    );
}
