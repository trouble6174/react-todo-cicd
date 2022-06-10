import Todo from "./components/todo.component";
import Timeline from "./components/timeline.component";
import styled from "styled-components";
import { css } from "styled-components";
import { useEffect } from "react";

const TodoContainer = styled.div`
  ${(props) => {
    switch (props.$mode) {
      case "dark":
        return css`
          background-color: black;
          color: white;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        `;
      default:
        return css`
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        `;
    }
  }}
`;

function App() {
  useEffect(() => {
    document.title = "TODO";
  }, []);
  return (
    // <TodoContainer $mode="dark">
    <TodoContainer>
      <Todo placeholder="14天" />
      <Timeline prefix="tkl" placeholder="对我说" />
      <Timeline prefix="t240" placeholder="从6月11号05:00开始的240小时记录" />
      <Todo prefix="tmp" placeholder="草稿" />
      <Todo prefix="ww" placeholder="Today" />
    </TodoContainer>
  );
}

export default App;
