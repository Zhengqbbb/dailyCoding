import React, {Component} from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: '',
    editItem: false
  };

  /**
   * 为InputItem监听 input 的变化
   * @memberof App
   */
  handleChange = e => {
    this.setState({item: e.target.value});
  };

   /**
   * 为InputItem的表单提交
   * @returns
   * @memberof App
   */
  handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      id: this.state.id,
      item: this.state.item
    }
    const updataItems = [...this.state.items,newItem]
    this.setState({
      items: updataItems, 
      item: '',
      id:uuid(),
      editItem:false
    });
  };

  /**
   * 为TodoList的所有ToItems清除
   * @memberof App
   */
  clearList = ()=>{
    this.setState({
      items:[]
    })
  };

  /**
   *为TodoList的ToItem删除
   * @memberof App
   */
  handleDelete = id =>{
    const filteredItems = this.state.items.filter(item =>
    item.id !== id);
    this.setState({
      items: filteredItems
    });
  };

  /**
   *为TodoList的ToItem编辑修改
   * @memberof App
   */
  handleEdit = id =>{
    const filteredItems = this.state.items.filter(item =>
    item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items: filteredItems,
      item: selectedItem.item,
      editItem: true,
      id: id
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">todo input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList 
            items={this.state.items} 
            clearList={this.clearList} 
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );

  }
}

export default App;