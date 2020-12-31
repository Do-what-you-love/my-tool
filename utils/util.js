
// import {Message} from 'element-ui'
/**
 * @description 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

/**
 * @description 获取sessionStorage
 */
export const getStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

/**
 * @description 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
/**
 * @description 判断字符串是否为空
 */
export const isEmpty = value => {
  return value === undefined || value === null || value === ''
}
/**
 * @description 修复origin在个别IE下识别不了的问题
 * */
export const originFixed = () => {
  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
  }
}
/**
 * 剪裁文本，超出部分显示省略号
 * @param {string} val 文本
 * @param {string} len 长度
 * return result
 */
export const sliceText = (val, len) => {
  val = val || ''
  if (len > 0 && val.length > len) {
    val = val.slice(0, len) + '...'
  }
  return val
}
/**
 * 获取某元素高度
 * @param {string} id 需要获取高度的元素ID
 * @param {string} sunid 需要赋值高度的元素ID
 * @param {Number} num 需要再次计算的值
 * return result
 */
export const setDomHeight = (id, sunid, num) => {
  if (!id || !sunid) return ''
  if (!num) num = 0
  let hei = document.getElementById(id).offsetHeight;
  document.getElementById(sunid).style.height = hei - num + 'px'
  // return hei
}
/**
 * @setEchartsFontSize 设置echarts字体大小
 * */
export function setEchartsFontSize (res) {
  // let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  // if (!clientWidth) return;
  let fontSize = res;
  return fontSize;
}

// 删除值为空的字段
export function filterNullData (json) {
  let data = JSON.parse(JSON.stringify(json)), keyArr = Object.keys(data)
  for (let key of keyArr) {
    if (!data[key]) delete data[key];
  }
  return data;
}
// tabel表header背景色更换
export function tabelHeaderColor ({rowIndex}) {
  if (rowIndex === 0) {
    return 'table-hader-color';
  }
}
// 多级tabel表header背景色更换
export function subtabelHeaderColor ({rowIndex}) {
  if (rowIndex === 0) {
    return 'subtable-hader-color';
  }
}
// tabel表奇偶row背景色更换
export function tableRowClassName ({row, rowIndex}) {
  if (rowIndex % 2 === 1) {
    return 'rowtwo-color';
  }
  if (rowIndex % 2 === 0) {
    return 'rowone-color';
  }
}
export function subtableRowClassName ({row, rowIndex}) {
  if (row && row['num']) return 'green-color'; else return ''
}
