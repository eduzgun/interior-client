import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JSZip from "jszip"
import "./style.css"

const BlobToImage = ({ image_id, className=""}) => {
  const [images, setImages] = useState([]);

    async function extractImages(zipData){
        const zip = new JSZip()
        try {
            const unzipped = await zip.loadAsync(zipData)
            const fileNames = Object.keys(unzipped.files)

            const imagesArray = await Promise.all(
                fileNames.map(async (fileName) => {
                    const file = unzipped.files[fileName]
                    const blobData = await file.async("blob")
                    return {fileName,blobData}
                })
            )

            return imagesArray
        } catch (error) {
            console.log(error);
            return []
        }
    }

  useEffect(() => {
    async function GetImageZip(){

        try {
            const resp = await axios.get(`http://localhost:5000/rooms/images/${image_id}`,{
                responseType:"blob"
            })

            const blob = new Blob([resp.data], {type: "application/zip"})
            const imagesArray = await extractImages(blob)

            setImages(imagesArray)

            URL.revokeObjectURL(blob)
            const cleanup = await axios.post("http://localhost:5000/rooms/images/cleanup",{
                method:"POST"
            })

        } catch (error) {
            console.log(error);
        }
    }

    GetImageZip()

  }, []);

  return (
    <div className='imageGenWoohoo'>
        {images.map((image,index) => (
            <img 
                key={index} 
                src={URL.createObjectURL(image.blobData)} 
                alt={image.fileName}
                className={className}
            />
        ))}
    </div>
  );
};

export default BlobToImage;
