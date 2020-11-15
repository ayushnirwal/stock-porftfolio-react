import React, { useState ,useEffect} from 'react';
import  {observer} from 'mobx-react';
import {ProfilesStoreInstance} from '../store/profileDataStore'
import "../../css/animations.css"




const AddProfile = observer(({show,dismiss}) => {

    const [sortBy,setSortBy] = useState("price");
    const [showDrop,setShowDrop] = useState(false);
    const [showError,setShowError] = useState(false);
    const [errorMsg,setErrorMsg] = useState("")
    const [name,setName]=useState("")
    const [animateIn,setAnimateIn] = useState("in");
    const [buy,setBuy] = useState([]);
    const [sell,setSell] = useState([]);
    const [filteredNiftyList,setFilteredNiftyList] = useState([]);
    const [searchName,setSearchName] = useState("");

    useEffect(() => {
        setNiftyListFromSearch(searchName);
        setShowDrop(false);
    }, [searchName,show,sortBy,/*ProfilesStoreInstance.niftyList*/]);

    const setNiftyListFromSearch =(text) =>{
        
        
        if(sortBy === "name")
            setFilteredNiftyList(ProfilesStoreInstance.niftyListbyName.filter((ins)=>ins.name.includes(text)));
            
        else if(sortBy === "price")
            setFilteredNiftyList(ProfilesStoreInstance.niftyListbyPrice.filter((ins)=>ins.name.includes(text)));
        
        
    }
    const addBuy =(company) =>{
        if (buy.length+sell.length>=10){
            setShowError(true);
            setErrorMsg("you can only Add 10 companies in a portfolio")
         
        }
        else{
            const present = buy.find((inst)=>inst.name == company.name);
            if ( present == undefined){
                setBuy([...buy,company]);

                const newSell = sell.filter((inst)=>inst.name != company.name)

                setSell(newSell);
            }
        }
        
            

        
    }
    const addSell =(company) =>{
        if (buy.length+sell.length>=10){
            setShowError(true);
            setErrorMsg("you can only Add 10 companies in a portfolio")
         
        }
        else{
            const present = sell.find((inst)=>inst.name == company.name);
            if ( present == undefined){
                setSell([...sell,company]);

                const newBuy = buy.filter((inst)=>inst.name != company.name)

                setBuy(newBuy);
            }
        }
        
    }
    const removeBuy =(name) =>{
        
        const present = buy.find((inst)=>inst.name == name);
        if ( present != undefined){
            const newBuy = buy.filter((inst)=>inst.name != name)
            setBuy(newBuy);
        }
    }
    const removeSell =(name) =>{
        
        const present = sell.find((inst)=>inst.name == name);
        if ( present != undefined){
            const newSell = sell.filter((inst)=>inst.name != name)
            setSell(newSell);
        }
    }

    const boxin = {
        position:"fixed",
        top:"0",
        left:"0",
        width:"100%",
        height:"100vh",
        overflow:"scroll",
        backgroundColor: "white",
        animationName:"slidefromabove",
        animationDuration:"200ms",
    }
    const boxout = {
        position:"fixed",
        top:"0",
        left:"0",
        width:"100%",
        height:"100vh",
        overflow:"scroll",
        backgroundColor: "white",
        animationName:"slidebackabove",
        animationDuration:"200ms",
    }
    const out =()=>{
        setAnimateIn("out");
        setErrorMsg("");
        setName("");
        setBuy([]);
        setSell([]);
        setTimeout(()=>{dismiss();setAnimateIn("in");},200);
    }
    const addProfile=()=>{
        if(name == ""){
            setShowError(true);
            setErrorMsg("Please add a name for the Profile first")
            
        }
        else{
            const profileList = ProfilesStoreInstance.profileList;
            let flag = false;
            for(let i =0 ;i<profileList.length ; i++){
                if (profileList[i].name == name){
                    flag = true;
                    break;
                }
            }
            if (flag){
                setShowError(true);
                setErrorMsg("Name Already Exists choose another one");
            }
                
            else{
                
                ProfilesStoreInstance.addProfile(name,buy,sell);
                out();
            }
        }
        

    }
    
    if (show == false){
        return(
            <div>
                {/* empty intionally */}
            </div>
        )
    }
    else{
        const niftyList = filteredNiftyList.map((company)=>{
            if (company!=undefined)
            {
                let companyState = "none";
                if(buy.find( (inst)=>inst.name == company.name))
                    companyState="buy"
                if(sell.find( (inst)=>inst.name == company.name))
                    companyState="sell"
                return(
                    <div key = {company.name} style={{...styles.companyBubble,backgroundColor:(companyState != "none")?((companyState == "buy")?"#42f593":"#eb9d96"):"#B6CFF4"}} >
                        <div className="row" style={{margin:"0",padding:"0"}}>
                            <div className="col s2">
    
                            </div>
                            <div className="col s6">
                                <p className="row" style={styles.companyTitle}>{company.name}</p>
                                <p className="row" style={styles.companyType}>{company.type}</p>
                            </div>
                            <div className="col s4 row">
                                <p className="col s6" style={styles.companyPrice}>{company.curPrice}</p>
                                <p className="col s6" style={styles.companyPrice}>(+10%)</p>
                            </div>
                        </div>
    
                        <div className="row" style={styles.companyButtonsContainer}>
                            <p className="col s2"></p>
                            <p className="col s3"  style={styles.companyButton} onClick ={()=>{addBuy(company)}} > Buy </p>
                            <p className="col s3"  style={styles.companyButton} onClick ={()=>{addSell(company)}}> Sell </p>
                        </div>
                    </div>
                )
            }
           
        })
        const buyBubbleList = buy.map((buyInstance)=>{
            return(
                <span key = {buyInstance.name}  style={styles.bubble}>
                    <span>{buyInstance.name}</span>
                    <i onClick={()=>{removeBuy(buyInstance.name)}} style={{Top:"2px"}} className="material-icons tiny">close</i>
                </span>
            )
        })
        const sellBubbleList = sell.map((sellInstance)=>{
            return(
                <span key = {sellInstance.name}style={styles.bubble}>
                    <span>{sellInstance.name}</span>
                    <i onClick={()=>{removeSell(sellInstance.name)}} style={{Top:"2px"}} className="material-icons tiny">close</i>
                </span>
            )
        })
        
        return(
            <div >
                <div style={{...styles.errorBox ,...((showError)?styles.show:styles.hide)}} >
                    <i className="material-icons" style={styles.close} onClick={()=>{setShowError(false)}}>close</i>
                    
                    <p style={styles.errorMsg} className="container row">{errorMsg}</p>
                    
                </div>

                <div style={(animateIn == "in")?boxin:boxout} >
                    
                    <p style={styles.head} className="container center-align"> 
                        You can add any 10 stock from the list of Nifty 50 to create a portfolio
                    </p>

                    <div style={styles.nameFieldContainer} className="container row valign-wrapper">
                        <input className="container col l6 s11 center-align" style={styles.nameField} type="text" placeholder="Add Profile Name" onChange={(e)=>{setName(e.target.value)}}/> 
                    </div>

                    <div className="row" style={{margin:"0"}}>
                        <div className="col l5 s11" style={styles.bubbleListContainer}>
                            <span style={styles.smallHead} >
                                Buy
                            </span>
                            <span>
                                {buyBubbleList}
                            </span>
                        </div>
                        <div className=" col l5 s11" style={styles.bubbleListContainer}>
                            <span style={styles.smallHead} >
                                Sell
                            </span>
                            <span>
                                {sellBubbleList}
                            </span>
                        </div>
                    </div>

                    
                    <div className="s6 container" style={styles.selectorContainer}>
                        <div className="row valign-wrapper" style={styles.searchArea}>
                            <div style={styles.searchBox} className="row col s8 valign-wrapper">
                                <input className="col s8" style={styles.searchField} type="text" placeholder="Search" onChange={(e)=>{setSearchName(e.target.value)}}/> 
                                
                                <i className="material-icons col s2"> search </i>
                                
                                
                            </div>
                            <div className="col s3" >
                                <div style={styles.sort} onClick={()=>{setShowDrop(true)}}>
                                    <span>{sortBy}</span>
                                    <i className="material-icons right-align" > arrow_drop_down </i>
                                </div>
                                
                                <div style={{...styles.dropDown,...((showDrop)?styles.show:styles.hide)}} >
                                    <div onClick={()=>{setSortBy("name")}} style={{cursor:"pointer"}}>
                                        <p onClick={()=>{setSortBy("name")}} >sort by name</p>
                                    </div>
                                    <div onClick={()=>{setSortBy("price")}} style={{cursor:"pointer"}} >
                                        <p onClick={()=>{setSortBy("price")}}>sort by price</p>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        

                        <div style={styles.niftyListContainer}>
                            {niftyList}
                        </div>
                        
                        <div style={{width:"100%"}} className="row">
                            <p onClick={()=>{out()}} style={styles.button} className=" col s5 center-align"> Discard </p>
                            <p onClick={()=>{addProfile()}} style={styles.button} className="col s5 center-align"> add </p>
                        </div>
                    </div>
                    

                </div>
            </div>
        )
    }
})
const styles={
    
    head:{
        fontSize:"1rem",
        
        width:"80%",
        margin:"5px auto",
        backgroundColor:"#B6CFF4",
        padding:"10px",
        marginTop:"20px",
        borderRadius:"20px"
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

    },
    smallHead:{
        fontSize:"1rem",
        fontWeight:"bolder",
        margin:"0",
        padding:"0",
    },
    bubbleListContainer:{
        height:"10vh",
        overflow:"scroll",
        margin:"10px 4%",
        padding:"2px 10px",
        border:"1px solid #999",
        borderRadius:"20px"
    },
    bubble:{
        fontSize:"0.8rem",
        backgroundColor:"#B6CFF4",
        display:"inline-block",
        marginLeft:"4px",
        marginTop:"4px",
        padding:"4px 10px",
        borderRadius:"10px",
        cursor:"pointer",
    },
    searchArea:{
        marginTop:"20px",
        padding:"0 20px",
        margin:"0",
    },
    searchBox:{
        
        borderRadius:"20px",
        margin:"0",
        padding:"0",
    },
    searchField:{
        marginTop:"5px",
        padding:"0"
    },
    companyBubble:{
        backgroundColor:"#B6CFF4",
        margin:"20px 5%",
        padding:"4px 20px",
        borderRadius:"20px"
    },
    companyTitle:{
        fontSize:"1rem",
        fontWeight:"bold",
        margin:"0",
        padding:"0"
    },
    companyType:{
        fontSize:"1rem",
        margin:"0",
        padding:"0"
    },
    companyPrice:{
        margin:"0",
        padding:"0"
    },
    companyButtonsContainer:{
        marginTop:"10px"
    },
    companyButton:{
        margin:"0",
        marginLeft:"5px",
        padding:"5px 0px",
        textAlign:"center",
        backgroundColor:"#4D85F1",
        color:"white",
        borderRadius:"20px",
        boxShadow:"2px 2px 20px #999"
    },

    niftyListContainer:{
        height:"35vh",
        overflow:"scroll",
    },
    errorBox:{
        position:"fixed",
        width:"70%",
        boxShadow:"2px 2px 20px #888",
        zIndex:20,
        borderRadius:"20px",
        left:"15%",
        top:"20%",
        backgroundColor:"white",
        transistionDuration:"1s",
        
    },
    errorMsg:{
        color:"red",
        fontSize:"2rem",
        fontWeight:"bold",
        width:"100%",
        textAlign:"center",
        padding:"40px 0",

    },
    close:{
        textAlign:"right",
        marginTop:"20px",
        marginLeft:"20px",
    },
    show:{
        opacity:1,
        pointerEvents:"all"
    },
    hide:{
        opacity:0,
        pointerEvents:"none"
    },
    sort:{
        
        borderRadius:"20px",
        textAlign:"center",
        padding:"0 10px",
        transistionDuration:"200ms",
        cursor:"pointer"
    },
    selectorContainer:{
        marginTop:"20px",
        border:"1px solid #999",
        borderRadius:"20px",
    },
    dropDown:{
        position:"absolute",
        padding:"0 10px",
        marginLeft:"-20px",
        marginTop:"-50px",
        backgroundColor:"white",
        textAlign:"center",
        border:"1px solid #999",
        borderRadius:"20px",
        
    },
    nameFieldContainer:{
        height:"10vh",
        margin:"0 10px"
    },
    
}
 
export default AddProfile;