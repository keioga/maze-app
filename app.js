const startBtn = document.getElementById("startBtn");
const statusDiv = document.getElementById("status");
const gammaDiv = document.getElementById("gamma");
const betaDiv = document.getElementById("beta");

const TEST_TILT = 20;   // テストモードで矢印キーを押したときの傾き（度）

let tiltX = 0;   // 左右の傾き（gamma）
let tiltY = 0;   // 前後の傾き（beta）

function onOrientation(e) {
  if (e.beta === null) return;
  tiltX = e.gamma;
  tiltY = e.beta;
  showTilt();
}

function showTilt() {
  gammaDiv.textContent = Math.round(tiltX);
  betaDiv.textContent = Math.round(tiltY);
}

startBtn.addEventListener("click", async () => {
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    const res = await DeviceOrientationEvent.requestPermission();
    if (res !== "granted") {
      statusDiv.textContent = "センサーが使えません（矢印キーで試せます）";
      return;
    }
  }
  window.addEventListener("deviceorientation", onOrientation);
  statusDiv.textContent = "計測中";
});

// ---- テストモード（パソコン用）：矢印キーを傾きのかわりにする ----
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft")  tiltX = -TEST_TILT;
  if (e.key === "ArrowRight") tiltX = TEST_TILT;
  if (e.key === "ArrowUp")    tiltY = -TEST_TILT;
  if (e.key === "ArrowDown")  tiltY = TEST_TILT;
  if (e.key.startsWith("Arrow")) e.preventDefault();
  showTilt();
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") tiltX = 0;
  if (e.key === "ArrowUp" || e.key === "ArrowDown") tiltY = 0;
  showTilt();
});
