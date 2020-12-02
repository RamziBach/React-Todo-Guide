# React Hooks Todo App

<img align="right" src="./src/images/react-brands.svg" width="20%" alt="fontawesome react logo" />

Stylish Todo App.
Add todo items to your list and have a productive day.

- Create
- Read
- Update
- Delete
- Local Storage

<div align="center">
<img src="https://i.gyazo.com/c6c1cc5e8f761ab32f32a911cb01d87a.gif" alt="todo gif" width="80%" />
</div>

## Installation

1. Clone this repo

```bash
git clone https://github.com/RamziBach/Todo.git
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm start
```

## Quick Overview

`Creating` and `Updating` _onSubmit_.
`Reading` and `Deleting` with array manipulations.
Persistence with _Local Storage_.

## Thorough Overview

Let's go through how it's built.
**Excluding the CSS and the Header.**

### Dependencies:

- `ReactJS`

```bash
npx create-react-app my-app
```

- `uuid`

```bash
npm i uuid
```

### HTML

```html
<div id="root"></div>
```

### JavaScript

1. `index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

2. `App.js`

```javascript
import React from 'react';

import Header from './header/Header';
import Todo from './todo/Todo';

import '../style/app.css';

const App = () => {
  return (
    <>
      <Todo />
    </>
  );
};

export default App;
```

3. `Todo.js`

Let's break this one down into bite sized pieces.

- Imports :point_down:

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
```

- Write your component :point_down:

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  return null;
};

export default Todo;
```

- Write your JSX :point_down:

```JavaScript
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={}>
        <input
          ref={}
          onChange={}
          value={}
          maxLength="40"
          placeholder="Enter todo..."
          autocomplete="off"
        />
        <button>Add todo</button>
        <button type="button">Clear</button>
      </form>
      <ul>
        {}
      </ul>
    </div>
  );
};

export default Todo;
```

- Add state :point_down:

```javascript
const [items, setItems] = useState([]); // Empty array
const [text, setText] = useState('');
const [isEditing, setIsEditing] = useState(false);
const [editId, setEditId] = useState('');
```

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={}>
        <input
          ref={}
          onChange={}
          value={text} // added text state to value
          maxLength="40"
          placeholder="Enter todo..."
          autocomplete="off"
        />
        <button>Add todo</button>
        <button type="button">Clear</button>
      </form>
      <ul>{}</ul>
    </div>
  );
};

export default Todo;
```

- Add handle functions :point_down:

```javascript
const handleChange = e => {};
const handleSubmit = e => {};
const handleClear = () => {};
const handleDelete = id => {};
const handleEdit = (id, text) => {};
const handleIsComplete = (id, text, isComplete) => {};
```

```javascript
import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');

  const handleChange = e => {};

  const handleSubmit = e => {};

  const handleClear = () => {};

  const handleDelete = id => {};

  const handleEdit = (id, text) => {};

  const handleIsComplete = (id, text, isComplete) => {};

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        {' '}
        // Added handleSubmit
        <input
          ref={}
          onChange={handleChange} // Added handleChange
          value={text}
          maxLength="40"
          placeholder="Enter todo..."
          autocomplete="off"
        />
        <button>Add todo</button>
        <button
          onClick={handleClear} // Added handleClear
          type="button"
        >
          Clear
        </button>
      </form>
      <ul>{}</ul>
    </div>
  );
};

export default Todo;
```

- Write functions :point_down: (Hard part...)

```javascript
// Setting state to the input value dynamically on every change
const handleChange = e => setText(e.target.value);
```

```javascript
const handleSubmit = e => {
  e.preventDefault(); // Prevent default submit behavior
  if (text.length === 0) return; // Stops submission if nothing is typed in input
  if (isEditing) {
    // Set your state immutably
    // This code will execute when we are editing
    // It will replace our items state with what it had before
    // and make the edit.
    setItems(prevState => {
      const newItems = [...prevState];
      const index = newItems.findIndex(item => item.id === editId);
      newItems.splice(index, 1, { id: uuidv4(), text, isComplete: false });
      return newItems;
    });
    setIsEditing(false);
    setText('');
    setEditId('');
    return; // Leave function after edit
  }
  // Set your state immutably
  // Code here will add new items to state
  setItems(prevState => [
    ...prevState,
    { id: uuidv4(), text, isComplete: false },
  ]);
  setText('');
};
```

```javascript
const handleClear = () => {
  if (isEditing) {
    setIsEditing(false);
    setText('');
    setEditId('');
    return;
  }
  setItems([]); // Deletes everything in our state
};
```

```javascript
const handleDelete = id => {
  // This returns the previous state but without the index we select.
  setItems(prevState => prevState.filter(item => item.id !== id));
};
```

```javascript
const handleEdit = (id, text) => {
  setIsEditing(true);
  setText(text);
  setEditId(id); // This is used in handleSubmit
};
```

```javascript
const handleIsComplete = (id, text, isComplete) => {
  if (isComplete) {
    // Immutability
    setItems(prevState => {
      const newItems = [...prevState];
      const index = newItems.findIndex(item => item.id === id);
      newItems.splice(index, 1, { id: uuidv4(), text, isComplete: false });
      return newItems;
    });
    return;
  }
  // Immutability
  setItems(prevState => {
    const newItems = [...prevState];
    const index = newItems.findIndex(item => item.id === id);
    newItems.splice(index, 1, { id: uuidv4(), text, isComplete: true });
    return newItems;
  });
};
```

- Add ref underneath your state :point_down:

```javascript
const inputRef = useRef(null);
```

```javascript
<input
  ref={inputRef} // Added ref here
  onChange={handleChange}
  value={text}
  maxLength="40"
  placeholder="Enter todo..."
  autocomplete="off"
/>
```

- Add focus to input on Mount :point_down:

```javascript
useEffect(() => inputRef.current.focus(), []);
```

- Finish JSX :point_down:

```javascript
const mapItems = items.map(item => (
  <li key={item.id}>
    {item.text}
    <button onClick={() => handleDelete(item.id)}>Delete</button>
    <button onClick={() => handleEdit(item.id, item.text)}>Edit</button>
    <button
      onClick={() => handleIsComplete(item.id, item.text, item.isComplete)}
    >
      Complete
    </button>
  </li>
));

return (
  <div>
    <h1>Todo</h1>
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        onChange={handleChange}
        value={text}
        maxLength="40"
        placeholder="Enter todo..."
        autocomplete="off"
      />
      <button>{isEditing ? 'Update' : `Add #${items.length + 1}`}</button>
      <button onClick={handleClear} type="button">
        {isEditing ? 'Cancel' : 'Clear'}
      </button>
    </form>
    <ul>{mapItems}</ul>
  </div>
);
```

- Set local storage :point_down:

```javascript
useEffect(() => localStorage.setItem('Items', JSON.stringify(items)), [items]);
```

- Get local storage :point_down:

```javascript
const LOCAL_STORAGE = () => JSON.parse(localStorage.getItem('Items')) || [];
const [items, setItems] = useState(LOCAL_STORAGE);
```
