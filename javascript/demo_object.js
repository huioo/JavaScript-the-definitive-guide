/*
对象直接量：名/值对，冒号分隔，逗号分组
属性名：JavaScript标识符，字符串直接量
属性值：JavaScript表达式，
*/
var empty = {};
var point = {x:1, y:1};
var point2 = {x:point.x, y:point.y+1};
var book = {
    "main title": "JavasSript",
    "sub-title": "The Definitive Guide",
    "for": "all audiences",
    author: {
        firstname: "David",
        surname: "Flanagan"
    }
}
var author = book.author
var name = author.surname
var title = book["main title"]
book.edition = 6
book["main title"] = "ECMAScript"

/*
new创建对象
构造函数：
*/
var o = new Object();
var a = new Array();
var s = new String();
var d = new Date();
var r = new RegExp("js");
function Point(x, y){
    this.x = x;
    this.y = y;
}
var p = new Point(1, 1); // Point {x: 1, y: 1}

/**
 * 原型：每一个javascript对象（除null外）都和另一个对象关联。“另一个”对象就是我们熟悉的原型，每一个对象都是从原型继承属性。
 * 
 * 对象直接量创建的对象都具有同一个原型对象，并可以通过JavaScript代码Object.prototype获得对原型对象的引用。
 * 通过关键字new和构造函数调用创建的对象的原型就是构造函数的prototype属性的值，即该对象的原型就是该对象的prototype属性值。
 * 因此，同使用{}创建对象一样，通过new Object()创建的对象也继承自Object.prototype。
 * 同样，通过new Array()创建的对象的原型就是Array.prototype，通过new Date()创建的对象的原型就是Date.prototype。
 * 
 * 没有原型的对象为数不多， Object.prototype就是其中之一。它不继承任何属性。其他原型对象都是普通对象，普通对象都具有原型。
 * 所有的内置构造函数（以及大部分自定义的构造函数）都具有一个继承自Object.prototype的原型。
 * 例如，Date.prototype的属性继承自Object.prototype，因此由new Date()创建的Date对象的属性同时继承自Date.prototype和Object.prototype。
 * 这一系列链接的原型对象就是所谓的“原型链”（prototype chain）。
 * 
 * 
 */

/**
 * Object.create()
 * ECMAScript 5
 * 
 * 创建一个对象，第一个参数是这个对象的原型。
 * 第二个可选参数，用以对对象的属性进行进一步描述。
 * 
 * 这是一个静态函数，而不是提供给某个对象调用的方法。
 */
var o1 = Object.create({x:1, y:1}); // o1继承了属性x和y

var o2 = Object.create(null); // 创建没有原型的新对象，不会继承任何东西，甚至包括基础方法，比如toString()，它将不能和“+”运算符一起工作

var o3 = Object.create(Object.prototype); // 创建普通的空对象（比如通过{}和new Object()创建的对象），需要传入Object.prototype，与new Object()一样

// 在ECMAScript 3中使用下面的inherit函数模拟原型继承
// inherit() 返回了一个继承自原型对象p的属性的新对象
// 这里使用ECMAScript 5中的Object.create()函数（如果存在的话）
// 如果不存Object.create()，则使用别的方法
function inherit(p){
    if (p == null) throw TypeError;
    if (Object.create) return Object.create(p);
    
    var t = typeof p;
    if (t !== "object" && t !=="function") throw TypeError;

    function f(){};
    f.prototype = p;
    return new f(); // 使用f()创建p的继承对象

}


/**
 * 检查属性
 * in：如果对象的自有属性和继承属性包含这个属性，返回true
 * hasOwnProperty()：对象的hasOwnProperty()方法用来检测给定的名字是否是对象的自有属性。对于继承属性，它返回false。
 * propertyIsEnumerable()：propertyIsEnumerable()方法是hasOwnProperty()的增强版，只有检测到是自有属性且这个属性的可枚举性（enumerable attribute）为true时它才返回true。
 * "!=="：类似“in”的使用，判断属性是否是undefined，但不能判断存在且值为undefined的属性。"!=="可以区分undefined和null。
 */
