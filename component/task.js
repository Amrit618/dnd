import { Draggable } from "react-beautiful-dnd";

export const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            style={{
              border: "1px solid lightgrey",
              borderRadius: 2,
              padding: 8,
              // marginBottom: 8,
              background: "white",
            }}
          >
            {task.content}
          </div>
        </div>
      )}
    </Draggable>
  );
};
