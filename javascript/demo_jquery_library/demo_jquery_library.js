/**
 * jQuery类库
 */



/**
 * jQuery基础
 * 
 * jQuery类库定义了一个全局函数：jQuery()；别名：$。（这时jquery在全局命名空间中定义的唯一两个变量。如果你在自己的代码中有使用$作为变量，
 * 或者引入了Prototype等使用$作为全局变量的类库，调用jQuery.noConflict()来释放$变量，让其指向原始值。）
 * 
 * 这个拥有两个名字的全局方法，是jQuery的核心查询方法。这个方法返回的值是表示零个或多个DOM元素，这就是jQuery对象。
 * 注意，jQuery()是工厂函数，不是构造函数，它返回一个新创建的对象，但没有和new关键字一起使用。jQuery对象还定义了很多方法，可以用来操作它们表示的这组元素。
 */
// 获取文档中所有的<div>元素
var divs = $("div");

/**
 * 下面的css()方法操作的jQuery对象是由 $() 返回的，css()方法返回的也是这个对象，因此可以继续使用show()方法，这就是链式调用，很简洁紧凑。
 * 在jQuery编程中，链式调用这个习惯用语很普遍。
 */
// 获取所有拥有details类的p元素，将其高亮显示，并将其中隐藏的p元素快速显示出来
$("p.details").css("background-color", "yellow").show("fast");

// 找到文档中拥有“clicktohide” CSS类的所有元素，并给每个元素都注册一个事件处理函数。
// 当用户单击元素时，会调用事件处理程序，使得该元素缓慢向上收缩，最终消失。
$(".clicktohide").click(function() { $(this).slideUp("slow"); });

/**
 * jQuery函数
 * 
 * 本章讲述的jQuery是1.4.2版本。
 * 
 * jQuery()方法（即$()）有4种不同的调用方式。
 * - 传递CSS选择器（字符串）给$()方法。当通过这种方式调用时，$()方法会返回当前文档中匹配该选择器的元素集。jQuery支持大部分CSS3选择器语法，还支持一些自己的扩展语法。
 *      19.8.1节将详细阐述jQuery选择器语法。还可以将一个元素或jQuery对象作为第二个参数传递给$()方法，这时返回的是该特定元素或元素集的子元素中匹配选择器的部分。
 *      这第二个参数是可选的，定义了元素查询的起始点，经常称为上下文（context）。
 * - 传递一个Element、Document或Window对象给$()方法。在这种情况下，$()方法只须简单地将该Element、Document或Window对象封装成jQuery对象并返回。
 *      这样可以使得能用jQuery方法来操作这些元素而不用使用原生DOM方法。
 *      例如，在jQuery程序中，经常可以看见$(Document)、$(this)。jQuery对象可以表示文档中的多个元素，也可以传递一个元素数组给$()方法。这时，返回的jQuery对象表示数组中的元素集。
 * - 传递HTML文本字符串给$()方法。在这种调用方式下，jQuery会根据传入的文本创建好HTML元素并封装为jQuery对象返回。
 *      jQuery不会将刚创建的元素自动插入到文档中，可以使用19.3节描述的jQuery方法来轻松地将元素插入想要的地方。
 *      注意：在这种调用方式下，不可传入纯文本，因为jQuery会把纯文本当成CSS选择器来解析。当使用这种调用风格时，传递给$()方法的字符串必须至少包含一个带有尖角括号的HTML标签。
 *      $()还可以接受可选的第二参数。可以传递Document对象来指定与创建元素相关联的文档。（比如，当创建的元素需要插入iframe元素时，需要显式指定该iframe的document对象。）
 *      第二个参数还可以是object对象。此时，假设该对象的属性表示HTML属性的键/值对，这些属性将设置到新创建的对象上。第二参数对象的属性名是“css”、“html”、“text”、“width”、
 *      “height”、“offset”、“val”或“data”，或者属性名是jQuery事件处理程序注册方法名时，jQuery将调用新创建元素上的同名方法，并传入属性值。
 *      （css()、html()、text()等方法将在19.2节讲述，事件处理程序注册方法将在19.4节讲述。）
 * - 传递一个函数给$()方法。此时，当文档加载完毕且DOM可操作时，传入的函数将被调用。这是，例13-5中onload()函数的jQuery版本。在jQuery程序中，在jQuery()里定义一个匿名函数非常常见。
 *      传递给jQuery()的函数在被调用时，this指向document对象，唯一的参数指向jQuery函数。这意味着可以释放全局的$()函数，但在内部依旧可以延续该习惯。
 *      通过$()注册的函数将在DOMContentLoaded事件触发时由jQuery触发。当浏览器不支持该事件时，会在load事件触发时由jQuery触发。这意味着文档已经解析完毕，但图片等外部资源
 *      有可能还未加载。如果在DOM准备就绪后再传递函数给$()，传递的函数会在$()返回之前立刻调用。
 * 
 * jQuery类库还是用jQuery()函数（即$()函数）作为其命名空间，在下面定义了不少工具函数和属性。
 * 上面提到的jQuery.noConflict()函数就是其中一个工具函数。还包括用于通用遍历的jQuery.each()，以及用来解析JSON文本的jQuery.parseJSON()。
 * 19.7节列举了这些通用的工具函数，jQuery的其他函数在本章中都会提及。
 */
// 第三种使用方式，第二参数传递object对象
var img = $("<img/>", {          // 新建一个<img>元素
    src: "url",                  // HTML属性
    css: { borderWidth: 5 },     // CSS样式
    click: function() {/** 事件处理程序，操作 */}
});

