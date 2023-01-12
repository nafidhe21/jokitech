import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import '../../asset/CSS/Account.css'
import { BsPencilSquare } from "react-icons/bs";
import { IoCloseCircleSharp } from "react-icons/io5"
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile } from "../../utils/reusable"
import { TextField } from '@material-ui/core';

const Account = () => {
    const [data, setData] = useState(null)
    const cookies = new Cookies()
    const [email, setEmail] = useState("")
    const [namaPenjasa, setNamaPenjasa] = useState("")
    const [nomorHpPenjasa, setNomorHpPenjasa] = useState("")
    const [aboutMe, setAboutMe] = useState("")
    const [profilePicture, setProfilePicture] = useState(null)
    const [update, setUpdate] = useState(false)
    const target = useRef(null)
    let fd = new FormData()
    
    const [image, setImage] = React.useState(null);
	const [crop, setCrop] = React.useState({ x: 0, y: 0 });
	const [zoom, setZoom] = React.useState(1);
    const [isCrop, setIsCrop] = useState(true)

    const [imageBase64, setImageBase64] = useState(null)
    const imagePreviewCanvasRef = useRef()
    
    
    useEffect(() =>{
        axios.get("http://localhost:4000/api/v1/penjasas/view/" + cookies.get("dataId"))
        .then(res => {
            console.log(res)
            setData(res.data)
            return res.data
        }).then(res => {
            setNamaPenjasa(res.namaPenjasa)
            setNomorHpPenjasa(res.nomorHpPenjasa)
            setEmail(res.email)
            if(res.aboutMe!="undefined"){setAboutMe(res.aboutMe)}
        })
    }, [])

    useEffect(() => {
        if(update){
            if(imageBase64){
                const canvasRef = imagePreviewCanvasRef.current
                const image64 = imageBase64
                const fileExtension = extractImageFileExtensionFromBase64(image64)
                const imageData64 = canvasRef.toDataURL('image/' + fileExtension)
                
                const fileName = randomName(8) + "." + fileExtension
                const myNewCroppedFile = base64StringtoFile(imageData64, fileName)
                setProfilePicture(myNewCroppedFile)
            }

            fd.append('email', email)
            fd.append('namaPenjasa', namaPenjasa)
            fd.append('nomorHpPenjasa', nomorHpPenjasa)
            fd.append('aboutMe', aboutMe)
            fd.append('profilePicture', profilePicture)
            
            axios.put("http://localhost:4000/api/v1/penjasas/updateBio/" + cookies.get("dataId"),    
            fd,
            {headers: 
                {Authorization: "Bearer " + cookies.get("token")},
            },
            ).then(() => {
                window.location.reload()
            })
        }
    })

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        const canvasRef = imagePreviewCanvasRef.current
        const image64 = imageBase64
        const pixelCrop = croppedAreaPixels    
        image64toCanvasRef(canvasRef, image64, pixelCrop)
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
    
    const handleUpload = async (e) => {
        const file = e.target.files[0]
        setImage(URL.createObjectURL(file))
        const base64 = await convertBase64(file)
        setImageBase64(base64)
        setIsCrop(false)
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

    return (
        <div className="account">
            <div className="bagianKiri">
                <div className="container">
                    {isCrop==false && (

                        <div className='container-cropper'>
                            {image ? (
                                <>
                                    <div className="close" onClick={()=>setIsCrop(true)}>
                                        <IoCloseCircleSharp size="25px" />
                                    </div>
                                    <div className='cropper'>
                                        <Cropper
                                            image={image}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={1}
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
                                    <div className="button">
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={() => target.current.click()}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Choose Photo
                                        </Button>
                                        <Button
                                            variant='contained'
                                            color='secondary'
                                            onClick={() => setUpdate(true)}
                                            style={{ marginRight: "10px" }}
                                        >
                                            Upload
                                        </Button>
                                        <canvas ref={imagePreviewCanvasRef}></canvas>
                                    </div>
                                </>
                            ) : null}

                        </div>
                    )}
                </div>
                <div className="gambar">
                    {data && (<img src={data.profilePicture}  />)}
                </div>
                {isCrop && (
                    <div className="icon-edit">
                        <BsPencilSquare fontSize="25px" onClick={() => target.current.click()} />
                    </div>
                )}
                <input ref={target} type="file" onChange= {handleUpload} accept="image/*" />
            </div>
            {isCrop && (

                <div className="bagianKanan">
                    <div className="item">
                        <h3>Nama</h3>
                        {data && (
                            <TextField 
                                id="outlined-basic"  
                                variant="outlined"
                                fullWidth
                                type= "text"
                                required
                                value = {namaPenjasa}
                                onChange= {(e) => setNamaPenjasa(e.target.value)}
                                placeholder= "Nama..."
                            />
                        )}
                    </div>
                    <div className="item">
                        <h3>Email</h3>
                        {data && (
                            <TextField 
                                id="outlined-basic"  
                                variant="outlined"
                                fullWidth
                                type="text"
                                value= {email}
                                onChange= {(e) => setEmail(e.target.value)}
                                placeholder="Email..."
                            />
                        )}
                    </div>
                    <div className="item">
                        <h3>No. Handphone</h3>
                        {data && (
                            <TextField 
                                id="outlined-basic"  
                                variant="outlined"
                                fullWidth
                                type= "text"
                                value= {nomorHpPenjasa}
                                onChange= {(e) => setNomorHpPenjasa(e.target.value)}
                                placeholder= "No Handphone..."
                            />
                        )}
                    </div>
                    <div className="item">
                        <h3>About Me</h3>
                        {data && (
                            <TextField
                                id="outlined-basic"  
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={10}
                                value= {aboutMe}
                                onChange= {(e) => setAboutMe(e.target.value)}
                                placeholder="About Me..."
                            />
                        )}
                    </div>
                    <div className="item">
                        <button  onClick={() => setUpdate(true)}>Update</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Account
