import { createSlice } from "@reduxjs/toolkit";





export const joblistInitial = {
    JobList:[],
    searchOptions:{
        jobName:'',
        department:null,
        location:null,
        function:null
    },
    optionsList:{
        location:[],
        department:[],
        function:[],
    }
}
const storedSearchOptions = localStorage.getItem("searchOptions");
const parsedStoredSearchOptions = storedSearchOptions ? JSON.parse(storedSearchOptions) : {};

// console.log({parsedStoredSearchOptions});
const joblistSlice = createSlice({
    name: 'joblist',
    initialState: {
        ...joblistInitial,
        searchOptions: {
            
            ...joblistInitial.searchOptions,
            ...parsedStoredSearchOptions
        }
    },
    reducers: {
        setJobList(state, { payload }) {
            state.JobList = payload;
        },
          addJob(state,{payload}){
            state.JobList.push(payload);
        },
        removeJob(state,{payload}){
            state.JobList = state.JobList.filter(c=>c.id!==payload.id);
        },
       

        setJobName(state,{payload}){
            state.searchOptions.jobName= payload;
        },
        setDepartmentId(state,{payload}){
            state.searchOptions.department= payload;
        },
        setLocation(state,{payload}){
            state.searchOptions.location= payload;
        },
        setFunction(state,{payload}){
            state.searchOptions.function= payload;
        },
  
        clearFullSearch(state){
            state.searchOptions=joblistInitial.searchOptions;
        },
        setDepartmentList(state, { payload }) {
            state.optionsList.department = payload;
        },
        setLocationList(state, { payload }) {
            state.optionsList.location = payload;
        },
        setFunctionList(state, { payload }) {
            state.optionsList.function = payload;
        },



        settingToLocalStorage(state){
            localStorage.setItem("searchOptions",JSON.stringify(state.searchOptions))
        },
        gettingToLocalStorage(state){
            const dataLocal = JSON.parse(localStorage.getItem("searchOptions"));
            if (dataLocal) {
                state.searchOptions =  dataLocal;
                
            }
        },
    },
  });

  export const joblistActions =joblistSlice.actions;
  export default joblistSlice;