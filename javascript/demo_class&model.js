/**
 * 类和模块
 */

/**
 * 类和原型
 * 
 * JavaScript中，类的所有实例对象都从同一个原型对象上继承属性。因此，原型对象是类的核心。
 * 
 * 下例9-1中，给一个表示“值的范围”的类定义了原型对象，还定义了一个“工厂”函数用以创建初始化类的实例。
 */

/**
 * inherit()函数返回一个新创建的对象，它继承自某个原型对象。如果定义一个原型对象，然后通过inherit()函数创建一个继承自它的对象，
 * 这样就定义了一个JavaScript类。
 * @param {*} p 
 */
function inherit(p){
    // 返回一个新创建的对象，它继承自某个原型对象
    if (p == null) throw TypeError;
    if (Object.create) return Object.create(p);
    
    var t = typeof p;
    if (t !== "object" && t !=="function") throw TypeError;

    function f(){};
    f.prototype = p;
    return new f(); // 使用f()创建p的继承对象
}
/**
 * 定义了一个工厂方法range()，用来创建新的范围对象。给range()函数定义了一个属性range.methods，用以快捷地存放定义类的原型对象。
 * 把原型对象挂在函数上没什么大不了，但也不是惯用做法。
 * 
 * 再者，注意range()函数给每个范围对象都定义了form和to属性，用以定义范围的起始位置和结束位置，这两个属性是非共享的、可继承的
 * 方法都用到了from和to属性，而且使用了this关键字，为了指代它们，二者使用this关键字来指代调用这个方法的对象。任何类的方法都
 * 可以通过this的这种基本用法获取独享的属性。
 * @param {*} from 
 * @param {*} to 
 */
function range(from, to) {
    // 使用inherit()函数来创建对象，这个对象继承自在下面定义的原型对象
    // 原型对象作为函数的一个属性存储，并定义所有“范围对象”所共享的方法（行为）
    var r = inherit(range.methods);

    // 存储新的“范围对象”的起始位置和结束位置（状态）
    // 这两个属性是不可继承的，每个对象都拥有唯一的属性
    r.from = from;
    r.to = to;

    return r;
}

// 原型对象定义方法，这些方法为每个范围对象所继承
range.methods = {
    includes: function(x) {
        // 如果x在范围内，则返回true，否则返回false
        // 这个方法可以比较数字范围，也可以比较字符串和日期范围
        return this.from <= x && x <= this.to;
    },
    foreach: function(f) {
        // 对于范围内的每个整数都调用一次，只作用于数字范围
        for (var x = Math.ceil(this.from);x <= this.to;x++) f(x);
    },
    toString: function() {
        // 返回表示这个范围的字符串
        return "(" +this.from+ "..." +this.to+ ")";
    }
};

// 这里是使用“范围对象”的一些例子
var r = range(1,3);
r.includes(2);             // true
r.foreach(console.log);    // 1 2 3
console.log(r.toString()); // "(1...3)"


/**
 * 类和构造函数
 * 
 * 上面展示了定义类的一种方法。但这种方法不常用，毕竟它没有定义构造函数，构造函数是用来初始化新创建的对象的。
 * 
 * 使用关键字new来调用构造函数，会自动创建一个新的对象，因此构造函数本身只需初始化这个新对象的状态即可。
 * 
 * 调用构造函数的一个重要特征是，构造函数的prototype属性被用做新对象的原型。这意味着通过同一个构造函数创建的所有对象
 * 都继承自一个相同的对象，因此它们都是同一个类的成员。下例9-2对上面的“范围类”做了修改，使用构造函数替代工厂函数。
 */

/**
 * 这是一个构造函数，用以初始化新创建的“范围对象”。注意，这里并没有创建并返回一个对象，仅仅是初始化
 * @param {*} from 
 * @param {*} to 
 */
function Range(from, to) {
    this.from = from;
    this.to = to;
}

// 所有的“范围对象”都继承自这个对象。注意，属性的名字必须是“prototype”
Range.prototype = {
    includes: function(x) {
        // 如果x在范围内，则返回true，否则返回false
        // 这个方法可以比较数字范围，也可以比较字符串和日期范围
        return this.from <= x && x <= this.to;
    },
    foreach: function(f) {
        // 对于范围内的每个整数都调用一次，只作用于数字范围
        for (var x = Math.ceil(this.from);x <= this.to;x++) f(x);
    },
    toString: function() {
        // 返回表示这个范围的字符串
        return "(" +this.from+ "..." +this.to+ ")";
    }
};

var r = new Range(1,3);
r.includes(2);             // true
r.foreach(console.log);    // 1 2 3
console.log(r.toString()); // "(1...3)"

/**
 * 比较上面2种实现方式：
 * - 工厂函数range()转化为构造函数时被重命名为Range()。这里遵循了一个常见的编程约定：从某种意义上讲，定义构造函数既是定义类，并且
 *       类名首字母要大写。而普通的函数和方法都是首字母小写。
 * - Range()构造函数是通过new关键字调用的，而range()工厂函数则不必使用new。Range()函数也就不必调用inherit()或其它什么逻辑来创建
 *       新对象。在调用构造函数之前就已经创建了新对象，通过this关键字可以获取这个新对象。Range()构造函数只不过是初始化this而已。
 *       构造函数甚至不必返回这个新创建的对象，构造函数会自动创建对象，然后将构造函数作为这个对象的方法来调用一次，最后返回这个新
 *       对象。
 * - 构造函数的命名规则（首字母大写）和普通函数是如此不同还有另外一个原因，构造函数调用和普通函数调用是不尽相同的。构造函数就是用来
 *       “构造新对象”的，它必须通过关键自new调用，如果作为普通函数的话，往往不会正常工作。开发者通过命名约定来判断是否应当在函数之
 *       前冠以关键字new。（构造函数首字母大写，普通方法首字母小写）
 * - 原型对象的命名也是不同的。前一个示例的原型是range.methods。这种命名方式很方便同时具有很好的语义，但又过于随意。后一个示例的
 *       原型是Range.prototype。这是一个强制命名，对Range()构造函数的调用会自动使用Range.prototype作为新Range对象的原型。
 * - 两者的范围方法定义和调用方法是一致的。
 */


/**
 * 构造函数和类的标识
 * 
 * 原型对象是类的唯一标识：当且仅当两个对象继承自同一个原型对象时，它们才是属于同一个类的实例。而初始化对象的状态的构造函数则不能作为
 * 类的标识，两个构造函数的prototype属性可能指向同一个原型对象。那么这两个构造函数创建的实例是属于同一类的。
 * 
 * 尽管构造函数不像原型那样基础，但构造函数是类的“外在表现”。很明显的，构造函数的名字通常用做类名。比如，Range()构造函数创建Range对象。
 * 然而，更根本地讲，当使用instanceof运算符来检测对象是否属于某个类时，会用到构造函数。
 * 实际上instanceof运算符并不会检查r是否由Range()构造函数初始化而来，而会检查r是否继承自Range.prototype。
 * 不过，instanceof的语法则强化了“构造函数是类的公有标识”的概念。
 */
r instanceof Range;          // true；如果r继承自Range.prototype，则放回true


/**
 * constructor属性
 * 
 * Range.prototype属性是一个新对象，这个对象包含类所需的方法。其实完全没必要创建一个对象，用单个对象直接量的属性就可以方便地定义原型上
 * 的方法。任何JavaScript函数都可以作为构造函数，并且调用构造函数是需要用到一个prototype属性的。
 * 
 * 因此，每个JavaScript函数（ECMASCrpit 5中的Function.bind()方法返回的函数除外）都会自动拥有一个prototype属性。这个属性的值就是一个
 * 对象，这个对象包含唯一一个不可枚举属性constructor。
 * 
 * constructor属性的值是一个函数对象。从下面可以看出构造函数的原型中存在预先定义好的constructor属性。这意味着对象通常继承的constructor
 * 均指代它们的构造函数。由于构造函数是类的“公共标识”，因此这个constructor属性为对象提供了类。
 */
