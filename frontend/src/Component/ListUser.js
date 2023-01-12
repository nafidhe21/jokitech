import React from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import { BiTrash } from "react-icons/bi";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../asset/CSS/ListUser.css'
import { useEffect, useState } from 'react/cjs/react.development';
import Cookies from 'universal-cookie'

const ListUser = (props) => {
    const data = props.data
    const search = props.search
    const [dataHistory, setDataHistory] = useState(null)
    const [dataJasa, setDataJasa] = useState(null)
    const [done, setDone] = useState(false)
    const [fix, setFix] = useState(false)
    const [idPenjasa, setIdPenjasa] = useState("")
    const cookies = new Cookies()

    useEffect(() => {
        if(idPenjasa){
            axios.get("http://localhost:4000/api/v1/history_projects/getAllHistoryProject/" + idPenjasa,
                {headers:
                    {Authorization: "Bearer " + cookies.get("token")},
                },
            ).then((res) => {
                setDataHistory(res.data)
            })

            axios.get("http://localhost:4000/api/v1/jasas/view/penjasaid/" + idPenjasa,
            ).then((res) => {
                setDataJasa(res.data)
            })
        }
    }, [idPenjasa])

    useEffect(() => {
        if(dataHistory){
            dataHistory.map((isi) => {
                axios.delete("http://localhost:4000/api/v1/history_projects/deleteHistoryProject/" + isi.id,
                    {headers:
                        {Authorization: "Bearer " + cookies.get("token")},
                    },
                )
            })
        }
    }, [dataHistory])

    useEffect(() => {
        if(dataJasa){
            dataJasa.map((isi) => {
                axios.delete("http://localhost:4000/api/v1/jasas/deleteJasa/" + isi.id,
                    {headers:
                        {Authorization: "Bearer " + cookies.get("token")},
                    },
                )
            })
            setDone(true)
        }
    }, [dataJasa])

    useEffect(() => {
        if(done){
            axios.delete("http://localhost:4000/api/v1/penjasas/deletePenjasa/" + idPenjasa,
                {headers:
                    {Authorization: "Bearer " + cookies.get("token")},
                },
            ).then(() => {
                setFix(true)
                setDone(false)
                window.location.reload()
            })
        }
    }, [done])

    return (
        <div className="list-user">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Nama Penjasa</h3></TableCell>
                            <TableCell><h3>Email</h3></TableCell>
                            <TableCell><h3>No Handphone</h3></TableCell>
                            <TableCell><h3>Delete</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    {data.filter(val => {
                        if(val.id!=="619dcec98731dd10b8003747"){
                            if(val==""){
                                return val
                            }else if(val.namaPenjasa.toLowerCase().includes(search.toLowerCase())){
                                return val
                            }
                        }
                    }).map((isi) => (
                        <TableBody>
                            <TableRow>
                                <TableCell>{isi.namaPenjasa}</TableCell>
                                <TableCell>{isi.email}</TableCell>
                                <TableCell>{isi.nomorHpPenjasa}</TableCell>
                                <TableCell>
                                    <div className="tombol" onClick={() => setIdPenjasa(isi.id)}>
                                        <BiTrash size="20px" color="black" />
                                        <p>Delete</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
        </div>
    )
}

export default ListUser
