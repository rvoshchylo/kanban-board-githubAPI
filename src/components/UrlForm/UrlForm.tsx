import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import * as RepoSlice from "../../features/repository.slice";
import * as issuesSlice from "../../features/issues.slice";
import { useAppDispatch } from "../../app/hooks";
import { isValidGithubUrl } from "../../utils/isValidGithubUrl";
import axios from "axios";
import { toast } from "react-toastify";

export const UrlForm: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>("");
  const dispatch = useAppDispatch();


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!isValidGithubUrl(repoUrl)) {
      toast.error("Please enter a valid GitHub repository URL.");
      return;
    }
    const urlParts = repoUrl.split("/");
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];
  
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
      if (response.status !== 200) {
        toast.error("The repository does not exist.");
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
        toast.error("The repository does not exist.");
        return;
      }
      toast.error("An error occurred.");
      return;
    }
    const issues = sessionStorage.getItem(`issues-${owner}-${repo}`);

    if (issues) {
      dispatch(issuesSlice.actions.setIssues(JSON.parse(issues)));
    } else {
      dispatch(issuesSlice.init({ owner, repo }));
    }
  
    dispatch(RepoSlice.init({ owner, repo }));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className='container d-flex gap-3 mt-3 p-0'>
      <Form.Control
        type="form" 
        placeholder="Enter repo URL"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <Button
        type='submit' 
        variant="outline-primary"
        className='text-nowrap'
      >
      Load issues
      </Button>
    </Form>
  );
};