// 第四种使用方式
jQuery(function() {              // 文档加载完毕时调用
    // 所有jQuery代码放在这里
});
// 有时可以看见$(f)的老式和完整写法
function f() {}
$(document).ready(f);            // 等同于 $(f)
// 释放全局的$()函数，唯一的参数指向jQuery函数
jQuery.noConflict();             // 还原$()为原始值
jQuery(function($) {             // 让$成为jQuery对象的局部别名
    // jQuery代码
});

/**
 * jQuery术语
 * 
 * “jQuery函数”
 * “jQuery对象”
 * “选中元素”
 * “jQuery函数”
 * “jQuery方法”
 */

/**
 * 查询与查询结果
 * 
 * $()的返回值是一个jQuery对象。jQuery对象是类数组，它们拥有length属性和介于0~length-1之间的数值属性。这意味着可以用标准的数组标识方括号来访问jQuery对象的内容。
 *      $("body").length     // => 1: 文档只有一个body元素
 *      $("body")[0]         // 等于document.body
 * 
 * 如果不想把数组标识用在jQuery对象上，可以使用size()方法来替代length属性，用get()方法替代方括号索引。可以使用toArray()方法来讲jQuery对象转化为真实数组。
 * 除了length属性，jQuery对象还有3个挺有趣的属性。
 * selector属性是创建jQuery对象时的选择器字符串（如果有的话）。
 * context属性是上下文对象，是传递给$()方法的第二参数，没有传递的话，默认是Document对象。
 * jquery属性，所有jQuery对象都有，检测该属性是否存在可以简单快捷地将jQuery对象与其他类数组对象区分开来。jquery属性值是字符串形式的jQuery版本号。
 *      // 获取 document body 中所有的 <script> 元素
 *      var bodyscripts = $("script", document.body);
 *      bodyscripts.selector;       // => "script"
 *      bodyscripts.context;        // => document.body
 *      bodyscripts.jquery;         // => "1.4.2"
 * 
 * $()与querySelectorAll()方法类似，两者都用CSS选择器作为参数，并且返回类数组对象来存放匹配选择器的元素。在支持querySelectorAll()的浏览器中，jQuery实现
 * 会调用它，然而，在代码中使用$()代替querySelectorAll()依旧是很好的选择。
 * - querySelectorAll()在新近的浏览器中才实现。$()在新、老浏览器中都能工作
 * - jQuery可以通过手动实现选择，因此$()支持的CSS3选择器可以用在所有浏览器中，而不仅仅是那些支持CSS3的浏览器。
 * - $()返回的类数组对象（jQuery对象）比querySelectorAll()返回的类数组对象（NodeList）更有用。
 * 
 * 想要遍历jQuery对象中的所有元素时，可以调用each()方法来代替for循环。each()方法有点类似ECMAScript 5（ES5）中的forEach()数组方法。他接受一个回调函数作为
 * 唯一的参数，然后它对jQuery对象中的每一个元素（按照文档中的顺序）调用回调函数。回调函数作为匹配元素的方法来调用，因此在回调函数里this关键字指代Element对象。
 * each()方法还会将索引值和该元素作为第一个和第二个参数传递给回调函数。注意，this和第二参数都是原生文档元素，而不是jQuery对象；如果想使用jQuery方法来操作
 * 该元素，需要先用$()封装它。
 * jQuery的each()方法和forEach()有一个显著的区别：如果回调函数在任一个元素上返回false，遍历将在该元素后中止（这就像普通循环中使用break关键字一样）。each()
 * 返回调用自身的jQuery对象，因此它可以用于链式调用。
 * 下面是个例子（使用的prepend()方法将在19.3节阐述）：
 *      // 给文档中的div元素标号，从开始一直到div#last（包含边界）
 *      $("div").each(function(i, e) {    // 找到所有div元素然后遍历它们
 *          $(this).prepend(i + ": ");     // 在每个元素前面插入索引值
 *          if (this.id === "last") return false;   // 碰到#last元素时中止
 *      });
 * 尽管each()方法很强大，但用得并不多，因为jQuery方法通常隐式遍历匹配的元素集并操作它们。
 * 需要使用each()的典型场景是需要用不同的方式来操作匹配的元素。即便如此，也不总需要调用each()，因为jQuery的一些方法允许传递回调函数。
 * 
 * 在ES5数组方法规范化前，jQuery类库就已经存在了。jQuery定义了几个方法，其功能和ES5方法的功能类似。
 * jQuery的map()方法和Array.prototype.map()方法很相近。它接受回调函数作为参数，并为jQuery对象中的每一个元素都调用回调函数，同时将回调函数的返回值收集起来，
 * 并将这些返回值封装成一个新的jQuery对象返回。map()调用回调函数的方式和each()方法相同：元素作为this值和第二参数传入，元素的索引值作为第一参数传入。如果回调
 * 函数返回null或undefined，该值将被忽略，在本次回调中不会有任何新元素添加到新的jQuery对象中。
 * 如果回调函数返回数组或类数组对象（比如jQuery对象），将会扁平化它并将其中的元素一个个添加到新的jQuery对象中。
 * 注意：由map()返回的jQuery对象可以不包含文档元素，但它依旧可以像类数组对象一样使用。例如：
 *      // 找到所有标题元素，映射到它们的id，并转化为真实数组，然后排序
 *      $(":header").map(function() { return this.id; }).toArray().sort();
 * 
 * jQuery的index()方法，接受一个元素作为参数，返回值是该元素在此jQuery对象中的索引值，如果找不到的话，则返回-1。
 * 显然，受jQuery的典型风格影响，index()方法有多个重载版本。
 * 如果传递一个jQuery对象作为参数，index()方法会对该对象的第一个元素进行搜索。
 * 如果传入的是字符串，index()会把它当成CSS选择器，并返回该jQuery对象中匹配该选择器的一组元素中第一个元素的索引值。
 * 如果什么元素都不传入，index()方法返回该jQuery对象中第一个毗邻元素的索引值。
 * 
 * jQuery的is()方法，接受一个选择器作为参数，如果选中元素中至少有一个匹配该选择器时，则返回true。可以在each()回调函数中使用它，例如：
 *      $("div").each(function() {               // 对每个<div>元素
 *          if ($(this).is(":hidden")) return;   // 跳过隐藏元素
 *          // 对可见元素做点什么
 *      })
 */




