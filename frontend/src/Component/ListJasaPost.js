import React from 'react'
import { Link } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios"
import Cookies from 'universal-cookie';
import '../asset/CSS/ListJasaPost.css';

const ListJasaPost = (props) => {
    const data = props.data
    const search = props.search
    const cookies = new Cookies()

    const deletePost = (id) => {
        axios.delete("http://localhost:4000/api/v1/jasas/deleteJasa/" + id, 
        {headers: 
                {Authorization: "Bearer " + cookies.get("token")},
        }).then(() => {
            window.location.reload()
        })
    }

    return (
        <div className="JasaPenjasa">
            {data.filter((val)=>{
                if(search==""){
                    return val
                } else if(val.namaJasa.toLowerCase().includes(search.toLowerCase())){
                    return val
                }
            }).map((isi) => (
                <div>
                    <Link to={"jasa/" + isi.id}>
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
                                    <p>{isi.startingPrice}</p>
                                </div>

                            </div>   
                        </div>
                    </Link>
                    <div className="kotakBawah">
                        <Link to={"updateJasa/" + isi.id}>
                            <BiPencil size="20px" color="white" />
                        </Link>
                        <button onClick={() => {deletePost(isi.id)}}>
                            <BiTrash size="20px" color="white" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListJasaPost
