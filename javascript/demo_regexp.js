/**
 * 正则表达式的模式匹配
 * 
 * 
 */

/**
 * 模式匹配的String方法
 */

// search()
// 参数一：正则表达式
// 返回值：第一个与之匹配的子串的起始位置。如果找不到匹配的子串，它将返回-1。
// 注意：
//   1）如果search()的参数不是正则表达式，则首先通过RegExp构造函数将它转换成正则表达式。
//   2）不支持全局检索，因为它忽略正则表达式参数中的修饰符g。
'JavaScript'.search(/script/i);               // 4
'JavaScript'.search('S|s');                   // 4；字符串作为RegExp对象的主体部分（“/”与“/”之间）
'JavaScript'.search('a');                     // 1
'5a4b3c2d1'.search(1);                        // 8


// replace()
// 目的：执行检索与替换操作
// 参数一：正则表达式
// 参数二：要进行替换的字符串；对匹配字符串处理的函数；
// 返回值：替换后的字符串
// 注意：
//   1）如果正则表达式中设置了修饰符g，那么源字符串中所有与模式匹配的子串都将替换成第二个参数指定的字符串
//   2）如果正则表达式中不带修饰符g，则只替换所匹配的第一个子串。
//   3）如果replace()中第一个参数是字符串，则replace()将直接搜索这个字符串，而不是像search()一样首先通过RegExp()将它转换为正则表达式。
//   4）正则表达式中，使用圆括号括起来的子表达式是带有从左到右的索引编号的，而且正则表达式会记忆与每个子表达式匹配的文本。如果在
//      替换字符串中出现了$加数字，那么replace()将用指定的子表达式相匹配的文本来替换这两个字符。
var text = "\"SOME WORDS\": 1.JavaScript 2.java 3.javascript";
// 替换指定字符串
text.replace("SOME", "一些");                   // 一些 WORDS": 1.JavaScript 2.java 3.javascript
text.replace(1, "一");                         // SOME WORDS": 一.JavaScript 2.java 3.javascript
// 不区分大小写，将所有JavaScript替换成js
text.replace(/javascript/ig, "js");            // SOME WORDS": 1.js 2.java 3.js
// 英文引号替换成中文半角引号
var quote = /"([^"]*)"/g;
text.replace(quote, '“$1”');                   // “SOME WORDS”: 1.JavaScript 2.java 3.javascript


// match()
// 目的：检索匹配字符串
// 参数一：正则表达式（或通过RegExp()构造函数将其转换为正则表达式）
// 返回值：返回一个由匹配结果组成的数组
// 注意：
//    1）如果该正则表达式设置了修饰符g，则该方法返回的数组包含字符串中的所有匹配结果。
//    2）如果该正则表达式没有设置修饰符g，match()就不会进行全局检索，它只检索一个匹配。但即使match()执行的不是全局检索，它也返回一个数组。
//    3）当只检索一个匹配时，match()方法返回的数组，它的第一个元素就是匹配的字符串，余下的元素则是正则表达式中用括号括起来的子表达式。因此，
//       如果match()返回一个数组a，那么a[0]存放的是完整的匹配，a[1]存放的则是与第一个用圆括号相匹配的子串，以此类推。为了和方法replace()
//       保持一致，a[n]存放的是$n的内容。
//    4）给match()方法传入一个非全局的正则表达式，实际上和给这个正则表达式的exec()方法传入的字符串是一模一样的，它返回的数组带有2个属性：
//       index和input。
var text = "1 plus 2 equals 3";
text.match('1');                               // ["1", index: 0, input: "1 plus 2 equals 3", groups: undefined]
text.match(/\d+/g);                            // ["1", "2", "3"]
text.match(/\d+/);                             // ["1", index: 0, input: "1 plus 2 equals 3", groups: undefined]
// 解析URL
var URL = /(\w+):\/\/([\w.]+)\/(\S*)/;
var text = "Visit my blog at http://www.example.com/~david";
var result = text.match(URL);
// [  0
//     "http://www.example.com/~david", "http", "www.example.com", "~david", 
//     index: 17, input: "Visit my blog at http://www.example.com/~david", groups: undefined
// ]
if (result != null) {
    var fullurl = result[0];                   // http://www.example.com/~david
    var protocol = result[1];                  // http
    var host = result[2];                      // www.example.com
    var path = result[3];                      // ~david
}

var text = "021-8848-8848";
// match()全局匹配时，返回的结果不包含子组正则表达式匹配的结果
text.match(/((\d)(\d)(\d+))-/g);               // ["021-", "8848-"]
text.match(/(\d)(\d)(\d+)-/g);                 // ["021-", "8848-"]
text.match(/(\d)(\d)(\d+)-/);                  // ["021-", "0", "2", "1", index: 0, input: "021-8848-8848", groups: undefined]


// split()
// 目的：将调用它的字符串拆分为一个子串组成的数组，使用的分隔符是split()的参数
// 参数一：字符串；正则表达式；
// 返回值：字符串数组
'123,456,789'.split(',');                      // ["123", "456", "789"]
// 指定分隔符，允许两边可以留有任意多的空白字符
"1, 2, 3, 4, 5".split(/\s*,\s*/);              // ["1", "2", "3", "4", "5"]



/**
 * RegExp对象
 * 
 * 正则表达式是通过RegExp对象来表示的。除了RegExp()构造函数之外，RegExp对象还支持3个方法和一些属性。
 * 
 * RegExp()构造函数带有两个字符串参数，其中第二个参数是可选的，RegExp()用以创建新的RegExp对象。
 * 第一个参数包含正则表达式的主体部分，也就是正则表达式直接量中两斜线之间的文本。需要注意的是，不论是字符串直接量还是正则表达式，
 * 都使用“\”字符作为转义字符的前缀，因此当给RegExp()传入一个字符串表述的正则表达式时，必须将“\”替换为“\\”。
 * 第二个参数是可选的，如果提供第二个参数，它就指定正则表达式的修饰符。不过只能传入修饰符g、i、m或它们的组合。
 */
