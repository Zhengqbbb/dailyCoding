/*
 * @Author: qbenben 
 * @Date: 2019-08-15 23:44:50 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-08-18 17:47:52
 * 手写Promise
 */
//---------------------------Promise实现-简单-------------
class PromiseM {
  constructor(process) {
    this.status = 'pengding';
    this.msg = '';
    process(this.resolve.bind(this), this.reject.bind(this));
    return this;
  }
  resolve(val) {
    this.status = 'fulfilled';
    this.msg = val;
  }
  reject(err) {
    this.status = 'rejected'
    this.msg = err;
  }
  then(fulfilled, reject) {
    if (this.status === 'fulfilled') {
      fulfilled(this.msg);
    }
    if (this.status === 'rejected') {
      reject(this.msg)
    }
  }
}
//test
var mm = new PromiseM(function(resolve, reject) {
  resolve('123');
});
mm.then(function(success) {
  console.log(success);
}, function() {
  console.log('fail!');
});




//---------------------------Promise实现原理-全-------------
//判断变量是否为function
const isFunction = variable => typeof variable === 'function';

//定义Promise的三个状态常量Pending(进行中),Fulfilled(已成功),Rejected(已失败)
const PENGDING = 'PENGDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
  constructor(handle) {
    if (!isFunction(handle)) {
      throw new Error('MyPromise must accept a function as a parameter')
    }
    //添加状态
    this._status = PENGDING;
    //添加状态
    this._value = undefined;
    //添加成功回调函数队列
    this._fulfilledQueues = [];
    //添加失败回调函数队列
    this._rejectedQueues = [];
    //执行handle
    try {
      handle(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err)
    }
  }

  // 添加resovle时执行的函数
  _resolve(val) {
    const run = () => {
      if (this._status !== PENGDING) return;
      // 依次执行成功队列中的函数，并清空队列
      const runFulfilled = (value) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value);
        }
      }
      // 依次执行失败队列中的函数，并清空队列
      const runRejected = (err) => {
        let cb;
        while (cb = this._rejectedQueues.shift()) {
          cb(err);
        }
      }
      /* 
          如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
      */
      if (val instanceof MyPromise) {
        val.then(value => {
          this._value = value;
          this._status = FULFILLED;
          runFulfilled(value);
        }, err => {
          this._value = err;
          this._status = REJECTED;
          runRejected(err)
        })
      } else {
        this._value = val;
        this._status = FULFILLED;
        runFulfilled(val);
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  //添加reject时执行的函数
  _reject(err) {
    if (this._status !== PENGDING) return;
    const run = () => {
      this._status = REJECTED;
      this._value = err;
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(err)
      }
    }
    // 为了支持同步的Promise，这里采用异步调用
    setTimeout(run, 0);
  }
  // 添加then方法
  then(onFulfilled, onRejected) {
    const { _value, _status } = this
    // 返回一个新的Promise对象
    return new MyPromise((onFulfilledNext, onRejectedNext) => {
      // 封装一个成功时执行的函数
      let fulfilled = value => {
        try {
          if (!isFunction(onFulfilled)) {
            onFulfilledNext(value)
          } else {
            let res = onFulfilled(value);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      // 封装一个失败时执行的函数
      let rejected = error => {
        try {
          if (!isFunction(onRejected)) {
            onRejectedNext(error)
          } else {
            let res = onRejected(error);
            if (res instanceof MyPromise) {
              // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
              res.then(onFulfilledNext, onRejectedNext)
            } else {
              //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
              onFulfilledNext(res)
            }
          }
        } catch (err) {
          // 如果函数执行出错，新的Promise对象的状态为失败
          onRejectedNext(err)
        }
      }
      switch (_status) {
        // 当状态为pending时，将then方法回调函数加入执行队列等待执行
        case PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
          break
          // 当状态已经改变时，立即执行对应的回调函数
        case FULFILLED:
          fulfilled(_value)
          break
        case REJECTED:
          rejected(_value)
          break
      }
    })
  }
  // 添加catch方法
  catch (onRejected) {
    return this.then(undefined, onRejected)
  }
  // 添加静态resolve方法
  static resolve(value) {
    // 如果参数是MyPromise实例，直接返回这个实例
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
  // 添加静态reject方法
  static reject(value) {
    return new MyPromise((resolve, reject) => reject(value))
  }
  // 添加静态all方法
  static all(list) {
    return new MyPromise((resolve, reject) => {
      /**
       * 返回值的集合
       */
      let values = []
      let count = 0
      for (let [i, p] of list.entries()) {
        // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
        this.resolve(p).then(res => {
          values[i] = res
          count++
          // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
          if (count === list.length) resolve(values)
        }, err => {
          // 有一个被rejected时返回的MyPromise状态就变成rejected
          reject(err)
        })
      }
    })
  }
  // 添加静态race方法
  static race(list) {
    return new MyPromise((resolve, reject) => {
      for (let p of list) {
        // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
        this.resolve(p).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }
    })
  }
  finally(cb) {
    return this.then(
      value => MyPromise.resolve(cb()).then(() => value),
      reason => MyPromise.resolve(cb()).then(() => { throw reason })
    );
  }
}


/* ---------------------------2020.3.17Promise实现------------- */
//宏
const PENDING = 'PENGDING'; //等待态
const FULFILLED = 'FULFILLED'; //成功态
const REJECTED = 'REJECTED'; //失败态
/**
 * @description: 专门处理x的状态
 * @param {x} promise2
 * @param {x} x
 * @param {x} resolve
 * @param {x} reject
 */
const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('返回同一个promise，我不可能等待我自己'))
  }
  /* ------判断x的状态 判断x是不是一个promise----- */
  //1.先判断是不是对象或者函数
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let called; //为了考虑别人的promise不健壮，需要自己判断一下，如果调用成功就不能失败，如果调用失败就不能成功
    //有没有then方法
    try {
      let then = x.then; //取出then ， 如果这个then抛出异常时采用defineProperty
      if (typeof then === 'function') {
        //判断then是不是一个函数，如果then不是一个函数，说明不是promise
        //只能认定他是一个promise
        then.call(x, y => { //如果y也是一个promise，就继续递归
          //防止别人多次调用resolve和reject添加一个锁
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    //肯定不是promise
    resolve(x)
  }
}
class Promise {
  constructor(executor) {
    this.status = 'PENGDING';
    //把值或者原因挂载到实例上
    this.value = undefined;
    this.reason = undefined;
    //定义两个数组事件池，然后将成功和失败的回调放入其中，订阅起来，当then的时候触发
    this.onResolveCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (value) => {
      //如果用户传进来一个promise就一直解析，解析出一个普通值
      if (value instanceof Promise) {
        return value.then(resolve, reject)
      }
      if (this.status === PENGDING) {
        this.status = FULFILLED;
        this.value = value;
        //发布
        this.onResolveCallbacks.forEach(fn => fn())
      }
    }
    let rejected = (reason) => {
      if (this.status === PENGDING) {
        this.status = REJECTED;
        this.reason = reason;
        //发布
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    //executor执行的时候 需要传入两个参数，给用户来改变状态的
    //当前如果抛出错误的话就会被捕获
    //只能捕获同步异常
    try {
      executor(resolve, rejected);
    } catch (e) {
      rejected(e)
    }
  }
  //then方法的实现
  //这里的then可以理解为订阅，而用户调用resolve和reject的时候相当于发布
  then(onFulfilled, onRejected) {
    //当用户不传参的时候，直接穿透给下一个,注意reject不传参的话应该抛出错误，不然会作为下一次成功的参数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    //链式调用时要返回一个新的promise
    /* 链式调用的三种情况：
     * 1.如果返回的是一个promise，那么会让这个promise执行，并且采用他的状态，将成功或者失败的结果传递给外层的的下一个then中
     * 2.如果返回的是一个普通值则会将这个值作为下一次then的成功回调中
     * 3.抛出一个异常用
     */
    //x 为普通值的话，x就会作为下一个then中的成功态的参数
    let promise2 = new Promise((resolve, rejected) => {
      if (this.status === FULFILLED) {
        //setTimeout确保 promise2 new出来过后再作为参数传入resolvePromise
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, rejected)
          } catch (e) {
            rejected(e)
          }
        }, 0)
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, rejected)
          } catch (e) {
            rejected(e)
          }
        }, 0)
      }
      //订阅各种异步函数
      if (this.status === PENGDING) {
        //利用AOP思想往代码里面加东西
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, rejected)
            } catch (e) {
              rejected(e)
            }
          }, 0)
        })
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, rejected)
            } catch (e) {
              rejected(e)
            }
          }, 0);
        })
      }
    })

    return promise2;
  }

  //catch方法的实现:没有成功的回调
  catch (errCallback) {
    return this.then(null, errCallback)
  }
}

//---------------------------Promise.all的实现-------------
const isPormise = value => {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    return value.then === 'function';
  }
  return false;
}
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let i = 0;
    let processData = (index, data) => {
      arr[index] = data;
      if (++i === promises.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < arpromisesr.length; i++) {
      let current = promises[i];
      if (isPormise(current)) {
        current.then(data => {
          processData(i, data)
        }, reject)
      } else {
        processData(i, current)
      }
    }
  })

}
module.export = Promise;