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

const startButton = new Button({
	x: (screenWidth - 87) / 2,
	y: (screenHeight - 87) / 2,
  width: 87,
  height: 87,
	borderRadius: 5,
	bgImage: ["images/start.png", 87, 87]
})
startButton.visible = false

function rnd (start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class UIGroup extends cax.Group {
  constructor () {
    super()
    this.pauseButton = pauseButton
    this.restartButton = restartButton
    this.startButton = startButton
    this.coverBackground = new cax.Rect(screenWidth, screenHeight, {
      fillStyle: "#000000aa"
    })
    this.coverBackground.visible = false
    this.coverBackground.x = 0
    this.coverBackground.y = 0
    this.buttons = [pauseButton, restartButton, startButton]
    this.add(pauseButton, this.coverBackground, restartButton, startButton)
  }
	
  passEvent(points) {
    for (var i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].visible) {
        this.buttons[i].actIfNeeded(points)
      }
    }
  }
  
  showBG(show) {
    this.coverBackground.visible = show
  }
  
  pause() {
    this.showBG(true)
    startButton.visible = true
  }
  
  start() {
    this.showBG(false)
    startButton.visible = false
  }
  
  update() {
    
  }
}