var F = function(){};
var p = F.prototype;
var c = p.constructor;
c === F;                     // true；对于任意函数F.prototype.constructor === F

var o = new F();             // 创建类F的一个对象
o.constructor === F;         // true；constructor属性指代这个类
o.toString === p.toString;   // true；

/**
 * 构造函数和原型对象之间的关系，包括原型到构造函数的反向引用以及构造函数创建的实例。
 * 
 * 构造函数               原型                     实例 
 * Range()     <————     constructor  <——继承——   new Range(1,2)
 *                       includes:...              
 * prototype    ————>    foreach:...              
 *                       toString:...  <——继承——  new Range(3,4)
 * 
 * 上面使用Range()构造函数作为示例，但实际上，Range类使用它自身的一个新对象重写预定义的Range.prototype对象。这个新定义的原型对象不含
 * 有constructor属性。
 * 
 * ！书上异议【因此Range类的实例也不含有constructor属性。显式地给原型添加一个构造函数，来修正这个问题。】
 * 
 * 从下面可以看到，constructor属性来自于Range类的原型链上继承的Object对象的原型的constructor属性
 */
Range.prototype.constructor === Range;             // false
Range.prototype.constructor === 
                    Object.prototype.constructor;  // true
Boolean(Range.prototype.constructor);              // true

var r = new Range(1,3);
r.constructor === Range;                           // false
r.constructor === Object.prototype.constructor;    // true
Object.getPrototypeOf(r) === Range.prototype;      // true
Boolean(r.constructor);                            // true

// 给Range.prototype添加constructor属性
Range.prototype = {
    constructor: Range,
    includes: function(x) { return this.from<=x && this.to>=x; },
    foreach: function(f) { for(var x=Math.ceil(this.from);x<=this.to;x++) f(x); },
    toString: function() { return "(" +this.from+ "..." +this.to+ ")";}
}

// 使用预定义的原型对象，预定义的原型对象包含constructor属性，然后依次给原型对象添加方法
function Range(from, to) {
    this.from = from;
    this.to = to;
}
Range.prototype.constructor == Range;              // true
// 扩展预定义的Range.prototype对象，而不重写之；这样就会自动创建Range.prototype.constructor属性
Range.prototype.includes = function(x) { return this.from<=x && this.to>=x; };
Range.prototype.foreach = function(f) { for(var x=Math.ceil(this.from);x<=this.to;x++) f(x); },
Range.prototype.toString = function() { return "(" +this.from+ "..." +this.to+ ")";}

Range.prototype.constructor === Range;             // true


/**
 * JavaScript中Java式的继承
 * 
 * 如果你有过Java或其它类似强类型面向对象语言的开发经历的话，在脑海中，类成员的模样可能会是这个样子：
 * - 实例字段：它们是基于实例的属性或变量，用以保存独立对象的状态
 * - 实例方法：它们是类的所有实例所共享的方法，由每个独立的实例调用
 * - 类字段：这些属性或变量是属于类的，而不是属于类的某个实例
 * - 类方法：这些方法是属于类的，而不是属于类的某个实例的
 * 
 * JavaScript和Java的一个不同之处在于，JavaScript中的函数都是以值的形式出现的，方法和字段之间并没有太大区别。如果属性值是函数，那么这个
 * 属性就定义一个方法。否则，它只是一个普通的属性或“字段”。尽管存在诸多差异，我们还是可以用JavaScript模拟出Java中的这四种类成员类型。
 * JavaScript中的类牵扯三种不同的对象，三种对象的属性的行为和下面三种类成员非常相似：
 * - 构造函数对象：
 *      之前提到，构造凹函数（对象）为JavaScript的类定义了名字。任何添加到这个构造函数对象种的属性都是类字段和类方法（如果属性值是函数的
 *      话就是类方法）
 * - 原型对象：
 *      原型对象的属性被类的所有实例所继承，如果原型对象的属性值是函数的话，这个函数就作为类的实例的方法来调用。
 * - 实例对象：
 *      类的每个实例都是一个独立的对象，直接给这个实例定义的属性是不会为所有实例对象所共享的。定义在实例上的非函数属性，实际上是实例的字段。
 * 
 * 在JavaScript种定义类的步骤可以缩减为一个分三步的算法。
 * 第一步，先定义一个构造函数，并设置初始化新对象的实例属性。
 * 第二步，给构造函数的prototype对象定义实例的方法。
 * 第三步，给构造函数定义类字段和类属性。
 * 我们可以将这三步骤封装进一个简单的defineClass()函数中。
 */
function extend(o, p){
    for (prop in p){
        o[prop] = p[prop];
    }
    return o;
}

function defineClass(constructor,    // 用以设置实例的属性的函数
                    methods,         // 实例的方法，复制至原型中
                    statics)         // 类属性，复制至构造函数中
{
    if(methods) extend(constructor.prototype, methods);
    if(statics) extend(constructor, statics);
    return constructor;
}
// Range类的另一个实现
var simpleRange = 
    defineClass(function(f,t) {this.f = f; this.to = t;},
                {
                    includes: function(x) { return this.f<=x && this.t>=x; },
                    toString: function() { return "(" +this.f+ "..." +this.t+ ")"; }
                },
                {upto: function(t) { return new simpleRange(0, t); }});

/**
 * 例9-3，定义一个表示复数的类，这段代码展示了如何使用JavaScript来模拟实现Java式的类成员。该示例中没有用到上面的defineClass()
 * 函数，而是手动实现。
 */

 /**
  * 第一步：
  * 这个构造函数为它所创建的每个实例定义了实例字段r和i，分别保存复数的实部和虚部，它们是对象的状态
  * @param {*} real 
  * @param {*} imaginary 
  */
function Complex(real, imaginary) {
    if (isNaN(real) ||  isNaN(imaginary))  // 确保两个实参都是数字
        throw new TypeError();             // 如果不都是数字则抛出错误
    this.r = real;                         // 复数的实部
    this.i = imaginary;                    // 复数的虚部
}

/**
 * 第二步：
 * 类的实例方法被定义为原型对象的函数值属性（function-valued properties of the prototype object）
 * 这里定义的方法可以被所有实例继承，并为它们提供共享的行为
 * 需要注意的是，JavaScript的实例方法必须使用关键字this来存取实例的字段
 */ 
Complex.prototype.add = function(that) {
    // 当前复数对象加上另一个复数，并返回一个新的计算和值后的复数对象
    return new Complex(this.r+that.r, this.i+that.i);
}
Complex.prototype.mul = function(that) {
    // 当前复数乘以另外一个复数，并返回一个新的计算乘积之后的复数
    return new Complex(this.r*that.r-this.i*that.i, this.r*that.i+this.i*that.r);
}
Complex.prototype.mag = function() {
    // 计算复数的模，负数的模定义为原点(0,0)到复平面距离
    return Math.sqrt(this.r*this.r+this.i*this.i);
}
Complex.prototype.neg = function() {
    // 复数的求负运算
    return new Complex(-this.r, -this.i);
}
Complex.prototype.toString = function() {
    // 将复数对象转换为一个字符串
    return "{" +this.r+ ", " +this.i+ "}";
}
Complex.prototype.equals = function(that) {
    // 检查当前复数对象是否和另外一个复数值相等
    return that != null 
        && that.constructor === Complex 
        && this.r === that.r
        && this.i === that.i
}

/**
 * 第三步：
 * 类字段（比如常量）和类方法直接定义为构造函数的属性
 * 需要注意的是，类的方法通常不使用关键字this，它们只对其参数进行操作
 */

// 这里预定义了一些对复数运算有帮助的类字段，它们的命名全都是大写，用以表明它们是常量（ECMAScript 5中还能设置这些字段为只读）
Complex.ZERO = new Complex(0, 0);
Complex.ONE = new Complex(1, 0);
Complex.I = new Complex(0, 1);

// 这个类方法将由实例对象的toString方法返回的字符串格式解析为一个Complex对象，或者抛出一个类型错误异常
Complex.parse = function(s) {
    try{
        var m = Complex._format.exec(s);        // 利用正则表达式进行匹配
        return new Complex(parseInt(m[1]), parseInt(m[2]));
    }
    catch(x){
        throw new TypeError("can't parse '" +s+ "' as a complex number.")
    }
};

