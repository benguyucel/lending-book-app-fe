import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

export const getBooks = createAsyncThunk('book/getBooks', async() => {
    return await axios
        .get('https://lending-book-app.herokuapp.com/book')
        .then(response => {
            return response.data
        })
})
export const getBookById = createAsyncThunk('book/getBookById', async(id) => {
    return await axios
        .get('https://lending-book-app.herokuapp.com/book/' + id)
        .then(response => {
            return response.data

        })
})

export const deleteBook = createAsyncThunk('book/deleteBook', async(id, {rejectWithValue}) => {
    try {

        await axios.delete(`https://lending-book-app.herokuapp.com/book/${id}`)
        return id;
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }

})
export const getBookDetail = createAsyncThunk('book/getBookDetail', async(id) => {
    return await axios
        .get('https://lending-book-app.herokuapp.com/book/detail/' + id)
        .then(response => {
            return response.data

        })
})

export const addBook = createAsyncThunk('book/addBook', async(newBook, {rejectWithValue}) => {

    try {
        const response = await axios.post('https://lending-book-app.herokuapp.com/book/', newBook);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }

})
export const editBook = createAsyncThunk('book/editBook', async(data, {rejectWithValue}) => {

    try {
        const {
            id,
            ...rest
        } = data;
        const response = await axios.put(`https://lending-book-app.herokuapp.com/book/${id}`,rest);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data)

    }

})

export const bookSlice = createSlice({
    name: "book",
    initialState: {
        data: [],
        error: "",
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.data = action.payload
            state.loading = true
        })
        builder.addCase(getBooks.rejected, (state, action) => {
            state.error = ""
            state.loading = false
        })
        builder.addCase(addBook.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(addBook.fulfilled, (state, action) => {
            state
                .data
                .push(action.payload)
            state.loading = true
        })
        builder.addCase(addBook.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })

        builder.addCase(deleteBook.pending, (state, action) => {
            state.loading = false
        })
        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.data = state
                .data
                .filter(a => a.bookId !== action.payload)
            state.loading = true
        })
        builder.addCase(deleteBook.rejected, (state, action) => {
            state.error = ""
            state.loading = false
        })
    }
})

export default bookSlice.reducer