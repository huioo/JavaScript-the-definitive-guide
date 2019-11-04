/**
 * JavaScript的子集和扩展
 */



/**
 * JavaScript的子集
 */

/**
 * 这里提到的JavaScipt版本号默认值Mozilla的语言版本。在spidermonkey和Rhino解析器和FireFox Web浏览器实现了这些语言版本。
 */

/**
 * 常量和局部变量
 * 
 * 在JavaScript 1.5及后续版本中可以使用const关键字来定义常量。常量可以看成不可重复赋值的变量（对常量重新赋值会失败但不报错），对常量的重复声明会报错。
 * 
 * 关键字const和关键字var的行为非常类似，由于JavaScript中没有块级作用域，因此常量会被提前至函数定义的顶部（声明）。
 */
const pi = 3.14;      // 定义一个常量并赋值
pi = 4;               // 任何对这个常量的重新赋值都被忽略
const pi = 4;         // 重新声明常量会报错
var pi = 4;           // 这里也会报错

// var 声明的变量，值为undefined;
var declare8undefined;
console.log(declare8undefined);     //undefined
let declare8undefined_by_let;
console.log(declare8undefined_by_let);     //undefined

// let 声明的变量，直接使用时抛出异常
try{
    // 抛出错误，且不会声明这个变量
    let declare8undefined_by_let2 = declare8undefined_by_let2 || "declare8undefined_by_let2";
}
catch(e){
    console.log(e);            // Cannot access 'declare8undefined_by_let2' before initialization
}

// 函数作用域：变量在声明它们的函数体内以及这个函数体嵌套的任意函数体内都是有定义的。
// JavaScript的函数作用域是指在函数内声明的所有变量在函数体内始终可见。
// 有意思的是，这意味着变量在声明之前甚至已经可用。
// 在如下函数内，不同位置定义了变量i、j和k，它们在同一个作用域内 —— 这三个变量在函数体内均是定义的。
// 变量j声明被提前了，如果没有声明提前，当传入的参数o的typeof运算符的值不是object就会报错。
function test_function_action_scope(o) {
    var i = 0;
    if (typeof o == "object") {               // 在if中时
        var j = 0;
        for (var k=0;k<10;k++) {
            console.log(k);                   // 输出0~9
        }
        console.log(k);                       // 输出10
    }
    console.log(j);                           // if条件成立时，输出0；条件不成立时，输出undefined
    try{
        console.log(undeclared_variable);     // 调用未声明的变量时，抛出错误
    }
    catch (e) {
        console.log(e);                       // 打印错误信息：ReferenceError: undeclared_variable is not defined
    }
}
test_function_action_scope(1);
test_function_action_scope({});

// JavaScript的函数作用域是指在函数内声明的所有变量在函数体内始终可见。
// 有意思的是，这意味着变量在声明之前甚至已经可用。
// JavaScript的这个特性被非正式地称为“声明提前”，即JavaScrpit函数里声明的所有变量（但不涉及赋值）都被“提前”至函数体内的顶部。
// “声明提前”这步操作是在JavaScript引擎的“预编译”时进行的，是在代码开始运行之前。
// 下面打代码中，由于函数作用域的特性，局部变量在整个函数体内始终是有定义的，也就是说，在函数体内局部变量遮盖了同名全局变量。
// 尽管如此，只有程序执行到var语句的时候，局部变量才会被真正赋值。
var scope = "global";
function  f() {
    console.log(scope);   // 输出“undefined”，而不是“global”
    var scope = "local";  // 变量在这里赋初始值，但变量本身在函数体内任何地方均是有定义的
    console.log(scope);   // 输出“local”
}

// 不使用let或var声明变量时，直接初始化的变量可以全局访问
// 下面注释是按顺序执行的结果；此时变量b未定义
function f(a){            //     f(2)        f(1)         f(2)
    try {
        console.log(b);   // 报错b未定义    报错b未定义      2
    }
    catch(e){}
    console.log(c);       //  undefined     undefined    undefined
    if (a==1){
        b=2;
        var c=3;
    }
    try {
        console.log(b);   // 报错b未定义     2              2
    }
    catch(e){}
    console.log(c);       //  undefined     3              3
}
console.log(b);           // 2
delete b;                 // true；可以删除


