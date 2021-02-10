import { useAppState } from "./AppStateContext";
import AddNewItem from "./components/AddNewItem";
import Column from "./components/Column";
import { AppContainer } from "./styles";

function App() {
  const { state } = useAppState()

  return (
    <AppContainer>
      {
        state.lists.map((list, i) => (
          <Column key={list.id} text={list.text} index={i}/>
        ))
      }
      <AddNewItem toggleButtonText="+ Add another list" onAdd={() => console.log} />
    </AppContainer>
  );
}

export default App;
