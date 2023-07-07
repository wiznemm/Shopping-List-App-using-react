import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    const { todo, onDelete, onEdit } = this.props;

    return (
      <li>
        {todo}
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </li>
    );
  }
}

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: '',
      editIndex: -1,
    };
  }

  componentDidMount() {
    // You can add any initial data fetching or setup logic here
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAddTodo = () => {
    const { todos, newTodo, editIndex } = this.state;
    if (newTodo.trim() !== '') {
      if (editIndex === -1) {
        // Add new todo
        this.setState({
          todos: [...todos, newTodo],
          newTodo: '',
        });
      } else {
        // Update existing todo
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        this.setState({
          todos: updatedTodos,
          newTodo: '',
          editIndex: -1,
        });
      }
    }
  };

  handleDeleteTodo = (index) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter((_, i) => i !== index);
    this.setState({ todos: updatedTodos });
  };

  handleEditTodo = (index) => {
    const { todos } = this.state;
    const todoToEdit = todos[index];
    this.setState({ editIndex: index, newTodo: todoToEdit });
  };

  handleCancelEdit = () => {
    this.setState({ editIndex: -1, newTodo: '' });
  };

  render() {
    const { todos, newTodo, editIndex } = this.state;

    return (
      <div>
        <h1>Shopping list App</h1>
        <div>
          <input type="text" value={newTodo} onChange={this.handleInputChange} />
          <button onClick={this.handleAddTodo}>
            {editIndex === -1 ? 'Add things in list' : 'Update'}
          </button>
          {editIndex !== -1 && (
            <button onClick={this.handleCancelEdit}>Cancel</button>
          )}
        </div>
        <ul>
          {todos.map((todo, index) => (
            <TodoItem
              key={index}
              todo={todo}
              onDelete={() => this.handleDeleteTodo(index)}
              onEdit={() => this.handleEditTodo(index)}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Todo;
