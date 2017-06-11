import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    // 初始化时间
    this.state = {
      hour:new Date().getHours(),
      minute:new Date().getMinutes(),
      second:new Date().getSeconds(),
    }
  }
  // dom尚未渲染到html时的生命周期函数
  componentWillMount(){
    var f = function () {
      // get the current time
      var date = new Date();
      this.setState({
        hour:date.getHours(),
        minute:date.getMinutes(),
        second:date.getSeconds(),
      })
    }.bind(this);
    f;
    // 没隔一秒刷新一次时间
    setInterval(f,1000);
  }
  render() {
    // 计算出时针、分针、秒针各自的应该旋转的角度
    var hourAngle = (this.state.hour % 12 + this.state.minute / 60) * (360 / 12);
    var minuteAngle = (this.state.minute + this.state.second / 60 ) * (360 / 60);
    var secondAngle = this.state.second * (360 / 60);
    // 将时钟上的刻度画出来，并在return的DOM里加入arr，jsx的机制会自动将其展开
    var arr = new Array(60);
    for (let i = 0 ; i < 60 ; i++){
      arr[i] = <li key={i} style={{transform:'rotate('+(i*6)+'deg'}}/>;
    }
    // h2中的那些操作是为了保证时间的每一部分两位对齐，因此如果是个位数要在前面补一个0
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="clock">
          <ul>{arr}</ul>
          <span className="hour" style={{transform:'rotate('+ hourAngle+'deg)'}}/>
          <span className="minute" style={{transform:'rotate('+ minuteAngle+'deg)'}}/>
          <span className="second" style={{transform:'rotate('+ secondAngle+'deg)'}}/>
        </div>
        <h2 className="info">当前时间 {(new Array(2).join('0') + this.state.hour).slice(-2)}:{(new Array(2).join('0') + this.state.minute).slice(-2)}:{(new Array(2).join('0') + this.state.second).slice(-2)}</h2>
      </div>
    );
  }
}

export default App;
