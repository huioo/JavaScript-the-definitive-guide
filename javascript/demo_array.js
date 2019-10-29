/**
 * 数组
 * 
 * 值的有序集合。每个值叫做一个元素，每个元素在数组中有一个位置，以数字表示，称为“索引”。
 * JavaScript数组是无类型的：数组元素可以是任意类型，并且同一个数组中的不同元素也可能有不同的类型。
 * 这允许创建复杂的数据结构，如对象的数组和数组的数组。
 * 
 * JavaScript数组的索引是基于0的32位数值。第一个元素的索引是0，最大可能的索引为 4 294 967 294（2**32-2），数组最大容纳4 294 967 295个元素
 * 数组是动态的，根据需要它们会增长或缩减，并且在创建数组时无须声明一个固定的大小或者在数组大小变化时无须重新分配空间。
 * JavaScript数组可能是稀疏的，数组元素的索引不一定要连续的，它们之间可以有空缺。
 * 每个JavaScript数组都有一个length属性。针对非稀疏数组，该属性就是数组元素的个数。针对稀疏数组，length比所有元素的索引要大。
 * 
 * JavaScript数组是JavaScript对象的特殊形式，数组索引实际上和碰巧是整数的属性名差不多。
 * 通常，数组的实现是经过优化的，用数字索引来访问数组元素一般来说比访问常规的对象属性要快得多。
 * 
 * 数组继承自Array.prototype中的属性，它定义了一套丰富的数组操作方法。
 * 
 */

/**
 * 创建
 */
// 数组直接量
var empty = [];
var primes = [2, 3, 5, 7, 11];     // 5个素数的数组
var misc = [1.1, true, "a", ];     // 3个不同类型的元素和结尾的逗号
// 值不一定时常量，可以是表达式
var base = 1024;
var table = [base, base+1, base+2, base+3];
// 混合
var b = [[1, {x:1, y:2}], [2, {x:3, y:4}]];
// 省略数组直接量中的某个值，省略的元素将被赋予undefined值
var count = [1,,3];               // 3个元素，第2个元素值为undefined
// 允许可选的结尾的逗号，故下面只有2个元素
var undefs = [,,];                // 2个元素，都为undefined

// Array()构造函数
var a = new Array();              // 空数组，等于[]
// 创建指定长度的数组
var a = new Array(10);            // 10个元素的空数组。调用时含有一个数值参数，它指定长度。
// 显式指定2个或多个数组元素或者数组的一个非数值元素
var a = new Array(5,4,3,2,1);     // [5, 4, 3, 2, 1]
var a = new Array(5,4,'a','b');   // [5, 4, "a", "b"]
var a = new Array("5,4,3,2,1");   // ["5, 4, 3, 2, 1"]
var a = new Array("5");           // ["5"]


/**
 * 读写
 * 
 * 使用 [] 操作符来访问数组中的一个元素。数组的引用位于方括号的左边。方括号中是一个返回非负整数值的任意表达式。
 * 使用该语法既可以读又可以写数组中的一个元素。
 */
var a = ["world"];
var value = a[0];                // value值为"world"
a[1] = 3.14;                     // a值为["world", 3.14]
i = 2;
a[i] = 3;                        // a值为["world", 3.14, 3]
a[i+1] = "hello";                // a值为["world", 3.14, 3, "hello"]
a[a[i]] = a[0]                   // a值为["world", 3.14, 3, "world"]

/**
 * 数组是对象的特殊形式。
 * 使用方括号访问数组元素就像使用方括号访问对象的属性一样。
 * JavaScript将指定的数字索引值转换成字符串——索引值1变成“1”——然后将其作为属性名来使用。(for/in循环遍历时，返回的索引值为字符串类型)
 */
// 关于索引值从数字转换为字符串没什么特别之处，对常规对象也可以这么做：
var o = {};
o[1] = "one";                    // {1: "one"}
/**
 * 数组的特别之处在于，当使用小于2**32的非负整数作为属性名时数组会自动维护其length属性值。
 * 如上，创建仅有一个元素的数组，然后再索引1、2和3处分别进行赋值。length属性值变为4。
 */
a.length;                        // 4
/**
 * 区分数组的索引和对象的属性名
 * 
 * 所有的索引都是属性名，但只在0~2**32-2之间的整数属性名才是索引。
 * 所有的数组都是对象，可以为其创建任意名字的属性。但如果使用的属性是数组的索引，数组的特殊行为就是将根据需要更新它们的length属性值。
 * 
 * 
 */
