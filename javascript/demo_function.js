/**
 * 函数
 * 
 */

/**
 * 函数定义
 * 
 * 函数声明语句、函数定义表达式
 */
// 函数声明语句
// 输出o的每个属性的名称和值，返回undefined
function printprops(o){
    for (var p in o){
        console.log(p+ ":" +o[p]+ "\n");
    }
}
// 计算笛卡尔坐标(x1, y1)和(x2, y2)之间的距离。
function distance(x1, y1, x2, y2){
    var dx = x2-x1;
    var dy = y2-y1;
    return Math.sqrt(dx*dx+dy*dy);
}
// 计算阶乘的递归函数（调用自身的函数）
function factorial(x){
    if (x<1) return 1;
    return factorial(x-1)*x;
}
// 函数表达式
// 定以一个函数用来求传入参数的平方，赋值给一个变量
var square = function(x){ return x*x; };
// 函数表达式可以包含名称。这在递时很有用
var f = function fact(x) { if (x<1) return 1; return x*fact(x); };
// 函数表达式作为参数传入其他函数
data.sort(function(a,b){return a-b;});
// 函数表达式定义后立即调用
var tensquared = (function (x) {return x*x;}(10));

/**
 * 以表达式方式定义的函数，函数的名称可选。一条函数声明语句实际上声明了一个变量，并把一个函数对象赋值给它。相对而言，
 * 定义函数表达式时并没有声明一个变量。函数可以命名，就像上面的阶乘函数，它需要一个名称来指代自己。如果一个函数定义
 * 表达式包含名称，函数的局部作用域将会包含一个绑定到函数对象的名称。实际上，函数的名称将成为函数内部的一个局部变量。
 * 通常而言，以表达式方式定义函数时都不需要名称，这会让代码更紧凑。
 */
function f(){
    console.log(this.f);
}
f();
// ƒ f(){
//     console.log(this.f);
// }

/**
 * 嵌套函数
 * 
 * 变量作用域规则：它们可以访问嵌套它们（或多重嵌套）的函数的参数和变量。下面的示例中，内部函数square()可以读写外部
 * 函数hypotenuse()定义的参数a和b。
 */
function hypotenuse(a, b) {
    function square(x) { return x*x; }
    return Math.sqrt(square(a)+square(b));
}



/**
 * 函数调用
 * 
 * 调用方式：函数、方法、构造器、call()和apply()
 */
printprops({x:1});
var total = distance(0,0,2,1) + distance(2,1,3,5);
var probability = factorial(5)/factorial(13);

var calculator = {
    operand1: 1,
    operand2: 1,
    add: function(){
        this.result = this.operand1 + this.operand2;
    }
}
calculator.add();
calculator.result;              // 2

var o = {
    m: function(){
        var self = this;
        console.log(this === o);            // true

        f();
        function f(){
            console.log(this === o);        // false
            console.log(self === o);        // true
        }
    }
}
p.m();


var o = new Object();
// 没有形参的构造函数调用可以省略圆括号
var o = new Object;

/**
 * 函数的实参和形参
 */
function getPropertyNames(o, /* optional */ a) {
    /**
     * 将对象o中可枚举的属性名追加至数组a中，并返回数组a
     * 如果省略a，则创建一个数组并返回它
     */
    if (a === undefined) a=[];
    for (var property in o) {
        a.push(property);
    }
    return a;
}
var a = getPropertyNames(o);
getPropertyNames(o, a);

/**
 * 可变长的实参列表，实参对象
 */
function f(x,y,z) {
    // 首次验证传入实参的个数
    if (arguments.length != 3) {
        throw new Error("function f called with" + arguments.length + "arguments, but it expects 3 arguments.")
    }
    // 再执行函数的其他逻辑
}

