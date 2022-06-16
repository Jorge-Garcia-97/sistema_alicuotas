import "./relogin.scss"
import { useContext, useState, useRef} from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../../context/AuthContextRelogin"

import { Link } from "react-router-dom";



export default function ReLogin  ()  {
 
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    
    async function handleSubmit(e) {
      e.preventDefault();
      
      try {
        setMessage('')
        setError('')
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setMessage('Revise su bandeja de entrada y siga las instrucciones')
      } catch {
        setError('Fallo al restaurar tu password')
      }
  
      setLoading(false)
    }

  //return (
    //<div className="login">
      //<form >
       // <input  type="email" placeholder="nombre de usuario" />
        //<div className="text">
        //Ingrese una nueva contraseña
        //</div>
        //<input  type="password" placeholder="password" />
        //<div className="text">
        //Repita la nueva contraseña
        //</div>
        //<input  type="password" placeholder="password" />
        //<button type="submit">Actualizar</button>

      //</form>

    //</div>
  //)
  
  return (
    <div>
      <section className="login">
        <div className="loginContainer">
          <h1>Recuperar contraseña</h1>
          { error && <h1>{error}</h1> }
          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type='email'
              autoFocus
              required
              ref={emailRef}
            />
            <div className="btnContainer">
              <button type='submit' disabled={loading}>Restaurar password</button>
       
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}



