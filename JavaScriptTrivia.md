1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?
The potential pitfall is that *null* is also considered an object. We can avoid this by also checking if bar is null.
If we only want to check specifically for objects, we can do: 
`console.log((bar !== null) && (bar.constructor === Object));`

2. What will the code below output to the console and why?
    ```
    (function(){
    var a = b = 3;
    })();
    console.log("a defined? " + (typeof a !== 'undefined'));
    console.log("b defined? " + (typeof b !== 'undefined'));
    ```
If we not use 'use strict' mode, `b =3 and var a =b `, in that case, a will be undefined and b will be defined. Because b becomes a global variable (since it does not have var).

3. What will the code below output to the console and why?

    ``` 
    var myObject = {
        foo: "bar",
        func: 
            function() {
            var self = this;
            console.log("outer func:  this.foo = " + this.foo);
            console.log("outer func:  self.foo = " + self.foo);
            (function() {
                console.log("inner func:  this.foo = " + this.foo);
                console.log("inner func:  self.foo = " + self.foo);
            }());
        } 
    };
    myObject.func();
    ```
The code will output: 
```
outer func:  this.foo = bar
outer func:  self.foo = bar
inner func:  this.foo = undefined
inner func:  self.foo = bar
```
In the outer function, self and this refet to myObject.
In the inner function, this no longer refers to myObject. In that case, this.foo is undefined while self is still in scope.


4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

The reason behind wrapping the content of a JS source in a function block is to create a private namespace and helps to avoid name clashes between JS modules and libraries. 

5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

Using 'use strict' enforces a stricter parsing and error handling in the JS code. 
It helps with : 
- Debugging
- Preventing accidental globals
- Eliminates this coercion
- Disallows duplicate parameter values
- Makes eval() safer
- Throws error on invalid usafe of delete

6. Consider the two functions below. Will they both return the same thing? Why or why not?

    ```
    function foo1()
    {
      return {
          bar: "hello"
      };
    }

    function foo2()
    {
      return
      {
          bar: "hello"
      };
    }
    ```
No, they will not. 
For the second function foo2, the return value will be undefined. Since ; are optional in JS, after the return in that line nothing is encountered so a ; is added. 

7. What will the code below output? Explain your answer.
    ```
    console.log(0.1 + 0.2);
    console.log(0.1 + 0.2 == 0.3);
    ```
You might not get true, since JS treats numbers with floating point precision, and it might yield unexpected results. It could be false.
A recommended solution is to compare numbers using Number,EPSILON.

8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?
    ```(function() {
    console.log(1); 
    setTimeout(function(){console.log(2)}, 1000); 
    setTimeout(function(){console.log(3)}, 0); 
    console.log(4);
    })();
    ```
The values will be 1,4,3,2.

9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

```
function isPalindrome(str){
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
}
```
- /\W: will match any character that is not a from the basic Latin alphabet.
- /g: global, return all matches not just the first one
- toLowerCase: to make all letters lower case
- split : create an array
- reverse: reverse order
- convert into string again

10. Write a sum method which will work properly when invoked using either syntax below.

    ```console.log(sum(2,3));   // Outputs 5
    console.log(sum(2)(3));  // Outputs 5
    ```
```
function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function(y) { return x + y; };
  }
}
```
11. Consider the following code snippet:
    ```
    for (var i = 0; i < 5; i++) {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('Button ' + i));
    btn.addEventListener('click', function(){ console.log(i); });
    document.body.appendChild(btn);
    }   
    ```
- What gets logged to the console when the user clicks on “Button 4” and why?
The console will show 5, because the loop was declared using var. By the time the loop is done running. the value of i = 5.

- Provide one or more alternate implementations that will work as expected.
```
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
}
```

12. Assuming d is an “empty” object in scope, say:
``` 
var d = {};
```
…what is accomplished using the following code?
```
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
```
We will change the object d
`var d = {'zebra': undefined, 'horse':undefined }`

13. What will the code below output to the console and why?
```
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```
- array 1: length = 4 last = j,o,n,e,s
- array 2: length = 9 last = j,o,n,e,s

