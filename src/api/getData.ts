import axios from "axios";
import { Repository } from "../types/Repository";
import { Issue } from "../types/Issue";
import { RepositoryNormalized } from "../types/RepositoryNormalized";
import { IssueNormalized } from "../types/IssueNormalized";

export const getRepoData = async (owner: string, repo: string): Promise<RepositoryNormalized>  => {
  try {
    const repoResponse = await axios.get<Repository>(`https://api.github.com/repos/${owner}/${repo}`);
    return { 
      full_name: repoResponse.data.full_name, 
      watchers_count: repoResponse.data.watchers_count,
      owner: {
        html_url: repoResponse.data.owner.html_url,
      },
      html_url: repoResponse.data.html_url,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const getIssuesData = async (owner: string, repo: string): Promise<IssueNormalized[][]> => {
  try {
    const issuesResponse = await axios.get<Issue[]>(`https://api.github.com/repos/${owner}/${repo}/issues`);
    const unsortedIssues =  issuesResponse.data.map(issue => ({
      title: issue.title,
      state: issue.state,
      user: issue.user,
      created_at: issue.created_at,
      number: issue.number,
      comments: issue.comments,
      id: issue.id,
    }));

    const todo = unsortedIssues.filter(issue => issue.state === "open");
    const inProgress = unsortedIssues.filter(issue => issue.state === "in progress");
    const done = unsortedIssues.filter(issue => issue.state === "done");

    return [todo, inProgress, done];
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};