import { useEffect, useState } from "react";
import { listData } from "../component/initialData";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Task } from "../component/task";

export default function Sort() {
  const [listState, setListState] = useState([...listData]);
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;
    const newTasks = [...listState];
    const draggedItem = [...listState].find(({ id }) => id === draggableId);

    newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, draggedItem);

    setListState([...newTasks]);
  };
  return winReady ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"drop"}>
        {(provided) => (
          <div
            style={{ padding: 8 }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listState.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
}
