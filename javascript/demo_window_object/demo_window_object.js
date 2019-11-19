/**
 * window对象
 */



/**
 * 计时器
 * 
 * 两者用来注册在指定的时间之后单次或重复调用的函数，它们都是客户端JavaScript的全局函数，所以定义为Window对象的方法。
 * - setTimeout()
 * - setInterval()
 */

/**
 * setTimeout()：实现一个函数在指定的毫秒数之后运行。
 * 
 * 它返回一个值，这个值可以传递给clearTimeout()用于取消这个函数的执行。
 */

/**
 * setInterval()：实现一个函数在指定的毫秒数的间隔里重复调用。
 * 
 * 它返回一个值，这个值可以传递给clearInterval()用于取消后续函数的调用。
 */
setInterval(updateClock, 60000);  // 每60s调用一次updateClock()

/**
 * 例14-1定义的引用函数会在指定等待的时间之后，开始重复调用某个函数，然后过一段时间之后取消函数调用。该例子演示了
 * setTimeout()、setInterval()、clearInterval()的用法
 * 
 * 定时器应用函数
 * 安排函数f()在未来的调用模式
 * 在等待了若干毫秒之后调用f()
 * 如果设置了interval并没有设置end参数，则对f()的调用不会停止
 * 如果没有设置interval和end参数，只在若干毫秒后调用f()一次
 * 只有指定了f()，才会从start=0的时刻开始
 * 注意，调用invoke()不会阻塞，它会立即返回
 */
function invoke(f, start, interval, end){
    // 默认设置为0秒
    if(!start) start=0;

    if(arguments.length <=2) {
        // 单次调用模式
        setTimeout(f, start)
    }else {
        // 多次调用模式
        function repeat(){
            var h = setInterval(f, interval);
            // 在end毫秒后停止调用，前提是end已经定义了
            if (end) setTimeout(function (){ clearInterval(h); }, end)
        }
        setTimeout(repeat, start);
    }
}

/**
 * 如果以0毫秒的超时时间来调用setTimeout()，那么指定的函数不会立即执行。相反，会把它放到队列中，等到前面处于等待状态的事件处理程序全部执行完成，再调用它。
 * jQuery的作者John Resig曾经写过一篇文章来解释这个队列，https://johnresig.com/blog/how-javascript-timers-work/ 。
 */



/**
 * 浏览器定位和导航
 * 
 * Window对象的location属性引用的是Location对象，它表示该窗口中当前显示的文档的URL，并定义了方法来使窗口载入新的文档。
 *          window.loaction == document.location // true，Document对象的location属性也引用到Location对象
 * 
 * Document对象也有一个URL属性，是文档首次载入后保存该文档的URL的静态字符串。如果定位到文档中的片段标识符（如#table-of-contents），Location对象会做
 * 相应的更新，而Document.URL属性却不会改变。
 */

/**
 * 解析URL
 * 
 * Window对象的location属性引用的是Location对象，它表示该窗口中当前显示的文档的URL。Location对象的href属性是一个字符串，后者包含URL的完整文本。
 * Location对象的toString()方法返回href属性的值，因此在会隐式调用toString()的情况下，可以使用location代替location.href。
 * 
 * 这个对象的其它属性：protocol、host、hostname、port、pathname、search。分别表示URL的各个部分，它们称为“URL分解”属性，同时被Link对象（通过HTML文档
 * 中的`<a>`和`<area>`元素创建）支持。
 * 
 * Location对象中的hash属性。如果有的话，hash属性返回URL中的“片段标识符”部分。
 * Location对象中的search属性。如果有的话，search属性返回URL中问好之后的部分，通常是某种类型的查询字符串。一般来说，这部分是用来参数化URL并在其中嵌入参数。
 * 
 * 虽然这些参数通常用于运行在服务器上的脚本，但在启用JavaScript的页面中当然也可以使用它们。
 */
