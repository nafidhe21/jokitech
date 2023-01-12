import { Link } from "react-router-dom";
import React from "react";
import '../asset/CSS/Navbar.css'
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { useHistory } from "react-router";

const Navbar = () => {
    const cookies = new Cookies()
    const [data, setData] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const penjasaId = cookies.get("dataId")
    const history = useHistory()
    
    useEffect(() =>{
        axios.get("http://localhost:4000/api/v1/penjasas/view/" + cookies.get("dataId"))
            .then(res => {
                setData(res)
            })
    }, [])
    
    const logout = (e) => {
        cookies.remove("token")
        cookies.remove("dataId")
        cookies.remove("dataEmail")
        cookies.remove("namaPenjasa")
        history.push("/")
    }
    
    const checkCookie = () => {
        const x = cookies.get('token')
        if (x!=undefined){
            return true
        } else {
            return false
        }
    }
    
    return ( 
        <div className="navbar">
            <div className="bagian-kiri">
                <Link to="/">
                    <div className="kiri">    
                        <img src={ process.env.PUBLIC_URL + "/logoWeb.png" }/>
                        <h6>JokiTech</h6>
                    </div>    
                </Link>
                
                <div className="kanan">
                    <Link to="/">Home</Link>
                    <Link to="/jasa">Jasa</Link>
                    <Link to="/aboutUs">About Us</Link>
                </div>
            </div>
            {checkCookie() && data && (
                    <div className="foto-bagian-kanan" onClick={() => setIsClicked(!isClicked)} >
                        <div className="bio">
                            <p>{data.data.namaPenjasa}</p>
                            <img src={data.data.profilePicture} />
                        </div>
                        {console.log(data.data.penjasaId)}
                        {isClicked && (
                            <div className="hambMenu">
                                <div className="segitiga">
                                    <div className="arrow-up"></div>
                                </div>
                                {penjasaId==="619dcec98731dd10b8003747" && (
                                    <Link to="/adminuser">
                                        <div className="item">
                                            <MdOutlineDashboard color="white" />
                                            <p>Dashboard</p>
                                        </div>
                                    </Link>
                                )}
                                {penjasaId!=="619dcec98731dd10b8003747" && (
                                    <Link to="/project">
                                        <div className="item">
                                            <MdOutlineDashboard color="white" />
                                            <p>Dashboard</p>
                                        </div>
                                    </Link>
                                )}
                                <div className="item" onClick={logout}>
                                    <IoIosLogOut color="white"/>
                                    <p>Logout</p>
                                </div>
                            </div>
                        )}
                    </div>
            )}

            {checkCookie()==false && (
                <Link to="/login">
                    <div className="bagian-kanan">
                        <p>Login/Register</p>
                    </div>
                </Link>
            )}
            
        </div>
    );
}

export default Navbar;