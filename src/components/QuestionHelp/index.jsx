import React,{ useState, useRef } from 'react'
import "./style.css"

const QuestionHelp = ({active, title, content, drop_down="", orientation="right"}) => {

    const [dropdown,setDropdown] = useState(true)

    const questionRef = useRef()

    function toggleDrop(){
        setDropdown(!dropdown)
        if(dropdown){
            questionRef.current.style.display = "block"
        }else{
            questionRef.current.style.display = "none"
        }
    }
    
    const [position, setPosition] = useState()

  return (
    <div id="questions">
        <p id='qmark' onClick={toggleDrop}>?</p>
            <div ref={questionRef} id="qbox" style={Object.assign(orientation === "right" ? {"left":"150%"} : {"right":"150%"},
    !active ? {"display":"none"} : {})
    }>
                 <h3>{title}</h3>
                {content}{
                    drop_down !== "" ?
                <details>{drop_down}
                    <img id="example-panoramic" src="./src/components/QuestionHelp/Living-Room-Panorama.jpg" alt="" />
                </details>
                : ""
                }
            </div>
    </div>
    
  )
}

export default QuestionHelp