a;                               // ["world", 3.14, 3, "world"]
// 负数或非整数作为索引；数值转换为字符串，字符串作为属性名来使用；
a[-1.23] = true;                 // 名字不是能作为索引的非负整数，只能当作常规的对象属性（创建名为“-1.23”的属性）["world", 3.14, 3, "world", -1.23: true]
a[1.000];                        // 和a[1]相等，3.14
// 非负整数字符串作为索引；
a["1000"] = 0;                   // 名字可转换为作为索引的非负整数，就能当作数组索引（给数组的第1001个元素赋值）
a.length;                        // 1001
a;                               // ["world", 3.14, 3, "world", empty × 996, 0, -1.23: true]
/**
 * 事实上数组索引仅仅是对象属性名的一种特殊类型，这意味着JavaScript数组没有“越界”错误的概念。
 * 当试图查询任何对象中不存在的属性时，不会报错，只会得到undefined值。类似于对象，对于对象同样存在这种情况。
 * 
 * 数组是对象，它们可以从原型中继承元素。
 * ECMAScript5中，数组可以定义元素的getter和setter方法。
 * 如果一个数组确定继承了元素或使用了元素的getter和setter方法，你应该期望它使用非优化的代码路径：访问这种数组的元素的时间会与常规对象属性的查找时间相近。
 */



/**
 * 稀疏数组
 * 
 * 包含从0开始的不连续索引的数组。通常，数组的length属性值代表数组中元素的个数。如果数组是稀疏的，length属性值是大于元素的个数。
 */
// 可以用Array()构造函数或简单地指定数组的索引值大于当前的数组长度来创建稀疏数组
a = new Array(5);                // 数组没有元素，length=5
a = [];                          // 空数组，length=0
a[1000] = 0;                     // 赋值添加一个元素，length=1001
// 使用delete创建稀疏数组

/**
 * 足够稀疏的数组通常在实现上比稠密的数组更慢、内存利用率更高。查找元素的时间与常规对象属性的查找时间一样长。
 * 
 * 当在数组直接量中省略值时，不会创建稀疏数组。省略的元素在数组中是存在的，其值为undefinde。
 */
var a1 = [,,,];                  // 空数组
var a2 = new Array(3);           // 空数组
0 in a1;                         // false
0 in a2;                         // false
a1.length;                       // 3
a2.length;                       // 3

var a1 = [,];                    // 空数组
var a2 = [undefined];            // [undefined]
0 in a1;                         // false
0 in a2;                         // true
a1.length;                       // 1
a2.length;                       // 1



/**
 * 数组长度
 * 
 * 每个数组有length属性，就是这个属性使其区别于常规的JavaScript对象。
 * 针对稠密数组，length属性值代表数组中元素的个数。其值比数组中最大的索引大。
 */
[].length;                       // 0
['a', 'b', 'c'].length;          // 3，最大索引2
/**
 * 数组长度保证大于每一个元素的索引值。或者说，在数组中（无论稀疏与否）肯定找不到一个元素的索引值大于或等于它的长度。
 * 为了维持此规则不变，数组有两个特殊的行为：
 * - 如果为一个数组元素赋值，它的索引i大于或等于现有数组的长度时，length属性的值将设置为i+1。
 * - 设置length属性的值小于当前长度的非负整数n时，当前数组中那些索引值大于或等于n的元素都会被删除。
 */
a = [1,2,3,4,5];
a[9] = 11;                       // 
a;                               // [1, 2, 3, 4, 5, empty × 4, 11]
a.length;                        // 10
a.length = 3;                    // a的值为[1, 2, 3]
a.length = 0;                    // a的值为[]
a.length = 5;                    // a的值为[empty × 5]
a.length;                        // 5
// 设置length属性的值大于其当前长度，会在数组尾部创建一个空的区域，并不会添加新的元素
a.length = 10;                   // a的值为[empty × 10]
a.length;                        // 10
/**
 * 使用Object.defineProperty()方法让数组的length属性变为只读
 */
a = [1,2,3];
Object.getOwnPropertyDescriptor(a, 'length');           // {value: 5, writable: true, enumerable: false, configurable: false}
Object.defineProperty(a, 'length', 
                        {writable: false});             // 让length属性只读，{value: 5, writable: false, enumerable: false, configurable: false}
a.length = 0;                                           // 不会改变



/**
 * 增删
 * 
 * `.push()`方法 传入一个或多个参数，在数组末尾添加一个或多个元素
 * `.pop()`方法  删除数组末尾的一个元素，使数组长度“-1”，将元素作为方法的返回值
 * `delete` 删除指定元素（不影响数组长度，变成稀疏数组），类似于将元素值修改为undefined
 */
a = [];
a[0] = 'zero';
a[1] = 'one';
// 使用push()方法在数组末尾添加一个或多个元素
a.push('two');                       // ["zero", "one", "two"]
a.push('three', 'four', 'five');     // ["zero", "one", "two", "three", "four", "five"]
a[a.length] = 'six';                 // 等同于a.push("six")，["zero", "one", "two", "three", "four", "five", "six"]
// 删除元素
a = [1,2,3];
delete a[1];
1 in a;                              // false
a.length;                            // 3，delete不影响数组长度
a;                                   // [1,,3]
Object.getOwnPropertyDescriptor(a, 1)// undefined



