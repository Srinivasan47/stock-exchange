
import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {

    return (
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <Link class="nav-link active" to="/dashboard">
                            <span data-feather="home"></span>
                            Dashboard <span class="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/buy-order">
                            <span data-feather="file"></span>
                            Buy Order
                </Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to="/sell-order">
                            <span data-feather="shopping-cart"></span>
                            Sell Order
                </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default SideBar;
