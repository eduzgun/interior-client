import React,{ useEffect } from 'react'
import "./style.css"
import axios from 'axios'
import axiosInstance from '../../helpers'

const DeleteOverlay = ({ hoverImg, toggle, setToggle, setRefresh }) => {

    const deleteFolder = async (folderPath) => {
        try {
            const resp = await axiosInstance.post("/rooms/delete-folder", {folderPath}, {
                headers: {
                    "Content-Type":"application/json"
                }
            })
            return resp.data
        } catch (error) {
            console.log("line17 deleteoverlay",error.message);
        }
    }

    const handleDeleteFolder = async () => {
        const folderPath = `${hoverImg.category}/${hoverImg.user_id}/${hoverImg.name}/`
        console.log("line23",folderPath);
        try {
            const result = await deleteFolder(folderPath).then(resp => {
                deleteRoomFromAPI(hoverImg)
                setToggle(!toggle)
                setRefresh(prev => prev + 1)
            })
            console.log("Deleted Successfully", result);
        } catch (error) {
            console.log("line26 deleteoverlay",error.message);
        }
    }

    const deleteRoomFromAPI = async (room) => {
        console.log(room);
        try {
            const resp = await axiosInstance.delete(`/rooms/${room.id}`)
            console.log(resp);
        } catch (error) {
            console.log("line38 deleteoverlay",error.message);
        }
    }

  return (
    <div id='delete-overlay'>
        <div id="delete-wrapper">
            <h2>Delete</h2>
            <h3>Are You Sure?</h3>
            <div id="buttons">
                <button id='confirm' onClick={handleDeleteFolder}>Yes</button>
                <button id='cancel' onClick={() => setToggle(!toggle)}>Cancel</button>
            </div>
        </div>

    </div>
  )
}

export default DeleteOverlay