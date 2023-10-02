import React,{ useState } from 'react'
import "./style.css"
import { useAuth } from "../../contexts"
import { useNavigate } from 'react-router-dom'

const LoginCard = ({ cardHeight,toggleSwitch,focusStyle }) => {

    const [username, setUsername] = useState("")
    const [password,setPassword] = useState("")
    const { setUser } = useAuth()

    const navigate = useNavigate()

    const activeStyle = {
      "border": "1px solid var(--outline)",
      "color": "var(--outline)"
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
    
    function handlePassInput(e){
        setPassword(e.target.value)
    }
    
    const sendLoginRequest = async (e) => {
        e.preventDefault()
        
        const form = new FormData(e.target)
        const options = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }

        try{
            const resp = await fetch("http://localhost:5000/auth/login",options)

            if(resp.status == 204){
                // setUser(username)

                const options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }

                try {
                    const resp2 = await fetch(`http://localhost:5000/users/${username}`,options)

                    const data = await resp2.json()
                    setUser(data.data.id)
                    setUsername("")
                    setPassword("")
                    navigate("/")
                    
                } catch (err) {
                    console.log(err)
                }

            }else{
                alert("You messed up.")
            }
        }catch(err){
            console.log("Error logging in. ",err)
        }

    }

  return (
    <div id="login"  className="card" style={Object.assign({"height":cardHeight},!toggleSwitch ? focusStyle : {"color":"var(--outline)"})} >
        <div className="lamp">
            <img src="./src/assets/images/lamp.png" alt="lamp" id='left-lamp' style={!toggleSwitch ? lampShade : {}}/>
            <div id="llight" style={!toggleSwitch ? showLight : {}}></div>
        </div>
        <header>
            <h2>Log In</h2>
            <p>*placeholder text*</p>
        </header>
        <form data-testid={"login-form"} onSubmit={sendLoginRequest}>
            <label htmlFor="username">username</label>
            <input  data-testid={"user-input"} type="text" name="username" id="user-input" value={username} placeholder='>' onChange={handleUserInput} autoComplete='false' disabled={toggleSwitch} style={toggleSwitch ? activeStyle : {}} required/>

            <label htmlFor="password">password</label>
            <input data-testid={"password-input"} type="password" name="password" id="password-input" value={password} placeholder='>' onChange={handlePassInput} autoComplete='false' disabled={toggleSwitch} style={toggleSwitch ? activeStyle : {}} required/>

            <button type='submit' id='signin-btn' disabled={toggleSwitch} style={toggleSwitch ? activeStyle : {}}>Sign In</button>
        </form>
    </div>
  )
}

export default LoginCard
