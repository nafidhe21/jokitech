import React, {useEffect, useState} from "react"
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import useFetch from "../../Component/UseFetch";
import axios from "axios";
import '../../asset/CSS/DetailJasa.css'

const DetailJasa = () => {
    const {id} = useParams()
    const [dataJasa, setDataJasa] = useState(null)
    const [dataPenjasa, setDataPenjasa] = useState(null)
    const [load, setLoad] = useState(true)
    const cookies = new Cookies()

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/jasas/view/jasaid/" + id
        ).then(res => {
            setDataJasa(res.data)
            setLoad(false)
            return res.data
        }).then(res => {
            axios.get("http://localhost:4000/api/v1/penjasas/view/" + res.penjasaId)
                .then(res => {
                    setDataPenjasa(res.data)
                })
        })
        
        
    }, [])
    
    const kategori = (kat) => {
        if (kat===2){
            return "programtech"
        } else if(kat===1){
            return "graphicdesign"
        } else if(kat===3){
            return "videoanimation"
        }
    }

    const chooseCategory = (cat) => {
        if (cat===2){
            return "Programming an Tech"
        } else if(cat===1){
            return "Graphic and Design"
        } else if(cat===3){
            return "Video and Animation"
        }
    }

    return (  
        <div className="detail-jasa">
            {load && <h4>LOADING...</h4>}

            {dataJasa && dataPenjasa && (
                <div className="pembungkus">
                    <div className="link">
                        <Link to="/">Home</Link>
                        <img src={ process.env.PUBLIC_URL + "/arrow.png" }/>
                        <Link to="/jasa">Jasa</Link>
                        <img src={ process.env.PUBLIC_URL + "/arrow.png" }/>
                        <Link to={"/jasa/" + kategori(dataJasa.catJasa)} >{ chooseCategory(dataJasa.catJasa) }</Link>
                        <img src={ process.env.PUBLIC_URL + "/arrow.png" }/>
                        <Link to={"/jasa/" + dataJasa.id} >{ dataJasa.namaJasa }</Link>
                    </div>
                    <article>
                        <div className="kiri">
                            <img src={dataJasa.image} />
                        </div>
                        <div className="tengah">
                            <h2>{dataJasa.namaJasa}</h2>
                            <p>{dataJasa.descJasa}</p>
                        </div>
                        <div className="kanan">
                            <div className="atas">
                                <h3>Starting Price</h3>
                                <p>Rp. {dataJasa.startingPrice}</p>
                            </div>
                            <div className="bawah">
                                <h3>Contact Person</h3>
                                <Link to={"/penjasa/" + dataJasa.penjasaId}>
                                    <div className="profile">
                                        <img src={dataPenjasa.profilePicture} />
                                        <p>{dataPenjasa.namaPenjasa}</p>
                                    </div>
                                </Link>
                                <div className="emailHp">
                                    <p>{dataPenjasa.email}</p>
                                    <p>{dataPenjasa.nomorHpPenjasa}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                
            )}
        </div>
    );
}
 
export default DetailJasa;