/**
 * jQuery的getter和setter
 * 
 * jQuery对象上最简单、最常见的操作是获取（get）或设置（set）HTML属性、CSS样式、元素内容和位置高宽的值。首先，让我们对jQuery中的getter和setter方法有个概要理解：
 * - jQuery使用同一个方法既当getter用又做setter用，而不是定义一对方法。如果传入一个新值给该方法，则它设置此值；如果没指定值，则它返回当前值。
 * - 用作getter时，这些方法只会查询元素集中的第一个元素，返回单个值。（如果要遍历所有元素，请使用map()。）getter不会返回调用自身的jQuery对象，因此它只能出现在链式调用的末尾。
 * - 用作setter时，这些方法会给jQuery对象中的每一个元素设置值，然后返回该jQuery对象以方便链式调用。
 * - 用作setter时，这些方法经常接受对象参数。在这种情况下，该对象的每一个属性都指定一个需要设置的名/值对。
 * - 用作setter时，这些方法经常接受函数参数。在这种情况下，会调用该函数计算需要设置的值。调用该函数时的this值时对应的元素，第一个参数是该元素的索引值，当前值则作为第二参数传入。
 */

/**
 * 获取和设置HTML属性
 * 
 * attr()方法，用于HTML属性的getter/setter，它符合上面描述的概要理解中的每一条。
 * attr()处理浏览器的兼容性和一些特殊情况，还让HTML属性名和JavaScript属性名可以等同使用（当二者存在差异时）。
 * 例如，可以使用“for”也可以使用“htmlFor”，可以使用“class”也可以使用“className”。
 * 一个相关函数是removeAttr()，可用来从所有选中元素中移除某个属性。
 */
$("form").attr("action");                  // 获取第一个form元素的action属性
$("#icon").attr("src", "icon.gif");        // 设置src属性
$("#banner").attr({src: "banner.gif",      // 一次性设置4个值
                   alt: "Advertisement",
                   width: 720, height: 64});
$("a").attr("target", "_blank");           // 使所有链接在新窗口中打开
$("a").attr("target", function() {         // 使站内链接在本窗口打开，并且让
    if (this.host == location.host) return "_self";
    else return "_blank";                  // 非站内链接在新窗口中打开
});
$("a").attr({traget: function() {/* */}}); // 可以像这样传入函数
$("a").removeAttr("target");               // 让所有链接在本窗口中打开

/**
 * 获取和设置CSS属性
 * 
 * css()方法，和attr()方法很类似，只是css()方法作用于元素的CSS样式，而不是元素的HTML属性。
 * 在获取样式取值时，css()返回的是元素的当前样式（或称为“计算”样式，参考16.4节）：返回值可能来自style属性也可能来自样式表。注意：不能获取符合样式的值，比如“font”
 * 或“margin”。而应该获取单个样式的值，比如“font-weight”、“font-family”、“margin-top”或“margin-left”。
 * 在设置样式时，css()方法会将样式简单添加到该元素的style属性中。css()方法允许在CSS样式中使用连字符（“background-color”）或使用驼峰格式JavaScript样式名
 * （“backgroundColor“）。在获取样式时，css()会把数值转换成带有单位后缀的字符串返回。而在设置样式值时，则会将数值转化成字符串，在必要时添加“px”（像素）后缀。
 */
$("h1").css("font-weight");                // 获取第一个<h1>的字体重量
$("h1").css("fontWeight");                 // 也可以采用驼峰格式
$("h1").css("font");                       // 错误，不可获取符合样式
$("h1").css("font-variant", "smallcaps");  // 将样式设置在所有<h1>元素上
$("div.note").css("border",                // 设置符合样式是OK的
                  "solid black 2px");
$("h1").css({
    backgroundColor: "black",              // 一次设置多个样式
    textColor: "white",
    fontVariant: "small-caps",
    padding: "10px 2px 4px 20px",
    border: "dotted black 4px",
});
// 让所有<h1>的字体大小增加25%
$("h1").css("font-size", function(i, curval) {
    return Math.round(1.25 * parseInt(curval));
});

