import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import NavBar from "./../../component/navbar/NavBar";
import SideBar from "./../../component/sidebar/SideBar";
import { useHistory } from "react-router-dom";

export default function BuyOrderComponent() {
    const [errorMessage, seterrorMessage] = useState('');
    const [extendedValue, setextendedValue] = useState(0);
    const history = useHistory();
    const [state, setState] = useState({
        quantity: 0,
        price: 0
    });
    const { register, handleSubmit, errors } = useForm();
    const headers = { 'Content-Type': 'application/json' };
    function handleExtendValue(evt) {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
        setextendedValue(state.price * state.quantity);
    };
    const onSubmit = data => {
        axios.post('http://localhost:4000/buy-order', {
            userId: localStorage.getItem("userId"),
            companyCode: data.companyCode,
            stockCode: data.stockCode,
            stockExchangeCode: data.stockExchangeCode,
            quantity: data.quantity,
            price: data.price,
            extendedValue: data.quantity * data.price
        }, { headers })
            .then(function (response) {
                if (response.data.status == 400) {
                    seterrorMessage(response.data.message);
                }
                else {
                    alert(response.data.message);
                    history.push("/dashboard");
                }
            })
            .catch(function (error) {
                seterrorMessage("Try after sometime");
            });
        console.log(data);
    };
    return (
        <>
            <NavBar />
            <div class="container-fluid">
                <div class="row">
                    <SideBar />
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 class="h2">Buy Order</h1>
                        </div>
                        <div class="login-signup-container box-shadow">
                            <div className="error-message">{errorMessage}</div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Company Code *</label>
                                    <input type="text" name="companyCode" class="form-control" id="exampleInputEmail1" aria-label="First Name" ref={register({ required: true })} />
                                    {errors.companyCode && <div className="error-message">This field is required</div>}
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Stock Code *</label>
                                    <input type="text" name="stockCode" class="form-control" id="exampleInputEmail1" aria-label="Last Name" ref={register({ required: true })} />
                                    {errors.stockCode && <div className="error-message">This field is required</div>}
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Stock Exchange Code *</label>
                                    <input type="text" name="stockExchangeCode" class="form-control" id="exampleInputEmail1" aria-label="Stock Exchange Code" ref={register({ required: true })} />
                                    {errors.stockExchangeCode && <div className="error-message">This field is required</div>}
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Quantity*</label>
                                    <input type="number" name="quantity" class="form-control" id="exampleInputEmail1" aria-label="quantity" ref={register({ required: true })} />
                                    {errors.quantity && <div className="error-message">This field is required</div>}
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputEmail">Price *</label>
                                    <input type="number" name="price" class="form-control" id="exampleInputEmail" onChange={handleExtendValue} aria-label="price" ref={register({ required: true })} />
                                    {errors.price && <div className="error-message">This field is required</div>}
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword">Extended Value *</label>
                                    <input type="text" name="extendedValue" class="form-control" id="exampleInputPassword" value={extendedValue} disabled />

                                </div>

                                <button type="submit" class="btn btn-primary">Place an order</button>

                            </form>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}