/**
 * 遍历
 * 
 * for循环
 */
var keys = [1,2,3,,5,null,undefined];
var o = Object.defineProperty(Object.prototype, 'z', {value:1, writable: true, enumerable: true, configurable: true})   
o;                                                 // {z: 1, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}
o == Object.prototype;                             // true

Object.getPrototypeOf(keys);                       // [constructor: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]
Object.getPrototypeOf(Object.getPrototypeOf(keys));// {z: 1, constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, …}
Object.getPrototypeOf(Object.getPrototypeOf(keys)) == Object.prototype; // true

var values = [];
for (var i=0;i<keys.length;i++) {
    var key = keys[i];
    values.push(key);
}
values;                                            // [1, 2, 3, undefined, 5, null, undefined]
/**
 * 在嵌套循环或其他性能非常重要的上下文中，可以看到这种基本的数组遍历需要优化。
 * 数组的长度应该只查询一次而非每次循环都要查询：
 */
var values = [];
for (var i=0, len=keys.length; i<len; i++){ 
    var key = keys[i];
    values.push(key);
}
values;                                            // [1, 2, 3, undefined, 5, null, undefined]
/**
 * 这些例子假设数组时稠密的，并且所有元素都是合法的。否则，使用之前应该先检测它们。
 */
var values = [];
for (var i=0, len=keys.length; i<len; i++){
    // 排除null、undefined、不存在的元素
    if (!keys[i]) continue;
    var key = keys[i];
    values.push(key);
}
values;                                            // [1, 2, 3, 5]

var values = [];
for (var i=0, len=keys.length; i<len; i++){
    // 排除undefined、不存在的元素
    if (keys[i]===undefined) continue;
    var key = keys[i];
    values.push(key);
}
values;                                            // [1, 2, 3, 5, null]

var values = [];
for (var i=0, len=keys.length; i<len; i++){
    // 只排除不存在的元素
    if (!(i in keys)) continue;
    var key = keys[i];
    values.push(key);
}
values;                                            // [1, 2, 3, 5, null, undefined]
/**
 * for/in循环 处理稀疏数组。循环每次将一个可枚举的属性名（包括数组索引）赋值给循环变量，不存在的索引将不会遍历到。
 */
var values = [];
for (var i in keys){
    // 除了遍历该对象的可枚举属性名之外，还会遍历该对象原型链上可枚举的属性名
    var key = keys[i];
    values.push(key); 
}
values;                                            // [1, 2, 3, 5, null, undefined, 1] 最后的整数1为Object.prototype中属性z的值，且忽略不存在的属性
/**
 * for/in循环 能够枚举继承的属性名，如添加到Array.prototype中的方法。
 * 由于这个原因，在数组上不应该使用for/in循环，除非额外检测并过滤。见下面2种方法：
 */
var values = [];
for (var i in keys){
    console.log(typeof i);         // string，变量i的值为字符串类型
    // 跳过非自有属性
    if (!keys.hasOwnProperty(i)) continue;
    var key = keys[i];
    values.push(key); 
}
values;                                            // [1, 2, 3, 5, null, undefined] 忽略不存在的属性

var values = [];
for (var i in keys){
    // 跳过不是非负整数的i
    if (String(Math.floor(Math.abs(Number(i)))) !== i) continue;
    var key = keys[i];
    values.push(key); 
}
values;                                            // [1, 2, 3, 5, null, undefined] 忽略不存在的属性

/**
 * 遍历顺序
 * ECMAScript规范允许for/in循环以不同的顺序遍历对象的属性。通常数组元素的遍历实现时升序的，但不能保证一定是这样的。
 * 特别地，如果数组同时拥有对象属性和数组元素，返回的属性名很可能时按照创建的顺序而非数值的大小顺序。
 * 如何处理这个问题的实现各不相同，如果算法依赖于遍历的顺序，那么最好不要使用for/in而用常规的for循环。
 * 
 * ECMAScript 5定义了一些遍历数组元素的新方法，按照索引的顺序按个传递给定义的一个函数。这些方法种最常用的就是forEach()方法。
 * ForEach()方法和相关的遍历方法使得数组拥有简单而强大的函数式编程风格。
 */
var data = [1,2,3,4,5];
var sumOfSquares = 0;
data.forEach(function(x){          // 把每个元素传递给此函数
    sumOfSquares += x**2           // 平方相加
})
sumOfSquares;                      // 55

var values = [];
keys.forEach(function(x){
    // 跳过不存在的元素
    values.push(x);
})
values;                            // [1, 2, 3, 5, null, undefined] 忽略不存在的属性和非自有的属性