/**
 * 例14-2展示了一个通用函数的urlArgs()的定义，可以用这个函数将参数从URL的search属性中提取出来。该例子用到decodeURIComponent()，后者是在客户端JavaScript
 * 定义的全局函数。
 * 
 * 提取URL的搜索字符串中的参数
 * 
 * 这个函数用来解析来自URL的查询串中的name=value参数对，它将name=value对存储在一个对象的属性中，并返回该对象。
 * 使用方法：
 * var args = urlArgs();       // 从URL中解析参数
 * var q = args.q || "";       // 如果参数定义了的话就使用参数，否则使用一个默认值
 * var n = args.n ? parseInt(args.n) : 10;
 */
function urlArgs(){
    var args = {};
    var query = localtion.search.substring(1);    // 查询字符串，去掉“?”
    var pairs = query.split("&");                 // 根据“&”符号将查阅字符串隔开
    for(var i=0;i<pairs.length;i++){
        var pos = pairs[i].indexOf("=");
        if(pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos+1);
        value = decodeURIComponent(value);        // 对value进行解码
        args[name] = value;
    }
    return args;
}

/**
 * 载入新的文档
 * 
 * assign()、replace()、reload()
 * 
 * Location对象的assign()方法可以使窗口载入并显示你指定的URL中的文档。replace()方法也类似，但它在载入新文档之前会从浏览历史中把当前文档删除。
 * 如果脚本无条件地载入一个新文档，replace()方法可能是比assign()方法更好的选择。否则，“后退”按钮会把浏览器带回到原始文档，而相同的脚本则会再次
 * 再次载入新文档。
 * 如果检测到用户的浏览器不支持某些特性来显示功能齐全的版本，可以用location.replace()来载入静态的HTML版本：
 *     // 如果浏览器不支持XMLHttpRequest对象
 *     // 则将其重定向到一个不需要Ajax的静态页面
 *     if (!XMLHttpRequest) location.replace("staticpage.html");
 * 
 * 注意，在这个例子中传入replace()的是一个相对的URL。相当于当前页面所在目录来解析的，就像将它们用于一个超链接中。
 * 
 * 除了assign()和replace()方法，Location对象还定义了reload()方法，后者可以让浏览器重新载入当前文档。
 * 
 * 使浏览器跳转到新页面的一种更为传统的方法是直接把新的URL赋值给location属性：
 *      location = "http://www.oreilly.com";  // 在此网站购买书！
 * 还可以把相对URL赋值给location，它们会相对当前URL进行解析：
 *      location = "page2.html";              // 载入下一个页面
 * 纯粹的片段标识符是相对URL的一种类型，它不会让浏览器载入新文档，但只会使用它滚动到稳当的某个位置。“#top”标识符是个特殊的例子：如果文档中没有
 * 元素的ID是“top”，它会让浏览器跳到文档的开始处。
 *      location = "#top";                    // 跳到文档顶部
 * Location对象的URL分解属性是可写的，对它们重新赋值会改变URL的位置，并且导致浏览器载入一个新文档（如果改变的是hash属性，则在文档中进行跳转）
 *      location.search = "?page=" + (pagenum+1);   // 载入下一个页面
 */



/**
 * 浏览历史
 * 
 * Window对象的history属性引用的是该窗口的History对象。History对象是用来把窗口的浏览历史用文档和文档状态列表的形式表示。
 * HIstory对象的length属性表示浏览历史列表中的元素数量，但由于安全的因素，脚本不能访问已保存的URL。（如果允许，则任意脚本都可以窥探你的浏览历史）
 * 
 * History对象的back()和forward()方法与浏览器的“后退”和“前进”按钮一样：它们使浏览器在浏览历史中前后跳转一格。
 * go()方法接受一个整数参数，可以在历史列表中向前（正参数）或向后（负参数）跳过任意多个页。
 *       history.go(-2);                      // 后退两个历史记录，相当于单击“后退”按钮两次
 * 
 * 如果窗口中包含多个子窗口（比如<iframe>元素），子窗口的浏览历史会按时间顺序穿插在主窗口的历史中。这意味着在主窗口调用history.back()可能会导致其中一个
 * 子窗口往回跳转到前一个显示的文档，但主窗口保留当前状态不变。 
 * 
 * 现代Web应用可以不通过载入新文档而动态地改变自身内容。这么做可能希望用户能用“后退”和“前进”按钮这些动态创建的应用状态之间进行跳转。HTML5将标准化。
 * 
 * 
 */



