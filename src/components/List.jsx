import React, { useState } from 'react';
import './List.css';
import TodoItem from './TodoItem';

const List = ({todos, onUpdate, onDelete}) => {

    const [search, setSearch] = useState("");
    
    // 검색어를 입력했을 때 검색어를 포함한 todos 정보 조회
    const getFilterData = () => {
        if(search === "") return todos;

        const searchedTodos = todos.filter((todo)=>todo.content.toLowerCase().includes(search.toLowerCase()));

        return searchedTodos;
    }

    const filteredTodos = getFilterData(); // List 컴포넌트가 리렌더링 될때마다(search status 변경될때마다)

    return (
        <div className='List'>
              <h4>Todo List 🧵</h4>
              <input placeholder='검색어를 입력해주세요' value={search} 
              onChange={(e)=>setSearch(e.target.value)} />

              <div className='todos_wrapper'>
                {
                    todos.map((todo) => {
                    //filteredTodos.map((todo) => {
                        return <TodoItem key={todo.todoSeq} {...todo} onUpdate={onUpdate} onDelete={onDelete}/>
                        // ...todo -> {id:0, isDone:false, content:"React Study", date : new Date().getTime()},
                    })
                }
              </div>
        </div>
    );
};

export default List;