/**
 * 多维数组
 * 
 * JavaScript不支持真正的多维数组，但可以用数组的数组来近似。访问数组的数组种的元素，只要简单地使用两次[]操作符即可。
 * 例如，假设变量matrix是一个数组地数组，它地基本元素是数值，那么matrix[x]的每个元素是包含一个数值数组，访问数组的中特定数值的代码为matrix[x][y]。
 */

var table = new Array(10);
for (var i=0;i<table.length;i++) {
    table[i] = new Array(10);      // table 10行*10列
}
// 初始化2维数组
for (var row=0;row<table.length;row++){
    for (var col=0;col < table[row].length; col++){
        table[row][col] = row*col;
    }
}
// 使用多维数组计算（查询）5*7
var product = table[5][7];         // 35



/**
 * 数组方法
 * 
 * ECMAScript3在Array.prototype中定义了一些很有用的操作数组的函数，这意味着这些函数作为任何数组的方法都是可用的。
 * ECMAScript5中新增了一些新的数组遍历方法。
 */

 /**
  * Array.join()    将数组中所有元素都转化为字符串b并连接在一起，返回最后生成的字符串。
  *     指定一个可选的字符串在生成的字符串中来分隔数组的各个元素。如果不指定，默认使用逗号。
  *     Array.join()方法是String.split()方法的逆向操作，后者是将字符串分割成若干块来创建一个数组。
  */
var a = [1, 2, 3];
a.join();                      // "1,2,3"
a.join(" ");                   // "1 2 3"
a.join("");                    // "123"
var b = new Array(10);         // 长度为10的空数组
b.join("-");                   // "---------" 9个连字符组成的字符串

/**
 * Array.reverse()  将数组中的元素颠倒顺序，返回逆序的数组。不创建新的数组，在原先的数组中重新排列。
 */
var a = [1, 2, 3];
a.reverse().join();            // "3,2,1"

/**
 * Array.sort()     将数组中的元素排序并返回排序后的数组。
 *     当不带参数调用时，数组元素以字母表顺序排列（如有必要将临时转化为字符串比较）
 */
var a = new Array("banana", "cherry", "apple");
a.sort();
var s = a.join(", ");          // "apple, banana, cherry"

var a = new Array("banana", "cherry", "apple", undefined);
a.sort();                      // 数组包含undefined元素，它们会被排到数组的尾部
var s = a.join(", ");          // "apple, banana, cherry, "

// 为了按照其它方式而非字母表顺序进行排序，必须给sort()方法传递一个比较函数。
// 该函数决定了它得两个参数在排好序的数组中的先后顺序。假设第一个参数在前，比较函数应该返回一个小于0的数值。
// 反之，第一个参数应该在后，函数应该返回一个大于0的数值。并且，假设两个值相等，函数应该返回0。
// 例如，使用数值大小而非字母表顺序进行排序。
var a = [33, 4, 1111, 222];
a.sort();                     // [1111, 222, 33, 4]
a.sort(function(a, b){
    return a-b;
});                           // [4, 33, 222, 1111]
a.sort(function(a, b){
    return b-a;
});                           // [1111, 222, 33, 4]
// 不区分字母大小写，进行排序
a = ['ant', 'Bug', 'cat', 'Dog'];
a.sort();                     // ["Bug", "Dog", "ant", "cat"]
a.sort(function(s,t){
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if (a>b) return 1;
    if (a<b) return -1;
    return 0;
});                          // ["ant", "Bug", "cat", "Dog"]

/**
 * Array.concat()  创建并返回一个新数组。元素包括调用concat()的原始数组的元素和concat()的每个参数。
 *     如果这些参数本身是数组，则连接的是数组的元素，而非数组本身。
 *     该方法不会递归扁平化数组的数组。也不会修改调用的数组。
 */
var a = [1,2,3];
a.concat(4, 5);             // [1, 2, 3, 4, 5]
a.concat([4, 5]);           // [1, 2, 3, 4, 5]
a.concat([4, 5], [6, 7]);           // [1, 2, 3, 4, 5, 6, 7]
a.concat(4, [5, [6, 7]]);           // [1, 2, 3, 4, 5, 6, 7]
a;                          // [1, 2, 3]
// 递归扁平化数组
var arr = [[1,2,3],4,5,6,[[7]],[]]  //多维数组
//将需要转化的数组，以及最后需要返回的数组进行传参
function flatten(array,result = []){ 
    //循环数组中的每一项，如果这一项是数组，则再次调用这个函数，
    //否则直接将这项push到结果中，并且return出来
    for(var i of array){  
        if(Array.isArray(i)){
            flatten(i,result)
        }else{
            result.push(i)
        }
    }
    return result;
}
flatten(arr);             // [1, 2, 3, 4, 5, 6, 7]

