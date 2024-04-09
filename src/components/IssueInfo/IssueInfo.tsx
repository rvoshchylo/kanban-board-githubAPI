import React from "react";
import { daysAgo } from "../../utils/countDaysAgo";
import { IssueNormalized } from "../../types/IssueNormalized";

export const IssueInfo: React.FC<{ issue: IssueNormalized }> = ({ issue }) => {
  const { title, number, user, comments, created_at } = issue;

  const days = daysAgo(created_at);

  return (
    <div className='card-body d-flex flex-column gap-3'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='mb-4'>
            {title}
          </h5>
          <p>{`#${number} opened ${days} days ago`}</p>
          <p>{`${user.login} | Comments: ${comments}`}</p>
        </div>
      </div>
    </div>
  );
};