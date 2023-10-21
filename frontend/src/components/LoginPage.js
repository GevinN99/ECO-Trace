import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="LoginPage">
            <Link to={"/"}>
                <h1>Login Page</h1>
            </Link>
        </div>
    );
}