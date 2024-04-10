import { ToastContainer } from "react-toastify";
import { KanbanBoard } from "./components/KanbanBoard";
import { UrlBreadcrumb } from "./components/UrlBreadcrumb";
import { UrlForm } from "./components/UrlForm";
import "react-toastify/dist/ReactToastify.css";

export const App: React.FC = () => {
  return (
    <div className='container'>
      <UrlForm />
      <UrlBreadcrumb />
      <KanbanBoard />
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
