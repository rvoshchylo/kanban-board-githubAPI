import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { actions } from "../../features/issues.slice";
import { IssueTable } from "../IssueTable";

const KanbanBoard: React.FC = () => {
  const repository = useAppSelector((state) => state.repo.repository);
  const issues = useAppSelector((state) => state.issues.issues);
  const dispatch = useAppDispatch();

  const tableNames = ["Todo", "In Progress", "Done"];

  const owner = repository?.full_name.split("/")[0];
  const repo = repository?.full_name.split("/")[1];

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    
    const sourceId = +source.droppableId;
    const destinationId = +destination.droppableId;

    const movedIssue = issues[sourceId][source.index];
    const issueState = destinationId === 0 ? "open" : destinationId === 1 ? "in progress" : "closed";
    if (sourceId !== destinationId) {      
      dispatch(actions.move({ id: movedIssue.id, status: issueState, sourceId,  destinationIndex: destination.index, owner, repo }));
    }
    else {
      dispatch(actions.reorder({ sourceId, destinationId, sourceIndex: source.index, destinationIndex: destination.index, owner, repo }));
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='row'>
          {issues.map((issueType, index) => (
            <IssueTable
              issueType={issueType}
              index={index}
              key={index}
              tableNames={tableNames}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
