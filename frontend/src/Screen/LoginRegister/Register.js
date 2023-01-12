import React, {useState} from 'react'
import { Link } from "react-router-dom";
import '../../asset/CSS/Register.css'
import axios from 'axios'
import { useHistory } from "react-router";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [namaPenjasa, setNamaPenjasa] = useState("")
    const [nomorHpPenjasa, setNomorHpPenjasa] = useState("")
    const [perlu, setPerlu] = useState(false)
    const history = useHistory()

    const register = (e) => {
        if(!email && !password && !namaPenjasa && !nomorHpPenjasa){
            return setPerlu(true)
        }
        const data = {email, password, namaPenjasa, nomorHpPenjasa}
        e.preventDefault()
        
        axios.post("http://localhost:4000/api/v1/penjasas/register", data)
        .then(res=>{
            console.log(res)
            history.push("/login")
        })
    }
        
    return (
        <div className="register">
            <div className="bagianKiri">
                <img src={ process.env.PUBLIC_URL + "/imageLoginRegister.png" } />
            </div>
            <div className="bagianKanan">
                <div className="form">
                    <div className="atas">
                        <Link to="/login">
                            <div className="highlight2">
                                <h2>Login</h2>
                            </div>
                        </Link>
                        <div className="highlight">
                            <h2>Register</h2>
                        </div>
                    </div>

                    <div className="input">
                        <input 
                            type="text"
                            required
                            value = {namaPenjasa}
                            onChange = {(e) => setNamaPenjasa(e.target.value)}
                            placeholder="Nama Anda"
                        />
                        <input 
                            type="text"
                            required
                            value = {email}
                            onChange = {(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input 
                            type="text"
                            required
                            value = {nomorHpPenjasa}
                            onChange = {(e) => setNomorHpPenjasa(e.target.value)}
                            placeholder="No. Handphone"
                        />
                        <input 
                            type="password"
                            required
                            value = {password}
                            onChange = {(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <input 
                            type="password"
                            required
                            placeholder="Confirm Password"
                        />

                    </div>
                    {perlu && (
                        <div className="wrong">
                            <p>You must fill the form</p>
                        </div>
                    )}
                    <div className="button" onClick={register} >
                        <button>Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register
