import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <div className="p-10 grid grid-cols-12 gap-4 bg-red-800">
    <App />
  </div>
);
