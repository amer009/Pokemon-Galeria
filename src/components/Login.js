import React from 'react';
import '../login.css'; // Asegúrate de que no haya conflictos con el CSS si se está usando
import backgroundImage from '../images/imgg.avif';

function Login() {
    const validateForm = (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "admin" && password === "1234") {
            window.location.href = "/welcome";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div
            className="login-body"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',  // Asegura que la imagen cubra el contenedor
                backgroundPosition: 'center', // Centra la imagen
                backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
                height: '100vh', // Asegura que el contenedor ocupe toda la altura de la ventana
                margin: 0,
                padding: 0
            }}
        >
            <div className="login-container">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={validateForm}>
                    <label htmlFor="username">Usuario:</label>
                    <input type="text" id="username" name="username" required />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
