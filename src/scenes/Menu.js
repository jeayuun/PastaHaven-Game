export class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("background", "assets/bg.png")
    this.load.image("playButton", "assets/play-btn.png")
    this.load.image("quitButton", "assets/quit-btn.png")
    this.load.image("optionsButton", "assets/option-btn.png")
    this.load.image("title-bg", "assets/title-bg.png")
  }

  create() {
    const hoverSound = this.sound.add("hover")
    const startSound = this.sound.add("start")
    const selectSound = this.sound.add("select")
    
    const bg = this.add.image(0, 0, "background")
    bg.setOrigin(0, 0)
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height) 

    const titleBg = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.width / 4,
      "title-bg"
    )
    titleBg.setOrigin(0.5, 0.6).setScale(1500 / titleBg.width)

    const subtitle = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height - 80, 
        "Created by Group 2 of BSCS 3-1N",
        {
          fontFamily: "PixelFont",
          fontSize: "32px", 
          color: "#ffffff",
          align: "center",
        }
      );
      subtitle.setOrigin(0.5, 0.5);
      subtitle.setShadow(2, 2, "#000000", 3, false, true);

    // Button positions
    const buttonY = this.cameras.main.height / 2
    const buttonSpacing = 180

    // Play button
    const playButton = this.add.image(
      this.cameras.main.width / 2,
      buttonY,
      "playButton"
    );
    playButton.setScale(0.25);
    playButton.setInteractive();

    playButton.on("pointerdown", () => {
        startSound.play()
        this.scene.start("MainMenu")
    })

    // Options button
    const optionsButton = this.add.image(
      this.cameras.main.width / 2,
      buttonY + buttonSpacing,
      "optionsButton"
    );
    optionsButton.setScale(0.25);
    optionsButton.setInteractive();
    
    optionsButton.on("pointerdown", () => {
        startSound.play()
        this.scene.start("Options")
    });

    // Quit button
    const quitButton = this.add.image(
      this.cameras.main.width / 2,
      buttonY + 2 * buttonSpacing,
      "quitButton"
    );
    quitButton.setScale(0.25)
    quitButton.setInteractive()

    quitButton.on("pointerdown", () => {
        startSound.play()
        window.close() // Exit the game (works only in certain browsers)
    });

    [playButton, optionsButton, quitButton].forEach((button) => {
      button.on("pointerover", () => {
        button.setScale(0.28)
        hoverSound.play()
        document.body.style.cursor = "url('assets/cursors/hover-cursor.png'), auto"
      });
      button.on("pointerout", () => {
        button.setScale(0.25)
        document.body.style.cursor = "url('assets/cursors/normal-cursor.png'), auto"
      });
    });
  }
}
