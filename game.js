import cax from './js/libs/cax'
import Background from './js/background'
import Stone from './js/stone'
import ShooterSpring from "./js/shooter-spring.js"
import EnemyGroup from './js/enemy-group'
import StoneGroup from './js/stone-group'
import FlowerGroup from './js/flower-group'
import Music from './js/music'
import Flower from './js/flower'

const bg = new Background()
const stoneGroup = new StoneGroup()
const stage = new cax.Stage()
const spring = new ShooterSpring()
const flowerGroup = new FlowerGroup()
const enemyGroup = new EnemyGroup()
const music = new Music()
const info = wx.getSystemInfoSync()
const screenHeight = info.windowHeight

stage.add(bg, flowerGroup, spring, stoneGroup, enemyGroup)
initStone()
spring.holePoints = bg.holePoints()

let touchX = null
let touchY = null
let isShoot = false
let touchMoved = false
let touchMoveX = 0
let touchMoveY = 0
let score = 0
let gameEnd = false
let STONE_REFRESH_TIME = 300

wx.onTouchStart(function (e) {
	isShoot = false
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
})

wx.onTouchMove(function (e) {
	touchMoved = true
	touchMoveX = e.touches[0].clientX - touchX
	touchMoveY = e.touches[0].clientY - touchY
  touchX = e.touches[0].clientX
  touchY = e.touches[0].clientY
})

wx.onTouchEnd(function (e) {
	touchMoved = false
	isShoot = true
})

function replay() {
	score = 0
	gameEnd = false
	if (stoneGroup.children.length == 0) {
			stoneGroup.generate()
	}
	if (flowerGroup.children.length == 0) {
		flowerGroup.generateAll()
		flowerGroup.animateAll()
	}
}

function initStone() {
	if (stoneGroup.children.length == 0) {
			stoneGroup.generate()
	}
	stoneGroup.current.setInitPoint(bg.originPoint())
	spring.follow(stoneGroup.current)
	stoneGroup.current.alpha = 1
}

function update () {
  stage.update()
  bg.update()

	if (isShoot) {
		stoneGroup.shoot()
		isShoot = false
		initStone()
	}
	
	if (flowerGroup.children.length == 0) {
		flowerGroup.generateAll()
		flowerGroup.animateAll()
	}
	if (gameEnd) {
		return
	}
	if (touchMoved) {
		stoneGroup.updateCurrentPosition(touchMoveX, touchMoveY)
		touchMoveX = 0
		touchMoveY = 0
	}
	stoneGroup.update()
  enemyGroup.update()
	spring.update()

  enemyGroup.children.forEach(enemy => {
		stoneGroup.children.forEach(stone => {
			if (stone.isShoot) {
	      if (stone.isCollideWith(enemy)) {
	        enemy.explode()
					score += 10 * stone.combo
					stone.combo += 1
	        music.playExplosion()
	      }
			}
		})
		flowerGroup.children.forEach(flower => {
			if (flower.isCollideWith(enemy)) {
				enemy.explode()
				flower.catchFire()
			}
		})
  })
	
	if (flowerGroup.children.length == 0) {
		gameEnd = true
	}
  requestAnimationFrame(update)
}

update()