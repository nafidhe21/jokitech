import React from 'react'
import '../../asset/CSS/AboutUs.css'

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="bagian-kiri">
                <img src={ process.env.PUBLIC_URL + "/logoWeb.png" }/>
            </div>
            <div className="bagian-kanan">
                <h1>Joki Tech</h1>
                <p>Jokitech merupakan website bagi kalian para penjasa yang ingin menjual jasa kalian secara lebih luas di dunia internet dan juga bagi kalian para pencari jasa yang ingin mencari jasa yang dibutuhkan. Jokitech saat ini memiliki 3 kategori layanan mengenai jasa-jasa yang disajikan seperti Programming and Tech, Graphic and Design dan Video and Animation.</p>
                <br />
                <p>Jokitech hadir sebagai penghubung dalam komunikasi bisnis bagi para penjasa dengan para pencari jasa.</p>
            </div>
        </div>
    )
}

export default AboutUs
