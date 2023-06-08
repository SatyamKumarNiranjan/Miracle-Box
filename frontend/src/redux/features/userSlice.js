// In this we will provide the name of user and add a icon to the header section. This basically contains all the details regarding user
import {createSlice} from "@reduxjs/toolkit" 
export const userSlice = createSlice({
    name:"user", 
    initialState:{
        user:null,
    }, 
    reducers:{
        setUser: (state,action)=>{
            state.user = action.payload;
        },
    },
}) 

export const { setUser } = userSlice.actions ;
 