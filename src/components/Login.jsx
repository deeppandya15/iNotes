import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [credential, setCredential] = useState({ email: "", password: "" })
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:3000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({ title, description, tag }),
            body: JSON.stringify({
                email: credential.email,
                password: credential.password
            }),
        });
        const json = await response.json();
        const authToken = json;
        console.log(json);

        if (json.success) {
            localStorage.setItem("auth-token", authToken);
            navigate("/");
        } else {
            alert("Enter valid email and password")
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
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp"
                            // onChange={(e) => setEmail(e.target.value)}
                            onChange={handleChange}
                        />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password"
                            // onChange={(e) => setPassword(e.target.value)}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login