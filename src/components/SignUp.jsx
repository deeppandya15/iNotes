import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    const { alertshow } = props;
    const navigate = useNavigate();

    const [credential, setCredential] = useState({ name: "", email: "", password: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: credential.name,
                email: credential.email,
                password: credential.password
            }),
        })
        const json = await response.json();
        const authToken = json.authToken;
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", authToken);
            navigate("/");
            alertshow("Welcome,Account Successfully created", "success")
        } else {
            // alert("Invalid credentials")
            alertshow("Invalid credentials", "danger")
        }
    }
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.id]: e.target.value });
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" id="name" aria-describedby="nameHelp"
                            onChange={handleChange} required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                            onChange={handleChange} required
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                            onChange={handleChange}
                            minLength={5} required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignUp