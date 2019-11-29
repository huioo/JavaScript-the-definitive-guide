/**
 * 脚本化文档
 * 
 * 文档对象模型，DOM（Document Object Model）
 */

/**
 * DOM概览
 * 
 * 文档对象模型（DOM）是表示和操作HTML和XML文档内容的基础API。API不是特别复杂，但是需要理解大量的架构细节。
 * 首先，应该理解HTML或XML文档的嵌套元素在DOM树对象中的表示。HTML文档的树结构包含表示HTML标签或元素（如<body>）和表示文本字符串的节点，它可能包含表示HTML注释的节点。
 * 
 * 树状结构
 * 父节点（一个节点之上的直接节点），子节点（一个节点之下的直接节点），兄弟节点（同一层上具有相同父节点的节点）
 * 后代节点（一个节点之下的所有层级的一组节点），祖先节点（一个节点的任何父节点、祖父节点和其上层的所有节点）
 * 文档的每个节点表示一个Node对象。
 * 树形的根部是Document节点，它代表整个文档。代表HTML元素的节点是Element节点。代表文本的节点是Text节点。代表注释的Comment节点。
 * 三者是Node的子类。Document和Element是两个重要的DOM类。
 * 
 * Node及其在类型层级结构中的子类型。
 * DocumentFragment类在实际文档中并不存在的一种节点：它表示一系列没有常规父节点的节点。
 */



/**
 * 选取文档元素
 * 
 * 使用全局变量document引用Document对象。为了操纵文档中的元素，通过某种方式获得或选取这些引用文档元素的Element对象。
 */

/**
 * 通过ID选取元素
 * 
 * 任何HTML元素可以有一个id属性，在文档中该值必须唯一，即同一个文档中的2个元素不能有相同的ID
 *      使用Document对象的getElementById()方法选取一个基于唯一ID的元素。
 *      var section1 = document.getElementById("section1");
 *
 * 例15-1：通过ID查找多个元素
 * 该函数接受任意多个字符串参数，每个参数将当做元素的id传给document.getElementById()
 * 返回一个对象，它把这些id映射到对应的Element对象
 * 如任何一个id对应的元素未定义，则抛出一个Error对象。
 */
function getElements(/* ids... */){
    var elements = {};
    for (var i=0;i<arguments.length;i++){
        var id = arguments[i];
        var elt = document.getElementById(id);
        if (elt == null){
            throw new Error("No element with id:" + id);
        }
        elements[id] = elt;
    }
    return elements;
}

/**
 * 通过名字选取元素
 * 
 * HTML的name属性最初打算为表单元素分配名字，在表单数据提交到服务器时使用该属性的值。类似id属性，name是给元素分配名字，但是区别于id，name属性
 * 的值不必是唯一的：多个元素可以有相同的名字，在表单中，单选和复选按钮通常是这种情况。而且，和id不一样的是name属性只在少数HTML元素中有效，
 * 包括表单、表单元素、<iframe>和<img>元素。
 *      使用Document对象的getElementsByName()方法，基于name属性的值选取HTML元素
 *      var radiobuttons = document.getElementsByName("favorite_color");
 * 
 * getElementsByName()方法定义在HTMLDocument类中，而不在Document类中，所以它只针对HTML文档可用，在XML文档中不可用。
 * 它返回一个NodeList对象，后者的行为类似一个包含若干Element对象的只读数组。在IE中，getElementsByName()也返回id属性匹配指定值的元素。
 * 
 * 在14.7节中，我们可以看到为某些HTML元素设置name属性值将自动为Window对象中创建对应的属性，对Document对象也类似。为<form>、<img>、<iframe>、
 * <applet>、<embed>或<object>元素（其中只有<object>元素没有后辈对象）设置name属性值，即在Document对象中创建以此name属性值为名字的属性（当然
 * 假设此文档没有改名字的属性）。
 * 为若命名<iframe>元素所创建的文档属性比较特殊：它们指代这些框架的Window对象而不是Element对象。这意味着有些元素可以作为Document对象的属性仅通
 * 过名字来获取：
 *      // 针对<form name="shipping_address">元素，得到Element对象
 *      var form = document.shipping_address;
 * 
 */

/**
 * 通过标签名选取元素
 * 
 * Document对象的getElementsByTagName()方法可用来选取指定类型（标签名）的所有HTML或XML元素。例如，如下代码，在文档中获得包含所有<span>元素的
 * 只读的类数组对象：
 *      var spans = document.getElementsByTagName("span");
 * 该方法返回一个NodeList对象。在NodeList中返回的元素按照在文档中的顺序排序的，所以可用如下代码选取文档中的第一个<p>元素：
 *      var firstspara = document.getElementsByTagName("p")[0];
 * HTML标签是不区分大小写的，当在HTML文档中使用getElementsByTagName()时，它进行不区分大小写的标签名比较。例如，上述的变量span将包含所有写成
 * <SPAN>的span标签。
 * 
 * 给getElementsByTagName()传递通配符参数“*”将获得一个代表文档中所有元素的NodeList对象。
 * 
 * Element类也定义getElementsByTagName()方法，其原理和Document版本的一样，但是它只选取调用该方法的元素的后代元素。因此，要查找文档中第一个<p>
 * 元素里面的所有<span>元素，代码如下：
 *      var firstpara = document.getElementsByTagName("p")[0];
 *      var firstParaSpans = firstpara.getElementsByTagName("span");
 * 
 * 由于历史原因，HTMLDocument类定义了一些快捷属性来访问各种各样的节点。例如，images、forms和links等属性指向行为类似只读数组的<img>、<form>和
 * <a>（但只包含那些有href属性的<a>标签）的元素集合。这些属性指代HTMLCollection对象，它们很像NodeList对象，但是除此之外它们可以用元素的ID或名字
 * 来索引。例如，引用一个命名的<form>元素：
 *      document.shipping_address;
 *      document.forms.shipping_address;       // 用document.forms属性更具体地引用命名（或含有ID）表单
 * HTMLDocument也定义embeds和plugins属性，它们是同义词，都是HTMLCollection类型的<embed>元素的集合。
 * anchors是非标准属性，它指代有一个name属性的<a>元素而不是一个href属性。
 * scripts在HTML5中是标准属性，它是HTMLCollection类型的<script>元素的集合，但是在写本书的时候，它还未普遍实现。
 * body是指一个HTML文档的<body>元素，head是<head>元素，浏览器将隐式地创建它们。
 * documentElement属性指文档的根元素。在HTML文档中，它总是指代<html>元素。
 */

/**
 * 通过css类选取元素
 * 
 * HTML元素的class属性值是一个以空格隔开的列表，可以为空或包含多个标识符。它描述一种方法来定义多组相关的文档元素：在它们的class属性中有相同标识符
 * 的任何元素属于该组的一部分。
 * 在JavaScript中class是保留字，所以客户端JavaScript使用className属性来保存HTML的class属性值。class属性通常与CSS样式表一起使用，对某组内的所有
 * 元素应用相同的样式。HTML定义了getElementsByClassName()方法，它基于其class属性值中的标识符来选取成组的文档元素。
 * 类似getElementsByTagName()，在HTML文档和HTML元素上都可以调用getElementsByClassName()，它的返回值是一个实时的NodeList对象，包含文档或元素所
 * 有匹配的后代节点。
 * 
 * getElementsByClassName()只需要一个字符串参数，但是该字符串由多个空格隔开的标识符组成。只有当元素的class属性值包含所有指定的标识符时才匹配，但
 * 是标识符的顺序是无关紧要的。
 * 注意，class属性和getElementsByClassName()方法的类标识符之间都是用空格隔开的，而不是逗号。如下是一些例子：
 *      // 查找其class属性值中包含“warning”的所有元素
 *      var warning = document.getElementsByClassName("warning");
 *      // 查找以“log”命名并且具有“error”和“fatal”类的元素的所有后代
 *      var log = document.getElementsByClassName("log");
 *      var fatal = log.getElementsByClassName("fatal error");
 * 
 */

/**
 * 通过CSS选择器选取元素
 * 
 * CSS样式有一种非常强大的语法，那就是选择器，它用来描述文档中的若干或多组元素。
 *      // ID、标签名、类
 *      #nav           // id为“nav”的元素
 *      div            // div元素
 *      .warning       // class属性值中包含了“warning”的元素
 *      // 属性值
 *      p[lang="fr"]   // 所有使用法语的段落。如<p lang="fr">
 *      *[name="x"]    // 所有包含name="x"属性的元素
 *      // 组合
 *      span.fatal.error   // class中含有fatal和error的span元素
 *      span[lang="fr"].warning
 *      #log span      // id="log"元素的后代元素中的所有span元素
 *      #log>span      // id="log"元素的子元素中的所有span元素
 *      body>h1:first-child    // body元素中的第一个<h1>元素
 *      div, #log      // 所有div元素，以及id="log"的元素
 * 
 * querySelectorAll()方法，它接受一个CSS选择器的字符串参数，返回一个表示文档中匹配选择器的所有元素的NodeList对象。若没有，则返回空的NodeList对象。
 * querySelector()方法，类似，但只返回第一个匹配的元素（以文档顺序），若没有，则返回null。
 * 这两个方法在Element节点中也有定义（并且也在DocumentFragment节点中）。
 */



/**
 * 文档结构和遍历
 * 
 * 一旦从文档中选取了一个元素，有时需要查找文档中与之在结构上相关的部分
 */

