import { CSSProperties } from "react"
import { useDragLayer, XYCoord } from "react-dnd"
import { CustomDragLayerContainer } from "../styles"
import Column from "./Column"

const getItemStyles = (currentOffset: XYCoord | null): CSSProperties => {
  if (!currentOffset) {
    return {
      display: "none"
    }
  }

  const { x, y } = currentOffset

  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform
  }
}

export default function CustomDragLayer() {

  const { isDragging, item, currentOffset } =  useDragLayer(
    monitor => ({
      item: monitor.getItem(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  )

  if (!isDragging) {
    return null
  }

  return (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)}>
        <Column
          id={item.id}
          text={item.text}
          index={item.index}
          isPreview={true}
        />
      </div>
    </CustomDragLayerContainer>
  )
}
