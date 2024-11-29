export default class Card extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, type, value) {
        super(scene, x, y, texture);
        
        this.type = type;
        this.value = value;
        this.scene = scene;
        
        this.dragging = false;
        this.velocityX = 0;
        this.velocityY = 0;
        
        scene.add.existing(this);
        
        // Make card interactive with drag events
        this.setInteractive()
            .on('pointerdown', this.startDrag.bind(this))
            .on('pointerup', this.stopDrag.bind(this));

        // Add this card to the scene's update list
        scene.events.on('update', this.update, this);
    }

    startDrag(pointer) {
        this.dragging = true;
        this.targetX = pointer.x;
        this.targetY = pointer.y;
    }

    stopDrag() {
        this.dragging = false;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    update() {
        if (this.dragging) {
            const pointer = this.scene.input.activePointer;
            this.targetX = pointer.x;
            this.targetY = pointer.y;
        }
    
        if (this.targetX !== undefined && this.targetY !== undefined) {
            // Calculate distance to target
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
    
            // Spring physics constants
            const springStrength = 0.9;
            const dampening = 0.2;
    
            // Update velocities
            this.velocityX += dx * springStrength;
            this.velocityY += dy * springStrength;
    
            // Apply dampening
            this.velocityX *= dampening;
            this.velocityY *= dampening;
    
            // Update position
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
    }
    

    onSelect() {
        console.log(`Selected ${this.type} card with value ${this.value}`);
    }

    play() {
        // Logic for playing the card
    }

    destroy() {
        // Clean up update listener when card is destroyed
        this.scene.events.off('update', this.update, this);
        super.destroy();
    }
}