import React from "react";
import { Breadcrumb } from "react-bootstrap";
import "./UrlBreadcrumb.css";
import { useAppSelector } from "../../app/hooks";
import fulled_star from "../../assets/fulled_star.svg";
import empty_star from "../../assets/empty_star.svg";
import { capitalize } from "../../utils/capitalize";
import { countWatchers } from "../../utils/countWatchers";

const UrlBreadcrumb: React.FC = () => {
  const repositoryInfo = useAppSelector((state) => state.repo);
  
  const { full_name, watchers_count, owner, html_url } = repositoryInfo?.repository ?? { full_name: "Enter/Repo URL", watchers_count: 0 };

  const ownerName = capitalize(full_name.split("/")[0]);
  const repoName = capitalize(full_name.split("/")[1]);
  const watchersCountCheck = watchers_count.toString()[watchers_count.toString().length - 1] !== "1";
  const starts = watchers_count > 1 && watchersCountCheck ? "stars" : "star";
  const watchersCount = countWatchers(watchers_count);

  return (
    <div className='d-flex align-items-center gap-3'>
      <Breadcrumb className='mt-3 custom-breadcrumb'>
        <Breadcrumb.Item href={owner?.html_url} target='_blank'>
          {ownerName}
        </Breadcrumb.Item>
        <Breadcrumb.Item href={html_url} target='_blank'>
          {repoName}
        </Breadcrumb.Item>
      </Breadcrumb>
      <div className='ml-3 d-flex align-items-center gap-1'>
        <img 
          src={repositoryInfo.repository ? fulled_star : empty_star}
          alt="star" 
          style={{ height: "25px", width: "25px" }}
        />
        <p className='mb-0'>
          {watchersCount} {starts}
        </p>
      </div>
    </div>
  );
};

export default UrlBreadcrumb;