/**
 * 获取和设置CSS类
 * 
 * class属性值（在JavaScript中通过className访问）会被解析成为一个由空格分隔的CSS类名列表。通常，我们想要往列表中添加、删除某一项，或判断某一项是否在列表中，
 * 而不是将该列表替换为另一个。因此，jQuery定义了一些便捷方法用来操作class属性。
 * addClass()和removeClass()用来从选中元素中添加和删除类。
 * toggleClass()的用途是，当元素还没有某些类时，给元素添加这些类；反之，则删除。
 * hasClass()用来判断某类是否存在。
 * 
 * 注意：hasClass()不如addClass()、removeClass()、toggleClass()灵活。
 * hasClass()只能接受单个类名作为参数，并且不支持函数参数。当选中元素中的任意元素有指定CSS类时，hasClass()返回true；如果任何元素都没有，则返回false。
 * 19.1.2节描述的is()方法更灵活，可用来做同样的事。
 * 
 * jQuery的这些方法和16.5节讲的classList方法类似，只是jQuery的方法可以工作在所有浏览器中，而不仅仅是那些支持HTML5 classList属性的浏览器。
 * 此外，毫无疑问，jQuery的方法可以操作多个元素并支持链式调用。
 */
// 添加CSS类
$("h1").addClass("hilite");                 // 给所有<h1>元素添加一个类
$("h1+p").addClass("hilite first");         // 给<h1>后面的<p>添加两个类
$("section").addClass(function(n) {         // 传递一个函数用来给匹配的
    return "section" + n;                   // 每一个元素添加自定义类
});

// 删除CSS类
$("p").removeClass("hilite");               // 从所有<p>元素中删除一个类
$("p").removeClass("hilite first");         // 允许一次删除多个类
$("section").removeClass(function(n) {      // 从元素中删除自定义类
    return "section" + n;
});
$("div").removeClass();                     // 删除所有<div>中的所有类

// 切换CSS类
$("tr:odd").toggleClass("oddrow");          // 如果该类不存在则添加，反之，删除
$("h1").toggleClass("big blod");            // 一次切换两个类
$("h1").toggleClass(function(n) {           // 切换用函数计算出来的类
    return "big blod h1-" + n;
});
$("h1").toggleClass("hilite", true);        // 作用类似addClass
$("h1").toggleClass("hilite", false);       // 作用类似removeClass

// 检测CSS类
$("p").hasClass("first");                   // 是否所有<p>元素都有该类
$("#lead").is(".first");                    // 功能和上面类似
$("#lead").is(".first.hilite");             // is()比hasClass更灵活

/**
 * 获取和设置HTML表单值
 * 
 * val()方法用来设置和获取HTML表单元素的value属性，还可用于获取和设置复选框，单选框以及<select>元素的选中状态
 */
$("#surname").val();                        // 获取 surname 文本域的值
$("#usstate").val();                        // 从 <select> 中获取单一值
$("select#extras").val();                   // 从 <select multiple> 中获取一组值

$("input:radio[name=ship]:checked").val();  // 获取选中的单选按钮的值
$("#email").val("Invalid email address");   // 给文本域设置值

$("input:checkbox").val(["opt1", "opt2"]);  // 选中带有这些名字或值的复选框
$("input:text").val(function() {            // 重置所有文本域为默认值
    return this.defaultValue;
});

/**
 * 获取和设置元素内容
 * 
 * text()和html()方法用来获取和设置元素的纯文本或HTML内容。
 * 当不带参数调用时，text()返回所有匹配元素的所有子孙文本节点的纯文本内容。该方法甚至可以工作在不支持textContent或innerText属性（参考15.5.2节）的浏览器中。
 * 如果不带参数调用html()方法，它会返回第一个匹配元素的HTML内容。jQuery使用innerHTML属性来实现：x.html()和x[0].innerHTML一样高效。
 * 
 * 如果传入字符串给text()或html()，该字符串会用做该元素的纯文本或格式化的HTML文本内容，它会替换掉所有存在的内容。和其他setter方法一样，我们可以传入函数，该函数
 * 用来计算出表示新内容的字符串。
 */
var title = $("head title").text();         // 获取文档标题
var headline = $("h1").html();              // 获取第一个<h1>元素的html
$("h1").text(function(n, current) {         // 给每一个标题添加章节号
    return "§" + (n+1) + ": " + current;
});

/**
 * 获取和设置元素的位置高宽
 * 
 * 在15.8节中我们知道通过一些技巧可以正确获取元素的大小和位置，尤其当浏览器不支持 getBoundingClientRect() （参考15.8.2节） 时。使用jQuery方法可以更简单地获取元素的
 * 大小和位置，并兼容所有浏览器。注意，本节描述的所有方法都是getter，只有少部分可用作setter。
 * 
 * offset()，获取或设置元素的位置。该方法相对文档来计算位置值，返回一个对象，带有left和top属性，用来表示X和Y坐标。如果传入带有这些属性的对象给该方法，它会给元素设置
 * 指定的位置。在必要的时候，会设置CSS position属性来使得元素可定位。
 */
var elt = $("#sprite");                     // 获取需要移动的元素
var position = elt.offset();                // 获取当前位置
position.top += 100;                        // 改变Y坐标
elt.offset(position);                       // 设置新位置
// 将所有 <h1> 元素向右移动，移动的距离取决于它们在文档中的位置
$("h1").offset(function(index, curpos) {
    return {left: curpos.left + 25*index, top: curpos.top};
});
/**
 * position()方法很像offset()方法，但它只能用作getter，它返回的元素位置是相对于其偏移父元素的，而不是相对与文档的。在15.8.5节中，我们知道任何元素都有一个offsetParent
 * 属性，其位置是相对的。定位元素总会当作其子孙元素的偏移父元素，但在某些浏览器下，也会把表格单元等其他元素当成偏移父元素。jQuery只会把定位元素作为偏移父元素，jQuery
 * 对象的offsetParent()方法则会把每个元素映射到最近的定位祖先元素或<body>元素。
 * 注意这些方法的名字并不很恰当：offset()返回元素的绝对位置，其相对于文档的坐标来表示。而position()则返回相对于元素的offsetParent()的偏移量。
 * 
 * 用于获取元素宽度的getter有3个，获取高度的也有3个。
 * width()和height()方法返回基本的宽度和高度，不包含内边距、边框、外边距。
 * innerWidhth()和innerHeight()返回元素的宽度和高度，包含内边距的宽度和高度（“内”表示这些方法度量的是边框以内的尺寸）。
 * outerWidth()和outerHeight()通常返回的是包含元素内边距和边框的尺寸。如果两个方法中的任意一个传入true值，它们还可以返回包含元素外边距的尺寸。
 */
