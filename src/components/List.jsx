import React, { useState } from 'react';
import './List.css';
import TodoItem from './TodoItem';

const List = ({todos, onUpdate, onDelete}) => {

    const [search, setSearch] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    // 검색어를 입력했을 때 검색어를 포함한 todos 정보 조회
    const getFilterData = () => {
        let filteredData = todos;

        if(search !== "") {
            filteredData = todos.filter((todo)=>todo.title.toLowerCase().includes(search.toLowerCase()));
        }

        // 미완료 항목 체크 시
        if(isVisible) {
            filteredData = filteredData.filter((todo) => !todo.status);
        }

        return filteredData;
    }

    const filteredTodos = getFilterData(); // List 컴포넌트가 리렌더링 될때마다(search status 변경될때마다)

    const onChangeCheckbox = () => {
        setIsVisible(!isVisible);
    }

    return (
        <div className='List'>
            <div className='menu'>
              <h4>Todo List 🧵</h4>
              <span><input type='checkbox' checked = {isVisible} onChange={onChangeCheckbox}/> <b>미완료 목록만 보기</b></span>
            </div>
              <input placeholder='검색어를 입력해주세요' value={search} 
              onChange={(e)=>setSearch(e.target.value)} />

              <div className='todos_wrapper'>
                {
                    filteredTodos.map((todo) => {
                        return <TodoItem key={todo.todoSeq} {...todo} onUpdate={onUpdate} onDelete={onDelete}/>
                    })
                }
              </div>
        </div>
    );
};

export default List;