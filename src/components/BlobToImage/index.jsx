import React, { useEffect, useState } from 'react';
import JSZip from "jszip"
import "./style.css"
import axiosInstance from '../../helpers'
import axios from 'axios';
import { useAuth } from '../../contexts';


const BlobToImage = ({ image_id, refs, className="", loadedFunc, room_name, roomType}) => {
  const [images, setImages] = useState([]);

  const { user } = useAuth()

    // async function extractImages(zipData){
    //     const zip = new JSZip()
    //     try {
    //         const unzipped = await zip.loadAsync(zipData)
    //         const fileNames = Object.keys(unzipped.files)

    //         const imagesArray = await Promise.all(
    //             fileNames.map(async (fileName) => {
    //                 const file = unzipped.files[fileName]
    //                 const blobData = await file.async("blob")
    //                 return {fileName,blobData}
    //             })
    //         )

    //         return imagesArray
    //     } catch (error) {
    //         console.log("line25",error);
    //         return []
    //     }
    // }

    // async function GetImageZip(){

    //     axios({
    //         method:"options",
    //         url:`https://lap-4-project.onrender.com/rooms/images/${image_id}`
    //     }).then(resp => {
    //         console.log("line37",resp);
    //     }).catch(error => {
    //         console.log("line40",error);
    //     })

    //     try {
    //         const resp = await axiosInstance.get(`/rooms/images/${image_id}`,{
    //             responseType:"blob",
    //             headers:{
    //                 "Access-Control-Allow-Origin":"*"
    //             }
    //         })

    //         const blob = new Blob([resp.data], {type: "application/zip"})
    //         const imagesArray = await extractImages(blob)

    //         setImages(imagesArray)

    //         URL.revokeObjectURL(blob)
    //         const cleanup = await axiosInstance.post("/rooms/images/cleanup",{
    //             method:"POST"
    //         })
    //         console.log("FINISHED");
    //         loadedFunc(true)
    //     } catch (error) {
    //         console.log("line60",error);
    //     }
    // }

    async function getFromCloudinary(){
    //     // directory -> room_type/user_id/room_name/<files>.png

    //     // const url = "https://api.cloudinary.com/v1_1/de2nposrf/resources/image/upload"
    //     const params = {
    //         prefix: `${"Bedroom"}/${7}/${"bedroom5"}`,
    //         type: "upload",
    //         max_results: 100
    //     }
    //     try {
    //         const response = await axiosInstance.get("/rooms/get_cloudinary_images", {
    //             params: params
    //         });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.error("Error fetching", error);
    //     }

        

    }

  useEffect(() => {

    getFromCloudinary()
    // GetImageZip()

  }, []);

  return (
    <div className='imageGenWoohoo'>
        {images.map((image,index) => (
            <img 
                key={index} 
                src={URL.createObjectURL(image.blobData)} 
                alt={image.fileName}
                className={className}
                ref={refs.current[index]}
                style={{"display":"none"}}
            />
        ))}
    </div>
  );
};

export default BlobToImage;
