import cax from './libs/cax'
import Enemy from './enemy'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth

function rnd (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class EnemyGroup extends cax.Group {
  constructor () {
    super()
    this.preGenerateTime = Date.now()
		this.initialTime = Date.now()
  }

  generate () {
    const e = new Enemy()
    e.x = rnd(0, screenWidth)
    e.y = -60
    this.add(e)
  }

  update () {
    this.currentTime = Date.now()
    if (this.currentTime - this.preGenerateTime > 1000) {
			var times = (this.currentTime - this.initialTime) / 20000
			for (var i = 0; i < times; i++) {
				this.generate()
			}

      this.preGenerateTime = this.currentTime
    }

    this.children.forEach(child => {
      child.update()
    })
  }
  
  reset() {
    this.children.forEach(child => {
      child.visible = false
      child.destroy()
    })
    this.preGenerateTime = Date.now()
		this.initialTime = Date.now()
  }
}
