import React,{ Component } from 'react';
import '../css/login.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseURL ='http://localhost:3001/usuarios';
const cookies  = new Cookies();

class Login extends Component{

    state={
        form:{
            username: '',
            password: ''
        }
    }

    handleChange= async e=>{   //Metodo para guardar el valor del input en el state (ESTADO)
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form);
    }

    //Metodo para hacer la petición HTTP
    IniciaeSesion=async() =>{
        await axios.get(baseURL, {params: 
            {username: this.state.form.username,
            password: md5(this.state.form.password)}})
            .then(response=>{
                console.log(response.data);
                return response.data;
              
            })
            .then(response => {
                if(response.length>0){
                    //Guardar las cookis/ variables de sesion
                    var respuesta = response[0];
                    cookies.set('id',respuesta.id, {path:"/"})
                    cookies.set('apellido_paterno',respuesta.apellido_paterno, {path:"/"})
                    cookies.set('apellido_materno',respuesta.apellido_materno, {path:"/"})
                    cookies.set('nombre',respuesta.nombre, {path:"/"})
                    cookies.set('username',respuesta.username, {path:"/"})

                    alert(`Bienvenido ${respuesta.username}`);
                    window.location.href="./home";
                }else{
                    alert('El usuario o contraseña son incorrectos');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    //Comprobar si EXISTE el user name. Si ya esta logedo
    componentDidMount(){
        if(cookies.get('username')){
            window.location.href="./home";
        }
    }

    render(){
        return(
            <form>
                <div >
                    <h1>Sistema de Login con React</h1>
                    <p>Usuario <input 
                        type='text' 
                        placeholder='Ingrese Username' 
                        name='username' 
                        onChange={this.handleChange} 
                        required /></p>
                    <p>Contraseña <input 
                        type='password' 
                        placeholder='Password' 
                        name='password' 
                        onChange={this.handleChange} 
                        required /></p>
                    
     
                    <input type='button' value='Ingresar' onClick={() => this.IniciaeSesion()}/>
                </div>
            </form>
        );
    }

}


export default Login;