var body = $("body");
var contentWidth = body.width();
var paddingWidth = body.innerWidth();
var borderWidth = body.outerWidth();
var marginWidth = body.outerWidth(true);

var padding = paddingWidth - contentWidth;  // 左内边距和右内边距的和
var borders = borderWidth - paddingWidth;   // 左边框和右边框的和
var margins = marginWidth - borderWidth;    // 左外边框和右外边框的和
/**
 * width()和height()方法拥有其他4个方法（以inner和outer开头的方法）所没有的特性。首选，当jQuery对象的第一个元素是Window是Document对象时，width()和height()返回的
 * 是窗口的视口大小或文档的整体尺寸。其他方法只适用于元素，不适用于窗口和文档。
 * 
 * 另一个特性是width()和height()方法可以是setter也可以是getter。如果传递值给这些方法，它们会给jQuery对象中的每一个元素设置宽度和高度。（注意：不能给Window和Document
 * 对象设置宽度或高度。）如果传入数值，会把它当成单位为像素的尺寸。如果传入字符串，会把它用作CSS的width和height属性值，因此可以使用任何CSS单位。
 * 
 * 最后，和其他setter类似，可以传入函数，用来计算要设置的宽度或高度。
 * 
 * 在width()和height()的getter和setter行为之间有个小的不对称。用作getter时，这些方法返回元素的内容盒子的尺寸，不包括内边距、边框和外边距。用作setter时，它们只是简单
 * 的设置CSS的width和height属性。默认情况下，这些属性也指定内容盒子的大小。但是，如果一个元素的CSS box-sizing属性设置为border-box，则width()和height()方法设置的
 * 尺寸包括内边距和边框。对于使用content-box作为盒模型的元素e，调用 $(e).width(x).width 返回x值。然而，对于使用border-box模型的元素，这种情况下一般不会返回x值。
 * 
 * 与位置尺寸相关的最后一对jQuery方法是scrollTop()和scrollLeft()，可获取和设置元素的滚动条位置。这些方法可用在Window对象以及Document元素上，当用在Document对象上时，
 * 会获取或设置存放该Document的Window对象的滚动位置。与其他setter不同，不可传递函数给scrollTop()或scrollLeft()。
 * 可使用scrollTop()或scrollLeft()作为getter和setter，与height()方法一起，来定义一个方法：根据指定的页面数向上或向下滚动窗口。
 */
function page(n) {
    var w = $(window);                     // 将Window对象封装成jQuery对象
    var pagesize = w.height();             // 得到页面的大小
    var current = w.scrollTop();           // 得到当前滚动条的位置
    w.scrollTop(current + n * pagesize);   // 设置新的滚动条位置
}

/**
 * 获取和设置元素数据
 * 
 * jQuery定义了一个data()的getter/setter方法，可用来设置或获取与文档元素、Document或Window对象相关联的数据。
 * 可以将数据与任意元素关联是很重要和强大的一项能力：这时jQuery的事件处理程序注册和效果队列机制的基础，有时，我们还会在自己的代码中使用data()方法。
 * 需将数据与jQuery对象中的元素关联，传递名称和值两个参数给data()方法即可。
 * 还可以传递一个对象给data() setter，此时，该对象的每一个属性都将用作名值对，用来与jQuery对象的元素关联。
 * 注意，传递对象给data()时，该对象的属性将替换掉与元素相关联的旧数据。
 * 与很多setter方法不同，data()方法不接受函数参数。当将函数作为第二参数传递给data()时，该函数会存储，就和其他值一样。
 * 
 * 当然，data()方法也可以做getter。当不带参数调用时，它会返回一个对象，含有与jQuery对象中的第一个元素相关联的所有名值对。
 * 当传入一个字符串参数调用data()时，它会返回对于第一个元素与该字符串参数相关联的数据值。
 * 
 * removeData()方法用来从元素中删除数据。（使用data()设置值为null或undefined和实际上删除该值不是同一回事。）
 * 如果传递字符串给removeData()，该方法会删除元素中与该字符串相关联的值。
 * 如果不带参数调用removeData()，它会删除与元素相关联的所有数据。
 * 
 * jQuery的数据框架没有将元素数据当做元素的属性来存储，但它的确需要给元素添加一个特殊属性用来与数据关联。
 * 由于某些浏览器不允许添加属性到<applet>、<object>和<embed>元素中，因此jQuery根本不允许给这些类型的元素关联数据。
 */
$("div").data("x", 1);                      // 设置一些数据
$("div.nodata").removeData("x");            // 删除一些数据
var x = $("#mydiv").data("x");              // 获取一些数据

