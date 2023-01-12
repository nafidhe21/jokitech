import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import { MenuItem, Select, TextField } from '@material-ui/core';
import { AiOutlineCamera } from "react-icons/ai";
import { IoCloseCircleSharp } from "react-icons/io5"
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router";
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile } from "../../utils/reusable"
import "../../asset/CSS/CreateJasa.css"

const CreateJasa = () => {
    const cookies = new Cookies()
    const [namaJasa, setNamaJasa] = useState("")
    const penjasaId = cookies.get("dataId")
    const [namaPenjasa, setNamaPenjasa] = useState("")
    const [nomorHpPenjasa, setNomorHpPenjasa] = useState("")
    const [email, setEmail] = useState("")
    const [startingPrice, setStartingPrice] = useState("")
    const [descJasa, setDescJasa] = useState("")
    const [catJasa, setCatJasa] = useState(1)
    const [imageFix, setImageFix] = useState(null)
    const [isClose, setIsClose] = useState(true)
    const [update, setUpdate] = useState(false)
    const target = new useRef()
    const history = useHistory()
    let fd = new FormData()

    const [image, setImage] = React.useState(null);
	const [croppedArea, setCroppedArea] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);

    const [imageBase64, setImageBase64] = useState(null)
    const imagePreviewCanvasRef = useRef()

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        const canvasRef = imagePreviewCanvasRef.current
        const image64 = imageBase64
        const pixelCrop = croppedAreaPixels    
        image64toCanvasRef(canvasRef, image64, pixelCrop)
        setIsClose(false)
    };
    
    const randomName = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    
    const onSelectFile = async (e) => {
        const file = e.target.files[0]
        setImage(URL.createObjectURL(file))
        const base64 = await convertBase64(file)
        setImageBase64(base64)
        setIsClose(false)
    }

    const onUpload = () => {
        const canvasRef = imagePreviewCanvasRef.current
        const image64 = imageBase64
        const fileExtension = extractImageFileExtensionFromBase64(image64)
        const imageData64 = canvasRef.toDataURL('image/' + fileExtension)
                
        const fileName = randomName(8) + "." + fileExtension
        const myNewCroppedFile = base64StringtoFile(imageData64, fileName)
        setImageFix(myNewCroppedFile)
        setIsClose(true)
    }
    
    
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)

            fileReader.onload = () => {
                resolve(fileReader.result)
            }

            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    useEffect(() => {
        axios.get("http://localhost:4000/api/v1/penjasas/view/" + cookies.get("dataId"))
        .then(res => {
            setNamaPenjasa(res.data.namaPenjasa)
            setNomorHpPenjasa(res.data.nomorHpPenjasa)
            setEmail(res.data.email)
        })
    }, [])

    useEffect(() => {
        if(update){
            fd.append('namaJasa', namaJasa)
            fd.append('penjasaId', penjasaId)
            fd.append('namaPenjasa', namaPenjasa)
            fd.append('nomorHpPenjasa', nomorHpPenjasa)
            fd.append('email', email)
            fd.append('startingPrice', startingPrice)
            fd.append('descJasa', descJasa)
            fd.append('catJasa', catJasa)
            fd.append('image', imageFix)

            axios.post("http://localhost:4000/api/v1/jasas/createJasa",
                fd,
                {headers:
                    {Authorization: "Bearer " + cookies.get("token")},
                },
            ).then(() => {
                history.push("/posting")
            })
        }
    })

    return (
        <div className="create-jasa">
            <h2>Create Jasa</h2>
            <div className='container'>
                {isClose==false && (
                    <div className='container-cropper'>
                        {image ? (
                            <>
                                <div className="close">
                                    <IoCloseCircleSharp size="25px" onClick={() => setIsClose(true)} />
                                </div>
                                <div className='cropper'>
                                    <Cropper
                                        image={image}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={5 / 3}
                                        onCropChange={setCrop}
                                        onZoomChange={setZoom}
                                        onCropComplete={onCropComplete}
                                    />
                                </div>

                                <div className='slider'>
                                    <Slider
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(e, zoom) => setZoom(zoom)}
                                    />
                                </div>
                                <div className='container-buttons'>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={() => target.current.click()}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Choose
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        onClick={onUpload}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Upload
                                    </Button>
                                </div>
                            </>
                        ) : null}
                    </div>
                )}

            </div>
            {isClose && (
                <div className="form">
                    <div className="item">
                        <h3>Nama Jasa</h3>
                        <TextField 
                            id="outlined-basic"  
                            variant="outlined"
                            fullWidth
                            type= "text"
                            required
                            value= {namaJasa}
                            onChange= {(e) => setNamaJasa(e.target.value)}
                            placeholder= "Nama Jasa..."
                        />
                    </div>
                    <div className="item">
                        <h3>Starting Price</h3>
                        <TextField 
                            id="outlined-basic"  
                            variant="outlined"
                            fullWidth
                            type= "text"
                            required
                            value= {startingPrice}
                            onChange= {(e) => setStartingPrice(e.target.value)}
                            placeholder= "Starting Price..."
                        />
                    </div>
                    <div className="item">
                        <h3>Deskripsi Jasa</h3>
                        <TextField 
                            id="outlined-basic"  
                            variant="outlined"
                            fullWidth
                            multiline
                            rows= {10}
                            required
                            value= {descJasa}
                            onChange= {(e) => setDescJasa(e.target.value)}
                            placeholder= "Deskripsi Jasa..."
                        />
                    </div>
                    <div className="item">
                        <h3>Kategori Jasa</h3>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            fullWidth
                            value={catJasa}
                            onChange= {(e) => setCatJasa(e.target.value)}
                        >
                            <MenuItem value={1}>Graphic and Design</MenuItem>
                            <MenuItem value={2}>Programming and Tech</MenuItem>
                            <MenuItem value={3}>Video and Animation</MenuItem>
                        </Select>
                    </div>
                    <div className="item">
                        <h3>Gambar Jasa</h3>
                        <div className="choose" onClick={() => target.current.click()}>
                            <AiOutlineCamera />
                            <p>Choose Photo</p>
                        </div>
                    </div>
                    {imageFix && (
                        <img src={URL.createObjectURL(imageFix)} />
                    )}

                    <button onClick={() => setUpdate(true)}>Add Jasa</button>
                </div>
            )}

            <input ref={target} type="file" onChange={onSelectFile} />
            <canvas ref={imagePreviewCanvasRef}></canvas>
        </div>
    )
}

export default CreateJasa
