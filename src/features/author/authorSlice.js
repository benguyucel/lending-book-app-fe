import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getAuthors = createAsyncThunk('author/getAuthor', async() => {
    return await axios
        .get('https://lending-book-app.herokuapp.com/author')
        .then(response => {
            return response.data
        })
})
export const addAuthor = createAsyncThunk('author/AddAuthor', async(newAuthor, {rejectWithValue}) => {
    try {

        const response = await axios.post('https://lending-book-app.herokuapp.com/author', newAuthor)
        return response.data;
    } catch (error) {
        console.log(error)
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const deleteAuthor = createAsyncThunk('author/DeleteAuthor', async(id, {rejectWithValue}) => {
    try {

        await axios.delete(`https://lending-book-app.herokuapp.com/author/${id}`)
        return id;
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const getAuthorById = createAsyncThunk('author/DeleteAuthor', async(id, {rejectWithValue}) => {
    try {

        const response = await axios.get(`https://lending-book-app.herokuapp.com/author/${id}`)
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const editAuthor = createAsyncThunk('author/editAuthor', async(data, {rejectWithValue}) => {
    try {
        const {
            id,
            ...rest
        } = data;

        const response = await axios.put(`https://lending-book-app.herokuapp.com/author/${id}`, rest)
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const authorSlice = createSlice({
    name: "author",
    initialState: {
        data: [],
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addAuthor.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(addAuthor.fulfilled, (state, action) => {
            state
                .data
                .push(action.payload)
            state.error = null;
            state.loading = true
        })
        builder.addCase(addAuthor.rejected, (state, action) => {
            state.error = action.payload.errorMessage
            state.loading = false
        })
        //get Author
        builder.addCase(getAuthors.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(getAuthors.fulfilled, (state, action) => {
            state.data = action.payload

            state.loading = true
        })
        builder.addCase(getAuthors.rejected, (state, action) => {
            state.error = ""
            state.loading = false
        })

        //deleteAuthor
        builder.addCase(deleteAuthor.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteAuthor.fulfilled, (state, action) => {
            state.data = state
                .data
                .filter(a => a.id !== action.payload)
            state.loading = true
        })
        builder.addCase(deleteAuthor.rejected, (state, action) => {
            state.error = ""
            state.loading = false
        })

        //Edit

        builder.addCase(editAuthor.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(editAuthor.fulfilled, (state, action) => {
            state.data = state
                .data
                .map((author) => author.id === action.payload.id
                    ? action.payload
                    : author)
            state.loading = true
        })
        builder.addCase(editAuthor.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })
    }
})

export default authorSlice.reducer