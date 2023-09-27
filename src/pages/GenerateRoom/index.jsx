import React, { useEffect, useRef, useState } from 'react'
import { loadImage } from "canvas"
// import { convertImage } from "./functions"
import fs from "fs"
import "./style.css"


import { renderFace } from "./convert";
import { mimeType } from "./utils"

const GenerateRoom = () => {

    const [fileState,setFileState] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [previewSource,setPreviewSource] = useState("")
    const [context,setContext] = useState("")

    const canvasRef = useRef()

    const equiRectRef = useRef()

    const pzRef = useRef()
    const nzRef = useRef()
    const pxRef = useRef()
    const nxRef = useRef()
    const pyRef = useRef()
    const nyRef = useRef()

    const options = {
        rotation: 180,
        interpolation: "lanczos",
        outformat: "jpg",
        outtype: "file",
        width: Infinity
    };


    function handleConversion(e){
        e.preventDefault()
        convertImage(fileState,options).then(x => {
            console.log(x)
        })
        setFileState("")
    }

    const getDataURL = (imgData, extension) => {
        canvasRef.current.width = imgData.width;
        canvasRef.current.height = imgData.height;
        context.putImageData(imgData, 0, 0);
        return new Promise(resolve => resolve(canvasRef.current.toBuffer(mimeType[extension], { quality: 0.92 })));
    }
    
    
    const convertImage = (src, usrOptions) => {
        const options = {
            rotation: 180,
            interpolation: 'lanczos',
            outformat: 'jpg',
            outtype: 'file',
            width: Infinity,
            ...usrOptions
        }



        return new Promise(resolve => {
            loadImage(src).then((img) => {
                img.crossOrigin = ""

                const { width, height } = img;
                canvasRef.current.width = width;
                canvasRef.current.height = height;
                context.drawImage(img, 0, 0);
                const data = context.getImageData(0, 0, width, height);
                processImage(data, options).then(x => resolve(x));
            })
        });
    }
    
    
    const processFace = (data, options, facename) => {
        return new Promise(resolve => {
            const optons = {
                data,
                face: facename,
                rotation: Math.PI * options.rotation / 180,
                interpolation: options.interpolation,
                maxWidth: options.width
            };
    
            renderFace(optons).then(data => {
                getDataURL(data, options.outformat).then(file => {
                    if (options.outtype === 'file') {
                        console.log(file)
                        // CONVERT WRITING FILE INTO STORING EACH IMAGE INTO ARRAY / HTML ELEMENT

                        // fs.writeFile(`${facename}.${options.outformat}`, file, "binary", (err) => {
                        //     if (err) console.log(err);
                        //     else {
                        //         console.log("The file was saved!");
                        //         resolve(`${facename}.${options.outformat} was saved`)
                        //     }
                        // });
                    } else {
                        resolve({
                            buffer: file,
                            filename: `${facename}.${options.outformat}`
                        });
                    }
                })
            })
        });
    }
    
    
    const processImage = (data, options) => {
        const faces = ["pz", "nz", "px", "nx", "py", "ny"].map(face => processFace(data, options, face))
    
        return new Promise(resolve => Promise.all(faces).then(x => resolve(x)));
    }
    

    function handleFileInput(e){
        const file = e.target.files[0]
        previewFile(file)
    }

    function previewFile(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => setPreviewSource(reader.result)
        console.log(file)
    }


    useEffect(() => {

        setSelectedFile("./src/pages/GenerateRoom/equimap1.jpg")

        setPreviewSource(equiRectRef)
        setContext(canvasRef.current.getContext("2d"))
    },[])

    return (
        <div className="generator-container">
            {/* <input type="file" onChange={convertImage}/> */}
            <form onSubmit={handleConversion}>
                <input type="file" name='file' onChange={handleFileInput} value={fileState} className='form-input'/>
                <button type='submit'>Create</button>
            </form>
            {/* <img ref={equiRectRef}  src={selectedFile} alt="chosen" style={{"width":"50%"}}/> */}
            {/* <img src="" alt="" ref={pzRef}/>
            <img src="" alt="" ref={nzRef}/>
            <img src="" alt="" ref={pxRef}/>
            <img src="" alt="" ref={nxRef}/>
            <img src="" alt="" ref={pyRef}/>
            <img src="" alt="" ref={nyRef}/> */}
            <canvas id="generateCanvas" ref={canvasRef}></canvas>

        </div>
    )
}

export default GenerateRoom