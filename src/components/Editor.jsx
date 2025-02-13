import React, { useRef, useState } from 'react';
import './Editor.css';

const Editor = ({onCreate}) => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const titleRef = useRef();
    const contentRef = useRef();

    // 추가 클릭했을 때
    const onSubmit = () => {
        if(title.length < 1) {
            // input 요소에 커서 놓기 - dom 접근
            titleRef.current.focus(); // 커서 놓기
            return;
        }

        // if(content.length < 1) {
        //     // input 요소에 커서 놓기 - dom 접근
        //     contentRef.current.focus(); // 커서 놓기
        //     return;
        // }

        onCreate({
            title: title,
            description: content
        }); // App.jsx의 함수 호출한다

        setTitle("");
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
            <div className = 'Title'>
                <input type='text' placeholder='새로운 todo' value={title} 
                onChange={(e)=>setTitle(e.target.value)} ref={titleRef} onKeyDown={onKeyDown}/>
                
            </div>
            <button onClick={onSubmit}>추가</button>
            <div className = 'Content'>
                <input type='text' placeholder='설명' value={content} 
                onChange={(e)=>setContent(e.target.value)} ref={contentRef} onKeyDown={onKeyDown}/>
                
            </div>
        </div>
    );
};

export default Editor;