/**
 * 节点树
 * 
 * Document对象、Element对象和文档中表示文本的Text对象都是Node对象。Node定义了一下重要的属性
 * parentNode
 *      该节点的父节点。或者针对Document对象应该是null，因为它没有。
 * childNodes
 *      只读的类数组对象（NodeList对象），它是该节点的子节点的实时表示。
 * firstChild、lastChlid
 *      该节点的子节点中的第一个和最后一个，如果该节点没有子节点则为null。
 * nextSibling、previousSibling
 *      该节点的兄弟节点中的前一个和下一个。具有相同父节点的两个节点为兄弟节点。节点的顺序反映了它们在文档中出现的顺序。这两个属性将节点之间以双向链表的形式连接。
 * nodeType
 *      该节点的类型。9代表Document，1代表Element，3代表Text，8代表Comment，11代表DocumentFragment。
 * nodeValue
 *      Text节点或Comment节点的文本内容
 * nodeName
 *      元素的标签名，以大写形式表示
 */
// 获取文档的第一个子节点下面的第二个子节点
document.childNodes[0].childNodes[1];
document.firstChild.firstChild.nextSibling;

// <html><head><title>Test</title></head><body>Hello World!</body></html>
document.firstChild.firstChild.nextSibling.nodeType;         // 1，body元素

/**
 * 元素树
 * 
 * 另外一种更有用的API，它将文档看作是Element对象树，忽略部分文档：Text和Comment。
 * 
 * 该API的第一部分是Element对象的children属性。
 * children
 *      类似ChildNodes，它也是一个NodeList对象，但不同的是children列表只包含Element对象。
 * 
 * children并非标准属性，但是它在所有当前的浏览器中都能工作。
 * 注意，Text和Comment节点没有children属性，它意味着上述Node.parentNode属性不可能返回Text或Comment节点。
 * 任何Element的parentNode总是另一个Element，或者，追溯到树根的Document或DocumentFragment节点。
 * 
 * 
 * 基于元素的文档遍历API的第二部分是Element属性，后者类似Node对象的兄弟属性或子属性。
 * firstElementChild, lastElementChild
 *      类似firstChild和lastChild，但只代表子Element
 * nextElementSibling, previousElementSibling
 *      类似nextSibling和previousSibling，单只代表兄弟Element
 * childElementCount
 *      子元素的数量。返回的值和children.length值相等
 * 
 * 子元素和兄弟元素都是标准属性，并在除了IE之外的浏览器中都已实现。
 */
/**
 * 例15-2：可移植的文档遍历函数
 */
/**
 * 返回元素e的第n层祖先元素。如果不存在此类祖先或祖先不是Element，则返回null（例如Document和DocumentFragment）
 * 如果n为0，则返回e本身。如果n为1（或省略），则返回其父元素。
 * 如果n为2，则返回其祖父元素，以此类推。
 */
function parent(e, n){
    if (n===undefined) n==1;
    while(n-- && e) e = e.parentNode;
    if (!e || e.nodeType !== 1) return null;
    return e;
}

/**
 * 返回元素e的第n个兄弟元素
 * 如果n为正，返回后续的第n个兄弟元素
 * 如果n为负，返回前面的第n个兄弟元素
 * 如果n为零，返回e本身
 */
function sibling(e, n){
    while(e && n !== 0){ // 如果e未定义，即刻返回它
        if (n>0){        // 查找后续的兄弟元素
            if (e.nextElementSibling) {
                e = e.nextElementSibling;
            }else{
                for (e=e.nextSibling; e && e.nodeType !== 1;e=e.nextSibling){
                    /* 空循环 */;
                }
            }
            n--;
        }else{           // 查找前面的兄弟元素
            if (e.previousElementSibling) {
                e = e.previousElementSibling;
            }else{
                for (e=e.previousSibling; e && e.nodeType !== 1;e=e.previousSibling){
                    /* 空循环 */;
                }
            }
            n++;
        }
    }
    return e;
}

/**
 * 返回元素e的第n代子元素，如果不存在则为null
 * 负值n代表从后往前计数，0表示第一个子元素，而-1代表最后一个，-2代表倒数第二个，以此类推
 */
function child(e, n){
    if (e.children){                        // 如果children数组存在
        if (n < 0) n += e.children.length;  // 转换负的n为数组索引
        if (n < 0) return null;             // 如果它仍然为负，说明没有子集
        return e.children[n];               // 返回指定的子元素
    }

    // 如果e没有children数组，找到第一个子元素并向前数，或找到最后一个子元素并往回数
    if (n >= 0){        // n非负：从第一个子元素往后数
        if (e.firstElementChild) e = e.firstElementChild;
        else{
            // 找到第一个子元素，赋值给e；索引是子元素中的0
            for(e = e.firstChild; e && e.nodeType !== 1; e=e.nextSibling)
                /* 空循环 */;
        }
        return sibling(e, n);   // 返回第一个子元素的第n个兄弟元素
    }else{              // n负：从最后一个子元素往前数
        if (e.lastElementChild) e = e.lastElementChild;
        else{
            // 找到最后一个子元素，赋值给e；索引是子元素中的-1
            for(e = e.lastChild; e && e.nodeType !== 1; e=e.previousSibling)
                /* 空循环 */;
        }
        return sibling(e, n+1); // n为-1时，就是e本身，通过+1来转化最后1个子元素为最后1个兄弟元素
    }
}





/**
 * 属性
 */

/**
 * HTML属性作为Element属性
 * 
 * 表示HTML文档元素的HTMLElement对象定义了读写属性，它们映射了元素的HTML属性。HTMLElement定义了通用的HTTP属性（如id、标题lang和dir）
 * 的属性，以及事件处理程序属性（如onclick）。
 * 特定的Element子类型为其元素定义了特定的属性。
 */
// 例如，查询一张图片的URL，可以使用表示img元素的HTMLElement对象的src属性：
var image = document.getElementById("myimage");
var imgurl = image.src;        // src属性是图片的URL
image.id === "myimage";        //   判定要查找图片的id

// 同样的，可以为一个form元素设置表单提交的属性。
var f = document.forms[0];     // 文档中第一个form
f.action = "http://www.example.com/submit.php";  // 设置提交至的URL
f.method = "POST";             // HTTP请求类型
/**
 * HTML属性名不区分大小写，但JavaScript属性名则大小写敏感。从HTML属性名转换到JavaScript属性名应该采用小写。但是，如果属性名包含不止
 * 一个单词，则将除了第一个单词以外的首字母大写，例如：defaultChecked和tabIndex。
 * 有些HTML属性名时JavaScript中的保留字。对于这些属性，一般规则是为属性名加前缀“html”。例如，HTML的for属性（label元素）在JavaScript
 * 中变为htmlFor属性。“class”在JavaScript中是保留字，它是HTML非常重要的class属性，是上面规则的一个例外：在JavaScript代码中它变为
 * className。
 * 表示HTML属性的值通常是字符串。当属行为布尔值或数值（例如，input元素的defaultChecked和maxLength属性），属性也是布尔值或数值。而不是
 * 字符串。事件处理程序属性值总是Function对象（或null）。HTML5规范定义了一个新的属性（如input和相关元素的form属性）用以将元素ID转换为
 * 实际的Element对象。最后，任何HTML元素的style属性值是CSSStyleDeclaration对象，而不是字符串。
 */

/**
 * 获取和设置非标准HTML属性
 * 
 * HTMLElement和其子类定义了一些属性，它们对应于元素的标准HTML属性。Element类型还定义了getAttribute()和setAttribute()方法来查询和设置
 * 非标准的HTML属性，也可用来查询或设置XML文档中元素上的属性：
 */
var image = document.images[0];
var width = parseInt(image.getAttribute("WIDTH"));
image.setAttribute("class", "thumbnail");
/**
 * 上述代码给出了这些方法和前面的基于属性的API之间两个重要的区别。
 * 首先，属性值都被看做是字符串。getAttribute()不返回数值、布尔值或对象。
 * 其次，方法使用标准属性名，甚至当这些名称为JavaScript保留字时也不例外。对于HTML元素来说，属性名是不区分大小写的。
 *
 * Element类型还定义了两个相关的方法，hasAttribute()和removeAttribute()，它们用来检测命名属性是否存在和完全删除属性。当属性为布尔值时
 * 这些方法特别有用：有些属性（如HTML的表单元素的disabled属性）在一个元素中是否存在是重点关键，而值却无关紧要。 
 */

/**
 * 数据集属性
 * 
 * HTML5提供了一个解决方案。在HTML5文档中，任意以“data-”为前缀的小写的属性名字都是合法的。这些“数据集属性”将不会对其元素的表现产生影响，
 * 它们定义了一种标准的、附加额外数据的方法，并不是在文档合法性上做出让步。
 * 
 * HTML5还在Element对象上定义了dataset属性。该属性指代一个对象，它的各个属性对应于去掉前缀的“data-”属性。因此dataset.x应该保存data-x
 * 属性的值。带连字符的属性对应于驼峰命名法属性名：data-jquery-test属性就变成dataset.jqueryTest属性。
 * 
 * 一个更具体的例子：
 * <span class="sparkline" data-ymin="0" data-ymax="10">
 * 1 1 1 2 2 3 4 5 5 4 3 5 6 7 7 4 2 1
 * </span>
 * 火花线（sparkline）是个小图案 —— 通常是一条线 —— 设计用来在文本流中显示。为了生成一条火花线，也许可以同如下代码提取上述dataset属性的值
 */
function drawSparkLine(sparkline, ymin, ymax, data){}

