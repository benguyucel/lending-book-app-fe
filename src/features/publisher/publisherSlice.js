import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../api/baseUrl";

export const getPublisher = createAsyncThunk('publisher/getPublisher', async(arg, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${apiUrl}/publisher`)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const getPublisherId = createAsyncThunk('publisher/getPublisherById', async(id, {rejectWithValue}) => {
    try {

        const response = await axios.get(`https://lending-book-app.herokuapp.com/publisher/${id}`)
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const deletePublisher = createAsyncThunk('publisher/deleteReducer', async(id, {rejectWithValue}) => {
    try {
        await axios.delete(`${apiUrl}/publisher/${id}`)
        return id
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const addPublisher = createAsyncThunk('publisher/addPublisher', async(newPublisher, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${apiUrl}/publisher/`, newPublisher)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
export const editPublisher = createAsyncThunk('publisher/editPublisher', async(editData, {rejectWithValue}) => {
    const  {id,...rest} = editData
    try {
        const response = await axios.put(`${apiUrl}/publisher/${id}`, rest)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const publisherSlice = createSlice({
    name: "publisher",
    initialState: {
        data: [],
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPublisher.pending, ({
            loading
        }, action) => {
            loading = false
        })
        builder.addCase(getPublisher.fulfilled, (state, action) => {
            state.error = null
            state.data = action.payload
            state.loading = true
        })
        builder.addCase(getPublisher.rejected, ({
            error,
            loading,
            data
        }, action) => {
            error = action.payload.error
            data = null
            loading = true
        })
        builder.addCase(addPublisher.pending, ({
            loading
        }, action) => {
            loading = false
        })
        builder.addCase(addPublisher.fulfilled, (state, action) => {
            state.error = null
            state
                .data
                .push(action.payload)
            state.loading = true
        })
        builder.addCase(addPublisher.rejected, ({
            error,
            loading,
            data
        }, action) => {
            error = action.payload.error
            data = null
            loading = true
        })
        builder.addCase(deletePublisher.fulfilled, (state, action) => {
            state.error = null
            state.data = state
                .data
                .filter(pub => pub.id !== action.payload)
            state.loading = true
        })
        builder.addCase(deletePublisher.rejected, ({
            error,
            loading,
            data
        }, action) => {
            error = action.payload.error
            data = null
            loading = true
        })

        builder.addCase(editPublisher.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(editPublisher.fulfilled, (state, action) => {
            state.data = state
                .data
                .map((pub) => pub.id === action.payload.id
                    ? action.payload
                    : pub)
            state.loading = true
        })
        builder.addCase(editPublisher.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export default publisherSlice.reducer