var o = {x:1};
"x" in o;     // true
"y" in o;     // false
"toString" in o;  // true：o继承toString属性

o.hasOwnProperty("x"); // true
o.hasOwnProperty("y"); // false
o.hasOwnProperty("toString");  //false

var o = inherit({y:2});
o.x = 1;
o.propertyIsEnumerable("x"); // true
o.propertyIsEnumerable("y"); // false
Object.prototype.propertyIsEnumerable("toString"); // false  

var o = {x:1}
o.x !== undefined; // true：o中有属性x
o.y !== undefined; // false：o中没有属性y
o.toString !== undefined; // false

// 有一种场景只能使用in运算符。in可以区分不存在的属性和存在但值为undefined的属性
var o = {x:undefined};
o.x !== undefined; // false：属性存在但值为undefined
o.y !== undefined; // false
"x" in o; // true
"y" in o; // false
delete o.x;
"x" in o; // false
// 注意：上述代码中使用"!=="运算符，而不是"!="。"!=="可以区分undefined和null
undefined == null; // true
undefined === null; // false
// 如果o中含有属性x，且x的值不是null或undefined，o.x乘以2。此时，o.x转换原始值为0再计算。
if (o.x != null) o.x *= 2;
// 如果o中含有属性x，且x的值不能转换为false，o.x乘以2。
// 如果x时undefined、null、false、" "、0或NaN，则它保持不变
if (o.x) o.x *= 2;

/**
 * 枚举属性
 */
var o = {x:1, y:2, z:3}
o.propertyIsEnumerable("toString"); // false
for (p in o) console.log(p); // 输出x、y、z，不会输出toString

// 有许多实用工具库给Object.prototype添加了新的方法或属性，这些方法和属性可以被所有对象继承并使用。
// 然而ECMAScript 5标准之前，这些新添加的方法不能定义为不可枚举的，因此它们可以在for/in循环中枚举出来。
// 为了过滤这些方法和属性，常通过下面2种方法过滤。
for (p in o){
    if (!o.hasOwnProperty(p)) continue; // 跳过继承的属性
}
for (p in o){
    if (typeof o[p] === "function") continue; // 跳过方法
}


/**
 * 把p中的可枚举属性复制到o中，并返回o；如果o和p有同名属性，则覆盖o中的属性；这个函数不处理getter和setter以及复制属性；
 * @param {*} o 
 * @param {*} p 
 */
function extend(o, p){
    for (prop in p){
        o[prop] = p[prop];
    }
    return o;
}
/**
 * 将p中的可枚举属性复制到o中，并返回o；如果o和p中有同名的属性，o中的属性将不受影响；这个函数并不处理getter和setter以及复制属性；
 * @param {*} o 
 * @param {*} p 
 */
function merge(o, p){
    for (prop in p){
        if (o.hasOwnProperty(prop)) continue;
        o[prop] = p[prop];
    }
    return o;
}   
/**
 * restrict：限制、约束、限定
 * 如果o中属性在p中没有同名属性，则从o中删除这个属性；返回o；
 * o中拥有同时在o和p中出现的属性。
 * @param {*} o 
 * @param {*} p 
 */
function restrict(o, p){
    for (prop in o){
        if ( !(prop in p)) delete o[prop];
    }
    return o;
}
/**
 * subtract：减去、差集
 * 如果o中属性在p中存在同名属性，则从o中删除这个属性；返回o；
 * o中拥有只出现在o中，但不出现在p中的属性
 * @param {*} o 
 * @param {*} p 
 */
function subtract(o, p){
    for (prop in p){
        delete o[prop]; // 删除不存在的值不会报错
        // 类似于：
        // if (prop in p) delete o[prop];
    }
    return o;
}
/**
 * union：联合、并集
 * 返回一个新对象，这个对象同时拥有o的属性和p的属性；如果o和p有重名属性，使用p中的属性；
 * @param {*} o 
 * @param {*} p 
 */
