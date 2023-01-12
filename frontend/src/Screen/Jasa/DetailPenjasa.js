import React, { useState } from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react/cjs/react.development'
import axios from "axios";
import { BiSearchAlt } from "react-icons/bi";
import "../../asset/CSS/DetailPenjasa.css"
import ListJasaView from '../../Component/ListJasaView';

const DetailPenjasa = () => {
    const {id} = useParams()
    const [data,setData] = useState(null)
    const [listJasa, setListJasa] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/penjasas/view/" + id)
            .then(res => {
                setData(res.data)
            })

        axios.get("http://localhost:4000/api/v1/jasas/view/penjasaid/" + id)
            .then(res => {
                setListJasa(res.data)
            })
    }, [])

    return (
        <div className="detail-penjasa">
            <div className="bagian-kiri">
                <div className="profile">
                    {data && (
                        <>
                            <div className="image">
                                <img src={data.profilePicture} />
                            </div>
                            <div className="nama">
                                <p>{data.namaPenjasa}</p>
                            </div>
                            <div className="about-me">
                                {data && (
                                    <>
                                        <h3>About Me</h3>
                                        <p>{data.aboutMe}</p>
                                    </>
                                )}
                            </div>
                            <div className="contact-person">
                                <h3>Contact Person</h3>
                                <p>{data.email}</p>
                                <p>{data.nomorHpPenjasa}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="bagian-kanan">
                <div className="search">
                    <BiSearchAlt size='14px' color="#772525" />
                    <input 
                        type="text" 
                        value= {search}
                        onChange= {(e) => setSearch(e.target.value)}
                        placeholder="Search Jasa..." 
                    />
                </div>

                {listJasa && (
                    
                    <ListJasaView data={listJasa} search={search} />
                    
                )}
            </div>
        </div>
    )
}

export default DetailPenjasa
