


/*
Enemies that appear and move from different directions
1.creat enemies class, enermies 1, appear from up and down.
2. neermies2, appear from left and right.
3. creat intervals, creat neermies automatically.

 */


const startButton = document.getElementById('startButton');
const menu = document.getElementById('menu');

startButton.addEventListener('click', () => {

    menu.style.display = 'none';
    const newGame = new Game();
    const bgm = new Bgm();
    newGame.start();

    console.log('Starting game...');
});


class Game {
    constructor() {
        this.charactor = null;
        this.enemiesTopArr = [];
        this.enemiesLeftArr = [];
        this.enemiesRightArr = [];
        this.shootArr = [];
        this.shootTopArr = [];
        this.shootDownArr = [];
        this.shootLeftArr = [];
        this.shootRightArr = [];


        this.scoreSystem = new ScoreSystem();
        this.charactor = new Charactor();
        this.weapon = null;
    }


    start() {

        this.attachEventListeners();

        this.createIntervalEnemies();

        this.moveControl();

    }

    // creat enemies randomly with interval time
    createIntervalEnemies() {
        setInterval(() => {
            const myEnemy = new TopEnemy();
            this.enemiesTopArr.push(myEnemy);
        }, 10000);



        setInterval(() => {
            const myEnemy = new LeftEnemy();
            this.enemiesLeftArr.push(myEnemy);
        }, 12000);



        setInterval(() => {
            const myEnemy = new RightEnemy();
            this.enemiesRightArr.push(myEnemy);
        }, 13000);

    }

    // move control center: controll all the move speed of enemies and bullets
    moveControl() {
        setInterval(() => {
            this.enemiesTopArr.forEach((enemyInstance, index) => {
                enemyInstance.moveDown();
                this.detectCollision(enemyInstance);


                if (enemyInstance.positionY < 2) {
                    enemyInstance.enemyElmTop.remove(); //remove from dom
                    this.enemiesTopArr.splice(index, 1); //remove from array
                }

            });
        }, 100);

        setInterval(() => {
            this.enemiesLeftArr.forEach((enemyInstance, index) => {
                enemyInstance.moveRight();
                this.detectCollision(enemyInstance);


                if (enemyInstance.positionX > 100) {
                    enemyInstance.enemyElmLeft.remove(); //remove from dom
                    this.enemiesLeftArr.splice(index, 1); //remove from array
                }
            });
        }, 150);

        setInterval(() => {
            this.enemiesRightArr.forEach((enemyInstance, index) => {
                enemyInstance.moveLeft();
                this.detectCollision(enemyInstance);


                if (enemyInstance.positionX < 0) {
                    enemyInstance.enemyElm.remove(); //remove from dom
                    this.enemiesRightArr.splice(index, 1); //remove from array
                }

            });
        }, 100);


        // let bullets move
        setInterval(() => {

            this.shootTopArr.forEach(e => {
                e.moveTop();
                this.detectCollisionShooting(e);
                this.scoreSystem.scores();
            })
            this.shootLeftArr.forEach(e => {
                e.moveLeft();
                this.detectCollisionShooting(e);
                this.scoreSystem.scores();
            })
            this.shootDownArr.forEach(e => {
                e.moveDown();
                this.detectCollisionShooting(e);
                this.scoreSystem.scores();
            })
            this.shootRightArr.forEach(e => {
                e.moveRight();
                this.detectCollisionShooting(e);
                this.scoreSystem.scores();
            })


        }, 50)

    }