function union(o, p){
    return extend(extend({}, o), p);
}
/**
 * intersection：交叉、交集
 * 返回一个新对象，这个对象拥有同时在o和p中出现的属性；很像求o和p的交集，但p中的属性值被忽略
 * @param {*} o 
 * @param {*} p 
 */
function intersection(o, p){
    return restrict(extend({}, o), p);
}
/**
 * 返回一个数组，这个数组包含的是o中可枚举的自有属性的名字
 * @param {*} o 
 */
function keys(o){
    if (typeof o !== "object") throw TypeError;
    var result = [];
    for (var prop in o){
        if (o.hasOwnProperty(prop)){
            result.push(prop);
        }
    }
    return result;
}



/**
 * 存取器属性：属性值用getter和setter方法替代，由它们定义的属性称作“存取器属性”
 * 只读：只有getter方法
 * 只写：只有setter方法，读取返回undefined
 * 读写：有getter和setter方法
 */

/**
 * 对象直接量语法的扩展写法，定义存取器属性；
 */
var point = {
    // 普通的可读写的数据属性：data_prop: value,
    x: 1.0,
    y: 1.0,

    // 存取器属性，定义为一个或两个和属性同名的函数，通常是成对定义。
    // 函数没有使用function关键字，使用get和set，且没有使用冒号将属性名和函数体分隔开。
    // get accessor_prop(){ /* 这里是函数体 */ }
    // set accessor_prop(value){ /* 这里是函数体 */ }
    // r是可读写的存取器属性，它有getter和setter。函数体结束后不要忘记带上逗号
    get r(){
        return Math.sqrt(this.x*this.x+this.y*this.y);
    },
    set r(newvalue){
        var oldvalue = Math.sqrt(this.x*this.x+this.y*this.y);
        var ratio = newvalue/oldvalue;
        this.x *= ratio;
        this.y *= ratio;
    },
    // theta是只读存取器属性，只有getter方法
    get theta(){
        return Math.atan2(this.y, this.x);
    }
}
/**
 * 和数据属性一样，存取器属性是可以继承的，因此可以将上述对象point当作另一个“点”的原型。
 * 可以给新对象定义它的x和y属性，但r和theta属性是继承的来的：
 */
var point2 = inherit(point);
point2.x = 2.0, point2.y = 2.0;
console.log(point2.r); // 可以使用继承的存取器属性
console.log(point2.theta);
// 这个对象产生严格自增的序列号
var serialnum = {
    // 这个数据属性包含下一个序列号
    // $符号暗示这个属性是一个私有属性
    $n: 0,

    // 返回当前值，然后自增
    get next(){
        return this.$n++;
    },

    // 给n设置新的值，但只有当它比当前值大时才设置成功
    set next(n){
        if (n>=this.$n) this.$n = n;
        else throw "序列号的值不能比当前值小";
    }
}
// 这个对象有一个返回随机数的存取器属性
var random = {
    get octet(){ return Math.floor(Math.random()*256); },
    get uint16(){ return Math.floor(Math.random()*65536); },
    get int16(){ return Math.floor(Math.random()*65536) - 32768; },
}


/**
 * 属性的特性
 * 除了包含名字和值之外，还包含一些标识它们可写、可枚举和可配置的特性。
 * 在ECMAScript3中无法设置这些特性，所有通过ECMAScript3的程序创建的属性都是可写、可枚举和可配置的，且无法对这些特性修改。
 * 下面时ECMAScript5中查询和设置这些属性特性的API。
 * - 通过这些API给原型对象添加方法，并将它们设置成不可枚举的，这让它们看起来像内置方法。
 * - 通过这些API给对象定义不能修改或删除的属性，借此“锁定”这个对象。
 * 
 * 数据属性：名字、4个特性（值（value）、可写性（writable）、可枚举型（enumerable）、可配置性（configurable））
 * 存取器属性：名字、4个特性（读取（get）、写入（set）、可枚举性、可配置性）
 * 
 * 为了实现属性特性的查询和设置操作，ECMAScript5定义了一个名为“属性描述符”（property descriptor）的对象。
 * 这个对象代表那4个特性，描述符对象的属性和它们所描述的属性特性是同名的。
 * - 数据属性的描述符对象的属性有：value、writable、enumerable、configurable
 * - 存取器属的描述符对象的属性有：get（代替value）、set（代替writable）、enumerable、configurable
 * （writable、enumerable、configurable都是布尔值，get和set是函数值）
 * 
 */

 /**
 * 获取属性的特性
 * Object.getOwnPropertyDescriptor() 获得某个对象特定属性的属性描述符
 */
