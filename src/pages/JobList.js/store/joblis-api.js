import { ApiHandler } from "../../../components/api/ApiHandler"
import { joblistActions } from "./joblist-slice"

 


export const getLocation = () =>{
    return (dispatch)=>{
        ApiHandler.get("/api/v1/locations")
        .then(res=>{
            dispatch(joblistActions.setLocationList(res.data));
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

export const getDepartment = () =>{
    return (dispatch)=>{
        ApiHandler.get("/api/v1/departments")
        .then(res=>{
            dispatch(joblistActions.setDepartmentList(res.data));
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
 

export const getFunction = () =>{
    return (dispatch)=>{
        ApiHandler.get("/api/v1/functions")
        .then(res=>{
            dispatch(joblistActions.setFunctionList(res.data));
        })
        .catch(err=>{
            console.log(err);
        })
    }
}