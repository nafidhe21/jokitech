import React from 'react'
import { Link } from "react-router-dom";
import "../asset/CSS/ListJasaView.css"

const ListJasaView = (props) => {
    const data = props.data
    const search = props.search

    return (
        <div className="list-jasa-view">
            {data.filter(val => {
                if(val == "") {
                    return val
                } else if (val.namaJasa.toLowerCase().includes(search.toLowerCase())) {
                    return val
                }
            }).map((isi) => (
                <div>
                    <Link to={"/jasa/" + isi.id}>
                        <div className="preview">
                            <h3>{isi.namaJasa}</h3>
                            <div className="kotak">
                                <div className="image">
                                    <img src={ isi.image } />
                                </div>
                                <div className="deskripsi">
                                    <h3>Deskripsi</h3>
                                    <p>{isi.descJasa.substring(0, 230)}...</p>
                                </div>

                                <div className="startingPrice">
                                    <h3>Starting Price</h3>
                                    <p>Rp. {isi.startingPrice}</p>
                                </div>

                            </div>   
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ListJasaView
