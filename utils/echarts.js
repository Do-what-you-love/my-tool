export const brokenLineCommon = {

}
// 饼图公共参数
export const pieLineCommon = {
  series: {
    avoidLabelOverlap: false, // 是否启用防止标签重叠策略/例如圆环图这个例子中需要强制所有标签放在中心位置，可以将该值设为 false。
    center: ['50%', '50%'], // 默认为垂直居中对齐
    type: 'pie'
  },
  data: {
    red: { color: '#FE5C43' },
    blue: { color: '#5973FE' }
  }
}
