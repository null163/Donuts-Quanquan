const cellSize = 22            //每个格子的大小
const areaSize = cellSize * 12 //游戏区域的大小
let moveSpeed                  //移动速度
let defaultSpeed               //默认速度
let rushSpeed                  //冲刺速度
let tailSpeed                  //尾巴变短速度
let foodSpeed2                 //食物移动速度(随机路线)
let foodSpeed31                //食物移动速度(固定路线，速度不变)
let foodSpeed32                //食物移动速度(固定路线，速度变化)
let maxScore = Number(localStorage.getItem('maxScore_quanquan'))
let totalScore                 //总分数
let snakeScore                 //储存分数
let bound1                     //第一阶段分数
let bound2                     //第二阶段分数
let foodscore1                 //食物1加的分数
let foodscore2                 //食物2加的分数
let foodscore3                 //食物3加的分数
let digit                      //分数栏最高位
let tail                       //尾巴要加多长
let speedUp                    //是否加速
let eatFood                    //是否吃到食物
let holeExist                  //洞口是否已出现
let firstHole                  //是否为第一个洞口
let musicIsOn                  //音乐是否开启
let music = 1                  //曲目(1或2)
let firstLoad = true           //是否为第一次加载游戏
let gameOn                     //初始状态
let gameOver                   //死亡状态
let pause                      //暂停状态
let settle                     //结算状态
let settling                   //结算中

let snake               //蛇的位置
let food                //食物的位置
let movingFood31 = []   //食物的位置(固定路线 固定速度)
let movingFood32 = []   //食物的位置(固定路线 速度变化)
let movingFood2 = []    //食物的位置(随机路线)
let foodWeight = []     //食物权重
let hole                //洞的位置

const whole = document.querySelector('.whole')
const scoreAnimate = document.querySelector('.scoreAnimate')
const head = document.querySelector('.bgHead')
const game = document.querySelector('.background')
const keyboard = document.querySelector('.bgKeyboard')
const gameContainer = document.querySelector('.background')
const maskLeft = document.getElementById('maskLeft')
const maskRight = document.getElementById('maskRight')

const pauseButton = document.querySelector('.pause')
const speedButton = document.querySelector('.speedUp')
const dirControlButton = document.querySelector('.dirControl')
const scoreContainer = document.querySelector('.scoreContainer')
const zeroText = document.getElementById('zeroText')
const scoreText = document.getElementById('scoreText')
const tip = document.querySelector('.tip')

const pausePanelContainer = document.querySelector('.pausePanelContainer')
const pausePanel = document.querySelector('.pausePanel')
const musicON = document.querySelector('.musicON')
const continueButton = document.querySelector('.continue')

const gameOverPanelContainer = document.querySelector('.gameOverPanelContainer')
const gameOverPanel = document.querySelector('.gameOverPanel')
const again = document.querySelector('.again')

const maxScoreText = document.querySelector('.maxScore')
const currentScoreText = document.querySelector('.currentScore')
const key = document.querySelector('.key')

const BGM1 = document.getElementById('bgm1')
const BGM2 = document.getElementById('bgm2')

let windowHeight, bodySize, gameWidth, headHeight, headWidth, dirControlWidth
let keyboardHeight, buttonWidth, buttonTop1, buttonTop2, buttonLeft, i, goTop
let keyboardTop, keyboardLeft, score1, score2, font, letter, Left, Top, goLeft
let tipWidth, tipHeight, tipTop, tipLeft, windowWidth, pausePanelHeight, buttonHeight
let pausePanelWidth, pausePanelTop, pausePanelLeft, againTop, againLeft
let musicWidth, musicHeight, musicTop, musicLeft, continueHeight, againWidth
let continueWidth, continueTop, continueLeft, goHeight, goWidth, scAniWidth
let maxScore1, maxScore2, currentScore1, currentScore2, scAniHeight, scAniFont1
let goContainerHeight, goContainerwidth, goContainerTop, goContainerLeft
let goWidth_tmp

let keyFrames, timing, animation, scAniOutline, keyFrames2, timing2, keyFrames3

