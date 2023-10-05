import React,{ useRef, useState } from 'react'
import "./style.css"
import { QuestionHelp } from "../../components" 

const SignupCard = ({ cardHeight, toggleSwitch, focusStyle, setToggleSwitch }) => {
    const baseUrl='https://lap-4-project.onrender.com/'
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confPassword,setConfPassword] = useState("")

    const passwordRef = useRef()
    const confPasswordRef = useRef()

    const activeStyle = {
        "border": "1px solid var(--outline)",
        "color": "var(--outline)",
        "backgroundColor":"var(--outline)"
    }

    const showLight = {
        "display":"block"
    }

    const lampShade = {
        "filter": "brightness(1)"
    }

    function handleUserInput(e) {
        setUsername(e.target.value)
    }

    function handleEmailInput(e){
        setEmail(e.target.value)
    }
    
    function handlePassInput(e){
        setPassword(e.target.value)
    }

    function handleConfirmPassInput(e){
        setConfPassword(e.target.value)
    }

    function verifyPassword(){
        let equal = false
        let numbers = false
        let specialCharacter = false
        let capital = false

        if(password == confPassword){
            equal = true
        }
        if(/\d/.test(password) == true){
            numbers = true
        }
        if(/[!-\/:-@[-`{-~]/.test(password) == true){
            specialCharacter = true
        }
        if(/[A-Z]/.test(password) == true){
            capital = true
        }
        if(equal && numbers && specialCharacter && capital){
            console.log("valid")
            // do post request here
            
            setUsername("")
            setEmail("")
            setPassword("")
            setConfPassword("")

            return true
        }
    }

    const sendRegisterRequest = async (e) => {
        e.preventDefault()
        const confirm = verifyPassword()
        if(confirm){
            const form = new FormData(e.target)
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }

            const resp = await fetch(`${baseUrl}/auth/register`,options)

            if(resp.status === 201){
                setToggleSwitch(!toggleSwitch)
            }else{
                alert("Failed to register")
            }
        }
    }

  return (
    <div id='signup' className="card" style={Object.assign({"height":cardHeight},toggleSwitch ? focusStyle : {"color":"var(--outlinefocus)"})}>
        <div className="lamp">
            <img src="./src/assets/images/lamp.png" alt="lamp" id='right-lamp' style={toggleSwitch ? lampShade : {}}/>
            <div id="rlight" style={toggleSwitch ? showLight : {}}></div>
        </div>

        <QuestionHelp active={toggleSwitch} title={"Signing Up"} content={<>Not sure how to register? In each box enter the required content.<br /><br />Make sure your passwords contain at least one:<br/><ul>
            <li>Uppercase Letter</li>
            <li>Digit</li>
            <li>Special Character .,*&^!"</li>
            </ul></>}
            orientation={"left"}/>
        <header>
            <h2>Register</h2>
        </header>
        <form onSubmit={sendRegisterRequest} data-testid="signup-form">
            <label htmlFor="username">Username</label>
            <input data-testid={"user-input"} type="text" className={"signup-input"} name="username" id="reg-user-input" value={username} placeholder='>' onChange={handleUserInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="email">Email</label>
            <input data-testid={"email-input"} type="text" className={"signup-input"} name="email" id="email-input" value={email} placeholder='>' onChange={handleEmailInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="password">Password</label>
            <input data-testid={"password-input"} ref={passwordRef} className={"signup-input"} type="password" name="password" id="reg-password-input" value={password} placeholder='>' onChange={handlePassInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="confpassword">Confirm Password</label>
            <input data-testid={"confpassword-input"} ref={confPasswordRef} className={"signup-input"} type="password" name="confpassword" id="conf-password-input" value={confPassword} placeholder='>' onChange={handleConfirmPassInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <button type="submit" id='register-btn' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}}>Join</button>
        </form>
    </div>
  )
}

export default SignupCard
