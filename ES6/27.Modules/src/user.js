/*
 * @Author: qbenben 
 * @Date: 2019-07-12 13:22:12 
 * @Last Modified by: qbenben
 * @Last Modified time: 2019-07-12 13:31:47
 */
import slug from 'slug';
import { url } from './config';

/**
 * @param  {} name
 * @param  {} email
 * 生成用户实例
 */
export default function User(name, email) {
  return {
    name,
    email
  };
}

/**
 * @param  {} name
 * 生成用户网址
 */
export function createURL(name) {
  return `${url}/user/${slug(name)}`;
}