/**
 * Array.slice()  返回指定数组的一个片段或子数组。2个参数分别指定了片段的开始和结束位置。
 *     返回的数组包含第一个参数指定的位置到第二个参数指定的位置的所有数组元素，包含第一个参数指定位置的元素，但不包含第二个参数指定位置的元素。
 *     如果只有一个参数，返回的数组包含从开始位置到最后的所有数组元素。
 */
var a = [1,2,3,4,5];
a.slice(0, 3);                // [1,2,3]
a.slice(3);                   // [4,5]
a.slice(1, -1);               // [2,3,4]
a.slice(-3, -2);              // [3]

/**
 * Array.splice() 在数组中插入或删除元素的通用方法。不同于slice()和concat()会修改调用的数组。
 *     能从数组中删除元素、插入元素到数组中或同时完成这两种操作。
 *     在插入或删除点之后的数组元素会根据需要增加或减少它们的索引值，因此数组的其余部分仍保持连续。
 *     splice()的第一个参数指定插入和（或）删除的起始位置。第二个参数指定了应该从元素中删除的元素个数。
 *     如果省略第二个参数，从起点开始到数组结尾的所有元素将被删除。
 *     splice()返回一个由删除元素组成的数组，或者如果没有删除元素，就返回一个空数组。
 *     splice()的前两个参数指定需要删除的元素。紧随其后的任意个数的参数制定了需要插入到数组中的元素，从第一个参数指定的位置开始插入。
 */
var a = [1,2,3,4,5,6,7,8];
a.splice(4);                  // [5,6,7,8]; a 是 [1,2,3,4]
a.splice(1, 2);               // [2,3]; a 是 [1,4]
a.splice(1, 1);               // [4]; a 是 [1]

var a = [1,2,3,4,5];
a.splice(2,0,'a','b');        // []; a 是 [1, 2, "a", "b", 3, 4, 5]
a.splice(2,2,[1,2], 3);       // ["a", "b"]; a 是 [1, 2, [1,2], 3, 3, 4, 5]

/**
 * Array.push()  数组尾部添加一个或多个元素，并返回数组的长度
 * Array.pop()   删除数组的最后一个元素，减小数组长度并返回它删除的值
 *     这两个方法允许将数组当作栈来使用。
 *     这两个方法都修改并替换原始数组而非生成一个修改版的新数组。
 */
var stack = [];
stack.push(1,2);             // stack: [1, 2]; return 2
stack.pop();                 // stack: [1]; return 2
stack.push(3);               // stack: [1, 3]; return 2
stack.pop();                 // stack: [1]; return 3
stack.push([4,5]);           // stack: [1, [4,5]]; return 2
stack.pop();                 // stack: [1]; return [4,5]
stack.pop();                 // stack: []; return 1

/**
 * Array.unshift()  数组头部添加一个或多个元素，并将已存在的元素移动到更高索引的位置来获得足够的空间，返回数组新的长度
 * Array.shift()    删除数组头部的第一个元素，并将其返回，然后将所有随后的元素下移一个位置来填补数组头部空缺。
 */
var a = [];
a.unshift(1);                // a:[1]; return 1
a.unshift(22);               // a:[22,1]; return 2
a.shift();                   // a:[1]; return 22
// 使用多个参数调用unshift()时，参数是一次性插入的（就像splice()方法）而非一次一个地插入。
// 这意味着最终的数组中插入的元素的顺序和它们在参数列表中的顺序一致。如果一个一个插入，它们的顺序应该是反过来的。
a.unshift(3, [4,5]);         // a:[3, [4,5], 1]; return 3
a.shift();                   // a:[[4,5], 1]; return 3
a.shift();                   // a:[1]; return [4,5]
a.shift();                   // a:[]; return 1

/**
 * Array.toString()        该方法将其每个元素转化为字符串并输出用逗号分隔的字符串列表。输出不包括方括号和其他任何形式的包裹数组值得分隔符。
 * Array.toLocalString()   
 */
[1,2,3].toString();          // "1,2,3"
["a", "b", "c"].toString();  // "a,b,c"
[1, [2, 'c']].toString();    // "1,2,c"



/**
 * ECMAScript 5 中的数组方法
 * 
 * 9个新的数组方法来遍历、映射、过滤、检测、简化和搜索数组。
 * 
 * 大多数方法的第一个参数接收一个函数，并且对数组的每一个元素（或一些元素）调用一次该函数。如果是稀疏数组，对不存在的元素不调用传递的函数。
 * 在大多数情况下，调用提供的函数使用3个参数：数组元素、元素的索引和数组本身。通常，只需要第一个参数值，可以忽略后两个参数。
 * 
 * 大多数ECMAScript 5数组方法的第一个参数是一个函数，第二个参数是可选的。如果有第二个参数，则调用的函数被看作是第二个参数的方法。
 * 也就是说，在调用函数时传递进去的第二个参数作为它的this关键字的值来使用。被调用的函数的返回值非常重要，但是不同的方法处理返回值的方式不一样。
 * 
 * 这些方法都不会修改它们调用的原始数组。当然，传递给这些方法的函数是可以修改这些数组的。
 */

