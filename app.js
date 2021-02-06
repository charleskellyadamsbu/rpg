const readline = require('readline-sync');

let isRunning = true;

console.log("Welcome to your downfall.")
const name = readline.question("What is your name? ");

let inventory = [];

function generateRandomNumber(max) {
    let num = Math.floor(Math.random() * max);
    return num;
}

class Actor {
    constructor(name, hp, attack) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
        this.item = null;
    }

    fight(enemy) {
        let damage = generateRandomNumber(this.attack);
        enemy.hp -= damage;
        console.log(this.name + " attacked " + enemy.name + " and did " + damage + " damamge.");
    }
}

class Item {
    constructor(name) {
        this.name = name;
    }
}

let player = new Actor(name, 100, 50);

function battle() {
    let slimeEye = new Item("Slime Eye");
    let corruptRing = new Item("Corrupt Ring");
    let dragonTooth = new Item("Dragon Tooth");

    let slime = new Actor("Slime", 10, 10);
    slime.item = slimeEye;

    let corruptKnight = new Actor("Corrupt Knight", 50, 25);
    corruptKnight.item = corruptRing;

    let dragon = new Actor("Dragon", 100, 100);
    dragon.item = dragonTooth;

    let enemies = [slime, corruptKnight, dragon];

    let index = generateRandomNumber(3);
    let currentEnemy = enemies[index]
    console.log("You have encountered a battle with: " + currentEnemy.name);
    let battling = true;
    while(battling) {
        const input = readline.questionInt("1. Attack\n2. Run\nInput: ");

        if(input == 1 || input == 2) {
            if(input == 1) {
                player.fight(currentEnemy);

                if(currentEnemy.hp <= 0) {
                    player.hp += 10;
                    console.log("You killed " + currentEnemy.name + " your treasure is " + currentEnemy.item.name);
                    inventory.push(currentEnemy.item);
                    return;
                }

            } else if (input == 2) {
                let chance = generateRandomNumber(2);
                if(chance == 0) {
                    console.log("Ran away!");
                    return;
                } else if (chance == 1) {
                    console.log("Can't run away!");
                }
            }

            currentEnemy.fight(player);

            if(player.hp <= 0) {
                console.log("You have been killed.  Try your fate again.");
                isRunning = false;
                return;
            }

        } else {
            console.log("Invalid choice.");
            continue;
        }
    }
}

do {
    const input = readline.question("Press 'w' to walk. ");
    if(input == "w") {
        if(generateRandomNumber(3) == 2) {
            battle();
        }
    } else if (input == "print") {
        console.log("Name: " + player.name);
        console.log("HP: " + player.hp);
        
        for(let i = 0; i < inventory.length; i++) {
            console.log("Item: " + inventory[i].name);
        }
    }
} while (isRunning == true)