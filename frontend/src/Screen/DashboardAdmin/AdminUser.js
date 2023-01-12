import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import useFetch from '../../Component/UseFetch'
import ListJasaPost from '../../Component/ListJasaPost';
import { Link } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie';
import '../../asset/CSS/AdminUser.css'
import ListUser from '../../Component/ListUser';

const AdminUser = () => {
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(true)
    const [search, setSearch] = useState("")
    const cookies = new Cookies()

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/penjasas/",
            {headers: 
                {Authorization: "Bearer " + cookies.get("token")},
            },
        ).then((res) => {
            setData(res.data)
            setLoad(false)
        })

    }, [])

    return (
        <div className="admin-user">
            <div className="search">
                <BiSearchAlt size='14px' color="#772525" />
                <input 
                    type="text" 
                    value= {search}
                    onChange= {(e) => setSearch(e.target.value)}
                    placeholder="Search Posting..." 
                />
            </div>

            <div className="listJasa">
                {load && <h4>LOADING</h4>}
                {data && <ListUser data={data} search={search} />}
            </div>
        </div>
    )
}

export default AdminUser
