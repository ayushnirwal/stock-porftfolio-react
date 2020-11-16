import React, { useState } from 'react';
import  {observer} from 'mobx-react';
import {ProfilesStoreInstance} from '../store/profileDataStore'
import "../../css/animations.css"

const ProfileDetails = observer(({profileId,dismiss}) => {

    const [animateIn,setAnimateIn] = useState("in")

    const boxin = {
        ...styles.box,
        animationName:"slidefromabove",
        animationDuration:"200ms",
    }
    const boxout = {
        ...styles.box,
        animationName:"slidebackabove",
        animationDuration:"200ms",
    }
    const out =()=>{
        setAnimateIn("out");
        setTimeout(()=>{dismiss();setAnimateIn("in");},200);
    }
    const delProfile =(name) =>{
        out();
        setTimeout(()=>{ProfilesStoreInstance.delProfile(name);},200);
        
    }
    
    if (profileId == "none"){
        return(
            <div>
                {/* intentionally blank */}
            </div>
        )
    }
    else{
        let profileDataList=undefined
        const profileData = ProfilesStoreInstance.profileList.filter((profile)=>profile.name == profileId)[0];
        if (profileData==undefined){
            return(
                <div>
                    {/* intentionally blank */}
                </div>
            )
        }
        else{
            let totalChange = 0;
            profileDataList = profileData.companyList.map((data)=>{
                const pickedPrice = data.pickedPrice;
                const curPrice = ProfilesStoreInstance.niftyList.filter((ins)=>ins.name == data.name)[0].curPrice;
                
                let change = ((pickedPrice-curPrice)/pickedPrice)*100;

                change = (Math.floor(change * 100) / 100);

                if (data.type == "sell"){
                    change*=-1;
                }
                
                totalChange += change;
                const buySellBackground = {
                    color:(data.type == "buy")?"green":"red",
                    borderRadius:"10px",
                   
                    padding:"2px"
                };
                const type = (data.type == "buy")?"Bought":"Sold";

                const arrow = ()=>{
                    if (change<0)
                        return(
                            <i className="material-icons" style={{color:"red"}}> arrow_drop_down </i>
                        )
                    else{
                        return(
                            <i className="material-icons" style={{color:"green"}}> arrow_drop_up </i>
                        )
                    }
                }
                
                return(
                    <div key={data.name} style={styles.tableContentContainer} className = "row">
                        <p className="col s2 center-align" style={{...styles.tableContent,textAlign:"left"}}> {data.name} </p>
                        <p className="col s2 center-align" style={{...buySellBackground,...styles.tableContent}}> {type} </p>
                        <p className="col s2 center-align" style={styles.tableContent}> {data.pickedPrice} </p>
                        <p className="col s2 center-align" style={styles.tableContent}> {curPrice} </p>
                        <div className="col s2 center-align" style={styles.tableContent}> 
                            <span >{change}</span> 
                            {arrow()}
                        
                        </div>
                        <i className="material-icons" style={{color:"#888",cursor:"pointer"}} onClick = {()=>{ProfilesStoreInstance.delFromProfile(profileData.name,data.name)}}> close </i>
                        
                    </div>
                )
            })
            totalChange = (Math.floor(totalChange * 100) / 100);

            return(
                <div style={(animateIn == "in")?boxin:boxout} >
                    
                    <h1 style={styles.head} className="center-align">{profileData.name}</h1>
    
                    <div style={styles.dataContainer}>
                    
                        
                        <div className="container" style ={{ backgroundColor:"white",borderRadius:"20px"}}>
                            <div style={styles.tableContentContainer} className = "row">
                                <p className="col s2 " style={styles.tableHead}> Name </p>
                                <p className="col s2 " style={styles.tableHead}> Buy/Sell </p>
                                <p className="col s2 " style={styles.tableHead}> Picked price </p>
                                <p className="col s2 " style={styles.tableHead}> Current Price </p>
                                <p className="col s2 " style={styles.tableHead}> %charge </p>
                            </div>
    
                            {profileDataList}
    
                            
    
                        </div>
    
                    </div>
    
                    <h3 className="center-align">Net Change : <span style={{ color:(profileData.totalChange > 0 )?"green":"red" }}> {totalChange} </span></h3>
    
                    <div style={{width:"100%"}} className="row">
                            <p onClick={()=>{out()}} style={styles.button} className=" col s5 center-align"> Dismiss </p>
                            <p onClick={()=>{delProfile(profileData.name)}} style={styles.button} className="col s5 center-align"> Remove </p>
                    </div>
                    
    
                </div>
            )
        }
        
    }
})
const styles={
    box:{
        position:"fixed",
        zIndex:2,
        top:"0",
        left:"0",
        width:"100%",
        height:"100vh",
        overflow:"scroll",
        backgroundColor: "#B6CFF4",
    },
    
    dataContainer:{
        height:"60vh",
        overflow:"scroll",
    },
    head:{
        fontSize:"1.5rem",
        fontWeight:"bolder",
    },
    button:{
        marginLeft:"5%",
        borderRadius:"20px",
        padding:"10px 0",
        fontSize:"1.7rem",
        fontWeight:"bolder",
        color:"white",
        backgroundColor:"#4D85F1",
        boxShadow:"2px 2px 20px #888",
        cursor:"pointer",

    },
    tableHead:{
        fontSize:"0.9rem",
        fontWeight:"bold",
        textAlign:"center",
        marginLeft:"4px",
    },
    tableContent:{
        fontSize:"0.8rem",
        textAlign:"center",
        marginLeft:"4px",
        height:"10vh"
    },
    tableContentContainer:{
        borderBottom:"1px solid #888",
        margin:"0 10px",
        padding:"10px 0",
    },
    pointer:{
        cursor:"pointer"
    }
}
 
export default ProfileDetails;