import { Game } from "./scenes/Game"
import { GameOver } from "./scenes/GameOver"
import { Menu } from "./scenes/Menu"
import { Options } from "./scenes/Options"
import { MainMenu } from "./scenes/MainMenu"
import { Level1 } from "./scenes/Level1"
import { Preloader } from "./scenes/PreLoader"

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1280,
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preloader, Menu, Options,  MainMenu, Level1, GameOver],
}

export default new Phaser.Game(config)