var sparklines = document.getElementsByClassName("sparkline");
for (var i=0;i<sparklines.length;i++){
    var dataset = sparklines[i].dataset;
    var ymin = parseFloat(dataset.ymin);
    var ymax = parseFloat(dataset.ymax);
    var data = sparklines[i].textContent.split(" ").map(parseFloat);
    drawSparkLine(sparklines[i], ymin, ymax, data);  // 该方法未实现
}

// 替换dataset的实现
var sparklines = document.getElementsByClassName("sparkline");
for (var i=0;i<sparklines.length;i++){
    var elt = sparklines[i];
    var ymin = parseFloat(elt.getAttribute("data-ymin"));
    var ymax = parseFloat(elt.getAttribute("data-ymax"));
    var data = elt.textContent.split(" ").map(parseFloat);
    drawSparkLine(elt, ymin, ymax, data);  // 该方法未实现
}

/**
 * 注意，dataset属性是（或将是，当实现以后）元素data-属性的实时、双向接口。设置或删除dataset的一个属性就等同于设置或移除对应元素的data-属性。
 */

/**
 * 作为Attr节点的属性
 * 
 * 还有一种使用Element的属性的方法。Node类型定义了attributes属性。针对非Element对象的任何节点，该属性为null。对于Element对象，attributes属性
 * 是只读的类数组对象，它代表元素的所有属性。类似NodeList，attributes对象也是实时的。它可以用数字索引访问，这意味着可以枚举元素的所有属性。并且，
 * 它也可以用属性名索引：
 */
document.body.attributes[0];          // body的第一个属性
document.body.attributes.bgcolor;     // body的bgcolor属性
document.body.attributes["ONLOAD"];   // body的onload属性



/**
 * 元素的内容
 * 
 * <body>
 *  <h1>An HTML Document</h1>
 *  <p>This is a <i>smaple<i> document</p>
 * </body>
 * 
 * <p>元素的内容是什么？
 * - 内容是HTML字符串“This is a <i>smaple<i> document”
 * - 内容是纯文本字符串“This is a simple document”。
 * - 内容是一Text节点，一个包含了一个Text子节点的Element节点和另外一个Text节点。
 */

/**
 * 作为HTML的元素内容
 * 
 * 读取Element的innerHTML属性作为字符串标记返回那个元素的内容。 在元素上设置该属性调用了Web浏览器的解析器，用新字符串内容的解析展现形式替换元素
 * 当前内容。
 * Web浏览器很擅长解析HTML，通常设置innerHTML效率会非常高，甚至在指定的值需要解析时效率也是非常不错。但注意，对innerHTML属性用“+=”操作符重复追
 * 加一段文本通常效率低下，因为它既要序列化又要解析。
 * 
 * HTML5还标准了outerHTML属性。当查询outerHTML时，返回的HTML或XML标记的字符串包含被查询元素的开头和结尾的标签。当设置元素的outerHTML时，元素
 * 本身被新的内容所替换。只有Element节点定义了outerHTML属性，Document节点则无。
 * 
 * IE引入的另一个特性是insertAdjacentHTML()方法，它将在HTML5中标准化，它将任意的HTML标记字符串插入到指定的元素“相邻”的位置。标记是该方法的第二个
 * 参数，并且“相邻”的精确含义依赖于第一个参数的值。
 * 第一个参数为具有以下值之一的字符串：“beforebegin”、“afterbegin”、“beforeend”和“afterend”。
 * beforebegin     afterbegin               beforeend   afterend
 *    |               |                           |     |
 *    <div id="target">This is the element content</div>
 */

/**
 * 作为纯文本的元素内容
 * 
 * 有时需要查询纯文本形式的元素内容，或者在文档中插入纯文本（不必转义HTML标记中使用的尖括号和&符号）。标准的方法是用Node的textContent属性来实现。
 */
var para = document.getElementsByTagName("p")[0];     // 文档中第一个<p>
var text = para.textContent;                          // 文本是“This is a simple document”
para.textContent = "Hello World!";                    // 修改段落内容

/**
 * textContent属性在除了IE的所有当前的浏览器中都支持。在IE中，可以用Element的innerHTML属性来代替。微软在IE4中引入了innerText属性，它在除了Firefox
 * 的所有当前浏览器中支持。
 * textContent和innerText属性非常相似，通常可以互相替换使用。不过要小心空元素（在JavaScript中字符串是假值）和未定义的属性之间的区别。
 */
// 一个参数，返回元素的textContent或innerText
// 两个参数，用value参数的值设置元素的textContent或innerText
function textContent(element, value){
    var content = element.textContent;
    if (value === undefined){   // 没传递value，返回当前文本
        if (content !== undefined) return content;
        else return element.innerText;
    }else{                      // 传递了value，因此设置文本
        if (content !== undefined) element.textContent = value;
        else element.innerText = value;
    }
}

/**
 * textContent属性就是将指定元素的所有后代Text节点简单地串联在一起。
 * innerText没有一个明确指定的行为，但是和textContent有一些不同。innerText不返回<script>元素的内容。它忽略多余的空白，并试图保留表格格式。同时，
 * innerText针对某些表格元素（如<table>、<tbody>和<tr>）是只读的属性
 * 
 * <script>中的文本
 * 内联的<script>元素（也就是那些没有src属性的）有一个text属性用来获取它们的文本。浏览器不显示<script>的内容，并且HTML解析器忽略脚本中的尖括号和
 * 星号。这使得<script>元素成为应用程序用来嵌入任意文本内容的一个理想的地方。简单地将元素的type属性设置为某些值（如“text/x-custom-data”），就标
 * 明了脚本为不可执行的JavaScript代码。如果这样做，JavaScript解释器将忽略该脚本，但该元素将仍然存在于文档树中，它的text属性还将返回数据给你。
 */

/**
 * 作为Text节点的元素内容
 * 
 * 当做一个子节点的列表，每个子节点可能有它自己的一组子节点。当考虑元素的内容时，通常感兴趣的是它的Text节点。
 * 在XML文档中，你也必须处理好CDATASection节点 —— 它是Text的子类型，代表了CDATA段的内容。
 * 
 * 例15-3展示了一个textContent()函数，它递归地遍历元素的子节点，然后连接后代节点中所有的Text节点的文本。
 * 
 * 返回元素e的纯文本内容，递归进入其子元素
 * 该方法的效果类似于textContent属性
 */
function textContent(e){
    var child, type, s ="";         // s保存所有子节点的文本
    for(child = e.firstChild; child != null; child = child.nextSibling) {
        type = child.nodeType;
        if (type === 3 || type === 4){  // Text和CDATASection节点
            s += child.nodeValue;
        }else if (type === 1){
            s += textContent(child);    // 递归Element节点
        }
    }
    return s;
}

/**
 * nodeValue属性可以读写，设置它可以改变Text或CDATASection节点所显示的内容。Text和CDATASection都是CharacterData的子类型。CharacterData定义了
 * data属性，它和nodeValue的文本相同。
 * 以下函数通过设置data属性将Text节点的内容转换为大写形式。
 */
function upcase(n){
    if (n.nodeType === 3 || n.nodeType === 4){
        n.data = n.data.toUpperCase();
    }else{
        for (var i = 0;i < n.childNodes.length; i++){
            upcase(n.childNodes[i]);
        }
    }
}




/**
 * 创建、插入和删除节点
 */

/**
 * 创建节点
 * 
 * 使用Document对象的createElement()方法创建新的Element节点。给方法传递元素的标签名：对HTML文档来说该名字不区分大小写，对XML区分大小写。
 */
var newnode = document.createElement('script');
// 创建Text节点
var newTextNode = document.createTextNode("text node content");

/**
 * 其他的工厂方法：createComment()、createDocumentFragment()。
 * 
 * 另一种创建新文档节点的方法是复制已存在的节点。每个节点都有一个cloneNode()方法来返回该节点的一个全新副本。该方法传递参数true也能够递归地复制
 * 所有后代节点，或传递参数false只执行一个浅复制。
 * 在除了IE的其他浏览器中，Document对象还定义了一个类似的方法叫importNode()。如果给它传递另一个文档的一个节点，它将返回一个适合本文档插入的节点
 * 的副本。传递true作为第二参数，该方法递归地导入所有的后代节点。
 */

/**
 * 插入节点
 * 
 * 用Node的方法appendChild()或insertBefore()将它插入到文档中。
 * appendChild()是在需要插入的Element节点上调用的，它插入指定的节点使其成为那个节点的最后一个子节点。
 * insertBefore()就像appendChild()一样，除了它接受两个参数。第一个参数就是待插入的节点，第二个参数必须是该父节点的子节点。如果传递null作为第二个
 * 参数，insertBefore()的行为类似appendChild()，它将节点插入在最后。
 */
function insertAt(parent, child, n){
    // 将child节点插入到parent，使其成为第n个子节点
    if (n < 0 || n > parent.childNodes.length) throw new Error("invalid index");
    else if (n == parent.childNodes.length) parent.appendChild(child);
    else parent.insertBefore(child, parent.childNodes[n]);
}

/**
 * 如果调用appendChild()或insertBefore()将已存在文档（或新建的元素）中的一个（子）节点再次插入，该节点将自动从它当前的位置删除并在新的位置重新插入：
 * 没有必要显式删除该节点。
 * - 新创建div元素中有4个a元素，当某一个a元素插入到另一个新建的div元素中时，该a元素将从当前位置删除，并插入。
 * - 文档中某一个节点插入到该文档中另一个位置时，该节点将
 * 例15-4展示了一个函数，基于表格指定列中单元格的值来进行行排序。它没有创建任何新的节点，只是用appendChild()来改变已存在节点的顺序。
 */
