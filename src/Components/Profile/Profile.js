import React, { useEffect } from 'react';
import {observer} from 'mobx-react'
import {ProfilesStoreInstance} from '../store/profileDataStore'

const Profile = observer(({data}) => {

    let totalChange = 0;
    
    const profileList =data.companyList.map((company)=>{
        
        const pickedPrice = company.pickedPrice;
        const curPrice = ProfilesStoreInstance.niftyList.filter((ins)=>ins.name == company.name)[0].curPrice;
        
        let change = ((pickedPrice-curPrice)/pickedPrice)*100;

        change = (Math.floor(change * 100) / 100);

        if (company.type == "sell"){
            change*=-1;
        }

        const arrow = ()=>{
            if (change>0)
                return(
                    <i className="material-icons" style={{color:"red"}}> arrow_drop_down </i>
                )
            else{
                return(
                    <i className="material-icons" style={{color:"green"}}> arrow_drop_up </i>
                )
            }
        }

        
        totalChange+=change;
        return(
            <div key ={company.name} style={{margin:"0",padding:"0"}} className="row ">
                <p className="col s10" style={styles.companyName}>{company.name}</p>
                <p className="col s2"style={styles.companyName}>{arrow()}</p>
        
            </div>
        );
        
    });
    totalChange = (Math.floor(totalChange * 100) / 100);
    let profileList1 =undefined;
    let profileList2 =undefined;
    if (profileList.length <5){
        profileList1 = profileList;
    }
    else{
        profileList1 = profileList.slice(0,5);
        profileList2 = profileList.slice(5,profileList.length);
    }

    
    const arrow = ()=>{
        if (totalChange<0)
            return(
                <i className="material-icons" style={{color:"red"}}> arrow_drop_down </i>
            )
        else{
            return(
                <i className="material-icons" style={{color:"green"}}> arrow_drop_up </i>
            )
        }
    }
    
    return ( 
        <ul style={{...styles.box,...styles.colorBackground}}>
            <div className = "row container">
                <p className=" col s6 center-align" style={styles.profileHeading}>{data.name}</p>
                <h1 className=" col s6 right-align" style={styles.totalChangeStyle}>{totalChange}% {arrow()}</h1>
            </div>
            <div style={styles.profileListContainer} className="row">
                <div className="col s6">
                    {profileList1}
                </div>
                <div className="col s6">
                    {profileList2}
                </div>
            </div>
            
        </ul>
    );
})

const styles ={
    box:{
        
        borderRadius:"10px",
        margin:"10px",
        padding:"10px",
        backgroundColor:"White",
    },
    profileListContainer:{
        borderRadius:"10px",
        margin:"10px",
        padding:"10px",
        backgroundColor:"White",
        
    },
    profileHeading:{
        fontSize:"1.3rem",
        margin:"0px",
        padding:"0px",
    },
    totalChangeStyle:{
        fontSize:"1.3rem",
        margin:"0px",
        padding:"0px",
    },
    companyName:{
        fontSize:"0.9rem",
        marginTop:"5px",
        padding:"0px",
    },
    colorBackground:{
        backgroundColor:"#B6CFF4",
    },
    companyNameContainer:{
        margin:"0",
        padding:"0",
        backgroundColor:"black"
    }


}
 
export default Profile;