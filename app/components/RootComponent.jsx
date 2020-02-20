const React = require("react");
const Game = require("./Game");

/* the main page for the index route of this app */
const RootComponent = function() {
  return (
    <div>
      <Game />
    </div>
  );
}

module.exports = RootComponent;