// 不定实参函数，接收任意个数的实参，实参个数不为0
function max(/* ... */) {
    var max = Number.NEGATIVE_INFINITY;
    for (var i = 0;i<arguments.length;i++) {
        if (max < arguments[i]) max = arguments[i];
    }
    return max;
}
var largest = max(1,10,100,2,3,1000,4,5,10000,6); // 10000

// ECMAScript5中移除了该特性
function f(x) {
    console.log(x);           // 输出实参的初始值
    arguments[0] = null;      // 
    console.log(x);           // 输出null
}

// 对象属性用作实参
function arraycopy(/* array */ from, /* index */ from_start,
                   /* array */ to, /* index */ to_start,
                   /* integer */ length)
{
    /**
     * 将原始数组的length元素复制至目标数组，开始复制原始数组的from_start元素，并且将其复制至目标数组的to_start中
     * 记住实参的顺序并不容易
     */
    // 逻辑代码
}

function easycopy(args) {
    arraycopy(args.from,
              args.from_start || 0,
              args.to,
              args.to_start || 0,
              args.length);
}
var a = [1,2,3,4],
    b = [];
easycopy({from: a, to: b, length:4});

/**
 * 实参类型
 * 
 * JavaScript方法的形参并未声明类型，在形参传入函数体之前也未做任何类型检查。可以采用语义化的单词给函数实参命名，
 * 或者如上所示的arraycopy()函数，给实参补充注释，以使代码自文档化，对于可选的实参来说，可在注释中补充一下“这个实参是可选的”。
 * 当一个方法可以接收任意数量的实参时，可以使用省略号提示
 */
function max(/* number... */){ /* 代码区 */}

function isArrayLike(o){
    if (o &&                                       // 非null或undefined
        typeof o === "object" &&                   // o是对象
        isFinite(o.length) &&                      // o.length是有限数值
        o.length >=0 &&                            // o.length是非负值
        o.length === Math.floor(o.length) &&       // o.length是整数
        o.length < 4294967296){                    // o.length < 2^32
        return true;                               // o是类数组对象
    }else{
        return false;
    }
}
// 添加实参类型检查逻辑，因为宁愿程序在传入非法值时报错，也不愿非法值倒置程序在执行时报错
function sum(a) {
    if (isArrayLike(a)) {
        var total = 0;
        for (var i=0;i<a.length;i++) {
            var element = a[i];
            if (element == null) continue;
            if (isFinite(element)) total += element;
            else throw new Error("sum(): elements must be finitenumbers.")
        }
        return total;
    }
    else throw new Error("sum(): arguments must be array-like.")
}

function isArray(a){
    return typeof a === "object" && Object.prototype.toString.call(a) === "[object Array]";
}
function flexisum(a) {
    var total = 0;
    for (var i=0;i<arguments.length;i++) {
        var element = arguments[i],
            n;
        if (element == null) continue;                // 忽略null和undefined实参
        if (isArray(element)) {
            n = flexisum.apply(this, element);        // 实参是数组，递归计算
        } 
        else if (typeof element === "function") {
            n = Number(element());                    // 实参是函数，调用它并类型转换
        }
        else {
            n = Number(element);                      // 直接类型转换
        }
        if (isNaN(n)) {                               // 如果无法转换为数字，则抛出异常
            throw new Error("flexisum(): cant't convert " + element + " to number");
        }
        total += n;
    }
    return total;
}



/**
 * 作为值的函数
 * 
 * 函数可以定义，也可以调用，这是函数的重要特性。函数定义和调用是JavaScript的词法特性，对于其他大多数编程语言来说亦是如此。
 * 然而，在JavaScript中，函数不仅是一种语法，也是值，也就是说，可以将函数赋值给变量，存储在对象的属性或数组的元素中，作为
 * 参数传入另一个函数等。
 */
