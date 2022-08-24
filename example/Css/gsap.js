import {
  gsap,
  ScrollTrigger,
  Draggable,
  MotionPathPlugin,
} from './node_modules/gsap/all.js'

// gsap下的好玩动画
function getTween() {
  const obj = {
    num: 10,
  }
  const spanText = document.querySelector('.gsap-box-2-span')
  const nObj = new Proxy(obj, {
    set(target, property, value, receiver) {
      spanText.innerHTML = value
    },
  })
  console.log(spanText)
  let tl = gsap.timeline()
  tl.to('.gsap-box-1', {
    duration: 1,
    x: 300,
    borderRadius: '50%',
    yoyo: true,
    ease: 'bounce',
  })

  gsap.registerPlugin(ScrollTrigger)
  gsap.to('.gsap-box-3', {
    ScrollTrigger: {
      trigger: '.chuxian',
      toggleActions: 'restart none reverse none',
    },
    x: 300,
    rotation: 360,
    duration: 3,
    ease: 'bounce',
  })
  // let t2 = gsap.timeline()

  gsap.to('.gsap-box-2', {
    duration: 1,
    x: document.body.clientWidth / 2,
  })
  gsap.to('.gsap-box-1-inner', {
    duration: 1,
    borderRadius: '50%',
    backgroundColor: '#fff',
  })
  gsap.to(obj, {
    duration: 10,
    num: 0,
    onUpdate() {
      console.log(obj.num)
      nObj.num = Math.round(obj.num)
    },
  })
}
getTween()
