import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import NavBar from "./../../component/navbar/NavBar";
import SideBar from "./../../component/sidebar/SideBar";
import { useHistory } from "react-router-dom";

export default function DashboardComponent() {
    const [orderDetails, setorderDetails] = useState([]);
    const history = useHistory();
    const headers = { 'Content-Type': 'application/json' };
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId != '') {
            axios.get('http://localhost:4000/get-stock-details', {
                params: {
                    userId: userId
                }
            }, { headers })
                .then(function (response) {
                    if (response.data.status == 400) {

                    }
                    else {
                        setorderDetails(response.data.data);
                    }
                })
                .catch(function (error) {

                });
        }
        else {
            history.push("/login");
        }

    }, []);

    return (
        <>
            <NavBar />
            <div class="container-fluid">
                <div class="row">
                    <SideBar />
                    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                            <h1 class="h2">Dashboard</h1>
                        </div>
                        <h2>Buy Order Details</h2>
                        <div class="table-responsive">
                            <table class="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>stock code</th>
                                        <th>company code</th>
                                        <th>quantity</th>
                                        <th>purchase date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails &&
                                        orderDetails.map((order, i) => {
                                            return (
                                                <tr>
                                                    <th>{i + 1}</th>
                                                    <th>{order.stock_code}</th>
                                                    <th>{order.company_code}</th>
                                                    <th>{order.quantity}</th>
                                                    <th>{moment(order.purchase_date).format('DD/MM/YYYY')}</th>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}