/**
 * JavaScript中的变量缺少块级作用域的支持被普遍认为是JavaScript的短板，JavaScript 1.7针对这个缺陷增加了关键字let。
 * 关键字let有4种使用方式：
 * - 可以作为变量声明，和var一样
 * - 在for或for/in循环中，作为var的替代方案
 * - 在语句块中定义一个新变量并显式指定它的作用域
 * - 定义一个在表达式内部作用域中的变量，这个变量只在表达式内可用。
 */

/**
 * **替换var，可以作为变量声明**
 * 
 * 使用let最简单的方式就是批量替换程序中的var。通过var声明的变量在函数内都可用，而通过let声明的变量则只属于就近的花括号括起来
 * 的语句块（当然包括它所嵌套的语句块）。比如，如果在循环体内使用let声明变量，那么这个变量在循环体之外是不可用的，示例如下。
 * 
 * **for或for/in循环中var的替代方案**
 * 
 * 下面示例中，let还替代了for循环中的var。这时通过let创建的变量作用域仅限于循环体、循环条件判断逻辑和自增操作表达式。同样，
 * 可以这样在for/in（以及for each）循环中使用let。
 */
function oddsums(n) {
    // 在函数体内都是有定义的
    let total = 0,
        result = [];
    // x只在循环体内有定义
    for (let x = 1;x<=n;x++) {
        // odd只在循环体内有定义
        let odd = 2*x-1;
        total += odd;
        result.push(total);
    }
    // 这里使用x或odd会导致一个引用错误
    return result;
}
oddsums(5);              // [1,4,9,16,25]

// var o = {x:1, y:2};
// for (let p in o) {
//     console.log(p);      // 输出“x”和“y”
// }
// for each(let v in o) console.log(v);    //输出1和2

// console.log(p)  引用错误，p没有定义

/**
 * 
 * 
 * 在声明语句中使用let和在循环初始化器中使用let，两者有着有趣的区别。对于前者来说，变量初始化表达式是在变量的作用域内计算的。但对于
 * 后者来说，变量的初始化表达式则是在变量的作用域之外计算的。当出现两个变量同名的情况时需尤为注意。
 */
// let x = 1;
// for (let x = x+1;x<5;x++)
//     console.log(x);      // 输出2~4
// {                        // 开始一个新的语句块，创建新的变量作用域
//     let x = x+1;         // x没有定义，因此x+1是NaN
//     console.log(x);      // 输出NaN
// }

/**
 * 通过var声明的变量在它们所声明的函数内始终是存在的，但直到代码执行到var语句时才初始化变量。也就是说，变量是存在的（不会抛出引用错
 * 误异常），但在var语句执行之前它的值是undefined。通过let声明变量的情况与之类似，如果在let语句之前使用这个变量（与let语句在同一
 * 个块作用域内），变量是存在的，但值是undefined。
 * 
 * 译者注：ES6中无法声明提前，即未声明前使用会抛出引用异常错误。
 * 
 * 需要注意的是，在用let声明循环变量时这个问题是不存在，语法上是不允许在初始化之前就使用这个变量的。还有一种方法可以在let声明语句之前
 * 使用变量时避免出错，就是在一条单独的let语句（和上文所示的let声明语句不同）的代码块中既包含一组变量的声明也包含这些变量的初始化表达
 * 式。语句里的变量和初始化表达式都放在一对圆括号内，随后跟随一对花括号括起来的语句块。
 * 
 * 译者注：ES6中似乎无法使用
 */
// let a=1, b=2;
// let (a=a+1,b=a+2) {        // 注意这里的写法
//     console.log(a+b);      // 输出5
// };
// console.log(a+b);          // 输出3

/**
 * let语句中的变量初始化表达式并不是这个语句块的一部分，并且是在作用域外部解析的，理解这一点至关重要。这段代码中我们新建了一个新的变量a
 * 并赋值给它一个更大的值。
 */

/**
 * let关键字的最后一种用法是let语句块中的一个变体，其中有一对圆括号括起来的变量列表和初始化表达式，紧跟着是一个表达式而不是一个语句块。
 * 我们把这种写法叫做let表达式，上面的代码可以写成这样。
 */
// let a=1,b=2;
// console.log(let (a=a+1,b=a+2) a+b);   // 输出5

/**
 * 某些const和let的用法（不必是这里的4种形式）在将来可能被纳入ECMAScript标准规范中
 */



