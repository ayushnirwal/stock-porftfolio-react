import { makeObservable, observable, computed, action } from "mobx"


class ProfileDataStore {
    value
    profileList
    niftyList
    constructor() {
        this.profileList = [
            {
                name:"Example Profile",
                date:"01-01-1999",
                companyList:[
                    {
                        name:"HDFC Bank Ltd",
                        type:"Buy",
                        pickedPrice:1000
                    },
                    {
                        name:"Reliance Industries Ltd.",
                        type:"Buy",
                        pickedPrice:1000
                    },
                    {
                        name:"Infosys Limited",
                        type:"Buy",
                        pickedPrice:1000
                    },
                    
                ]
            },
            {
                name:"Example Profile 2",
                date:"01-01-1999",
                companyList:[
                    {
                        name:"Housing Development Fin. Corp. Ltd.£",
                        type:"Buy",
                        pickedPrice:1000
                    },
                    {
                        name:"Tata Consultancy Services Ltd.",
                        type:"Buy",
                        pickedPrice:1000
                    },
                    {
                        name:"ICICI Bank Ltd.",
                        type:"Buy",
                        pickedPrice:1000
                    },
                    
                ]
            },
            
        ]; 
        this.niftyList=[
            {
                name:"HDFC Bank Ltd",
                type:"Banking",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Reliance Industries Ltd.",
                type:"Petroleum Products",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Infosys Limited",
                type:"Software",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Housing Development Fin. Corp. Ltd.£",
                type:"Finance",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Tata Consultancy Services Ltd.",
                type:"Software",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"ICICI Bank Ltd.",
                type:"Banking",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Kotak Mahindra Bank Limited",
                type:"Banks",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Hindustan Unilever Ltd.",
                type:"Consumer Non Durables",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"ITC Ltd.",
                type:"Consumer Non Durables",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Larsen and Toubro Ltd.",
                type:"Construction Project",
                curPrice:1000,
                percentIncrease:2
            },
            // ===== 10 ======
            {
                name:"Axis Bank Ltd.",
                type:"Banking",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Asian Paints Limited",
                type:"Consumer Non Durables",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Maruti Suzuki India Limited",
                type:"Auto",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"HCL Technologies Ltd.",
                type:"Software",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Bajaj Finance Ltd.",
                type:"Finance",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"State Bank of India",
                type:"Banks",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Nestle India Ltd.",
                type:"Consumer Non Durables",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Dr Reddys Laboratories Ltd.",
                type:"Pharmaceuticals",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Mahindra & Mahindra Ltd.",
                type:"Auto",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"UltraTech Cement Limited",
                type:"Cement",
                curPrice:1000,
                percentIncrease:2
            },
            // ===== 20 ======
            {
                name:"Wipro Ltd.",
                type:"Software",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Sun Pharmaceutical Industries Ltd.",
                type:"Pharmaceuticals",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Tech Mahindra Ltd.",
                type:"Software",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Titan Company Ltd.",
                type:"Consumer Durables",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"HDFC Life Insurance Company Limited",
                type:"Finance",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Power Grid Corporation of India Ltd.",
                type:"Power",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"NTPC Limited",
                type:"Power",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Britannia Industries Ltd.",
                type:"Consumer Non Durables",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Divis Laboratories Ltd.",
                type:"Pharmaceuticals",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Bajaj Auto Limited",
                type:"Auto",
                curPrice:1000,
                percentIncrease:2
            },
            // ===== 30 ======
            {
                name:"Hero MotoCorp Ltd.",
                type:"Auto",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Bajaj Finserv Ltd.",
                type:"Finance",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Indusind Bank Ltd.",
                type:"Banks",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Tata Steel Ltd.",
                type:"Ferrous Metals",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Grasim Industries Ltd.",
                type:"Cement",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"JSW Steel Ltd",
                type:"Ferrous Metals",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"SBI Life Insurance Company Ltd.",
                type:"Finance",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Eicher Motors Ltd.",
                type:"Auto",
                curPrice:1000,
                percentIncrease:2
            },
            // ===== 40 ======
            {
                name:"Shree Cement Ltd.",
                type:"Cement",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Bharat Petroleum Corporation Ltd.",
                type:"Petroleum Products",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Adani Ports & Special Economic Zone",
                type:"Transportation",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"UPL Ltd.",
                type:"Pesticides",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Coal India Ltd.",
                type:"Minerals/Mining",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Oil & Natural Gas Corporation Ltd.",
                type:"Oil",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Tata Motors Ltd.",
                type:"Auto",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Indian Oil Corporation Ltd.",
                type:"Petroleum Products",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"Hindalco Industries Ltd.",
                type:"Non - Ferrous Metals",
                curPrice:1000,
                percentIncrease:2
            },
            {
                name:"GAIL (India) Ltd.",
                type:"Gas",
                curPrice:1000,
                percentIncrease:2
            },
        ];
        this.value = 0;
        makeObservable(this, {
            profileList: observable,
            value:observable,
            niftyList: observable,


            
            addProfile: action,
            delProfile: action,
            updateNiftyPrice: action,
            update: action,

            niftyListbyName:computed,
            niftyListbyPrice:computed,
        })

        


        
    }
    delProfile(name){
        const newProfileList =  this.profileList.filter((ins)=>ins.name!=name);
        this.profileList = newProfileList;
        
    }
    addProfile (name,buy,sell){
        const buyCompanyList = buy.map((instance)=>{
            return(
                {
                    name:instance.name,
                    type:"buy",
                    pickedPrice:instance.curPrice,
                    currentPrice:instance.curPrice
                }
            )
        })
        const sellCompanyList = sell.map((instance)=>{
            return(
                {
                    name:instance.name,
                    type:"sell",
                    pickedPrice:instance.curPrice,
                    currentPrice:instance.curPrice
                }
            )
        })
        const companyList = buyCompanyList.concat(sellCompanyList);
        const now = new Date(Date.now());
        const newProfile = {
            name,
            date:now.toUTCString(),
            totalChange:0,
            companyList
        }
        this.profileList.push(newProfile);
    }
    updateNiftyPrice(){
        // here would be an async func fethching real time data if i find an API for it, data is randomly generated till then
        const newNifty = this.niftyList.map((inst)=>{
            let maxP = 1.0;
            let minP = -1.0;
            let randomP = (Math.random()*(maxP-minP+1)+minP);
            let newPrice = inst.curPrice + ((inst.curPrice*randomP)/100)
            return{
                ...inst,
                curPrice:(Math.floor(newPrice * 100) / 100), // rounding to 2 decimal places
                percentIncrease:(Math.floor(randomP * 100) / 100),
            }
        })
        
        this.niftyList = newNifty;
    }
    get niftyListbyName (){
        const copyNifty = this.niftyList;
        copyNifty.sort((a,b)=>(a.name>b.name)?1:-1);
        return copyNifty;
    }
    get niftyListbyPrice (){
        const copyNifty = this.niftyList;
        copyNifty.sort((a,b)=>(a.price>b.price)?1:-1);
        return copyNifty;
    }
    update(){
        this.value+=1;
        
    }


    
}



const ProfilesStoreInstance = new ProfileDataStore;

setInterval(()=>{
    
    ProfilesStoreInstance.updateNiftyPrice()
},500)


export {ProfilesStoreInstance,ProfileDataStore};