/**
 * 例15-4：表格的行排序
 * 根据指定表格每行第n个单元格的值，对第一个<tbody>中的行进行排序
 * 如果存在comparator函数则使用它，否则按字母表顺序比较
 */
function sortrows(table, n, comparator){
    var tbody = table.tBodies[0];          // 第一个<tbody>，可能是隐式创建的
    var rows = tbody.getElementsByTagName('tr');    // tbody中的所有行
    rows = Array.prototype.slice(rows, 0);        // 真实数组的快照

    // 基于第n个<td>元素的值进行排序
    rows.sort(function(row1, row2){
        var cell1 = row1.getElementsByTagName("td")[n];      // 获得第n个单元格
        var cell2 = row2.getElementsByTagName("td")[n];      // 两行都是
        var val1 = cell1.textContent || cell1.innerText;     // 获得文本内容
        var val2 = cell2.textContent || cell2.innerText;     // 获得文本内容
        if (comparator) return comparator(val1, val2);       // 进行比较
        if (val1 < val2) return -1;
        else if (val1 > val2) return 1;
        else return 0;
    })
    // 在tbody中按它们的顺序把行添加到最后
    // 这将自动把它们从当前位置移走，故没必要预先删除它们
    // 如果<tbody>还包含了除了<tr>的任何其他元素，这些节点将会悬浮到顶部位置
    for (var i=0;i<rows.length;i++) tbody.appendChild(rows[i]);
}

// 查找表格的<th>元素（假设只有一行），让它们可单击
// 以便单击列标题，按该列进行排序
function makeSortable(table){
    var headers = table.getElementsByTagName("th");
    for (var i=0;i<headers.length;i++){
        (function(n){         // 嵌套函数来创建本地作用域
            headers[n].onclick = function(){ sortrows(table,n); };
        }(i));                // 将i的值赋给局部变量
    }
}

/**
 * 删除和替换节点
 * 
 * removeChild()方法是从文档树中删除一个节点。但是请小心，该方法不是在待删除的节点上调用，而是（就像其名字的一部分“child”所暗示的一样）在其父节点
 * 上调用。在父节点上调用该方法，并将需要删除的子节点作为方法参数传递给它。在文档中删除n节点，代码可以这样写：
 *      n.parentNode.removeChild(n)
 * 
 * replaceChild()方法删除一个子节点并用一个新的节点取而代之。在父节点上调用该方法，第一个参数是新节点，第二个参数是需要代替的节点。例如，用一个文本
 * 字符串来替换节点n，代码可以这样写：
 *      n.parentNode.replaceChild(document.createTextNode("[ REDACTED ]"), n)
 */
// 用一个新的<b>元素替换n节点，并使n成为该元素的子节点
function embolden(n){
    // 假如参数为字符串而不是节点，将其当做元素的id
    if (typeof n === "string") n = document.getElementById('n');
    var parent = n.parentNode;                // 获得父节点
    var b = document.createElement("b");      // 创建<b>元素
    parent.replaceChild(b, n);                // 用该<b>元素替换为节点n
    b.appendChild(n);                         // 使n称为<b>元素的子节点
}

/**
 * 例15-5展示了在Firefox中（和其他任何支持innerHTML的浏览器，要有一个可扩展的Element.prototype对象，还要有一些方法来定义属性的getter和setter）如何
 * 来实现该属性。同时代码也展示了removeChild()和cloneNode()方法的实际用法。
 * 
 * 例15-5：使用innerHTML实现outerHTML属性
 */
// 为那些不支持它的浏览器实现outerHTML
// 假设浏览器确定支持innerHTML，并有个可扩展的Element.prototype
// 并且可以定义getter和setter
(function (){
    // 如果outerHTML存在，则直接返回
    if (document.createElement('div').outerHTML) return;

    // 返回this所引用元素的外部HTML
    function outerHTMLGetter(){
        var container = document.createElement('div');  // 虚拟元素
        container.appendChild(this.cloneNode(true));      // 复制到该虚拟节点
        return container.innerHTML;                     // 返回虚拟节点的innerHTML
    }

    // 用指定的值设置元素的外部HTML
    function outerHTMLSetter(value){
        // 创建一个虚拟元素，设置其内容未指定的值
        var container = document.createElement('div');
        container.innerHTML = value;
        // 将虚拟元素中的节点全部移动到文档中
        while(container.firstChild)    // 循环，直到container没有子节点为止
            this.parentNode.insertBefore(container.firstChild, this);
        // 删除被取代的节点
        this.parentNode.removeChild(this);
    }

    // 现在使用这两个函数作为所有Element对象的outerHTML属性的getter和setter
    // 如果它存在则使用ES5的Object.defineProperty()方法
    // 否则，退而求其次，使用__defineGetter__()和__defineSetter__()
    if (Object.defineProperty){
        Object.defineProperty(
            Element.prototype, 
            "outerHTML", 
            {
                get: outerHTMLGetter, 
                set:outerHTMLSetter, 
                enumerable: false, configurable: true
            }
        );
    }
    else {
        Element.prototype.__defineSetter__("outerHTML", outerHTMLSetter);
        Element.prototype.__defineGetter__("outerHTML", outerHTMLGetter);
    }
}());

/**
 * 使用DocumentFragment
 * 
 * DocumentFragment是一种特殊的Node，它作为其他节点的一个临时的容器。像这样创建一个DocumentFragment：
 *      var frag = document.createDocumentFragment();
 * 
 * 像Document一样，DocumentFragment是独立的，而不是任何其它文档的一部分。它的parentNode总是null。但类似Element，他可以有任意多的子节点，可以用
 * appendChild()、insertBefore()等方法来操作它们。
 * DocumentFragment的特殊之处在于它使得一组节点被当作一个节点对待：如果给appendChild()、insertBefore()或replaceChild()传递一个DocumentFragment，
 * 其实是将该文档片段的所有子节点插入到文档中，而非片段本身。（文档片段的子节点从片段移动到文档中，文档片段清空以便使用。）
 * 
 * 以下函数使用DocumentFragment来倒序排列一个节点的子节点。
 */
function reverse(n){
    // 创建一个DocumentFragment作为临时容器
    var container = document.createDocumentFragment();
    // 从后至前循环子节点，将每个子节点移动到文档片段中
    // n的最后一个节点变成container的第一个字节点，反之亦然
    // 注意，给container添加一个节点，该节点自动地会从container中删除
    while(n.lastChild) container.appendChild(n.lastChild);

    // 最后，把container的所有子节点一次性全部移回n中
    n.appendChild(container);
}

/**
 * 例15-6使用innerHTML属性和DocumentFragment实现insertAdjacentHTML()方法。它还定义了一些名字更符合逻辑的HTML插入函数，可以替换
 * 让人迷惑的insertAdjacentHTML() API。内部工具函数fragment()可能是代码中最有用的部分：它返回一个指定HTML字符串文本进行解析后的
 * DocumentFragment。
 * 
 * 例15-6：使用innerHTML实现insertAdjacentHTML()
 */
// 本模块为不支持它的浏览器定义了Element.insertAdjacentHTML
// 还定义了一些可移植的HTML插入函数，它们的名字比insertAdjacentHTML更符合逻辑
//      Insert.before()、Insert.after()、Insert.atStart()、Insert.atEnd()
var Insert = (function(){
    // 如果元素有原生的insertAdjacentHTML，在4个函数名更明了的HTML插入函数中使用它
    if (document.createElement("div").insertAdjacentHTML){
        return {
            before: function(e, h) { e.insertAdjacentHTML('beforebegin', h) },
            after: function(e, h) { e.insertAdjacentHTML('afterend', h) },
            atStart: function(e, h) { e.insertAdjacentHTML('afterbegin', h) },
            atEnd: function(e, h) { e.insertAdjacentHTML('beforeend', h) }
        }
    }

    // 否则，无原生的
    // 实现4个插入函数，并使用它们来定义

    // 首先定义一个工具函数，传入HTML字符串，返回一个DocumentFragment
    // 它包含解析后的HTML的表示
    function fragment(html){
        var elt = document.createElement('div');         // 创建空元素
        var frag = document.createDocumentFragment();    // 创建空文档片段
        elt.innerText = html;                            // 设置元素内容
        while(elt.firstChild)                            // 移动所有节点
            frag.appendChild(elt.firstChild);            // 从elt到frag
        return frag;
    }

    var Insert = {
        before: function(elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt);
        },
        after: function(elt, html) {
            elt.parentNode.insertBefore(fragment(html), elt.nextSibling);
        },
        atStart: function(elt, html) {
            elt.insertBefore(fragment(html), elt.firstChild);
        },
        atEnd: function(elt, html) {
            elt.appendChild(fragment(html));
        }
    };

    // 基于以上函数实现insertAdjacentHTML
    Element.prototype.insertAdjacentHTML = function(pos, html) {
        switch(pos.toLowerCase()){
            case "beforestart": return Insert.before(this, html);
            case "afterstart": return Insert.atStart(this, html);
            case "beforeend": return Insert.atEnd(this, html);
            case "afterend": return Insert.after(this, html);
        }
    }
    // 最后返回4个插入函数
    return Insert;
}());




/**
 * 例子：生成目录表
 * 
 * 例15-7说明了如何为文档动态地创建一个目录表。它展示了上一节所描述的文档脚本化的很多概念：元素选取、文档遍历、元素属性设置、
 * insertHTML属性设置和在文档中创建与插入新节点等。
 */