/**
 * 解构赋值
 * 
 * 在解构赋值中，等号右侧是一个数组或对象（一个结构化的值），指定左侧一个或多个变量的语法和右侧的数组和对象直接量的语法保持格式一致。
 * 当发生解构赋值时，右侧的数组和对象中一个或多个的值就会被提取出来（解构），并赋值给左侧相应的变量名。除了用于常规的赋值运算符之外，
 * 解构赋值还用于初始化用var和let新声明的变量。
 */
// 配合数组解构赋值
let [x1,y1] = [1,2];      // 1,2；等价于 let x1=1,y1=2;
[x1,y1] = [x1+1,y1+2];    // 2,4；等价于 x1=x1+1,y1=y1+2;
[x1,y1] = [y1,x1];        // 4,2；交换两个变量的值
console.log([x1,y1]);     // [4,2]

// 当函数返回一组结果时，使用解构赋值将大大简化程序代码
// 将[x,y]从笛卡尔（直角）坐标系转换为[r,theta]极坐标
function polar(x,y) {
    return [Math.sqrt(x*x+y*y), Math.atan2(y, x)];
}

// 将极坐标转换为笛卡尔坐标
function cartesian(r, theta) {
    return [r*Math.cos(theta), r*Math.sin(theta)];
}

let [r, theta] = polar(1.0, 1.0);        // r=Math.sqrt(2), theta=Math.PI/4
let [x2, y2] = cartesian(r, theta);      // x2=1.0, y2=1.0

/**
 * 解构赋值右侧的数组包含的元素不必和左侧的变量一一对应，左侧多余的变量赋值为undefined，而右侧多余的值则会忽略。左侧的
 * 变量列表可以包含连续的逗号用以跳过右侧对应的值。
 * 
 * JavaScript并未提供将右侧的多余的值以数组的形式赋值给左侧变量的语法。比如，在这段代码的第二行，并不能将[2,3]赋值给y。
 */
let [x3,y3] = [1];        // x3=1,y3=undefined
[x3, y3] = [1,2,3];       // x3=1,y3=2
[,x3,,y3] = [1,2,3,4];    // x3=2,y3=4

/**
 * 整个解构赋值运算的返回值是右侧的整个数据结构，而不是从中提取出来的某个值。因此，可以这样写“链式”解构赋值：
 */
let first, second, all;
all = [first, second] = [1,2,3,4];   // all=[1,2,3,4],first=1,second=2

/**
 * 解构赋值同样可以用于数组嵌套的情况，解构赋值的左侧应当也是同样格式的嵌套数组直接量
 */
let [one, [twoA, twoB]] = [1,[2,2.5],3];    // one=1,twoA=2,twoB=2.5

/**
 * 解构赋值的右侧也可以是一个对象。这时，左侧也应该看起来像对象直接量，对象中是一个名值对列表，名值对之间用逗号分隔，
 * 列表用花括号括起来。名值对内冒号左侧是属性名称，冒号右侧是变量名称，每一个命名属性都会从右侧对象中查找对应的赋值，
 * 每个值（或者是undefined）都会赋值给它所对应的变量。
 * 
 * 这种解构赋值容易被搞混，因为属性名称和变量标识符通常写成一样的。下面的r、g、b是属性名，red、green、blue是变量名。
 */
let transparent = {r:0.0, g:0.0, b:0.0, a:1.0};   // 一个RGBA值表示的颜色
let {r:red, g:green, b:blue} = transparent;       // r=0.0, g=0.0, b=0.0

// 将Math对象的全局函数复制至新的变量中，用于简化三角函数相关的代码
// 等价于：let sin=Math.sin, cos=Math.cos, tan=Math.tan
let {sin:sin, cos:cons, tan:tan} = Math;

/**
 * 就像嵌套数组可以用于解构赋值一样，嵌套对象也可以用于解构赋值，实际上，两种语法可以合在一起使用，用来描述任意的
 * 数据结构。
 */
let data = {
    name: "destructuring assignment",
    type: "extension",
    impl: [
        {engine: "spidermonkey", version: 1.7},
        {engine: "rhino", version: 1.7}
    ]
}

// let ({name: feature, impl: [{engine:impl1, version:v1}, {engine:impl2, version:v2}]} = data) {
//     console.log(feature);    // "destructuring assignment"
//     console.log(impl1);      // "spidermonkey"
//     console.log(impl2);      // "rhino"
//     console.log(v1);         // 1.7
// }
let {name: feature, impl: [{engine:impl1, version:v1}, {engine:impl2}]} = data;