// 返回 {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor({x:1}, "x")

// 查询上下文中定义的random对象的octet属性
// 返回 {get: /*func*/, set: undefined, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(random, "octet")

// 对于继承属性和不存在的属性，返回undefined
Object.getOwnPropertyDescriptor({}, "x")            // undefined 没有这个属性
Object.getOwnPropertyDescriptor({}, "toString")     // undefined 继承属性

/**
 * Object.getOwnPropertyDescriptor() 只能得到自有属性的描述符。要想获得继承属性的特性，需要遍历原型链。
 * 
 * Object.getPrototypeOf() 将对象作为参数传入，查询并返回它的原型。
 */

/**
 * 设置属性的特性
 * Object.defineProperty() 传入需要修改的对象、要创建或修改的属性的名称以及属性描述符对象
 * 
 * 传入Object.defineProperty()的属性描述符对象不必包含4个特性，对于新创建的属性来说，默认的特性值是false或undefined。
 * 对于修改的已有属性来说，默认的特性值没有做任何修改。注意，这个方法要么修改已有属性要么新建自有属性，但不能修改继承属性。
 */
var o = {}
// 添加一个不可枚举的数据属性x，并赋值为1
Object.defineProperty(o, "x", {value: 1, writable: true, enumerable: false, configurable: true});

// 属性是存在的，但不可枚举
o.x;                // 1
Object.keys(o)      // []

// 现在对属性x做修改，让它变为只读
Object.defineProperty(o, "x", {writable: false});

// 试图更改这个属性的值
o.x = 2;            // 操作失败但不报错，而在严格模式下抛出类型错误异常
o.x;                // 1

// 属性依旧是可配置的，因此可以通过这种方式对它进行修改
Object.defineProperty(o, "x", {value: 2});
o.x;                // 2

// 现在将x从数据属性修改为存取器属性
Object.defineProperty(o, "x", {get: function(){ return 0;}});
o.x;                // 0

/**
 * 同时修改或创建多个属性，则需要使用Object.defineProperties()。
 * 第一个参数是要修改的对象，第二个参数是一个映射表，它包含要新建或修改的属性的名称，以及它们的属性描述符。
 */
// 从空对象开始，然后给它添加两个数据属性和一个只读存取器属性。最终返回修改后的对象
var p = Object.defineProperties({}, {
    x: {value: 1, writable: true, enumerable: true, configurable: true},
    y: {value: 1, writable: true, enumerable: true, configurable: true},
    z: {
        get: function(){ return Math.sqrt(this.x*this.x+this.y*this.y); },
        enumerable: true,
        configurable: true
    }
});

/**
 * 对于不允许修改或创建的属性
 * 使用Object.defineProperty()和Object.defineProperties()方法对其操作（新建或修改）就会抛出类型错误异常。
 * 比如，给一个·不可扩展·的对象新增属性就会抛出类型错误异常。造成这些方法抛出类型错误异常的其他原因则和特性本身相关。
 * 可写性控制着对值特性的修改。可配置性控制着对其他特性（包括属性是否可以删除）的修改。如果属性是不可配置的，仍然可以将可写属性修改为不可写属性。
 * 
 * 下面是完整的规则，任何对Object.defineProperty()和Object.defineProperties()违反规则的使用都会抛出类型错误异常：
 * - 如果对象是不可扩展的，则可以编辑已有的自有属性，但不能添加新属性
 * - 如果属性是不可配置的，则不能修改它的可配置性和可枚举型
 * - 如果存取器属性是不可配置的，则不能修改其getter和setter方法，也不能将它转换为数据属性。
 * - 如果数据属性是不可配置的，则不能将它转换为存取器属性
 * - 如果数据属性是不可配置的，则不能将它的可写性从false写为true，但可以从true修改为false
 * - 如果数据属性是不可配置且不可写的，则不能修改它的值。然而可配置但不可写属性的值是可以修改的（实际上是先将它标记为可写的，然后修改它的值，最后转换成不可写）
 */

 /**
  * Object.getOwnPropertyNames() 获取对象所有的自有属性名
  * 
  * 给Object.prototype添加一个不可枚举的extend方法
  * 这个方法继承自调用它的对象，将作为参数传入的对象的属性一一复制
  * 除了值之外，也复制属性的所有特性，除非在目标对象中存在同名的属性
  * 参数对象的所有自有对象（包括不可枚举的属性）也会一一复制
  */
