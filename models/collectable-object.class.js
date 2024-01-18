class CollectableObject extends MovableObject{
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }
    
    constructor() {
        super();
        this.x = (Math.random() * 2000) + 400;
        
    }
}