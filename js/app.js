const App = {
  // All of our selected elements
  $: {
    menu: document.querySelector("[data-id='menu']"),
    menuItems: document.querySelector("[data-id='menu-popover']"),
    resetBtn: document.querySelector("[data-id='reset-btn']"),
    newRoundBtn: document.querySelector("[data-id='new-round-btn']"),
    squares: document.querySelectorAll(".square"),
  },

  init() {
    App.registerEventListeners();
  },

  registerEventListeners() {
    App.$.menu.addEventListener("click", toggle);
    function toggle() {
      App.$.menuItems.classList.toggle("hidden");
      App.$.menu.classList.toggle("border");
    }

    App.$.resetBtn.addEventListener("click", reset);
    function reset() {
      console.log("reset");
    }

    App.$.newRoundBtn.addEventListener("click", newRound);
    function newRound() {
      console.log("new round");
    }

    App.$.squares.forEach((square) => {
      square.addEventListener("click", (e) => {
        console.log(e.target.id);
      });
    });
  },
};

window.addEventListener("load", App.init);