//按屏幕比例缩放
function resize() {
  windowHeight = window.innerHeight
  windowWidth = window.innerWidth

  bodySize = 1000 / 659 * windowHeight
  gameWidth = 286 / 659 * windowHeight
  headHeight = 145 / 659 * windowHeight
  headWidth = 300 / 659 * windowHeight
  keyboardHeight = 221 / 659 * windowHeight
  Top = headHeight - 7 / 659 * windowHeight
  Left = (headWidth - gameWidth) / 2

  // 版头
  head.style.height = headHeight + 'px'
  head.style.width = headWidth + 'px'
  head.style.left = (Left - 4 / 659 * windowHeight) + 'px'
  head.style.backgroundSize = headWidth + 'px ' + headHeight + 'px'

  // 游戏界面
  game.style.height = gameWidth + 'px'
  game.style.width = gameWidth + 'px'
  game.style.top = Top + 'px'
  game.style.left = Left + 'px'
  game.style.backgroundSize = gameWidth + 'px ' + gameWidth + 'px'

  // 按键区
  keyboard.style.height = keyboardHeight + 'px'
  keyboard.style.width = gameWidth + 'px'
  keyboard.style.top = gameWidth + Top + 'px'
  keyboard.style.left = Left + 'px'
  keyboard.style.backgroundSize = gameWidth + 'px ' + keyboardHeight + 'px'

  // 蒙版
  maskLeft.style.width = (15 / 659 * windowHeight) + 'px'
  maskLeft.style.height = (gameWidth + 20 / 659 * windowHeight) + 'px'
  maskLeft.style.top = (Top - 10 / 659 * windowHeight) + 'px'
  maskLeft.style.left = (-8 / 659 * windowHeight) + 'px'

  maskRight.style.width = (15 / 659 * windowHeight) + 'px'
  maskRight.style.height = (gameWidth + 20 / 659 * windowHeight) + 'px'
  maskRight.style.top = (Top - 10 / 659 * windowHeight) + 'px'
  maskRight.style.left = (gameWidth + 7 / 659 * windowHeight) + 'px'

  whole.style.width = headWidth + 'px'

  // 分数动画
  scoreAnimate.style.width = headWidth + 'px'
  scoreAnimate.style.height = headHeight + gameWidth + 'px'
  scoreAnimate.style.left = (windowWidth - headWidth) / 2 + 'px'

  score1 = 118 / 659 * windowHeight  //top
  score2 = 85 / 659 * windowHeight  //left
  font = 15 / 659 * windowHeight
  letter = 1 / 659 * windowHeight

  // 分数
  scoreContainer.style.top = score1 + 'px'
  scoreContainer.style.left = score2 + 'px'
  scoreText.style.fontSize = font + 'px'
  scoreText.style.letterSpacing = letter + 'px'
  zeroText.style.fontSize = font + 'px'
  zeroText.style.letterSpacing = letter + 'px'

  buttonWidth = 50 / 659 * windowHeight
  buttonHeight = 60 / 659 * windowHeight
  buttonTop1 = 13 / 659 * windowHeight
  buttonTop2 = 93 / 659 * windowHeight
  buttonLeft = 36 / 659 * windowHeight

  // 暂停按钮
  pauseButton.style.height = buttonHeight + 'px'
  pauseButton.style.width = buttonWidth + 'px'
  pauseButton.style.backgroundSize = buttonWidth + 'px ' + buttonHeight + 'px'
  pauseButton.style.top = buttonTop1 + 'px'
  pauseButton.style.left = buttonLeft + 'px'

  // 加速按钮
  speedButton.style.height = buttonHeight + 'px'
  speedButton.style.width = buttonWidth + 'px'
  speedButton.style.backgroundSize = buttonWidth + 'px ' + buttonHeight + 'px'
  speedButton.style.top = buttonTop2 + 'px'
  speedButton.style.left = buttonLeft + 'px'

  dirControlWidth = 160 / 659 * windowHeight  //方向键边长
  keyboardTop = 9 / 659 * windowHeight
  keyboardLeft = 120 / 659 * windowHeight

  // 方向键
  dirControlButton.style.height = dirControlWidth + 'px'
  dirControlButton.style.width = dirControlWidth + 'px'
  dirControlButton.style.backgroundSize = dirControlWidth + 'px ' + dirControlWidth + 'px'
  dirControlButton.style.top = keyboardTop + 'px'
  dirControlButton.style.left = keyboardLeft + 'px'

  // 方向键判定区
  key.style.height = dirControlWidth + 'px'
  key.style.width = dirControlWidth + 'px'
  key.style.backgroundSize = dirControlWidth + 'px ' + dirControlWidth + 'px'
  key.style.top = keyboardTop + 'px'
  key.style.left = keyboardLeft + 'px'

  tipWidth = 185 / 659 * windowHeight
  tipHeight = 250 / 659 * windowHeight
  tipTop = 350 / 659 * windowHeight
  tipLeft = (windowWidth + gameWidth) / 2 + 105 / 659 * windowHeight

  // 游戏提示
  tip.style.height = tipHeight + 'px'
  tip.style.width = tipWidth + 'px'
  tip.style.backgroundSize = tipWidth + 'px ' + tipHeight + 'px'
  tip.style.top = tipTop + 'px'
  tip.style.left = tipLeft + 'px'

  pausePanelHeight = 149 / 659 * windowHeight
  pausePanelWidth = 220 / 659 * windowHeight
  pausePanelTop = 185 / 659 * windowHeight
  pausePanelLeft = (windowWidth - pausePanelWidth) / 2

  // 暂停界面
  pausePanelContainer.style.height = pausePanelHeight + 'px'
  pausePanelContainer.style.width = pausePanelWidth + 'px'
  pausePanelContainer.style.backgroundSize = pausePanelWidth + 'px ' + pausePanelHeight + 'px'
  pausePanelContainer.style.top = pausePanelTop + 'px'
  pausePanelContainer.style.left = pausePanelLeft + 'px'

  pausePanel.style.height = pausePanelHeight + 'px'
  pausePanel.style.width = pausePanelWidth + 'px'
  pausePanel.style.backgroundSize = pausePanelWidth + 'px ' + pausePanelHeight + 'px'

  musicWidth = 85 / 659 * windowHeight
  musicHeight = 37 / 659 * windowHeight
  musicTop = 90 / 659 * windowHeight
  musicLeft = 28 / 659 * windowHeight

  // 音乐开关按钮
  musicON.style.height = musicHeight + 'px'
  musicON.style.width = musicWidth + 'px'
  musicON.style.backgroundSize = musicWidth + 'px ' + musicHeight + 'px'
  musicON.style.top = musicTop + 'px'
  musicON.style.left = musicLeft + 'px'

  continueHeight = 37 / 659 * windowHeight
  continueWidth = 65 / 659 * windowHeight
  continueTop = 90 / 659 * windowHeight
  continueLeft = 128 / 659 * windowHeight

  // 继续按钮
  continueButton.style.height = continueHeight + 'px'
  continueButton.style.width = continueWidth + 'px'
  continueButton.style.backgroundSize = continueWidth + 'px ' + continueHeight + 'px'
  continueButton.style.top = continueTop + 'px'
  continueButton.style.left = continueLeft + 'px'

  goContainerHeight = 180 / 659 * windowHeight
  goContainerwidth = 213 / 659 * windowHeight
  goContainerTop = 45 / 659 * windowHeight
  goContainerLeft = (windowWidth - goContainerwidth - 4 / 659 * windowHeight) / 2

  // 游戏结束界面
  gameOverPanelContainer.style.height = goContainerHeight + 'px'
  gameOverPanelContainer.style.width = goContainerwidth + 'px'
  gameOverPanelContainer.style.top = goContainerTop + 'px'
  gameOverPanelContainer.style.left = goContainerLeft + 'px'

  goHeight = 210 / 659 * windowHeight
  goWidth = 245 / 659 * windowHeight
  goWidth_tmp = 260 / 659 * windowHeight
  goTop = -30 / 659 * windowHeight
  goLeft = -20 / 659 * windowHeight

  // 游戏结束界面-背景
  gameOverPanel.style.height = goHeight + 'px'
  gameOverPanel.style.width = goWidth + 'px'
  gameOverPanel.style.backgroundSize = goWidth + 'px ' + goHeight + 'px'
  gameOverPanel.style.top = goTop + 'px'
  gameOverPanel.style.left = goLeft + 'px'

  againWidth = 100 / 659 * windowHeight
  againTop = 147 / 659 * windowHeight
  againLeft = 73 / 659 * windowHeight

  // 重来按钮
  again.style.height = continueHeight + 'px'
  again.style.width = againWidth + 'px'
  again.style.top = againTop + 'px'
  again.style.left = againLeft + 'px'
  again.style.backgroundSize = againWidth + 'px ' + continueHeight + 'px'

  maxScore1 = 59 / 659 * windowHeight
  maxScore2 = 115 / 659 * windowHeight

  // 最高分
  maxScoreText.style.top = maxScore1 + 'px'
  maxScoreText.style.left = maxScore2 + 'px'
  maxScoreText.style.fontSize = font + 'px'
  maxScoreText.style.letterSpacing = letter + 'px'

  currentScore1 = 88 / 659 * windowHeight
  currentScore2 = 115 / 659 * windowHeight

  // 当前分
  currentScoreText.style.top = currentScore1 + 'px'
  currentScoreText.style.left = currentScore2 + 'px'
  currentScoreText.style.fontSize = font + 'px'
  currentScoreText.style.letterSpacing = letter + 'px'

  // 分数动画字体
  scAniWidth = cellSize / 659 * windowHeight
  scAniHeight = cellSize / 659 * windowHeight
  scAniFont1 = 14 / 659 * windowHeight
  scAniOutline = 1.2 / 659 * windowHeight

  keyFrames = [
    { fontSize: 0 + 'px' },
    { fontSize: scAniFont1 + 'px', offset: 0.15 },
    { fontSize: scAniFont1 + 'px', offset: 0.85 },
    { fontSize: 0 + 'px' }
  ]
  timing = {
    duration: 1300,
    iterations: 1,
    easing: 'ease-in-out'
  }

  keyFrames2 = [
    { height: 0 + 'px', width: 0 + 'px', backgroundSize: '0px 0px' },
    { height: pausePanelHeight + 'px', width: pausePanelWidth + 'px', backgroundSize: `${pausePanelWidth}px ${pausePanelHeight}px` }
  ]

  timing2 = {
    duration: 250,
    iterations: 1,
    easing: 'ease-in-out'
  }

  keyFrames3 = [
    { height: 0 + 'px', width: 0 + 'px', backgroundSize: '0px 0px' },
    { height: goHeight + 'px', width: goWidth + 'px', backgroundSize: `${goWidth}px ${goHeight}px` }
  ]
}

