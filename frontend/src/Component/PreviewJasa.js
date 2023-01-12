import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios"
import '../asset/CSS/PreviewJasa.css'

const PreviewJasa = (props) => {
    const data = props.data
    const search = props.search

    return (  
        <div className="preview-jasa">
            {data.filter(val => {
                if(val==""){
                    return val
                }else if(val.namaJasa.toLowerCase().includes(search.toLowerCase())){
                    return val
                }
            }).map((isi)=> (
                <Link to={"/jasa/"+isi.id}>
                    <div className="preview">
                        <div className="image">
                            <img src={isi.image} />
                        </div>
                        <div className="judul">
                            <p>{ isi.namaJasa }</p>
                        </div>
                        <div className="deskripsi">
                            <p> {isi.descJasa.slice(0, 60)}... </p>
                        </div>
                        <div className="startingPrice">
                            <p>Starting Price: Rp.{ isi.startingPrice }</p>
                        </div>
                        <div className="penjasa">
                            <p>{ isi.namaPenjasa }</p>
                        </div>
                    </div>
                </Link>
                
            ))}
        </div>
    );
}
 
export default PreviewJasa;