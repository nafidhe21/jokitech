import React from 'react'
import { FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";
import { AiOutlineMail, AiOutlineCopyrightCircle } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../asset/CSS/Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="atas">
                <div className="bagian-kiri">
                    <h3>Our Categories</h3>
                    <Link to="/jasa/programtech">
                        <p>Programming and Tech</p>
                    </Link>
                    <Link to="/jasa/graphicdesign">
                        <p>Graphic and Design</p>
                    </Link>
                    <Link to="/jasa/videoanimation">
                        <p>Video and Animation</p>
                    </Link>
                </div>
                <div className="bagian-tengah">
                    <h3>Our Social Media</h3>
                    <div className="sosmed">
                        <FaWhatsapp />
                        <p>0888213131231</p>
                    </div>
                    <div className="sosmed">
                        <FaInstagram />
                        <p>@jokitech</p>
                    </div>
                    <div className="sosmed">
                        <FaTwitter />
                        <p>@jokitechofficial</p>
                    </div>
                </div>
                <div className="bagian-kanan">
                    <h3>Our Contact</h3>
                    <div className="sosmed">
                        <AiOutlineMail />
                        <p>Jokitech@gmail.com</p>
                    </div>
                    <div className="sosmed">
                        <BsFillTelephoneFill />
                        <p>0888213131231</p>
                    </div>
                </div>
            </div>

            <div className="bawah">
                <AiOutlineCopyrightCircle size="24px" />
                <p>2021 JokiTech - Find the perfect service for your business</p>
            </div>
        </div>
    )
}

export default Footer