window.addEventListener('resize', function () {
  resize()
  drawGame()
})

resize()
init()

function init() { //初始化
  defaultSpeed = 300
  rushSpeed = 190
  moveSpeed = defaultSpeed
  tailSpeed = 50
  foodSpeed2 = 600
  foodSpeed31 = 400
  foodSpeed32 = defaultSpeed
  totalScore = 0
  snakeScore = 0
  bound1 = 2
  bound2 = 300
  foodscore1 = 5
  foodscore2 = 10
  foodscore3 = 15
  digit = 13
  scoreRefresh(0)
  scoreText.style.color = '#ffffff'
  tail = 0
  speedUp = false
  eatFood = false
  holeExist = false
  firstHole = true
  musicIsOn = false
  gameOn = false
  gameOver = false
  pause = false
  settle = false
  settling = false
  snake = [{ x: 6, y: 6, dirX: 0, dirY: 1 }]
  foodWeight = [10, 3, 1]
  food = []
  movingFood31 = []
  movingFood32 = []
  movingFood2 = []
  hole = {}
  maxScoreText.style.visibility = 'hidden'
  currentScoreText.style.visibility = 'hidden'
  drawGame()
}

function animateFun(score) {  //分数动画
  const scAniText = document.createElement('div')
  scAniText.classList.add('scAniText')
  scAniText.innerHTML = '+' + score
  scAniText.style.width = scAniWidth + 'px'
  scAniText.style.height = scAniHeight + 'px'
  scAniText.style.textShadow = `-${scAniOutline}px -${scAniOutline}px 0 #ffffff, ${scAniOutline}px -${scAniOutline}px 0 #ffffff, -${scAniOutline}px ${scAniOutline}px 0 #ffffff, ${scAniOutline}px ${scAniOutline}px 0 #ffffff`
  scAniText.style.top = Top + (snake[0].y - 1) * cellSize / 659 * windowHeight + 'px'
  scAniText.style.left = Left + snake[0].x * cellSize / 659 * windowHeight + 'px'
  scoreAnimate.appendChild(scAniText)
  animation = scAniText.animate(keyFrames, timing)
  setTimeout(function () { scoreAnimate.removeChild(scAniText) }, 1300)
}

function startLoop() {  //开启所有循环
  foodLoop31()
  foodLoop32()
  foodLoop2()
  gameLoop()
}

function gameLoop() { //主循环
  if (!pause) {
    if (!gameOver) whetherBumpSnake()
    if (!gameOver && holeExist) whetherEnterHole()
    if (!gameOver && !settle) moveSnake()
    if (!gameOver && !settle) {
      if ((firstHole || snake.length > 15) && !holeExist) holeApply()
      whetherEatFood()
      if (!eatFood) deleteTail()
      else if (tail === 0) {
        eatFood = false
        deleteTail()
      }
      else tail -= 1
      drawGame()
      if (gameOn) setTimeout(gameLoop, moveSpeed)
    }
  }
}

function foodLoop31() {  //食物循环(固定路线，速度不变)
  moveFood31()
  drawGame()
  if (gameOn && !pause && !gameOver) setTimeout(foodLoop31, foodSpeed31)
}

function foodLoop32() {  //食物循环(固定路线，速度变化)
  moveFood32()
  drawGame()
  if (gameOn && !pause && !gameOver) setTimeout(foodLoop32, foodSpeed32)
}

function foodLoop2() {  //食物循环(随机路线)
  moveFood2()
  drawGame()
  if (gameOn && !pause && !gameOver) setTimeout(foodLoop2, foodSpeed2)
}

function whetherEatFood() { //判断是否吃到食物
  food.forEach((obj, idx) => {
    if (snake[0].x === obj.x && snake[0].y === obj.y) {
      eatFood = true
      animateFun(foodscore1)
      snakeScore += foodscore1
      tail += 1
      food.splice(idx, 1)
    }
  })
  movingFood31.forEach((obj, idx) => {
    if (snake[0].x === obj.x && snake[0].y === obj.y || snake[1].x === obj.x && snake[1].y === obj.y) {
      eatFood = true
      animateFun(foodscore3)
      snakeScore += foodscore3
      tail += 5
      movingFood31.splice(idx, 1)
    }
  })
  movingFood32.forEach((obj, idx) => {
    if (snake[0].x === obj.x && snake[0].y === obj.y || snake[1].x === obj.x && snake[1].y === obj.y) {
      eatFood = true
      animateFun(foodscore3)
      snakeScore += foodscore3
      tail += 5
      movingFood32.splice(idx, 1)
    }
  })
  movingFood2.forEach((obj, idx) => {
    if (snake[0].x === obj.x && snake[0].y === obj.y || snake[1].x === obj.x && snake[1].y === obj.y) {
      eatFood = true
      animateFun(foodscore2)
      snakeScore += foodscore2
      tail += 3
      movingFood2.splice(idx, 1)
    }
  })
  if (food.length + movingFood31.length + movingFood32.length + movingFood2.length < 3) foodApplyAll()
}

