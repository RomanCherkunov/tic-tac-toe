const App = {
  // All of our selected elements
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector("[data-id='menu-popover']"),
    resetBtn: document.querySelector("[data-id='reset-btn']"),
    newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
    squares: document.querySelectorAll(".square"),
    modal: document.querySelector('.modal'),
    modalText: document.querySelector("[data-id='modal-text']"),
    modalBtn: document.querySelector("[data-id='modal-btn']"),
    turn: document.querySelector("[data-id='turn']"),
  },

  state: {
    moves: [],
  },

  getGameStatus(moves) {
    const p1Moves = moves.filter((move) => move.playerId === 1).map(move => +move.squareId)
    const p2Moves = moves.filter((move) => move.playerId === 2).map(move => +move.squareId)

    const winnerPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9],
    ];

    let winner = null

    winnerPatterns.forEach(pattern => {
      const p1Wins = pattern.every(v => p1Moves.includes(v))
      const p2Wins = pattern.every(v => p2Moves.includes(v))

      if(p1Wins) winner = 1
      if(p2Wins) winner = 2


    })

    return {
      status: moves.length === 9 || winner != null ? 'complete' : 'in-progress',
      winner
    };
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    // DONE
    App.$.menu.addEventListener("click", toggle);
    function toggle() {
      App.$.menuItems.classList.toggle("hidden");
      App.$.menu.classList.toggle("border");
    }

    // TODO
    App.$.resetBtn.addEventListener("click", reset);
    function reset() {
      console.log("reset");
    }

    // TODO
    App.$.newRoundBtn.addEventListener("click", newRound);
    function newRound() {
      console.log("new round");
    }

    App.$.modalBtn.addEventListener('click', () => {
      App.state.moves = []
      App.$.squares.forEach(el => el.replaceChildren())
      App.$.modal.classList.add('hidden')
    })

    // TODO
    App.$.squares.forEach((square) => {
      square.addEventListener("click", (e) => {
        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        };

        if (hasMove(+square.id)) {
          return;
        }

        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer =
          App.state.moves.length === 0
            ? 1
            : getOppositePlayer(lastMove.playerId);
        const nextPlayer = getOppositePlayer(currentPlayer)

        const icon = document.createElement("i");
        const img = document.createElement("img");
        const turnIcon = document.createElement("i");
        const turnImg = document.createElement("img");

        const turnLabel = document.createElement('p')
        turnLabel.innerText = `Player ${nextPlayer}, you are up!`

        if (currentPlayer === 1) {
          img.setAttribute("src", "./icons//close.svg");
          App.$.turn.classList.add("yellow")
          App.$.turn.classList.remove("turquoise")
          turnIcon.classList.add("gg-shape-circle");
        } else {
          icon.classList.add("gg-shape-circle");
          App.$.turn.classList.add("turquoise")
          App.$.turn.classList.remove("yellow")
          turnIcon.classList.add('gg-close')
        }

        App.$.turn.replaceChildren(turnIcon, turnLabel)

        App.state.moves.push({ squareId: +square.id, playerId: currentPlayer });

        icon.appendChild(img);
        square.replaceChildren(icon);

        // Check winner
        const game = App.getGameStatus(App.state.moves)

        if(game.status === 'complete') {
          App.$.modal.classList.remove('hidden')

          let message =''
          if(game.winner) {
            message = `Player ${game.winner} wins!`
          } else {
            message = 'Tie game!'
          }

          App.$.modalText.textContent = message
        }
      });
    });
  },
};

window.addEventListener("load", App.init);
