import React, { useState } from "react";
import "./Modal.css";
import { registerBookData, editBookData } from "../api/apiCall";

const Modal = ({ formState, setFormState }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      bookData: {
        ...formState.bookData,
        [name]: value,
      },
    });
  };

  const handleSave = async () => {
    const payload = {
      author: formState.bookData.author,
      country: formState.bookData.country,
      language: formState.bookData.language,
      link: formState.bookData.link,
      pages: formState.bookData.pages,
      title: formState.bookData.title,
      year: formState.bookData.year,
    };
    const response = await registerBookData(payload);
    if (response.status === 200) {
      closeModal();
    }
  };

  const handleEdit = async () => {
    const payload = {
      author: formState.bookData.author,
      country: formState.bookData.country,
      language: formState.bookData.language,
      link: formState.bookData.link,
      pages: formState.bookData.pages,
      title: formState.bookData.title,
      year: formState.bookData.year,
    };
    const response = await editBookData(formState.bookData.id, payload);
    if (response.status === 200) {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setFormState((prevState) => ({
        ...prevState,
        isModalOpen: false,
        isEdit: false,
        bookData: {
          id: null,
          author: "",
          country: "",
          language: "",
          link: "",
          pages: "",
          title: "",
          year: "",
        },
      }));
      setIsClosing(false);
    }, 300); // Duration of the fade-out animation
  };

  return (
    formState.isModalOpen && (
      <div className={`modal-overlay ${isClosing ? "hidden" : ""}`}>
        <div className="modal-content">
          <h1>{formState.isEdit ? "Edit Book Data" : "Add Book Data"}</h1>
          <div className="grid">
            <div>
              <label>Author:</label>
              <input
                className="input-tag"
                type="text"
                name="author"
                value={formState.bookData.author}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Country:</label>
              <input
                className="input-tag"
                type="text"
                name="country"
                value={formState.bookData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Language:</label>
              <input
                className="input-tag"
                type="text"
                name="language"
                value={formState.bookData.language}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Link:</label>
              <input
                className="input-tag"
                type="text"
                name="link"
                value={formState.bookData.link}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Pages:</label>
              <input
                className="input-tag"
                type="number"
                name="pages"
                value={formState.bookData.pages}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Title:</label>
              <input
                className="input-tag"
                type="text"
                name="title"
                value={formState.bookData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Year:</label>
              <input
                className="input-tag"
                type="number"
                name="year"
                value={formState.bookData.year}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-buttons">
            {formState.isEdit ? (
              <button type="button" onClick={handleEdit}>
                Edit
              </button>
            ) : (
              <button type="button" onClick={handleSave}>
                Save
              </button>
            )}
            <button type="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
