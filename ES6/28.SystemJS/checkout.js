/*
 * @Author: qbenben 
 * @Date: 2019-07-12 15:46:43 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-07-12 15:48:11
 * 自定义模块
 */
export function addTax(amount, taxRate) {
  return amount + (amount * taxRate);
}