// 创建一个新的函数对象，并将其赋值给变量square。函数的名字实际上是看不到的，它（square）仅仅是变量的名字，这个变量指代函数对象。
function square(x) {
    return x*x;
}
var s = square;            // 函数赋值给其他变量，并且仍可以正常工作
square(4);                 // 16
s(4);                      // 16
// 除了将函数赋值给变量，还可以将函数赋值给对象的属性。当函数作为对象的属性调用时，函数就称为方法。
var o = {square: function (x) {return x*x;}};   // 对象直接量
var y = o.square(16);      // 256
// 当把它们赋值给数组元素时，函数甚至不需要带名字
var a = [function (x) {return x*x;}, 20];
a[0](a[1]);                // 400

// 定义一些简单的函数
function add(x,y) {return x+y;}
function subtract(x,y) {return x-y;}
function multiply(x,y) {return x*y;}
function divide(x,y) {return x/y;}

// 这里的函数以上面的某个函数作为参数，并传入两个操作数然后调用它
function operate(operator, operand1, operand2) {
    return operator(operand1, operand2);
}

// 计算(2+3)+(4*5)
var i = operate(
            add, 
            operate(add, 2, 3),
            operate(multiply, 4, 5)
        );

// 使用函数直接量，直接定义在一个对象直接量中
var operators = {
    add: function (x,y) {return x+y;},
    subtract: function (x,y) {return x-y;},
    multiply: function (x,y) {return x*y;},
    divide: function (x,y) {return x/y;},
    pow: Math.pow       // 使用预定义的函数
}
// 这个函数接收一个名字作为运算符，在对象中查找这个运算符，然后将它作用于所提供的操作数。注意这里调用运算符的语法。
function operate2(operation, operand1, operand2) {
    if (typeof operators[operation] === "function") {
        return operators[operation](operand1, operand2);
    }
    else {
        throw "unknown operator";
    }
}

// 计算("hello"+ " " + "world")的值。
var j = operate2("add", "hello", operate2("add", " ", "world"));
// 使用预定义的函数Math.pow
var k = operate2("pow", 10, 2);

// 将函数用作值的另外一个例子就是Aray.sort()
var a = [2,3,51,1,100];
a.sort(function(x,y){
    return -(x-y);
});                                // [100, 51, 3, 2, 1]

/**
 * 自定义函数属性
 * 
 * JavaScript中的函数并不是原始值，而是一种特殊的对象，也就是说函数可以拥有属性。
 * 当函数需要一个“静态”变量来在调用时保持某个值不变，最方便的方式就是给函数定义属性，而不是定义全局变量，显然定义
 * 全局变量会让命名空间变得更加杂乱无章。比如，假设你想写一个返回一个唯一整数的函数，不管在哪里调用函数都会返回这
 * 个整数。而函数不能两次返回同一个值，为了做到这一点，函数必须能够跟踪它每次返回的值，而且这些值的信息需要在不同
 * 的函数调用过程中持久化。可以将这些信息存放到全局变量中，但这并不是必需的，因为这个信息仅仅时函数本身用到的。最
 * 好将这个信息保存到函数对象的一个属性中，下面这个例子就实现了这样一个函数。每次调用函数都会返回一个唯一的整数。
 */
// 初始化函数对象的计数器属性，由于函数声明被提前了，因此这里可以在函数声明前给它的成员赋值
uniqueInteger.counter = 0;
// 每次调用这个函数都会返回一个不同的整数，它使用一个属性来记住下一次将要返回的值
function uniqueInteger() {
    return uniqueInteger.counter++;   // 先返回计数器的值，然后计数器再加1
}

// factorial()将自身当作数组来对待，缓存上一次的计算结果
function factorial(n) {
    if (isFinite(n) && n>0 && n == Math.round(n)) { // 有限的正整数
        if (!(n in factorial)) {
            factorial[n] = n * factorial(n-1);      // 如果没有缓存结果，计算并缓存之
        }
        return factorial[n]                         // 返回结果
    }
    else {
        return NaN;                                 // 输入有误
    }
}
factorial[1] = 1;                                   // 初始化缓存以保存这种基本情况

