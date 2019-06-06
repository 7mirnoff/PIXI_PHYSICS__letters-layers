import * as PIXI from 'pixi.js'
import PHISIC from './modules/phisic.js'

const WebFont = require('webfontloader')

WebFont.load({
  google: {
    families: ['Alfa Slab One']
  },
  active: () => {
    init()
  }
})

let app = new PIXI.Application({
  transparent: true
})
document.body.appendChild(app.view)

const setPixiSize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight)
}

setPixiSize()

window.addEventListener(`resize`, () => {
  setPixiSize()
})

let container = new PIXI.Container()

app.stage.addChild(container)

const init = () => {
  // let textHack = new PIXI.Text('NO pain NO gain', {
  //   fontFamily: 'Alfa Slab One',
  //   fontSize: 54,
  //   fill: 0x03aaea,
  //   align: 'center'
  // })

  // textHack.position.set(20)
  // container.addChild(textHack)

  // let textYellow = new PIXI.Text('NO pain NO gain', {
  //   fontFamily: 'Alfa Slab One',
  //   fontSize: 54,
  //   fill: 0xf9ed00,
  //   align: 'center'
  // })

  // textYellow.position.set(0)
  // container.addChild(textYellow)

  // let textRed = new PIXI.Text('NO pain NO gain', {
  //   fontFamily: 'Alfa Slab One',
  //   fontSize: 54,
  //   fill: 0xe80289,
  //   align: 'center'
  // })

  // textRed.position.set(10)
  // container.addChild(textRed)

  // let textBlue = new PIXI.Text('NO pain NO gain', {
  //   fontFamily: 'Alfa Slab One',
  //   fontSize: 54,
  //   fill: 0x03aaea,
  //   align: 'center'
  // })

  // textBlue.position.set(20)
  // textBlue.blendMode = 2
  // container.addChild(textBlue)

  let els = document.querySelectorAll(`.letter`)
  let elsArray = [...els]

  let phisicLetters = []
  let letters = []

  let layers = new Array(4).fill().map(x => new PIXI.Container())
  layers.forEach(layer => {
    container.addChild(layer)
  })

  // layers[3].blendMode = 2

  elsArray.forEach(letter => {
    let cordsLetter = letter.getBoundingClientRect()

    const renderLetter = (cords, color, phisicLetterArrays, containers, power, layerStackNumber) => {
      let containerLetter = new PIXI.Container()
      let textLetter = new PIXI.Text(letter.innerText, {
        fontFamily: 'Alfa Slab One',
        fontSize: 108,
        fill: color,
        align: 'center'
      })

      textLetter.position.x = cords.x
      textLetter.position.y = cords.y + 350

      if (layerStackNumber === 3) {
        textLetter.blendMode = 2
      }

      containerLetter.addChild(textLetter)
      layers[layerStackNumber].addChild(containerLetter)

      phisicLetterArrays.push(
        new PHISIC(textLetter.position.x + cordsLetter.width / 2, textLetter.position.y + cordsLetter.height / 2, power)
      )

      containers.push(containerLetter)
    }

    renderLetter(cordsLetter, 0x03aaea, phisicLetters, letters, 3, 0)
    renderLetter(cordsLetter, 0xf9ed00, phisicLetters, letters, 5, 1)
    renderLetter(cordsLetter, 0xe80289, phisicLetters, letters, 4, 2)
    renderLetter(cordsLetter, 0x03aaea, phisicLetters, letters, 3, 3)
  })

  // let count = 0
  app.ticker.add(() => {
    // count++
    // console.log(phisicLetters)

    let mousposition = app.renderer.plugins.interaction.mouse.global
    // console.log(mousposition)

    phisicLetters.forEach((letter, j) => {
      letter.think(mousposition)

      letters[j].position.x = letter.diffX
      letters[j].position.y = letter.diffY
    })
  })
}
