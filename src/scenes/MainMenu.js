export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu")
  }

  preload() {
    this.load.image("background", "assets/bg.png")
    this.load.image("title", "assets/title.png")
    this.load.image("level1", "assets/spaghetti.png")
    this.load.image("level2", "assets/farfalle.png")
    this.load.image("level3", "assets/rigatoni.png")
    this.load.image("level4", "assets/ravioli.png")
    this.load.image("lock", "assets/lock.png")
    this.load.image("back-btn", "assets/back-btn.png")
  }

  create() {
    const hoverSound = this.sound.add("hover")
    const startSound = this.sound.add("start")
    const selectSound = this.sound.add("select")

    const bg = this.add.image(0, 0, "background")
    bg.setOrigin(0, 0)
    bg.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height) // Scale to fit

    const subtitle = this.add.text(
      this.cameras.main.width / 2,
      150, 
      "Choose your pasta!",
      {
        fontFamily: "PixelFont",
        fontSize: "48px", 
        color: "#ffffff",
        align: "center",
      }
    );
    subtitle.setOrigin(0.5, 0.5);
    subtitle.setShadow(2, 2, "#000000", 3, false, true);

    const levelTileWidth = 750
    const levelTileScale = levelTileWidth / this.cameras.main.width

    const levels = []
    const levelLabels = ["spaghetti", "farfalle", "rigatoni", "ravioli"]

    const positions = [
      { x: this.cameras.main.width / 2.7, y: this.cameras.main.height / 3.2 }, // Top-left
      { x: (1.85 * this.cameras.main.width) / 3, y: this.cameras.main.height / 3.2 }, // Top-right
      { x: this.cameras.main.width / 2.7, y: (2.3 * this.cameras.main.height) / 3.2 }, // Bottom-left
      { x: (1.85 * this.cameras.main.width) / 3, y: (2.3 * this.cameras.main.height) / 3.2 }, // Bottom-right
    ];

    for (let i = 0; i < 4; i++) {
      const level = this.add
        .image(positions[i].x, positions[i].y, `level${i + 1}`)
        .setInteractive();
      level.setScale(levelTileScale);
      level.preFX.addShadow();
      levels.push(level);

      const plank = this.add.image(
        positions[i].x,
        positions[i].y + 240,
        "plank"   
      );
      plank.setScale(0.19);
      plank.preFX.addShadow();

      const label = this.add.text(
        positions[i].x,
        positions[i].y + 240,
        levelLabels[i],
        {
          fontFamily: "PixelFont",
          fontSize: "36px",
          color: "#ffffff",
        }
      );
      label.setOrigin(0.5, 0.5);
      label.setShadow(2, 2, "#000000", 3, false, true);
    }

    for (let i = 0; i < 4; i++) {
      const group = this.add.group();
      const level = levels[i];
      group.add(level);
      if (i !== 0) {
        const lock = this.add.image(
          positions[i].x,
          positions[i].y,
          "lock"
        );
        lock.setScale(0.15);
        levels[i].setTint(0x808080);
        group.add(lock);
      }
      level.on("pointerover", () => {
        level.setScale(levelTileScale + 0.02);
        hoverSound.play();
        document.body.style.cursor = "url('assets/cursors/hover-cursor.png'), auto"
      });

      level.on("pointerout", () => {
        level.setScale(levelTileScale);
        document.body.style.cursor = "url('assets/cursors/normal-cursor.png'), auto"
      });
    }

    levels[0].on("pointerdown", () => {
      startSound.play()
      this.scene.start("Level1")
    })

    const backIcon = this.add.image(
      100, // Position near the left side
      100, // Y-coordinate remains the same
      "back-btn" // Use the "back.png" asset
    );
    backIcon.setInteractive();
    backIcon.setScale(0.1);
    
    backIcon.on("pointerdown", () => {
      this.scene.start("Menu"); // Navigate back to the Menu scene
    });

    backIcon.on("pointerover", () => {
      backIcon.setScale(0.12); // Zoom in slightly
      hoverSound.play();
      document.body.style.cursor = "url('assets/cursors/hover-cursor.png'), auto"
    });

    backIcon.on("pointerout", () => {
      backIcon.setScale(0.1); // Revert to original size
      document.body.style.cursor = "url('assets/cursors/normal-cursor.png'), auto"
    });

    const muteIcon = this.add.image(
      this.cameras.main.width - 100, 100,
      "muteIcon"
    )
    muteIcon.setInteractive()
    muteIcon.setScale(0.1)
    muteIcon.setVisible(false)
    
    muteIcon.on("pointerdown", () => {
      this.sound.mute = false
      selectSound.play()
      muteIcon.setVisible(false)
      soundIcon.setVisible(true)
    })

    muteIcon.on("pointerover", () => {
      muteIcon.setScale(0.12); // Zoom in slightly
      hoverSound.play();
      document.body.style.cursor = "url('assets/cursors/hover-cursor.png'), auto"
    });

    muteIcon.on("pointerout", () => {
      muteIcon.setScale(0.1); // Revert to original size
      document.body.style.cursor = "url('assets/cursors/normal-cursor.png'), auto"
    });
    
    const soundIcon = this.add.image(
      this.cameras.main.width - 100, 100, 
      "soundIcon"
    )
    soundIcon.setInteractive()
    soundIcon.setScale(0.1)
    
    soundIcon.on("pointerdown", () => {
      selectSound.play()
      this.sound.mute = true
      muteIcon.setVisible(true)
      soundIcon.setVisible(false)
    })

    soundIcon.on("pointerover", () => {
      soundIcon.setScale(0.12); // Zoom in slightly
      hoverSound.play();
      document.body.style.cursor = "url('assets/cursors/hover-cursor.png'), auto"
    });

    soundIcon.on("pointerout", () => {
      soundIcon.setScale(0.1); // Revert to original size
      document.body.style.cursor = "url('assets/cursors/normal-cursor.png'), auto"
    });
  }
}
