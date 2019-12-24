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
 * 对象的offsetParent()方法则会把每个元素映射到最近的定位祖先元素或<body>元素。注意这些方法的名字并不很恰当：offset()返回元素的绝对位置，其相对于文档的坐标来表示。
 * 而position()则返回相对于元素的offsetParent()的偏移量。
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
