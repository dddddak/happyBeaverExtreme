var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
    this.obstacles = 0;
    this.winstons = 0;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, this.width, this.width);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 5;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 5;
};

Beaver.prototype.checkForStickGrab = function(stick) {
    if ((stick.x >= this.x && stick.x <= (this.x + this.width)) &&
        (stick.y >= this.y && stick.y <= (this.y + this.width))) {
        stick.y = -400;
        this.sticks++;
    }
};

Beaver.prototype.checkForObstacleGrab = function(obstacle) {
    if ((obstacle.x >= this.x && obstacle.x <= (this.x + 40)) && 
        (obstacle.y >= this.y && obstacle.y <= (this.y + 40))) {
        obstacle.y = -400;
        this.obstacles++;
    }
};

Beaver.prototype.checkForWinstonGrab = function(winston) {
    if ((winston.x >= (this.x - 25) && winston.x <= (this.x + 25)) &&
        (winston.y >= (this.y - 25) && winston.y <= (this.y + 25))) {
        winston.y = -400;
        this.winstons++;
    }
};

var Button = function(x, y) {
    this.x = x;
    this.y = y;
};

Button.prototype.draw = function() {
    stroke(0, 0, 0);
    fill(240, 240, 156);
    rect(this.x, this.y, 120, 30);
    fill(0, 0, 0);
    textSize(18);
    text("NEXT LEVEL", this.x - 55, this.y - 8, 120, 30);
};

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    stroke(89, 71, 0);
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var Obstacle = function(x, y) {
    this.x = x;
    this.y = y;
};

Obstacle.prototype.draw = function() {
    stroke(255,0,0);
    fill(255,0,0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var Winston = function(x, y) {
    this.x = x;
    this.y = y;
};

Winston.prototype.draw = function() {
    fill(255, 0, 0);
    image(getImage("creatures/Winston"), this.x, this.y, 50, 50);
};

var beaver = new Beaver(200, 300);
var button = new Button(200, 200);

var sticks = [];
for (var i = 0; i < 70; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
}

var obstacles = [];
for (var i = 0; i < 50; i++) {
    obstacles.push(new Obstacle(i * 300 + 300, random(20, 260)));
}

var winstons = [];
for (var i = 0; i < 35; i++) {
    winstons.push(new Winston(i * 500 + 400, random(20, 300)));
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

var currentLevel = 1;

var drawLevel1 = function() {
    currentLevel = 1;
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    fill(255, 255, 255);
    textSize(18);
    text("Level: 1", 20, 385);
    
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }
    
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        beaver.checkForObstacleGrab(obstacles[i]);
        obstacles[i].x -= 1;
    }
    
    for (var i = 0; i < winstons.length; i++) {
        winstons[i].draw();
        beaver.checkForWinstonGrab(winstons[i]);
        winstons[i].x -= 2;
    }
    
    fill(0, 0, 0);
    textSize(18);
    text("Score: " + (beaver.sticks - beaver.obstacles), 20, 30);
    if (beaver.winstons % 2 === 1) {
        beaver.width = 20;
    } else {
        beaver.width = 40;
    }
    
    if (beaver.sticks/sticks.length >= 0.35) {
        button.draw();
    } else if ((sticks[69].x < 0) & (beaver.sticks/sticks.length < 0.5)) {
        textSize(36);
        text("YOU LOST!", 100,200);
        textSize(18);
        text("Click to restart", 140, 220);
        mouseClicked = function() {
            Program.restart();
        };
    }
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
    

};

var drawLevel2 = function() {
    currentLevel = 2;
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    fill(255, 255, 255);
    textSize(18);
    text("Level: 2", 20, 385);
    
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }
    
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        beaver.checkForObstacleGrab(obstacles[i]);
        obstacles[i].x -= 1.5;
    }
    
    for (var i = 0; i < winstons.length; i++) {
        winstons[i].draw();
        beaver.checkForWinstonGrab(winstons[i]);
        winstons[i].x -= 3;
    }
    
    fill(0, 0, 0);
    textSize(18);
    text("Score: " + (beaver.sticks - beaver.obstacles), 20, 30);
    if (beaver.winstons % 2 === 1) {
        beaver.width = 20;
    } else {
        beaver.width = 40;
    }
    
    if (beaver.sticks/sticks.length >= 0.55) {
        button.draw();
    } else if ((sticks[69].x < 0) & (beaver.sticks/sticks.length < 0.55)) {
        textSize(36);
        text("YOU LOST!", 100,200);
        fill(0, 0, 0);
        textSize(18);
        text("Click to restart", 140, 220);
        mouseClicked = function() {
            Program.restart();
        };
    }

    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};

var drawLevel3 = function() {
    currentLevel = 3;
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    fill(255, 255, 255);
    textSize(18);
    text("Level: 3", 20, 385);
    
    for (var i = 0; i < sticks.length; i++) {
        sticks[i].draw();
        beaver.checkForStickGrab(sticks[i]);
        sticks[i].x -= 1;
    }
    
    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].draw();
        beaver.checkForObstacleGrab(obstacles[i]);
        obstacles[i].x -= 2;
    }
    
    for (var i = 0; i < winstons.length; i++) {
        winstons[i].draw();
        beaver.checkForWinstonGrab(winstons[i]);
        winstons[i].x -= 4;
    }
    
    fill(0, 0, 0);
    textSize(18);
    text("Score: " + (beaver.sticks - beaver.obstacles), 20, 30);
    if (beaver.winstons % 3 === 1) {
        beaver.width = 20;
    } else {
        beaver.width = 40;
    }
    
    if (beaver.sticks/sticks.length >=  0.7) {
        textSize(36);
        text("YOU WIN!!!!", 100, 200);
        textSize(18);
        text("Click to restart", 140, 220);
    } else if ((sticks[69].x < 0) & (beaver.sticks/sticks.length < 0.7)) {
        textSize(36);
        text("YOU LOST!", 100,200);
        fill(0, 0, 0);
        textSize(18);
        text("Click to restart", 140, 220);
        mouseClicked = function() {
            Program.restart();
        };
    }
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();

};

draw = function() {
    if (currentLevel === 1){
        drawLevel1();
    } else if (currentLevel === 2) {
        drawLevel2();
    } else if (currentLevel === 3) {
        drawLevel3();
    }
};

mouseClicked = function() {
        if (mouseX >= (button.x - 60) && mouseX <= (button.x + 60) && mouseY >= (button.y - 15) && mouseY <= (button.y + 15)) {
        if (currentLevel === 1) {
            drawLevel2();
        } else if (currentLevel === 2) {
            drawLevel3();
        } else if (currentLevel === 3) {
            Program.restart();
        }
    }
};
