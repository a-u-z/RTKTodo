import styled from 'styled-components' // 引入一個可以寫 css 的 package
import img from './doneStamp.png'
const Background = styled.div``
const Title = styled.div`
  color: black;
  font-size: 100px;
  text-align: center;
  margin-bottom: 40px;
  font-weight: bolder;
  -webkit-text-stroke: 3px #fff;
`
const Wrapper = styled.div`
  width: 1000px;
  height: auto;
  margin: auto;
  margin-top: 50px;
`
const Input = styled.input`
  margin-right: 20px;
  border-radius: 8px;
  padding: 18px;
  font-size: 20px;
  border: black solid 2px;
`
const SingleTodoWrapper = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  border: 2px solid white;
  & + & {
    margin-top: 20px;
  }
  margin-top: 15px;
`
const TodoContent = styled.div`
  padding: 15px;
  font-size: 35px;
  color: #ffbde5;
  word-break: break-all;
  width: 600px;
  position: relative;
  ${props =>
    props.isDone
      ? `&:after {
      content: '';
      width: 90px;
      height: 78px;
      position: absolute;
      left: 540px;
      top: -3px;
      background-image: url(${img});
      background-size: 100%;
      z-index: 1;
    }`
      : ''}
`
const ButtonWrapper = styled.div``
const Button = styled.button`
  font-size: 25px;
  padding: 15px;
  color: white;
  margin-right: 10px;
  border-radius: 10px;
  background: black;
  border: white 2px outset;
  transition: 0.5s;
  &:hover {
    color: black;
    background: white;
    border: black 2px outset;
    transition: 0.2s;
    cursor: pointer;
  }
  ${props =>
    !props.whichTabActive
      ? ''
      : props.whichTabActive
      ? `color: black;
  background: white;
  border: black 2px outset;
  transition: 0.2s;`
      : ''}
`
export {
  Background,
  Title,
  Wrapper,
  Input,
  SingleTodoWrapper,
  TodoContent,
  ButtonWrapper,
  Button,
}