// 定义类的“私有”字段，这个字段在Complex.parse()中使用。
// 下划线前缀表明它是类内部使用的，而不属于类的公有API的部分
Complex._format = /^\{([^,]+), ([^}]+)\}$/;

// 从上面可以看出，我们用到了构造函数，实例字段，实例方法，类字段和类方法
var c = new Complex(2,3);
var d = new Complex(c.i, c.r);
// 使用实例的方法
c.add(d).toString();                            // {5, 5}
// 使用类方法，类字段，实例方法
Complex.parse(c.toString())
    .add(c.neg())
    .equals(Complex.ZERO);                      // true

/**
 * 尽管JavaScript可以模拟出Java式的类成员，但Java中很多重要的特性是无法在JavaScript类中模拟的。首先，对于Java类的实例方法来说，
 * 实例字段可以用做局部变量，而不需要使用关键字this来引用它们。JavaScript没办法模拟这个特性，但可以使用with语句来近似实现这个
 * 功能（不推荐）。
 */
Complex.prototype.toString = function() {
    with(this){
        return "{" +f+ ", " +t+ "}";
    }
}

/**
 * Java中还可以使用final声明字段为常量，并且可以将字段和方法声明为private，用以表示是私有成员，且在类外面不可见。在JavaScript中
 * 没有没有这些关键字。上例9-3中使用了一些命名写法上的约定来给出一些暗示，比如哪些成员是不能修改的（以大写字母命名的字段），哪些
 * 成员在类外部是不可见的（以下划线为前缀的命名）。
 */


/**
 * 类的扩充
 * 
 * JavaScript中基于原型的继承机制是动态的：对象从其原型继承属性，如果创建对象之后圆形的属性发生改变，也会影响到继承这个原型的
 * 所有实例对象。这意味着我们可以通过给原型对象添加新方法来扩充JavaScript类。
 * 
 *  给上例9-3中的Complex类添加方法来计算复数的共轭复数（两个复数实部相等，虚部互为相反数）
  */
 Complex.prototype.conj = function() {
     // 返回当前复数的共轭复数
     return new Complex(this.r, -this.i);
 };

/**
 * JavaScript内置类的原型对象也是一样如此“开放”，也就是说可以给数字、字符串、数组、函数等数据类型添加方法。
 */
// 给ECMAScript 3中的函数类添加binde()方法
if(!Function.prototype.bind) {
    Function.prototype.bind = function(o /*, args */) {
        // bind()方法代码
    }
}

// 其他例子
// 多次调用这个函数f，传入一个迭代数。比如，输出三次“hello”。
Number.prototype.times = function(f, context) {
    var n = Number(this);
    for(var i=0;i<n;i++) f.call(context, i);
};
var n = 3;
n.times(function(n) { console.log('hello'); });   // 输出3次 “hello”

// 如果不存在String.trim()方法，就定义它。这个方法用来去除字符串开头和结尾的空白字符
String.prototype.trim = String.prototype.trim || function() {
    if (!this) return this;
    return this.replace(/^\s+|\s+$/g, "");        // 使用正则表达式进行空格替换
};
'  absc aaa '.replace(/^\s+|\s+$/g, "");          // "absc aaa"
'  absc aaa '.trim();                             // "absc aaa"

function f(){}
f.toString();                                     // "function f(){}"
// 返回函数的名字
// 如果它有（非标准的）name属性，则直接使用name属性，否则，将函数转换为字符串然后从中提取名字
// 如果是没有名字的函数，则返回一个空字符串
Function.prototype.getName = function() {
    return this.name || this.toString().match(/function\s*([^()]*)\(/)[1];
};
f.getName();                                      // "f"

/**
 * 给Object.prototype添加方法，从而使所有的对象都可以调用这些方法。但这种做法并不推荐，因为在ECMAScript 5之前，无法将这些新增的方法设置为
 * 不可枚举的，如果给Object.prototype添加属性，这些属性是可以被for/in循环遍历到的。在后面给出一个ECMAScript 5的例子，其中使用Object.defineProperty()
 * 方法可以安全地扩充Object.prototype。
 * 
 * 然后并不是所有的宿主环境（比如Web浏览器）都可以使用Object.defineProperty()，这跟ECMAScript的具体实现有关。比如，在很多Web浏览器中，可以
 * 给HTMLElement.property添加方法，这样当前文档中表示HTML标记的所有对象就可以继承这些方法。但当前版本的IE则不支持这么做。这对客户端编程实用技术
 * 有着严重的限制。
 */


/**
 * 类和类型
 * 
 * JavaScript定义了少量的数据类型：null、undefined、布尔值、数字、字符串、函数和对象、。typeof运算符可以得出值的类型。然而，我们
 * 往往更希望将类作为类型对待，这样就可以根据对象所属的类来区分它们。JavaScript语言核心中的内置对象（通常是指客户端JavaScript的
 * 宿主对象）可以根据它们的class属性来区分彼此，比如下面的classof()函数。但当我们使用先前的方法来定义类时，实例对象的class属性都是
 * “Object”，这时classof()函数无法区分。
 */
// classof()函数返回传递给它地任意对象的类
function classof(o){
    if (o === null) return "Null"
    if (o === undefined) return "Undefined"
    return Object.prototype.toString.call(o).slice(8, -1);
}
var r = new Range(1,3);
var c = new Complex(2,3);
var d = new Complex(c.i, c.r);
classof(r);              // "Object"
classof(c);              // "Object"
classof(d);              // "Object"

/**
 * 三种用以检测任意对象的类的技术：instanceof运算符、constructor属性、构造函数名字。
 */

/**
 * instanceof运算符
 * 
 * 左操作数是待检测其类的对象，右操作数是定义类的构造函数。
 * 如果o继承自C.prototype，则表达式`o instanceof C`值为true。(即表达式`Object.getPrototypeOf(o) === C.prototype`的值为true)
 * 这里的继承可以不是直接继承，如果o所继承的对象继承自另一个对象，另外的这个对象继承自C.prototype，这个表达式运算结果相同。
 * 
 * 正如前面所讲到的，构造函数是类的公共标识，但原型是唯一的标识。尽管instanceof运算符的右操作符是构造函数，但计算过程实际上是检查了
 * 对象的继承关系，而不是检查创建对象的构造函数。
 * 
 * 检测对象的原型链上是否存在某个特定的原型对象的方法， 除了使用构造函数作为中介，还可以使用isPrototypeOf()方法.
 */
r instanceof Range;                           // true
Object.getPrototypeOf(r) === Range.prototype; // true

Range.prototype.isPrototypeOf(r);             // true
Object.prototype.isPrototypeOf(r);            // true
Object.prototype.isPrototypeOf(Range.prototype); // true

/**
 * instanceof运算符和isPrototypeOf()方法的缺点是，我们无法通过对象来获得类名，只能检测对象是否属于指定的类名。在客户端JavaScript
 * 中还有一个比较严重的不足，就是在多窗口和多框架子页面的Web应用中兼容性不佳。每个窗口和框架子页面都具有独立的执行上下文，每个上下文
 * 都包含独有的全局变量和一组构造函数。在两个不同框架页面中创建的两个数组继承自两个相同但相互独立的原型对象，其中一个框架页面中的数组
 * 不是另一个框架页面的Array()构造函数的实例。instanceof运算结果为false。
 */


/**
 * constructor属性
 * 
 * 构造函数是类的公共标识，所以最直接的方法是使用constructor属性，如下typeAndValue()函数。
 * 
 *  需要注意的是，在代码中关键字case后的表达式都是函数，如果改用typeof运算符或获取到对象的class属性的话，它们应当改为字符串。
 */
function typeAndValue(x) {
    if (x == null) return "";         //Null和undefined都没有构造函数
    switch(x.constructor) {
        case Number: return "Number: " +x;   //处理原始类型
        case String: return "String: " +x;
        case Date: return "Date: " +x;       //处理内置类型
        case RegExp: return "RegExp: " +x;
        case Complex: return "Complex: " +x; //处理自定义类型
    }
}

/**
 * 使用constructor属性检测对象属于某个类的技术的不足之处和instanceof运算符一样。在多个执行上下文的场景中它是无法正常工作的（比如
 * 在浏览器窗口的多个框架子页面中）。在这种情况下，每个框架页面各自拥有独立的构造函数集合，一个框架页面中的Array构造函数和另一个
 * 框架页面的Array构造函数不是同一个构造函数。
 * 
 * 同样，在JavaScript中也并非所有的对象都包含constructor属性。每个新创建的函数原型上默认会有constructor属性，但我们常常会忽略原型
 * 上的constructor属性。！【比如前面例9-1和例9-2中定义的两个类，它们的实例都没有constructor属性。】
 */

/**
 * 构造函数的名称
 * 
 * 使用instanceof运算符和constructor属性来检测对象所属类的一个主要问题，在多个执行上下文中存在构造函数的多个副本的时候，这两个方法
 * 的检测结果会出错。多个执行上下文中的函数看起来是一摸一样的，但它们是相互独立的对象，因此彼此也不相等。
 * 
 * 一种可能的解决方案是使用构造函数的名字而不是构造函数本身作为类标识符。一个窗口的Array构造函数和另一个窗口的Array构造函数是不相等的，
 * 但它们的名字是一样的。在一些JavaScript的实现中为函数对象提供了一个非标准的属性name，用来表示函数的名称。对于那些没有name属性的
 * JavaScript实现来说，可以将函数转换为字符串，然后从中提取出函数名。
 * 
 * 下例9-4中定义的type()函数以字符串的形式返回对象的类型。它用typeof运算符来处理原始值和函数。对于对象来说，它要么返回class属性的值，
 * 要么返回构造函数的名字。type()函数用到了classof()函数和Function.prototype.getName()方法。
 */
function classof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}

