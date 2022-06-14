import "./login.scss"
import { useContext, useState } from "react";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate()
  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e) =>{
    e.preventDefault();

    signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      dispatch({type:"LOGIN", payload:user})
      navitage("/")
    })
    .catch((error) => {
      setError(true);
    });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input  type="email" placeholder="email"onChange={(e) => setEmail(e.target.value)} />
        <input  type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error &&<span>Error en el correo o contraseña!</span>}
        <div className="card-footer">
          ¿Olvidó su contraseña? <Link to="/relogin" style={{ textDecoration: "none" }}>recuperar</Link>
        </div>

      </form>

    </div>
  )
}


export default Login