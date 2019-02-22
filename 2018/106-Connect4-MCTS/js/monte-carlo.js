'use strict';

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generated by CoffeeScript 2.3.2
var MonteCarlo;

MonteCarlo = class MonteCarlo {
  constructor(game, UCB1ExploreParam = 2) {
    this.game = game;
    this.UCB1ExploreParam = UCB1ExploreParam;
    this.nodes = new _map2.default();
  }

  makeNode(state) {
    var node, unexpandedPlays;
    if (!this.nodes.has(state.hash())) {
      unexpandedPlays = this.game.legalPlays(state).slice();
      node = new MonteCarloNode(null, null, state, unexpandedPlays);
      return this.nodes.set(state.hash(), node);
    }
  }

  runSearch(state, timeout = 3) {
    var draws, end, node, totalSims, winner;
    this.makeNode(state);
    draws = 0;
    totalSims = 0;
    end = Date.now() + timeout * 1000;
    while (Date.now() < end) {
      node = this.select(state);
      winner = this.game.winner(node.state);
      if (node.isLeaf() === false && winner === null) {
        node = this.expand(node);
        winner = this.simulate(node);
      }
      this.backpropagate(node, winner);
      if (winner === 0) {
        draws++;
      }
      totalSims++;
    }
    return {
      runtime: timeout,
      simulations: totalSims,
      draws: draws
    };
  }

  bestPlay(state, policy = "robust") {
    var allPlays, bestPlay, childNode, i, j, len, len1, max, node, play, ratio;
    this.makeNode(state);
    print('state.hash', state.hash());
    print('nodes', this.nodes);
    if (this.nodes.get(state.hash()).isFullyExpanded() === false) {
      throw new Error("Not enough information!");
    }
    node = this.nodes.get(state.hash());
    allPlays = node.allPlays();
    bestPlay = null;
    if (policy === "robust") {
      max = -2e308;
      for (i = 0, len = allPlays.length; i < len; i++) {
        play = allPlays[i];
        childNode = node.childNode(play);
        if (childNode.n_plays > max) {
          bestPlay = play;
          max = childNode.n_plays;
        }
      }
    } else if (policy === "max") {
      max = -2e308;
      for (j = 0, len1 = allPlays.length; j < len1; j++) {
        play = allPlays[j];
        childNode = node.childNode(play);
        ratio = childNode.n_wins / childNode.n_plays;
        if (ratio > max) {
          bestPlay = play;
          max = ratio;
        }
      }
    }
    return bestPlay;
  }

  select(state) {
    var bestPlay, bestUCB1, childUCB1, i, len, node, play, plays;
    node = this.nodes.get(state.hash());
    while (node.isFullyExpanded() && !node.isLeaf()) {
      plays = node.allPlays();
      bestPlay = null;
      bestUCB1 = -2e308;
      for (i = 0, len = plays.length; i < len; i++) {
        play = plays[i];
        childUCB1 = node.childNode(play).getUCB1(this.UCB1ExploreParam);
        if (childUCB1 > bestUCB1) {
          bestPlay = play;
          bestUCB1 = childUCB1;
        }
      }
      node = node.childNode(bestPlay);
    }
    return node;
  }

  expand(node) {
    var childNode, childState, childUnexpandedPlays, index, play, plays;
    plays = node.unexpandedPlays();
    index = Math.floor(Math.random() * plays.length);
    play = plays[index];
    childState = this.game.nextState(node.state, play);
    childUnexpandedPlays = this.game.legalPlays(childState);
    childNode = node.expand(play, childState, childUnexpandedPlays);
    this.nodes.set(childState.hash(), childNode);
    return childNode;
  }

  simulate(node) {
    var play, plays, state, winner;
    state = node.state;
    winner = this.game.winner(state);
    while (winner === null) {
      plays = this.game.legalPlays(state);
      play = plays[Math.floor(Math.random() * plays.length)];
      state = this.game.nextState(state, play);
      winner = this.game.winner(state);
    }
    return winner;
  }

  backpropagate(node, winner) {
    var results;
    results = [];
    while (node !== null) {
      node.n_plays++;
      if (node.state.isPlayer(-winner)) {
        node.n_wins++;
      }
      results.push(node = node.parent);
    }
    return results;
  }

  getStats(state) {
    var child, node, stats;
    node = this.nodes.get(state.hash());
    stats = {
      n_plays: node.n_plays,
      n_wins: node.n_wins,
      children: []
    };
    for (child in node.children.values()) {
      if (child.node === null) {
        stats.children.push({
          play: child.play,
          n_plays: null,
          n_wins: null
        });
      } else {
        stats.children.push({
          play: child.play,
          n_plays: child.node.n_plays,
          n_wins: child.node.n_wins
        });
      }
    }
    return stats;
  }

};
//# sourceMappingURL=monte-carlo.js.map
