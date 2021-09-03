import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './slice/todos' // slice 底下的每一個檔案，都是一個 reducer 所以這樣命名
// 這裡是在創立 store
export const store = configureStore({
  reducer: {
    // 這裡的 todo 就是在 useSelector(state => state.todo.todos)
    // state.todo 的 todo
    todo: todosReducer,
  },
})
