import cax from './js/libs/cax'
import Background from './js/background'
import Stone from './js/stone'
import EnemyGroup from './js/enemy-group'
import StoneGroup from './js/stone-group'
import Music from './js/music'

const bg = new Background()
const stoneGroup = new StoneGroup()
const stage = new cax.Stage()
const enemyGroup = new EnemyGroup()
const music = new Music()
const info = wx.getSystemInfoSync()
const screenHeight = info.windowHeight

stage.add(bg, enemyGroup, stoneGroup)

// stage.add(player.bulletGroup)

let touchX = null
let touchY = null
let isShoot = false
let touchMoved = false
let touchMoveX = 0
let touchMoveY = 0

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
	console.log("End")
	touchMoved = false
	isShoot = true
})

function update () {
  stage.update()
  bg.update()

  // player.update()
  // if (touchX !== null) {
  // 		if (isShoot && player.isShoot != isShoot) {
  // 			player.shoot()
  // 		}
  // 		player.isShoot = isShoot
  // 		if (!player.isShoot) {
  // 	    player.x = touchX
  // 	    player.y = touchY
  // 		}
  // }
	if (isShoot) {
		stoneGroup.shoot()
		isShoot = false
	}
	if (stoneGroup.children.length == 0) {
		stoneGroup.generate()
	}
	if (touchMoved) {
		console.log(touchMoveX, touchMoveY)
		stoneGroup.updateCurrentPosition(touchMoveX, touchMoveY)
		touchMoveX = 0
		touchMoveY = 0
	}
	stoneGroup.update()
  enemyGroup.update()

  enemyGroup.children.forEach(enemy => {
		stoneGroup.children.forEach(stone => {
			if (stone.isShoot) {
	      if (stone.isCollideWith(enemy)) {
	        enemy.explode()
	        music.playExplosion()
	      }
			}
		})
  })

  requestAnimationFrame(update)
}

update()