// 工具函数形式。给单一元素e关联数据，使用data()的方法形式，也可以使用函数形式
$(e).data("x", 1);
$.data(e, "x", 1);




/**
 * 修改文档结构
 */

/**
 * 插入和替换元素
 * 
 * append()、prepend()、before()、after()、replaceWith()，这些方法都接受一个参数，用于指定需要插入或替换文档中的内容。
 * 该参数可以是用于指定新内容的纯文本或HTML字符串，也可以是jQuery对象、元素或文本节点。
 * 根据调用的方法不同，会在选中元素的里面、前面、或后面位置中插入内容。如果待插入的内容是已存在与文档中的元素，会从当前位置移走它。如果它需要插入多次，
 * 在必要时会复制该元素。这些方法都返回调用自身的jQuery对象。
 * 注意，在replaceWith()运行后，该jQuery对象中的元素将不再存在于文档中。
 * 这些方法都可以接收函数参数，用来计算需要插入的值。和平常一样，如果传入函数，该函数会为每个选中元素调用一次。this值指向该元素，在jQuery对象中元素的
 * 索引值作为第一参数。对于append()、prepend()、replaceWith()，第二参数将是该元素当前内容的HTML字符串形式。对于before()after()，该函数在调用时
 * 没有第二参数。
 */
$("#log").append("<br/>" + message);        // 在 #log 元素的结尾处添加内容
$("h1").prepend("§");                       // 在每个<h1>元素的起始处添加章节标识
$("h1").before("<hr/>");                    // 在每个<h1>元素的前面添加水平线
$("h1").after("<hr/>");                     // 在每个<h1>元素的后面添加水平线
$("hr").replaceWith('<br/>');               // 替换<hr/>元素为<br/>
$("h2").each(function() {                   // 将<h2>替换为<h1>，保持内容不变
    var h2 = $(this);
    h2.replaceWith("<h1>" + h2.html() + "</h1>");
});
// after() 和 before()也可用在文本节点上
// 这是给每个<h1>的开头添加章节标识的另一种方法
$("h1").map(function() {
    return this.firstChild;
}).before("§");
/**
 * 上面演示的5个方法都在目标元素上调用，并传入需要插入的内容作为参数。
 * 这5个方法中的每一个都可以找到另一个方法来实现差不多一样的功能。只要采用不同的方式操作即可：在内容上调用，并传入目标元素作为参数。
 * 
 * 操作                             $(target).method(content)        $(content).method(target)
 * 在目标元素的结尾处插入内容         append()                         appendTo()
 * 在目标元素的起始处插入内容         prepend()                        prependTo()
 * 在目标元素的后面插入内容           after()                          insertAfter()
 * 在目标元素的前面插入内容           before()                         insertBefore()
 * 将目标元素替换为内容              replaceWith()                    replaceAll()
 * 
 * 在上面的例子代码中演示的方法在上表第二列中，第三列中的方法会在下面演示。要理解这些方法对，有几个重要事项：
 * - 如果传递字符串给第二列中的方法，会把它当做需要插入的HTML字符串。如果传递字符串给第三列中的方法，会把它当做选择器，用来标识目标元素。
 *      （也可以直接传入jQuery对象、元素或文本节点来指定目标元素。）
 * - 第三列中的方法不接受函数参数，第二栏中的方法可以。
 * - 第二列中的方法返回调用自身的jQuery对象。该jQuery对象中的元素有可能有新内容或新兄弟节点，但这些元素自身并没有修改。第三列中的方法在
 *      插入的内容上调用，返回一个新的jQuery对象，表示插入操作后的新内容。特别注意，当内容被插入到多个地方时，返回的jQuery对象将为每一个
 *      地方保留一个元素。
 * 
 * 上面列举了不同点，下面的代码将实现与上面的代码一样的操作，使用的是第三列中的方法来替代第二列中的。
 * 注意，在第二行的代码中不能传入纯文本（不带任何<>括号来标识它为HTML）给$()方法 —— 它被当做选择器。因此，必须显式创建需要插入的文本节点。
 */
$("<br/> + message").appendTo("#log");       // 添加html到#log中
$(document.createTextNode("§")).prependTo("h1"); // 给所有<h1>添加文本节点
$("<hr/>").insertBefore("h1");               // 在所有<h1>前面插入水平线
$("<hr/>").insertAfter("h1");                // 在所有<h1>后面插入水平线
$("<br/>").replaceAll("hr");                 // 将<hr/>替换<br/>

/**
 * 复制元素
 * 
 * 如果插入的元素已经是文档的一部分，这些元素只会简单地移动而不是复制到新位置。如果元素到插入不止一个位置，jQuery在需要时会复制元素，但是
 * 当只插入一个位置时，是不会进行复制操作的。如果想复制元素到新位置而不是移动它，必须首先用clone()方法来得到一个副本。clone()创建并返回每
 * 一个选中元素（包含元素所有子孙）的一个副本。
 * 返回的jQuery对象的元素还不是文档的一部分，可以用上一节中的方法将其插入文档中。
 * 
 * clone()不会复制事件处理程序（见19.4节）和与元素关联的其他数据（见19.2.7节）。如果想复制这些额外的数据，请传入true参数。
 */
// 给文档结尾添加一个带有“linklist” id的新div
$(document.body).append('<div id="linklist"><h1>List of Links</h1></div>');
// 将文档中的所有链接复制并插入该新div中
$("a").clone().appendTo("#linklist");
// 在每一个链接后面插入<br/>元素，使其以独立行显示
$("#linklist > a").after("<br/>");

