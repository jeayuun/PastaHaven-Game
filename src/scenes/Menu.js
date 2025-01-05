export class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("background", "assets/bg.png"); // Load background image
    this.load.image("playButton", "assets/plank.png"); // Load button images
    this.load.image("quitButton", "assets/plank.png");
    this.load.image("optionsButton", "assets/plank.png");
  }

  create() {
    // Add background
    const bg = this.add.image(0, 0, "background");
    bg.setOrigin(0, 0);
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // Add title
    const title = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 4,
      "Pasta Haven",
      {
        fontFamily: "PixelFont",
        fontSize: "72px",
        color: "#ffffff",
        align: "center",
      }
    );
    title.setOrigin(0.5, 0.5);
    title.setShadow(3, 3, "#000000", 4);

    // Button positions
    const buttonY = this.cameras.main.height / 2;
    const buttonSpacing = 100; // Space between buttons

    // Play button
    const playButton = this.add.image(
      this.cameras.main.width / 2,
      buttonY,
      "playButton"
    );
    playButton.setScale(0.5);
    playButton.setInteractive();
    const playText = this.add.text(
      playButton.x,
      playButton.y,
      "PLAY",
      {
        fontFamily: "PixelFont",
        fontSize: "36px",
        color: "#000000",
      }
    );
    playText.setOrigin(0.5, 0.5);

    playButton.on("pointerdown", () => {
      this.scene.start("MainMenu"); // Start MainMenu scene
    });

    // Quit button
    const quitButton = this.add.image(
      this.cameras.main.width / 2,
      buttonY + buttonSpacing,
      "quitButton"
    );
    quitButton.setScale(0.5);
    quitButton.setInteractive();
    const quitText = this.add.text(
      quitButton.x,
      quitButton.y,
      "QUIT",
      {
        fontFamily: "PixelFont",
        fontSize: "36px",
        color: "#000000",
      }
    );
    quitText.setOrigin(0.5, 0.5);

    quitButton.on("pointerdown", () => {
      window.close(); // Exit the game (works only in certain browsers)
    });

    // Options button
    const optionsButton = this.add.image(
      this.cameras.main.width / 2,
      buttonY + 2 * buttonSpacing,
      "optionsButton"
    );
    optionsButton.setScale(0.5);
    optionsButton.setInteractive();
    const optionsText = this.add.text(
      optionsButton.x,
      optionsButton.y,
      "OPTIONS",
      {
        fontFamily: "PixelFont",
        fontSize: "36px",
        color: "#000000",
      }
    );
    optionsText.setOrigin(0.5, 0.5);

    optionsButton.on("pointerdown", () => {
      this.scene.start("Options"); // Start Options scene
    });

    // Add hover effect for all buttons
    [playButton, quitButton, optionsButton].forEach((button) => {
      button.on("pointerover", () => {
        button.setScale(0.55);
      });
      button.on("pointerout", () => {
        button.setScale(0.5);
      });
    });
  }
}