/**
 * 浏览器和屏幕信息
 * 
 * Window对象的navigator和screen属性。它们分别引用的是Navigator和Screen对象，而这些对象提供的信息允许脚本来根据环境定制自己的行为。
 */

/**
 * Navigator对象
 * 
 * Window对象的navigator属性引用的是包含浏览器厂商和版本信息的Navigator对象。过去，Navigator对象通常被用来确定它们是在IE中运行还是在Netscape中运行。
 * 
 * 该对象有4个属性用于提供关于运行中的浏览器的版本信息。
 * appName：Web浏览器的全称。在IE中，这是“Microsoft Internet Explorer”，在Firefox中，该属性就是“Netscape”。为了兼容现存的浏览器嗅探代码，其他浏览器通常也取“Netscape”。
 * appVersion：此属性通常以数字开始，并跟着包含浏览器厂商和版本信息的详细字符串。字符串前面的数字通常是4.0或5.0，表示它是第4或第5代兼容的浏览器。
 *              appVersion没有标准的格式，所以没法直接用它来判断浏览器的类型。
 * userAgent：浏览器在它的USER-AGENT HTTP头部发送的字符串。这个属性通常包含appVersion中的所有信息，并且通常可能包含其它的细节。和appVersion一样，它也没有标准的格式。由于
 *              这个属性包含绝大部分信息，因此浏览器嗅探代码通常用它来嗅探。
 * platform：在其上运行浏览器的操作系统（并且可能是硬件）的字符串。
 * 
 * 例14-3展示了如何用正则表达式（摘自JQuery）从navigator.userAgent中抽取浏览器名称和版本号的方法。
 */
var browser = (function(){
    var s = navigator.userAgent.toLowerCase();
    var match = /(webkit)[ \/]([\w.]+)/.exec(s)
             || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(s)
             || /(msie) ([\w.])+/.exec(s)
             || !/compatible/.test(s) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s)
             || [];
    return {name: match[1] || "", version: match[2] || "0" };
}());

/**
 * 除了浏览器厂商和版本信息的属性之外，Navigator对象还包含一些杂项的属性和方法。以下是一些标准的属性以及广泛应用但未标准的属性：
 * onLine：表示浏览器当前是否连接到网络。应用程序可能希望在离线状态下把状态保存在本地。
 * geolocation：Geolocation对象定义用于确定用户地理位置信息的接口。
 * javaEnabled：一个非标准的方法，当前浏览器可以运行java小程序时返回true。
 * cookieEnable()：非标准的方法（或属性）。如果浏览器可以保存永久的cookie时，返回true。当cookie配置为“视具体情况而定”时可能会返回不正确的值。
 */

/**
 * Screen对象
 * 
 * Window对象的screen属性引用的是Screen对象。它提供有关窗口显示的大小和可用的颜色数量的信息。
 * 属性width和height指定的是以像素为单位的窗口大小。
 * 属性availWidth和availHeight指定的是实际可用的显示大小，它们排除了像桌面任务栏这样的特性所占用的空间。
 * 属性colorDepth指定的是显示的BPP（bits-per-pixel）值，典型的有16、24和32。
 * 
 * 可以使用Screen对象来确定Web应用是否运行在一个小屏幕的设备上，比如上网本。如果屏幕空间有限，可能要选择用更小的字体和图像等。
 * 
 */



/**
 * 对话框
 * 
 * Window对象提供了3个方法来向用户显示简单的对话框。
 * alert()向用户显示一条消息并等待用户关闭对话框。
 * confirm()也显示一条消息，要求用户单击“确定”或“取消”按钮，并返回一个布尔值。
 * prompt()同样也显示一条消息，等待用户输入字符串，并返回那个字符串。
 */
