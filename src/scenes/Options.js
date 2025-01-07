export class Options extends Phaser.Scene {
    constructor() {
      super("Options")
    }
  
    preload() {
      this.load.image("background", "assets/bg.png")
      this.load.image("option", "assets/option.png")
      this.load.image("back", "assets/opt-back.png")
      this.load.image("musicon", "assets/opt-musicon.png")
      this.load.image("musicoff", "assets/opt-musicoff.png")
      this.load.image("sfxon", "assets/opt-sfxon.png")
      this.load.image("sfxoff", "assets/opt-sfxoff.png")
      this.load.image("button", "assets/plank.png")
    }
  
    create() {
        const hoverSound = this.sound.add("hover")
        const startSound = this.sound.add("start")
        const selectSound = this.sound.add("select")
        

        const bg = this.add.image(0, 0, "background")
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)

        const option = this.add.image(
            this.cameras.main.width / 2,
            this.cameras.main.width / 4,
            "option"
          )
        option.setOrigin(0.5, 0.3).setScale(850 / option.width)
    
        // Button positions
        const buttonY = this.cameras.main.height / 1.85;
        const buttonSpacing = 146;
    
        // Music Toggle Button
        let musicOn = true;
        const musicButton = this.add.image(
        this.cameras.main.width / 2,
        buttonY - buttonSpacing,
        "musicon"
        );
        musicButton.setScale(0.25);
        musicButton.setInteractive();

        musicButton.on("pointerdown", () => {
        musicOn = !musicOn;
        musicButton.setTexture(musicOn ? "musicon" : "musicoff"); // Toggle image
        this.sound.mute = !musicOn; // Toggle background music
        });
    
        // Sound Effects Toggle Button (Image)
        let soundEffectsOn = true;
        const soundEffectsButton = this.add.image(
        this.cameras.main.width / 2,
        buttonY,
        "sfxon"
        );
        soundEffectsButton.setScale(0.25);
        soundEffectsButton.setInteractive();

        soundEffectsButton.on("pointerdown", () => {
        soundEffectsOn = !soundEffectsOn;
        soundEffectsButton.setTexture(soundEffectsOn ? "sfxon" : "sfxoff"); // Toggle image
        this.sound.volume = soundEffectsOn ? 1 : 0; // Toggle sound effects
        });
    
        // Back Button
        const backButton = this.add.image(
            this.cameras.main.width / 2,
            buttonY + buttonSpacing,
            "back"
        );
        backButton.setScale(0.25);
        backButton.setInteractive();
    
        backButton.on("pointerdown", () => {
            this.scene.start("Menu"); // Go back to the Menu scene
        });
    
        // Hover effects for all buttons
        [musicButton, soundEffectsButton, backButton].forEach((button) => {
            button.on("pointerover", () => {
            button.setScale(0.28);
            hoverSound.play()
            });
            button.on("pointerout", () => {
            button.setScale(0.25);
            });
        });
        }
    }
    