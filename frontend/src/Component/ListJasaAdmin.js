import React from 'react'
import { Link } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";
import axios from "axios"
import Cookies from 'universal-cookie';
import '../asset/CSS/ListJasaAdmin.css'

const ListJasaAdmin = (props) => {
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
        <div className="list-jasa-admin">
            {data.filter((val)=>{
                if(search==""){
                    return val
                } else if(val.namaJasa.toLowerCase().includes(search.toLowerCase())){
                    return val
                }
            }).map((isi) => (
                <div className="keseluruhan">
                    <Link to={"jasa/" + isi.id}>
                        <div className="preview">
                            <h3>{isi.namaJasa}</h3>
                            <div className="kotak">
                                <div className="image">
                                    <img src={ isi.image } />
                                </div>
                                <div className="deskripsi">
                                    <h3>Deskripsi</h3>
                                    <p>{isi.descJasa.substring(0, 50)}...</p>
                                </div>

                                <div className="startingPrice">
                                    <h3>Starting Price</h3>
                                    <p>{isi.startingPrice}</p>
                                </div>

                                <div className="namaPenjasa">
                                    <h3>Nama Penjasa</h3>
                                    <p>{isi.namaPenjasa}</p>
                                </div>
                            </div>   
                        </div>
                    </Link>
                    <div className="kotakBawah">
                        <button onClick={() => {deletePost(isi.id)}}>
                            <BiTrash size="20px" color="white" />
                            <p>Delete Jasa</p>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ListJasaAdmin
