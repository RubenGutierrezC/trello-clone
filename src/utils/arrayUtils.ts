interface Item {
  id: string
}

export const findItemIndexById = <T extends Item>(items: T[], id: string) => {
  return items.findIndex((item: T) => item.id === id)
}

export function overrideItemAtIndex<T>(
  array: T[],
  newItem: T,
  targetIndex: number
) {
  return array.map((item, index) => index !== targetIndex ? item : newItem)
}

// draggable item
export function insertItemAtIndex<T>(
  array: T[],
  item: T,
  index: number
) {
  // insert column in new position
  return [...array.slice(0, index), item, ...array.slice(index)]
}

export function removeItemAtIndex<T>(array: T[], index: number) {
  // remove column from index position
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

export const moveItem = <T>(array: T[], from: number, to: number) => {
  const item = array[from]
  return insertItemAtIndex(removeItemAtIndex(array, from), item, to)
}