Object.defineProperty(
    Object.prototype, "extend",
    {
        writable: true,
        enumerable: false,
        configurable: true,
        value: function(o){ // 值就是这个函数
            // 得到所有的自有属性，包括不可枚举属性
            var names = Object.getOwnPropertyNames(o);
            // 遍历它们
            for (var i=0;i<names.length;i++){
                // 如果属性已经存在，则跳过
                if(names[i] in this) continue;
                // 获取o中的属性标识符
                var desc = Object.getOwnPropertyDescriptor(o, names[i]);
                // 用它给this创建一个属性
                Object.defineProperty(this, names[i], desc)
            }
        }
    }
)
Object.prototype.extend({x:1})
Object.prototype                  // {x: 1, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}
var o = {}
o.__proto__ == Object.prototype   // true
o.__proto__;                      // {x: 1, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}
o                                 // {}
"x" in o                          // true
o.propertyIsEnumerable("x")       // false
Object.getOwnPropertyDescriptor(o.__proto__, "x")                // {value: 1, writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(Object.prototype, "x")           // {value: 1, writable: true, enumerable: true, configurable: true}
o.extend({x:2})                   
o                                 // {}
o.extend({y:1})                   
o                                 // {y:1}


/**
 * getter和setter的老式API
 * 所有对象都有这些方法：
 * __lookupGetter__() 返回一个命名属性的getter方法
 * __lookupSetter__() 返回一个命名属性的setter方法
 * __defineGetter__() 定义getter方法，第一个参数是属性名称，第二个参数是getter方法
 * __defineSetter__() 定义setter方法，第一个参数是属性名称，第二个参数是setter方法
 */


 /**
  * 对象的三个属性：原型（prototype）、类（class）和可扩展属性（extensible attribute）
  * 
  */

/**
 * 原型属性
 * 
 * 对象的原型属性就是用来继承属性的，这个属性如此重要，以至于我们经常把“o的原型属性”直接叫为“o的原型”。
 * 
 * 原型属性是在实例对象创建之初就设置好的，通过对像直接量创建的对象使用Object.prototype作为它们的原型。
 * 通过new创建的对象使用构造函数的prototype属性值作为它们的原型。通过Object.create()创建的对象使用第一个参数（也可以是null）作为它们的原型。
 * 
 * 在ECMAScript5将对象作为参数传入Object.getPrototypeOf()可以查询它的原型。
 * 在ECMASCript3中没有与之等价的函数，但经常使用表达式o.constructor.prototype来检测一个对象的原型。
 * 通过new表达式创建的对象，通常继承一个constructor属性，这个属性指代创建这个对象的构造函数。（不可靠）
 * 通过Object.create()或对象直接量创建的对象包含一个名为constructor的属性，这个属性指代Object()构造函数。
 * 因此，constructor.prototype才是对象直接量的真正原型，但对于通过Object.create()创建的对象则往往不是这样。
 * 
 * isPrototypeOf() 检测一个对象是否是另一个对象的原型（或处于原型链中）
 * isPrototypeOf()方法实现的功能和instanceof运算符非常类似
 */
var p = {x:1};                // 定义一个原型对象
var o = Object.create(p);     // 使用这个原型创建一个对象
p.isPrototyppeOf(o);          // true  o继承p
Object.prototype.isPrototypeOf(o)      // true  p继承自Object.prototype

