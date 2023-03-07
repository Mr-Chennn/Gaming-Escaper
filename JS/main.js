


/*
Enemies that appear and move from different directions
1.creat enemies class, enermies 1, appear from up and down.
2. neermies2, appear from left and right.
3. creat intervals, creat neermies automatically.

 */

class Game {
    constructor() {
        this.charactor = null;
        this.enemiesTopArr = []; //will store instances of the class Obstacle
        this.enemiesLeftArr = []; //will store instances of the class Obstacle
        this.enemiesRightArr = []; //will store instances of the class Obstacle
        this.shootArr = []; //will store instances of the class Obstacle

        this.charactor = new Charactor();
        this.weapon = new DefaultWeapon();


    }


    start() {

        this.attachEventListeners();

        this.createIntervalEnemies();

        //   this.createIntervalshoot();

        this.moveControl();


    }

    createIntervalEnemies() {
        setInterval(() => {
            const myEnemy = new TopEnemy();
            this.enemiesTopArr.push(myEnemy);
        }, 5000);



        setInterval(() => {
            const myEnemy = new LeftEnemy();
            this.enemiesLeftArr.push(myEnemy);
        }, 5000);



        setInterval(() => {
            const myEnemy = new RightEnemy();
            this.enemiesRightArr.push(myEnemy);
        }, 5000);

    }



    // 创建一个子弹对象
    createIntervalshoot() {

        const myEnemy = new DefaultWeapon();
        this.shootArr.push(myEnemy);

    }



    //控制所有非角色棋子移动
    moveControl() {
        setInterval(() => {
            this.enemiesTopArr.forEach((enemyInstance) => {
                enemyInstance.moveDown();
                this.detectCollision(enemyInstance);

            });
        }, 50);

        setInterval(() => {
            this.enemiesLeftArr.forEach((enemyInstance) => {
                enemyInstance.moveRight();

                this.detectCollision(enemyInstance);
            });
        }, 50);

        setInterval(() => {
            this.enemiesRightArr.forEach((enemyInstance) => {
                enemyInstance.moveLeft();

                this.detectCollision(enemyInstance);
            });
        }, 50);

        //shooting
        setInterval(() => {
            this.shootArr.forEach((shootInstance) => {
                shootInstance.moveTop();

                this.detectCollisionShooting(shootInstance);
            });
        }, 10);

    }

    //加一个绑定键盘事件
    attachEventListeners() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.charactor.moveLeft();
                this.weapon.moveLeft();


            } else if (e.key === "ArrowRight") {
                this.charactor.moveRight();
                this.weapon.moveRight();

            } else if (e.key === "ArrowUp") {
                this.charactor.moveUp();
                this.weapon.moveUp();

            } else if (e.key === "ArrowDown") {
                this.charactor.moveDown();
                this.weapon.moveDown();

            } else {
                console.log(this.shootArr);
                this.shootArr.push(this.weapon);
                this.weapon = new DefaultWeapon(this.charactor.positionX, this.charactor.positionY);
                console.log(this.shootArr);
                return this.weapon;


            }
        });
    }

    detectCollision(enemyInstance) {
        if (
            this.charactor.positionX + this.charactor.width > enemyInstance.positionX &&
            this.charactor.positionY < enemyInstance.positionY + enemyInstance.height &&
            this.charactor.height + this.charactor.positionY > enemyInstance.positionY &&
            enemyInstance.width + enemyInstance.positionX > this.charactor.positionX
        ) {
            //console.log("game over my fren!");
            window.location.href = "./gameover.html";
        }
    }

    detectCollisionShooting(shootInstance) {
        // console.log(this.enemiesTopArr.length);
        // console.log(shootInstance.positionX);
        // console.log(shootInstance.positionY);

        // console.log(enemiesTopArr[0].positionY);
        // console.log(enemiesTopArr[0].positionY);
        // console.log(enemiesTopArr[0].height);
        // console.log(enemiesTopArr[0].width);

        //Top enemy detection
        for (let i = 0; i < this.enemiesTopArr.length; i++) {
            if (
                shootInstance.positionX + shootInstance.width > this.enemiesTopArr[i].positionX &&
                shootInstance.positionY < this.enemiesTopArr[i].positionY + this.enemiesTopArr[i].height &&
                shootInstance.height + shootInstance.positionY > this.enemiesTopArr[i].positionY &&
                this.enemiesTopArr[i].width + this.enemiesTopArr[i].positionX > shootInstance.positionX
            ) { window.location.href = "./gameover.html"; }

        }
        //Left enemy detection

        for (let i = 0; i < this.enemiesLeftArr.length; i++) {
            if (
                shootInstance.positionX + shootInstance.width > this.enemiesLeftArr[i].positionX &&
                shootInstance.positionY < this.enemiesLeftArr[i].positionY + this.enemiesLeftArr[i].height &&
                shootInstance.height + shootInstance.positionY > this.enemiesLeftArr[i].positionY &&
                this.enemiesLeftArr[i].width + this.enemiesLeftArr[i].positionX > shootInstance.positionX
            ) { window.location.href = "./gameover.html"; }

        }
        //Right enemy detection

        for (let i = 0; i < this.enemiesRightArr.length; i++) {
            if (
                shootInstance.positionX + shootInstance.width > this.enemiesRightArr[i].positionX &&
                shootInstance.positionY < this.enemiesRightArr[i].positionY + this.enemiesRightArr[i].height &&
                shootInstance.height + shootInstance.positionY > this.enemiesRightArr[i].positionY &&
                this.enemiesRightArr[i].width + this.enemiesRightArr[i].positionX > shootInstance.positionX
            ) { window.location.href = "./gameover.html"; }

        }
    }
}





