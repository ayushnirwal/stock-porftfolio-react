import React, { Component } from 'react';
import {observer} from "mobx-react";
import ProfileMain from "../Profile/ProfileMain";



const Main = observer(() => {
    
    return ( 
        <div className="container">
            <ProfileMain/>   
        </div>
    );
})


export default Main;