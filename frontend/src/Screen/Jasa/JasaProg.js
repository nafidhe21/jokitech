import { Link } from "react-router-dom";
import PreviewJasa from "../../Component/PreviewJasa";
import { BiSearchAlt } from "react-icons/bi";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";
import '../../asset/CSS/JasaProg.css'

const JasaProg = () => {
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/jasas/getCat2")
            .then((res) => {
                setData(res.data)
                setLoad(false)
                console.log(res.data)
            })
    }, [])

    return ( 
        <div className="jasa-prog">
            <div className="link">
                <Link to="/">Home</Link>
                <img src={ process.env.PUBLIC_URL + "/arrow.png" }/>
                <Link to="/jasa">Jasa</Link>
                <img src={ process.env.PUBLIC_URL + "/arrow.png" }/>
                <Link to="/jasa/programtech">Programming and Tech</Link>
            </div>
            
            <div className="search">
                <BiSearchAlt size='14px' color="#772525" />
                <input 
                    type="text" 
                    value= {search}
                    onChange= {(e) => setSearch(e.target.value)}
                    placeholder="Search Jasa..." 
                />
            </div>

            <div className="konten">
                {load && <h4>LOADING</h4>}
                {data && <PreviewJasa data={data} search={search} />}
            </div>
        </div>
    );
}
 
export default JasaProg;