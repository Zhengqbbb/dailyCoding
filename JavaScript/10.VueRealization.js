/*
 * @Author: Qbenben
 * @Date: 2020-03-30 22:42:19
 * @LastEditors: Qbenben
 * @LastEditTime: 2020-03-30 23:34:17
 * @Description: Vue响应式实现
 * 所以响应式原理就是，我们通过递归遍历，
 * 把vue实例中data里面定义的数据，
 * 用defineReactive（Object.defineProperty）重新定义。
 * 每个数据内新建一个Dep实例，闭包中包含了这个 Dep 类的实例，
 * 用来收集 Watcher 对象。
 * 在对象被「读」的时候，
 * 会触发 reactiveGetter 函数把当前的 Watcher 对象（存放在 Dep.target 中）收集到 Dep 类中去。
 * 之后如果当该对象被「写」的时候，
 * 则会触发 reactiveSetter 方法，
 * 通知 Dep 类调用 notify 来触发所有 Watcher 对象的 update 方法更新对应视图。
 */


/**
 * @description: Vue的响应式实现
 * enumerable，属性是否可枚举，默认 false。
 * configurable，属性是否可以被修改或者删除，默认 false。
 * get，获取属性的方法。
 * set，设置属性的方法。
 * @param {type} 
 * @return: 
 */
class Vue {
  //Vue的构造类
  constructor(options) {
    this._data = options.data;
    observer(this._data);
  }
}
//-----------------------发布者---------------------------
function observer(value) {
  if (!value || (typeof value !== 'object')) {
    return
  }

  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key]);
  });
}
//defineReactive函数，Observe的核心，劫持数据，
//在getter中向Dep（调度中心）添加观察者，在setter中通知观察者更新。
function defineReactive(obj, key, val, customSetter, shallow) {
  //关键点： 在闭包中声明一个Dep实例， 用于保存watcher实例
  const dep = new Dep();
  const propert = Object.getOwnPropertyDescriptor(obj, key)
  if (propert && propert.configurable === false) return;

  const getter = propert && propert.get;
  const setter = propert && propert.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observer(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
    },
    setter: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      if (newVal === value || (newVal !== newVal && value !== value)) return;
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observer(newVal)
      //通知
      dep.notify()
    }
  })
}

//依赖收集 调度器
/**Dep 扮演的角色是调度中心/订阅器，
 * 主要的作用就是收集观察者Watcher和通知观察者目标更新。
 * 每个属性拥有自己的消息订阅器dep，用于存放所有订阅了该属性的观察者对象，
 * 当数据发生改变时，会遍历观察者列表（dep.subs），
 * 通知所有的watch，让订阅者执行自己的update逻辑。
 */

class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub) {
    remove(this.subs, sub)
  }
  //依赖收集
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  //通知
  notify() {
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].updata()
    }
  }
}

/**
 * Watcher扮演的角色是订阅者/观察者，
 * 他的主要作用是为观察属性提供回调函数以及收集依赖（如计算属性computed，vue会把该属性所依赖数据的dep添加到自身的deps中），
 * 当被观察的值发生变化时，会接收到来自dep的通知，从而触发回调函数。
 * 实现自动添加依赖
 */
class Watch {
  constructor(vm, expOrFn, cb, options) {
    this.vm = vm
    //在Vue中cb是更新视图的核心，调用diff并更新视图的过程
    this.cb = cb;
    //收集Deps，用于移除监听
    this.newDeps = []
    this.getter = expOrFn
    //设置Dep.target的值，依赖收集watcher对象
    this.value = this.get()
  }
  get() {
    //设置Dep。target值，用于依赖收集
    pushTartget(this);
    const vm = this.vm;
    let value = this.getter.call(vm, vm);
    return value
  }
  //添加依赖
  addDep(dep) {
    //Vue中做了重复筛选，依赖只手机一次。不重复收集依赖
    this.newDeps.push(dep);
    dep.addSub(this)
  }
  //更新依赖
  updata() {
    this.run;
  }
  //更新视图
  run() {
    //这里Vue调用diff算法从而更新视图
    console.log('这里会去执行Vue的diff相关方法，进而更新数据');
  }
}