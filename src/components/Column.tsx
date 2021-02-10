import { PropsWithChildren } from "react";
import { useAppState } from "../AppStateContext";
import { ColumnContainer, ColumnTitle } from "../styles";
import AddNewItem from "./AddNewItem";
import Card from "./Card";

interface ColumnProps {
  text: string;
  index: number;
}

export default function Column({
  text,
  index,
}: ColumnProps) {
  const { state } = useAppState()

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {
        state.lists[index].tasks.map(task => (
          <Card key={task.id} text={task.text} />
        ))
      }
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={() => console.log}
        dark
      />
    </ColumnContainer>
  );
}
