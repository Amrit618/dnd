import { useEffect, useState } from "react";
import { Column } from "../component/column";
import { initialData } from "../component/initialData";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
// import dynamic from "next/dynamic";
// const Column = dynamic(import("../component/column"));
export default function Home() {
  const [listState, setListState] = useState({ ...initialData });
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const onDragEnd = (result) => {
    console.log(result);
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    const column = listState.columns[source.droppableId];
    const newTaskId = [...column.taskIds];
    newTaskId.splice(source.index, 1);
    newTaskId.splice(destination.index, 0, draggableId);

    const newColumn = { ...column, taskIds: newTaskId };
    setListState((prev) => {
      return {
        ...prev,
        columns: {
          ...prev.columns,
          [newColumn.id]: newColumn,
        },
      };
    });
  };
  return winReady ? (
    <DragDropContext onDragEnd={onDragEnd}>
      {listState.columnOrder.map((columnId) => {
        const column = listState?.columns[columnId];
        const tasks = column?.taskIds.map((taskId) => listState?.tasks[taskId]);
        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  ) : null;
}
