import { createLogger } from './logger';

export class Player {
  constructor(id) {
    this.id = id;
    this.socket = null;
    this.log = createLogger(this.id);
    this.game = null;
    this.name = '';
    this.errorMessage = null;
  }

  getId() {
    return this.id;
  }

  setSocket(socket) {
    this.socket = socket;
    this.update();
  }

  setName(name) {
    this.name = name;
    this.update();
  }

  getName() {
    return this.name;
  }

  getGameId() {
    if (this.game) {
      return this.game.id;
    }
    return null;
  }

  joinGame(game) {
    this.game = game;
    // Add player reference in game
    game.addPlayer(this);

    this.update();
  }

  leaveGame() {
    if (this.game) {
      this.game.removePlayer(this);
      this.game = null;
      this.update();
    }
  }

  startGame() {
    if (this.game) {
      this.game.start();
    }
  }

  sendError(err) {
    this.state.errorMessage = err;
    this.sync();

    // clear the error message for future refreshes
    this.state.errorMessage = null;
  }

  postDrawing(drawing) {
    if (this.game) {
      this.game.postDrawing(this, drawing);
      this.sync();
    }
  }

  postCaption(caption) {
    if (this.game) {
      this.game.postCaption(this, caption);
      this.sync();
    }
  }

  // pushes game updates to all other players in the current game,
  // or just the current player if not in a game
  update() {
    if (this.game) {
      this.game.sync();
    } else {
      this.sync();
    }
  }

  // syncs the player state with the client
  sync() {
    const data = {
      // state saved aginst the player
      name: this.name,
      errorMessage: this.errorMessage,
      // state saved against the game the player is currently in
      gameId: this.getGameId(),
      playerList: this.game && this.game.listPlayers(),
      phase: this.game && this.game.getPhase(),
      isWaiting: this.game && this.game.isPlayerWaiting(this),
      prompt: this.game && this.game.getPrompt(this),
      viewDrawing: this.game && this.game.getViewDrawing(),
      captions: this.game && this.game.getCaptions(),
    };
    this.log('sync:');
    this.log(data);
    this.emit('sync', data);
  }

  emit(tag, message) {
    this.socket.emit(tag, message);
  }
}