/**
 * 作为命名空间的函数
 * 
 * JavaScript的函数作用域，在函数中声明的变量在整个函数体内都是可见的（包括嵌套的函数），在函数外是不可见的。
 * 不在任何函数内声明的变量是全局变量，在整个JavaScript程序中都是可见的。在JavaScript中是无法声明只在一个代码块内
 * 可见的变量的，基于这个原因，我们常常简单地定义一个函数用做临时的命名空间，在这个命名空间内定义的变量都不会污染
 * 到全局命名空间。（在客户端JavaScript中，这种说法不完全正确，比如，在有些JavaScript的扩展中就可以使用let来声明
 * 语句块内的变量）
 * 
 * 比如，假设你写了一段JavaScript模块代码，这段代码将要用在不同的JavaScript程序中（对于客户端JavaScript来讲通常
 * 是用在各种各样的网页中）。和大多数代码一样，假定这段代码定义了一个用于存储中间计算结果的变量。这样问题就来了，当
 * 模块代码放到不同的程序中运行时，你无法得知这个变量是否已经创建了，如果已经存在这个变量，那么将会和代码冲突。解决
 * 办法当然是将代码放入一个函数内，然后调用这个函数。这样全局变量就变成函数内的局部变量。
 */
function mymodule() {
    // 模块代码
    // 这个模块所使用的所有变量都是局部变量
    // 而不是污染全局命名空间
}
mymodule();

/**
 * 这段代码仅定义一个单独的全局变量：名为“mymodule”的函数。这样还是太麻烦，可以直接定义一个匿名函数，并调用它。
 * 
 * 将mymodule函数重写为匿名的函数表达式，在结束函数定义时，立即调用它。
 */
(function(){
    // 模块代码
}());

/**
 * 这种定义匿名函数并立即在单个表达式中调用它的写法非常常见，已经称为一种惯用法了。注意上面代码的圆括号写法，function
 * 之前的左圆括号是必需的，因为如果不写这个左圆括号，JavaScript解释器会试图将关键字function解析为函数声明语句。使用
 * 圆括号JavaScript解释器才会正确地将其解析为函数定义表达式。使用圆括号是习惯用法，尽管有些时候没必要也不应当省略。
 * 这里定义的函数会立即调用。
 * 
 * 下例展示了这种命名空间技术。它定义一个返回extend()函数的匿名函数，匿名函数中的代码检测了是否出现一个众所周知的IE bug，
 * 如果出现了这个bug，就返回一个带补丁的函数版本。此外，这个匿名函数命名空间用来隐藏一组属性名。
 */
// 定义一个扩展函数，用来将第二个以及后续参数复制至第一个参数
var extend = (function(){
    // 修复它之前，首先检测是否存在bug。这里我们处理了IE bug：在多数IE版本中，如果o存在一个属性与一个不可枚举的属性同名，
    // 则for/in循环不会枚举对象o的可枚举属性，也就是说，将不会正确地处理诸如toString的属性，除非我们显式检测它
    for (var p in {toString: null}) {
        // 如果代码执行到这里，那么for/in循环会正确工作并返回
        // 一个简单版本的extend()函数
        return function extend(o) {
            for (var i=1; i<arguments.length; i++) {
                var source = arguments[i];
                for (var prop in source){
                    o[prop] = source[prop];
                }
            }
            return o;
        };
    }

    // 这个列表列出了需要检查的特殊属性
    var protoprops = ["toString", "valueOf", "constructor", "hasOwnProperty", 
                      "isPrototypeOf", "propertyIsEnumerable", "toLocalString"];

    // 如果代码执行到这里，说明for/in循环不会枚举测试对象的toString属性，因此返回另一个版本的extend()函数，这个函数
    // 显式测试Object.prototype中的不可枚举属性
    return function patched_extend(o) {
        for (var i=1;i<arguments.length;i++) {
            var source = arguments[i];
            // 复制所有可枚举属性
            for (var prop in source) o[prop] = source[prop];

            // 检查特殊属性
            for (var j=0;j<protoprops.length;i++) {
                prop = protoprops[j];
                if (source.hasOwnProperty(prop)) o[prop] = source[prop];
            }
        }
        return o;
    }
}());



