import {Message} from 'element-ui'
import { getPicToken } from '@/api/getPicToken'
let qiniu = require('qiniu-js')

/**
 * [uploadToQiniu 上传到七牛云]
 * @Author   xxx
 * @param    {[string]}                 imgUrl     [上传的图片地址]
 * @param    {[Number]}                 workType 1-系统图标；2-用户头像；3-认证资料；4-牧场游戏；5-商铺
 * @param    {[Number]}                 uploadType 1-简单上传凭证，2-覆盖上传凭证
 * @param    {[string]}                 key        [覆盖上传时要覆盖的 key]
 * @return   {[type]}                            [description]
 */
export const uploadToQiniu = function (imgUrl, workType, key) {
  if (!imgUrl) {
    Message.error('未获取到上传的图片')
    return;
  }

  if (!workType) {
    Message.error('未设置业务类型')
    return;
  }
  return new Promise(async (resolve, reject) => {
    let evidence = await getPicToken(key);
    if (evidence.code !== 200) return;
    const observable = qiniu.upload(imgUrl, key, evidence.data)
    observable.subscribe({
      next: res2 => {
        console.log(res2)
      },
      error: err => {
        Message.error(`上传图片失败： ${err}，请重新上传！`)
        reject(err);
        // {errMsg: "uploadFile:fail parameter error: parameter.url should be String instead of Null;"}
      },
      complete: res => {
        console.log(res)
        resolve(res);
      }
    })
  })
}
