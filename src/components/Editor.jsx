import React, { useRef, useState } from 'react';
import './Editor.css';

const Editor = ({onCreate}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState(null);
    const titleRef = useRef();
    const contentRef = useRef();

    // 추가 클릭했을 때
    const onSubmit = () => {
        if(title.length < 1) {
            // input 요소에 커서 놓기 - dom 접근
            titleRef.current.focus(); // 커서 놓기
            return;
        }

        onCreate({
            title: title,
            description: content,
            priority: priority ? Number(priority) : null
        }); // App.jsx의 함수 호출한다

        setTitle("");
        setContent(""); 
        setPriority(null); // input 값 지우기
    }

    // 엔터를 입력했을 때 자동으로 추가
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }

    return (
        <div className='Editor'>
            <div className = 'Title'>
                <input type='text' placeholder='새로운 todo' value={title} 
                onChange={(e)=>setTitle(e.target.value)} ref={titleRef} onKeyDown={onKeyDown}/>
                
            </div>
            <button onClick={onSubmit}>추가</button>
            <div className = 'Content'>
                <input type='text' placeholder='설명' value={content} 
                onChange={(e)=>setContent(e.target.value)} ref={contentRef} onKeyDown={onKeyDown}/>

                <select className='Priority' value={priority || ""} 
                onChange={(e)=>setPriority(e.target.value || null)}>
                    <option value = "" disabled>우선순위</option>
                    <option value = {1}>1순위</option>
                    <option value = {2}>2순위</option>
                    <option value = {3}>3순위</option>
                </select>
            </div>
        </div>
    );
};

export default Editor;