    //eventlistener to let charactor move and shoot by keys
    attachEventListeners() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowLeft") {
                this.charactor.moveLeft();

            } else if (e.key === "ArrowRight") {
                this.charactor.moveRight();

            } else if (e.key === "ArrowUp") {
                this.charactor.moveUp();

            } else if (e.key === "ArrowDown") {
                this.charactor.moveDown();

            } else {

                // new a instance to allow shoot
                this.weapon = new DefaultWeapon(this.charactor.positionX, this.charactor.positionY);
                this.shootArr.push(this.weapon);

                //let bullets shoot as the same direction as the charactor's
                if (this.charactor.rotation === 0) {
                    this.shootTopArr.push(this.weapon);
                } else if (this.charactor.rotation === 90) {
                    this.shootRightArr.push(this.weapon);
                } else if (this.charactor.rotation === 180) {
                    this.shootDownArr.push(this.weapon);
                } else if (this.charactor.rotation === -90) {
                    this.shootLeftArr.push(this.weapon);
                }


            }
        });
    }

    // detect collision between enemies and charactor
    detectCollision(enemyInstance) {
        if (
            this.charactor.positionX + this.charactor.width > enemyInstance.positionX &&
            this.charactor.positionY < enemyInstance.positionY + enemyInstance.height &&
            this.charactor.height + this.charactor.positionY > enemyInstance.positionY &&
            enemyInstance.width + enemyInstance.positionX > this.charactor.positionX
        ) {
            this.gameOver();
            //  window.location.href = "./gameover.html";
        }
    }

    gameOver() {
        const removeCharactor = document.getElementById("character");
        removeCharactor.remove();
        const gameOverDiv = document.createElement("div");
        gameOverDiv.classList.add('gameOver');

        const restartButton = document.createElement("button");
        restartButton.innerHTML = "Restart";
        restartButton.addEventListener("click", () => {
            window.location.reload();
        });
        restartButton.style.position = 'absolute'; // 添加position: absolute样式
        restartButton.style.bottom = '10vh'; // 添加bottom: 0样式
        restartButton.style.left = '10vw';
        gameOverDiv.appendChild(restartButton);
        const board = document.getElementById("gameDisplay");
        board.appendChild(gameOverDiv);

    }

    // detect collision between bullets and enemies
    detectCollisionShooting(shootInstance) {
        //Top enemy detection
        for (let i = 0; i < this.enemiesTopArr.length; i++) {
            if (
                shootInstance.positionX + shootInstance.width > this.enemiesTopArr[i].positionX &&
                shootInstance.positionY < this.enemiesTopArr[i].positionY + this.enemiesTopArr[i].height &&
                shootInstance.height + shootInstance.positionY > this.enemiesTopArr[i].positionY &&
                this.enemiesTopArr[i].width + this.enemiesTopArr[i].positionX > shootInstance.positionX
            ) {

                //remove dom element
                const allTopEnemy = document.getElementsByClassName("enemy1");
                allTopEnemy[i].remove();

                //remove enemy from array of enemies
                this.enemiesTopArr.splice(i, 1);

                //update score
                this.scoreSystem.score++;
            }

        }
        //Left enemy detection

        for (let i = 0; i < this.enemiesLeftArr.length; i++) {
            if (
                shootInstance.positionX + shootInstance.width > this.enemiesLeftArr[i].positionX &&
                shootInstance.positionY < this.enemiesLeftArr[i].positionY + this.enemiesLeftArr[i].height &&
                shootInstance.height + shootInstance.positionY > this.enemiesLeftArr[i].positionY &&
                this.enemiesLeftArr[i].width + this.enemiesLeftArr[i].positionX > shootInstance.positionX
            ) {
                const allLeftEnemy = document.getElementsByClassName("enemyLeft");
                allLeftEnemy[i].remove();
                this.enemiesLeftArr.splice(i, 1);
                this.scoreSystem.score++;
            }

        }
        //Right enemy detection

        for (let i = 0; i < this.enemiesRightArr.length; i++) {
            if (
                shootInstance.positionX + shootInstance.width > this.enemiesRightArr[i].positionX &&
                shootInstance.positionY < this.enemiesRightArr[i].positionY + this.enemiesRightArr[i].height &&
                shootInstance.height + shootInstance.positionY > this.enemiesRightArr[i].positionY &&
                this.enemiesRightArr[i].width + this.enemiesRightArr[i].positionX > shootInstance.positionX
            ) {
                const allRightEnemy = document.getElementsByClassName("enemyRight");
                allRightEnemy[i].remove();

                this.enemiesRightArr.splice(i, 1);

                this.scoreSystem.score++;
            }

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
        this.width = 6;
        this.height = 5.1;
        this.charactorElm = document.getElementById("character");
        this.charactorElm.style.width = this.width + "vw";
        this.charactorElm.style.height = this.height + "vw";
        this.rotation = 0;
    }

    moveLeft() {
        if (this.positionX <= 2) {
            this.positionX = 0;
        } else {
            this.positionX -= 3;
        }

        this.charactorElm.style.left = this.positionX + "vw";
        this.rotation = -90;
        this.charactorElm.style.rotate = `${this.rotation}deg`;

    }
    moveRight() {
        if (this.positionX >= 88) {
            this.positionX = 90;
        } else {
            this.positionX += 3;
        }

        this.charactorElm.style.left = this.positionX + "vw";
        this.rotation = 90;
        this.charactorElm.style.rotate = `${this.rotation}deg`;
    }
    moveUp() {
        if (this.positionY >= 78) {
            this.positionX = 80;
        } else {
            this.positionY += 3;
        }

        this.charactorElm.style.bottom = this.positionY + "vh";
        this.rotation = 0;
        this.charactorElm.style.rotate = `${this.rotation}deg`;
    }
    moveDown() {
        if (this.positionY <= 2) {
            this.positionY = 0;
        } else {
            this.positionY -= 3;
        }

        this.charactorElm.style.bottom = this.positionY + "vh";
        this.rotation = 180;
        this.charactorElm.style.rotate = `${this.rotation}deg`;
    }
}

