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
      isEditing: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ newTodo: event.target.value });
  };

  handleAddTodo = () => {
    const { todos, newTodo, editIndex, isEditing } = this.state;

    if (isEditing) {
      if (newTodo.trim() !== '') {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        this.setState({
          todos: updatedTodos,
          newTodo: '',
          editIndex: -1,
          isEditing: false,
        });
      }
    } else {
      if (newTodo.trim() !== '') {
        this.setState({
          todos: [...todos, newTodo],
          newTodo: '',
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
    this.setState({ editIndex: index, newTodo: todoToEdit, isEditing: true });
  };

  handleCancelEdit = () => {
    this.setState({ editIndex: -1, newTodo: '', isEditing: false });
  };

  render() {
    const { todos, newTodo, isEditing } = this.state;

    return (
      <div>
        <h1>Shopping list App</h1>
        <div>
          <input type="text" value={newTodo} onChange={this.handleInputChange} />
          {isEditing ? (
            <div>
              <button onClick={this.handleAddTodo}>Update</button>
              <button onClick={this.handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <button onClick={this.handleAddTodo}>Add things in list</button>
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