/**
  * Array.forEach()  遍历数组，为每个元素调用指定的函数。
  */
var data = [1,2,3,4,5];
var sum = 0;
data.forEach(function(val, idx, ay){
    sum += val;
});
sum;                                    // 15；求和
data.forEach(function(v, i, a){
    a[i] = v+1;
});
data;                                   // [2, 3, 4, 5, 6]；数组元素的值加1
/**
 * 注意，在所有元素都传递给调用的函数之前，Array.forEach()无法终止遍历。也就是说，没有像for循环中使用的相应的break语句。
 * 如果要提前终止，必须把forEach()方法放在一个try块中，并能抛出一个异常。
 * 如果forEach()方法调用的函数抛出foreach.break异常，循环会提前终止。
 */
function foreach(a, f, t){
    try{
        a.forEach(f, t)
    }
    catch(e){
        if (e === foreach.break) return;
        else throw e;
    }
}
foreach.break = new Error("StopIteration");

/**
 * Array.map()   将调用的数组的每个元素传递给指定的函数，并返回一个数组，它包含该函数的返回值。
 *     传递给map()方法的函数的调用方式和传递给forEach()的函数的调用方式一致。但map()中的函数应该有返回值。
 *     map()方法返回的是新数组，它不修改调用的数组。如果是稀疏数组，返回的也是相同方式的稀疏数组，同样的长度，同样的缺失元素。
 */
a = [1,2,3];
b = a.map(function(v,i,a){ return v*v; });      // [1,4,9]

/**
 * Array.filter()  返回的数组元素是调用的数组的一个子集。传递的函数是用来逻辑判断的，该函数返回true或false。
 *     调用判定函数就像调用forEach()和map()一样。如果返回值为true或能转化为true的值，那么传递给判定函数的元素就是子集的成员。
 */
a = [5,4,3,2,1];
smallvalues = a.filter(function(v,i,a){ return v<3; });   // [2,1]
everyother = a.filter(function(v,i,a){ return i%2 == 0; }); // [5,3,1]
/**
 * 注意，Array.filter()方法会跳过稀疏数组中缺少的元素，它的返回数组总是稠密的。
 */
var sparse = [0,1,,null,,5,6, undefined];
var dense = sparse.filter(function(v,i,a){ return true; });  // [0, 1, null, 5, 6, undefined]；压缩稀疏数组的空缺
a = sparse.filter(function(v,i,a){ return v !== undefined && v!= null; }); // [0, 1, 5, 6]；压缩空缺并删除undefined和null元素

/**
 * Array.every()  类似于数学中针对所有的全称量词（任意符号“∀”），当且仅当针对数组中所有元素调用判定函数都返回true时，它才返回true。
 * Array.some()   类似于数学中的存在量词（存在符号“∃”），当数组中至少有一个元素调用判定函数返回true时，它就返回true。
 *     两者是数组的逻辑判定，它们对数组元素应用指定的函数进行判定，返回true或false。
 * 
 * 注意，一旦every()和some()确认该返回什么值它们就会立即停止遍历元素。some()在判定函数第一次返回true后就返回true，但如果判定函数
 * 一直返回false，它将会遍历整个数组。every()恰好相反，它在判定函数第一次返回false后就返回false，但如果判定函数一直返回true，它将
 * 遍历整个数组。
 * 注意，根据数学上的惯例，在空数组上调用时，every()返回true，some()返回false。
 */
a = [1,2,3,4,5];
a.every(function(v,i,a){ return v<10; });      // true；所有值<10
a.every(function(v,i,a){ return v%2 === 0; });   // false；不是所有值都是偶数

a.some(function(v,i,a){ return v%2 === 0; });    // true；a还有偶数
a.some(isNaN);                                 // false；a不含有非数值元素