/**
 * Mozilla实现的JavaScript（包括早年的Netscape）对外暴露了一个专门命名为__proto__的属性，用以直接查询/设置对象的原型。
 * 但不推荐使用__proto__，因为尽管Safari和Chrome的当前版本都支持它，但IE和Opera还未实现它（可能以后也不会实现）。
 * 实现了ECMAScript5的Firefox版本依然支持__proto__，但对修改不可扩展对象的原型做了限制。
 */


 /**
  * 类属性
  * 
  * 对象的类属性（class attribute）是一个字符串，用以表示对象的类型信息。
  * ECMASCript3和ECMAScript5都未提供设置这个属性的方法，并只有一种间接的方法可以查询它。
  * 默认的toString()方法（继承自Object.prototype）返回了如下这种格式的字符串：
  *     [object class]
  * 
  * 因此，要想获得对象的类，可以调用对象的toString()方法，然后提取已返回的字符串的第8个到倒数第二个位置之间的字符。
  * 但是，很多对象继承的toString()方法重写了，为了能调用正确的toString()版本，必须间接地调用Function.call()方法。
  */
 // classof()函数返回传递给它地任意对象的类
function classof(o){
    if (o === null) return "Null"
    if (o === undefined) return "Undefined"
    return Object.prototype.toString.call(o).slice(8, -1);
}
// classof函数可以传入任何类型的参数。
classof(null);            // "Null"
classof(1);               // "Number"
classof("");              // "String"
classof(false);           // "Boolean"
classof({});              // "Object"
classof([]);              // "Array"
classof(/./);             // "Regexp"
classof(new Date());      // "Date"
classof(window);          // "Window"  (浏览器的宿主对象)
function f(){} 
classof(new f());         // "Object"


/**
 * 可扩展性
 * 
 * 对象的可扩展性用以表示是否可以给对象添加新属性。所有内置对象和自定义对象都是显式可扩展的，宿主对象的可扩展性是由JavaScript引擎定义的。
 * 在ECMAScript5中，所有的内置对象和自定义对象都是可扩展的，除非将它们转换为不可扩展的，同样，宿主对象的可扩展性也是由实现ECMAScript5的JavaScript引擎定义的。
 * 
 * Object.isExtensible()
 * Object.preventExtensions()
 * ECMAScript5定义了用来查询和设置对象可扩展性的函数。通过将对象传入Object.isExtensible()，来判断该对象是否是可扩展的。
 * 如果想将对象转换为不可扩展的，需要调用Object.preventExtensions()，将待转换的对象作为参数传进去。
 * 注意，一旦将对象转换为不可扩展的，就无法再将其转换回可扩展的了。
 * 同样需要注意的是，Object.preventExtensions()只影响到对象本身的可扩展性。如果给一个不可扩展的对象的原型添加属性，这个不可扩展的对象同样会继承这些属性。
 * 
 * 可扩展属性的目的是将对象“锁定”，以避免外界的干扰。对象的可扩展性通常和属性的可配置性与可写性配合使用，ECMAScript5定义了一些函数可以更方便地设置多种属性。
 * 
 * Object.isSealed()
 * Object.seal()
 * Object.seal()和Object.preventExtensions()类似，除了能够将对象设置为不可扩展的，还可以将对象的所有自有属性都设置为不可配置的。
 * 也就是说，不能给这个对象添加新属性，而且它已有的属性也不能删除或配置，不过它已有的可写属性依然可以设置。
 * 对于那些已经封闭（sealed）起来的对象是不能解封的。可以使用Object.isSealed()来检测对象是否封闭。
 * 
 * Object.isFrozen()
 * Object.freeze()
 * Object.freeze()将更严格地锁定对象——“冻结”（frozen）。
 * 除了将对象设置为不可扩展的和将其属性设置为不可配置的之外，还可以将它自有的所有数据属性设置为只读
 * （如果对象的存取器属性具有setter方法，存取器属性将不受影响，仍可以通过给属性赋值调用它们）
 * 使用Object.isFrozen()来检测对象是否冻结。
 */
