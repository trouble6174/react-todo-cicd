import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  padding-left: 6px;
`;

const TodoContainer = styled.div`
  border: 1px solid black;
  max-width: 25%;
  min-width: 25%;
  min-height: 100%;
  overflow-y: scroll;
  height: 100vh;
`;

const TodoItems = styled.div`
  padding: 1rem;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TodoInput = styled.div`
  padding-top: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.2rem;
  input {
    min-height: 100%;
    width: 80%;
  }
  button {
    min-height: 100%;
  }
`;

function useStorageState(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const storageValue = localStorage.getItem(key);
    return storageValue === null ? defaultValue : JSON.parse(storageValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function Timeline({ prefix, placeholder }) {
  const content = useRef("");
  const scrollEnd = useRef();
  const [todoList, setTodoList] = useStorageState([], `${prefix || ""}tdl`);

  useEffect(() => {
    scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [todoList]);

  const handleAddTodo = () => {
    if (!content.current.value) {
      return;
    }
    setTodoList([...todoList, createTodoItem(content.current.value)]);
    content.current.value = "";
  };

  const createTodoItem = (value, timestamp = Date.now()) => ({
    content: value,
    timestamp: timestamp,
    id: Math.floor(Math.random() * 100000) + Date.now(),
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <TodoContainer>
      <TodoInput>
        <input
          type="text"
          placeholder={placeholder}
          ref={content}
          onKeyPress={handleKeyDown}
        />
        <button onClick={handleAddTodo}>+</button>
      </TodoInput>
      <TodoItems>
        {todoList.map((v, i) => (
          <TimelineItem key={i}>
            <div>{new Date(v.timestamp).toLocaleString()}</div>
            <div>{v.content}</div>
          </TimelineItem>
        ))}
        <div ref={scrollEnd} />
      </TodoItems>
    </TodoContainer>
  );
}

export default Timeline;
