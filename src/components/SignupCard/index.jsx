import React,{ useState } from 'react'
import "./style.css"

const SignupCard = ({ cardHeight, toggleSwitch, focusStyle, setToggleSwitch }) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confPassword,setConfPassword] = useState("")

    const activeStyle = {
        "border": "1px solid var(--outline)",
        "color": "var(--outline)"
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

    function sendRegisterRequest(e){
        e.preventDefault()

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
            setToggleSwitch(!setToggleSwitch)
        }
    }

  return (
    <div id='signup' className="card" style={Object.assign({"height":cardHeight},toggleSwitch ? focusStyle : {"color":"var(--outline)"})}>
        <header>
            <h2>Register</h2>
        </header>
        <form onSubmit={sendRegisterRequest}>

            <label htmlFor="username">username</label>
            <input type="text" name="username" id="reg-user-input" value={username} placeholder='>' onChange={handleUserInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="email">email</label>
            <input type="text" name="email" id="email-input" value={email} placeholder='>' onChange={handleEmailInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="password">password</label>
            <input type="password" name="password" id="reg-password-input" value={password} placeholder='>' onChange={handlePassInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="confpassword">confirm password</label>
            <input type="password" name="confpassword" id="conf-password-input" value={confPassword} placeholder='>' onChange={handleConfirmPassInput} autoComplete='off' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}} required/>

            <button type="submit" id='register-btn' disabled={!toggleSwitch}  style={!toggleSwitch ? activeStyle : {}}>Join</button>
        </form>
    </div>
  )
}

export default SignupCard