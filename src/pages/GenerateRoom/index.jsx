import React, { useEffect, useRef, useState } from 'react'
import { loadImage } from "canvas"
import "./style.css"
import { useAuth } from '../../contexts'
import axiosInstance from "../../helpers"
import { useNavigate } from 'react-router-dom'
import { QuestionHelp } from '../../components'

const GenerateRoom = () => {

    const { user } = useAuth()

    const [fileState,setFileState] = useState()

    const [filename,setFilename] = useState("")
    const [dimensions,setDimensions] = useState("")
    const [description,setDescription] = useState("")
    const [theme, setTheme] = useState("")
    const [select,setSelect] = useState("Bedroom")
    const [imageTypeSelect,setImageTypeSelect] = useState(false)
    const [files, setFiles] = useState([])

    const [px,setPx] = useState([])
    const [nx,setNx] = useState([])
    const [py,setPy] = useState([])
    const [ny,setNy] = useState([])
    const [pz,setPz] = useState([])
    const [nz,setNz] = useState([])

    const [context,setContext] = useState("")
    const [imageArrayData,setImageArrayData] = useState([])
    const [complete,setComplete] = useState(false)

    const formRef = useRef()
    const canvas = useRef()
    const imageInputRef = useRef()

    const cubemapRefs = useRef([React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef()])

    const facesRef = useRef()
    const filenameInputRef = useRef()
    const dimRef = useRef()
    const descRef=  useRef()
    const themeRef = useRef()
    const dropdownRef = useRef()
    const submitRef = useRef()
    const homeBtnRef = useRef()
    const completedRef = useRef()

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

    let finished = 0;
    let workers = [];

///////////////////////////////////////////////////////////////////////

      const inactiveStyle = {
        "zIndex":"1",
        "color":"var(--font)",
        "backgroundColor":"#ffffff"
      }

      const activeStyle = {
        "zIndex":"1",
        "color":"#ffffff",
        "backgroundColor":"rgb(60,62,73)"
      }

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
            console.log(err)
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

    const readFileAsBlob = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.onload = () => {
                const blob = new Blob([reader.result], {type:file.type})
                resolve(blob)
            }
            reader.readAsArrayBuffer(file)
        })
    }

    async function postToRoomTable(){

        let imgs = []
        const arr = []
        const sortedArray = []
        const formData = new FormData()


        if(imageTypeSelect){
            imgs = facesRef.current.children
            console.log("panorama");

            const posPositions = ["px","nx","py","ny","pz","nz"]
    
            posPositions.forEach(order => {
    
                let matchingImg
                for(let anchor of imgs){
                    if(anchor.title === order && !arr.includes(matchingImg)){  
                        sortedArray.push(anchor.href)
                        arr.push(order)
                    }
                }         
            })


        }else{
            imgs = [px,nx,py,ny,pz,nz]
            for(let i=0;i<imgs.length;i++){
                const file = imgs[i]
                const blob = await readFileAsBlob(file)
                const imageURL = URL.createObjectURL(blob)
                sortedArray.push(imageURL)
            }
        }

        for(let i=0;i<sortedArray.length;i++){
            const imgBlobURLToSend = sortedArray[i]
            const response = await fetch(imgBlobURLToSend);
            const blob = await response.blob();
            formData.append(`file${i}`,blob)
        } 
        
        

        formData.append("name",filename)
        formData.append("dimensions",dimensions)
        formData.append("description",description)
        formData.append("theme",theme)
        formData.append("category",select)
        formData.append("user_id",user)


        // KEEP THIS

        try {
            const newRoom = await axiosInstance.post('/rooms', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(response => {
                console.log('Response:', response.data);
              })
              .catch(error => {
                console.error('Error:', error);
              });
            
            return newRoom
            // console.log(newRoom.data)
        } catch (error) {
            console.log("hella",error)
        }
    }

    async function handleCubeMapSubmit(e){
        e.preventDefault()
        if(complete){
            try {
                disableForm(true)
                postToRoomTable().then(resp => {
                    const room_id = resp
                    submitRef.current.style.display = "none"
                    homeBtnRef.current.style.display = "block"
                    completedRef.current.style.display = "block"
                    clearFields()
                })
            
            } catch (error) {
                console.log(error)
            }
            


        }else{
            // await getUserData()
            console.log(user,"Not done yet")
        }


    }


    const getUserData = async () => {
        try {
            const resp = await axiosInstance.get(`/users/${user}`,{
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
        if(imageTypeSelect){
            imageInputRef.current.value = ""
        }else{
            cubemapRefs.current[0].current.value = ""
            cubemapRefs.current[1].current.value = ""
            cubemapRefs.current[2].current.value = ""
            cubemapRefs.current[3].current.value = ""
            cubemapRefs.current[4].current.value = ""
            cubemapRefs.current[5].current.value = ""

        }
        filenameInputRef.current.value = ""
        dimRef.current.value = ""
        descRef.current.value = ""
        themeRef.current.value = ""
        dropdownRef.current.value = ""
        submitRef.current.value = ""
    }

    function disableForm(truthy){
        if(imageTypeSelect){
            imageInputRef.current.disabled = truthy
        }else{
            cubemapRefs.current[0].current.disabled = truthy
            cubemapRefs.current[1].current.disabled = truthy
            cubemapRefs.current[2].current.disabled = truthy
            cubemapRefs.current[3].current.disabled = truthy
            cubemapRefs.current[4].current.disabled = truthy
            cubemapRefs.current[5].current.disabled = truthy

        }
        filenameInputRef.current.disabled = truthy
        dimRef.current.disabled = truthy
        descRef.current.disabled = truthy
        themeRef.current.disabled = truthy
        dropdownRef.current.disabled = truthy
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

    function handleCube(e,pos){
        const file = e.target.files[0]
            switch (pos){
                case "px":
                    setPx(file)
                case "nx":
                    setNx(file)
                case "py":
                    setPy(file)
                case "ny":
                    setNy(file)
                case "pz":
                    setPz(file)
                case "nz":
                    setNz(file)
            }
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

    function handleCategory(e){
        setSelect(e.target.value)
    }

    function handleImageTypeSelect(){
        setImageTypeSelect(!imageTypeSelect)
    }


///////////////////////////////////////////////////////////////////////




    useEffect(() => {
        if(!imageTypeSelect){
            setComplete(true)
        }
        setContext(canvas.current.getContext("2d"))
        submitRef.current.style.display = "block"
        homeBtnRef.current.style.display = "none"
        completedRef.current.style.display = "none"
        clearFields()
    },[imageTypeSelect])

    useEffect(() => {
        disableForm(false)
        try {
            if(imageTypeSelect){
                loadImage()
            }
        } catch (error) {
            console.log(error)
        }
    },[fileState])


    const panoramicQuestionMark = {
        header:"What do I do here?",
        body:<p>
        You see the button that says: "Choose File" over there? <br/><br />
       You can use that to upload a <strong>PANORAMIC</strong> image and turn it into a cubemap that creates a room! <br /><br />
   </p>,
        summaryContent:<p>Don't know what a <strong>PANORAMIC</strong> image is? Open me for an example!</p>,
        image:"./src/pages/GenerateRoom/example-panorama.jpg"
    }

    const cubeQuestionMark = {
        header:"What do I do here?",
        body:<p>See those "choose file" buttons? Each of those correspond to a <strong>CUBEMAP</strong> image.<br /><br />They go in order:<br /> PX, NX, PY, NY, PZ ,NZ<br /><br />Make sure your files are inserted in that order too, as the renderer is very specific and we don't want your room to come out the wrong way. <br /><br /></p>,
        summaryContent:<p>Don't know what a <strong>CUBEMAP</strong> is? Open me for an example!</p>,
        image:"./src/pages/GenerateRoom/example-cubemap.jpg"
    }

    return (
        <div id="wrapper" data-testid={"wrapper"} >
            <div className="generator-container" data-testid={"generator-container"}>
                <div id='maptype-selector'>
                    <div id="panorama-selector" onClick={handleImageTypeSelect} style={!imageTypeSelect ? activeStyle : inactiveStyle}>PANORAMA</div>
                    <div id="cubemap-selector" onClick={handleImageTypeSelect} style={imageTypeSelect ? activeStyle : inactiveStyle}>CUBEMAP</div>
                </div>
                {imageTypeSelect 
                ? <QuestionHelp title={panoramicQuestionMark.header} content={panoramicQuestionMark.body} summaryContent={panoramicQuestionMark.summaryContent} image={panoramicQuestionMark.image} />

                : <QuestionHelp title={cubeQuestionMark.header} content={cubeQuestionMark.body} summaryContent={cubeQuestionMark.summaryContent} image={cubeQuestionMark.image} />
                }
                
                
                <div id="cubemap" style={ imageTypeSelect ? cubeMapStyle : {}}>
                    <output id="faces" ref={facesRef} style={ imageTypeSelect ? {"display":"block"} : {"display":"none"}}></output>
                </div>
                <canvas id="generateCanvas" ref={canvas} style={{"display":"none"}}></canvas>


                { imageTypeSelect ? 
                <form ref={formRef} onSubmit={handleCubeMapSubmit} style={{"zIndex":"5"}}>

                    {/* panorama input */}
                    <input placeholder=">" ref={imageInputRef} type="file" name='file' className='form-input' onChange={handleFile} disabled={!imageTypeSelect ? true : false} required/>

                    <div className="inputs" id='filename-input'>
                        <label htmlFor="filename">Filename</label>
                        <input ref={filenameInputRef} placeholder="> file" type="text" name='filename' id='filename-field' onChange={handleFilename} required/>
                    </div>

                    <div className="inputs" id='dimensions-input'>
                        <label htmlFor="dimensions">Room Dimensions</label>
                        <input ref={dimRef} placeholder="> 12m x 12m" type="text" name='dimensions' id='dimensions-field' onChange={handleDimensions} required/>
                    </div>

                    <div className="inputs" id='description-input'>
                        <label htmlFor="description">Description</label>
                        <textarea ref={descRef} maxLength={100} placeholder="> Fun description" name="description" id="description-field" cols="50" rows="3" onChange={handleDescription} required></textarea>
                    </div>

                    <div className="inputs" id='theme-input'>
                        <label htmlFor="theme">Themes</label>
                        <input ref={themeRef} placeholder="> Modern, minimalist" type="text" name='theme' id='theme-field' onChange={handleTheme} required/>
                    </div>
                    <div className="inputs" id="category-input">
                        <label htmlFor="category">Category</label>
                        <select ref={dropdownRef} name="category-dropdown" id="category-dropdown" value={select} onChange={handleCategory}>
                            <option value="Bedroom">Bedroom</option>
                            <option value="Kitchen">Kitchen</option>
                            <option value="Garden">Garden</option>
                            <option value="Bathroom">Bathroom</option>
                            <option value="Living Room">Living Room</option>
                            <option value="Studio">Studio</option>
                        </select>
                    </div>
                    <button ref={submitRef} id="submit-btn" type='submit'>Create</button>
                </form>

                : 

                <form ref={formRef} onSubmit={handleCubeMapSubmit} >
                    <h2 id='cubemap-header'>Upload a CubeMap</h2>
                    {/* cubemap inputs */}
                    <div id="cubemap-inputs">
                        <div id="px">
                            <label htmlFor="px">PX</label>
                            <input type="file" ref={cubemapRefs.current[0]} name='px' className='cubemap-inputs' onChange={(e) => handleCube(e,"px")} required accept='.jpg, .jpeg, .png'/>
                        </div>

                        <div id="nx">
                            <label htmlFor="px">NX</label>
                            <input type="file" ref={cubemapRefs.current[1]} name='nx' className='cubemap-inputs' onChange={(e) => handleCube(e,"nx")} required accept='.jpg, .jpeg, .png'/>
                        </div>

                        <div id="py">
                            <label htmlFor="px">PY</label>
                            <input type="file" ref={cubemapRefs.current[2]} name='py' className='cubemap-inputs' onChange={(e) => handleCube(e,"py")} required accept='.jpg, .jpeg, .png'/>
                        </div>

                        <div id="ny">
                            <label htmlFor="px">NY</label>
                            <input type="file" ref={cubemapRefs.current[3]} name='ny' className='cubemap-inputs' onChange={(e) => handleCube(e,"ny")} required accept='.jpg, .jpeg, .png'/>
                        </div>

                        <div id="pz">
                            <label htmlFor="px">PZ</label>
                            <input type="file" ref={cubemapRefs.current[4]} name='pz' className='cubemap-inputs' onChange={(e) => handleCube(e,"pz")} required accept='.jpg, .jpeg, .png'/>
                        </div>

                        <div id="nz">
                            <label htmlFor="px">NZ</label>
                            <input type="file" ref={cubemapRefs.current[5]} name='nz' className='cubemap-inputs' onChange={(e) => handleCube(e,"nz")} required accept='.jpg, .jpeg, .png'/>
                        </div>
                    </div>

                <div className="inputs" id='filename-input'>
                    <label htmlFor="filename">Filename</label>
                    <input ref={filenameInputRef} placeholder="> file" type="text" name='filename' id='filename-field' onChange={handleFilename} required/>
                </div>

                <div className="inputs" id='dimensions-input'>
                    <label htmlFor="dimensions">Room Dimensions</label>
                    <input ref={dimRef} placeholder="> 12m x 12m" type="text" name='dimensions' id='dimensions-field' onChange={handleDimensions} required/>
                </div>

                <div className="inputs" id='description-input'>
                    <label htmlFor="description">Description</label>
                    <textarea ref={descRef} maxLength={100} placeholder="> Fun description" name="description" id="description-field" cols="50" rows="3" onChange={handleDescription} required></textarea>
                </div>

                <div className="inputs" id='theme-input'>
                    <label htmlFor="theme">Themes</label>
                    <input ref={themeRef} placeholder="> Modern, minimalist" type="text" name='theme' id='theme-field' onChange={handleTheme} required/>
                </div>
                <div className="inputs" id="category-input">
                    <label htmlFor="category">Category</label>
                    <select ref={dropdownRef} name="category-dropdown" id="category-dropdown" value={select} onChange={handleCategory}>
                        <option value="Bedroom">Bedroom</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Garden">Garden</option>
                        <option value="Bathroom">Bathroom</option>
                        <option value="Living Room">Living Room</option>
                        <option value="Studio">Studio</option>
                    </select>
                </div>
                <button ref={submitRef} id="submit-btn" type='submit'>Create</button>
            </form>
                }
                <p ref={completedRef} id='createdP'>File Created!</p>
                <button ref={homeBtnRef} onClick={goHome} id='home-btn'>Return Home</button>
            </div>
        </div>

    )
}

export default GenerateRoom


