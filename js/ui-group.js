import cax from './libs/cax'
import Button from './button'

const info = wx.getSystemInfoSync()
const screenWidth = info.windowWidth
const screenHeight = info.windowHeight

const pauseButton = new Button({
	x: (screenWidth - 44) / 2,
	y: info.statusBarHeight,
  width: 44,
  height: 44,
	borderRadius: 5,
	bgImage: ["images/pause.png", 30, 30]
})

const restartButton = new Button({
	x: (screenWidth - 87) / 2,
	y: (screenHeight - 87) / 2,
  width: 87,
  height: 87,
	borderRadius: 5,
	bgImage: ["images/restart.png", 87, 87]
})
restartButton.visible = false

function rnd (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class UIGroup extends cax.Group {
  constructor () {
    super()
    this.pauseButton = pauseButton
    this.restartButton = restartButton
    this.coverBackground = new cax.Rect(screenWidth, screenHeight, {
      fillStyle: "#000000aa"
    })
    this.coverBackground.visible = false
    this.coverBackground.x = 0
    this.coverBackground.y = 0
    this.buttons = [pauseButton, restartButton]
    this.add(pauseButton, this.coverBackground, restartButton)
  }
	
  passEvent(points) {
    for (var i = 0; i < this.buttons.length; i++) {
      this.buttons[i].actIfNeeded(points)
    }
  }
  
  pause() {
    this.coverBackground.visible = true
  }
  
  start() {
    this.coverBackground.visible = false
  }
  
  update() {
    
  }
}
