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
        className="flex flex-col gap-2"
        onSubmit={onSubmit}
        enctype="multipart/form-data"
      >
        <label htmlFor="file_image">Image:</label>
        <input
          type="file"
          id="file_image"
          name="file_image"
          accept="image/*"
          className="border-1 border-black p-2"
        />
        <button type="submit" className="border-1 border-black p-2">
          send that shit
        </button>
      </form>
      {serverMessage && <p>{serverMessage}</p>}
    </div>
  );
};

export default App;
