import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { IssueInfo } from "../IssueInfo/IssueInfo";
import { actions } from "../../features/issues.slice";

export const KanbanBoard: React.FC = () => {
  const repository = useAppSelector((state) => state.repo.repository);
  const issues = useAppSelector((state) => state.issues.issues);
  const dispatch = useAppDispatch();
  const tableNames = ["Todo", "In Progress", "Done"];
  const owner = repository?.full_name.split("/")[0];
  const repo = repository?.full_name.split("/")[1];

  function onDragEnd(result: DropResult): void {
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
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='row'>
          {issues.map((el, index) => (
            <Droppable key={tableNames[index]} droppableId={`${index}`}>
              {(provided) => (
                <div className='col-4' ref={provided.innerRef} {...provided.droppableProps}>
                  <div className="d-flex justify-content-between">
                    <h4>{tableNames[index]}</h4>
                    <h4>{el.length}</h4>
                  </div>
                  <div className='card border border-dark' style={{ height: "calc(100vh - 200px)", overflow: "auto"}}>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className='card-body'>
                      {el.map((issue, innerIndex) => (
                        <Draggable key={issue.id} draggableId={issue.id.toString()} index={innerIndex}>
                          {(providedDrag) => (
                            <div
                              ref={providedDrag.innerRef}
                              {...providedDrag.draggableProps}
                              {...providedDrag.dragHandleProps}
                            >
                              <IssueInfo issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};
