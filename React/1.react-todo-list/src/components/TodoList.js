import React, {Component} from 'react'
import TodoItem from './TodoItem'

export default class TodoList extends Component {
  render() {
    const {items, clearList, handleDelete, handleEdit} = this.props
    return (
      <ul className="list-group my-5">
        <h3 className="text-capitalize text-center">todo list</h3>
        {
          items.map(list_item => {
            return <TodoItem key={list_item.id} 
            item={list_item.item}
            handleDelete={()=> handleDelete(list_item.id)}
            handleEdit={()=> handleEdit(list_item.id)}
            />;
          })
        }

        <button type="button" 
        className="btn btn-danger btn-block text-capitalize mt-3"
        onClick={clearList}>clear list</button>
      </ul>
    )
  }
}
