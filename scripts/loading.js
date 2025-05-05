const images = [
  "./assets/bent.png",
  "./assets/headH.png",
  "./assets/headV.png",
  "./assets/deadH.png",
  "./assets/deadV.png",
  "./assets/rushH.png",
  "./assets/rushV.png",
  "./assets/sleep.png",
  "./assets/straightH.png",
  "./assets/straightV.png",
  "./assets/tailH.png",
  "./assets/tailV.png",
  "./assets/food1.png",
  "./assets/food2.png",
  "./assets/food3.png",
  "./assets/hole.png",
  "./assets/speed_default.png",
  "./assets/pause_default.png",
  "./assets/pause_hold.png",
  "./assets/gameOverPanel1.png",
  "./assets/gameOverPanel2.png",
  "./assets/gameOverPanel3.png",
  "./assets/pause_musicOFF.png",
  "./assets/pause_musicON.png",
  "./assets/keyboard_default.png",
  "./assets/up_hold.png",
  "./assets/down_hold.png",
  "./assets/left_hold.png",
  "./assets/right_hold.png",
  "./assets/tip.png",
  "./assets/bg.png",
  "./assets/line.png",
  "./assets/bg3.png",
  "./assets/bg4.png",
]

let loadedCount = 0
const totalAssets = images.length
const progress = document.querySelector('.loadingText')

images.forEach(loadImage)

function loadImage(url) {
  const asset = new Image()
  asset.onload = () => {
    loadedCount++
    progress.innerHTML = 'LOADING…' + trans(loadedCount, totalAssets) + '%'
    if (loadedCount === totalAssets) {
      addScript()
      loadingContainer.style.visibility = 'hidden'
    }
  }
  asset.src = url
}

//转化为百分比
function trans(fz, fm) {
  return parseInt(fz * 100 / fm)
}

function addScript() {
  const script = document.createElement('script')
  script.src = './scripts/eventListener.js'
  document.head.appendChild(script)

  const link = document.createElement('link')
  link.rel = "stylesheet"
  link.href = "./styles/loading.css"
  document.head.appendChild(link)
}

document.addEventListener('touchstart', function (e) {
  e.preventDefault()
}, { passive: false })

document.addEventListener('touchmove', function (e) {
  e.preventDefault()
}, { passive: false })