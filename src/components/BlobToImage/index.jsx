import React, { useEffect, useState } from 'react';
import JSZip from "jszip"
import "./style.css"
import axiosInstance from '../../helpers'

const BlobToImage = ({ image_id, refs, className = "", loadedFunc }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  console.log("DOING BLOB TO IMAGE")
  async function extractImages(zipData) {
    const zip = new JSZip();
    console.log("ZIPDATA", zipData)
    try {
      const unzipped = await zip.loadAsync(zipData);
      console.log("UNZIPPED", unzipped)
      const fileNames = Object.keys(unzipped.files);
      console.log("FILE NAMES: ", fileNames)
      const imagesArray = await Promise.all(
        fileNames.map(async (fileName) => {
          const file = unzipped.files[fileName];
          const blobData = await file.async("blob");
          return { fileName, blobData };
        })
      );

      console.log("IMAGESSSS ARRAY", imagesArray)
      return imagesArray;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  useEffect(() => {
    async function GetImageZip() {
      try {
        console.log("IA AM IMAGE ID", image_id);
        const resp = await axiosInstance.get(`/rooms/images/${image_id}`, {
          responseType: "blob",
          method: "GET",
        });

        console.log("RESSPSONSEEEE DATA", resp.data)
        console.log("HEADDERRR TYPE", resp.headers);
        if (resp.status === 200) {
          console.log("Response received successfully");
          const blob = new Blob([resp.data], { type: "application/zip" });
          console.log("BLAAaaAb", blob)
          const imagesArray = await extractImages(blob);

          console.log("IMAGESSSS ARRAY", imagesArray)
          if (imagesArray.length > 0) {
            setImages(imagesArray);
          } else {
            console.log("No images found in the zip file.");
          }

          URL.revokeObjectURL(blob);
          const cleanup = await axiosInstance.post("/rooms/images/cleanup", {
            method: "POST",
          });
          console.log(cleanup)
          console.log("FINISHED");
          loadedFunc(true);
        } else {
          setError("Request failed with status: " + resp.status);
        }
      } catch (error) {
        console.log("Error:", error);
        setError("An error occurred while fetching the image.");
      }
    }

    GetImageZip();
  }, []);

  console.log("IAMGESSSSSS EHRERERER: ", images)
  return (
    <div className='imageGenWoohoo'>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        images.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image.blobData)}
            alt={image.fileName}
            className={className}
            ref={refs.current[index]}
          />
        ))
      )}
    </div>
  );
};

export default BlobToImage;
