import React from 'react'
import { useState } from 'react';
import '../../asset/CSS/CreateProject.css'
import { useHistory } from "react-router";
import Cookies from 'universal-cookie';
import axios from 'axios';

const CreateProject = () => {
    const cookies = new Cookies()
    const penjasaId = cookies.get("dataId")
    const [namaJasa, setNamaJasa] = useState("")
    const [kategoriJasa, setKategoriJasa] = useState(1)
    const [namaPencariJasa, setNamaPencariJasa] = useState("")
    const [biaya, setBiaya] = useState(0)
    const statusProject = 1
    const history = useHistory()

    const adding = (e) => {
        e.preventDefault()
        const data = {penjasaId, namaPencariJasa, namaJasa, kategoriJasa, biaya, statusProject}

        axios.post("http://localhost:4000/api/v1/history_projects/createHistoryProject",
            data,
            {headers:
                {Authorization: "Bearer " + cookies.get("token")},
            },
        ).then(() => {
            history.push("/project")
        })
    }

    return (
        <div className="create-projek">
            <h2>Create Project</h2>
            <form onSubmit={adding}>
                <div className="item">
                    <label>Nama Pencari Jasa</label>
                    <input 
                        type="text"
                        required
                        value = {namaPencariJasa}
                        onChange = {(e) => setNamaPencariJasa(e.target.value)}
                        placeholder = "Nama Pencari Jasa..."
                    />
                </div>
                <div className="item">
                    <label>Nama Jasa</label>
                    <input 
                        type="text"
                        required
                        value = {namaJasa}
                        onChange = {(e) => setNamaJasa(e.target.value)}
                        placeholder = "Nama Jasa..."
                    />
                </div>
                <div className="item">
                    <label>Kategori</label>
                    <select
                        value = {kategoriJasa}
                        onChange = {(e) => setKategoriJasa(e.target.value)}
                    >
                        <option value={2}>Programming and Tech</option>
                        <option value={1}>Graphic and Design</option>
                        <option value={3}>Video and Animation</option>
                    </select>
                </div>
                <div className="item">
                    <label>Biaya</label>
                    <input 
                        type="number"
                        required
                        value = {biaya}
                        onChange = {(e) => setBiaya(parseInt(e.target.value))}
                    />
                </div>

                <button onClick={adding}>Add Project</button>
            </form>
        </div>
    )
}

export default CreateProject