/**
 * 这个模块注册了一个可在页面加载完成后自动运行的匿名函数。
 * 当执行这个函数时会去文档中查找id为“TOC”的元素。如果这个元素不存在，就创建一个元素。
 * 
 * 生成的TOC目录具有自己的CSS样式。整个目录区域的样式className设置为“TOCEntry”
 * 同样我们为不同层级的目录标题定义不同的样式。
 * <h1>标签生成的标题，className为“TOCLevel1”
 * <h1>标签生成的标题，className为“TOCLevel2”，以此类推
 * 段编号的样式为“TOCSectNum”
 * 
 * 完整的CSS样式代码如下：
 * 
 * #TOC { border: solid black 1px; margin: 10px; padding: 10px; }
 * .TOCEntry { font-family: sans-serif; }
 * .TOCEntry a { text-decoration: none; }
 * .TOCLevel1 { font-size: 16pt; font-weight: bold; }
 * .TOCLevel2 { font-size: 12pt; font-weight: .5in; }
 * .TOCSectNum:after { content: ": "; }
 * 
 * 这段代码的最后一行表示每个段编号之后都有一个冒号和空字符串。要想隐藏段编号，请使用
 * .TOCSecNum { display: none; }
 */
// 注册函数f，当文档载入完成时执行这个函数f
// 如果文档已经载入完成，尽快异步方式执行它
function onLoad(f){
    if (onLoad.loaded){                // 如果文档已经载入完成
        window.setTimeout(f, 0);       // 将f放入异步队列，并尽快执行它
    }else if(window.addEventListener){ // 注册事件的标准方法
        window.addEventListener("load", f, false);
    }else if(window.attachEvent){      // IE8以及更早的IE版本浏览器注册事件的方法
        window.attachEvent("onload", f);
    }
}
// 给onLoad设置一个标志，用来指示文档是否载入完成
onLoad.loaded = false;
// 注册一个函数，当文档载入完成时设置这个标志
onLoad(function(){ onLoad.loaded = true; });

onLoad(function(){ // 匿名函数定义了一个局部作用域
    // 查找TOC容器元素
    // 如果不存在，则在文档开头创建一个
    var toc = document.getElementById('TOC');
    if (!toc){
        toc = document.createElement('div');
        toc.id = "TOC";
        document.body.insertBefore(toc, document.body.firstChild);
    }

    // 查找所有的标题元素
    var headings;
    if (document.querySelectorAll)
        headings = document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    else
        headings = findHeadings(document.body, []);
    
    // 递归遍历document的body，查找标题元素
    function findHeadings(root, sects){
        for(var c=root.firstChild;c != null;c=c.nextSibling) {
            if (c.nodeType !== 1) continue;
            if (c.tagName.length == 2 && c.tagName.charAt(0) == "H")
                sects.push(c);
            else
                findHeadings(c, sects);
        }
        return sects;
    }

    // 初始化一个数组来保持跟踪章节号
    var sectionNumbers = [0,0,0,0,0,0];
    // 现在，循环已经找到的标题元素
    for(var h=0;h<headings.length;h++) {      // 不能使用下面的i作为变量0，会覆盖
        var heading = headings[h];
        // 跳过在TOC容器中的标题元素
        if (heading.parentNode == toc) continue;

        // 判定标题的级别
        var level = parseInt(heading.tagName.charAt(1));
        if (isNaN(level) || level < 1 || level > 6) continue;

        // 对于该标题级别增加sectionNumbers对应的数字
        // 重置所有标题比它级别低的数字为0
        sectionNumbers[level-1]++;
        for(var i=level; i<6;i++) sectionNumbers[i] = 0;

        // 现在，将所有标题级别的章节号组合产生一个章节号，如2.3.1
        var sectionNumber = sectionNumbers.slice(0, level).join('.');

        // 为标题级别增加章节号
        // 把数字放在<span>中，使其可以用样式修饰
        var span = document.createElement('span');
        span.className = 'TOCSectNum';
        span.innerHTML = sectionNumber;
        heading.insertBefore(span, heading.firstChild);

        // 用命名的锚点将标题包起来，以便为它增加链接
        var anchor = document.createElement('a');
        anchor.name = "TOC" + sectionNumber;
        // heading.parentNode.insertBefore(anchor, heading);
        anchor.appendChild(heading.cloneNode());
        heading.outerHTML = anchor;

        // 现在为该节创建一个链接
        var link = document.createElement('a');
        link.href = "#TOC" + sectionNumber;   // 链接的目标地址
        link.innerHTML = heading.innerHTML;   // 链接文本与实际标题一样

        // 将链接放在一个div中，div用基于级别名字的样式装饰
        var entry = document.createElement('div');
        entry.className = "TOCEntry TOCLevel" + level;
        entry.appendChild(link);

        // 该div添加到TOC容器中
        toc.appendChild(entry);
    }
});
/**
 * 循环的初始化变量名需要注意，内部的for循环使用的变量名不能相同，即上面的 h 和 i
 * https://docs.djangoproject.com/en/3.0/intro/
 */




/**
 * 文档和元素的几何形状和滚动
 * 
 * 前面我们考虑的是将文档看作元素和文本节点的抽象树，而当浏览器在窗口里渲染文档时，它创建文档的一个视觉表现层，在那里每个元素有自己的位置和尺寸。
 * 通常，Web应用程序可以将文档看作是元素的树，并且不用关心在屏幕上这些元素时如何渲染的。但有时，判定一个元素精确的几何形状也是非常有必要的。
 * 例如，将在第16章中看到利用CSS为元素指定位置。如果想用CSS动态定位一个元素（如工具提示或插图）到某个已经由浏览器定位后的普通元素的旁边，首先需要判定
 * 那个元素的当前位置。
 * 
 * 
 */

/**
 * 文档坐标和视口坐标
 * 
 * 元素的位置是以像素来度量的，向右代表X坐标的增加，向下代表Y坐标的增加。但是有有两个不同的点作为坐标系的原点：
 * - 元素的X和Y坐标可以相对于“ 文档的左上角 ”
 * - 元素的X和Y坐标可以相对于“ 在其中显示文档的视口的左上角 ”
 * 
 * 在顶级窗口和标签页中，“视口”只是实际显式文档内容的浏览器的一部分：它不包括浏览器的“外壳”（如菜单、工具条和标签页）。
 * 针对框架页中显式的文档，视口是定义了框架页的<iframe>元素。
 * 无论在何种情况下，dang'tao'lun元素的位置时，必须弄清楚所使用的坐标是文档坐标还是视口坐标。（注意，视口坐标有时也叫做窗口坐标。）
 * 
 * 如果文档比视口要小，或者说它还未出现滚动，则文档的左上角就是视口的左上角，文档和视口坐标系统是同一个。
 * 但是，一般来说，要在两种坐标之间互相切换，必须加上或减去滚动的偏移量（scroll offset）。
 * 例如，在文档坐标中如果一个元素的Y坐标是200像素，并且用户已经把浏览器向下滚动75像素，那么视口坐标中元素的Y坐标是125像素。
 * 同样，在视口坐标中如果一个元素的X坐标是400像素，并且用户已经水平滚动了视口200像素，那么文档坐标中元素的X坐标是600像素。
 * 
 *  文档坐标X或Y = 滚动偏移量 + 视口坐标X或Y
 *  
 * 文档坐标比视口坐标更加基础，并且在用户滚动时它们不会发生变化。不过，在客户端编程中使用视口坐标是非常常见的。当使用CSS指定元素的位置时
 * 运用了文档坐标。但是，最简单的查询元素位置的方法返回视口坐标中的位置。类似地，当为鼠标事件注册事件处理程序函数时，报告的鼠标指针地坐标
 * 是在视口坐标系中的。
 * 
 * 为了在坐标系之间相互切换，我们需要判定浏览器窗口的滚动条的位置。
 *
 * Window对象的 pageXOffset 和 pageYOffset 属性在所有的浏览器中提供这些值。除了IE8及更早的版本以外。
 * IE（和现代所有浏览器）也可以通过 scrollLeft 和 scrollTop 属性来获得滚动条的位置。令人迷惑的是，正常情况下通过查询文档的根节点
 * （document.documentElement）来获取这些属性值，但在怪异模式下，必须在文档的<body>元素（document.body）上查询它们。
 * 
 * 例15-8显示了如何简便地查询滚动条的位置。
 */
// 以一个对象的x和y属性的方式返回滚动条的偏移量
function getScrollOffsets(w) {
    // 使用指定的窗口，如果不带参数则使用当前窗口
    w = w || window;
    // 除了IE 8及更早的版本以外，其它浏览器都能用
    if (w.pageXOffset != null)
        return {x: w.pageXOffset, y: w.pageYOffset};
    // 对标准模式下的IE（或任何浏览器）
    // 该处书中实践有差异，使用情况如下总结。
    var d = w.document;
    // 当w不是window对象时，w不存在document属性（undefined），有效的是ownerDocument属性，该属性值指代document
    // 当w是window时，w存在document属性，但不存在ownerDocument属性（undefined）。
    // 所以当执行下面if判断中的表达式时，会出现报错
    if (document.compatMode == "CSS1Compat")
        return {x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop};

    // 对怪异模式下
    return {x: d.body.scrollLeft, y: d.body.scrollTop};
}
// https://www.arduino.cc/
var w = document.querySelectorAll('a')[60];
w.pageXOffset;              // undefined
// USER-AGENT: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
w.document;                 // undefined
w.ownerDocument == document;      // true
window.document == document;      // true
window.ownerDocument;       // undefined
document.compatMode == "CSS1Compat";     // true

