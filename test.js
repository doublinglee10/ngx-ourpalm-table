const {List} = require('immutable');

let array = [{
    name: 'zhagnsan',
    age: 10
}, {
    name: 'lisi',
    age: 11
}];

let list1 = List(array);


console.log(list1.toJS());
console.log(list1.update(1, function (value) {
    value.age = 21;
    return value;
}).toJS());
console.log(list1.toJS());


console.log(list1.map(function (value, index, list1) {
    value.age += 10;
    return value;
}).toJS());
console.log(list1.toJS());


