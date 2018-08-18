import cax from './libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

function rnd (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class UIGroup extends cax.Group {
  constructor () {
    super()
  }
	
  update () {
    this.children.forEach(child => {
      child.update()
    })
  }
}
