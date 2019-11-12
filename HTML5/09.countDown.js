/*
 * @Author: QB
 * @Date: 2019-11-12 15:16:06
 * @LastEditTime: 2019-11-12 15:33:57
 * @LastEditors: Please set LastEditors
 * @Description: 常用倒计时方法
 */

//定义一个setInterval让nowTime每次+1。nowTime可以从服务器中获取

var nowTime = new Date("2019/11/1 10:50:42").getTime();
var targetTime = new Date("2019/11/11 00:00:00").getTime();
/**
 * @param  {} timeStamp 传入目标时间和当前时间的差值时间戳
 */
var activeCountDown = function(timeStamp) {
  var _this = this;
  timeStamp = timeStamp / 1000;
  let timeLimitHours = Math.floor(timeStamp / 3600)
  let timeLimitMinutes = Math.floor((timeStamp - 3600 * timeLimitHours) / 60)

  let day = Math.floor(timeStamp / 86400)
  let hour = Math.floor(timeStamp / 3600)
  let min = Math.floor((timeStamp - 3600 * timeLimitHours) / 60)
  let second = Math.floor(timeStamp - 3600 * timeLimitHours - 60 * timeLimitMinutes)
  //利用mvvm框架绑定视图
  //_this.timeStart.day = day
  //_this.timeStart.hour = hour % 24
  //_this.timeStart.min = min
  //_this.timeStart.second = second
  return `${day}天${hour % 24}时${min}分${second}秒`

  if (day === 0 && hour === 0 && min === 0 && second === 0) {
    //TODO: something
  }
}
console.log(activeCountDown(targetTime - nowTime));