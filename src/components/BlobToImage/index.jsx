import React, { useEffect, useState } from 'react';
import JSZip from "jszip"
import "./style.css"
import axiosInstance from '../../helpers'

const BlobToImage = ({ image_id, refs, className="", loadedFunc }) => {
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
            const resp = await axiosInstance.get(`/rooms/images/${image_id}`,{
                responseType:"blob"
            })

            const blob = new Blob([resp.data], {type: "application/zip"})
            const imagesArray = await extractImages(blob)

            setImages(imagesArray)

            URL.revokeObjectURL(blob)
            const cleanup = await axiosInstance.post("/rooms/images/cleanup",{
                method:"POST"
            })
            console.log("FINISHED");
            loadedFunc(true)
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
                ref={refs.current[index]}
                style={{"display":"none"}}
            />
        ))}
    </div>
  );
};

export default BlobToImage;
