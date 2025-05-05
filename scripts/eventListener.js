window.addEventListener('keydown', function (e) {  //键盘按下
  e.preventDefault();

  //空格键暂停
  if (e.key === ' ') {
    pauseButtonControl()
  }
  else if (pause) return

  switch (e.key) {
    case 'ArrowUp':
      dirToUp()
      break
    case 'ArrowDown':
      dirToDown()
      break
    case 'ArrowLeft':
      dirToLeft()
      break
    case 'ArrowRight':
      dirToRight()
      break
    case 's':
      if (!speedUp) speedStart()
      break
  }

  //初始状态：按方向键开始游戏
  //settle结束，方向键继续游戏
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    gameOnControl()
  }

  //死亡状态：按空格键回到初始状态
  if (gameOver && e.key === ' ' && maxScoreText.style.visibility === 'visible') {
    gameOver = false
    gameOverPanelContainer.style.visibility = 'hidden'
    maxScoreText.style.visibility = 'hidden'
    currentScoreText.style.visibility = 'hidden'
    init()
  }
})

window.addEventListener('keyup', function (e) {  //键盘松开
  e.preventDefault();
  if (e.key === 's') speedEnd()

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    dirControlButton.style.backgroundImage = 'url(./assets/keyboard_default.png)'
  }
})

BGM1.addEventListener("ended", playNextBGM)
BGM2.addEventListener("ended", playNextBGM)

musicON.addEventListener('click', function (e) {  //音量键(鼠标)
  e.preventDefault();
  musicControl()
})

musicON.addEventListener('touchstart', function (e) {  //音量键(触屏)
  e.preventDefault();
  musicControl()
})

continueButton.addEventListener('click', function (e) {  //继续(鼠标)
  e.preventDefault();
  continueButtonControl()
})

continueButton.addEventListener('touchstart', function (e) {  //继续(触屏)
  e.preventDefault();
  continueButtonControl()
})

again.addEventListener('touchstart', function (e) {  //再玩一次(触屏)
  e.preventDefault();
  againControl()
})

again.addEventListener('click', function (e) {  //再玩一次(鼠标)
  e.preventDefault();
  againControl()
})

pauseButton.addEventListener('touchstart', function (e) {  //暂停键
  e.preventDefault();
  pauseButtonControl()
})

speedButton.addEventListener('touchstart', function (e) {  //加速键按住
  e.preventDefault();
  speedStart()
})

speedButton.addEventListener('touchend', function (e) {  //抬起：加速取消
  e.preventDefault();
  speedEnd()
})

key.addEventListener('touchend', function (e) {  //抬起：方向键取消
  e.preventDefault();
  dirControlButton.style.backgroundImage = 'url(./assets/keyboard_default.png)'
})

document.addEventListener('touchmove', function (e) {  //方向键按住拖动  
  e.preventDefault()
  if (settling) return
  const touch = [...e.touches]
  touch.forEach((obj) => {
    const x = obj.clientX - (keyboardLeft + (windowWidth - gameWidth) / 2)
    const y = obj.clientY - (keyboardTop + gameWidth + Top)
    if (x > -30 / 659 * windowHeight && y > -60 / 659 * windowHeight && x < dirControlWidth + 60 / 659 * windowHeight && y < dirControlWidth + 60 / 659 * windowHeight) {
      if (x < y && x + y < dirControlWidth) {
        dirToLeft()
        gameOnControl()
      }
      else if (x > y && x + y < dirControlWidth) {
        dirToUp()
        gameOnControl()
      }
      else if (x > y && x + y > dirControlWidth) {
        dirToRight()
        gameOnControl()
      }
      else if (x < y && x + y > dirControlWidth) {
        dirToDown()
        gameOnControl()
      }
    }
  })
}, { passive: false })

document.addEventListener('touchstart', function (e) {  //方向键点击
  e.preventDefault();
  if (settling) return
  const touch = [...e.touches]
  touch.forEach((obj) => {
    const x = obj.clientX - (keyboardLeft + (windowWidth - gameWidth) / 2)
    const y = obj.clientY - (keyboardTop + gameWidth + Top)
    if (x > -30 / 659 * windowHeight && y > -60 / 659 * windowHeight && x < dirControlWidth + 60 / 659 * windowHeight && y < dirControlWidth + 60 / 659 * windowHeight) {
      if (x < y && x + y < dirControlWidth) {
        dirToLeft()
        gameOnControl()
      }
      else if (x > y && x + y < dirControlWidth) {
        dirToUp()
        gameOnControl()
      }
      else if (x > y && x + y > dirControlWidth) {
        dirToRight()
        gameOnControl()
      }
      else if (x < y && x + y > dirControlWidth) {
        dirToDown()
        gameOnControl()
      }
    }
  })
}, { passive: false })