/**
 * 闭包
 * 
 * 和其他大多数现代编程语言一样，JavaScript也采用词法作用域（lexical scoping），也就是说，函数的执行依赖于变量作用域，
 * 这个作用域是在函数定义时决定的，而不是函数调用时决定的。为了实现这种词法作用域，JavaScript函数对象的内部状态不仅包含
 * 函数的代码逻辑，还必须引用当前的作用域链。函数对象可以通过作用域链互相关联起来，函数体内部的变量都可以保存在函数作用
 * 域内，这种特性在计算机科学文献中称为“闭包”。（这个术语非常古老，是指函数变量可以被隐藏于作用域链之内，因此看起来是函数
 * 将变量“包裹”了起来）
 * 
 * 从技术的角度讲，所有的JavaScript函数都是闭包：它们都是对象，它们都关联到作用域链。定义大多数函数时的作用域在调用函数
 * 时依然有效，但这不影响闭包。当调用函数时闭包所指向的作用域链和定义函数时的作用域链不是同一个作用域链时，事情就变得
 * 非常微妙。当一个函数嵌套了另一个函数，外部函数将嵌套的函数对象作为返回值返回的时候往往会发生这种事情。有很多强大的编程
 * 技术都利用到了这类嵌套的函数闭包，以至于这种编程模式在JavaScript中非常常见。当你第一次碰到闭包时可能会觉得非常让人费解，
 * 当你理解掌握了闭包后，就能非常自如地使用它了，了解了这一点至关重要。
 * 
 * 
 */

 /**
  * 理解闭包首先要了解嵌套函数的词法作用域规则。checkscope()函数声明了一个局部变量，并定义一个f()函数，函数f()返回了
  * 这个变量的值，最后将函数f()的执行结果返回。由于变量作用域的关系，变量scope的值是“local scope”。
  */
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {return scope}
    return f();
}
checkscope();                             // "local scope"

/**
 * 对上面的示例进行一些改动。在这段代码中，我们将函数内的一对圆括号移动到checkscope()之后。checkscope()现在仅仅返回函数内
 * 嵌套的一个函数对象，而不是直接返回结果。在定义函数的作用域外面，调用这个嵌套的函数（包含最后一行代码的最后一对圆括号）会
 * 发生什么呢？
 * 
 * 回想一下词法作用域的基本规则：JavaScript函数的执行用到了作用域链，这个作用域链是函数定义时创建的。嵌套的函数f()定义在这个
 * 作用域里，其中的变量scope一定是局部变量，不管在何时何地执行函数f()，这种绑定在执行f()时依然有效。一次最后一行代码返回
 * “local scope”，而不是“global scope”。简言之，闭包的这个特性强大到让人吃惊：它们可以捕捉到局部变量（和参数），并一直保存
 * 下来，看起来像这些变量绑定到了在其中定义它们的外部函数。
 */
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {return scope}
    return f;
}
checkscope()();                          // "local scope"

