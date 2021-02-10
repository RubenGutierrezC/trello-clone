import { KeyboardEvent, useState } from "react"
import { useFocus } from "../hooks/useFocus"
import { NewItemButton, NewItemFormContainer, NewItemInput } from "../styles"

interface NewItemFormProps {
  onAdd(text: string): void;
}

export default function NewItemForm({ onAdd }: NewItemFormProps) {
  const [text, setText] = useState("")
  const inputRef = useFocus()

  const handleAddText = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAdd(text)
    }
  }

  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={e => handleAddText(e)}
      />
      <NewItemButton onClick={() => onAdd(text)}>
        Create
      </NewItemButton>
    </NewItemFormContainer>
  )
}