/**
 * 通过window对象的innerWidth和innerHeight属性，获取窗口的宽高
 * 
 * 例15-9：查询窗口的视口尺寸
 */
// 作为一个对象的w和h属性返回视口的尺寸
function getViewportSize(w) {
    // 使用指定的窗口，如果不带参数则使用当前窗口
    w = w || window;
    // 除了IE 8及更早的版本以外，其它浏览器都能用
    if (w.innerWidth != null)
        return {w: w.innerWidth, h: w.innerHeight};
    // 对标准模式下的IE（或任何浏览器）
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
        return {w: d.documentElement.clientWidth, h: d.documentElement.clientHeight};

    // 对怪异模式下
    // 该处书中实践有差异，使用情况如下总结。
    // 此时的 clientWidth 与 clientHeight 属性表示的是整个文档的宽高，不受限于视口的宽高
    return {w: d.body.clientWidth, h: d.body.clientHeight};
}
window.innerWidth;        // 1902
window.innerHeight;       // 937

document.documentElement.clientWidth;    // 1902
document.documentElement.clientHeight;   // 937

document.body.clientWidth;     // 1903；在文档中，此时的宽度没有主档扩大
document.body.clientHeight;    // 3820；文档的内容填充，过长

/**
 * 另外的方法获取移动偏移量
 * 
 * - Window对象的scrollX和scrollY属性
 */

/**
 * 查询元素的尺寸大小
 * 
 * 判断一个元素的尺寸和位置最简单的方法是调用它的 getBoundingClientRect() 方法。
 * 该方法在IE 5中引入，而现在当前所有的浏览器都已经实现。它不需要参数，返回一个有left、right、top和bottom属性的对象。
 * 
 * 这个方法返回元素在视口坐标中的位置。（getBoundingClientRect()方法名中的“Client”是一种间接指代，它就是Web浏览器客户端 —— 专指它定义的窗口或视口）
 * left和top属性是表示 “ 元素的左上角 ” （的点）的X和Y坐标，right和bottom属性表示 “ 元素的右下角 ” （的点）的X和Y坐标。
 * 
 * 为了转化为甚至用户滚动浏览器窗口以后仍然有效的文档坐标，需要加上滚动的偏移量：
 */
// https://www.arduino.cc/
var w = document.querySelectorAll('a')[60];
var box = w.getBoundingClientRect();     // 获得在视口坐标中的位置
    // {
    //     bottom: 930.859375, 
    //     height: 19, 
    //     left: 378.109375, 
    //     right: 556.515625, 
    //     top: 911.859375,
    //     width: 178.40625,
    //     x: 378.109375,
    //     y: 911.859375
    //     ...
    // }
    // bottom == height + top     // true
    // right == width + left     // true
    // x 和 y分表表示视口左上角的X和Y坐标
var offsets = getScrollOffset();         // 上面定义的工具函数
    // {x: 0, y: 1141}
var x = offsets.x + box.left;            // 转化为文档坐标
x == box.x;                              // true
var y = offsets.y + box.top;
y == box.y;                              // true

// getBoundingClientRect()返回的对象包含width和height属性，但是在原始的IE中未实现。通过计算得到：
height = box.height || box.bottom - box.top     // true
width = box.width || box.right - box.left     // true

/**
 * 元素的内容被一块可选的空白区域所包围，叫做内边距。内边距被边框包围，边框被外边距包围。内边距、边框和外边距都是靠可选的。
 * getBoundingClientRect()所返回的坐标包含元素的内边距和边框，但不包含元素的外边距。
 */

/**
 * 如果getBoundingClientRect()方法名中的“Client”指定了返回的矩形的坐标系，那么方法名中的“Buounding”作何解释？
 * 
 * 浏览器在布局时块状元素（如图片、段落和<div>元素等）总为矩形。但是，内联元素（如<span>、<code>和<b>等）可能跨多行，因此可能由多个矩形组成。
 * 想象一下，例如，一些被断成两行的斜体文本（用<i>和</i>标签标记的）。它的形状是由第一行的右边部分和第二行的左边部分两个矩形组成的（假设文本
 * 顺序是从左向右）。如果在内联元素上调用getBoundingClientRect()，它返回“边界矩形”。
 * 对于上述的<i>元素，边界矩形会包含整整两行的宽度。
 * 
 * 如果想查询内联元素每个独立的矩形，调用getClientRects()方法来获得一个只读的类数组对象，它的每个元素类似于getBoundingClientRect()返回的
 * 矩形对象。
 * 
 * 使用getBoundingClientRect()方法和getClientRects()方法返回的的结果并不是实时的。它们只是调用方法时文档视觉状态的静态快照，在用户更新或
 * 改变浏览器窗口大小时不会更新它们。
 */
// https://www.arduino.cc/
// 跨行的内联元素
var w = document.querySelectorAll('a')[57];
w.getBoundingClientRect();
    // {
    //     bottom: 632.859375
    //     height: 44
    //     left: 351.5
    //     right: 670.40625
    //     top: 588.859375
    //     width: 318.90625
    //     x: 351.5
    //     y: 588.859375
    //     ...
    // }
w.getClientRects();
    // {
    //     '0': {
    //         bottom: 607.859375,
    //         height: 19,
    //         left: 620.53125,
    //         right: 670.40625,
    //         top: 588.859375,
    //         width: 49.875,
    //         x: 620.53125,
    //         y: 588.859375,
    //     },
    //     '1': {
    //         bottom: 632.859375,
    //         height: 19,
    //         left: 351.5,
    //         right: 401.859375,
    //         top: 613.859375,
    //         width: 50.359375,
    //         x: 351.5,
    //         y: 613.859375,
    //     }
    //     ...
    // }


/**
 * 判定元素在某点
 * 
 * getBoundingClientRect()方法使我们能在视口中判定元素的位置。但有时我们想反过来，判定在视口中指定位置上有什么元素。这可以使用Document对象
 * 的 elementFromPoint() （或elementsFromPoint()）方法来判定。传递 X 和 Y 坐标（视口坐标而非文档坐标），该方法返回在指定位置的一个元素。
 * 
 * 在写本书的这段时间里，选取元素的算法还未详细指定，但是该方法的意图是它返回在那个点的最里面的和最上面的（见16.2.1节中CSS的z-index属性）元素。
 * 如果指定的点在视口以外，elementFromPoint()返回null，即使该点在转换为文档坐标后是完美有效的，返回值也一样。
 * 
 * 典型的案例：将鼠标指针的坐标传递给它来判定鼠标在哪个元素上。但是，我们将在第17章学到，鼠标事件对象已经在target属性中包含了这些信息。因此，
 * 实际上elementFromPoint()不经常用。
 */


/**
 * 滚动
 * 
 * 通过文档的根节点（document.documentElement）来获取 scrollLeft 和 scrollTop 属性，还可以通过设置这些属性来让浏览器滚动。
 * 更简单的方法，从JavaScript最早的时期开始就支持。
 * Window对象的scrollTo()方法（和其同义词scroll()方法）接收一个点的X和Y坐标（文档坐标），并作为滚动条的偏移量设置它们。也就是，窗口滚动到指定的
 * 点出现在视口的左上角。如果指定的点太接近于文档的下边缘或右边缘。浏览器将尽量保证它和视口的左上角之间最近，但无法达到一致。
 */
// 滚动浏览器到最下面的页面可见
// 获得文档的高度
var documentHeight = document.documentElement.offsetHeight;
// 获得窗口或视口的高度
var viewportHeight = window.innerHeight;
// 滚动
window.scrollTo(0, documentHeight - viewportHeight);

/**
 * Window的scrollBy()方法和scroll()、scrollTo()方法类似，但是它的参数是相对的，并在当前滚动条的偏移量上增加。
 * 例如，快速阅读者可能会喜欢这样的书签。
 */
// 每200毫秒向下滚动10像素，注意，它无法关闭。
setInterval(function() { window.scrollBy(0, 10); }, 200);

/**
 * 通常，除了滚动到文档中用数字表示的位置，我们只想它滚动使得文档中的某个元素可见。这时就需要计算出元素在文档中的位置。
 * 
 * 利用getBoundingClientRect()方法计算元素的位置，并转换为文档坐标，然后用scrollTo()方法达到目的。
 * 但是在需要显示的HTML元素上调用scrollIntoView()方便。
 * 该方法保证了元素能在视口中可见。默认情况下，它试图将元素的上边缘放在或尽量接近视口的上边缘。如果值传递false作为参数，它试图将元素的下边缘放在或
 * 尽量接近视口的下边缘。只要有助于元素在视口内可见，浏览器也会水平滚动视口。
 * 
 * scrollIntoView()的行为与设置window.location.hash为一个命名锚点（<a name="">元素）的名字后浏览器产生的行为类似。
 */


