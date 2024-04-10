import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { IssueNormalized } from "../../types/IssueNormalized";
import { IssueInfo } from "../IssueInfo";

interface Props {
  issueType: IssueNormalized[];
  index: number;
  tableNames: string[];
}

const IssueTable: React.FC<Props> = ({ issueType, index, tableNames }) => {

  return (
    <Droppable droppableId={`${index}`}>
      {(provided) => (
        <div
          className='col-4'
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="d-flex justify-content-between">
            <h4>{tableNames[index]}</h4>
            <h4>{issueType.length}</h4>
          </div>
          <div
            className='card border border-dark'
            style={{
              height: "calc(100vh - 200px)",
              overflow: "auto"
            }}
          >
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className='card-body'
            >
              {issueType.map((issue, innerIndex) => (
                <Draggable
                  key={issue.id}
                  draggableId={issue.id.toString()}
                  index={innerIndex}
                >
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
  );
};

export default IssueTable;