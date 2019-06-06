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
  let els = document.querySelectorAll(`.letter`)
  let elsArray = [...els]

  let phisicLetters = []
  let letters = []

  let layers = new Array(4).fill().map(x => new PIXI.Container())
  layers[3].blendMode = 2
  layers.forEach(layer => {
    container.addChild(layer)
  })

  const renderLetter = (text, cords, color, phisicLetterArrays, containers, power, layerStackNumber, fontsize, rotation) => {
    let containerLetter = new PIXI.Container()
    let textLetter = new PIXI.Text(text, {
      fontFamily: 'Alfa Slab One',
      fontSize: fontsize,
      fill: color,
      align: 'center'
    })

    textLetter.position.x = cords.x
    textLetter.position.y = cords.y

    if (rotation) {
      textLetter.rotation = rotation
    }

    if (layerStackNumber === 3) {
      textLetter.blendMode = 2
    }

    containerLetter.addChild(textLetter)
    layers[layerStackNumber].addChild(containerLetter)

    phisicLetterArrays.push(
      new PHISIC(textLetter.position.x + cords.width / 2, textLetter.position.y + cords.height / 2, power)
    )

    containers.push(containerLetter)
  }

  elsArray.forEach(letter => {
    let cordsLetter = letter.getBoundingClientRect()
    renderLetter(letter.innerText, cordsLetter, 0x03aaea, phisicLetters, letters, 3, 0, 104)
    renderLetter(letter.innerText, cordsLetter, 0xf9ed00, phisicLetters, letters, 5, 1, 104)
    renderLetter(letter.innerText, cordsLetter, 0xe80289, phisicLetters, letters, 4, 2, 104)
    renderLetter(letter.innerText, cordsLetter, 0x03aaea, phisicLetters, letters, 3, 3, 104)
  })

  // random smileys
  for (var i = 100; i > 0; i--) {
    let coords = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: Math.random() * 40 + 10,
      height: Math.random() * 40 + 10
    }
    let randomRotation = 3 * Math.random()
    renderLetter(':-)))))', coords, 0x03aaea, phisicLetters, letters, 3, 0, coords.width, randomRotation)
    renderLetter(':-)))))', coords, 0xf9ed00, phisicLetters, letters, 5, 0, coords.width, randomRotation)
    renderLetter(':-)))))', coords, 0xe80289, phisicLetters, letters, 4, 0, coords.width, randomRotation)
    renderLetter(':-)))))', coords, 0x03aaea, phisicLetters, letters, 3, 0, coords.width, randomRotation)
  }

  app.ticker.add(() => {
    let mousposition = app.renderer.plugins.interaction.mouse.global

    phisicLetters.forEach((letter, j) => {
      letter.think(mousposition)

      letters[j].position.x = letter.diffX
      letters[j].position.y = letter.diffY
    })
  })
}