console.log(feature);    // "destructuring assignment"
console.log(impl1);      // "spidermonkey"
console.log(impl2);      // "rhino"
console.log(v1);         // 1.7

/**
 * 需要注意的是，类似这种嵌套的解构赋值可能会让代码变得晦涩难懂。然而，有一种有趣的的规律可以帮助你更好地阅读这些复杂的
 * 解构赋值。思考一下最普通的赋值（给一个变量赋值）。赋值结束后，可以将这个变量用在程序中的表达式里，这个变量的值就是刚
 * 赋的值。
 * 在解构赋值中，左侧的部分使用了类似数组直接量或对象直接量的语法。但需要注意，在解构赋值完成后，左侧部分看起来像数组直
 * 接量或对象直接量的代码是可以作为合法的数组和对象用在代码其它位置的，所有必需的变量都已经有了定义，因此可以直接将等号
 * 左侧的部分作为一个可用的数组或对象复制并粘贴到程序的其它地方。
 */
console.log({name: feature, impl: [{engine:impl1, version:v1}, {engine:impl2}]});
// {name: "destructuring assignment", impl: Array(2)}



/**
 * 迭代
 * 
 * Mozilla的JavaScript扩展引入了一些新的迭代机制，包括for/each循环和Python风格的迭代器（iterator）和生成器（generator）。
 * - for/each 循环
 * - 迭代器
 * - 生成器
 * - 数组推导
 * - 生成器表达式
 */

/**
 * for/each 循环
 * 
 * for/each 循环是由E4X规范（ECMAScript for XML）定义的一种新的循环语句。E4X是语言的扩展，它允许JavaScript程序中直
 * 接出现XML标签，并添加了操作XML数据的语法和API。
 * Web浏览器大多没有实现E4X，但是Mozilla的JavaScript1.6（随着FireFox 1.5发布）是支持E4X的。本节只讲解for/each，不
 * 涉及XML对象。
 * 
 * 译者注：ES6似乎无法使用，可以使用for/of 循环遍历属性值
 */
// 遍历对象
// for/each 循环和for/in 循环类似。
// 但for/each 循环并不是遍历对象的属性，而是遍历属性的值。
let o = {one: 1, two:2, three:3};
for (let p in o) console.log(p);       // 输出“one” “two” “three”
// for each(let v in o) console.log(v);   // 输出1 2 3
for (let v in o) console.log(o[v]);    // 输出1 2 3

// 遍历数组
// for/each 循环遍历循环的元素（而不是索引）。
// 它通常按数值顺序枚举它们，但实际上这并不是标准化或必需的
let a = ["one", "two", "three"];
for (let p in a) console.log(p);       // 输出数组索引：0 1 2
// for each(let v in a) console.log(v);   // 输出“one” “two” “three”
for (let v of a) console.log(v);       // 输出数组元素：“one” “two” “three”

/**
 * 注意，for/each 循环并不仅仅针对数组本身的元素进行遍历，它也会遍历数组中所有可枚举属性的值，包括由数组继承来的可枚举
 * 方法。因此，通常并不推荐for/each循环和数组一起使用。在ECMAScript 5之前的JavaScript版本中是可以这样用的，因为自定义
 * 属性和方法不可能设置为可枚举的。
 */


/**
 * 迭代器
 * 
 * JavaScript 1.7为for/in循环增加了更多通用的功能。JavaScript 1.7中的循环和Python的for/in循环非常类似，它可以遍历任何
 * 可迭代的（iterable）对象。
 * 
 * 迭代器是一个对象，这个对象允许对它的值集合进行遍历，并保持任何必要的状态以便能够跟踪到当前遍历的“位置”。
 * 迭代器必需包含next()方法，每一次调用next()都返回集合中下一个元素。比如下面的counter()函数返回一个迭代器，这个迭代器
 * 每次调用next()都会返回连续递增的整数。需要注意的是，这个函数作用域利用闭包的特性实现了计数器当前状态的保存。
 */
function countor(start) {
    let nextValue = Math.round(start);     // 表示迭代器的一个私有状态
    return {next: function () {            // 返回当前迭代器对象
        return nextValue++;
    }};
}
let serialNumberGenerator = countor(1000);
let sn1 = serialNumberGenerator.next();    // 1000
let sn2 = serialNumberGenerator.next();    // 1001

