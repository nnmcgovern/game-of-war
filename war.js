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
    this.cards = []
    this.setDeck()
  }

  setDeck() {
    const suits = ["Hearts", "Spades", "Clubs", "Diamonds"]
    const ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]

    suits.forEach(suit => {
      let i = 1;
      ranks.forEach(rank => {
        this.cards.push(new Card(suit, rank, i++))
      })
    })

    this.shuffle()
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

  draw() {
    if (this.cards.length > 0) {
      return this.cards.pop()
    }
  }
}

// ***************************************

class War {
  constructor() {
    this.pile = []
    this.player1 = []
    this.player2 = []
    this.divideCards()
    this.game()
  }

  divideCards() {
    const { cards } = new Deck
    this.player1.push(...cards.splice(0, 26))
    this.player2.push(...cards)
  }

  game() {
    while (this.player1.length > 0 && this.player2.length > 0) {
      let player1Card = this.player1.pop()
      let player2Card = this.player2.pop()
      this.displayCards(player1Card, player2Card)

      if (player1Card.score === player2Card.score) { // war
        this.pile.push(player1Card, player2Card)
        console.log("WAR\n\n")
        this.war()
      }
      else if (player1Card.score > player2Card.score) {
        this.player1.unshift(player2Card, player1Card, ...this.pile.splice(0))
        console.log("Player 1 wins the round!\n\n")
      }
      else { // player 2 wins
        this.player2.unshift(player1Card, player2Card, ...this.pile.splice(0))
        console.log("Player 2 wins the round!\n\n")
      }
    }

    if (this.player1.length > 0) {
      console.log("Player 1 wins the game!")
      console.log(`Player 1 has ${this.player1.length} cards`)
    }
    else {
      console.log("Player 2 wins the game!")
      console.log(`Player 1 has ${this.player2.length} cards`)
    }
  }

  war() {
    if (this.player1.length < 4 || this.player2.length < 4) {
      if (this.player1.length < 4) { // player 2 wins
        this.player2.push(...this.player1.splice(0), ...this.pile.splice(0))
      }
      else { // player 1 wins
        this.player1.push(...this.player2.splice(0), ...this.pile.splice(0))
      }
    }
    else { // both players have enough cards for war
      this.pile.push(...this.player1.splice(-3, 3), ...this.player2.splice(-3, 3))
    }
  }

  displayCards(p1Card, p2Card) {
    console.log(`Player 1's card: ${p1Card.rank} of ${p1Card.suit}`)
    console.log(`Player 2's card: ${p2Card.rank} of ${p2Card.suit}`)
  }
}

let game = new War