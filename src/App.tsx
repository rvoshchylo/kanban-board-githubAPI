import { ToastContainer } from "react-toastify";
import { KanbanBoard } from "./components/KanbanBoard/KanbanBoard";
import { UrlBreadcrumb } from "./components/UrlBreadcrumb/UrlBreadcrumb";
import { UrlForm } from "./components/UrlForm/UrlForm";
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
