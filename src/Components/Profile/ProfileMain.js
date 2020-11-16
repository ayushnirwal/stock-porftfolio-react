import React, { useState,useEffect } from 'react';
import Profile from './Profile'
import {observer} from 'mobx-react'
import {ProfilesStoreInstance} from '../store/profileDataStore'
import ProfileDetails from './ProfileDetails'
import AddProfile from "./AddProfile"




const ProfileMain = observer(() => {

    const [profileDetailId,setprofileDetailId ] = useState("none");
    const [showAddProfile,setShowAddProfile] = useState(false);
    const [showNoStuff,setShowNoStuff] = useState(false);
    
    const profileList = ProfilesStoreInstance.profileList.map((profileData)=>{
        
        if(profileData!=undefined)
        return(
            <div key = {profileData.name} onClick={()=>{setprofileDetailId(profileData.name)}}>
                <Profile  data = {profileData} />
            </div>
            
        )
    })
    useEffect(() => {
        
        if(profileList.length == 0){
            setShowNoStuff(true);
            
        }
        else{
            setShowNoStuff(false);
        }
    }, [profileList]);
   
    

    


    const dismiss = ()=>{
        
        setprofileDetailId("none");
    }

    const dismissAdd = ()=>{
        
        setShowAddProfile(false);
    }

    

    return ( 
        <div>
            {profileList}
            <div style={(showNoStuff)?styles.show:styles.hide} className="valign-wrapper">
                <h1 style={styles.noProfile}> No PortFolio Found click + to create </h1>
            </div>
            <ProfileDetails profileId = {profileDetailId} dismiss ={dismiss}/>
            <i style={styles.floatingButton}  onClick={()=>setShowAddProfile(true)} className="material-icons">add</i>
            <AddProfile show={showAddProfile} dismiss = {dismissAdd}/>
        </div>
    );
})

const styles={
    floatingButton:{
        fontSize:"3rem",
        color:"white",
        borderRadius:"50%",
        position:"fixed",
        zIndex:"1",
        backgroundColor:"#4D85F1",
        boxShadow:"2px 2px 20px black",
        bottom:"30px",
        right:"30px",
        cursor:"pointer",
    },
    hide:{
        opacity:0,
        pointerEvents:"none",
        
        width:"100%",
    },
    show:{
        opacity:1,
        pointerEvents:"all",
        
        width:"100%"
    },
    noProfile:{
        fontSize:"2rem",
        fontWeight:"bold",
        width:"100%",
        color:"#4D85F1",
        textAlign:"center",
    }
}
 
export default ProfileMain;