/**
 * 当迭代器用于有限的集合时，当遍历所有的值并且没有多余的值可迭代时，在调用next()方法会抛出StopIteration。StopIteration
 * 是JavaScript 1.7中的全局对象的属性。它的值是一个普通的对象（它自身没有属性），只是为了终结迭代的目的而保留的一个对象。
 * 注意，实际上，StopIteration并不是像TypeError()和RangeError()这样的构造函数。
 * 
 * 比如，这里实现了一个RangeIter()方法，这个方法返回一个可以对某个范围的整数进行迭代的迭代器。
 */
let StopIteration;
StopIteration = StopIteration || "StopIteration";

function rangeIter(first, last) {
    let nextValue = Math.ceil(first);
    return {
        next: function () {
            if (nextValue > last) throw StopIteration;
            return nextValue++;
        }
    };
}

let r = rangeIter(1, 5);                   // 获得迭代器对象
while(true) {                              // 在循环中使用
    try{
        console.log(r.next());             // 调用next()，输出1~5
    }
    catch(e){
        console.log(e);
        if (e == StopIteration) break;     // 抛出StopIteration时，退出循环
        else throw e;
    }
}

/**
 * 可迭代的对象，表示一组可迭代处理的值。可迭代对象必须定义一个名为“__iterator__”的方法（开始和结尾有两条下划线），用以返回
 * 这个集合的迭代器对象。
 * 
 * JavaScript 1.7对for/in循环的功能进行了扩展，可以用它来遍历可迭代对象。如果关键字in右侧的值是可迭代的，那么for/in循环会
 * 自动调用它的__iterator__()方法来获得一个迭代器对象。然后调用它的next()方法，将返回值赋值给循环变量，随即执行循环体。
 * for/in循环自己会处理StopIteration异常，而且处理过程对开发者是不可见的。
 * 
 * 下例中定义了一个range()函数，这个函数返回一个可迭代对象（不是迭代器），用以表示某个范围内的整数。使用迭代范围的for/in循环
 * 要比使用迭代器的while循环更简单。
 */
function range(min, max) {
    return {                          // 返回一个表示范围的对象
        get min() { return min; },    // 范围边界固定
        get max() { return max; },    // 并在闭包内保存起来
        includs: function (x) {
            return min <= x && x <= max;
        },
        toString: function () {
            return "[" + this.min + "," + this.max + "]";
        },
        __iterator__: function () {
            let val = Math.ceil(this.min);     // 当前位置保存在闭包内
            return {
                next: function () {
                    if (val > this.max)
                        throw StopIteration;
                    return val++;
                }
            };
        }
    };
}
// 对返回值进行迭代
// 笔者注：ES6中似乎当做对象对待，语法不成立
for (let i in range(1, 10)) console.log(i);   // 输出1~10之间的数字
                    // 实际输出 min max includs toString __iterator__

/**
 * 调用Iterator()函数（定义在JavaScript 1.7中的全局函数），显式获得一个迭代器对象。如果这个函数的参数是一个可迭代对象，
 * 那么它将返回这个对象的__iterator__()方法的调用结果，从而保持代码整洁干净。如果给Iterator()函数传入第二个参数，这个
 * 参数也会参与__iterator__()方法的调用。
 * 
 * 然而，引入Iterator()函数还有一个重要的目的，如果传入的对象或者数组没有定义__iterator__()方法，它会返回这个对象的一
 * 个可迭代的自定义迭代器。每次调用这个迭代器的next()方法都会返回其中包含两个值的一个数组，第一个数组元素是一个属性名，
 * 第二个是命名属性的值。由于这个对象是可迭代的迭代器，因此它可以直接用于for/in循环，而不是直接调用它的next()方法。这意
 * 味着可以将Iterator()函数和解构赋值一起使用，这样可以方便地对对象或数组的属性和值进行遍历。
 */
// for (let [k,v] in Iterator({a:1, b:2}))       // 对属性和值作迭代
//     console.log(k + "=" + v);                 // 输出 “a=1”和“b=2”

/**
 * Iterator()函数返回的迭代器还有两个重要的特性。第一，它只对自由属性进行遍历而忽略继承来的属性，通常我们希望是这个样子。
 * 第二，如果给Iterator()传入第二个参数true，返回的迭代器只对属性名进行遍历，而忽略属性值。
 */
