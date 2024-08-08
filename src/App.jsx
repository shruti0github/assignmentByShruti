import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import SearchBooks from "./components/SearchBooks";
import BookList from "./components/List";
import BookModal from "./components/Modal";

function App() {
  const [formState, setFormState] = useState({
    list: [],
    searchText: "",
    sortBy: "DESC",
    isModalOpen: false,
    isEdit: false,
    pageSize: 10,
    pageNumber: 1,
    totalPages: 0,
    bookData: {
      id: null,
      author: null,
      country: null,
      language: null,
      link: null,
      pages: null,
      title: null,
      year: null
    }
  });

  return (
    <div className="App">
      {/* <h1 className="app-title">Book Manager</h1> */}
      <div className="header">
        <div className="left">
          <SearchBooks formState={formState} setFormState={setFormState} />
        </div>
        <div className="right">
          <button
            className="button"
            onClick={() =>
              setFormState((prevState) => ({
                ...prevState,
                isModalOpen: true
              }))
            }
          >
            Add Books
          </button>
        </div>
      </div>
      <div className="list-container" >
        <BookList formState={formState} setFormState={setFormState} />
      </div>
      <BookModal formState={formState} setFormState={setFormState} />
    </div>
  );
}

export default App;
