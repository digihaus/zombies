window.onload = function () {
  var m = require("@digihaus/monogatari");
  m.init("#000");

  var Hero = require("go/single/Hero");
  var Bullets = require("buffer/Bullets");
  var Zombies = require("buffer/Zombies");
  var Collider = require("util/Collider");

  startGame();

  function startGame() {
    var score = 0;
    var gameOver = false;

    m.world.update = function () {
      if (!gameOver) {
        Zombies.spawn();
        score = Collider.checkCollisions(score);

        if (Hero.dead) {
          gameOver = true;
          Zombies.clear();

          var zombiesKilled = score + ' zombies killed.';
          if (score === 0) {
            zombiesKilled = 'No zombies killed.';
          }
          if (score === 1) {
            zombiesKilled = '1 zombie killed.';
          }

          var restart = confirm('You died!\n\n' //
            + zombiesKilled + '\n\n' //
            + 'Start again?');

          if (restart) {
            location.reload();
          }
        }
      }
    };

    m.run();
  }
}