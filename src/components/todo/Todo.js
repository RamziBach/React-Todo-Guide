import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const LOCAL_STORAGE = () => JSON.parse(localStorage.getItem('Items')) || [];
  const [items, setItems] = useState(LOCAL_STORAGE);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const inputRef = useRef(null);

  const handleChange = e => setText(e.target.value);

  const handleClear = () => {
    inputRef.current.focus();
    if (isEditing) {
      setIsEditing(false);
      setText('');
      setEditId('');
      return;
    }
    setItems([]);
  };

  const handleDelete = id => {
    inputRef.current.focus();
    setItems(prevState => prevState.filter(item => item.id !== id));
  };

  const handleEdit = (id, text) => {
    inputRef.current.focus();
    setIsEditing(true);
    setText(text);
    setEditId(id);
  };

  const handleDone = (id, text, isComplete) => {
    inputRef.current.focus();
    if (isComplete) {
      setItems(prevState => {
        const newItems = [...prevState];
        const index = newItems.findIndex(item => item.id === id);
        newItems.splice(index, 1, { id: uuidv4(), text, isComplete: false });
        return newItems;
      });
      return;
    }
    setItems(prevState => {
      const newItems = [...prevState];
      const index = newItems.findIndex(item => item.id === id);
      newItems.splice(index, 1, { id: uuidv4(), text, isComplete: true });
      return newItems;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    inputRef.current.focus();
    if (text.length === 0) return;
    if (isEditing) {
      setItems(prevState => {
        const newItems = [...prevState];
        const index = newItems.findIndex(item => item.id === editId);
        newItems.splice(index, 1, { id: uuidv4(), text, isComplete: false });
        return newItems;
      });
      setIsEditing(false);
      setText('');
      setEditId('');
      return;
    }
    setItems(prevState => [
      ...prevState,
      { id: uuidv4(), text, isComplete: false },
    ]);
    setText('');
  };

  useEffect(() => inputRef.current.focus(), []);

  useEffect(() => localStorage.setItem('Items', JSON.stringify(items)), [
    items,
  ]);

  const listStyles = {
    textDecoration: 'line-through',
    fontStyle: 'italics',
    fontWeight: '700',
  };

  return (
    <div className="todo">
      <div className="lg-container">
        <div className="todo-parent">
          <div className="todo-child">
            <h1>Todo</h1>
            <form onSubmit={handleSubmit} className="todo-form">
              <input
                ref={inputRef}
                onChange={handleChange}
                value={text}
                className="text"
                id="text"
                name="text"
                maxLength="40"
                placeholder="Enter todo..."
                autoComplete="off"
              />
              <div className="todo-btn_container">
                <button className="todo-btn btn-border">
                  {isEditing ? 'Update' : `Add #${items.length + 1}`}
                </button>
                <button
                  onClick={handleClear}
                  className="todo-btn btn-bg"
                  type="button"
                >
                  {isEditing ? 'Cancel' : 'Clear'}
                </button>
              </div>
            </form>
            <ul className="items-ul">
              {items.length === 0 ? (
                <span className="notepad-span">
                  <i className="notepad fas fa-clipboard-list"></i>
                  <h3>Add Todos Above</h3>
                </span>
              ) : (
                items.map(item => (
                  <li
                    style={item.isComplete ? listStyles : {}}
                    className="items"
                    key={item.id}
                  >
                    {item.text}
                    <div>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="ibtn"
                        disabled={isEditing ? true : false}
                      >
                        <span>
                          <i className="fas fa-trash-alt"></i>
                        </span>
                      </button>
                      <button
                        onClick={() => handleEdit(item.id, item.text)}
                        className="ibtn"
                        disabled={isEditing ? true : false}
                      >
                        <span>
                          <i className="fas fa-edit"></i>
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          handleDone(item.id, item.text, item.isComplete)
                        }
                        className="ibtn"
                        disabled={isEditing ? true : false}
                      >
                        <span>
                          <i className="fas fa-check-square"></i>
                        </span>
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