function whetherBumpSnake() { //判断是否撞到蛇身
  for (let idx = 2; idx < snake.length; idx++) {
    if (snake[0].x === snake[idx].x && snake[0].y - 1 === snake[idx].y && snake[0].dirY === -1) {
      GameOver()
      return
    }
    else if (snake[0].x - 1 === snake[idx].x && snake[0].y === snake[idx].y && snake[0].dirX === -1) {
      GameOver()
      return
    }
    else if (snake[0].x + 1 === snake[idx].x && snake[0].y === snake[idx].y && snake[0].dirX === 1) {
      GameOver()
      return
    }
    else if (snake[0].x === snake[idx].x && snake[0].y + 1 === snake[idx].y && snake[0].dirY === 1) {
      GameOver()
      return
    }
  }
}

function whetherEnterHole() { //判断是否进入洞口
  if (snake[0].x === hole.x && snake[0].y - 1 === hole.y && snake[0].dirY === -1 && !(snake[1].x === hole.x && snake[1].y === hole.y) ||
    snake[0].x - 1 === hole.x && snake[0].y === hole.y && snake[0].dirX === -1 && !(snake[1].x === hole.x && snake[1].y === hole.y) ||
    snake[0].x + 1 === hole.x && snake[0].y === hole.y && snake[0].dirX === 1 && !(snake[1].x === hole.x && snake[1].y === hole.y) ||
    snake[0].x === hole.x && snake[0].y + 1 === hole.y && snake[0].dirY === 1 && !(snake[1].x === hole.x && snake[1].y === hole.y)) {
    if (snake.length > 2) settleScore()
    else {
      settle = true
      foodSpeed32 = defaultSpeed
    }
  }
}

function settleScore() { //结算分数
  settle = true
  settling = true
  holeExist = false
  i = totalScore
  scoreText.style.color = '#3a588a'
  scoreRefreshLoop()
  totalScore += snakeScore
  snakeScore = 0
  tail = 0
  drawGame()
  settleLoop()
}

function settleLoop() { //结算循环
  deleteTail()
  drawGame()
  if (snake.length > 2) setTimeout(settleLoop, tailSpeed)
  else settling = false
}

function scoreRefresh(sc) { //分数更新
  if (sc > 9999999999) sc = 9999999999
  let t = 0
  let s = sc
  while (s > 0) {
    s = parseInt(s) / 10
    t++
  }
  if (sc === 0) t = 2
  let str = ""
  for (let i = digit - t; i >= 0; i--) {
    str += "0"
  }
  zeroText.innerHTML = str
  scoreText.innerHTML = sc
}

function scoreRefreshLoop() { //分数更新循环
  i++
  scoreRefresh(i)
  if (i < totalScore + snakeScore) {
    setTimeout(scoreRefreshLoop, 25)
  }
}

