import React from 'react';
import ReactDom from 'react-dom';

//使用TS,校验类型
interface IProps {
  num: number
}
let initState = { count: 0 };
type State = Readonly<typeof initState>
class Counter extends React.Component<IProps, State>{
  state: State = initState;
  handleClick = () =>{
    this.setState({count: this.state.count+1})
  }
  reader() {
    return <div>
    {this.state.count}
      <button onClick={this.handleClick}>点击</button>
    </div>
  }
}
ReactDom.render(<Counter/>,document.getElementById('root'));