// o = {x:1, y:2};                              // 定义一个对象，有两个属性
// Object.prototype.z = 3;                      // 所有对象都继承了z
// for (p in o) console.log(p);                 // 输出“x”、“y”、“z”
// for (p in Iterator(o, true)) console.log(p); // 只输出“x”、“y”


/**
 * 生成器
 * 
 * 译者注：ES6中似乎无法使用
 * 
 * 生成器是JavaScript 1.7的特性（从Python中借过来的概念），这里用到了一个新的关键字yield，使用这个关键字时代码必须显式
 * 指定JavaScript的版本1.7。关键字yield和return类似，返回一个值，区别在于，使用yield的函数“产生”一个可保持函数内部状态
 * 的值，这个值是可以恢复的。这种可恢复性使得yield成为编写迭代器的有力工具。
 * 
 * 任何使用关键字yield的函数（哪怕yield在代码逻辑中是不可达的）都称为“生成器函数”（generator function）。生成器函数通过
 * yield返回值。这些函数中可以使用return来终止函数的执行而不带任何返回值，但不能使用return来返回一个值。除了使用yield，
 * 对return的使用限制也使生成器函数更明显地区别普通函数。然而和普通的函数函数一样，生成器函数也通过关键字function声明，
 * typeof运算符返回“function”，并可以从Function.prototype继承属性和方法。但对生成器函数的调用却和普通函数完全不一样，
 * 不是执行生成器函数的函数体，而是返回一个生成器对象。
 * 
 * 生成器是一个对象，用以表示生成器函数的当前执行状态。它定义了一个next()方法，后者可恢复生成器函数的执行，只要遇到下一条
 * yield语句为止。这时，生成器函数中的yield语句的返回值就是生成器的next()方法的返回值。如果生成器函数通过执行return语句
 * 或者到达函数体末尾终止，那么生成器的next()方法将抛出一个StopIteration。
 * 
 * 只要一个对象包含可抛出StopIteration的next()方法，它就是一个迭代器对象。实际上，它们是可迭代的迭代器，也就是说，它们可以
 * 通过for/in循环进行遍历。下面的代码展示了如何简单地使用生成器函数以及对它生成的返回值进行遍历。
 */
// 针对一个整数范围定义一个生成器函数
// function range(min, max) {
//     for (let i=Math.ceil(min); i<max; i++) yield i;
// }
// for (let n in range(3,8)) console.log(n);    // 输出数字3~8

/**
 * 生成器函数不需要返回。实际上，最典型的例子就是用生成器来生成Fibonacci数列。
 */
// function fibonacci() {
//     let x = 0, y = 1;
//     while(true){
//         yield y;
//         [x,y] = [y, y+x];
//     }
// }
// f = fibonacci();
// for (let i=0;i<10;i++) console.log(f.next());

/**
 * fibonacci()生成器函数没有返回。因此，它所产生的生成器不会抛出StopIterator。不能使用for/in循环，这个循环是一个无穷循环，
 * 而是把它当做迭代器显式调用10次它的next()方法。这段代码运行后，生成器f仍然保持着生成器函数的执行状态，如果不再使用f，则可
 * 以通过调用f.close()方法来释放它。
 * 调用close()之后，生成器函数就会终止执行。如果当前挂起的位置在一个或者多个try语句块中，那么将首先运行finally从句，在执行
 * close()。close()没有返回值，但如果finally语句块产生了异常，这个异常则会传播给close()。
 */
// f.close();

/**
 * 生成器经常用来处理序列化的数据，比如元素列表、多行文本、词法分析器中的单词等。生成器可以像Unix的shell命令中的管道那样链式
 * 使用。有趣的是，这种用法中的生成器是“懒惰的”，只有在需要的时候才会从生成器（或者生成器的管道）中“取”值，而不是一次将许多
 * 结果都计算出来。
 * 
 * 例11-1：一个生成器管道
 */
// // 一个生成器，每次产生一行字符串s
// // 这里没有使用s.split()，因为这样会每次都处理整个字串，并分配一个数组
// // 我们希望更“懒”一点
// function eachline(s) {
//     let p;
//     while((p=s.indexOf('\n')) != -1){
//         yield s.substring(0, p);
//         s = s.substring(p+1);
//     }
//     if (s.length > 0) yield s;
// }

