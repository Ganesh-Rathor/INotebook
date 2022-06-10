/* jshint ignore:start */
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

function LogIn(props) {
    const {alert} = props;
    const [credentials, setcredentials] = useState({ email: "", passward: "" });
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:80/auth/login", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, passward: credentials.passward })
        })
        const json = await response.json();
        console.log(json);

        if (json.succses === true) {
            // redirect
            // save the authToken to local storage
            localStorage.setItem("token", json.AuthToken);
            // use history hook for redirect
            alert("Successfully LogedIn","success");
            setTimeout(()=>{

                Navigate('/');
            },1500)
        }
        else{
            alert("Invalid credintial weather the Email Incorrect","warning");
           setcredentials({email:"",passward:""})
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                
    <h1 className="h1 my-4">LogIn to Connect Your Notes</h1>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={onchange}
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="Passward" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="Password"
                        name="passward"
                        value={credentials.passward}
                        onChange={onchange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    LogIn
                </button>
            </form>
            <p className="mt-4">Don't Have an account Click To <Link className="fs-2x" to="/signup">signUp</Link> </p>
        </>
    );
}

export default LogIn;
