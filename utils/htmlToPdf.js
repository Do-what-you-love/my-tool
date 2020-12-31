/**
 * Created by HIAPAD on 2020/4/13.
 */
// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install (Vue, options) {
    Vue.prototype.getPdf = function (id, title = 'download') {
      html2Canvas(document.querySelector(id), {
        allowTaint: false,
        imageTimeout: 15000,
        proxy: undefined,
        useCORS: true,
        tainttest: true // 检测每张图片都已经加载完成
      }).then(function (canvas) {
        const contentWidth = canvas.width
        const contentHeight = canvas.height
        // const pageHeight = contentWidth / 592.28 * 841.89
        // let leftHeight = contentHeight
        // let position = 0
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('', 'pt', [contentWidth, contentHeight < 1200 ? 1200 : contentHeight])
        // if (leftHeight < pageHeight) {
        //   PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        // } else {
        //   while (leftHeight > 0) {
        //     PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        //     // leftHeight -= pageHeight
        //     // position -= 841.89
        //     if (leftHeight > 0) {
        //       PDF.addPage()
        //     }
        //   }
        // }
        // return;
        PDF.addImage(pageData, 'JPEG', 0, 0, contentWidth, contentHeight)
        PDF.save(title + '.pdf')
      })
    }
  }
}