/**
 * 包装元素
 * 
 * 在一个或多个元素中包装新元素。
 * wrap()包装每一个选中元素。
 * wrapInner()包装每一个选中元素的内容。
 * wrapAll()则将选中元素作为一组来包装。
 * 这些方法通常传入一个新创建的包装元素或用来包装元素的HTML字符串。如果需要，HTML字符串可以包含多个嵌套元素，但必须是单个最内层的元素。
 * 如果传入函数给这些方法，它会在每个元素的上下文中调用一次，this指向该元素，元素的索引值是唯一参数，应该返回需要返回表示包装元素的字符串、Element或jQuery对象。
 */
// 用<i>元素包装所有<h1>元素
$("h1").wrap(document.createElement("i"));   // 产生<i><h1> ... </h1></i>
// 包装所有<h1>的内容，使用字符串参数更简单
$("h1").wrapInner("<i/>");                   // 产生<h1><i> ... </i></h1>
// 将第一个段落包装在一个锚点和div里
$("body>p:first").wrap('<a name="lead"><div class="first"></div></a>');
// 将所有其它段落包装在另一个div里；提前到第一个<p>元素的位置；
$("body>p:not(:first)").wrapAll("<div class='rest'></div>");
// 会将所有除第一个<p>元素以外的所有<p>元素包装在一个<div>里，且位置为第一个<p>元素的位置
// p:first-child，选择作为第一个的<p>元素，且存在父元素；
// https://www.quanzhanketang.com/cssref/trycss_sel_firstchild.html?filename=trycss_sel_firstchild
// p:first，选择第一个<p>元素，jQuery特有，无该CSS伪类选择器
// https://baijiahao.baidu.com/s?id=1614936474708772392&wfr=spider&for=pc
// $("p:not(:first)").wrapAll("<div class='rest'></div>");

/**
 * 删除元素
 * 
 * empty()会删除每个选中元素的所有子节点（包括文本节点），但不会修改元素自身。
 * remove()方法会从文档中移除选中元素（以及所有元素的内容）。通常不带参数调用remove()，此时会从文档中移除jQuery对象中的所有元素。然而，如果传入一个参数，
 *  该参数会被当成选择器，jQuery对象中只有匹配该选择器的元素才会被移除。（如果只想将元素从选中元素集中移除，而不需要从文档中移除时，请使用filter()方法，该
 *  方法在19.8.2节讲述。）注意，将元素重新插入文当前，移除操作是没有必要的：简单地将其插入新位置，就会移除它们。
 * 
 * remove()方法会移除所有事件处理程序（见19.4节）以及可能绑定到被移除元素上的其他数据（见19.2.7节）。
 * detach()方法和remove()方法类似，但不会移除事件处理程序和数据。想临时从文档中移除元素以便后续再次插入时，detach()会更有用。
 * unwrap()方法可以用来实现元素的移除，其方式是wrap()或wrapAll()方法的反操作：移除每一个选中元素的父元素，不影响选中元素及其兄弟节点。也就是说，对于每一个
 *  选中元素，它替换该元素为父节点的父节点的子节点。与remove()、detach()不同，unwrap()不接受可选的选择器参数。
 */



/**
 * 使用jQuery处理事件
 * 
 * 在17章我们知道，处理事件时有一个难点是IE（IE9以下）实现了一个与其他所有浏览器不同的事件API。为了解决这一难点，jQuery定义了一个统一事件API，可工作在所有
 * 浏览器中。jQuery API具有简单的形式，比标准或IE的事件API更容易使用。jQuery API还具有更复杂、功能更齐全的形式，比标准API更强大。
 */

/**   
 * 事件处理程序的简单注册
 * 
 * jQuery定义了简单的事件注册方法，可用于常用和普适的每一个浏览器事件。比如，给单击事件注册一个事件处理程序，只要调用click()方法：
 *      // 单击任意<p>时，使其背景变成灰色
 *      $("p").click(function() { $(this).css("background-color", "grey"); })
 * 
 * 调用jQuery的事件注册方法可以给所有选中元素注册处理程序。很明显，这比使用addEventListener()或attachEvent()一次注册一个事件处理程序简单的多。
 * 
 * 下面是jQuery定义的简单事件注册方法：
 * blur()        focusin()        mousedown()       mouseup()
 * change()      focusout()       mouseenter()      resize()
 * click()       keydown()        mouseleave()      scroll()
 * dbclick()     keypress()       mousemove()       select()
 * error()       keyup()          mouseout()        submit()
 * focus()       load()           mouseover()       unload()
 * 
 * 这些注册方法大部分都用于在第17章已经熟悉的常见事件类型。…… ……
 * 
 * hover()方法用来给 mouseenter() 和 mouseleave() 事件注册处理程序。调用hover(f, g)就和调用mouseenter(f)然后调用mouseleave(g)一样。
 * 如果传入一个参数给hover()，该参数函数会同时用做enter和leave事件的处理程序。
 * toggle()方法将事件处理程序函数绑定到单击事件。可指定两个或多个处理程序函数，当单击事件发生时，jQuery每次会调用一个处理程序函数。例如，
 * 如果调用toggle(f,g,h)，第一次单击事件触发时，会调用函数f()，第二次会调用g()，第三次则调用h()，然后调用f()来处理第四次单击事件。小心
 * 使用toggle()：我们将在19.5.1节看到，该方法用来显示或隐藏选中元素（也就是说，切换选中元素的可见性）。
 * 
 * 19.4.4节中，我们会学到其他更通用的方式来注册事件处理程序，本节最后，我们再学会一个更简单且更便捷的处理程序注册方法。
 * 回忆下，可以传递HTML字符串给$()方法来创建该字符串所描述的元素，还可传入一个对象（当做第二个参数），该对象由属性组成，这些属性可设置到
 * 新创建的元素上。这第二个参数可以是传递给attr()方法的任意对象。此外，如果这些属性中任何一个与上面列举的事件注册方法同名，该属性值会被
 * 当做处理程序函数，并注册为命名事件类型的处理程序。例如：
 */
