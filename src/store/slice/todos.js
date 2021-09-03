import { createSlice } from '@reduxjs/toolkit'
// 這裡是 todos 的 reducer ，就是 todos 要怎麼改動，都要在這邊寫下來
let todoId = 3 // 等等 id 會越來越多，從 3 開始加
const initialState = {
  // 設定初始值，會用 useSelector(state => state.todo.todos) 拿出資料
  // state.todo.todos 的 todos 就是底下這個 todos
  todos: [
    {
      id: 1,
      content: '這是 Redux ( RTK ) 版本的 todo',
      isDone: true,
      isEditing: false,
    },
    {
      id: 2,
      content: '把狀態交給 RTK',
      isDone: false,
      isEditing: false,
    },
  ],
}
export const todoSlice = createSlice({
  name: 'todoX', // 這個 name 用來辨識 type, action？
  //  是 todoX 底下的 addTodo, 這樣在其他的 reducer 也可以有 addTodo 而不會撞名？
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // 使用時用 dispatch(addTodo(content))
      // action.payload 可以拿出 addTodo(XX) XX 這裡的參數
      // 這裡的 state 跟 App.js  useSelector(state => state.todo.todos) 的 state 不同

      return {
        todos: [
          {
            id: todoId++,
            content: action.payload,
            isDone: false,
            isEditing: false,
          },
          ...state.todos,
        ],
      }
    },
    deleteTodo: (state, action) => {
      return {
        todos: state.todos.filter(todo => todo.id !== action.payload),
      }
    },
    toggleTodo: (state, action) => {
      return {
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload) {
            return todo
          } else {
            return {
              ...todo,
              isDone: !todo.isDone,
            }
          }
        }),
      }
    },
    editTodo: (state, action) => {
      return {
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload) {
            return todo
          } else {
            return {
              ...todo,
              isEditing: !todo.isEditing,
            }
          }
        }),
      }
    },
    editConfirm: (state, action) => {
      return {
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload.id) {
            return todo
          } else {
            return {
              ...todo,
              content: action.payload.editContent,
              isEditing: !todo.isEditing,
            }
          }
        }),
      }
    },
  },
})
export const { addTodo, deleteTodo, toggleTodo, editTodo, editConfirm } =
  todoSlice.actions // 給 App.js 用的

export default todoSlice.reducer // 給 store/index.js 用的
