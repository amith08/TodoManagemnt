import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from './Security/AuthContext'

function LoginComponent() {
    const [username, setUsername] = useState('Amith')
    const [password, setPassword] = useState('asd')
    const [showErrorMessage, setshowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handlePasswrodChange(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {
        if (await authContext.login(username, password)) {


            navigate(`/welcome/${username}`);
        } else {

            setshowErrorMessage(true)

        }
    }



    return (
        <div className="Login">
            <h1>Login for Project management Application</h1>

            {showErrorMessage && <div className='errorMessage'>Auth not-success</div>}

            <div className="LoginForm">
                <div>
                    <label>User Name</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Passwrod</label>
                    <input type="password" name="password" value={password} onChange={handlePasswrodChange} />
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>


        </div>
    )
}
export default LoginComponent