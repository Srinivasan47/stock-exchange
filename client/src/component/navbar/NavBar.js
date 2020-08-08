import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

    return (
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Stock Exchange</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <Link class="nav-link" to="/login">Sign out</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