class TopEnemy {
    constructor() {
        const randomX = Math.round(Math.random() * 85);
        this.positionX = randomX;
        this.positionY = 90;
        this.width = 10;
        this.height = 7.46;

        //create different type of enemies dom
        this.enemyElmTop = null;
        this.creatEnermy();
    }
    creatEnermy() {
        this.enemyFromTop();
    }
    enemyFromTop() {
        // creat the elememnt
        this.enemyElmTop = document.createElement('img');

        //modify attributes
        this.enemyElmTop.classList.add('enemyTop', "enemy1", "enemyAll");
        this.enemyElmTop.style.width = this.width + 'vw';
        this.enemyElmTop.style.height = this.height + 'vw';
        this.enemyElmTop.src = "monsterTop.gif";

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
        const randomY = Math.round(Math.random() * 80);
        this.positionY = randomY;
        this.positionX = 0;
        this.width = 5;
        this.height = 9;

        //create different type of enemies dom
        this.enemyElmLeft = null;
        this.creatEnermy();
    }
    creatEnermy() {
        this.enermyFromLeft();
        //     this.enermyFromLeft();
    }

    enermyFromLeft() {
        this.enemyElmLeft = document.createElement('img');
        this.enemyElmLeft.classList.add('enemyLeft', "enemyAll");
        this.enemyElmLeft.style.width = this.width + 'vw';
        this.enemyElmLeft.style.height = this.height + 'vw';
        this.enemyElmLeft.src = "monsterLeft.gif";
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
        const randomY = Math.round(Math.random() * 80);
        this.positionY = randomY;
        this.positionX = 100;
        this.width = 8;
        this.height = 9.4;

        //create different type of enemies dom
        this.enemyElm = null;
        this.creatEnermy();
    }
    creatEnermy() {
        this.enermyFromRight();
        //     this.enermyFromLeft();
    }

    enermyFromRight() {
        this.enemyElm = document.createElement('img');
        this.enemyElm.classList.add('enemyRight', "enemyAll");
        this.enemyElm.style.display = "inline-block";
        this.enemyElm.src = "monsterRight.gif";
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
        this.positionX = x + 2.5;
        this.positionY = y + 5;
        this.width = 1;
        this.height = 1;
        this.rotation = 0;

        //create different type of enemies dom
        this.weaponElm = null;
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
        this.rotation = 0;
        this.weaponElm.style.rotate = `${this.rotation}deg`;
    }

    moveLeft() {
        this.positionX--;
        this.weaponElm.style.left = this.positionX + "vw";
        this.rotation = -90;
        this.weaponElm.style.rotate = `${this.rotation}deg`;
    }
    moveRight() {
        this.positionX++;
        this.weaponElm.style.left = this.positionX + "vw";
        this.rotation = 90;
        this.weaponElm.style.rotate = `${this.rotation}deg`;
    }
    moveUp() {
        this.positionY++;
        this.weaponElm.style.bottom = this.positionY + "vh";
        this.rotation = 0;
        this.weaponElm.style.rotate = `${this.rotation}deg`;
    }
    moveDown() {
        this.positionY--;
        this.weaponElm.style.bottom = this.positionY + "vh";
        this.rotation = 180;
        this.weaponElm.style.rotate = `${this.rotation}deg`;
    }

}

class ScoreSystem {
    constructor() {
        this.score = 0;
        this.scores();
    }
    scores() {
        document.getElementById("scores").innerHTML = `${this.score}`;
    }

}

class Bgm {
    constructor() {
        var bgm = document.getElementById("bgm");
        bgm.loop = true;
        bgm.play();
    }

}