$("<img/>", {
    src: image_url,
    alt: image_description,
    className: "translucent_image",
    click: function() { $(this).css("opacity", "50%"); }
});

/**
 * jQuery事件处理程序
 * 
 * jQuery模拟标准Event对象
 */

/**
 * jQuery事件对象
 */

/**
 * 事件处理程序的高级注册
 * 
 * bind()
 * one()
 */

/**
 * 注销事件处理程序
 * 
 * unbind()
 */

/**
 * 触发事件
 */

/**
 * 自定义事件
 */

/**
 * 实时事件
 */




/**
 * 动画效果
 * 
 * jQuery定义了fadeIn()和fadeOut()等简单方法来实现常见视觉效果。除了简单动画方法，jQuery还定义了一个animate()方法，用来实现自定义动画。
 * 
 * jQuery动画框架的一些通用特性。
 * 每段动画都有时长，用来指定动画效果持续多长时间。可以使用毫秒数值或字符串来指定时长。
 * 字符串“fast”表示200ms。字符串“slow”表示600ms。如果指定的字符串是jQuery无法识别的，则采用默认的400ms。
 * 可以给jQuery.fx.speeds添加新的字符串到数值映射关系来定义新的时长名字：
 *  jQuery.fx.speeds["medium-fast"] = 300;
 *  jQuery.fx.speeds["medium-slow"] = 500;
 * 
 * jQuery动画方法经常使用动画时长来作为可选的第一参数。如果省略时长参数，通常会得到默认值400ms。
 * 注意，省略时长时，有部分方法会立刻跳到最后一帧，没有中间动画效果。
 *  $("#message").fadeIn();           // 淡入效果，持续400ms
 *  $("#message").fadeOut("fast");    // 淡出效果，持续200ms
 * 
 * 禁用动画，设置 jQuery.fx.off 为 true。该设置会将每段动画的时长设置为0ms，这样动画看起来就像是没有动画效果的立刻切换了。
 * 当网页设计者在页面中加入带有“stopmoving”类的元素时，用户就可以单击该元素来禁用动画。
 *  $(".stopmoving").click(function() { jQuery.fx.off = true; });
 * 
 * jQuery动画是异步的。调用fadeIn()等动画方法时，它会立刻返回，动画则在“后台”执行。由于动画方法会在动画完成之前返回，因此可以向很多jQuery动画方法传入
 * 第二个参数（可选），该参数是一个函数，会在动画完成时调用。该函数在调用时不会有任何参数传入，但this值会设置为发生动画的文档元素。
 * 对于每个选中的元素都会调用一次该回调函数：
 *  // 淡入效果快速显示元素，动画完成时，在元素里显示一些文字
 *  $("#message").fadeIn("fast", function() { $(this).text("Hello World"); });
 * 
 * 给动画方法传入回调函数，可以在动画结束时执行操作。不过，如果只是想顺序执行多段动画的话，回调方式是没有必要的。jQuery动画默认是队列化的。如果一个元素
 * 已经在动画过程中，再调用一个动画方法时，新动画不会立刻执行，而会延迟到当前动画结束后才执行。例如，让一个元素在持久显示前，先闪烁一阵。
 *  $("#blinker").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 * 
 * jQuery动画方法可以接受可选的时长和回调参数。还可以传入一个对象来调用动画方法，该对象的属性指定动画选项。
 *  // 将时长和回调参数作为对象属性而不是参数传入
 *  $("#message").fadeIn({}
 *      duration: "fast",
 *      complete: function() { $(this).text("Hello World"); }
 *  });
 * 
 * 
 */

/**
 * 简单动画
 * 
 * 9个简单的动画方法来隐藏和显示元素。根据实现的动画类型，它们可以分为三组：
 * - fadeIn()、fadeOut()、fadeTo()
 *      fadeIn()、fadeOut()简单地改变CSS的opacity属性来显示或隐藏元素。两者都接受可选的时长和回调参数。
 *      fadeTo()稍有不同：它需要传入一个opacity目标值，fadeTo()会将元素的当前opacity值变化到目标值。
 *          调用fadeTo()时，第一参数必须是时长（或选项对象），第二参数是opacity目标值，回调函数则是可选的第三个参数。
 * 
 * - show()、hide()、toggle()
 *      上面的fadeOut()让元素不可见，但依旧保留了元素在文档布局中的占位。hide()方法则会将元素从布局中移除，就好像把CSS的display属性值设为none一样。
 *      当不带参数调用时，hide()和show()方法只是简单地立刻隐藏或显示选中元素。带有时长（或选项对象）参数时，它们会让隐藏或显示有一个动画过程。
 *      hide()在将元素的opacity减少到0时，同时它还会将元素的宽度和高度收缩到0，show()则进行反向操作。
 * 
 * - slideDown()、slideUp()、slideToggle()
 *      slideUp()会隐藏jQuery对象中的元素，方式是将其高度动态变化到0，
 */