import { useAppState } from "./AppStateContext";
import AddNewItem from "./components/AddNewItem";
import Column from "./components/Column";
import { AppContainer } from "./styles";

function App() {
  const { state, dispatch } = useAppState()

  return (
    <AppContainer>
      {
        state.lists.map((list, i) => (
          <Column key={list.id} text={list.text} index={i} id={list.id}/>
        ))
      }
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={text => dispatch({ type: "ADD_LIST", payload: text })}
      />
    </AppContainer>
  );
}

export default App;
