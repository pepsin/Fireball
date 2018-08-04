import cax from './libs/cax'
import Bullet from './bullet'
import Music from './music'
import Stone from './stone'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

export default class ShooterSpring extends cax.Group {
  constructor (ctx) {
    super()
		this.width = screenWidth
		this.height = screenHeight / 3 * 2
		this.x = 0
		this.y = 0
		this.pathA = 0
		this.pathB = 0
  }

  update () {
		var stone = this.stone
		if (stone == undefined) {
			return
		}
		if (this.pathA != 0) {
			this.pathA.destroy()
		}
		if (this.pathB != 0) {
			this.pathB.destroy()
		}
		var option = {
		  strokeColor: "#FFEF86",
			strokeWidth: 4
		}
		
		var points = this.replaceIfNeeded(stone.pointLeft(), stone.pointRight(), 0)
		points[0][1] -= this.y
		points[1][1] -= this.y
		this.pathA = new cax.Polygon([points[0], this.holePoints[0]], option)
		this.add(this.pathA)
		this.pathB = new cax.Polygon([points[1], this.holePoints[1]], option)
		this.add(this.pathB)
  }
	
	replaceIfNeeded(p1, p2, index) {
		if (p1[index] > p2[index]) {
			return [p2, p1]
		} else {
			return [p1, p2]
		}
	}
	
	follow (stone) {
		this.stone = stone
	}
}