// Object.preventExtensible()、Object.seal()、Object.freeze()都返回传入的对象
// 通过函数嵌套的方式调用
var o = Object.seal(
    Object.create(
        Object.freeze({x:1}),
        {y: {value: 2, writable: true}}
    )
);
Object.getOwnPropertyDescriptor(o, "y")     // {value: 2, writable: true, enumerable: false, configurable: false}



/**
 * 序列化对象
 * 
 * 对象序列化（serialization）是指将对象的状态转换为字符串，也可将字符串还原为对象。
 * ECMAScript5提供了内置函数JSON.stringify()和JSON.parse()用来序列化和还原JavaScript对象。
 * 
 * 这些方法都使用JSON作为数据交换格式，JSON全称是“JavaScript Object Notation”——JavaScript对象表示法。
 * 它的语法和JavaScript对象与数组直接量的语法非常相近。
 */
o = {x: 1, y: {z: [false, null, ""]}};
s = JSON.stringify(o);                     // '{"x":1,"y":{"z":[false,null,""]}}'
p = JSON.parse(s);                         // p 是 o 的深拷贝
/**
 * ECMAScript5中这些函数的本地实现和 “http://json.org/json2.js” 中的公共域ECMAScript3版本的实现非常类似，或者说完全一样。
 * 因此，可以通过引入 json2.js 模块在ECMAScript3的环境中使用ECMAScript5中的这些函数。
 * 
 * JSON语法是JavaScript语法的子集。它并不能表示JavaScript里的所有值。
 * 支持对象、数组、字符串、无穷大数字、true、false和null，并且它们可以序列化和还原。NaN、Infinity、-Infinity序列化的结果是null。
 * 日期对象序列化的结果是ISO格式的日期字符串（参照`Date.toJSON()`函数），但`JSON.parse()`依然保留它们的字符串形态，而不会将它们还原为原始日期对象。
 * 函数、RegExp、Error对象和undefined值不能序列化和还原。
 * JSON.stringify()只能序列化对象可枚举的自有属性。对于一个不能序列化的属性来说，在序列化后的输出字符串中会将这个属性省略掉。
 * JSON.stringify()和JSON.parse()都可以接收第二个可选参数，通过传入需要序列化或还原的属性列表来定制自定义的序列化或还原操作。
 */
 


 /**
  * 对象方法
  * 
  * `toString()`  返回一个表示调用这个方法的对象值的字符串。在需要将对象转换为字符串的时候，JavaScript都会调用这个方法。
  *     比如：“+”运算符连接字符串和对象时，在希望使用字符串的方法中使用了对象时，都会调用`toString()`方法
  * `toLocaleString()`  返回一个表示这个对象的本地化字符串。Object中默认的toLocaleString()方法并不做任何本地化自身的操作，它仅仅调用toString()方法并返回对应值。
  *     Date和Number类对它做了定制，可以用它对数字、日期和时间做本地化的转换。
  *     Array类的toLocaleString()和toString()方法很像，唯一的不同是每个数组元素会调用toLocaleString()方法转换为字符串，而不是调用各自的toString()方法
  * `toJSON()`  Object.prototype 实际上没有定义toJSON()方法，但对于需要执行序列化的对象来说，JSON.stringify()方法会调用toJSON()方法。
  *     如果在待序列化的对象中存在这个方法，则调用它，返回值即是序列化的结果，而不是原始对象。比如，Date.toJSON()。
  * `valueOf()`  类似toString()，但对于需要执行序列化的对象来说，JSON.stringify()方法会调用toJSON()方法。
  *     如果在待序列化的对象中存在这个方法，则调用它，返回值即是序列化的结果，而不是原始对象。比如，Date.toJSON()。
  */
var s = {x:1, y:1}.toString()        // "[object Object]"
var s = {x:1, y:1}.toLocaleString()  // "[object Object]"
var d = new Date().toJSON();         // "2019-09-20T04:57:58.927Z"
var d = new Date().valueOf();         // "2019-09-20T04:57:58.927Z"

        
