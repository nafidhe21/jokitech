import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import useFetch from '../../Component/UseFetch'
import ListJasaPost from '../../Component/ListJasaPost';
import '../../asset/CSS/Posting.css'
import { Link } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie';

const Posting = () => {
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(true)
    const [search, setSearch] = useState("")
    const cookies = new Cookies()

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/jasas/view/penjasaid/" + cookies.get("dataId"))
            .then((res) => {
                setData(res.data)
                setLoad(false)
            })

    }, [])

    return (
        <div className="posting">
            <div className="search">
                <BiSearchAlt size='14px' color="#772525" />
                <input 
                    type="text" 
                    value= {search}
                    onChange= {(e) => setSearch(e.target.value)}
                    placeholder="Search Posting..." 
                />
            </div>

            <Link to="/createjasa">
                <div className="tambah">
                    <AiOutlineAppstoreAdd size="18px" color="white" />
                    <p>Tambah</p>
                </div>
            </Link>

            <div className="listJasa">
                {load && <h4>LOADING</h4>}

                {data && <ListJasaPost data={data} search={search} />}
            </div>
        </div>
    )
}

export default Posting
