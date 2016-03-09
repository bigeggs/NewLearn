var classA = {
	age: 1,
	name: 'a',
	color: 'red'
};
var classB = function() {
	this.age = 5;
	this.name = 'b';
	this.color = 'black';
}

function classC() {
	this.age = 10;
	this.name = 'c';
	this.color = 'green';
}
classB.prototype.showName = function() {
	alert(this.name);
}
classB.prototype.numbers = function() {
	alert(this.age)
};
Function.prototype.setPrototype = function(protoName, fn) {
	this.prototype[protoName] = fn;
	return this;
}
classC.setPrototype('trry',function () {
	alert(this.color);
})