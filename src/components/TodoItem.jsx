import React from 'react';
import './TodoItem.css';

const TodoItem = () => {

    let isDone;
    // const onChangeCheckbox = () => {
    //     // 수정하기 (checkbox 상태 변경)
    //     // console.log("11")
    //     onUpdate(id); // App.jsx의 함수 호출

    // }

    // 삭제 클릭
    // const onClickDelete = () => {
    //     onDelete(id);
    // }

    return (
        <div className='TodoItem'>
            <input type='checkbox' checked = {isDone} />
            <div className='content'></div>
            <div className='date'></div>
            <button>삭제</button>
        </div>
    );
};

export default TodoItem;