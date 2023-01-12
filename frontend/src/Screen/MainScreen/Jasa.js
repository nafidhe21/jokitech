import { Link } from "react-router-dom";
import '../../asset/CSS/Jasa.css'

const Jasa = () => {
    return (  
        <div className="list-jasa">
            <h2>Our Service</h2>
            <hr />

            <div className="kategori">
                <Link to="/jasa/programtech">
                    <div className="jasa">
                        <img src={ process.env.PUBLIC_URL + "/iconKat1.png" } />
                        <h3>Programming And Tech</h3>
                        <p>Kategori jasa yang dihadirkan Jokitech bagi kalian yang membutuhkan jasa di bidang programming and tech seperti jasa pembuatan website, mobile application, desktop application, game, IoT dan jasa lainnya yang berkaitan dengan programming and tech.</p>
                    </div>
                </Link>
                <Link to="/jasa/graphicdesign">
                    <div className="jasa">
                        <img src={ process.env.PUBLIC_URL + "/iconKat2.png" } />
                        <h3>Graphic and Design</h3>
                        <p>Kategori jasa yang dihadirkan Jokitech bagi kalian yang membutuhkan jasa di bidang graphic and design seperti jasa pembuatan logo, infografis, web design, UI and UX design, editing foto, CAD drawing dan jasa lainnya yang berkaitan dengan graphic and design.</p>
                    </div>
                </Link>
                <Link to="/jasa/videoanimation">
                    <div className="jasa">
                        <img src={ process.env.PUBLIC_URL + "/iconKat3.png" } />
                        <h3>Video and Animation</h3>
                        <p>Kategori jasa yang dihadirkan Jokitech bagi kalian yang membutuhkan jasa di bidang video and animation seperti jasa pembuatan motion graphic, video animasi, editing video, video production, subtitle dan jasa lainnya yang berkaitan dengan video and animation.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
 
export default Jasa;