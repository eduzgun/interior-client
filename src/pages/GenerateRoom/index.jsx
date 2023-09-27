// import React, { useEffect, useRef, useState } from 'react'
// import { loadImage } from "canvas"
// import "./style.css"


// import { renderFace } from "./convert";


// const GenerateRoom = () => {

//     const [fileState,setFileState] = useState("")
//     const [context,setContext] = useState("")

//     const canvasRef = useRef()

//     const imageInputRef = useRef()
//     const facesRef = useRef()
    
//     const [imageArrayData,setImageArrayData] = useState([])

//     const pzRef = useRef()
//     const nzRef = useRef()
//     const pxRef = useRef()
//     const nxRef = useRef()
//     const pyRef = useRef()
//     const nyRef = useRef()

//     let finished = 0;
//     let workers = [];

//     const options = {
//         rotation: 180,
//         interpolation: "lanczos",
//         outtype: "file",
//         width: Infinity
//     };

// ///////////////////////////////////////////////////////////////////////


// // creates class for each cube face, containing relevant manipulatable data
//     class CubeFace {
//         constructor(faceName) {
//             this.faceName = faceName;

//             this.anchor = document.createElement('a');
//             this.anchor.style.position='absolute';
//             this.anchor.title = faceName;

//             this.img = document.createElement('img');
//             this.img.style.filter = 'blur(4px)';

//             this.anchor.appendChild(this.img);
//         }

//         setPreview(url, x, y) {

//             this.img.src = url;
//             this.anchor.style.left = `${x}px`;
//             this.anchor.style.top = `${y}px`;
//         }

//         setDownload(url, fileExtension) {

//             this.anchor.href = url;
//             this.anchor.download = `${this.faceName}.${fileExtension}`;
//             this.img.style.filter = '';
//         }
//     }

//     function removeChildren(node) {
//     console.log("removeChildren");

//     while (node.firstChild) {
//         node.removeChild(node.firstChild);
//     }
//     }

//     function getDataURL(imgData) {

//     canvas.width = imgData.width;
//     canvas.height = imgData.height;
//     context.putImageData(imgData, 0, 0);
//     return new Promise(resolve => {
//         canvas.toBlob(blob => resolve(URL.createObjectURL(blob)), 'image/png', 0.92);
//     });
//     }

//     const dom = {
//     imageInput: document.getElementById('imageInput'),
//     faces: document.getElementById('faces'),
//     generating: document.getElementById('generating')
//     };

//     // imageInputRef.addEventListener('change', loadImage);

//     const facePositions = {
//         pz: {x: 1, y: 1},
//         nz: {x: 3, y: 1},
//         px: {x: 2, y: 1},
//         nx: {x: 0, y: 1},
//         py: {x: 1, y: 0},
//         ny: {x: 1, y: 2}
//     };

//     function loadImage() {
//         console.log("loadImage")

//         const file = imageInputRef.files[0];

//         if (!file) {
//             return;
//         }

//         const img = new Image();

//         img.src = URL.createObjectURL(file);

//         img.addEventListener('load', () => {
//             const {width, height} = img;
//             canvas.width = width;
//             canvas.height = height;
//             context.drawImage(img, 0, 0);
//             const data = context.getImageData(0, 0, width, height);

//             processImage(data);
//         });
//     }



//     // function processImage(data) {
//     //     console.log("prcoessImage")

//     //     removeChildren(dom.faces);
//     //     dom.generating.style.visibility = 'visible';

//     //     for (let worker of workers) {
//     //         worker.terminate();
//     //     }

//     //     for (let [faceName, position] of Object.entries(facePositions)) {
//     //         renderFace(data, faceName, position);
//     //     }
//     // }

//     function renderCubeFace(data, faceName, position) {
//         const face = new CubeFace(faceName);
//         facesRef.appendChild(face.anchor);


//         const worker = new Worker('convert.js');

//         const setDownload = ({data: imageData}) => {
            
//             const extension = "png";

//             getDataURL(imageData, extension)
//             .then(url => {
//                 face.setDownload(url, extension)
//             });

//             finished++;

//             if (finished === 6) {
//             // dom.generating.style.visibility = 'hidden';
//                 finished = 0;
//                 workers = [];
//         }
//     };

//     const setPreview = ({data: imageData}) => {

//         const x = imageData.width * position.x;
//         const y = imageData.height * position.y;


//         /////////////////////////////////////////
//         imageArrayData.push(imageData)
//         if(imageArrayData.length === 6){

//         let pz = new Image()
//         let nz = new Image()
//         let px = new Image()
//         let nx = new Image()
//         let py = new Image()
//         let ny = new Image()

//         const canvas2 = document.createElement("canvas")
//         const cvctx = canvas2.getContext("2d")
//         const i = imageArrayData[0]

//         document.body.appendChild(canvas2)
//         canvas2.width = i.width
//         canvas2.height = i.height

//         cvctx.putImageData(i,0,0)

//         // let ii = new Image()
//         // ii.name = "beans"
//         // ii.src = canvas.toDataURL() 

//         pz.name = "rinde"
//         pz.src = canvas.toDataURL()
        
//         cvctx?.clearRect(0,0,canvas2.width,canvas2.height)

//         console.log(pz)

//     }

//     /////////////////////////////////////////


//     getDataURL(imageData, 'jpg')
//       .then(url => face.setPreview(url, x, y));

//     worker.onmessage = setDownload;
//     worker.postMessage(options);
//   };

//   worker.onmessage = setPreview;
//   worker.postMessage(Object.assign({}, options, {
//     maxWidth: 200,
//     interpolation: 'linear',
//   }));

//   workers.push(worker);
// }















// ///////////////////////////////////////////////////////////////////////

//     useEffect(() => {

//         setSelectedFile("./src/pages/GenerateRoom/equimap1.jpg")

//         setPreviewSource(equiRectRef)
//         setContext(canvasRef.current.getContext("2d"))
//     },[])

//     return (
//         <div className="generator-container">
//             {/* <input type="file" onChange={convertImage}/> */}
//             <form onSubmit={handleConversion}>
//                 <input ref={imageInputRef} type="file" name='file' onChange={handleFileInput} value={fileState} className='form-input'/>
//                 <button type='submit'>Create</button>
//             </form>
//             <div id="cubemap">
//                 <output id="faces" ref={facesRef} ></output>
//             </div>
//             {/* <img ref={equiRectRef}  src={selectedFile} alt="chosen" style={{"width":"50%"}}/> */}
//             {/* <img src="" alt="" ref={pzRef}/>
//             <img src="" alt="" ref={nzRef}/>
//             <img src="" alt="" ref={pxRef}/>
//             <img src="" alt="" ref={nxRef}/>
//             <img src="" alt="" ref={pyRef}/>
//             <img src="" alt="" ref={nyRef}/> */}
//             <canvas id="generateCanvas" ref={canvasRef}></canvas>

//         </div>
//     )
// }

// export default GenerateRoom