/**
 * 实现闭包
 * 
 * 如果你理解了词法作用域的规则，你就很容易理解闭包：函数定义时的作用域链到函数执行时依然有效。然而很多程序员觉得闭包非常难
 * 理解，因为他们在深入学习闭包的实现时将自己搞得晕头转向。他们觉得在外部函数中定义的局部变量在函数返回后就不存在了（之所以
 * 有这种想法是因为很多人以为函数执行结束后，与之相关的作用域链似乎也不存在了，但在JavaScript中并非如此），那么嵌套的函数
 * 如何能调用不存在的作用域链呢？如果你想搞清楚这个问题，你需要深入地了解类似C语言这种更底层地编程语言，并了解基于栈的
 * CPU架构：如果一个函数的局部变量定义在CPU的栈中，那么当函数返回时它们的确就不存在了。
 * 
 * 但回想一下在3.10.3节中是如何定义作用域链的。
 * 1. JavaScript是基于词法作用域的语言：通过阅读包含变量定义在内的数行源码就能知道变量的作用域。全局变量在程序中始终都是
 * 有定义的。局部变量在声明它的函数体内以及其所嵌套的函数内始终是有定义的。
 * 2. 如果将一个局部变量看做是自定义实现的对象的属性的话，那么可以换个角度来解读变量作用域。每一段JavaScript代码（全局代码
 * 或函数）都有一个与之关联的作用域链（scope chain）。这个作用域链是一个对象列表或链表，这组对象定义了这段代码”作用域“中的
 * 变量。当JavaScript需要查找变量x的值的时候（这个过程称为“变量解析” —— variable resolution），它会从链中的第一个对象
 * 开始查找，如果这个对象有一个名为x的属性，则会直接使用这个属性的值，如果第一个对象中不存在名为x的属性，JavaScript会继续
 * 查找下一个对象，以此类推。如果作用域链上没有一个对象含有属性x，那么就认为这段代码的作用域链上不存在x，并最终抛出一个引用
 * 错误（ReferenceError）异常。
 * 3. 在JavaScript的最顶层代码中（也就是不包含在任何函数定义内的代码），作用域链由一个全局对象组成。在不包含嵌套的函数体内，
 * 作用域链上有两个对象，第一个是定义函数参数和局部变量的对象，第二个是全局变量。在一个嵌套的函数内，作用域链上至少有3个对象。
 * 理解对象链的创建规则是非常重要的。
 * 4. 当定义一个函数时，它实际上保存一个作用域链。当调用这个函数时，它创建一个新对象来存储它的局部变量，并将这个对象添加至
 * 保存的那个作用域链上，同时创建一个新的更长的表示函数调用作用域的“链”。对于嵌套函数来说，事情变得更有趣，每次调用外部函数
 * 时，内部函数又会重新定义一遍。因为每次调用外部函数的时候，作用域链是不同的。内部函数在每次定义的时候都有微妙的区别 —— 在
 * 每次调用外部函数时，内部函数的代码都是相同的，而且关联这段代码的作用域链也不相同。
 * 
 * 我们将作用域链描述为一个对象列表，不是绑定的栈。每次调用JavaScript函数的时候，都会为之创建一个新的对象来保存局部变量，
 * 把这个对象添加至作用域中。当函数返回时，就从作用域链中将这个绑定变量的对象删除。
 * 
 * 1. 如果不存在嵌套的函数，也没其它引用指向这个绑定对象，它就会被当作垃圾回收掉。
 * 2. 如果定义了嵌套的函数，每个嵌套的函数都各自对应一个作用域链，并且这个作用域链指向一个变量绑定对象。
 *    1. 但如果这些嵌套的函数对象在外部函数中保存下来，那么它们也会和所指向的变量绑定对象一样当作垃圾回收。
 *    2. 但如果这个函数定义了嵌套的函数，并将它``作为返回值``返回或者``存储在某处的属性里``，这时就会有一个外部引用指向
 *       这个嵌套的函数，他就不会被当作垃圾回收，并且它所指向的变量绑定对象也不会被当作垃圾回收。
 * 
 * （个人理解：函数调用之后返回的嵌套函数作为返回值，赋值给某一变量并获得外部引用，该嵌套函数的外部函数中定义的局部变量，
 * 会被保存在该变量表示的函数的作用域链中，这就会如先前的第一种情况相同，嵌套函数内部的局部变量会被垃圾回收，但外部函数
 * 局部作用域中的变量不会）
 * 
 * （作者在这里清楚地解释了闭包和垃圾回收之间的关系，如果使用不慎，闭包很容易造成循环引用，当DOM对象和JavaScript对象之间存在
 * 循环引用时需要格外小心，在某些浏览器下造成内存泄露）。
 */