// // 一个生成器函数，对于每个可迭代的i的每个元素x，都会产生一个f(x)
function map(i, f) {
    for (let x in i) yield f(x);
}

// // 一个生成器函数，针对每个结果为true的f(x)，为i生成一个元素
// function select(i, f) {
//     for (let x in i)
//         if (f(x)) yield x;
// }
// // 准备处理这个字符串
// let text = " #conmment \n \n hello \nworld\n quit \n unreached \n";
// // 文本隔成行
// let lines = eachline(text);
// // 去掉收尾的空白字符
// let trimmed = map(lines, function (line) {
//     return line.trim();
// });
// // 挑选非空行和非注释的行
// let nonblank = select(trimmed, function (line) {
//     return line.length > 0 && line[0] != "#"
// });
// // 现在从管道中取出经过删减和筛选后的行进行处理，直到遇到“quit”的行
// for (let line in nonblank) {
//     if (line === "quit") break;
//     console.log(line);
// }

/**
 * 生成器往往是在创建的时候初始化，传入生成器函数的值是生成器所接收的唯一输入。然而，也可以为正在执行的生成器提供更多输入。
 * 每一个生成器都有一个send()方法，后者用来重启生成器的执行，就像next()一样。和next()不同的是，send()可以带一个参数，这
 * 个参数的值就成为yield表达式的值（多数生成器函数是不会接收额外的输入的，关键字yield看起来像一条语句。但实际上，yield是
 * 一个表达式，是可以有值的）。除了next()和send()之外，还有一种方法可以重启生成器的执行，即使用throw()。如果调用这个方法，
 * yield表达式就将参数作为一个异常抛给throw()，比如，下面一段代码。
 */
// 一个生成器函数，用以从某个初始值开始计数
// 调用生成器的send()来进行增量计算，调用生成器的throw("reset")来重置初始值
// 这里的代码只是示例，throw()的这种用法并不推荐
function countor(initial) {
    let nextValue = initial;             //定义初始值
    while(true){
        try{
            let increment = yield nextValue;  // 产生一个值并得到增量
            if (increment) {                  // 如果我们传入一个增量...
                nextValue += increment;       // ...那么使用它
            }
            else{
                nextValue++;                  // 否则自增1
            }
        }
        catch (e){        // 如果调用了生成器的throw()，就会执行这里的逻辑
            if (e == "reset") {
                nextValue = initial;
            }
            else{
                throw e;
            }
        }
    }
}
let c = countor(10);            // 用10来创建生成器
console.log(c.next());          // 输出10
console.log(c.send(2));         // 输出12
console.log(c.throw("reset"));  // 输出10


/**
 * 数组推导
 * 
 * JavaScript 1.7中的数组推导（arraycomprehension）也是从python中借用过来的一个概览。它是一种利用另外一个数组或可迭代对象
 * 来初始化数组元素的技术。数组推导的语法是基于定义元素集合的数字模型的，也就是说，表达式和从句的写法和JavaScript程序员期望的
 * 不一样。
 */
// 这段代码展示了数组推导的写法
// 用到上文提到的range()函数，这段代码用以初始化一个数组，数组成员是0~100之间的偶平方数
// let evensquares = [x*x for (x in range(0, 10) if (x%2 === 0))];

// 等价于
let evesquares = [];
for (let i=0;i<=10;i++) {
    if (x%2 === 0) evensquares.push(i**2);
}

/**
 * 数组推导语法：
 *      [ expression for (variable in object) if (condition)]
 * 
 * 数组推导包含三部分：
 * - 一个没有循环体的for/in（或for/each）循环。这部分推导包含一个变量（或者通过解构赋值得到的一个多个变量），它位于关键字in
 *     的左侧，in的右侧是一个对象（例如，这个对象可以是一个生成器、可迭代对象或数组）。尽管这个对象后面没有循环体，这段数组
 *     推导也能正确执行迭代，并能给指定的变量赋值。注意，在变量之前没有关键字let或var，其实这里使用了隐式的let，在数组推导中
 *     的变量在方括号的外部是不可见，也不会覆盖已有的同名变量。
 * - 在执行遍历对象之后，是圆括号中的关键字if和条件表达式，目前，这个条件表达式是只用做过滤迭代的值。每次for循环产生一个值之
 *     后会判断条件表达式。如果条件表达式返回false，则跳过这个值，这个值也不会被添加至数组当中。if从句是可选的，如果省略的
 *     话，相当于给数组推导补充一条if(true)从句。
 * - 在关键字for之前是expression，可以认为这个表达式是循环体。在迭代器返回了一个值并将它赋给一个变量，且这个变量通过了
 *     conditional测试之后，将计算这个表达式，并将表达式的计算结果插入到要创建的数组中。
 */