Function.prototype.getName = function() {
    // return this.name
    //     || (this.name=this.toString().match(/function\s*([^()]*)\(/)[1]);

    if("name" in this) return this.name;
    return this.name=this.toString().match(/function\s*([^()]*)\(/)[1];
};

function type(o){
    var t, c, n;   // type, class, name

    if(o===null) return "null";
    if(o != o) return "nan";
    // 如果typeof的值不是"object"，就使用这个值，识别出原始值的类型和函数
    if((t=typeof o) !== "object") return t;
    // 返回对象的类名，除非值为"Object"，识别出大多数的内置对象
    if((c=classof(o)) !== "Object") return c;
    // 如果对象构造函数的名字存在的话，则返回它
    if(o.constructor 
    && typeof o.constructor === "function"
    && (n=o.constructor.getName())) 
        return n;
    
    // 其它的类型都无法判别，一律返回"Object"
    return "Object";
}

/**
 * 这种使用构造函数名字来识别对象的类的做法和使用constructor属性一样有一个问题：并不是所有的对象都具有constructor属性。
 * 此外，并不是所有的函数都有名字。如果使用不带名字的函数定义表达式定义一个构造函数，getName()方法则会返回空字符串。
 */
// 这个构造函数没名字
var Complex = function(x,y) {this.r=x;this.i=y;};
// 这个构造函数有名字
var Range = function Range(f,t) {this.from=f;this.to=t;}

/**
 * 鸭式辨型
 * 
 * 上面描述的检测对象的类的各种技术多少都会有些问题，至少在JavaScript客户端中是如此。解决方法就是规避这些问题：不要关注
 * “对象的类是什么”，而是关注“对象能做什么”。这种思考问题的方式在python和Ruby中非常普遍，称为“鸭式辨型”（这个表述是由
 * 作家James Whitcomb Riley提出的）。
 *      像鸭子一样走路、游泳并且嘎嘎叫的鸟就是鸭子。
 * 
 * 对于JavaScript程序员来说，这句话可以理解为“如果一个对象可以像鸭子一样走路、游泳并且嘎嘎叫，就认为这个对象是鸭子，哪怕
 * 它并不是从鸭子类的原型对象继承而来的”。
  */

/**
 * 以例9-2的Range类举例。
 * 
 * 起初定义这个类用来描述数字范围。但Range()构造函数没有对实参进行类型检查以确保实参是数字类型。但却将参数使用 ">=" 运算符
 * 来进行比较运算，因为这里假定它们是可比较的。同样，includes()方法使用 "<=" 运算符进行比较，但没有对范围的结束点进行类似
 * 的假设。因为类并没有强制使用特定的类型，它的includes()方法可以作用于任何结束点，只要结束点可用关系运算符执行比较运算。
 * 
 * Range类的foreach()方法中也灭有显式地检测表示范围的结束点的类型，但Math.ceil()和 "++" 运算符表明它们只能对数字结束点进行操作。
 */
var lowercase = new Range('a', 'z');
var thisYear = new Range(new Date(2009, 0, 1), new Date(2010, 0, 1));

/**
 * 提到鸭式辨型时，往往是说检测对象是否实现了一个或多个方法。一个强类型的triathlon()函数所需要的参数必须是TriAthlete对象。
 * 而一种“鸭式辩型”式的做法是，只要对象包含walk()、swin()和bike()这三个方法就可以作为参数传入。同理，可以重新设计Range类，
 * 使用结束点对象的compareTo()和succ()（successor）方法来代替“<=”和“++”运算符。
 * 
 * 鸭式辩型的实现方法让人感觉太“放任自流”：仅仅是假设输入对象实现了必要的方法，根本没有执行进一步的检查。如果输入对象没有
 * 遵循“假设”，那么当代码试图调用那些不存在的方法时会报错。另一种实现方式是对输入对象进行检查。但不是检查他们的类，而是用
 * 适当的名字来检查它们实现的方法。这样可以将非法输入尽可能早的拦截在外，并可给出带有更多提示信息的报错。
 * 
 * 下例9-5中按照鸭式辩型的理念定义了quacks()函数（函数名叫“implements”会更加合适，但implements是保留字）。quacks()函数
 * 用以检查一个对象（第一个实参）是否实现了剩下的参数所表示的方法。对于除第一个参数外的每个参数，如果是字符串的话则直接检查
 * 是否存在以它命名的方法；如果是对象的话则检查第一个对象中的方法是否在这个对象中也具有同名的方法；如果参数是函数，则假定
 * 它是构造函数，函数将检查第一个对象实现的方法是否在构造函数的原型对象中也具有同名的方法。
 */
function quacks(o /*,... */) {
    for (vari =1;i<arguments.length;i++) { //遍历o之后的所有参数
        var arg = arguments[i];
        // 检查参数类型
        switch(typeof arg){
            case "string":
                // 如果实参是字符串，则直接用名字做检查
                if (typeof o[arg] !== "function") return false;
                continue;
            case "function":
                // 如果实参是函数，则假定它是构造函数，检查它原型对象上的方法
                arg = arg.prototype;       // 直接进入下一个case
            case "object":
                // 如果实参是对象，则检查匹配的方法
                for (var m in arg) {
                    if (typeof arg[m] !== "function") continue;
                    if (typeof o[m] !== "function") return false;
                }
        }
    }
    // 如果执行到这里，说明o实现了所有的方法
    return true;
}

/**
 * 关于这个quacks()函数还有一些地方需要注意。首先，这里只是通过特定的名字来检测对象是否含有一个或多个值为函数的属性。我们
 * 无法得知，这些已经存在的属性的细节信息。比如，函数是干什么用的？他们需要多少参数？参数类型是什么？然而这是鸭式辩型的本质
 * 所在，如果使用鸭式辩型而不是强调的类型检测方式定义API，那么创建的API应当更具灵活性才可以，这样才确保你提供给用户的API更
 * 加安全可靠。关于quacks()函数还有另外一个问题需要注意，就是它不能应用于内置类。比如，不能通过`quacks(o, Array)`来检测o
 * 是否实现了Array中所有同名的方法。原因是内置类的方法都是不可枚举的，quacks()中的for/in循环无法遍历到它们（ECMAScript 5
 * 中有一个补救办法，就是使用Object.getOwnPropertyNames()方法）。
 */



/**
 * JavaScript中的面向对象技术：
 * - 一个例子：值的任意集合
 * - 一个例子：枚举类型
 * - 标准转换方法
 * - 比较方法
 * - 方法借用
 * - 私有状态
 * - 构造函数的重载和工厂方法
 */

/**
 * 例9-6：值的任意集合
 * 
 * 集合（set）是一种数据结构，用以表示非重复值的无序集合。集合的基础方法包括添加值、检测值是否在集合中，这种集合需要一种通用
 * 的实现，以保证效率。JavaScript的对象是属性名以及与之对应的值的基本集合。因此将对象只用作字符串的集合是大材小用。
 * 
 * 实现了更加通用的Set类，它实现了JavaScript值到唯一字符串的映射，然后将字符串用作属性名。对象和函数都不具有如此简明可靠的
 * 唯一字符串表示。因此集合类必须给集合中的每个对象或函数定义一个唯一的属性标识。
 */
function Set() {                            // 这是一个构造函数
    this.values = {};                       // 集合数据保存在对象的属性里
    this.n = 0;                             // 集合中值的个数
    this.add.apply(this, arguments);        // 所有参数添加至集合中
}

// 这是一个内部函数（类方法），用以将任意JavaScript值和唯一的字符串对应起来
Set._v2s = function(val) {
    
    switch (val) {
        case undefined: return 'u';
        case null:      return 'n';
        case true:      return 't';
        case false:     return 'f';
        default: switch (typeof val) {
            case "number": return "#"+val;
            case "string": return "\""+val;
            default: return "@"+objectId(val); // 对象、函数
        }
    }

    /**
     * 对任意对象来说，都会返回一个字符串；针对不同的对象，这个函数会返回不同的字符串；
     * 对于同一个对象的多次调用，总是返回相同的字符串；为了做到这一点，它给o创建了一个属性，在ES5中，整数属性是不可枚举且是只读的。
     * @param {*} o 
     */
    function objectId(o) {
        var prop = "|**objectId**|";       // 私有属性，存放id
        if (!o.hasOwnProperty(prop))      // 如果没有，创建并赋值
            o[prop] = Set._v2s.next++;
        return o[prop];                    // 返回id
    }
}
// 初始的id值
Set._v2s.next = 100;

/**
 * 向集合中添加元素
 */
Set.prototype.add = function(){
    for (var i=0;i<arguments.length;i++) {        // 遍历每个参数
        var val = arguments[i];                   // 待添加到集合中的值
        var str = Set._v2s(val);                  // 获取值对应的字符串id
        if (!this.values.hasOwnProperty(str)){    // 查找是否存在于集合中
            this.values[str] = val;               // 不存在，则添加到集合中，将字符串id和值对应起来
            this.n++;                             // 集合中值的个数加一
        }
    }
    return this;
}
/**
 * 从集合中删除元素，这些元素由参数指定
 */
Set.prototype.remove = function() {
    for (var i=0;i<arguments.length;i++) {
        var val = arguments[i];                   // 待添加到集合中的值
        var str = Set._v2s(val);                  // 获取值对应的字符串id
        if (this.values.hasOwnProperty(str)) {    // 查找是否存在于集合中
            delete this.values[str];              // 删除元素
            this.n--;                             // 集合中值的个数减一
        }
    }
    return this;
}
/**
 * 检查集合中是否包含某个值，包含则返回true，否则返回false
 */
Set.prototype.contains = function(value) {
    return this.values.hasOwnProperty(Set._v2s(value));
}
/**
 * 返回集合的大小
 */
Set.prototype.size = function() {
    return this.n;
}
/**
 * 遍历集合中的所有元素，在指定的上下文中调用f
 */
Set.prototype.foreach = function(f, context) {
    for (var s in this.values) {
        if (this.values.hasOwnProperty(s))
            f.call(context, this.values[s]);
    }
}

/**
 * 例9-7：枚举类型
 * 
 * 枚举类型（enumerated type）是一种类型，它是值的有限集合，如果值定义为这个类型则该值是可列出（或“可枚举”）的。在C及其
 * 派生语言中，枚举类型是通过关键字enum声明的。Enum是ECMAScript 5中的保留字（还未使用），很可能在将来JavaScript就会内置
 * 支持枚举类型。
 * 
 * 下例中包含一个函数enumeration()。它不是构造函数，它并没有定义一个名叫“enumerate”的类。相反，它是一个工厂方法，每次
 * 调用它都会创建并返回一个新的类。
 */

/**
 * 这个函数创建一个新的枚举类型，实参对象表示类的每个实例的名字和值，返回值是一个构造函数，它标识这个新类。
 * 
 * 注意，这个构造函数也会抛出异常：不能使用它来创建该类型的新实例。返回的构造函数包含名/值对的映射表，包括由值组成的数组，
 * 以及一个foreach()迭代函数
 * @param {*} namesToValues 
 */
function enumeration(namesToValues) {
    // 这个虚拟的构造函数是返回值
    var enumeration = function() {
        throw "Can't instantiate Enumerations;"
    };
    // 枚举值继承自这个对象
    var proto = enumeration.prototype = {
        constructor: enumeration,                         // 标识类型
        toString: function () {return this.name;},        // 返回名字
        valueOf: function () {return this.value;},        // 返回值
        toJSON: function () {return this.name;}           // 转换为JSON
    }
    // 用以存储枚举对象的数组
    enumeration.values = [];
    // 创建新类型的实例
    for (var name in namesToValues) {
        var e = inherit(proto);                           // 创建一个代表它的对象
        e.name = name;                                    // 给它一个名字
        e.value = namesToValues[name];                    // 给它一个值
        enumeration[name] = e;                            // 将它设置为构造函数的属性
        enumeration.values.push(e);                       // 将它存储到值数组中
    }
    // 类方法，用来对类的实例进行迭代 
    enumeration.foreach = function (f,c) {
        for (var i=0;i<this.values.length;i++) f.call(c, this.values[i]);
    };

    // 返回标识这个新类型的构造函数
    return enumeration;
}

// 使用4个值创建新的Coin类：Coin.penny，Coin.Nickel等
var Coin = enumeration({Penny: 1, Nickel: 5, Dime: 10, Quarter: 25});
var c = Coin.Dime;              // 类的实例
c instanceof Coin;              // true
c.constructor == Coin;          // true
Coin.Quarter + 3*Coin.Nickel;   // 40
Coin.Dime == 10;                // true
Coin.Dime > Coin.Nickel;        // true
String(Coin.Dime) + ":" +Coin.Dime;    // "Dime:10"；强制转换为字符串

/**
 * 例9-8：使用枚举类型来模拟一副扑克牌
 */
// 定义一个表示玩牌的类
function Card(suit, rank) {
    this.suit = suit;           // 每张牌都有花色
    this.rank = rank;           // 点数
}
// 使用枚举类新定义花色和点数（类属性）
Card.Suit = enumeration({
    Clubs: 1,     // 梅花
    Diamonds: 2,  // 方块
    Hearts: 3,    // 红桃
    Spades: 4     // 黑桃
});
Card.Rank = enumeration({
    Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7,
    Eight: 8, Nine: 9, Ten: 10, Jack: 11, Queen: 12, King: 13,
    Ace: 14
});
// 定义用以描述牌面的文本
Card.prototype.toString = function() {
    return this.rank.toString()+ " of " +this.suit.toString();
}
// 比较扑克牌中两张牌的大小
Card.prototype.compareTo = function(that) {
    if (this.rank < that.rank) return -1;
    if (this.rank > that.rank) return 1;
    return 0
}

// 以扑克牌的玩法规则对牌进行排序的函数
Card.orderByRank = function(a,b) {return a.compareTo(b);};
// 以桥牌的玩法规则对牌进行排序的函数
CanvasRenderingContext2D.orderBySuit = function(a,b) {
    if (a.suit < a.suit) return -1;
    if (a.suit > a.suit) return 1;

    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0
}

// 定义用以表示一副标准扑克牌的类
function Deck() {
    var cards = this.cards = [];
    Card.Suit.foreach(function(s){
        Card.Rank.foreach(function(r){
            // 插入新创建的卡片实例
            cards.push(new Card(s, r));
        });
    });
}
// 洗牌的方式：重新洗牌并返回洗好的牌
Deck.prototype.shuffle = function() {
    var deck = this.cards,
        len = deck.length;
    for(var i=len-1;i>0;i--){
        var r = Math.floor(Math.random()*(i+1)),      // 随机选取
            temp;
        temp = deck[i], deck[i] = deck[r], deck[r] = temp;   // 交换
    }
    return this;
};
// 发牌的方法：返回牌的的数组
Deck.prototype.deal = function(n){
    if (this.cards.length < n) throw "Out of cards";
    return this.cards.splice(this.cards.length-n, n);  //倒数n个元素
};

// 创建一副新的扑克牌，洗牌后发13张牌，并排序
var deck = (new Deck()).shuffle();
var hand = deck.deal(13).sort(Card.orderBySuit);


/**
 * 标准转换方法
 * 
 * 对象类型转换用到的一些方法，是在需要做类型转换时由JavaScript解释器自动调用的。不需要为定义的每个类都实现这些方法，
 * 但这些方法的确非常重要，如果没有为自定义的类实现这些方法，也应当有意为之，而不应当忽略它们。
 * 
 * toString()方法是返回一个可以表示这个对象的字符串。在希望使用字符串的地方用到对象的话（比如将对象用做属性名或使用
 * “+”运算符进行字符串连接运算），JavaScript会自动调用这个方法。如果没有实现这个方法，类会默认从Object.prototoype
 * 中继承toString()方法，这个方法的运算结果是“[object Object]”。toString()方法应该返回一个可读的字符串，这样用户
 * 才能将这个输出值利用起来，然后有时候并不一定非要如此，不管怎样，可以返回可读字符串的toString()方法也让程序调试变
 * 得更轻松。例9-2和例9-3中的Range类和Complex类都定义了toString()方法，例9-7中的枚举类型也定义了toString()方法。
 * 
 * toLocaleString()和toString()方法极为类似：toLocaleString()是以本地敏感性（locale-sensitive）的方式来将对象转换
 * 为字符串。默认情况下，对象所继承的toLocaleString()方法只是简单地调用toString()方法。有一些内置类型包含有用的
 * toLocaleString()方法用以实际上返回本地化相关的字符串。如果需要为对象到字符串的转换定义toString()方法，那么同样
 * 需要定义toLocaleString()用以处理本地化的对象到字符串的转换。
 * 
 * valueOf()方法，它用来将对象转换为原始值。比如，当数学运算符（除了“+”运算符）和关系运算符作用于数字文本表示的对象时，
 * 会自动调用valueOf()方法。大多数对象都没有合适的原始值来表示它们，也没有定义这个方法。但在例9-7中的枚举类型的实现则
 * 说明valueOf()方法是非常重要的。
 * 
 * toJSON()方法，它是由JSON.stringify()自动调用的。JSON格式用于序列化良好的数据结构，而且可以处理JavaScript原始值，
 * 数组和纯对象。它和类无关，当对一个对象执行序列化操作时，它会忽略对象的原型和构造函数。比如Range对象或Complex对象作
 * 为参数传入JSON.stringify()，将会返回诸如“{"from": 1, "to": 2}”或“{"r": 1, "i":-1}”的字符串。如果将这些字符串传
 * 入JSOIN.parse()，则会得到一个和Range对象和Complex对象具有相同属性的纯对象，单证对象不会包含从Range和Complex继承
 * 来的方法。
 * 
 * 这种序列化操作非常适用于诸如Range和Complex这种类，但对于其他一些类则必须自己定义toJSON()方法来定制个性化的序列化
 * 格式。如果一个对象有toJSON()方法，JSON.stringify()并不会对传入的对象作序列化操作，而会调用toJSON()方法来执行序
 * 列化操作（序列化的值可能是原始值也可能是对象）。比如，Date对象的toJSON()方法可以返回一个表示日期的字符串。例9-7中
 * 的枚举类型也是如此：它们的toJSON()方法和toString()完全一样。如果要模拟一个集合，最接近JSON的表示方法就是数组，因
 * 此，在下面的例子中将定义toJSON()方法用以将集合对象转换为值的数组。
 */

/**
 * 例9-6中的Set类并没有定义上述方法中的任何一个。JavaScript中没有哪个原始值可以表示集合，因此没定义valueOf()方法，但
 * 应当包含toString()、toLocaleString()和toJSON()方法。可以用如下代码来实现。注意extend()函数的用法，这里使用
 * extend()来向Set.prototype添加方法。
 * 
 * 将这些方法添加至Set类的原型中
 */
extend(Set.prototype, {
    toString: function() {
        // 将集合转换为字符串
        var s = "{",
            i = 0;
        this.foreach(function(v){
            s += ((i++>0) ? "," : "") + v;
        });
        return s+ "}";
    },
    toLocaleString: function() {
        // 类似toString，但对于所有值都调用toLocaleString()
        var s = "{",
            i = 0;
        this.foreach(function(v){
            if (i++>0) s += ",";
            if (v == null) s += v;          // null、undefined
            else s += v.toLocaleString();
        });
    },
    toArray: function() {
        // 集合转换为值数组
        var a = [];
        this.foreach(function(v) {a.push(v);});
        return a;
    }
})

// 对于要从JSON转换为字符串的集合都被当做数组来对待
Set.prototype.toJSON = Set.prototype.toArray;


/**
 * 比较方法
 * 
 * JavaScript的相等运算符比较对象时，比较的是引用而不是值。也就是说，给定两个对象引用，如果要看它们是否指向同一个对象，不是检查
 * 这两个对象是否具有相同的属性名和属性值，而是直接比较这两个单独的对象是否相等，或者比较它们的顺序（就像“<”和“>”运算符进行比较
 * 一样）。如果定义一个类，并且希望比较类的实例，应该定义合适的方法来执行比较操作。
 * 
 * 为了让自定义类的实例具备比较的功能，定义一个equals()实例方法。这个方法只能接收一个实参，如果这个实参和调用此方法的对象相等的
 * 话则返回true。当然，这里所说的“相等”的含义是根据类的上下文来决定的。对于简单的类，可以通过简单地比较它们的constructor属性来
 * 确保两个对象是相同类型，然后比较两个对象的实例属性以保证它们的值相等。
 */ 
// 例9-3中的Complex类就实现了这样的equals()方法，我们可以轻易地为Range类也实现类似的方法。
// Range类重写它的constructor属性，现在将它添加进去
Range.prototype.constructor = Range;

// 一个Range对象和其他不是Range的对象均不相等
// 当且仅当两个范围的端点相等，它们才实现
Range.prototype.equals = function(that) {
    return that != null 
        && that.constructor === Range 
        && this.from == that.from
        && this.to == that.to
}

// 给Set类定义equals()方法。
Set.prototype.equals = function (that) {
    if (that == null) return false;

    // 如果that对象不是一个集合，它和this不相等
    // 使用instanceof运算符，用于Set的子类
    // 如果希望采用鸭式辩型的方法，可以降低检查的严格程度
    // 或者通过 this.constructor == that.constructor 来加强检查的严格程度
    // 注意，null和undefined两个值无法用于instanceof运算符
    if (!(that instanceof Set)) return false;

    // 如果两个集合的大小不一样，则它们不相等
    if (this.size() != that.size()) return false;

    // 现在检查两个集合中的元素是否完全一样
    // 如果两个集合不相等，则通过抛出异常来终止foreach循环
    try{
        this.foreach(function(v){
            if (!that.contains(v)) throw false;
        });
        return true;
    }
    catch(x){
        if (x === false) return false;
        throw x;
    }
}

/**
 * 按照我们需要的方式比较对象是否相等常常是很有用的。对于某些类来说，往往需要比较一个实例“大于”或“小于”另外一个实例。
 * 比如，你可能会基于Range对象的下边界来定义实例的大小关系。枚举类型可以根据名字的字母表顺序来定义实例的大小，也可以
 * 根据它包含的数值（假设它包含的都是数字）来定义大小。而Set对象就无法排序了。
 *
 * 如果将对象用于JavaScript关系比较运算符，比如“<”和“<=”，JavaScript会首先调用对象的valueOf()方法，如果这个方法
 * 返回一个原始值，则直接比较该值。例9-7中由enumeration()方法所返回的枚举类型包含valueOf()方法，因此可以使用关系
 * 运算符对它们做有意义的比较。但大多数类并没有valueOf()方法，为了按照显式定义的规则来比较这些类型的对象，可以定义
 * 一个名叫compareTo()的方法。
 * 
 * compareTo()方法应当只接收一个参数，这个方法将这个参数和调用它的对象进行比较。如果this对象小于参数对象，compareTo()
 * 应当返回比0小的值。如果this对象大于参数对象，应当返回比0大的值。如果两个对象相等，应当返回0。

 * 表达式替换关系比较和相等性运算符
 * a<b                    a.compareTo(b)<0
 * a<=b                   a.compareTo(b)<=0
 * a>b                    a.compareTo(b)>0
 * a>=b                   a.compareTo(b)>=0
 * a==b                   a.compareTo(b)==0
 * a!=b                   a.compareTo(b)!=0
 */
// 给Range类添加compareTo()方法，比较它们的下界
Range.prototype.compareTo = function(that) {
    return this.from - that.from;
}

/**
 * Set类的原型prototype的equals()方法对其参数执行了类型检查，如果参数类型不合法则返回false。compareTo()方法并没有返回
 * 一个表示“这两个值不能比较”的值，由于compareTo()没有对参数作任何检查，因此，如果给compareTo()方法传入错误类型的参数，
 * 往往会抛出异常。
 * 
 * 注意，如果两个范围对象的下边界相等，为Range类定义的compareTo()方法会返回0。这意味着就compareTo()而言，任何两个起始点
 * 相同的Range类实例都相等。这个相等概念的定义和equals()方法定义的相等概念是相背的，equals()要求两个端点均相等才算相等。
 * 这种概念上的差异会造成很多bug，最好将Range类的equals()方法compareTo()方法中处理相等的逻辑保持一致。这里是修正后的方法，
 * 逻辑与equals()保持一致，但当传入不可比较的值时仍然会报错。
 */
Range.prototype.compareTo = function(that) {
    if (!(that instanceof Range)) throw new Error("can't compare a Range with " +that);
    var diff = this.from - that.from;
    if (diff == 0) diff = this.to - that.to;
    return diff;
}

// 对类的实例数组进行排序。Array.sort()方法接收一个可选的参数，这个参数是一个函数，用来比较两值的大小。
// 这个函数返回值的约定与compareTob()保持一致
var a = [new Range(1,3), new Range(1,5), new Range(0,6), new Range(2,6), new Range(3,5),];
a.sort(function(a,b) {return a.compareTo(b);});
// [Range, Range, Range, Range, Range]
// 0: Range {from: 0, to: 6}
// 1: Range {from: 1, to: 3}
// 2: Range {from: 1, to: 5}
// 3: Range {from: 2, to: 6}
// 4: Range {from: 3, to: 5}

// 参照compareTo()方法定义传入两个参数的比较函数，使用这个方法让数组排序更加简单
Range.byLowerBound = function(a,b) {return a.compareTo(b);};
a.sort(Range.byLowerBound);


/**
 * 方法借用
 * 
 * JavaScript中可以将函数赋值给对象，将它作为对象的属性，可以通过对象来调用它。当一个函数分别赋值给两个属性时，这两个属性值
 * 就作为两个方法来调用。比如，Set类中将toArray()方法创建一个副本，让它和toJSON()方法一样完成同样的功能。
 *     `Set.prototype.toJSON = Set.prototype.toArray;`
 * 
 * 多个类中的方法可以共用一个单独的函数。比如，Array类通常定义了一些内置方法，如果定义了一个类，它的实例是类数组的对象，则可
 * 以从Array.prototype中将函数复制至所定义的类的原型对象中。如果以经典的面向对象语言的视角来看JavaScript的话，把一个类的
 * 方法用到其他的类中的做法也称作“多重继承”（multiple inheritance）。然而，JavaScript并不是经典的面相对象语言，我更倾向于
 * 将这种方法重用更正式地称为“方法借用”（borrowing）。
 * 
 * 不仅Array的方法可以借用，还可以自定义泛型方法（generic method）。例9-9定义了泛型方法toString()和equals()，可以被Range、
 * Complex和Card这些简单的类使用。如果Range类没有定义equals()方法，可以这样借用。
 *     `Range.prototype.equals = generic.equals;`
 * 
 * 注意，generic.equals()只会执行浅比较，因此这个方法并不适用于其实例太复杂的类，它们的实例属性通过其equals()方法指代对象。
 * 同样需要注意，这个方法包含一些特殊情况的程序逻辑，以处理新增至Set对象中的属性。
 */
var generic = {
    toString: function() {
        // 返回一个字符串，这个字符串包含函数的名字（如果构造函数包含名字）以及所有非继承来的、非函数属性的名字和值。
        var s = '[';
        // 如果这个对象包含构造函数，且构造函数包含名字，这个名字会作为返回字符串的一部分
        // 需要注意的是，函数的名字属性是非标准的，并不是所有的环境都可用
        if (this.constructor && this.constructor.name)
            s += this.constructor.name+ ": ";
        
        // 枚举所有非继承且非函数的属性
        var n = 0;
        for (var name in this) {
            // 跳过继承来的属性
            if (!this.hasOwnProperty(name)) continue;
            var value = this[name];
            // 跳过方法
            if (typeof name === "function") continue;
            if (n++) s += ", ";
            s += name+ ": " +value;
        }
        return s +"]";
    },

    // 通过比较this和that的构造函数和实例属性来判断它们是否相等
    // 这种方法只适用于那些实例属性是原始值的情况，原始值可以通过“===”来比较
    // 这里还处理了一种特殊情况，就是忽略由Set类添加的特殊属性
    equals: function(that) {
        if (that == null) return false;
        if (this.constructor !== that.constructor) return false;
        for (var name in this) {
            if (name === "|*objectid*|") continue;          // 跳过特殊属性
            if (!this.hasOwnProperty(name)) continue;       // 跳过继承属性
            if (this[name] !== that[name]) return false;    // 比较是否相等
        }
        return true;
    }
}


/**
 * 私有状态
 * 
 * 在经典的面向对象编程中，经常需要将对象的某个状态封装或隐藏在对象内，只有通过对象的方法才能访问这些状态，对外只暴露
 * 一些重要的状态变量可以直接读写。为了理解这个目的，类似Java的编程语言允许声明类的“私有”实例字段，这些私有实例字段只
 * 能被类的实例方法访问，且在类的外部是不可见的。
 * 
 * 我们可以通过将变量（或参数）闭包在一个构造函数内类模拟实现私有实例字段，调用构造函数会创建一个实例。为了做到这一点，
 * 需要在构造函数内部定义一个函数（因此这个函数可以访问构造函数内部的参数和变量），并将这个函数赋值给新创建对象的属性。
 * 
 * 例9-10展示了对Range类的另一个封装，新版的类的实例包含from()和to()方法用以返回范围的端点，而不是用from和to属性来
 * 获取端点。这里的from()和to()方法是定义在每个Range对象上面的，而不是原型中继承来的。其他的Range方法还是和之前一样
 * 定义在原型中，但获取端点的方式从之前直接从属性读取变成了通过from()和to()方法来读取。
 */
function Range(from,  to) {
    // 不要将端点保存为对象的属性，相反，定义存取器函数来返回端点的值，这些值都保存在闭包中
    this.from = function() {return from;};
    this.to = function() {return to;};
}

Range.prototype = {
    constructor: Range,
    includes: function(x) { return this.from() <= x && this.to() >= x; },
    foreach: function(f) { for(var i=Math.ceil(this.from()), to=this.to();i<=to;i++) f(i); },
    toString: function() { return '{' +this.from()+ '...' +this.to()+ '}'; }
}

/**
 * 这个新的Range类定义了用以读取范围端点的方法，但没有定义设置端点的方法或属性。这让类的实例看起来是不可能修改的，如果
 * 正确的话，一旦创建Range对象，端点数据就不可修改了。除非用到ECMAScript 5中的某些特性，但from和to属性依然是可写的，
 * 并且Range对象实际上并不是真正不可修改的。
 * 
 * 但需要注意的是，这种封装技术造成了更多系统开销。使用闭包来封装类的状态的类一定会比不使用封装的状态变量的等价类运行
 * 速度更慢，并占用更多内存。
 */
var r = new Range(1,5);
r.from = function() {return o;}; //通过方法替换来修改它


/**
 * 构造函数的重载和工厂方法
 * 
 * 有时候，我们希望对象的初始化有很多种方法。比如，我们想通过半径和角度（极坐标）来初始化一个Complex对象，而不是通过
 * 实部和虚部来初始化，或者通过元素组成的数组来初始化一个Set对象，而不是通过传入构造函数的参数来初始化它。
 * 
 * 有一个方法可以实现，通过重载（overload）这个构造函数让它根据传入参数的不同来执行不同的初始化方法。
 * 
 * 这段代码定义的NewSet()构造函数可以显式将一组元素作为参数列表传入，也可以传入元素组成的数组。但是这个构造函数有
 * 多义性，如果集合的某个成员是一个数组就无法通过这个构造函数来创建这个集合了（为了做到这一点，需要首先创建一个空
 * 集合，然后显式调用add()方法）。
 */
function NewSet() {
    this.values = {};
    this.n = 0;

    // 如果传入一个类数组对象，将这个元素添加到集合中，否则，将所有的参数都添加至集合中
    if (arguments.length == 1 && isArrayLike(arguments[0]))
        this.add.apply(this, arguments[0]);
    else if (arguments.length > 0)
        this.add.apply(this, arguments);
}

NewSet.prototype = Set.prototype;

function isArrayLike(o){
    if (o                                          // 非null或undefined
     && typeof o === "object"                      // o是对象
     && isFinite(o.length)                         // o.length是有限数值
     && o.length >=0                               // o.length是非负值
     && o.length === Math.floor(o.length)          // o.length是整数
     && o.length < 4294967296){                    // o.length < 2^32
        return true;                               // o是类数组对象
    }else{
        return false;
    }
}

// 下面这个工厂方法用来通过数组初始化Set对象
Set.fromArray = function(a) {
    var s = new Set();
    s.add.apply(s, a);
    return s;
}

/**
 * 可以给工厂方法定义任意的名字，不同名字的工厂方法用以执行不同的初始化。但由于构造函数是类的公有标识，因此每个类只能
 * 有一个构造函数。但这并不是一个“必须知遵守”的规则。在JavaScript中是可以定义多个构造函数来继承自同一个原型对象，如果
 * 这样做的话，由这些构造函数的任意一个所创建的对象都属于同一类型。并不推荐这种技术，但下面的示例代码使用这种技术定义了
 * 该类型的一个辅助构造函数。
 */
// Set类的一个辅助构造函数
function SetFromArray(a) {
    // 通过以函数的形式调用Set()来初始化这个新对象
    // 将a的元素作为参数传入
    Set.apply(this, a);
}
SetFromArray.prototype = Set.prototype;

var s = new SetFromArray([1,2,3]);
s instanceof Set;                       // true

/**
 * 在使用极坐标来初始化复数的例子中，实际上并没有看到有函数重载。代表复数两个维度的数字都是浮点数，除非给构造函数传入
 * 第三个函数，否则构造函数无法识别到底传入的是极坐标还是直角坐标参数。相反，可以写一个工厂方法 —— 一个类的方法用以
 * 返回类的一个实例。下面的例子即是使用工厂方法来返回一个使用极坐标初始化的Complex对象。
 */
Complex.polar = function(r, theta) {
    return new Complex(r*Math.cos(theta), r*Math.sin(theta));
}


/**
 * 子类
 * 
 * **方法链** —— 在面向对象编程中，类B可以继承自另一个类A。我们将A称为父类（superclass），将b称为子类（subclass）。B的实例从A继承
 * 了所有实例方法。类B可以定义自己的实例方法，有些方法可以重载类A中的同名方法，如果B的方法重载了A中的方法，B中的重载
 * 方法可能会调用A中的重载方法，这种做法称为“方法链”（method chaining）。
 * 
 * **构造函数链** —— 同样，子类的构造函数B()有时需要调用父类的构造函数A()，这种方法称为“构造函数链”（constructor chaining）。子类可以
 * 有子类，当涉及类的层次结构时，往往需要定义抽象类（abstruct class）。抽象类中定义的方法没有实现。抽象类中的抽象方法
 * 是在抽象类的具体子类中实现的。
 * 
 * 在JavaScript中创建子类的关键之处在于，采用合适的方法对原型对象进行初始化。如果类B继承自类A，B.prototype必须是
 * A.prototype的后辈。B的实例继承自B.prototype，后者同样也继承自A.prototype。本节将会对刚才提到的子类相关的术语做
 * 一一讲解，还会介绍类继承的替代方案：“组合”（composition）。
 * 
 * 我们从例9-6中的Set类开始讲解，本节将会讨论：
 * - 如何定义子类
 * - 如何实现构造函数链并重载方法
 * - 如何使用组合来代替继承
 * - 如何通过抽象类从实现中提炼出接口
 */

 /**
  * 定义子类
  * 
  * JavaScript的对象可以从类的原型对象中继承属性（通常继承的是方法）。如果O是类B的实例，B是A的子类，那么O也一定从A中继承了属性。
  * 为此，首先要确保B的原型对象继承自A的原型对象。通过inherit()函数，可以这样来实现：
  */

function A() {};
function B() {};

B.prototype = inherit(A.prototype);   // 子类派生自父类
B.prototype.constructor = B;          // 重载继承来的constructor属性

typeof B;                // "function"
typeof B.prototype;      // "object"
typeof B.constructor;    // "function"

B instanceof Function;                           // true
B.constructor == Function.prototype.constructor; // true
     Function == Function.prototype.constructor; // true
Function instanceof Object;              // true
Function.constructor == B.constructor;   // true
  Object.constructor == B.constructor;   // true

/**
 * 这两行代码是在JavaScript中创建子类的关键。如果不这么做，原型对象仅仅是一个普通对象，它只继承自Object.prototype，这意味着
 * 你的类和所有的类一样是Object的子类。如果将这两行代码添加至defineClass()函数中，可以将它变成例9-11中的defineSubClass()函数
 * 和Function.prototype.extend()方法。
 * 
 * 例9-11：定义子类
 */
function defineSubClass(
    superclass,
    constructor,
    methods,
    statics
) {
    // 建立子类的原型对象
    constructor.prototype = inherit(superclass.prototype);
    constructor.prototype.constructor = constructor;
    // 像对常规类一样复制方法和类属性
    if (methods) extend(constructor.prototype, methods);
    if (statics) extend(constructor, statics);
    return constructor;
}

// 通过父类构造函数的方法来做到这一点
Function.prototype.extend = function (constructor, methods, statics) {
    return defineSubClass(constructor, methods, statics);
}

/**
 * 例9-12：SingletonSet：一个简单的子类
 * 
 * 不使用defineSubClass()函数如何“手动”实现子类。这里定义了Set的子类SingletonSet。SingletonSet是一个特殊的集合，
 * 它是只读的，而且含有单独的常量成员。
 */
// 构造函数
function SingletonSet(member){
    this.member = member;          // 集合中唯一的成员
}

// 创建一个原型对象，这个原型对象继承自Set的原型
SingletonSet.prototoype = inherit(Set.prototype);

// 给原型添加属性
// 如果有同名的属性就覆盖Set.prototype中的同名属性
extend(SingletonSet.prototype, {
    // 设置合适的constructor属性
    constructor: SingletonSet,

});