/**
 * 关于元素尺寸、位置和溢出的更多信息
 * 
 * 不使用getBoundingClientRect()方法的情况下：
 * - 元素的尺寸：
 *    任何HTML元素的只读属性 offsetWidth 和 offsetHeight 以CSS像素返回它的屏幕尺寸。
 *    返回的尺寸包含元素的边框和内边距，除去了外边距。
 * 
 * - 元素的位置：
 *    任何HTML元素拥有 offsetLeft 和 offsetTop属性，表示元素的X和Y坐标。
 *    对于很多元素，这些值是文档坐标，并直接指定元素的位置。
 *    但对于已定位元素的后代元素和一些其他元素（如表格单元），这些属性返回的坐标是相对于祖先元素的而非文档。
 *      
 *    offsetParent属性指定这些属性所相对的父元素。
 *    如果offsetParent为null，这些属性都是文档坐标，因此，一般来说，用offsetLeft和offsetTop来计算元素e的位置需要一个循环。
 */
// 计算元素e的位置
function getElementPosition(e) {
    var x = 0,
        y = 0;
    // 通过循环offsetParent对象链来累加偏移量，该函数计算指定元素的文档坐标。
    while(e!=null){
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return {x: x, y: y};
}

/**
 * 上述 getElementPosition() 函数并不总是计算正确的值。下面看看如何来修复它。
 * 
 * 除了这些名字以offset开头的属性以外，所有文档元素都定义了其他两组属性，其名称一组以client开头，另一组以scroll开头。
 * 即，每个HTML元素都有以下这些元素：
 * 
 * offsetWidth             clientWidth              scrollWidth
 * offsetHeight            clientHeight             scrollHeight
 * offsetLeft              clientLeft               scrollLeft
 * offsetTop               clientTop                scrollTop
 * offsetParent
 * 
 * 为了理解这些client和scroll属性，你需要知道HTML元素的实际内容有可能比分配用来容纳内容的盒子更大，因此单个元素可能有滚动条（见16.2.6节中overflow属性）。
 * 内容区域是视口，就像浏览器的窗口，当实际内容比视口更大时，需要把元素的滚动条位置考虑进去。
 */

/**
 * clientWidth、clientHeight类似offsetWidth、offsetHeight，不同的是它们包含边框大小，只包含内容和它的内边距。同时，如果浏览器在内边距和边框之间添加了
 * 滚动条，clientWidth和clientHeight在其返回值中也不包含滚动条。注意，对于类似<i>、<code>和<span>这些内联元素，clientWidth和clientHeight总是返回0。
 * 
 * clientLeft、clientTop属性没什么用：它们返回元素的内边距的外边缘和它的边框的外边缘之间的水平距离和垂直距离，通常这些值就等于左边和上边的边框宽度。
 * 但是，如果元素有滚动条，并且浏览器将这些滚动条放置在左侧或顶部（不常见），clientLeft和clientTop也就包含了滚动条的宽度。对于内联元素，clientLeft和
 * clientTop总是0。
 */

/**
 * scrollWidth和scrollHeight是元素的内容区域加上它的内边距再加上任何溢出内容的尺寸。当内容正好和内容区域匹配没有溢出时，这些属性与clientWidth和clientHeight
 * 是相等的。但当溢出时，它们包含溢出的内容，返回值比clientWidth和clientHeight更大。
 * 
 * 最后，scrollLeft、scrollTop指定元素的滚动条位置。在 getScrollOffsets() 方法（例15-8）中，在文档的根元素上我们查询过它们。注意scrollLeft和scrollTop是
 * 可写的属性，通过设置它们来让元素中的内容滚动。（HTML元素并没有类似Window对象的scrollTo()方法。）
 */

/**
 * 当文档包含可滚动的且有溢出内容的元素时，上述定义的getElementPosition()方法就不能正常工作了，因为它没有把滚动条考虑进去。
 * 这里有一个修正版，它从累计的偏移量中减去了滚动条的位置，这样一来，将返回的位置从文档坐标转换为视口坐标。
 */
function getElementPos(elt){
    var x = 0,
        y = 0;
    // 循环以累加偏移量
    for(var e = elt;e != null;e=e.offsetParent){
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    // 再次循环所有祖先元素，减去滚动的偏移量
    // 这也减去了主滚动条，并转换为视口坐标
    for(var e=elt.parentNode; e != null && e.nodeType == 1;e = e.parentNode) {
        x -= e.scrollLeft;
        y -= e.scrollTop;
    }
    return {x: x, y: y};
}

/**
 * 在现代浏览器中，getElementPos()方法的返回值和getBoundingClientRect()的返回值一样（但是更低效）。理论上，如getElementPos()这样的函数可以在
 * 不支持getBoundingClientRect()的浏览器中使用。但实际上，不支持getBoundingClientRect()的浏览器在元素位置方面有很多的不兼容性，像这样如此简陋
 * 的函数无法可靠地工作。
 * 实际类似jQuery这样的客户端类库也包含了一些函数来计算元素的位置，它们扩充了这个基本的位置计算算法，修复了一系列浏览器指定的bug。如果需要代码在
 * 所有不支持getBoundingClientRect()的浏览器中正确计算元素的位置，你可能需要像jQuery这样的类库。
 */




/**
 * HTML表单
 * 
 * 表单元素<form>、表单输入元��<input>、<select>、<button>
 * 服务端程序是基于表单提交动作的 —— 它们按表单大小的块处理数据 —— 这限制了它们的交互性。
 * 客户端程序是基于事件的 —— 它们可以对单独的表单元素上的事件做出响应 —— 这使得它们有更好的响应度。例如，用户打字时客户端程序就能检验输入的有效性。或者通过
 * 单击一个复选框来启用一些选项，也就是说当复选框被选中时那组选项才有意义。
 */

/**
 * 选取表单和表单元素
 * 
 * 
 * 
 */
// 使用getElementById()和getElementsByTagName()等标准的方法从文档中选取：
var fields = document.getElementById("address").getElementsByTagName("input");

// 使用querySelectorAll()从表单中选取所有的单选按钮或所有同名的元素：
// id为“shipping”的表单中所有的单选按钮
document.querySelectorAll('#shipping input[type="radio"]');
// id为“shipping”的表单中所有名字为“method”的单选按钮
document.querySelectorAll('#shipping input[type="radio"][name="method"]');

// 14.7节、15.2.2节、15.2.3节，有name或id属性的<form>元素能够通过很多方法来获取。
// name="address"属性的<form>可以用以下任何方法来获取
window.address;        //不可靠
document.address;      //仅当表单有name属性时可用
document.forms.address;//显式访问有name或id的表单
document.forms[n];     //不可靠，n是表单的序号

// 15.2.3节阐述了document.forms是一个HTMLCollection对象，可以通过数字序号、id或name来选取表单元素。
// Form对象本身的行为，类似于HTMLCollection对象，也可以通过name或数字序号来索引。
// 如果名为“address”的表单的第一个元素的name是“street”，可以使用以下任何一种表达式来引用该元素。
document.forms.address[0];
document.forms.address.street;
document.address.street;      // 当有name="address"，而不是只有id="address"

document.forms.address.elements[0];
document.forms.address.elements.street;

/**
 * 一般来说，指定文档元素的方法用id属性要比name属性更佳。但是，name属性在HTML表单提交中有特殊的目的，它在表单中较为常用，在其它元素较少使用。
 * 它应用于相关的复选按钮组和强制共享name属性值、互斥的单选按钮组。
 * 请记住，当用name来索引一个HTMLCollection对象并且它包含多个元素来共享name时，返回值是一个类数组对象，它包含所有匹配的元素。
 * 
 * <form name="shipping">
 *   <fieldset>
 *     <legend>Shipping Method</legend>
 *     <label><input> type="radio" name="method" value="1st">First-class</label>
 *     <label><input> type="radio" name="method" value="2day">2-day Air</label>
 *     <label><input> type="radio" name="method" value="overnight">Overnight</label>
 *   </fieldset>
 * </form>
 */
// 引用单选按钮元素组
var methods = document.forms.shipping.elements.method;

/**
 * 注意，<form>元素本身有一个HTML属性和对应的JavaScript属性叫“method”，所以在此案例中，必须要用该表单的elements属性而非直接访问method属性。
 * 为了判定用户选取哪种运输方式，需要遍历数组中的表单元素并检测它们的checked属性。
 */
var shipping_method;
for(var i=0; i<methods.length; i++) {
    if (methods[i].checked)
        shipping_method = methods[i].value;
}


/**
 * 表单和元素的属性
 * 
 * elements属性，访问表单的子元素。
 * Form对象的属性action、encoding、method、target属性（property）直接对应于<form>元素的action、encoding、method和target等HTML属性（property）。这些属性都
 * 控制了表单是如何来提交数据到Web服务器并如何显示的。客户端JavaScript能够设置这些属性，不过仅当表单真的会将数据提交到一个服务端程序时它们才有用。
 * 
 * 在JavaScript产生之前，需要一个专用的“提交”按钮来提交表单，一个专用的“重置”按钮来重置各表单元素的值。
 * JavaScript的Form对象，支持两个方法 “submit” 和 “reset”。
 * - submit()  
 *  调用Form对象的submit()方法里提交表单。
 * - reset()
 *  调用Form对象的reset()方法来重置表单元素的值。
 * 
 * 所有（或多数）表单元素通常有以下属性。
 * - type
 *  标识表单元素类型的只读的字符串。针对用<input>标签定义的表单元素而言，就是其type属性的值。其他表单元素（如<textarea>和<select>）定义type属性是为了轻松地
 *  标识它们，与<input>元素在类型检测时互相区别。
 * - form
 *  对包含元素的Form对象的只读引用，或者如果元素没有包含在一个<form>元素中则其值为null
 * - name
 *  只读的字符串，由HTML属性name指定
 * - value
 *  可读/写的字符串，指定了表单元素包含或代表的“值”。它就是当提交表单时发送到Web服务器的字符串。针对Text和Textarea元素，该属性值包含了用户输入的文本。
 *  针对用<input>标签创建的按钮元素（除了用<button>标签创建的按钮），该属性值指定了按钮显示的文本。
 *  针对单选和复选按钮元素，该属性用户不可见也不能编辑。它仅是用HTML的value属性来设置的一个字符串。它在表单提交时使用，但在关联表单元素的额外数据时也很有用。
 * 
 */


/**
 * 表单和元素的事件处理程序
 * 
 * <form>元素：
 * - onsubmit 事件处理程序，侦测表单提交。表单提交前调用onsubmit程序，它通过返回false能够取消提交动作。
 *      这给JavaScript程序一个机会来检查用户的输入错误，目的是为了避免不完整或无效的数据通过网络提交到服务端程序。
 *      该事件处理程序只能通过单击“提交”按钮来触发。直接调用表单的submit()方法不触发onsubmit事件处理程序。
 * - onreset 事件处理程序， 侦测表单重置。它在表单重置之前调用，通过返回false能阻止表单元素被重置。
 *      表单中很少需要“重置”按钮，但如果有，你可能需要提醒用户来确认是否重置。
 *      该事件处理程序只能通过单击“重置”按钮来触发。直接调用表单的reset()方法不触发onreset事件处理程序。
 */
document.forms[0].onreset = function () {
    return confirm("Really erase All input and start over?")
};

/**
 * - onclick 事件处理程序
 *      一般来说，当按钮表单元素激活（甚至当通过键盘而不是实际的鼠标单击发生激活）时，它们会触发click事件。
 * - onchange 事件处理程序
 *      当用户改变其他表单元素所代表的值时，它们会触发change事件。当用户在一个文本域输入文本或从下拉列表中选择一个选项后就发生这样的改变。
 *      注意，在一个文本域中该事件不是每次用户输入一个键值时就会触发。它仅当用户改变了元素的值然后将焦点转移到其他元素上时才会触发。也就是
 *      说，调用该事件处理程序就意味着一个完整的改变。
 *      
 * 单选按钮和复选按钮都有一个状态标识，它们的click和change事件都会触发，两个之中change事件更加有用。
 * 
 * - onfocus 事件处理程序
 *      表单元素在收到键盘的焦点时，触发该事件
 * - onblur 事件处理程序
 *      表单元素在失去键盘的焦点时，触发该事件
 * 
 * 在事件处理程序代码中，关键字this是触发该事件的文档元素的一个引用。既然在<form>元素中的元素都有一个form属性引用了该包含的表单。这些元素
 * 的事件处理程序总是能通过this.form来得到Form对象的引用。
 */


/**
 * 按钮
 * 
 * 按钮元素没有默认的行为，除非它有onclick事件处理程序，否则它并没什么用处。以<input>元素定义的按钮会将value属性值以纯文本显示。以<button>元素
 * 定义的按钮会将元素的一切内容显示出来。
 * 注意，超链接与按钮一样提供onclick程序处理程序。当onclick事件所触发的动作可以概念化为“跟随此链接”时就用一个链接；否则，用按钮。
 * 
 * 提交和重置元素本就是按钮，不同的是它们有与之相关联的默认动作（表单的提交和重置）。如果onclick事件处理程序返回false，这些按钮的默认动作就不再
 * 执行了。可以使用提交元素的onclick事件处理程序来执行表单校验，但是更为常用的是使用Form对象本身的onsubmit事件处理程序来执行表单校验。
 */


/**
 * 开关按钮
 * 
 * 复选框于和单选元素是开关按钮，或称为两种视觉状态的按钮：选中或未选中。通过对其单击用户可以改变它的开关状态。
 * 单选元素为整组有相关性的元素而设计的，组内所有按钮的HTML属性name的值都相同。按这种方式创建的单选按钮是互斥的：选中其一，之前选中的即变为未选中。
 * 复选框元素通常也整组使用并共享name属性，必须注意的是当利用作为表单属性的名字来选中这些元素时，它返回一个类数组对象而不是单个元素。
 * 
 * 单选和复选框元素都定义了checked属性。该属性是可写/读的布尔值，它指定了元素当前是否选中。
 * defaultChecked属性也是布尔值，它是HTML属性checked的值，它指定了元素在第一次加载页面时是否选中。
 * 
 * 单选和复选框元素本身不显示任何文本，它们通常和相邻的HTML文本一起显示（或与<label>元素相关联）。这意味着设置复选框或单选元素的value属性不改变元素
 * 的视觉表现。设置value只改变提交表单时发送到Web服务器的字符串。
 * 
 * 当用户单击单选或复选开关按钮，单选或复选框元素触发onclick事件。如果由于单击开关按钮改变了它的状态，它也触发onchange事件。（但注意，当用户单击其它
 * 单选按钮而导致这个单选按钮状态的改变，后者不触发onchange事件。）
 */


/**
 * 文本域
 * 
 * 单行文本输入域。
 * - value 属性表示用户输入的文本。通过设置该属性值可以显式地指定应该在输入域中显示的文本。
 * - placeholder 属性指定了用户输入前在输入域中显示的提示信息。
 *      Arrival Date: <input type="text" name="arrival" placeholder="yyyy-mm-dd">
 * 
 * 文本输入域的onchange事件处理程序是在用户输入新的文本或编辑已存在的文本时触发，它表明用户完成了编辑并将焦点移出了文本域。
 * 
 * Textarea元素类似文本输入域元素，不同的是它允许用户输入（和JavaScript程序显示）多行文本。
 * Textarea元素使用<textarea>标签来创建，与用<input>标签创建的文本域在语法上有显著区别。两种元素的行为非常类似。
 * 如同针对Text元素一样，可以用Textarea元素的value属性和onchange事件处理程序。
 * 
 * <input type="password"> 元素在输入时显式星号，它修改了输入的文本。防止用户输入时，被背后的人看到。注意，密码输入只能防止眼睛窥探，但在表单提交的时候
 *  输入未经任何加密（除非通过安全的HTTPS连接提交它），当在网络上传输时它可能被看见。
 * <input type="file"> 元素将用户输入待上传到Web服务器的文件的名称。该文件选取元素拥有onchange事件处理程序，就像普通的输入域一样。但不同的是，它的value
 *  是只读的。这个防止恶意的JavaScript程序欺骗用户上传本意不想共享的文件。
 * 
 * 不同的文本输入元素定义 onkeypress、onkeydown和onkeyup事件处理程序。可以从onkeypress或onkeydown事件处理程序返回false，防止记录用户的按键。这很有用，
 *  例如，如果希望强制用户在特定文本输入域中仅输入数字。
 */


/**
 * 选择框和选项元素
 * 
 * Select元素表示用户可以做出选择的一组选项（用Option元素表示）。浏览器通常将其渲染为下拉菜单的形式，但当指定其size属性值大于1时，它将显示为列表中的选项（可能有滚动）。
 * Select元素能以两种不同的方式运作，这取决于它的type属性值是如何设置的。
 * 如果<select>元素有multiple属性，也就是Select对象的type属性值为“select-multiple”，那就允许用户选取多个选项。否则，如果没有多选属性，那只能选取单个选项，
 * 它的type属性值是“select-one”。
 * 
 * Select元素定义了options属性，它是一个包含了多个Option元素的类数组对象。
 * 当用户选取或取消选取一个选项时，Select元素触发onchange事件处理程序。
 * 针对“select-one” Select元素，它的可读/写属性selectedIndex指定了哪个选项当前被选中。
 * 针对“select-multiple” Select元素，单个selectIndex属性不足以表示被选中的一组选项。这种情况下，要判定哪些选项被选中，就必须遍历options[]数组的元素，
 * 并检查每个Option对象的selected属性的值。
 * 
 * 除了其selected属性，每个Option对象都有一个text属性，它指定了在Select元素中的选项所显示的纯文本字符串。设置该属性可以改变显示给用户的文本。
 * value属性指定了在提交表单时发送到Web服务器的文本字符串，它也是可读/写的。甚至在写纯客户端程序并且不可能有表单提交时，value属性（或它所对应的HTML属性value）是用来
 * 保存任何数据的好地方，在用户选取特定的选项时可以使用这些数据。注意，Option元素并没有与表单相关的事件处理程序：用包含Select元素的onchange事件处理程序来代替。
 * 
 * 通过设置options.length，可以截断Option元素数组，而设置options.length为0可以从Select元素中移除所有的选项。
 * 设置options [] 数组中某点的值为null，可以从Select元素中移除单个Option对象。这将删除该Option对象，options []数组中高端的元素自动下移来填补空缺。
 * 
 */
// 为Select元素增加一个新的选项，首先用Option构造函数创建一个Option对象，然后添加到options[]属性中
// 创建新选项
var zaire = new Option(
    "Zaire",     // text属性
    "zaire",     // value
    false,       // defaultSelected属性
    false        // selected属性
);
// 通过添加到options数组，在Select元素中显示该选项
var countries = document.address.country;         // 得到Select对象
countries.options[countries.options.length] = zaire;

/**
 * 这些专用的Select元素的API已经很老了。可以用那些标准的调用更明确地插入和移除选项元素：Document.creatElement()、Node.insertBefore()、Node.removeChild()。
 */




/**
 * 其它文档特性
 */

/**
 * Document的属性
 */

/**
 * document.write()方法
 */

/**
 * 查询选取的文本
 * 
 * 判断用户在文档中选取了哪些文本，
 */

/**
 * 可编辑的内容
 */