// let data = [2,3,4,-5];
// let squares = [x*x for each(x in data)];    // [4,9,16,25]
// // 如果数组元素是非负数，求它的平方根
// let root = [Math.sqrt(x) for each(x in data) if (x>=0)];

// // 将一个对象的属性名放入新创建的数组中
// let o = {a:1, b:2, f:function(){}};
// let allkeys = [p for (p in o)];
// let ownkeys = [p for (p in o) if (o.hasOwnProperty(p)) ];
// let notfuncs = [k for ([k,v] in Iterator(o)) if (typeof !== "function")];


/**
 * 生成器表达式
 * 
 * 在JavaScript 1.8中，将数组推导中的方括号替换成圆括号，它就成了一个生成器表达式。生成器表达式（generator expression）
 * 和数组推导非常类似（两者在圆括号内的语法几乎完全一样），只是它的返回值是一个生成器对象，而不是一个数组。和数组推导相比，
 * 使用生成器表达式的好处是可以惰性求值（lazy evaluation），只有在需要的时候求值而不是每次都计算求值，这种特性可以应用于
 * 潜在的无穷序列。使用生成器表达式而不用数组也有不足之处，生成器只支持对值的顺序存取而不是随机存取。和数组不同，生成器并
 * 没有索引，为了得到第n个值，必须遍历它之前的n-1个值。
 */
// 前面的map()函数，等价于下面代码；对每个x生成f(x)
// let h = (f(x) for (x in g));

// 利用eachline()生成器，去除空格、注释和空行
// let lines = eachline(text);
// let trimmed = (l.trim() for (l in lines));
// let nonblank = (l for (l in trimmed) if (l.length>0 &&  l[0]!="#"));



/**
 * 函数重写
 * 
 * 对于简单的函数，JavaScript1.8引入了一种简写形式：表达式闭包。如果函数只计算一个表达式并返回它的值，关键字return和
 * 花括号可以省略，并将待计算的表达式紧接放在参数列表之后。
 */
// let succ = function(x) x+1,
//     yes = function() true,
//     no = function() false;

// 这种快捷写法更适用于当给函数传入另一个函数的场景
// 对数组按照数字大小顺序进行降序排列
// data.sort(function(a,b) b-a);

// 定义一个函数，用以返回数组元素的平方和
// let sumOfSquares = function(data) Array.reduce(Array.map(data, function(x) x*x), function(x,y) x+y);



/**
 * 多catch从句
 * 
 * JavaScript 1.5中，try/catch语句已可以使用多catch从句了。在catch从句的参数中加入关键字if以及一个条件判断表达式。
 * 
 * 当产生一个异常时，程序会尝试依次执行每一条catch从句。catch从句中的命名参数即是这个异常，执行到catch的时候会计算它
 * 条件表达式。如果条件表达式计算结果为true，则判断当前catch从句中的逻辑，同时跳过其它的catch从句。如果catch从句中没
 * 有条件表达式，程序就会假设它包含一个if true的条件，如果它之前的catch从句都没有触发，那么这条catch从句一定会执行。
 * 如果所有的catch从句都包含条件，但没有一个条件是true，那么程序会向上抛出这个未捕获的异常。注意，因为catch从句中的条
 * 件表达式已经在圆括号内了，因此也就不必像普通的条件语句一样再给它包裹一对圆括号。
 */
// try{
//     // 这里会抛出多种类型的异常
//     throw 1;
// }
// catch(e if e instanceof ReferenceError){
//     // 这里处理引用异常
// }
// catch(e if e === "quit"){
//     // 这里处理抛出的字符串是quit的情况
// }
// catch(e if typeof e ==="string"){
//     // 这里处理其它字符串的情况
// }
// catch(e){
//     // 这里处理余下的异常
// }
// finally{
//     // finally从句正常执行
// }



/**
 * E4X：ECMAScript for SML
 */

