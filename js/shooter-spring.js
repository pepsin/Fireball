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
		this.y = screenHeight / 3
		this.pathA = 0
		this.pathB = 0
  }

  update () {
		var shooter = this.shooter
		if (shooter == undefined) {
			return
		}
		if (this.pathA != 0) {
			this.pathA.destroy()
		}
		if (this.pathB != 0) {
			this.pathB.destroy()
		}
		var leadingP1 = [0, 0]
		var leadingP2 = [0, 30]
		var trailingP1 = [this.width, 0]
		var trailingP2 = [this.width, 30]
		var option = {
		   fillColor:"#ef8e34",
		   strokeColor: "#8b4b45",
			strokeWidth: 3
		}
		var smallCap = 20
		var leadingS1 = shooter.pointLeft()
		var trailingS1 = shooter.pointRight()
		if (leadingS1[0] > trailingS1[0]) {
			var a = leadingS1
			leadingS1 = trailingS1
			trailingS1 = a
		}
		leadingS1[1] -= this.y
		var leadingS2 = leadingS1
		leadingS2[1] += smallCap
		trailingS1[1] -= this.y
		var trailingS2 = trailingS1
		trailingS2[1] += smallCap
		this.pathA = new cax.Polygon([leadingP1, leadingP2, leadingS1, leadingS2], option)
		this.add(this.pathA)
		this.pathB = new cax.Polygon([trailingP1, trailingP2, trailingS1, trailingS2], option)
		this.add(this.pathB)
  }
	
	follow (shooter) {
		this.shooter = shooter
		
	}
}
