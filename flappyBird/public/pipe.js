class Pipe{
    constructor(){
        this.top = random(height / 2);
        this.bottom = height - this.top - 200;
        this.bottomY = this.top + 200;
        this.x = width;
        this.width = 30;
        this.speed = 5;
    }

    show(){
        fill(255);
        image(topPipe, this.x, 0, this.width, this.top);
        image(bottomPipe, this.x, this.bottomY, this.width, this.bottom);
    }

    update(){
        this.x -= this.speed;
    }

    hits(bird){
        if ((bird.y + 60 >= height - this.bottom + 10 && bird.x + 50 > this.x) ||
            (bird.y + 10 <= this.top && bird.x + 50 > this.x)){
            return true;
        }
        return false;
    }
}