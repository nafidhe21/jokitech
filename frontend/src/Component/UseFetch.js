import { useEffect, useState } from "react"

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(true)

    useEffect(()=>{
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setData(data)
                setLoad(false)
            })
    }, [url])

    return {data, load}
}

export default useFetch