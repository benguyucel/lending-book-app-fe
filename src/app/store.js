import { configureStore } from '@reduxjs/toolkit'
import  authorReducer  from '../features/author/authorSlice'
import  bookReducer  from '../features/book/bookSlice'
import lendSlice from '../features/lend/lendSlice'
import personSlice from '../features/person/personSlice'
import  publisherReducer  from '../features/publisher/publisherSlice'

export default configureStore({
  reducer: {
    author: authorReducer,
    book: bookReducer,
    publisher:publisherReducer,
    person:personSlice,
    lending:lendSlice
  },
})