import React, { useRef, useState } from 'react';
import './Editor.css';

const Editor = () => {

    const [content, setContent] = useState("");
    const contentRef = useRef();

    // 추가 클릭했을 때
    const onSubmit = () => {
        if(content === "") {
            // input 요소에 커서 놓기 - dom 접근
            contentRef.current.focus(); // 커서 놓기
            return;
        }

        // onCreate(content); // App.jsx의 함수 호출한다
        setContent(""); // input 값 지우기
    }

    // 엔터를 입력했을 때 자동으로 추가
    const onKeyDown = (e) => {
        if(e.keyCode === 13){
            onSubmit();
        }
    }

    return (
        <div className='Editor'>
            <input type='text' placeholder='새로운 todo' value={content} 
            onChange={(e)=>setContent(e.target.value)} ref={contentRef} onKeyDown={onKeyDown}/>
            <button onClick={onSubmit}>추가</button>
        </div>
    );
};

export default Editor;