/*Character 
1. create a charactor with height and width, add it in HTML with DOM
2. create methods of move left right up and down

 */
class Charactor {
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
        this.width = 5;
        this.height = 10;
        this.charactorElm = document.getElementById("character");
        this.charactorElm.style.width = this.width + "vw";
        this.charactorElm.style.height = this.height + "vh";
    }

    moveLeft() {
        this.positionX -= 3;
        this.charactorElm.style.left = this.positionX + "vw";
    }
    moveRight() {
        this.positionX += 3;
        this.charactorElm.style.left = this.positionX + "vw";
    }
    moveUp() {
        this.positionY += 3;
        this.charactorElm.style.bottom = this.positionY + "vh";
    }
    moveDown() {
        this.positionY -= 3;
        this.charactorElm.style.bottom = this.positionY + "vh";
    }
}

class TopEnemy {
    constructor() {
        const randomX = Math.round(Math.random() * 100);
        this.positionX = randomX;
        this.positionY = 90;
        this.width = 5;
        this.height = 5;

        //create different type of enemies dom
        this.enemyElmTop = null;
        this.creatEnermy();
    }
    creatEnermy() {
        this.enemyFromTop();

    }
    enemyFromTop() {
        // creat the elememnt
        this.enemyElmTop = document.createElement('div');

        //modify attributes
        this.enemyElmTop.classList.add('enemyTop', "enemy1");
        this.enemyElmTop.style.width = this.width + 'vw';
        this.enemyElmTop.style.height = this.height + 'vw';

        this.enemyElmTop.style.left = this.positionX + 'vw';
        this.enemyElmTop.style.bottom = this.positionY + 'vh';
        const gameDisplayElm = document.getElementById('gameDisplay');

        gameDisplayElm.appendChild(this.enemyElmTop);
        //
    }
    moveDown() {
        this.positionY--;
        this.enemyElmTop.style.bottom = this.positionY + "vh";
    }


}



class LeftEnemy {
    constructor() {
        const randomY = Math.round(Math.random() * 100);
        this.positionY = randomY;
        this.positionX = 0;
        this.width = 5;
        this.height = 5;

        //create different type of enemies dom
        this.enemyElmLeft = null;
        this.creatEnermy();
    }
    creatEnermy() {
        this.enermyFromLeft();
        //     this.enermyFromLeft();
    }

    enermyFromLeft() {
        this.enemyElmLeft = document.createElement('div');
        this.enemyElmLeft.classList.add('enemyLeft');
        this.enemyElmLeft.style.width = this.width + 'vw';
        this.enemyElmLeft.style.height = this.height + 'vw';
        this.enemyElmLeft.style.position = "ausolute";
        this.enemyElmLeft.style.left = this.positionX + 'vw';
        this.enemyElmLeft.style.bottom = this.positionY + 'vh';
        const gameDisplayElm = document.getElementById('gameDisplay');
        gameDisplayElm.appendChild(this.enemyElmLeft);

    }
    moveRight() {
        this.positionX++;
        this.enemyElmLeft.style.left = this.positionX + "vw";
    }

}

class RightEnemy {
    constructor() {
        const randomY = Math.round(Math.random() * 100);
        this.positionY = randomY;
        this.positionX = 100;
        this.width = 5;
        this.height = 5;

        //create different type of enemies dom
        this.enemyElm = null;
        this.creatEnermy();
    }
    creatEnermy() {
        this.enermyFromRight();
        //     this.enermyFromLeft();
    }

    enermyFromRight() {
        this.enemyElm = document.createElement('div');
        this.enemyElm.classList.add('enemyRight');
        this.enemyElm.style.width = this.width + 'vw';
        this.enemyElm.style.height = this.height + 'vw';
        this.enemyElm.style.position = "ausolute";
        this.enemyElm.style.left = this.positionX + 'vw';
        this.enemyElm.style.bottom = this.positionY + 'vh';
        const gameDisplayElm = document.getElementById('gameDisplay');
        gameDisplayElm.appendChild(this.enemyElm);

    }
    moveLeft() {
        this.positionX--;
        this.enemyElm.style.left = this.positionX + "vw";
    }

}

class DefaultWeapon {
    constructor(x, y) {
        this.positionX = x + 2;
        this.positionY = y + 10;
        this.width = 1;
        this.height = 1;

        //create different type of enemies dom
        this.DefaultWeaponElm = null;
        this.creatDefaultWeapon();
    }

    creatDefaultWeapon() {
        this.weapon();


    }
    weapon() {
        // creat the elememnt
        this.weaponElm = document.createElement('div');

        //modify attributes
        this.weaponElm.classList.add('defaultWeapon');
        this.weaponElm.style.width = this.width + 'vw';
        this.weaponElm.style.height = this.height + 'vw';

        this.weaponElm.style.left = this.positionX + 'vw';
        this.weaponElm.style.bottom = this.positionY + 'vh';
        const gameDisplayElm = document.getElementById('gameDisplay');

        gameDisplayElm.appendChild(this.weaponElm);
        //
    }
    moveTop() {
        this.positionY++;
        this.weaponElm.style.bottom = this.positionY + "vh";
    }

    moveLeft() {
        this.positionX -= 3;
        this.weaponElm.style.left = this.positionX + "vw";
    }
    moveRight() {
        this.positionX += 3;
        this.weaponElm.style.left = this.positionX + "vw";
    }
    moveUp() {
        this.positionY += 3;
        this.weaponElm.style.bottom = this.positionY + "vh";
    }
    moveDown() {
        this.positionY -= 3;
        this.weaponElm.style.bottom = this.positionY + "vh";
    }

}

const newGame = new Game();
newGame.start();
