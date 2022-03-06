import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {apiUrl} from "../../api/baseUrl";

export const getPerson = createAsyncThunk('publisher/getPerson', async(arg, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${apiUrl}/person`)
        return response.data

    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const getPersonbyId = createAsyncThunk('publisher/getPersonById', async(id, {rejectWithValue}) => {
    try {

        const response = await axios.get(`https://lending-book-app.herokuapp.com/person/${id}`)
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const editPerson = createAsyncThunk('person/editPerson', async(data, {rejectWithValue}) => {
    try {
        const {
            id,
            ...rest
        } = data;
        const response = await axios.put(`https://lending-book-app.herokuapp.com/person/${id}`, rest);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }
})


export const deletePerson = createAsyncThunk('book/deletePerson', async(id, {rejectWithValue}) => {
    try {

        await axios.delete(`https://lending-book-app.herokuapp.com/person/${id}`)
        return id;
    
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const addPerson = createAsyncThunk('person/addPerson', async(addPerson, {rejectWithValue}) => {
    try {
        const response = await axios.post(`${apiUrl}/person/`, addPerson)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const personSlice = createSlice({
    name: "person",
    initialState: {
        data: [],
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        //getPerson
        builder.addCase(getPerson.pending, ({
            loading
        }, action) => {
            loading = false
        })
        builder.addCase(getPerson.fulfilled, (state, action) => {
            state.error = null
            state.data = action.payload
            state.loading = true
        })
        builder.addCase(getPerson.rejected, ({
            error,
            loading,
            data
        }, action) => {
            error = action.payload.error
            data = null
            loading = true
        })
        //addPerson
        builder.addCase(addPerson.pending, ({
            loading
        }, action) => {
            loading = false
        })
        builder.addCase(addPerson.fulfilled, (state, action) => {
            state.error = null
            state
                .data
                .push(action.payload)
            state.loading = true
        })
        builder.addCase(addPerson.rejected, ({
            error,
            loading,
            data
        }, action) => {
            error = action.payload.error
            data = null
            loading = true
        })
        //edit person
        builder.addCase(editPerson.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(editPerson.fulfilled, (state, action) => {
            state.data = state
                .data
                .map((author) => author.id === action.payload.id
                    ? action.payload
                    : author)
            state.loading = true
        })
        builder.addCase(editPerson.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })

        builder.addCase(deletePerson.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(deletePerson.fulfilled, (state, action) => {
            state.data = state
                .data
                .filter(a => a.id !== action.payload)
            state.loading = true
        })
        builder.addCase(deletePerson.rejected, (state, action) => {
            state.error = ""
            state.loading = false
        })
    }
})

export default personSlice.reducer
