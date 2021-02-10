import { useRef } from "react";
import { useDrop } from "react-dnd";
import { useAppState } from "../AppStateContext";
import { DragItem } from "../DragItem";
import useItemDrag from "../hooks/useItemDrag";
import { ColumnContainer, ColumnTitle } from "../styles";
import { isHidden } from "../utils/isHidden";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import CustomDragLayer from "./CustomDragLayer";

interface ColumnProps {
  text: string;
  index: number;
  id: string;
  isPreview?: boolean
}

export default function Column({
  text,
  index,
  id,
  isPreview
}: ColumnProps) {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(item: DragItem) {
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      dispatch({
        type: 'MOVE_LIST',
        payload: { dragIndex, hoverIndex}
      })
      item.index = hoverIndex

    }
  })

  const { drag } = useItemDrag({ type: "COLUMN", id, index, text })

  drag(drop(ref))

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
    >
      {/* <CustomDragLayer /> */}
      <ColumnTitle>{text}</ColumnTitle>
      {
        state.lists[index].tasks.map((task) => (
          <Card key={task.id} text={task.text} />
        ))
      }
      <AddNewItem
        toggleButtonText="+ Add another task"
        onAdd={text => dispatch({ type: "ADD_TASK", payload: { text, listId: id } })}
        dark
      />
    </ColumnContainer>
  );
}
