import { useState } from "react";
import handleImageUpload from "../functions/server_functions.js";
const App = () => {
  const [serverMessage, setServerMessage] = useState("");

  const onSubmit = async (e) => {
    const message = await handleImageUpload(e);
    setServerMessage(message);
  };

  return (
    <div className="col-start-3 text-center col-span-8 p-5">
      <form
        className="flex flex-col gap-4 max-w-md mx-auto p-6 rounded-xl border border-gray-200 bg-white shadow-sm"
        onSubmit={onSubmit}
        enctype="multipart/form-data"
      >
        <label htmlFor="file_image" className="text-sm font-medium text-gray-700">
          Upload an image
        </label>
        <input
          type="file"
          id="file_image"
          name="file_image"
          accept="image/*"
          multiple
          className="text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100 file:cursor-pointer cursor-pointer border border-gray-200 rounded-lg p-2"
        />
        <label htmlFor="term_start_date" className="text-sm font-medium text-gray-700">
          Term Start Date
        </label>
        <input
          type="date"
          id="term_start_date"
          name="term_start_date"
          className="text-sm text-gray-600 border border-gray-200 rounded-lg p-2"
        />
        <label htmlFor="term_end_date" className="text-sm font-medium text-gray-700">
          Term End Date
        </label>
        <input
          type="date"
          id="term_end_date"
          name="term_end_date"
          className="text-sm text-gray-600 border border-gray-200 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 px-4 transition-colors"
        >
          Upload
        </button>
      </form>
      {serverMessage && <p className="mt-4">{serverMessage}</p>}
    </div>
  );
};

export default App;
