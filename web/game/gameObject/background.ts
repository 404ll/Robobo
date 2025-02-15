import { ImageObject } from "./image";

export class Background extends ImageObject {
    constructor(scene: Phaser.Scene,key: string) {
      super({
        scene,
        x: scene.cameras.main.centerX,
        y: scene.cameras.main.centerY,
      }, key);
      this.setOrigin(0.5);
      this.setupBounds();
    }

  
    private setupBounds(): void {
      if (!this.gameObject) return;
  
      const { centerX, centerY } = this.scene.cameras.main;
      const worldWidth = this.width;
      const worldHeight = this.height;
  
      this.scene.physics.world.setBounds(
        centerX - worldWidth / 2,
        centerY - worldHeight / 2,
        worldWidth,
        worldHeight
      );
  
      this.scene.cameras.main.setBounds(
        centerX - worldWidth / 2,
        centerY - worldHeight / 2,
        worldWidth,
        worldHeight
      );
    }

    public setBackground(key: string): void {
      const oldGameObject = this.gameObject;
      this.gameObject = this.assetManager.getImage(key);
      if (oldGameObject) {
        this.gameObject?.setPosition(oldGameObject.x, oldGameObject.y);
        this.gameObject?.setDepth(-1); // Set depth for new background
        oldGameObject.destroy();
      }
    }
  }