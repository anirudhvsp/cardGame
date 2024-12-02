export default class Card extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, type, value) {
        super(scene, x, y, texture);
        
        this.type = type;
        this.value = value;
        this.scene = scene;
        this.isFlipped = false;
        this.dragging = false;
        this.velocityX = 0;
        this.velocityY = 0;
        
        scene.add.existing(this);
        
        // Make card interactive with drag and double click events
        this.setInteractive()
            .on('pointerdown', this.startDrag.bind(this))
            .on('pointerup', this.stopDrag.bind(this))
            .on('pointerdown', this.handleDoubleClick.bind(this));

        // Track double click timing
        this.lastClickTime = 0;
        
        // Store front texture name
        this.frontTexture = `cardFront_${type}_${value}`;
        this.backTexture = 'cardBack';

        scene.events.on('update', this.update, this);
    }

    handleDoubleClick(pointer) {
        console.log(this.isFlipped);
        const clickDelay = 300; // Maximum delay between clicks (in ms)
        const currentTime = new Date().getTime();
        
        if (currentTime - this.lastClickTime < clickDelay) {
            this.flip();
        }
        
        this.lastClickTime = currentTime;
    }

    flip() {
        const duration = 300;
        
        this.scene.tweens.add({
            targets: this,
            angle: 90,
            scaleX: 0.1,
            scaleY: 1.1,
            duration: duration/2,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.isFlipped = !this.isFlipped;
                this.setTexture(this.isFlipped ? this.frontTexture : this.backTexture);
                
                this.scene.tweens.add({
                    targets: this,
                    angle: 180,
                    scaleX: 1,
                    scaleY: 1,
                    duration: duration/2,
                    ease: 'Sine.easeInOut',
                    onComplete: () => {
                        this.angle = 0;
                    }
                });
            }
        });
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