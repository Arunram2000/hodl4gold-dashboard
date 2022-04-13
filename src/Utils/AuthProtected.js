import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Navigate, Route} from "react-router-dom"

const AuthProtected = (props) =>{
    const {active} = useWeb3React()

    if(!active){
       
    }

    return<>{props.children}</>
}

export default AuthProtected;