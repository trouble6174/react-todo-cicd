import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const CheckboxDiv = styled.div`
  display: flex;
  flex-direction: row;

  .checked {
    text-decoration: line-through;
    color: grey;
  }

  button {
    color: goldenrod;
    padding-left: 3px;
    border: none;
    background-color: inherit;
  }

  button:hover {
    background-color: lightgray;
  }
`;

const TodoContainer = styled.div`
  border: 1px solid black;
  max-width: 20%;
  min-width: 20%;
  min-height: 100%;
`;

const TodoItems = styled.div`
  padding: 1rem;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    margin-right: 10px;
    margin-left: 10px;
  }
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

function Todo({ prefix, placeholder }) {
  const content = useRef("");
  const [showAll, setShowAll] = useState(true);
  const [todoList, setTodoList] = useStorageState([], `${prefix || ""}tdl`);
  const handleAddTodo = () => {
    if (!content.current.value) {
      return;
    }
    setTodoList([...todoList, createTodoItem(content.current.value)]);
    content.current.value = "";
  };

  const createTodoItem = (value, timestamp = Date.now()) => ({
    content: value,
    checked: false,
    timestamp: timestamp,
    id: Math.floor(Math.random() * 100000) + Date.now(),
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleCheckboxChange = (event, vid) => {
    if (event.target.checked) {
      event.target.parentNode.className += "checked";
    } else {
      event.target.parentNode.classList.remove("checked");
    }
    setTodoList(
      todoList.map((x) => {
        return x.id === vid ? { ...x, checked: event.target.checked } : x;
      })
    );
  };

  const handleDeleteTodo = (event, vid) => {
    setTodoList(todoList.filter((x) => x.id !== vid));
  };

  const toggleVisible = () => {
    setShowAll(!showAll);
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
        <button onClick={toggleVisible}>{showAll ? "Undone" : "All"}</button>
      </TodoInput>
      <TodoItems>
        {todoList
          .filter((i) => (showAll ? i : !i.checked))
          .map((v, i) => (
            <CheckboxDiv key={i}>
              <label className={v.checked ? "checked" : ""}>
                <input
                  type="checkbox"
                  checked={v.checked}
                  onChange={(event) => handleCheckboxChange(event, v.id)}
                />
                {v.content}
                <button onClick={(event) => handleDeleteTodo(event, v.id)}>
                  x
                </button>
              </label>
            </CheckboxDiv>
          ))}
      </TodoItems>
    </TodoContainer>
  );
}

export default Todo;
