import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
    if(localStorage.getItem('formData') != null){
        //go on y m3lm el3b gowa
        console.log("props.children===" ,children);
        return children;
    }else{

        // login y 7beb 2lby
        return  <Navigate to="/login"  />
    }
    
    
}
