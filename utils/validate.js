import {Message} from 'element-ui'
// 检验是否为空
export const isEmpty = function (checkItem, msg = '请输入', type = true) {
  if (!(checkItem + '') || !((checkItem + '').trim())) {
    if (type) Message.error(msg);
    return true;
  }
  return false;
};

// message通知工具函数-验证是否手机号
export const isMobile = function (phone, msg = '请输入正确的手机号码') {
  var pattern = /^1[3-9]\d{9}$/;
  if (!pattern.test(phone)) {
    Message.error(msg);
    return false;
  }
  return true;
};
// from表单验证-验证是否手机号
export const isMobileFrom = function (phone) {
  var pattern = /^1[3-9]\d{9}$/;
  if (!pattern.test(phone)) {
    return false;
  }
  return true;
};
// 复制
export const copyFun = function (value) {
  const inputDom = document.createElement('input');
  inputDom.value = value;
  document.body.appendChild(inputDom);
  inputDom.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  document.body.removeChild(inputDom); // 删除DOM
  Message.success('复制成功！');
};

// 纯数字验证
export const isAllNumber = function (checkItem, msg = '不能输入纯数字') {
  var pattern = /^[0-9]*$/;
  if (pattern.test(checkItem)) {
    return true;
  }
  return false;
};
// 正整数验证，包括0
export const isPositiveNumber = function (checkItem, msg = '数量必须为正整数') {
  var pattern = /^[+]{0,1}(\d+)$/;
  if (pattern.test(checkItem)) {
    return true;
  }
  Message.error(msg);
  return false;
}
// 金额验证，最多保留两位小数
export const isMoney = function (checkItem, msg = '金额最多输入两位小数') {
  var pattern = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
  if (pattern.test(checkItem) || checkItem === 0 || checkItem === '0') {
    return true;
  }
  Message.error(msg);
  return false;
};
// 是否包含汉字
export const isIncludeHanzi = function (checkItem, msg = '不能包含汉字') {
  var pattern = /.*[\u4e00-\u9fa5]{1,}.*/;
  if (pattern.test(checkItem)) {
    Message.error(msg);
    return true;
  }
  return false;
};
// 是否为汉字
export const isHanzi = function (checkItem) {
  var pattern = /[\u4e00-\u9fa5]/;
  if (pattern.test(checkItem)) {
    return true;
  }
  return false;
};
// 是否存在空格或者换行符
export const isSpaceNewline = function (checkItem, msg = '不能输入空格或者换行符') {
  var space = /\s+/g;
  var newline = /[\r\n]/g;
  if (space.test(checkItem) || newline.test(checkItem)) {
    Message.error(msg);
    return true;
  }
  return false;
};
// 是否包含特殊字符
export const isIncludeSpecial = function (checkItem, msg = '不能包含特殊字符') {
  var pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、↑↓]/im;
  if (pattern.test(checkItem)) {
    Message.error(msg);
    return true;
  }
  return false;
};

// 纯字母或数字和字母的组合验证
export const isAllNumberAndZimu = function (checkItem) {
  var pattern = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/
  if (pattern.test(checkItem)) {
    return true;
  }
  return false;
};
// message通知工具函数-身份证
export const isIdCard = function (text, msg = '请输入正确的身份证号码') {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  var pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
  if (!pattern.test(text)) {
    Message.error(msg);
    return false;
  }
  return true;
};
// from表单验证-身份证
export const isIdCardForm = function (text) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  var pattern = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
  if (!pattern.test(text)) {
    return false;
  }
  return true;
};
// from表单验证-身百分比
export const isbaiForm = function (text) {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  var pattern = /^(100|([1-9]?\d(.\d{0,2}[1-9])?))$/;
  if (!pattern.test(text)) {
    return false;
  }
  return true;
};
/**
 * kind-of 判断一个变量的类型
 * @param  {*} val
 * @return {String}
 */
export const kindOf = function (val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val).slice(8, -1).toLowerCase();
}
/** ------------------------  Date over -------------------------- **/
