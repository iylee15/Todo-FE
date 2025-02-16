import { useEffect, useReducer, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'
import List from './components/List'
import axios from 'axios';

function App() {

  let mockData = null;

  useEffect(()=>{
    fetchTodoList();
  },[]);

const fetchTodoList = async () => {
  try {
    const response = await axios.get("http://localhost:9000/todo");
    // dispatch 로 데이터 업데이트
    dispatch({
      type : "INIT",
      data : response.data
    })
  } catch (error) {
    console.error("TodoList 조회 실패")
  }
}

  const reducer = (state, action) => {
    switch(action.type) {
      case "INIT" : return action.data;
      case "CREATE" : return [action.data, ...state];
      case "UPDATE" : return state.map((todo)=>todo.todoSeq === action.targetId ? { ...todo, status : !todo.status } : todo);
      case "DELETE" : return state.filter((todo)=>todo.todoSeq !== action.targetId);
    }
  }

  const [todos, dispatch] = useReducer(reducer, []);


  // 추가하기
  const onCreate = async (content) => {
    try {
      const newTodo = {
        title: content.title,
        description: content.description,
        priority: content.priority,
      };

      const response = await axios.post("http://localhost:9000/todo", newTodo);
      console.log(response);

      if (response.status === 200) {
        // 백엔드에서 생성된 todoSeq을 받아와 클라이언트 상태 업데이트
        const createdTodo = {
          todoSeq: response.data.todoSeq, // 백엔드에서 생성된 ID 사용
          status: response.data.status,
          title: content.title,
          description: content.description,
          date: response.data.date,
          priority: content.priority
        };

        console.log(createdTodo);

        dispatch({
          type: "CREATE",
          data: createdTodo,
        });
      } else {
        console.error("Todo 등록 실패 : ", response);
      }
    } catch (error) {
      console.error("Error 발생 : ", error);
    }
  };

  // 수정하기
  const onUpdate = async (targetId) => {
    try {
      const response = await axios.patch(`http://localhost:9000/todo/${targetId}`);

      if (response.status === 200) {
        // 백엔드에서 생성된 todoSeq을 받아와 클라이언트 상태 업데이트
        dispatch({
          type: "UPDATE",
          targetId: targetId
        })
      };

      
    } catch (error) {
      console.error("Error 발생 : ", error);
    }
  }

  const onDelete = async (targetId) => {
    try{
      const response = await axios.delete(`http://localhost:9000/todo/${targetId}`);
      if (response.status === 200) {
        dispatch({
          type: "DELETE",
          targetId: targetId
        })
      }
    } catch (error) {
      console.error("Error 발생 : ", error);
    }
  }

  return (
    <div className='app'>
      <Header/>
      <Editor onCreate = {onCreate}/>
      <List todos = {todos} onUpdate = {onUpdate} onDelete = {onDelete}/>
    </div>
  )
}

export default App
