import cax from './libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 750
const BG_HEIGHT = 1334

const STAND_IMG_SRC = 'images/stand.png'
const STAND_WIDTH = 167
const STAND_HEIGHT = 900

export default class BackGround extends cax.Group {
  constructor () {
    super()

    this.bgUp = new cax.Bitmap(BG_IMG_SRC)
    this.bgUp.y = 0
    this.bgUp.scaleX = screenWidth / BG_WIDTH
    this.bgUp.scaleY = screenHeight / BG_HEIGHT
		
		let ratio = 1 / 3
		this.stand = new cax.Bitmap(STAND_IMG_SRC)
		this.stand.width = STAND_WIDTH / 2 * ratio
		this.stand.height = STAND_HEIGHT / 2 * ratio
    this.stand.y = 130
		this.stand.x = screenWidth / 2 - this.stand.width
    this.stand.scaleX = ratio
    this.stand.scaleY = ratio

    this.add(this.bgUp, this.stand)
  }

  update () {

  }
}
