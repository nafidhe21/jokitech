import React, { useEffect } from 'react'
import '../../asset/CSS/Project.css'
import useFetch from '../../Component/UseFetch'
import { BiMoney, BiSearchAlt } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import { Link } from "react-router-dom";

const Project = () => {
    const cookies = new Cookies()
    const [data, setData] = useState(null)
    const [checked1, setChecked1] = useState(false)
    const [checked2, setChecked2] = useState(true)
    const [id, setId] = useState(0)
    const [namaPencariJasa, setNamaPencariJasa] = useState("")
    const [namaJasa, setNamaJasa] = useState("")
    const [kategoriJasa, setKategoriJasa] = useState("")
    const [biaya, setBiaya] = useState(0)
    const [pendapatan, setPendapatan] = useState(0)
    const [totalProject, setTotalProject] = useState(0)
    const [finish, setFinish] = useState(0)
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/history_projects/getAllHistoryProject/" + cookies.get("dataId"),
            {headers:
                {Authorization: "Bearer " + cookies.get("token")},
            },
        ).then((res) => {
            if(res.data.length!==0){
                setData(res.data)
            }
        })

        axios.get("http://localhost:4000/api/v1/history_projects/getHistoryProjectSum/" + cookies.get("dataId"),
            {headers:
                {Authorization: "Bearer " + cookies.get("token")},
            },
        ).then((res) => {
            if(res.data.length!==0){
                setPendapatan(res.data[0].totalSum)
            }
        })

        axios.get("http://localhost:4000/api/v1/history_projects/getHistoryProjectTotal/" + cookies.get("dataId"),
            {headers:
                {Authorization: "Bearer " + cookies.get("token")},
            },
        ).then((res) => {
            if(res.data.length!==0){
                setTotalProject(res.data[0].totalProject)
            }
        })
        
        axios.get("http://localhost:4000/api/v1/history_projects/getHistoryProjectFinished/" + cookies.get("dataId"),
            {headers:
                {Authorization: "Bearer " + cookies.get("token")},
            },
        ).then((res) => {
            if(res.data.length!==0){
                setFinish(res.data[0].totalProjectFinished)
            }
        })
    }, [])

    const handleChecked = (id, stat) => {
        setId(id)
        if(stat==1){
            setChecked1(!checked1)
        } else if(stat==2){
            setChecked1(!checked2)
        }
        
        for(const item of data){
            if(item.id===id){
                setNamaPencariJasa(item.namaPencariJasa)
                setNamaJasa(item.namaJasa)
                setKategoriJasa(item.kategoriJasa)
                setBiaya(item.biaya)
            }
        }  
    }

    const handleUpdate = () => {
        if (checked1==true && namaPencariJasa){
            axios.put("http://localhost:4000/api/v1/history_projects/updateHistoryProject/" + id,
                {
                    namaPencariJasa: namaPencariJasa,
                    namaJasa: namaJasa,
                    kategoriJasa: kategoriJasa,
                    biaya: biaya,
                    statusProject: 2
                },
                {headers:
                    {Authorization: "Bearer " + cookies.get("token")},
                },
            ).then(() => {
                window.location.reload();
            })
        } else {
            axios.put("http://localhost:4000/api/v1/history_projects/updateHistoryProject/" + id,
                {
                    namaPencariJasa: namaPencariJasa,
                    namaJasa: namaJasa,
                    kategoriJasa: kategoriJasa,
                    biaya: biaya,
                    statusProject: 1
                },
                {headers:
                    {Authorization: "Bearer " + cookies.get("token")},
                },
            ).then(() => {
                window.location.reload();
            })
        } 
    }

    const cekKategori = (cat) => {
        if(cat==1) {
            return "Graphic and Design"
        } else if (cat==2) {
            return "Programming and Tech"
        } else if (cat==3) {
            return "Video and Animation"
        }
    }

    return (
        <div className="projek">
            <div className="bagianKiri">
                <div className="pendapatan">
                    <BiMoney size='25px' color='white' />
                    <div className="konten">
                        <h2>Pendapatan</h2>
                        {pendapatan && <p>Rp. {pendapatan}</p>}
                    </div>
                </div>

                <div className="project">
                    <FaBookOpen size='25px' color='white' />
                    <div className="konten">
                        <h2>Project</h2>
                        {totalProject && <p>{totalProject}</p>}
                    </div>
                </div>

                <div className="finish">
                    <FaCheckCircle size='25px' color='white' />
                    <div className="konten">
                        <h2>Finish</h2>
                        {finish &&  <p>{finish}</p>}
                    </div>
                </div>
            </div>

            <div className="bagianKanan">
                <div className="window">
                    <div className="atas">
                        <h3>Project</h3>
                        <div className="search">
                            <BiSearchAlt size='14px' color="#772525" />
                            <input 
                                type="text" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search Jasa..."
                            />
                        </div>
                        <Link to="/createProject">
                            <BsFillPlusCircleFill size='30px' color="#772525" />
                        </Link>
                    </div>
                    <div className="tengah">
                        <p>Pelanggan</p>
                        <p>Nama Jasa</p>
                        <p>Kategori</p>
                        <p>Biaya</p>
                        <p>Status</p>
                    </div>
                    <div className="bawah">
                        {data && 
                            data.filter(val => {
                                if(val==""){
                                return val
                            }else if(val.namaJasa.toLowerCase().includes(search.toLowerCase())){
                                return val
                            }
                            }).map((isi)=>(
                                <div className="list">
                                    <p>{isi.namaPencariJasa}</p>
                                    <p>{isi.namaJasa}</p>
                                    <p>{cekKategori(isi.kategoriJasa)}</p>
                                    <p>{isi.biaya}</p>
                                    {isi.statusProject==1 && 
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={checked1}
                                            onChange = {() => {
                                                handleChecked(isi.id, isi.statusProject)
                                            }}
                                        />
                                    }
                                    {isi.statusProject==2 && 
                                        <input 
                                            type="checkbox" 
                                            defaultChecked={checked2}
                                            onChange = {() => {
                                                handleChecked(isi.id, isi.statusProject)
                                            }}
                                        />
                                    }
                                </div>
                            ))
                        }
                    </div>
                    {namaPencariJasa && handleUpdate()}
                </div>
            </div>
        </div>
    )
}

export default Project
