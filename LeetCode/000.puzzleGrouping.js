/*
 * @Author: qbenben 
 * @Date: 2019-09-24 22:34:44 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-09-24 22:58:55
 * 字谜分组
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
 * 输入: ["eat", "tea", "tan", "ate", "nat", "bat"],
 * 输出:
 * [
 * ["ate","eat","tea"],
 * ["nat","tan"],
 * ["bat"]
 * ]
 * 说明：
 * 所有输入均为小写字母。
 * 不考虑答案输出的顺序。
 */
var strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];

var groupAnagrams = function(strs) {
  //1.设置一个map记录字符串出现的情况
  let map = new Map();
  // 2. 设置最终返回的数组
  let result = [];
  // 3. 遍历所有字符串
  for (let i = 0; i < strs.length; i++) {
    // 3.1 将其进行排序
    const sortStrs = strs[i].split('').sort().join();
    if (map.get(sortStrs) !== undefined) {
      // 3.3 如果它存在，那么添加新元素
      result[map.get(sortStrs)].push(strs[i]);
    } else {
      // 3.2 如果它不存在，那么使用 Map 标记它，并且设置一个数组
      map.set(sortStrs, result.length);
      result.push([strs[i]]);
    }
  }
  console.log(result);
  return result;
}
console.log(groupAnagrams(strs));