export class Options extends Phaser.Scene {
    constructor() {
      super("Options")
    }
  
    preload() {
      this.load.image("background", "assets/bg.png")
      this.load.image("button", "assets/plank.png")
    }
  
    create() {
        const hoverSound = this.sound.add("hover")

        const bg = this.add.image(0, 0, "background")
        bg.setOrigin(0, 0);
        bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height)
    
        const title = this.add.text(
            this.cameras.main.width / 2,
            this.cameras.main.height / 4,
            "Options",
            {
            fontFamily: "PixelFont",
            fontSize: "68px",
            color: "#ffffff",
            align: "center",
            }
        );
        title.setOrigin(0.5, 0.5);
        title.setShadow(2, 2, "#000000", 3);
    
        // Button positions
        const buttonY = this.cameras.main.height / 2;
        const buttonSpacing = 180;
    
        // Music Toggle Button
        let musicOn = true;
        const musicButton = this.add.image(
            this.cameras.main.width / 2,
            buttonY - buttonSpacing,
            "button"
        );
        musicButton.setScale(0.25);
        musicButton.setInteractive();
        const musicText = this.add.text(
            musicButton.x,
            musicButton.y,
            "Music: ON",
            {
            fontFamily: "PixelFont",
            fontSize: "32px",
            color: "#000000",
            }
        );
        musicText.setOrigin(0.5, 0.5);
    
        musicButton.on("pointerdown", () => {
            musicOn = !musicOn;
            musicText.setText(`Music: ${musicOn ? "ON" : "OFF"}`);
            this.sound.mute = !musicOn; // Toggle background music
        });
    
        // Sound Effects Toggle Button
        let soundEffectsOn = true;
        const soundEffectsButton = this.add.image(
            this.cameras.main.width / 2,
            buttonY,
            "button"
        );
        soundEffectsButton.setScale(0.25);
        soundEffectsButton.setInteractive();
        const soundEffectsText = this.add.text(
            soundEffectsButton.x,
            soundEffectsButton.y,
            "Sound Effects: ON",
            {
            fontFamily: "PixelFont",
            fontSize: "32px",
            color: "#000000",
            }
        );
        soundEffectsText.setOrigin(0.5, 0.5);
    
        soundEffectsButton.on("pointerdown", () => {
            soundEffectsOn = !soundEffectsOn;
            soundEffectsText.setText(`Sound Effects: ${soundEffectsOn ? "ON" : "OFF"}`);
            this.sound.volume = soundEffectsOn ? 1 : 0; // Toggle sound effects
        });
    
        // Back Button
        const backButton = this.add.image(
            this.cameras.main.width / 2,
            buttonY + buttonSpacing,
            "button"
        );
        backButton.setScale(0.25);
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
    