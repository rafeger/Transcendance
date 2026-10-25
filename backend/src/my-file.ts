// function damage(characterToDamage: { life: number }, amount: number): number {
//   characterToDamage.life -= amount;
//   return characterToDamage.life;
// }

// const result = damage({ life: 100 }, 12);
// console.log(result);

// function sayHello(target: { firstName: string; money: number }): string {
//   return `Hello ${target.firstName}, you have ${target.money} on your bank account`;
// }

// const message: string = sayHello({ firstName: 'World', money: 123 });

// type Money = number;
// type Age = number;

// function checkAge(ageToCheck: Age) {
//   /**/
// }
// const lotOfMoney: Money = 500000;
// checkAge(lotOfMoney);

// type CodeSecret = string | number;
// const code1: CodeSecret = 123;
// const code2: CodeSecret = '4@345d';

// type Ten = 10;
// const five: Ten = 5; // ERR
// const ten: Ten = 10; // OK

// type Creature = 'blob' | 'troll' | 'unicorn' | 'dragon';
// function fightCreature(target: Creature) {}
// fightCreature('fish'); // ERR
// fightCreature('troll'); //OK

// type Hero = {
//   life: number;
// };
// function damage(characterToDamage: Hero, amount: number): number;

// type Pet = {
//   name: string;
//   life: number;
//   attack: number;
//   defense: number;
// };

// type Hero = {
//   name: string;
//   life: number;
//   attack: number;
//   defense: number;
//   pet?: Pet; // ? - this is optional
// };
// // to have less redundancy:
// type Character = {
//   name: string;
//   life: number;
//   attack: number;
//   defense: number;
// };

// type Pet = Character;
// type Hero = Character & {
//   pet?: Pet;
// };

// // interface, not like type, defines a strict structure for our objs
// interface Character {
//   name: string;
//   life: number;
//   attack: number;
//   defense: number;
// }

// type Pet = Character;
// interface Hero extends Character {
//   pet?: Pet;
// }

// type MyArrayOfNumbers = number[]; // def of a number table
// // or the equivalent:
// type MyArrayOfNumbers2 = Array<number>;
// const arrayOk: MyArrayOfNumbers = [1, 2, 3];
// const arrayNotOk: MyArrayOfNumbers = [1, 'two', false];

// /// GENERIC:
// type Shop = {
//   name: string;
//   owner: Character;
//   items: Array<unknown>; // any
//   // when we don't know the type of smth
// };

// type Equiment = {
//   price: number;
//   attack?: number;
//   defense?: number;
// };

// // turn something into generic is done by adding <> after name
// type Shop<ItemType> = {/**/};

// interface Shop<ItemType> {
//   name: string;
//   owner: Character;
//   items: Array<ItemType>;
// }

// function createShop<ItemType>(
//   name: string,
//   owner: Character,
//   items: Array<ItemType>,
// ): Shop<ItemType> {
//   return { name, owner, items };
// }

// const armory = createShop<Equipment>(
//   'My armory',
//   { name: 'Bob', life: 100, attack: 1, defense: 2 },
//   [],
// );

// // utility types offered by TS:
// type Array<T> = T[];

// // Partial<T>
// type Character = {
//   name: string;
//   life: number;
//   attack: number;
//   defense: number;
// };

// const myCharacter: Partial<Character> = {
//   name: 'Mario',
// };

// // RECORD <KEYTYPE, VALUETYPE>
// type CollectionOfNumbers = Record<string, number>;
// const stats: CollectionOfNumbers = {
//   age: 42,
//   life: 100,
//   magic: 10,
//   whateverTheNameItMustContainANumber: 20,
// };

// type StatisticNames = 'life' | 'attack' | 'defense';
// const stats: Record<StatisticNames, number> = {
//   life: 100,
//   attack: 10,
//   defense: 10,
// };
