import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../api/baseUrl";

export const lendBook = createAsyncThunk('lending/Lendbook', async(lend, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${apiUrl}/lending/`, lend)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getLending = createAsyncThunk('lend/getLending', async() => {
    return await axios
        .get('https://lending-book-app.herokuapp.com/lending')
        .then(response => {
            return response.data
        })
})
export const deleteLending = createAsyncThunk('lend/deleteLending', async (id)=>{
    return await axios.delete(`https://lending-book-app.herokuapp.com/lending/${id}`)
    .then(response => { 
        return id
    })

})

export const lendSlice = createSlice({
    name: "lend",
    initialState: {
        data: [],
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {

        //
        builder.addCase(lendBook.pending, ({
            loading
        }, action) => {
            loading = false
        })
        builder.addCase(lendBook.fulfilled, (state, action) => {
            state.error = null
            state
                .data
                .push(action.payload)
            state.loading = true
        })
        builder.addCase(lendBook.rejected, ({
            error,
            loading,
            data
        }, action) => {
            error = action.payload.error
            data = null
            loading = true
        })
        builder.addCase(getLending.pending, ({
            loading
        }, action) => {
            loading = false
        })
        builder.addCase(getLending.fulfilled, (state, action) => {
            state.error = null
            state.data = action.payload
            state.loading = true
        })
        builder.addCase(getLending.rejected, ({
            error,
            loading,
            data
        }, action) => {
            error = action.payload.error
            data = null
            loading = true
        })

        builder.addCase(deleteLending.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteLending.fulfilled, (state, action) => {
            console.log(action.payload)
            state.data = state
                .data
                .filter(a => a.id !== action.payload)
            state.loading = true
        })
        builder.addCase(deleteLending.rejected, (state, action) => {
            state.error = ""
            state.loading = false
        })

    }
})

export default lendSlice.reducer
