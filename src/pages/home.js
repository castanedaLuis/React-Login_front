import React,{ Component } from 'react';
import Cookies from 'universal-cookie';


const cookies  = new Cookies();


class home extends Component{

    logout=() =>{
        cookies.remove('id', {path: "/"});
        cookies.remove('apellido_paterno', {path: "/"});
        cookies.remove('apellido_materno', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href="./";
    }

        //Comprobar si EXISTE el user name. Si ya esta logedo
        componentDidMount(){
            if(!cookies.get('username')){
                window.location.href="./";
            }
        }

    render(){
        console.log(cookies.get('id'));
        console.log("apellido_paterno: "+cookies.get('apellido_paterno'));
        console.log("nombre: "+cookies.get('nombre'));
        console.log("username: "+cookies.get('username'));

        return (
            <div>

                Home Bienvenido 

                <br />
                <button onClick={()=> this.logout()}>Logout</button>

            </div>
        );
    }
}


export default home;