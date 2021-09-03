import styled from 'styled-components' // 引入一個可以寫 css 的 package

import React, { useState, useRef } from 'react' // 要引入才可以用 state, ref
import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  editTodo,
  editConfirm,
} from './store/slice/todos'
import {
  Background,
  Title,
  Wrapper,
  Input,
  SingleTodoWrapper,
  TodoContent,
  ButtonWrapper,
  Button,
} from './components/components'

// 底下就是用 styled 寫的 css ，要 .創造的標籤
// 然後就可以打一些 css, sass, scss 的寫法

function Navbar({
  content,
  handleContentChange,
  handleAdd,
  handleShow,
  whichTabActive,
}) {
  return (
    <div style={{ marginBottom: '45px' }}>
      <Input
        type="text"
        value={content}
        onChange={handleContentChange}
        placeholder="Type something   (//●⁰౪⁰●)//"
        size="25"
      />
      <Button onClick={handleAdd}>add todo</Button>
      <Button
        whichTabActive={whichTabActive.current.showAll}
        onClick={handleShow}
      >
        show all
      </Button>
      <Button
        whichTabActive={whichTabActive.current.showDone}
        onClick={handleShow}
      >
        show done
      </Button>
      <Button
        whichTabActive={whichTabActive.current.showUndo}
        onClick={handleShow}
      >
        show undo
      </Button>
    </div>
  )
}
function SingleTodo({
  todo,
  handleToggle,
  handleEditClick,
  handleDelete,
  handleEditChange,
  handleEditConfirm,
}) {
  return (
    <SingleTodoWrapper id={todo.id}>
      {todo.isEditing ? (
        <Input
          type="text"
          defaultValue={todo.content}
          size="30"
          onChange={handleEditChange}
          autoFocus
        />
      ) : (
        <TodoContent isDone={todo.isDone}>{todo.content}</TodoContent>
      )}
      <ButtonWrapper>
        {todo.isEditing ? null : (
          <Button onClick={() => handleToggle(todo.id)}>
            {todo.isDone ? 'undo' : 'done'}
          </Button>
        )}
        {todo.isEditing ? (
          <Button onClick={() => handleEditClick(todo.id)}>Cancel</Button>
        ) : (
          <Button onClick={() => handleEditClick(todo.id)}>Edit</Button>
        )}
        {todo.isEditing ? (
          <Button onClick={() => handleEditConfirm(todo.id)}>Confirm</Button>
        ) : (
          <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
        )}
      </ButtonWrapper>
    </SingleTodoWrapper>
  )
}
function App() {
  const [content, setContent] = useState('')
  const [editContent, setEditContent] = useState('')
  const [showType, setShowType] = useState('all')
  const todos = useSelector(state => state.todo.todos)
  // state 裡面有一個叫做 todo 的物件，這是在 store/index.js 命名的
  // todo 這個物件裡面裝一個叫做 todos 的物件，這是在 store/slice/todos.js 設定的
  // 而這個 todos 裡面是一個陣列，這個陣列裡面是一筆筆的代辦事項
  const dispatch = useDispatch()
  const whichTabActive = useRef({
    showAll: true,
    showDone: false,
    showUndo: false,
  })

  function handleAdd() {
    if (content === '') return alert('Please type something in the input box')
    dispatch(addTodo(content))
    setContent('')
  }

  function handleEditConfirm(id) {
    const action = { id, editContent } // payload 好像只能傳一個參數進去，所以用成物件包兩個東西進去
    dispatch(editConfirm(action))
  }

  function handleShow(e) {
    if (e.target.innerText === 'show all') {
      whichTabActive.current = {
        showAll: true,
        showDone: false,
        showUndo: false,
      }
      return setShowType('all')
    }
    if (e.target.innerText === 'show undo') {
      whichTabActive.current = {
        showAll: false,
        showDone: false,
        showUndo: true,
      }
      return setShowType('undo')
    }
    if (e.target.innerText === 'show done') {
      whichTabActive.current = {
        showAll: false,
        showDone: true,
        showUndo: false,
      }
      return setShowType('done')
    }
  }
  return (
    <Background>
      <Wrapper>
        <Title>Todo List</Title>
        <Navbar
          content={content}
          handleContentChange={e => setContent(e.target.value)} // 取出最上方新輸入 todo 的內容
          handleAdd={handleAdd}
          handleShow={handleShow}
          whichTabActive={whichTabActive}
        />
        {todos
          .filter(todo => {
            if (showType === 'undo') return todo.isDone === false
            if (showType === 'done') return todo.isDone === true
            if (showType === 'all') return true
          })
          .map(todo => (
            <SingleTodo
              key={todo.id}
              todo={todo}
              handleToggle={id => dispatch(toggleTodo(id))} // undo 變 done, done 變 undo
              handleEditClick={id => dispatch(editTodo(id))}
              handleEditChange={e => setEditContent(e.target.value)} // 取出正在 edit 的 todo 的內容
              handleEditConfirm={handleEditConfirm}
              handleDelete={id => dispatch(deleteTodo(id))}
            ></SingleTodo>
          ))}
      </Wrapper>
    </Background>
  )
}
export default App
