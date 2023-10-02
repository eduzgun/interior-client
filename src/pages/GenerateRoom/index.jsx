import React, { useEffect, useRef, useState } from 'react'
import { loadImage } from "canvas"
import "./style.css"
import { useAuth } from '../../contexts'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const GenerateRoom = () => {

    const { user } = useAuth()

    const [fileState,setFileState] = useState()

    const [filename,setFilename] = useState("")
    const [dimensions,setDimensions] = useState("")
    const [description,setDescription] = useState("")
    const [theme, setTheme] = useState("")
    const [dropdown,setDropdown] = useState(true)

    const [context,setContext] = useState("")
    const [imageArrayData,setImageArrayData] = useState([])
    const [complete,setComplete] = useState(false)

    const formRef = useRef()
    const canvas = useRef()
    const imageInputRef = useRef()
    const facesRef = useRef()
    const filenameInputRef = useRef()
    const dimRef = useRef()
    const descRef=  useRef()
    const themeRef = useRef()
    const submitRef = useRef()
    const homeBtnRef = useRef()
    const completedRef = useRef()
    const questionRef = useRef()

    const navigate = useNavigate()
    


    const positions = ["pz","nz","px","nx","py","ny"]

    const cubeMapStyle = {
        "width": "800px",
        "height": "600px",
        "position": "relative",
        "border": "1px solid #888",
        "background": "#eee",
        "marginTop": "15px"
      }


    // const pzRef = useRef()
    // const nzRef = useRef()
    // const pxRef = useRef()
    // const nxRef = useRef()
    // const pyRef = useRef()
    // const nyRef = useRef()

    let finished = 0;
    let workers = [];

///////////////////////////////////////////////////////////////////////


// creates class for each cube face, containing relevant manipulatable data
    class CubeFace {
        constructor(faceName) {
            this.faceName = faceName;

            this.anchor = document.createElement('a');
            this.anchor.style.position='absolute';
            this.anchor.title = faceName;

            this.img = document.createElement('img');
            this.img.style.filter = 'blur(4px)';

            this.anchor.appendChild(this.img);
        }

        setPreview(url, x, y) {
            this.img.src = url;
            this.anchor.style.left = `${x}px`;
            this.anchor.style.top = `${y}px`;
        }

        setDownload(url, fileExtension) {

            this.anchor.href = url;
            this.anchor.download = `${this.faceName}.${fileExtension}`;
            this.img.style.filter = '';
        }
    }

    function removeChildren(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function getDataURL(imgData) {

        canvas.current.width = imgData.width;
        canvas.current.height = imgData.height;
        context.putImageData(imgData, 0, 0);
        return new Promise(resolve => {
            canvas.current.toBlob(blob => resolve(URL.createObjectURL(blob)), 'image/png', 0.92);
        });
    }

    const facePositions = {
        pz: {x: 1, y: 1},
        nz: {x: 3, y: 1},
        px: {x: 2, y: 1},
        nx: {x: 0, y: 1},
        py: {x: 1, y: 0},
        ny: {x: 1, y: 2}
    };

    async function loadImage() {
        let file=""
        try{
            file = fileState[0];
        }catch(err){
            console.log("")
        }

        if (!file) {
            return;
        }

        const img = new Image();

        img.src = URL.createObjectURL(file);

        await img.decode()

            const {width, height} = img;
            canvas.current.width = width;
            canvas.current.height = height;
            context.drawImage(img, 0, 0);

        const data = context.getImageData(0, 0, width, height);

        processImage(data);
        // });
    }

    // function addImageProcess(src){
    //     return new Promise((resolve,reject) => {
    //         let img = new Image()
    //         img.onload = () => {
    //             resolve({width:img.width,height:img.height})
    //             img.onerror = reject
    //             img.src = src
    //         }
    //     })
    // }

    function processImage(data) {
        removeChildren(facesRef.current);

        for (let worker of workers) {
            worker.terminate();
        }

        for (let [faceName, position] of Object.entries(facePositions)) {
            renderCubeFace(data, faceName, position);
        }
    }

    function renderCubeFace(data, faceName, position) {

        const face = new CubeFace(faceName);
        facesRef.current.appendChild(face.anchor);

        const options = {
            data: data,
            face: faceName,
            rotation: Math.PI * 180 / 180,
            interpolation: "lanczos",
          };


        const worker = new Worker('./src/pages/GenerateRoom/convert.js');

        const setDownload = ({data: imageData}) => {

            const extension = "png";

            getDataURL(imageData, extension)
            .then(url => {
                face.setDownload(url, extension)
            });

            finished++;

            if (finished === 6) {
                finished = 0;
                workers = [];
                setComplete(true)
        }
    };

    const setPreview = ({data: imageData}) => {

        const x = imageData.width * position.x;
        const y = imageData.height * position.y;

        imageArrayData.push(imageData.data)

    getDataURL(imageData, 'png')
      .then(url => face.setPreview(url, x, y));

    worker.onmessage = setDownload;
    worker.postMessage(options);


    if(imageArrayData.length > 6){
        setImageArrayData([])
    }
  };

  worker.onmessage = setPreview;
  worker.postMessage(Object.assign({}, options, {
    maxWidth: 200,
    interpolation: 'linear',
  }));

  workers.push(worker);
}

    // async function getRoomID

    async function uploadBlobFromHrefToCloudinary(blobHref,count,room_id) {
        // Fetch the Blob content from the href
        const response = await fetch(blobHref);
        const blob = await response.blob();
      
        const formData = new FormData();
        formData.append('file', blob,`${room_id}__${positions[count]}__${filename}.png`); // Add a file name (e.g., 'image.png')
        formData.append('upload_preset', 'interiorLAP4'); // Replace with your actual upload preset
        formData.append("public_id",`${room_id}__${positions[count]}__${filename}`)
    

        try {
          const response = await axios.post(
            'https://api.cloudinary.com/v1_1/de2nposrf/image/upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );
          return response.data;
        } catch (error) {
          console.log('Error uploading image:', error);
        }
      }

    async function postToRoomTable(){
        const data = {
            name:filename,
            dimensions:dimensions,
            description:description,
            theme:theme,
            user_id:user
        }

        const jsonData = JSON.stringify(data)

        try {
            const newRoom = await axios.post("http://localhost:5000/rooms",jsonData,{
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return newRoom.data
            
        } catch (error) {
            console.log("hella",error)
        }
    }

    async function handleCubeMapSubmit(e){
        e.preventDefault()
        disableForm(true)
        if(complete){
            try {
                postToRoomTable().then(resp => {
                    const room_id = resp.data.id
                    try {
                        const imgs = facesRef.current.children            
                        for(let i=0;i<imgs.length;i++){
                            const imgHref = imgs[i].href 
                            uploadBlobFromHrefToCloudinary(imgHref,i,room_id).then(resp => {
                                submitRef.current.style.display = "none"
                                homeBtnRef.current.style.display = "block"
                                completedRef.current.style.display = "block"
                                clearFields()
                                console.log("Upload Successful", resp);
                            
                            })
                        } 
                    } catch (error) {
                        console.error(error);
                    }
                })
            } catch (error) {
                console.log(error)
            }
            


        }else{
            await getUserData()
            console.log(user,"Not done yet")
        }


    }


    const getUserData = async () => {
        try {
            const resp = await axios.get(`http://localhost:5000/users/${user}`,{
                method:"GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await resp.data.data
            console.log(data)
        } catch (error) {
            console.log("Whoopsie",error)
        }
    }

    function clearFields(){
        imageInputRef.current.value = ""
        filenameInputRef.current.value = ""
        dimRef.current.value = ""
        descRef.current.value = ""
        themeRef.current.value = ""
        submitRef.current.value = ""
    }

    function disableForm(truthy){
        imageInputRef.current.disabled = truthy
        filenameInputRef.current.disabled = truthy
        dimRef.current.disabled = truthy
        descRef.current.disabled = truthy
        themeRef.current.disabled = truthy
        submitRef.current.disabled = truthy
    }

    function goHome(){
        navigate("/")
    }

    function handleFile(e){
        const files = Array.from(e.target.files)
        setFileState(files)
        setFilename(files[0].name.split(".")[0])
        filenameInputRef.current.value = files[0].name.split(".")[0]
    }

    function handleFilename(e){
        setFilename(e.target.value)
    }

    function handleDimensions(e){
        setDimensions(e.target.value)
    }

    function handleDescription(e){
        setDescription(e.target.value)
    }

    function handleTheme(e){
        setTheme(e.target.value)
    }

    function toggleDrop(){
        setDropdown(!dropdown)
        if(dropdown){
            questionRef.current.style.display = "block"
        }else{
            questionRef.current.style.display = "none"
        }
    }


///////////////////////////////////////////////////////////////////////




    useEffect(() => {
        setContext(canvas.current.getContext("2d"))
    },[])

    useEffect(() => {
        disableForm(false)
        try {
            loadImage()
        } catch (error) {
            console.log(error)
        }
    },[fileState])

    return (
        <div id="wrapper">
            <div className="generator-container">
                <div id="questions">
                    <p id='qmark' onClick={toggleDrop}>?</p>
                    <div ref={questionRef} id="qbox">
                        <h3>What do I do here?</h3>
                        <p>
                            You see the button that says: "Choose File" over there? <br/><br />
                            You can use that to upload a <strong>PANORAMIC</strong> image and turn it into a cubemap that creates a room! <br /><br />
                        </p>
                        <details><summary>Don't know what a <strong>PANORAMIC</strong> image is? Open me for an example!</summary>
                        <img id="example-panoramic" src="./src/pages/GenerateRoom/Living-Room-Panorama.jpg" alt="" />
                        </details>
                    </div>
                </div>
                {/* <input type="file" onChange={convertImage}/> */}
                <div id="cubemap" style={cubeMapStyle}>
                    <output id="faces" ref={facesRef} ></output>
                </div>
                <canvas id="generateCanvas" ref={canvas} style={{"display":"none"}}></canvas>
                <form ref={formRef} onSubmit={handleCubeMapSubmit}>
                    <input placeholder=">" ref={imageInputRef} type="file" name='file' className='form-input' onChange={handleFile} required/>

                    <div className="inputs" id='filename-input'>
                        <label htmlFor="filename">Filename</label>
                        <input ref={filenameInputRef} placeholder=">" type="text" name='filename' id='filename-field' onChange={handleFilename} required/>
                    </div>

                    <div className="inputs" id='dimensions-input'>
                        <label htmlFor="dimensions">Dimensions</label>
                        <input ref={dimRef} placeholder=">" type="text" name='dimensions' id='dimensions-field' onChange={handleDimensions} required/>
                    </div>

                    <div className="inputs" id='description-input'>
                        <label htmlFor="description">Description</label>
                        <textarea ref={descRef} maxLength={100} placeholder=">" name="description" id="description-field" cols="50" rows="3" onChange={handleDescription} required></textarea>
                    </div>

                    <div className="inputs" id='theme-input'>
                        <label htmlFor="theme">Themes</label>
                        <input ref={themeRef} placeholder=">" type="text" name='theme' id='theme-field' onChange={handleTheme} required/>
                    </div>
                    <button ref={submitRef} id="submit-btn" type='submit'>Create</button>
                </form>
                <p ref={completedRef} id='createdP'>File Created!</p>
                <button ref={homeBtnRef} onClick={goHome} id='home-btn'>Return Home</button>
            </div>
        </div>

    )
}

export default GenerateRoom
