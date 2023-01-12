import React, { useState } from 'react'
import { Link } from "react-router-dom";
import '../../asset/CSS/Login.css'
import axios from 'axios'
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import 'reactjs-popup/dist/index.css';
import { useHistory } from "react-router";

const Login = () => {
    const [penjasaId, setPenjasaId] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPassTrue, setIsPassTrue] = useState(false)
    const cookies = new Cookies()
    const history = useHistory()

    const login = (e) => {
        const data = {email, password}
        e.preventDefault()

        axios.post("http://localhost:4000/api/v1/penjasas/login", data)
            .then(res=>{
                setIsPassTrue(false)
                const decode = jwt_decode(res.data.token)
                setPenjasaId(decode.penjasaId)
                cookies.set("token", res.data.token, {expires: new Date(Date.now + 1)})
                cookies.set("dataEmail", decode.email, {expires: new Date(Date.now + 1)})
                cookies.set("dataId", decode.penjasaId, {expires: new Date(Date.now + 1)})
                cookies.set("namaPenjasa", decode.namaPenjasa, {expires: new Date(Date.now + 1)})
                if(penjasaId){
                    if(penjasaId==="619dcec98731dd10b8003747"){
                        history.push("/adminuser")
                    } else {
                        history.push("/project")
                    }
                }
            }).catch((error)=>{
                setEmail("")
                setPassword("")
                setIsPassTrue(true)
            })
    }

    return (
        <div className="login">
            <div className="bagianKiri">
                <img src={ process.env.PUBLIC_URL + "/imageLoginRegister.png" } />
            </div>
            <div className="bagianKanan">
                <div className="form">
                    <div className="atas">
                        <div className="highlight">
                            <h2>Login</h2>
                        </div>
                        <Link to="/register">
                            <div className="highlight2">
                                <h2>Register</h2>
                            </div>
                        </Link>
                    </div>

                    <div className="input">
                        <input 
                            type="text"
                            required
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input 
                            type="password"
                            required
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            />
                        
                    </div>
                    {isPassTrue && (
                        <div className="warning">
                            <h5>Wrong Email/Password</h5>
                        </div>
                    )}
                    <div className="button" onClick={login}>
                        <button>Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login
