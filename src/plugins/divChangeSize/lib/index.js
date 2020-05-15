
const plugins = {
  install (Vue, options) {
    Vue.directive('changeSize', {
      // bind: function () {

      // },
      inserted: function () {
        let [el] = arguments
        el.className = el.className + ' husky-change-size'
        let { widthRightCtrl, widthLeftCtrl } = createCtrlBtn(el)
        let isWidthChange = false
        let isWidthPostion = false
        let isMove = false
        let lastXPostion = 0
        let lastYPostion = 0
        el.onmousedown = function (e) {
          lastXPostion = e.clientX
          lastYPostion = e.clientY
          isMove = true
        }
        el.onmouseup = function (e) {
          isMove = false
          isWidthChange = false
          isWidthPostion = false
          window.removeEventListener('mousemove', move, false)
        }
        el.onmousemove = function (e) {
          window.addEventListener('mousemove', move, true)
          e.stopPropagation()
        }
        widthRightCtrl.onmousedown = function (e) {
          lastXPostion = e.clientX
          isWidthChange = true
          e.stopPropagation()
        }
        widthLeftCtrl.onmousedown = function (e) {
          lastXPostion = e.clientX
          isWidthPostion = true
          e.stopPropagation()
        }
        window.onmouseup = function () {
          isWidthChange = false
          isWidthPostion = false
          isMove = false
          lastXPostion = 0
          lastYPostion = 0
        }
        function move (e) {
          if (isWidthChange) {
            let move = e.clientX - lastXPostion
            el.style.width = el.getBoundingClientRect().width + move + 'px'
          }
          if (isWidthPostion) {
            let move = e.clientX - lastXPostion
            el.style.left = parseInt(el.style.left.split('p')[0]) + move + 'px'
            el.style.width = el.getBoundingClientRect().width - move + 'px'
          }
          // 是否可以移动
          if (isMove) {
            let moveX = e.clientX - lastXPostion
            let moveY = e.clientY - lastYPostion
            el.style.left = parseInt(el.style.left.split('p')[0]) + moveX + 'px'
            el.style.top = parseInt(el.style.top.split('p')[0]) + moveY + 'px'
          }
          lastXPostion = e.clientX
          lastYPostion = e.clientY
        }
      }
      // update: function () { },
      // componentUpdated: function () { },
      // unbind: function () { }
    })
  }
}

function createCtrlBtn (parent) {
  let style = `
.husky-change-size:{
  position:relative;
}
.husky-width-right-ctrl{
  content: "";
  display: inline-block;
  position: absolute;
  right: 0;
  width: 10px;
  height: 100%;
  background: #fff;
  cursor: pointer;
  user-select: none;
}
.husky-width-left-ctrl{
  content: "";
  display: inline-block;
  position: absolute;
  left: 0;
  width: 10px;
  height: 100%;
  background: #fff;
  cursor: pointer;
  user-select: none;
}
.husky-height-top-ctrl{
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 10px;
  background: #fff;
  cursor: pointer;
  user-select: none;
}
.husky-height-bottom-ctrl{
  content: "";
  display: inline-block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10px;
  background: #fff;
  cursor: pointer;
  user-select: none;
}`
  let styleEl = document.createElement('style')
  styleEl.innerHTML = style
  document.head.appendChild(styleEl)
  let heightTopCtrl = document.createElement('div')
  heightTopCtrl.className = 'husky-height-top-ctrl'
  let heightBottomCtrl = document.createElement('div')
  heightBottomCtrl.className = 'husky-height-bottom-ctrl'
  let heightCtrl = document.createElement('div')
  heightCtrl.className = 'husky-height-ctrl'
  let widthRightCtrl = document.createElement('div')
  widthRightCtrl.className = 'husky-width-right-ctrl'
  let widthLeftCtrl = document.createElement('div')
  widthLeftCtrl.className = 'husky-width-left-ctrl'
  parent.appendChild(heightTopCtrl)
  parent.appendChild(heightBottomCtrl)
  parent.appendChild(widthRightCtrl)
  parent.appendChild(widthLeftCtrl)
  return { widthRightCtrl, widthLeftCtrl, heightTopCtrl, heightBottomCtrl }
}
export default plugins