function drawGame() { //打印贴图
  gameContainer.innerHTML = "";

  //打印洞口
  if (holeExist || settle) {
    const img = document.createElement("img")
    img.style.top = hole.y * cellSize / 659 * windowHeight + 'px'
    img.style.left = hole.x * cellSize / 659 * windowHeight + 'px'
    img.style.position = 'absolute'
    img.style.width = cellSize / 659 * windowHeight + 'px'
    img.style.height = cellSize / 659 * windowHeight + 'px'
    img.src = './assets/hole.png'
    gameContainer.appendChild(img)
  }

  //打印食物
  if (gameOn) {
    food.forEach(obj => {
      const div = document.createElement("div")
      const img = document.createElement("img")
      div.style.top = (obj.y * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.left = (obj.x * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.position = 'absolute'
      img.src = './assets/food' + obj.id + '.png'
      img.style.width = (cellSize + 4) / 659 * windowHeight + 'px'
      img.style.height = (cellSize + 4) / 659 * windowHeight + 'px'
      div.appendChild(img)
      gameContainer.appendChild(div)
    })
    movingFood31.forEach(obj => {
      const div = document.createElement("div")
      const img = document.createElement("img")
      div.style.top = (obj.y * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.left = (obj.x * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.position = 'absolute'
      img.src = './assets/food' + obj.id + '.png'
      img.style.width = (cellSize + 4) / 659 * windowHeight + 'px'
      img.style.height = (cellSize + 4) / 659 * windowHeight + 'px'
      div.appendChild(img)
      gameContainer.appendChild(div)
    })
    movingFood32.forEach(obj => {
      const div = document.createElement("div")
      const img = document.createElement("img")
      div.style.top = (obj.y * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.left = (obj.x * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.position = 'absolute'
      img.src = './assets/food' + obj.id + '.png'
      img.style.width = (cellSize + 4) / 659 * windowHeight + 'px'
      img.style.height = (cellSize + 4) / 659 * windowHeight + 'px'
      div.appendChild(img)
      gameContainer.appendChild(div)
    })
    movingFood2.forEach(obj => {
      const div = document.createElement("div")
      const img = document.createElement("img")
      div.style.top = (obj.y * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.left = (obj.x * cellSize - 2) / 659 * windowHeight + 'px'
      div.style.position = 'absolute'
      img.src = './assets/food' + obj.id + '.png'
      img.style.width = (cellSize + 4) / 659 * windowHeight + 'px'
      img.style.height = (cellSize + 4) / 659 * windowHeight + 'px'
      div.appendChild(img)
      gameContainer.appendChild(div)
    })
  }

  //打印尾部
  if (snake.length > 1) {
    const tail = document.createElement("img")
    tail.style.top = snake[snake.length - 1].y * cellSize / 659 * windowHeight + 'px'
    tail.style.left = snake[snake.length - 1].x * cellSize / 659 * windowHeight + 'px'
    tail.style.position = 'absolute'
    tail.style.width = cellSize / 659 * windowHeight + 'px'
    tail.style.height = cellSize / 659 * windowHeight + 'px'
    if (snake[snake.length - 1].dirX === 0 && snake[snake.length - 1].dirY === 1) {
      tail.src = './assets/tailV.png'
    }
    else if (snake[snake.length - 1].dirX === 0 && snake[snake.length - 1].dirY === -1) {
      tail.src = './assets/tailV.png'
      tail.classList.add('flipV')
    }
    else if (snake[snake.length - 1].dirX === -1 && snake[snake.length - 1].dirY === 0) {
      tail.src = './assets/tailH.png'

    }
    else if (snake[snake.length - 1].dirX === 1 && snake[snake.length - 1].dirY === 0) {
      tail.src = './assets/tailH.png'
      tail.classList.add('flipH')
    }
    else {
      if (snake[snake.length - 2].x === snake[snake.length - 1].x - 1) {
        tail.src = './assets/tailH.png'
      }
      else if (snake[snake.length - 2].x === snake[snake.length - 1].x + 1) {
        tail.src = './assets/tailH.png'
        tail.classList.add('flipH')
      }
      else if (snake[snake.length - 2].y === snake[snake.length - 1].y - 1) {
        tail.src = './assets/tailV.png'
        tail.classList.add('flipV')
      } else if (snake[snake.length - 2].y === snake[snake.length - 1].y + 1) {
        tail.src = './assets/tailV.png'
      }
    }
    gameContainer.appendChild(tail)
  }

  //打印身体
  snake.forEach((obj, idx) => {
    if (idx !== 0 && idx !== snake.length - 1) {
      const img = document.createElement("img")
      img.style.top = obj.y * cellSize / 659 * windowHeight + 'px'
      img.style.left = obj.x * cellSize / 659 * windowHeight + 'px'
      img.style.position = 'absolute'
      img.style.width = cellSize / 659 * windowHeight + 'px'
      img.style.height = cellSize / 659 * windowHeight + 'px'
      if (obj.dirX === 0 && obj.dirY === 1) {
        img.src = './assets/straightV.png'
        if (idx % 2 === 0) img.classList.add('flipH')
      }
      else if (obj.dirX === 0 && obj.dirY === -1) {
        img.src = './assets/straightV.png'
        if (idx % 2 !== 0) img.classList.add('flipH')
      }
      else if (obj.dirX === -1 && obj.dirY === 0) {
        img.src = './assets/straightH.png'
        if (idx % 2 === 0) img.classList.add('flipV')
      }
      else if (obj.dirX === 1 && obj.dirY === 0) {
        img.src = './assets/straightH.png'
        if (idx % 2 !== 0) img.classList.add('flipV')
      }
      else {
        img.src = './assets/bent.png'
        if (obj.dirX === 1 && obj.dirY === 1) {
          img.classList.add('flipV')
        }
        else if (obj.dirX === -1 && obj.dirY === -1) {
          img.classList.add('flipH')
        }
        else if (obj.dirX === -1 && obj.dirY === 1) {
          img.classList.add('flipVH')
        }
      }
      gameContainer.appendChild(img)
    }
  })

  //打印头部
  let div = document.createElement("div")
  let head = document.createElement("img")
  div.style.position = 'absolute'
  if (!gameOn && !gameOver) {
    head.src = './assets/sleep.png'
    div.style.top = (snake[0].y * cellSize - 4) / 659 * windowHeight + 'px'
    div.style.left = (snake[0].x * cellSize - 6) / 659 * windowHeight + 'px'
    head.style.width = (cellSize + 11) / 659 * windowHeight + 'px'
    head.style.height = (cellSize + 8) / 659 * windowHeight + 'px'
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === 1 || (gameOver || settle) && snake.length > 1 &&
    (snake[0].dirX === 1 && snake[0].dirY === 1 && snake[1].x === snake[0].x + 1 || snake[0].dirX === -1 &&
      snake[0].dirY === 1 && snake[1].x === snake[0].x - 1) || !(gameOver || settle) && snake.length > 1 &&
      snake[1].x === snake[0].x && snake[1].y === snake[0].y - 1) {
    if (gameOver) head.src = './assets/deadV.png'
    else if (speedUp) head.src = './assets/rushV.png'
    else head.src = './assets/headV.png'
    div.style.top = (snake[0].y * cellSize - 7) / 659 * windowHeight + 'px'
    div.style.left = (snake[0].x * cellSize - 6) / 659 * windowHeight + 'px'
    head.style.width = (cellSize + 11) / 659 * windowHeight + 'px'
    head.style.height = (cellSize + 7) / 659 * windowHeight + 'px'
  }
  else if (snake[0].dirX === 0 && snake[0].dirY === -1 || (gameOver || settle) && snake.length > 1 &&
    (snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].x === snake[0].x + 1 || snake[0].dirX === -1 &&
      snake[0].dirY === -1 && snake[1].x === snake[0].x - 1) || !(gameOver || settle) && snake.length > 1 &&
      snake[1].x === snake[0].x && snake[1].y === snake[0].y + 1) {
    if (gameOver) head.src = './assets/deadV.png'
    else if (speedUp) head.src = './assets/rushV.png'
    else head.src = './assets/headV.png'
    head.classList.add('flipV')
    div.style.top = snake[0].y * cellSize / 659 * windowHeight + 'px'
    div.style.left = (snake[0].x * cellSize - 6) / 659 * windowHeight + 'px'
    head.style.width = (cellSize + 11) / 659 * windowHeight + 'px'
    head.style.height = (cellSize + 7) / 659 * windowHeight + 'px'
  }
  else if (snake[0].dirX === -1 && snake[0].dirY === 0 || (gameOver || settle) && snake.length > 1 &&
    (snake[0].dirX === -1 && snake[0].dirY === 1 && snake[1].y === snake[0].y + 1 || snake[0].dirX === -1 &&
      snake[0].dirY === -1 && snake[1].y === snake[0].y - 1) || !(gameOver || settle) && snake.length > 1 &&
      snake[1].x === snake[0].x + 1 && snake[1].y === snake[0].y) {
    if (gameOver) head.src = './assets/deadH.png'
    else if (speedUp) head.src = './assets/rushH.png'
    else head.src = './assets/headH.png'
    div.style.top = (snake[0].y * cellSize - 6) / 659 * windowHeight + 'px'
    div.style.left = (snake[0].x * cellSize - 1) / 659 * windowHeight + 'px'
    head.style.width = (cellSize + 9) / 659 * windowHeight + 'px'
    head.style.height = (cellSize + 11) / 659 * windowHeight + 'px'
  }
  else if (snake[0].dirX === 1 && snake[0].dirY === 0 || (gameOver || settle) && snake.length > 1 &&
    (snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].y === snake[0].y - 1 || snake[0].dirX === 1 &&
      snake[0].dirY === 1 && snake[1].y === snake[0].y + 1) || !(gameOver || settle) && snake.length > 1 &&
      snake[1].x === snake[0].x - 1 && snake[1].y === snake[0].y) {
    if (gameOver) head.src = './assets/deadH.png'
    else if (speedUp) head.src = './assets/rushH.png'
    else head.src = './assets/headH.png'
    head.classList.add('flipH')
    div.style.top = (snake[0].y * cellSize - 6) / 659 * windowHeight + 'px'
    div.style.left = (snake[0].x * cellSize - 7) / 659 * windowHeight + 'px'
    head.style.width = (cellSize + 9) / 659 * windowHeight + 'px'
    head.style.height = (cellSize + 11) / 659 * windowHeight + 'px'
  }
  div.appendChild(head)
  gameContainer.appendChild(div)

  //打印地图边缘线
  const img = document.createElement("img")
  img.style.height = gameWidth + 'px'
  img.style.width = gameWidth + 'px'
  img.style.top = '0px'
  img.style.left = '0px'
  img.style.position = 'absolute'
  img.src = './assets/line.png'
  gameContainer.appendChild(img)
}

function moveSnake() { //蛇移动
  //蛇移动
  let Y1 = snake[0].y + 1
  if (Y1 > areaSize / cellSize && snake[0].dirY === 1) {
    GameOver()
    return
  }

  let Y2 = snake[0].y - 1
  if (Y2 < 0 && snake[0].dirY === -1) {
    GameOver()
    return
  }

  let X1 = snake[0].x + 1
  if (X1 > areaSize / cellSize && snake[0].dirX === 1) {
    GameOver()
    return
  }

  let X2 = snake[0].x - 1
  if (X2 < 0 && snake[0].dirX === -1) {
    GameOver()
    return
  }

  if (snake[0].dirX === 0 || snake[0].dirY === 0) {
    let X = snake[0].x + snake[0].dirX
    if (X > areaSize / cellSize || X < 0) {
      GameOver()
      return
    }

    let Y = snake[0].y + snake[0].dirY
    if (Y > areaSize / cellSize || Y < 0) {
      GameOver()
      return
    }

    snake.unshift({ x: X, y: Y, dirX: snake[0].dirX, dirY: snake[0].dirY })
  }
  else if (snake.length > 1) {
    if (snake[0].dirX === -1 && snake[0].dirY === 1 && snake[1].x === X2 || snake[0].dirX === 1 && snake[0].dirY === 1 && snake[1].x === X1) {
      snake.unshift({ x: snake[0].x, y: Y1, dirX: 0, dirY: 1 })
    }
    else if (snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].x === X1 || snake[0].dirX === -1 && snake[0].dirY === -1 && snake[1].x === X2) {
      snake.unshift({ x: snake[0].x, y: Y2, dirX: 0, dirY: -1 })
    }
    else if (snake[0].dirX === -1 && snake[0].dirY === 1 && snake[1].y === Y1 || snake[0].dirX === -1 && snake[0].dirY === -1 && snake[1].y === Y2) {
      snake.unshift({ x: X2, y: snake[0].y, dirX: -1, dirY: 0 })
    }
    else if (snake[0].dirX === 1 && snake[0].dirY === 1 && snake[1].y === Y1 || snake[0].dirX === 1 && snake[0].dirY === -1 && snake[1].y === Y2) {
      snake.unshift({ x: X1, y: snake[0].y, dirX: 1, dirY: 0 })
    }
  }
}

function moveFood31() {  //食物移动(固定路线，速度不变)
  movingFood31.forEach(obj => {
    if (obj.y === 2 && obj.x < 10 && judge(obj.x + 1, obj.y)) {
      obj.x++
    }
    else if (obj.x === 10 && obj.y < 10 && judge(obj.x, obj.y + 1)) {
      obj.y++
    }
    else if (obj.x > 2 && obj.y === 10 && judge(obj.x - 1, obj.y)) {
      obj.x--
    }
    else if (obj.x === 2 && obj.y > 2 && judge(obj.x, obj.y - 1)) {
      obj.y--
    }
  })
}

function moveFood32() {  //食物移动(固定路线，速度变化)
  movingFood32.forEach(obj => {
    if (obj.y === 2 && obj.x < 10 && judge(obj.x + 1, obj.y)) {
      obj.x++
    }
    else if (obj.x === 10 && obj.y < 10 && judge(obj.x, obj.y + 1)) {
      obj.y++
    }
    else if (obj.x > 2 && obj.y === 10 && judge(obj.x - 1, obj.y)) {
      obj.x--
    }
    else if (obj.x === 2 && obj.y > 2 && judge(obj.x, obj.y - 1)) {
      obj.y--
    }
  })
}

function moveFood2() {  //食物移动(随机路线)
  movingFood2.forEach(obj => {
    let i1 = myRandom(1, 4)
    if (i1 === 1 && judge(obj.x, obj.y + 1)) {
      obj.y++
    }
    else if (i1 === 2 && judge(obj.x, obj.y - 1)) {
      obj.y--
    }
    else if (i1 === 3 && judge(obj.x + 1, obj.y)) {
      obj.x++
    }
    else if (i1 === 4 && judge(obj.x - 1, obj.y)) {
      obj.x--
    }
  })
}

function deleteTail() { //删除尾部
  if (snake.length > 2 || snake.length > 1 && settle) snake.pop()
  // console.log(snake);
}

function myRandom(x, y) { //x到y的随机整数
  return x + parseInt(Math.random() * (y + 1 - x))
}

function foodApplyAll() {
  let i = randomFood()
  if (i === 1) foodApply()
  else if (i === 2) {
    if (movingFood2.length + movingFood31.length + movingFood32.length < 1) foodApply2()
    else foodApply()
  }
  else if (i === 3) {
    if (movingFood2.length + movingFood31.length + movingFood32.length < 1) foodApply3()
    else foodApply()
  }
}

function randomFood() {  //带权重随机生成一个食物id
  let cumuWeights = []
  let sum = 0
  foodWeight.forEach(obj => {
    sum += obj
    cumuWeights.push(sum)
  })
  let r = myRandom(1, sum)
  for (let i = 0; i < cumuWeights.length; i++) {
    if (cumuWeights[i] >= r) return i + 1
  }
}

function foodApply() { //食物刷新1(位置随机，固定不动)
  let X, Y
  while (true) {
    X = myRandom(0, areaSize / cellSize)
    Y = myRandom(0, areaSize / cellSize)
    if (judge(X, Y)) break
  }
  food.push({ x: X, y: Y, id: 1 })
}

function foodApply2() {  //食物刷新2(随机走位)
  let X, Y
  while (true) {
    X = myRandom(0, areaSize / cellSize)
    Y = myRandom(0, areaSize / cellSize)
    if (judge(X, Y)) break
  }
  movingFood2.push({ x: X, y: Y, id: 2 })
}

function foodApply3() {  //食物刷新3(固定路线移动)
  let f = true
  let i1 = myRandom(1, 4)
  let i2 = myRandom(2, 9)
  let i3 = myRandom(1, 3)
  switch (i1) {
    case 1:
      if (judge(i2, 2)) {
        if (i3 === 3) movingFood32.push({ x: i2, y: 2, id: 3 })
        else movingFood31.push({ x: i2, y: 2, id: 3 })
      }
      else f = false
      break
    case 2:
      if (judge(10, i2)) {
        if (i3 === 3) movingFood32.push({ x: 10, y: i2, id: 3 })
        else movingFood31.push({ x: 10, y: i2, id: 3 })
      }
      else f = false
      break
    case 3:
      if (judge(i2, 10)) {
        if (i3 === 3) movingFood32.push({ x: i2, y: 10, id: 3 })
        else movingFood31.push({ x: i2, y: 10, id: 3 })
      }
      else f = false
      break
    case 4:
      if (judge(2, i2)) {
        if (i3 === 3) movingFood32.push({ x: 2, y: i2, id: 3 })
        else movingFood31.push({ x: 2, y: i2, id: 3 })
      }
      else f = false
      break
  }
  if (f) foodApply()
}

function foodApplyXY(X, Y, i) {  //在x,y处生成一个食物，若该位置不为空，则不生成
  if (judge(X, Y)) food.push({ x: X, y: Y, id: i })
}

function judge(X, Y) {  //判断该位置是否为空
  let f = true
  if (X < 0 || X > areaSize / cellSize || Y < 0 || Y > areaSize / cellSize) f = false
  food.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  snake.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  movingFood31.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  movingFood32.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  movingFood2.forEach(obj => {
    if (obj.x === X && obj.y === Y) f = false
  })
  if (holeExist && hole.x === X && hole.y === Y) f = false
  if (f) return true
  else return false
}

function holeApply() { //洞口刷新
  if (firstHole) {
    firstHole = false
    holeExist = true
    hole = { x: 6, y: 6 }
  }
  else {
    holeExist = true
    let X, Y
    while (true) {
      let f = true
      X = myRandom(2, areaSize / cellSize - 2)
      Y = myRandom(2, areaSize / cellSize - 2)
      food.forEach(obj => {
        if (obj.x === X && obj.y === Y) f = false
      })
      snake.forEach(obj => {
        if (obj.x === X && obj.y === Y) f = false
      })
      if (X >= snake[0].x - 1 && X <= snake[0].x + 1 && Y >= snake[0].y - 1 && Y <= snake[0].y + 1) f = false
      if (f) break
    }
    hole = { x: X, y: Y }
  }
}

function GameOver() { //游戏结束
  gameOn = false
  gameOver = true
  drawGame()
  if (totalScore > maxScore) {
    maxScore = totalScore
    localStorage.setItem('maxScore_quanquan', maxScore)
  }
  if (maxScore > 99999) {
    maxScoreText.innerHTML = Math.floor(maxScore / 100) / 100 + '万'
  }
  else maxScoreText.innerHTML = maxScore
  if (totalScore > 99999) {
    currentScoreText.innerHTML = Math.floor(totalScore / 100) / 100 + '万'
  }
  else currentScoreText.innerHTML = totalScore
  if (totalScore <= bound1) {
    gameOverPanel.style.backgroundImage = 'url(./assets/gameOverPanel1.png)'
    windowHeight = window.innerHeight
    gameOverPanel.style.width = goWidth + 'px'
    gameOverPanel.style.backgroundSize = goWidth + 'px ' + goHeight + 'px'
  }
  else if (totalScore <= bound2) {
    gameOverPanel.style.backgroundImage = 'url(./assets/gameOverPanel2.png)'
    windowHeight = window.innerHeight
    gameOverPanel.style.width = goWidth_tmp + 'px'
    gameOverPanel.style.backgroundSize = goWidth_tmp + 'px ' + goHeight + 'px'
  }
  else {
    gameOverPanel.style.backgroundImage = 'url(./assets/gameOverPanel3.png)'
    windowHeight = window.innerHeight
    gameOverPanel.style.width = goWidth + 'px'
    gameOverPanel.style.backgroundSize = goWidth + 'px ' + goHeight + 'px'
  }
  let s = 900
  setTimeout(function () {
    gameOverPanelContainer.style.visibility = 'visible'
    gameOverPanel.animate(keyFrames3, timing2)
  }, s)
  setTimeout(function () {
    maxScoreText.style.visibility = 'visible'
    currentScoreText.style.visibility = 'visible'
  }, s + 250)
}

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

BGM1.addEventListener("canplaythrough", () => {
  BGM1.play()
})

//播放下一首bgm
function playNextBGM() {
  if (music === 1) {
    BGM2.play()
    music = 2
  }
  else if (music === 2) {
    BGM1.play()
    music = 1
  }
}

BGM1.addEventListener("ended", playNextBGM)
BGM2.addEventListener("ended", playNextBGM)

//继续播放当前bgm
function playCurrentBGM() {
  if (music === 2) {
    BGM2.play()
    music = 2
  }
  else if (music === 1) {
    BGM1.play()
    music = 1
  }
}

//暂停播放当前bgm
function pauseCurrentBGM() {
  if (music === 2) {
    BGM2.pause()
    music = 2
  }
  else if (music === 1) {
    BGM1.pause()
    music = 1
  }
}

function musicControl() {  //音量键控制
  if (pausePanel.style.visibility === 'visible') {
    if (musicIsOn) {
      musicIsOn = false
      pauseCurrentBGM()
      pausePanel.style.backgroundImage = 'url(./assets/pause_musicOFF.png)'
    }
    else {
      musicIsOn = true
      playCurrentBGM()
      pausePanel.style.backgroundImage = 'url(./assets/pause_musicON.png)'
    }
  }
}

musicON.addEventListener('click', function (e) {  //音量键(鼠标)
  e.preventDefault();
  musicControl()
})

musicON.addEventListener('touchstart', function (e) {  //音量键(触屏)
  e.preventDefault();
  musicControl()
})

function continueButtonControl() {  //'继续'按钮控制
  if (pausePanel.style.visibility === 'visible') {
    pause = false
    pauseButton.style.backgroundImage = 'url(./assets/pause_default.png)'
    pausePanel.style.visibility = 'hidden'
    if (gameOn) startLoop()
  }
}

continueButton.addEventListener('click', function (e) {  //继续(鼠标)
  e.preventDefault();
  continueButtonControl()
})

continueButton.addEventListener('touchstart', function (e) {  //继续(触屏)
  e.preventDefault();
  continueButtonControl()
})

function againControl() {  //'再玩一次'按钮控制
  if (gameOver && gameOverPanelContainer.style.visibility === 'visible') {
    gameOver = false
    gameOverPanelContainer.style.visibility = 'hidden'
    init()
  }
}

again.addEventListener('touchstart', function (e) {  //再玩一次(触屏)
  e.preventDefault();
  againControl()
})

again.addEventListener('click', function (e) {  //再玩一次(鼠标)
  e.preventDefault();
  againControl()
})

function pauseButtonControl() {  //暂停键控制
  if (!gameOver) {
    if (pause) {
      pause = false
      pauseButton.style.backgroundImage = 'url(./assets/pause_default.png)'
      pausePanel.style.visibility = 'hidden'
      if (gameOn) startLoop()
    }
    else {
      pause = true
      pauseButton.style.backgroundImage = 'url(./assets/pause_hold.png)'
      drawGame()
      pausePanel.style.visibility = 'visible'
      pausePanel.animate(keyFrames2, timing2)
    }
  }
}

pauseButton.addEventListener('touchstart', function (e) {  //暂停键
  e.preventDefault();
  pauseButtonControl()
})

function speedStart() {  //加速开始
  if (!speedUp) {
    speedUp = true
    speedButton.style.backgroundImage = 'url(./assets/pause_hold.png)'
    moveSpeed = rushSpeed
    foodSpeed32 = rushSpeed
  }
}

function speedEnd() {  //加速结束
  if (speedUp) {
    speedUp = false
    speedButton.style.backgroundImage = 'url(./assets/speed_default.png)'
    moveSpeed = defaultSpeed
    foodSpeed32 = defaultSpeed
  }
}

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

function dirToUp() {
  if (!gameOver) {
    if (!gameOn || settle && !settling) {
      snake[0].dirX = 0
      snake[0].dirY = -1
    }
    else if (snake[0].dirX === 1 && snake[0].dirY === 0) {
      snake[0].dirX = -1
      snake[0].dirY = -1
    }
    else if (snake[0].dirX === -1 && snake[0].dirY === 0) {
      snake[0].dirX = 1
      snake[0].dirY = -1
    }
  }
  dirControlButton.style.backgroundImage = 'url(./assets/up_hold.png)'
}

function dirToDown() {
  if (!gameOver) {
    if (!gameOn || settle && !settling) {
      snake[0].dirX = 0
      snake[0].dirY = 1
    }
    else if (snake[0].dirX === 1 && snake[0].dirY === 0) {
      snake[0].dirX = -1
      snake[0].dirY = 1
    }
    else if (snake[0].dirX === -1 && snake[0].dirY === 0) {
      snake[0].dirX = 1
      snake[0].dirY = 1
    }
  }
  dirControlButton.style.backgroundImage = 'url(./assets/down_hold.png)'
}

function dirToLeft() {
  if (!gameOver) {
    if (!gameOn || settle && !settling) {
      snake[0].dirX = -1
      snake[0].dirY = 0
    }
    else if (snake[0].dirX === 0 && snake[0].dirY === 1) {
      snake[0].dirX = -1
      snake[0].dirY = -1
    }
    else if (snake[0].dirX === 0 && snake[0].dirY === -1) {
      snake[0].dirX = -1
      snake[0].dirY = 1
    }
  }
  dirControlButton.style.backgroundImage = 'url(./assets/left_hold.png)'
}

function dirToRight() {
  if (!gameOver) {
    if (!gameOn || settle && !settling) {
      snake[0].dirX = 1
      snake[0].dirY = 0
    }
    else if (snake[0].dirX === 0 && snake[0].dirY === 1) {
      snake[0].dirX = 1
      snake[0].dirY = -1
    }
    else if (snake[0].dirX === 0 && snake[0].dirY === -1) {
      snake[0].dirX = 1
      snake[0].dirY = 1
    }
  }
  dirControlButton.style.backgroundImage = 'url(./assets/right_hold.png)'
}

function gameOnControl() {  //初始状态：按方向键开始游戏 //settle结束，方向键继续游戏
  if (!gameOn) {
    gameOn = true
    if (firstLoad) {
      firstLoad = false
      musicIsOn = true
      // BGM1.play()
      pausePanel.style.backgroundImage = 'url(./assets/pause_musicON.png)'
    }
    startLoop()
  }
  else if (settle && !settling) {
    settle = false
    gameLoop()
  }
}

document.addEventListener('touchmove', function (e) {  //方向键按住拖动  
  e.preventDefault();
  const touch = [...e.touches]
  touch.forEach((obj) => {
    const x = obj.clientX - (keyboardLeft + (windowWidth - gameWidth) / 2)
    const y = obj.clientY - (keyboardTop + gameWidth + Top)
    if (x > -30 / 659 * windowHeight && y > -60 / 659 * windowHeight && x < dirControlWidth + 60 / 659 * windowHeight && y < dirControlWidth + 60 / 659 * windowHeight) {
      // console.log(parseInt(x) + ', ' + parseInt(y));
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
  const touch = [...e.touches]
  touch.forEach((obj) => {
    const x = obj.clientX - (keyboardLeft + (windowWidth - gameWidth) / 2)
    const y = obj.clientY - (keyboardTop + gameWidth + Top)
    if (x > -30 / 659 * windowHeight && y > -60 / 659 * windowHeight && x < dirControlWidth + 60 / 659 * windowHeight && y < dirControlWidth + 60 / 659 * windowHeight) {
      // console.log(parseInt(x) + ', ' + parseInt(y));
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