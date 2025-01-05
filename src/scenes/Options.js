export class Options extends Phaser.Scene {
    constructor() {
      super("Options");
    }
  
    preload() {
      this.load.image("background", "assets/bg.png"); // Background image
      this.load.image("backButton", "assets/plank.png"); // Back button image
    }
  
    create() {
      // Add background
      const bg = this.add.image(0, 0, "background");
      bg.setOrigin(0, 0);
      bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
  
      // Title
      const title = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 4,
        "Options",
        {
          fontFamily: "PixelFont",
          fontSize: "48px",
          color: "#ffffff",
          align: "center",
        }
      );
      title.setOrigin(0.5, 0.5);
      title.setShadow(2, 2, "#000000", 3);
  
      // Music toggle
      let musicOn = true;
      const musicText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 50,
        "Music: ON",
        {
          fontFamily: "PixelFont",
          fontSize: "32px",
          color: "#ffffff",
        }
      );
      musicText.setOrigin(0.5, 0.5);
      musicText.setInteractive();
  
      musicText.on("pointerdown", () => {
        musicOn = !musicOn;
        musicText.setText(`Music: ${musicOn ? "ON" : "OFF"}`);
        this.sound.mute = !musicOn; // Toggle background music
      });
  
      // Sound effects toggle
      let soundEffectsOn = true;
      const soundEffectsText = this.add.text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 50,
        "Sound Effects: ON",
        {
          fontFamily: "PixelFont",
          fontSize: "32px",
          color: "#ffffff",
        }
      );
      soundEffectsText.setOrigin(0.5, 0.5);
      soundEffectsText.setInteractive();
  
      soundEffectsText.on("pointerdown", () => {
        soundEffectsOn = !soundEffectsOn;
        soundEffectsText.setText(`Sound Effects: ${soundEffectsOn ? "ON" : "OFF"}`);
        this.sound.volume = soundEffectsOn ? 1 : 0; // Toggle sound effects
      });
  
      // Back button
      const backButton = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height - 100,
        "backButton"
      );
      backButton.setScale(0.5);
      backButton.setInteractive();
      const backText = this.add.text(
        backButton.x,
        backButton.y,
        "BACK",
        {
          fontFamily: "PixelFont",
          fontSize: "32px",
          color: "#000000",
        }
      );
      backText.setOrigin(0.5, 0.5);
  
      backButton.on("pointerdown", () => {
        this.scene.start("Menu"); // Go back to the Menu scene
      });
  
      // Hover effect for the back button
      backButton.on("pointerover", () => {
        backButton.setScale(0.55);
      });
      backButton.on("pointerout", () => {
        backButton.setScale(0.5);
      });
    }
  }
  