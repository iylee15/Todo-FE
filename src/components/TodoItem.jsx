import React from 'react';
import './TodoItem.css';

const TodoItem = ({todoSeq, title, description, status, date, priority, onUpdate, onDelete}) => {

    const onChangeCheckbox = () => {
        // 수정하기 (checkbox 상태 변경)
        onUpdate(todoSeq); // App.jsx의 함수 호출
    }

    // 삭제 클릭
    const onClickDelete = () => {
        onDelete(todoSeq);
    }

    return (
        <div className='TodoItem'>
            <input type='checkbox' checked = {status} onChange={onChangeCheckbox}/>
            <div className={`info ${status ? "completed" : ""} priority-${priority || 'none'}`}>
                <div className='title'>{title}</div>
                <div className='description'>{description}</div>
            </div>
            <div className='date'>{date}</div>
            <button onClick={onClickDelete}>삭제</button>
        </div>
    );
};

export default TodoItem;