/**
 * Array.reduce()    2个参数，第一个是执行化简操作的函数。化简函数的任务就是用某种方法把两个值组合或化简为一个值，并返回化简后的值。
 *     第二个参数（可选）是一个传递给函数的初始值。
 *     与forEach()和map()使用的函数不同的是，传递给reduce()方法的操作函数（第一个参数）的形参。数组元素、元素的索引和数组本身作为
 *       第2~4个参数传递给函数
 *     第一个参数是到目前为止的化简操作累积的结果。第一次调用时，第一个参数是一个初始值，它就是传递给reduce()方法的第二个参数。
 *       在接下来的调用中，就是上一次化简函数的返回值。当不指定初始值调用reduce()时，它将使用数组的第一个元素作为初始值，即第一次
 *       调用使用数组的前2个元素作为参数。
 *     在空数组上，不带初始值参数调用reduce()将导致类型错误异常。如果调用它的时候只有一个值（数组只有一个元素并且没指定初始值或空数组
 *       且指定一个初始值），reduce()只简单地返回那个值而不会调用化简函数。
 * Array.reduceRight()
 *     工作原理和reduce()一样，不同地是它按照数组索引从高到低（从右到左）处理数组，而不是从低到高。
 * 
 * 使用指定的函数将数组元素进行组合，生成单个值。
 */
a = [1,2,3,4,5];
var sum = a.reduce(function(x,y){ return x+y; });    // 15；数组求和

var product = a.reduce(function(x,y){ return x*y; });// 120；数组求积
product = a.reduce(function(x,y){ return x*y; }, 0);// 0；数组求积

var max = a.reduce(function(x,y){ return (x>y)?x:y; });// 5；求最大值
max = a.reduce(function(x,y){ return (x>y)?x:y; }, 100);// 100；求最大值

a = [2,3,4];
var big = a.reduceRight(function(accumulator, value){
    return Math.pow(value, accumulator);
});                                                // 2.4178516392292583e+24；计算2^(3^4)。

// 计算2个对象的“并集”，并返回另一个新对象，新对象具有二者的属性。
function union(o1, o2){
    // 当两个对象拥有同名的属性时，union()函数使用第一个参数的属性值
    var result = {};
    for (var prop in o1){
        if (prop in result) continue;
        result[prop] = o1[prop]
    }
    for (var prop in o2){
        if (prop in result) continue;
        result[prop] = o2[prop]
    }
    return result;
}
var objects = [{x:1}, {y:2}, {z:3}];
var merged = objects.reduce(union);               // {x: 1, y: 2, z: 3}

var objects = [{x:1, a:1}, {y:2, a:2}, {z:3, a:3}];
var merged = objects.reduce(union);               // {x: 1, a: 1, y: 2, z: 3}
var merged = objects.reduceRight(union);          // {x: 1, a: 3, y: 2, z: 3}

/**
 * Array.indexOf()        从头至尾查找
 * Array.lastIndexOf()    从尾至头查找
 * 
 * 搜索整个数组中具有定值的元素，返回找到的第一个元素的索引。如果没有找到就返回-1。
 * 两者不接收一个函数作为其参数。第一个参数是需要搜索的值。第二个参数是可选的，它指定数组中的一个索引，从那里开始搜索。
 *   省略第二个参数，indexOf()就从头开始搜索，lastIndexOf()就从末尾开始搜索。第二个参数也可以是负数，它代表数组末尾的偏移量。
 */
var a = [0,1,2,1,0];
a.indexOf(1);         // 1
a.lastIndexOf(1);     // 3
a.indexOf(3);         // -1
a.indexOf(1, 2);      // 3
// 在一个数组中搜索指定的值并返回包含所有匹配的数组索引的一个数组。
function findall(a, x){
    var result = [],
        len = a.length,
        pos = 0;
    while(pos < len){
        pos = a.indexOf(x, pos);
        if (pos===-1) break;
        result.push(pos);
        pos = pos + 1;
    }
    return result;
}

/**
 * 数组类型
 * 
 * 数组是具有特殊行为的对象。在ECMAScript 5之前区分数组和非数组对象是很困难的。typeof操作符对数组返回“对象”（对除了函数以外的对象都是如此）。
 * instanceof操作符只能用于简单的情形。使用instanceof的问题是在Web浏览器中可能存在多个窗口或窗体（frame）。每个窗口有自己的JavaScript环境，
 * 有自己的全局对象。并且，每个全局对象有自己的一组构造函数。因此一个窗体中的对象将不可能是另外窗体中的构造函数的实例。窗体之间的混肴不常发生，
 * 但这个问题足以证明instanceof操作符不能视为一个可靠的数组检测方法。（2个窗体的Array对象的构造函数不同）
 * 
 * Array.isArray()  ECMAScript 5中使用它判定一个变量是否是数组对象。
 * 
 * ECMAScript3中通过检查对象的类属性，来判断是否是数组对象。对数组而言，该属性的值总是“Array”。如下isArray()函数。
 */
Array.isArray([]);      // true
Array.isArray({});      // false

[] instanceof Array;    // true
({}) instanceof Array;  // false

function isArray(a){
    return typeof a === "object" && Object.prototype.toString.call(a) === "[object Array]";
}
isArray([]);            // true