var counter = 0;
function add() {
    var counter = 0;
    function f() { counter++;console.log(counter); }
    return f;
}
var func_add = add();
func_add();                             // 1
func_add();                             // 2
func_add();                             // 3
func_add();                             // 4
counter;                                // 0
func_add.counter;                       // undefined

/**
 * 在前面定义了uniqueInteger()函数，这个函数使用自身的一个属性来保存每次返回的值，以便每次调用都能跟踪上次的返回值。但这种做法
 * 有一个问题，就是恶意代码可能将计数器重置或者把一个非整数赋值给它，导致uniqueInteger()函数不一定能产生唯一的整数（程序运行
 * 过程中修改了那个计数器属性counter的值）。而闭包可以捕捉到单个函数调用的局部变量，并将这些局部变量用作私有状态。
 * 
 * 重写如下。
 */
var uniqueInteger = (function (){              // 定义函数并立即调用
    var counter = 0;                           // 函数的私有状态
    return function() { return counter++; }    // 返回嵌套函数，该函数可访问作用域类的变量，即外部函数中定义的counter变量
                                               // 当外部函数返回后，其它代码都无法访问counter变量，只有内部的函数可以访问
}());                                          // 定义一个立即调用的函数，并将函数的返回值赋值给变量uniqueInteger

/**
 * 像counter一样的私有变量不是只能用在一个单独的闭包内，在同一个外部函数内定义的多个嵌套函数也可以访问它，这多个嵌套函数都共享
 * 一个作用域链，看下面示例。
 * 
 * counter()函数返回一个计数器对象。包含2个方法：count()返回下一个整数；reset()将计数器重置为内部状态。这两个方法都可以
 * 访问私有变量n。再者，每次调用counter()则会创建一个新的作用域链和一个新的私有变量。因此，如果调用counter()两次，则会得到
 * 两个计数器对象，而且批次包含不同的私有变量，调用其中一个计数器对象的count()或reset()不会影响另外一个对象。
 */
function counter() {
    var n = 0;
    return {                   // 定义了2个嵌套函数，并保存在一个对象中
        count: function() { return n++; },
        reset: function() { n=0; },
    }
}
var f = counter();
var count = f.count;
var reset = f.reset;
count();                       // 0
count();                       // 1
reset();                       // undefined
count();                       // 0
count();                       // 1
count();                       // 2

/**
 * 从技术角度讲，其实可以将这个闭包合并为属性存取器方法getter和setter。如下所示，私有状态的实现利用了闭包，而不是普通的
 * 对象属性来实现。
 * 
 * 需要注意的是，这个版本的counter()函数并未声明局部变量，而只是使用参数n来保存私有状态，属性存取器方法可以访问n。
 * 这样的话，调用counter()的函数就可以指定私有变量的初始值了。
 */
function counter(n) { // 函数参数n是一个私有变量
    return {
        // 属性getter方法返回并给私有计数器var递增1
        get count() { return n++; },
        // 属性setter不允许n递减
        set count(m) {
            if (m>=n) n=m;
            else throw Error("count can only be set to a larger value.");
        }
    }
}
var c = counter(1000);
c.count;             // 1000
c.count;             // 1001
c.count = 2000;      // 2000
c.count;             // 2000
c.count = 2000;      // Error!

/**
 * 下面的示例是使用闭包技术来共享私有状态的通用做法。这个例子定义了addPrivateProperty()函数，这个函数定义了一个私有变量，
 * 以及两个嵌套的函数用来获取和设置这个私有变量的值。它将这些嵌套函数添加为所指定对象的方法：
 */
