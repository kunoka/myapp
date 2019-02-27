// function hello(name1, name2) {
// 	console.log(name1, name2);
// }

// let arr =['imooc1', 'woniu'];
// // hello.apply(null, arr);
// hello(...arr);

// const obj = {
// 	name: 'immoc',
// 	value: 'React开发app'
// }
// console.log(Object.keys(obj));
// console.log(Object.values(obj));
// console.log(Object.entries(obj));

class MyApp {
	constructor() {
		this.name = 'immoc 123';
	}
	sayHello() {
		console.log(`hello ${this.name}`);
	}
}
const myApp = new MyApp();
myApp.sayHello()