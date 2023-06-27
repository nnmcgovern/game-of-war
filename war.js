class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

// ***************************************

class Deck {
  constructor() {
    // this.length = 52
    this.cards = []
  }

  setCards() {
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"]
    const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
    // const cards = []

    suits.forEach(suit => {
      let i = 1;
      ranks.forEach(rank => {
        this.cards.push(new Card(suit, rank, i++))
      })
    })

    // return cards
  }

  draw() {
    if (this.cards.length > 0) {
      let index = Math.floor(Math.random() * this.cards.length)
      let card = this.cards[index]

      // this.length--
      this.cards.splice(index, 1)

      return card
    }
    else {
      console.log("Deck is empty")
    }
  }

  shuffle() {
    let randIndex = 0
    let temp = {}

    for (let i = 0; i < this.cards.length; i++) {
      randIndex = Math.floor(Math.random() * this.cards.length)

      temp = this.cards[i]
      this.cards[i] = this.cards[randIndex]
      this.cards[randIndex] = this.cards[i]
      // tuple didn't work for some reason
    }
  }

  collect(cards) { // cards must be an array
    this.cards.unshift(...cards)
  }

  getScore(card) {
    return card.score
  }
}

// ***************************************

class Player extends Deck {
  constructor() {
    super()
    this.cards = new Deck
  }
}

// ***************************************

class War extends Deck {
  constructor(player1, player2) { // instances of Player
    super()
    this.pile = new Deck
    this.player1 = player1
    this.player2 = player2
  }

  divideCards() {
    this.pile.setCards()
    this.pile.shuffle()

    this.player1.cards = this.pile.cards.slice(0, (this.pile.cards.length / 2))
    this.player2.cards = this.pile.cards.slice((this.pile.cards.length / 2), this.pile.cards.length)

    this.clearPile()
  }

  addToPile(cards) {
    this.pile.cards.push(...cards)
  }

  clearPile() {
    this.pile = new Deck
  }

  // compareScores() {
  //   return this.compare(this.pile.cards[-1].getScore(), this.pile.cards[-2].getScore())
  // }

  compare(card1 = new Card, card2 = new Card) {
    // if (score1 === score2) {
    //   return 0
    // }
    // else {
    //   if (score1 > score2) {
    //     return 1
    //   }
    //   else { // score2 > score1
    //     return 2
    //   }
    // }

    // let card1 = this.pile.cards[-1]
    // let card2 = this.pile.cards[-2]

    if (this.getScore(card1) === this.getScore(card2)) {
      return 0 // go to war
    }
    else {
      if (this.getScore(card1) > this.getScore(card2)) {
        return 1
      }
      else {
        return 2
      }
    }
  }

  war() {

  }

  // reveal() {
  //   // return this.pile.cards[-1]
  // }
}

// TEST ****************************************

// let deck = new Deck
// deck.setCards()
// deck.shuffle()
// // console.log("Shuffled deck:")
// // console.log(deck.cards)

// let card = new Card("some suit", "some rank", 10)
// let arr = []
// arr.push(card)

// deck.collect(arr)
// console.log(deck.cards)

let me = new Player
let notMe = new Player

let war = new War(me, notMe)
war.divideCards()

// console.log("Me's cards:")
// console.log(me.cards)
// console.log(me.cards.length)
// console.log("Not Me's cards:")
// console.log(notMe.cards)
// console.log(notMe.cards.length)

// console.log(me.draw())
// console.log(notMe.draw())
// war.addToPile([me.draw(), notMe.draw()])
// console.log(war.pile)
// console.log(war.compareScores())

let meCard = me.draw()
let notMeCard = notMe.draw()
// war.addToPile(meCard, notMeCard)
// console.log(meCard)
// console.log(notMeCard)
// console.log(war.compare(meCard, notMeCard))

console.log(me.cards)
console.log(notMe.cards)