function addPrivateProperty(o, name, predicate) {
    /**
     * 这个函数给对象o增加了属性存取器方法，方法名称为get<name>和set<name>。
     * 如果提供一个判定函数，setter方法就会用它来检测参数的合法性，然后存储它。如果判定函数返回false，setter方法抛出异常
     * 
     * 这个函数有个非同寻常之处，就是getter和setter函数，所操作的属性值并没有存储在对象o中，相反，这个值仅仅是保存在函数
     * 中的局部变量中。getter和setter方法同样是局部函数，因此可以访问这个局部变量。也就是说，对于两个存取器方法来说这个
     * 变量是私有的，没有办法绕过存取器方法来设置或修改这个值。
     * 
     * @param {*} o 
     * @param {*} name 
     * @param {*} predicate 
     */
    // 属性值
    var value;
    // getter方法简单地将其返回
    o["get"+name] = function() { return value; };
    // setter方法首先检测值是否合法，若不合法就抛出异常。否则就将其储存起来
    o["set"+name] = function(v) {
        if (predicate && !predicate(v))
            throw Error("set"+name+": invalid value" + v);
        else
            value = v;
    };
}

var o = {};
// 增加属性存取器方法getName()和setName()，确保只允许字符串值
addPrivateProperty(o, 'Name', function(x) { return typeof x == "string"; });

o.setName("frank");                 // 设置属性值
console.log(o.getName());           // frank；得到属性值
o.setName(0);                       // 试图设置一个错误类型的值

/**
 * 上面2个例子中，在同一个作用域链中定义了两个闭包，这两个闭包共享同样的私有变量或变量。这是一种非常重要的技术，但还是要
 * 特别小心那些不希望共享的变量往往不经意间共享给了其它的闭包。
 */
// 这个函数总是返回一个返回变量v的函数
function constfunc(v) { return function(){ return v; }; }
// 创建一个数组用来存储常数函数
var funcs = [];
for(var i=0;i<10;i++) funcs[i] = constfunc(i);

// 索引为5的元素所表示的函数返回值为5
funcs[5]();                         // 5
/**
 * 这段代码利用循环创建了很多个闭包，当写类似这种代码的时候往往会犯一个错误，那就是试图将循环代码移入定义这个闭包的函数之内。
 */
function constfunc(){
    var funcs = [];
    for(var i=0;i<10;i++) 
        funcs[i] = function(){ return i; };
    return funcs;
}
funcs = constfunc();
funcs[5]();                        // 10
funcs[4]();                        // 10
/**
 * 上面这段代码创建了10个闭包，并将它们存储到一个数组中。这些闭包都是在同一个函数调用中定义，因此它们可以共享变量i。当constfunc()
 * 返回时，变量i的值是10，所有闭包都共享这一个值，因此，数组中的函数的返回值都是同一个值，这不是我们所期望的。关联到闭包的作用域链
 * 都是“活动的”，记住这一点非常重要。嵌套的函数不会将作用域内的私有成员复制一份，也不会对所绑定的变量生成静态快照（static snapshot）。
 * 
 * 书写闭包时，还需要注意的一点是，this是JavaScript的关键字，而不是变量。正如之前讨论的，每个函数调用都包含一个this值，如果闭包在
 * 外部函数里是无法访问this的，除非外部函数将this转存为一个变量。
 * 
 * 将this保存至一个变量中，以便嵌套的函数能够访问它
 * `var self = this;`
 * 
 * 绑定arguments的问题与之类似。arguments并不是一个关键字，但在调用每个函数时都会自动声明它，由于闭包具有自己所绑定的arguments，因此
 * 闭包内无法外部函数的参数数组，除非外部函数将参数数组保存到另外一个变量中。
 * 
 * 保存起来以便嵌套的函数能使用它
 * `var outerArguments = arguments;`
 */



 /**
  * 函数属性、方法和构造函数
  * 
  * 在JavaScript程序中，函数是值。对函数指定typeof运算会返回字符串“function”，但是函数是JavaScript中特殊的对象。
  * 因为函数也是对象，它们也可以拥有属性和方法，就像普通的对象可以拥有属性和方法一样。甚至可以用Function()构造函数
  * 来创建新的函数对象。
  */