// 全局匹配字符串中的5个数字，注意这里使用了“\\”，而不是“\”
var zipcode = new RegExp("\\d{5}", "g");

/**
 * RegExp()构造函数非常有用，特别是在需要动态创建正则表达式的时候，这种情况往往没办法通过写死在代码中的正则表达式直接量来实现。
 * 例如，如果待检索的字符串是由用户输入的，就必须使用RegExp()构造函数，在程序运行时创建正则表达式。
 */

/**
 * RegExp的属性
 * 
 * 每个RegExp对象都包含5个属性。
 * - 属性source是一个只读的字符串，包含正则表达式的文本。
 * - 属性global是一个只读的布尔值，用以说明这个正则表达式是否带有修饰符g。
 * - 属性ignoreCase是一个只读的布尔值，用以说明正则表达式是否带有修饰符i。
 * - 属性multiline是一个只读的布尔值，用以说明正则表达式是否带有修饰符m。
 * - 属性lastIndex，它是一个可读/写的整数。如果匹配模式带有g修饰符，这个属性存储在整个字符串中下一次检索的开始位置，
 *      这个属性会被exec()和test()方法用到。
 */

/**
 * RegExp的方法
 * 
 * RegExp对象定义了两个用于执行模式匹配操作的方法。它们的行为和上文介绍过的String方法很类似。
 * 
 * RegExp最主要的执行模式匹配的exec()。
 * exec()方法与String的match()方法类似，只是它的参数是一个字符串，而String方法的参数是一个RegExp对象。
 * exec()方法对一个指定的字符串执行一个正则表达式，简言之，就是在一个字符串中执行匹配检索。
 *    如果它没有找到任何匹配，它就返回null，但如果它找到一个匹配，它就返回一个数组，就像match()方法为非全局检索返回的数组一样。
 *    这个数组第一个元素包含的是与正则表达式相匹配的字符串，余下的元素是与圆括号内的子表达式相匹配的子串。
 *    属性index包含了发生匹配的字符位置。
 *    属性input引用的是正在检索的字符串。
 * exec()方法和match()方法不同，不管正则表达式是否具有全局修饰符g，exec()都会返回一样的数组。
 * 回忆一下，当match()的参数是一个全局正则表达式时，它返回由匹配结果组成的数组。相比之下，exec()总是返回一个匹配结果，并提供关于
 *    本次匹配的完整信息。
 * 当调用exec()的正则表达式对象具有修饰符g时，它将把当前正则表达式对象的lastIndex属性设置为紧挨着匹配子串的字符位置。
 * 当同一个正则表达式第二次调用exec()时，它将从lastIndex属性所指示的字符处开始检索。
 *    如果exec()没有发现任何匹配结果，它将会将lastIndex重置为0（在任何时候都可以将lastIndex属性设置为0，每当在字符串中找最后一个
 *      匹配项后，在使用这个RegExp对象重新开始新的字符串查找之前，都应当将lastIndex设置为0）。这种特殊的行为使我们可以在用正则表
 *      达式匹配字符串的过程中反复调用exec()。
 */
var pattern = /Java/g;
var text = "JavaScript is more fun than Java!";
var result;
while ((result=pattern.exec(text)) != null) {
    console.log(
        "Matched '" + result[0] + "'" +
        " at position " + result.index + 
        "; next search begins at " + pattern.lastIndex
    );
}
// Matched 'Java' at position 0; next search begins at 4
// Matched 'Java' at position 28; next search begins at 32

/**
 * 另一个RegExp对象的方法是test()。
 * test()方法比exec()更简单一些。它的参数是一个字符串，用test()对某个字符串进行检测，如果包含正则表达式的一个匹配结果，则返回true。
 */
var pattern = /java/i;
pattern.test("JavaScript");                       // true


/**
 * 调用exec()和调用test()等价，当exec()的返回结果不是null时，test()返回true。由于这种等价性，当一个全局正则表达式调用方法test()时，
 * 它的行为和exec()相同，因为它从lastIndex指定的位置处开始检索某个字符串，如果它找到一个匹配结果，那么它就立即设置lastIndex为当前匹配
 * 字串的结束位置。这样一来，就可以使用test()来遍历字符串，就像用exec()一样。
 * 
 * 与exec()和test()不同，String方法search()、replace()和match()并不会用到lastIndex属性。实际上，String方法只是简单地将lastIndex
 * 属性值重置为0。如果让一个带有修饰符g的正则表达式对多个字符串执行exec()和test()，要么在每个字符串中找出所有的匹配以便将lastIndex自动
 * 重置为0，要么显式将lastIndex手动设置为0（当最后一次检索失败时需要手动设置lastIndex）。如果忘了手动设置lastIndex的值，那么下一次对新
 * 字符串进行检索时，执行检索的起始位置可能就不是字符串的开始位置，而可能是任意位置（译者注：这里所说的任意位置实际上是由lastIndex的值
 * 决定的，如果lastIndex的值不为0，必定会对新开始的正则表达式匹配检索造成不确定的影响）。当然，如果RegExp不带有修饰符g，则不必担心会发生
 * 这种情况。同样要记住，在ECMAScript 5中，正则表达式直接量的每次计算都会创建一个新的RegExp对象，每个新RegExp对象具有各自的lastIndex，
 * 这势必会大大减少“残留”lastIndex对程序造成的意外影响。
 */