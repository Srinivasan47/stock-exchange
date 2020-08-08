import React from 'react';
import { Link } from 'react-router-dom';

function Header() {

    return (
        <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
            <h5 class="my-0 mr-md-auto font-weight-normal"> Stock Exchange Company</h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <a class="p-2 text-dark" href="#">Features</a>
                <a class="p-2 text-dark" href="#">Support</a>
                <a class="p-2 text-dark" href="#">About Us</a>
            </nav>
            <Link class="btn btn-outline-primary" to="/signup">Sign up</Link>
        </div>
    );
}

export default Header;