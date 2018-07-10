import cax from './libs/cax'

const FLOWER_IMG_PREFIX = 'images/flower_'

const IMG_WIDTH = 265
const IMG_HEIGHT = 311

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class Flower extends cax.Group {
  constructor (index) {
    super()
    this.bitmap = new cax.Bitmap(FLOWER_IMG_PREFIX + index + ".png")
    this.bitmap.originX = 0
    this.bitmap.originY = IMG_HEIGHT / 2
    this.add(this.bitmap)
    this.scaleX = this.scaleY = 0.4
    this.speed = 1
    this.width = IMG_WIDTH / 2
    this.height = IMG_WIDTH / 2
  }
}
