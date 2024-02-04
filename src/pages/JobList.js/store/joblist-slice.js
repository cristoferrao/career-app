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

const joblistSlice = createSlice({
    name: 'joblist',
    initialState:joblistInitial,
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
  

        setDepartmentList(state, { payload }) {
            state.optionsList.department = payload;
        },
        setLocationList(state, { payload }) {
            state.optionsList.location = payload;
        },
        setFunctionList(state, { payload }) {
            state.optionsList.function = payload;
        },


    },
  });

  export const joblistActions =joblistSlice.actions;
  export default joblistSlice;