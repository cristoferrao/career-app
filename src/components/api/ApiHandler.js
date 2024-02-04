import axios from "axios";


export const ApiHandler = axios.create({
    baseURL:"https://teknorix.jobsoid.com",
    timeout:1000,
    headers:{
        Accept:"application/json"
    },
});

export const ApiHandlerTeknorix = axios.create({
    baseURL:"https://teknorix.jobsoid.com",
    timeout:1000,
    headers:{
        Accept:"application/json"
    },
});

 
 