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
		var leadingP2 = [0, 15]
		var trailingP1 = [this.width, 0]
		var trailingP2 = [this.width, 15]
		var option = {
		   fillColor:"#ef8e34",
		   strokeColor: "#8b4b45",
			strokeWidth: 3
		}
		
		var points = this.replaceIfNeeded(shooter.pointLeft(), shooter.pointRight(), 0)
		var leadingS1 = points[0]
		var trailingS1 = points[1]
		var smallCap = 10
		leadingS1[1] -= this.y
		var leadingS2 = [leadingS1[0], leadingS1[1]]
		leadingS2[1] -= smallCap
		var leadingPoints = this.replaceIfNeeded(leadingS1, leadingS2, 1)
		leadingS1 = leadingPoints[1]
		leadingS2 = leadingPoints[0]
		trailingS1[1] -= this.y
		var trailingS2 = [trailingS1[0], trailingS1[1]]
		trailingS2[1] -= smallCap
		var trailingPoints = this.replaceIfNeeded(trailingS1, trailingS2, 1)
		trailingS1 = trailingPoints[1]
		trailingS2 = trailingPoints[0]
		this.pathA = new cax.Polygon([leadingP1, leadingP2, leadingS1, leadingS2], option)
		this.add(this.pathA)
		this.pathB = new cax.Polygon([trailingP1, trailingP2, trailingS1, trailingS2], option)
		this.add(this.pathB)
  }
	
	replaceIfNeeded(p1, p2, index) {
		if (p1[index] > p2[index]) {
			return [p2, p1]
		} else {
			return [p1, p2]
		}
	}
	
	follow (shooter) {
		this.shooter = shooter
		
	}
}
