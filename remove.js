let x = 0
let y = 0
let xAxis = 5
let yAxis = 5
let d = 'N'
let currentDirection = null

const moves  = 'LMRMM'

let degrees = 0

// const directionToAngle = {
//   'N': 0,
//   'W': 270,
//   'S': 180,
//   'E': 90
// }
const directionToAngle = {
  0: 'N',
  360: 'N',
  270: 'W',
  180: 'S',
  90: 'E'
}
const moveList = moves.split('')
moveList.forEach((v, i) => {
  if (v === 'M') {
    // if (currentDirection === null) {
    //   if (angle === 0 || angle === 360) {
    //     y += 1
    //   }
    //   if (angle === 270) {
    //     x -= 1
    //   }
    //   if (angle === 180) {
    //     y -= 1
    //   }
    //   if (angle === 90) {
    //     x += 1
    //   }
    // } else {
      if (degrees === 270) {
        x -= 1
      } else if (degrees === 180) {
        y -= 1
      } else if (degrees === 90) {
        x += 1
      } else {
        y += 1
      }
    // }
  }
  if (v === 'R') {
    currentDirection = v
    if (degrees <= 270) {
      degrees += 90
    } else if (degrees === 360) {
      degrees = 90
    }
  }
  if (v === 'L') {
    currentDirection = v
    if (degrees === 360 || degrees === 0) {
      degrees = 270
    } else if (degrees <= 270 && degrees !== 0) {
      degrees -= 90
    }
  }

  console.log(v, x, y)
})
