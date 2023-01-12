import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import PreviewJasa from "../../Component/PreviewJasa";
import axios from "axios";

const JasaGraph = () => {
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(true)
    const [search, setSearch] = useState("")

    useEffect(() =>{
        axios.get("http://localhost:4000/api/v1/jasas/getCat1")
            .then(res => {
                setData(res.data)
                setLoad(false)
            })
    }, [])


    return (  
        <div className="jasa-prog">
            <div className="link">
                <Link to="/">Home</Link>
                <img src={ process.env.PUBLIC_URL + "/arrow.png" }/>
                <Link to="/jasa">Jasa</Link>
                <img src={ process.env.PUBLIC_URL + "/arrow.png" }/>
                <Link to="/jasa/graphicdesign">Graphic and Design</Link>
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

               {data && <PreviewJasa data={data} search={search}  />}
            </div>
        </div>
    );
}
 
export default JasaGraph;