14. What will the code below output to the console and why ?
```
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
```
- 122
- 32 
- 02
- 112
- NaN2
- NaN

15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?
```
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```
It can be modified by adding a setTimeout. By using a setTimeout each call to nextListItem is placed in the event queue rather than the call stack. This prevents that the call stack grows too much. 

16. What is a “closure” in JavaScript? Provide an example.
A closure is an inner function which has access to its own variables, to the outer (or enclosing function) and global variables.

17. What would the following lines of code output to the console?
```
console.log("0 || 1 = "+(0 || 1));
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```
- 0 || 1 = 1
- 1 || 2 = 1
- 0 && 1 = 0
- 1 && 2 = 2

18. What will be the output when the following code is executed? Explain.
```
console.log(false == '0')
console.log(false === '0')
```
- True
- False


19. What is the output out of the following code? Explain your answer.
```
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```
It will be 456, because when an object is used as a key in another object it gets converted to a string representation [object Object]. a["[object Object]"] = 123, then we do the same with c, it is the same process and the value is overwritten for 456.

20. What will the following code output to the console:
```
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
```
It will be 10! since f(n) is called recursively.

21. Consider the code snippet below. What will the console output be and why?
```
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```
It will be 1, because of the closure function.
22. What will the following code output to the console and why:
```
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```
The code will be undefined, and then John Doe. 
The first one is undefined because we are atking the method from the hero object, but the method stoleSecretIdentitfy is being invoked in the global context, the window object where _name does not exist.
To fix thisissue we can bind(hero), `var stoleSecretIdentity = hero.getSecretIdentity.bind(hero);
` so we make sure that 'this' inside getSecretIdentity refers to the hero object regardless of how it's invoked.


23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

The arguments to the function should be:

- a DOM element
- a callback function (that takes a DOM element as its argument)

```
function visitAll(dom_element, callbackfunc){
    callbackfunc(dom_element);
    let list = dom_element.children;
    for(let i=0; i< list.length; i++){
        visitAll(list[i], callbackfunc); 
    }
}
```
24. Testing your this knowledge in JavaScript: What is the output of the following code?
```
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```
- 10, because length we defined using var.
- 2, because this.length refers to arguments.

25. Consider the following code. What will the output be, and why?
```
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```
- 1
- undefined 
- 2
26. What will be the output of this code?
```
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```
- undefined because when the function is executed, it checks for a local variable x.  Inside the function we do have declared x but it goes after the console.log. It has not been initialized. 
27. What will this code print?
```
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```
- 0,1,2,3,4 because we used let instead of var


28. What do the following lines output, and why?
``` 
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```
- true
- false, because 3> 2 is true, so it will translate to 1.

29. How do you add an element at the begining of an array? How do you add one at the end?
- Beginning: Array.unshift()
- End: array.push()
30. Imagine you have this code:

var a = [1, 2, 3];
- a) Will this result in a crash?
```
a[10] = 99;
```
Those extra slots will be empty
- b) What will this output?
```
console.log(a[6]);
```
It will be undefined, but those slots are actually empty.

31. What is the value of typeof undefined == typeof NULL?
- True, since NULL will be treated as any other undefined variable. 

32. What would following code return?
```
console.log(typeof typeof 1);
```
- String: because typeof 1, will return "number", and then typeof "number" will return string. 

33. What will be the output of the following code:
```
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
- 5,5,5,5,5 because we used var. By the time each function is executed var =5 already.  

34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?
- Not a number. 
- Type: Number.
- We can do value !== value, which would only give treu if the value is equal to NaN. Alternitavely, we can use Number.isNaN()

35. What will the following code output and why?
```
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```
- Console.log is 3.

36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.
```
function isInteger(x){
    return (x ^ 0) === x;
}
or 
function isInteger(x) { return (typeof x === 'number') && (x % 1 === 0); }
```
37. How do you clone an object?
- Object.assign({}, initialObj) can used, however this will do a shallow copy, not a deep copy. Nested object will not be copied. Those will refer to the same nested object are the original. So if I change the original object, the copy will also change. 