/**
 * 类数组对象
 * 
 * JavaScript数组有一些特性是其他对象所没有的：
 * - 当有新的元素加到列表时，自动更新length属性。
 * - 设置length为一个较小值将截断数组。
 * - 从Array.prototype中继承一些有用的方法。
 * - 其类属性为“Array”。
 * 这些特性让JavaScript数组和常规的对象有明显的区别。但是它们不是定义数组的本质特征。
 * 
 */

 /**
  * 一种常常完全合理的看法把拥有一个数值length属性和对应非负整数属性的对象看做一种类型的数组。虽然不能在它们之上
  * 直接调用数组方法或者期望length属性有什么特殊行为，但是仍然可以用针对真正数组遍历的代码来遍历它们。结论就是很
  * 多数组算法针对类数组工作的很好，就像针对真正的数组一样。如果算法把数组看成只读的或者如果它们至少保持数组长度
  * 不变，也尤其是这种情况。以下代码为一个常规对象增加了一些属性使其变成数组对象，然后遍历生成的伪数组的“元素”。
  */
var a = {};
var i = 0;
while(i<10){
    a[i] = i*i;
    i++;
}
a.length = i;

// 当作真正的数组遍历它
var total = 0;
for (var j=0;j<a.length;j++){
    total += a[j];
}

/**
 * 定义函数的Arguments对象就是一个类数组对象。在客户端JavaScript中，一些DOM方法（doucument.getElementsByTagName()）也返回数组对象。
 * 
 * 检测类数组对象
 */
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

/**
 * 在ECMAScript5中，字符串的行为与数组类似。然而，类似上述的类数组对象的检测方法针对字符串常常返回false——最好当作字符串处理，而非数组。
 * 
 * JavaScript数组方法是特定意义为通用的，因此它们不仅应用在真正的数组而且在类数组对象上都能正常工作。ECMAScript5中，所有数组方法是通用的。
 * 在ECMAScript3中，除了toString()和toLocalString()以外的所有方法也是通用的。（concat()方法是一个特例，虽然可以用在类数组对象上，但
 * 它没有将那个对象扩充进返回的数组中。）既然类数组对象没有继承Array.prototype，那就不能在它们上面直接调用数组方法。尽管如此，可以间接
 * 地使用Function.call方法调用。
 */
var a = {"0":"a", "1": "b", "2": "c", length:3};
Array.prototype.join.call(a, "+");                 // "a+b+c"
Array.prototype.slice.call(a, 0);                  // ["a", "b", "c"]
Array.prototype.map.call(a, function(x){
    return x.toUpperCase();
});                                                // ["A", "B", "C"]

/**
 * ECMAScript5数组方法实在firefox 1.5中定义的。由于它们的写法的一般性，firefox还将这些方法的版本在Array构造函数上直接定义为函数。
 * 使用这些方法的定义版本，上述例子可被重写。
 */
var a = {"0":"a", "1": "b", "2": "c", length:3};
Array.join.call(a, "+");                 // "a+b+c"
Array.slice.call(a, 0);                  // ["a", "b", "c"]
Array.map.call(a, function(x){
    return x.toUpperCase();
});                                      // ["A", "B", "C"]

/**
 * 当用在类数组对象上时，数组方法的静态函数版本非常有用。但既然它们不是标准的，不能期望它们在所有的浏览器中都有定义。可以这样写代码来
 * 保证使用它们之前时存在的。
 */
Array.join = Array.join || function(a, sep){
    return Array.prototype.join.call(a, sep);
}
Array.slice = Array.slice || function(a, from, to){
    return Array.prototype.slice.call(a, from, to);
}
Array.map = Array.map || function(a, f, thisArg){
    return Array.prototype.map.call(a, f, thisArg);
}




/**
 * 作为数组的字符串
 * 
 * ECMAScript5中，字符串的行为类似于只读数组。除了使用charAt()方法来访问单个的字符以外，还可以使用方括号。
 */
var s = "test";
s.charAt(0);              // "t"
s[0];                     // "t"

/**
 * 针对字符串的typeof操作符返回“string”。如果给Array.isArray()方法传递字符串，它将返回false。
 * 
 * 可索引的字符串的最大好处就是简单，用方括号代替了charAt()调用，这样更简洁、可读并且可能更高效。通用的数组方法可以用在字符串上。
 * 
 * 字符串是不可变值，故当把它们作为数组看待时，它们是只读的。如push()、sort()、reverse()和splice()等数组方法会修改数组，它们
 * 在字符串上是无效的。不仅如此，使用数组方法来修改字符串会导致错误，出错时没有提示。
 */
Array.isArray(s);        // false
s = "JavaScript";
Array.prototype.join.call(s, " ");       // "J a v a S c r i p t"
Array.prototype.filter.call(s, function(x){
    return x.match(/[^aeiou]/)
}).join("");                             // "JvScrpt"
