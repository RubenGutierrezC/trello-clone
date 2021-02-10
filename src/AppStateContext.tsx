import { nanoid } from "nanoid"
import { createContext, Dispatch, PropsWithChildren, useContext, useReducer } from "react"
import { DragItem } from "./DragItem"
import { findItemIndexById, moveItem, overrideItemAtIndex } from "./utils/arrayUtils"

interface Task {
  id: string;
  text: string;
}

interface List {
  id: string;
  text: string;
  tasks: Task[]
}

export interface AppState {
  lists: List[],
  draggedItem: DragItem | undefined
}

const appData: AppState = {
  draggedItem: undefined,
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c2", text: "Learn Typescript" }]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c3", text: "Begin to use static typing" }]
    }
  ]
}

interface AppStateContextProps {
  state: AppState,
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const useAppState = () => {
  return useContext(AppStateContext)
}

type Action =
  {
    type: 'ADD_LIST',
    payload: string
  }
|
  {
    type: 'ADD_TASK',
    payload: { text: string; listId: string}
  }
|
  {
    type: 'MOVE_LIST',
    payload: {
      dragIndex: number;
      hoverIndex: number;
    }
  }
  |
  {
    type: "SET_DRAGGED_ITEM",
    payload: DragItem | undefined
  }

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch(action.type) {
    case "ADD_LIST": {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] }
        ]
      }
    }
    case "ADD_TASK": {
      const targetListIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      )

      const targetList = state.lists[targetListIndex]

      const updatedTargetList = {
        ...targetList,
        tasks: [
          ...targetList.tasks,
          { id: nanoid(), text: action.payload.text }
        ]
      }

      return {
        ...state,
        lists: overrideItemAtIndex(
          state.lists,
          updatedTargetList,
          targetListIndex
        )
      }
    }
    case "MOVE_LIST": {
      const {dragIndex, hoverIndex} = action.payload
      return {
        ...state,
        lists: moveItem(state.lists, dragIndex, hoverIndex)
      }
    }
    case "SET_DRAGGED_ITEM": {
      return {
        ...state,
        draggedItem: action.payload
      }
    }
    default: return state
  }
}

export default function AppStateProvider({ children }: PropsWithChildren<{}>) {
  const [state, dispatch] = useReducer(appStateReducer, appData)

  return (
    <AppStateContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

