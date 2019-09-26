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
a.splice(1, 2);                  // [2,3]; a 是 [1,4]
a.splice(1, 1);                  // [4]; a 是 [1]

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
