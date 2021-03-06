import { Player } from './player';

export class Caption {
  _player: Player;
  _text: string;
  _chosenBy: Player[];
  _isOriginal: boolean;

  constructor(player, text, isOriginal = false) {
    this._player = player;
    this._text = text.toLowerCase();
    this._chosenBy = []; // players who choose this caption
    this._isOriginal = isOriginal;
  }

  getPlayer() {
    return this._player;
  }

  getText() {
    return this._text;
  }

  getChosenBy() {
    return this._chosenBy;
  }

  choose(player) {
    this._chosenBy.push(player);
  }

  isOriginal() {
    return this._isOriginal;
  }
}
