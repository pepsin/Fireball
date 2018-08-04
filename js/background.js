import cax from './libs/cax'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

const BG_IMG_SRC = 'images/bg.jpg'
const BG_WIDTH = 750
const BG_HEIGHT = 1334

const STAND_IMG_SRC = 'images/stand.png'
const STAND_WIDTH = 167
const STAND_HEIGHT = 600

export default class BackGround extends cax.Group {
  constructor () {
    super()

    this.bgUp = new cax.Bitmap(BG_IMG_SRC)
    this.bgUp.y = 0
    this.bgUp.scaleX = screenWidth / BG_WIDTH
    this.bgUp.scaleY = screenHeight / BG_HEIGHT
		
		let ratio = 1 / 3
		this.stand = new cax.Bitmap(STAND_IMG_SRC)
		this.stand.width = STAND_WIDTH * ratio
		this.stand.height = STAND_HEIGHT * ratio
    this.stand.scaleX = ratio
    this.stand.scaleY = ratio
		this.stand.x = screenWidth / 2 - this.stand.width / 2
		this.stand.y = screenHeight - this.stand.height - 180

    this.add(this.bgUp, this.stand)
  }

  update () {

  }
	
	holePoints() {
		var points = [[13, 16], [144, 23]]
		for (var i = 0; i < points.length; i++) {
			points[i][0] = points[i][0] * this.stand.scaleX
			points[i][1] = points[i][1] * this.stand.scaleY
			points[i][0] += this.stand.x
			points[i][1] += this.stand.y
		}
		return points
	}
	
	originPoint() {
		var points = this.holePoints()
		var point = [(points[0][0] + points[1][0]) / 2, (points[0][1] + points[1][1]) / 2]
		return point
	}
}