do {
    var name = prompt("What is your name?");
    var correct = confirm("You entered '" + name +"'.\n" +
          "Click Okay to proceed or Cancel to re-enter.")
} while( !correct )
alert("Hello, " + name);




/**
 * 错误处理
 * 
 * Window对象的onerror属性是一个事件处理程序，当未捕获的异常传播到调用栈上时就会调用它，并把错误消息输出到浏览器的JavaScript控制台上。
 * 如果给这个属性赋一个函数，那么只要这个窗口中发生了JavaScript错误，就会调用该函数，即它成了窗口的错误处理程序。
 * 
 * 由于历史原因，Window对象的onerror事件处理函数的调用通过三个字符串参数，而不是通过通常传递的一个事件对象。（其他客户端对象的onerror
 * 处理程序所需要的错误条件是不一样的，但是它们都是正常的事件处理程序，向这个函数只须传入一个事件对象。）
 * window.onerror的第一个参数是描述错误的一条消息。第二个参数是一个字符串，它存放引发错误的JavaScript代码所在的文档的URL。第三个参数
 * 是文档中发生错误的行数。
 * 除了这三个参数之外，onerror处理程序的返回值也很重要。如果onerror处理程序返回false，他通知浏览器事件处理程序已经处理了错误，不需要其
 * 它操作。换句话说，浏览器不应该显示它自己的错误消息。遗憾的是，由于历史原因，Firefox里的错误处理程序必须返回true来表示已经处理错误。
 * onerror处理程序是早期JavaScript的遗物，那时语言核心不包含try/catch异常处理语句。现在已经很少使用它了。但是，在开发阶段，你可能要像
 * 这样定义一个错误处理程序，当有错误发生时，来显式通知你。
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror
 */
window.onerror = function(msg, url, line){
    if (onerror.num ++ < onerror.max){
        alert("ERROR" + msg + "\n" + url + ":" + line);
        return true;
    }
}
onerror.num = 0;
onerror.max = 3;



/**
 * 作为Window对象属性的文档元素
 * 
 * 如果在HTML文档中用id属性来为元素命名，并且如果Window对象没有此名字的属性，Window对象会赋予一个属性，它的名字是id属性的值，而它们
 * 的值指向表示文档元素的HTMLElement对象。
 * 
 * 我们已经说过，在客户端JavaScript中，Window对象是以全局对象的形态存在于作用域链的最上层，这意味着在HTML文档中使用的id属性会成为可
 * 以被脚本访问的全局变量。如果文档包含一个`<button id="okay">`标签，可以通过全局变量okay来引用此元素。
 * 但是，有一个重要的警告：如果Window对象已经具有此名字的属性，着就不会发生。比如，id是“history”、“location”、“navigator”的元素，
 * 就不会以全局变量的形式出现，因为这些ID已经占用了。同样，如果HTML 文档包含一个id为“x”的元素，并且在代码中声明并赋值给全局变量x，那
 * 么显式声明的变量会隐藏隐式的元素变量。如果脚本中的变量声明出现在命名元素之前，那这个变量的存在就会阻止元素获取它的window属性。
 */



/**
 * 多窗口和窗体
 * 
 * 一个Web浏览器窗口可能在桌面上包含多个标签页。每一个标签页都是独立的“浏览上下文”（browsing context），每一个上下文都有独立的window
 * 对象，而且相互之间互不干扰。
 */

