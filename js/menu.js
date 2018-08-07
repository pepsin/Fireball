import cax from './libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class Menu extends cax.Group {
  constructor () {
    super()
  }
}
