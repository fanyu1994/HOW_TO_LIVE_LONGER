
// 优秀的时钟
console.log(new Date().toLocaleTimeString())
function getDom(d) {
  return document.querySelector(d)
}
function getDate() {
  return new Date().toLocaleTimeString()
}
const hours = getDom('.hours')
const minutes = getDom('.minutes')
const seconds = getDom('.seconds')

setInterval(() => {
  const arr = getDate().split(':')
  hours.innerHTML = arr[0]
  minutes.innerHTML = arr[1]
  seconds.innerHTML = arr[2]
}, 1000)