/**
 * 打开和关闭窗口
 * 
 * 使用Window对象的open()方法可以打开一个新的浏览器窗口（或标签页，这通常和浏览器的配置选项有关）。Window.open()载入指定的URL到新的
 * 或已存在的窗口中，并返回代表那个窗口的Window对象。它有4个可选的参数。
 * open()的第一个参数是要在新窗口中显示的文档的URL。如果这个参数省略了（也可以是空字符串），那么会使用空页面的URL about:blank。
 * open()的第二个参数是新打开的窗口的名字。如果指定的是一个已经存在的窗口的名字（并且脚本允许跳转到那个窗口），会直接使用已存在的窗口。
 *      否则，会打开新的窗口，并将这个指定的名字复制给它。如果省略此参数，会使用指定的名字“_blank”打开一个新的、未命名的窗口。
 * 
 * 脚本是无法通过简单地猜测窗口的名字来操控这个窗口中的Web应用的，只有设置了“允许导航”（allow to navigate）的页面才可以这样。宽泛地讲，
 * 当且仅当窗口包含的文档来自相同的源或者是这个脚本打开了那个窗口（或者递归地打开了窗口中打开的窗口），脚本才可以只通过名字来制定存在的
 * 窗口。还有，如果其中一个窗口是内嵌在另一个窗口里的窗体，那么在它们的脚本之间就可以相互导航。这种情况下，可以使用保留的名字“_top”（顶
 * 级祖先窗口）和“_parent”（直接父级窗口）来获取彼此的浏览上下文。
 * 
 * 窗口的名字是非常重要的，因为它允许open()方法引用已存在的窗口，并同时可以作为<a>和<form>元素上的HTML target属性的值，用来表示引用的
 * 文档（或表单提交结果）应该显示在命名的窗口中。这个target属性的值可以设置为“_blank”、“_parent”或“_top”，从而使引用的文档显示在新的
 * 空白窗口、父窗口/窗体或顶层窗口中。
 * Window对象如果有name属性，就用它保存名字。该属性是可写的，并且脚本可以随意设置它。如果传递给window.open()一个除“_blank”之外的名字，
 * 通过该调用创建的窗口将以该名字作为name属性的初始值。如果<iframe>元素有name属性，表示该iframe的Window对象会用它作为name属性的初始值。
 * 
 * open()的第三个可选参数是一个以逗号分隔的列表，包含大小和各种属性，用以表名新窗口是如何打开的。如果省略这个参数，那么窗口就会用一个默认
 *      的大小，而且带有一整组标准的UI组件，即菜单栏、状态栏、工具栏等。在标签式浏览器中，会创建一个新的标签页。
 *      另一方面，如果指定这个参数，就可以指定窗口的尺寸，以及它包含的一组属性。（显式指定窗口尺寸更像是创建新窗口，而不是标签页）。例如，
 *      要打开允许改变大小的浏览器窗口，并且包含状态栏、工具栏和地址栏等，就可以这样写：
 *      var w = window.open("smallwin.html", "smalllwin",
 *                          "width=400,height=350,status=yes,resizable=yes");
 *      第三个参数是非标准的。HTML5规范也主张忽略它。
 * open()的第四个参数只在第二个参数命名的是一个存在的窗口时才有用。它是一个布尔值，声明了由第一个参数指定的URL是应用替换掉窗口浏览历史
 *      的当前条目（true），还是应该在窗口浏览历史中创建一个新的条目（false），后者是默认的条目。
 * open()的返回值是代表命名或新创建的窗口的Window对象。可以在自己的JavaScript代码中使用这个Window对象来引用新创建的窗口，就像用隐式的
 *      Window对象window来引用运行代码的窗口一样：
 *      var w = window.open();
 *      w.alert("About to visit http://example.com");
 *      w.location = "http://example.com";
 * 
 * 在由window.open()方法创建的窗口中，opener属性引用的是打开它的脚本的Window对象。其它窗口中，opener为null：
 *      w.opener !== null;    // true
 *      w.open().opener === w;   // true
 * 
 * Window对象的close()方法将关闭一个窗口。如果已经创建了Window对象w，可以使用如下的代码将它关掉：
 *      w.close();
 * 运行在那个窗口中的JavaScript代码则可以使用下面的代码关闭：
 *      window.close()
 * 注意，要显式地使用标识符window，这样可以避免混淆Window对象的close()和Document对象的close()方法——如果正在从事件处理程序调用close()，这很重要。
 * 已关闭的窗口有个值为true的closed属性。
 */

/**
 * 窗体之间的关系
 * 
 * 
 */

/**
 * 交互窗口中的JavaScript
 */