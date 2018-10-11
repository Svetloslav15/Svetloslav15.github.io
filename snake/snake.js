class Snake{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.xSpeed = 1;
        this.ySpeed = 0;
        this.tail = [];
        this.total = 0;
    }
    direction(x, y){
        this.xSpeed = x;
        this.ySpeed = y;
    }
    update(){
        if (this.total === this.tail.length){
            for (let index = 0; index < this.tail.length - 1; index++) {
                this.tail[index] = this.tail[index + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);

        this.x += this.xSpeed * scl;
        this.y += this.ySpeed * scl;
        if (this.x < 0 || this.x >= width - scl || this.y < 0 || this.y >= height - scl){
            this.total = 0;
            this.tail = [];
            this.x = 0;
            this.y = 0;
        }
        this.show();
    }
    eat(food){
        let distance = dist(this.x, this.y, food.x, food.y);
        if (distance < 1){
            this.total++;
            return true;
        }
        return false;
    }
    died(){
        for (let index = 0; index < this.tail.length; index++) {
            let pos = this.tail[index];
            let distance = dist(this.x, this.y, pos.x, pos.y);
            if (distance < 1){
                this.total = 0;
                this.tail = [];
                this.x = 0;
                this.y = 0;
            }
        }
    }
    show(){
        fill(255);
        for (let index = 0; index < this.tail.length; index++) {
            rect(this.tail[index].x, this.tail[index].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }
}