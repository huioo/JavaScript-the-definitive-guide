/**
 * 事件处理
 * 
 * 客户端JavaScript是异步事件驱动编程模型。在这种程序设计风格下，当文档、浏览器、元素或与之相关的对象发生某些有趣的事情时，Web浏览器就会产生事件（event）。
 * 
 * 事件类型（event type）是一个用来说明发生什么类型事件的字符串。例如，“mouseover”表示用户移开鼠标，“keydown”表示键盘上某个键被按下，而“load”表示文档（或
 * 某个其他资源）从网络上加载完毕。由于事件类型只是一个字符串，因此实际上有时称之为事件名字（event name），我们用这个名字来标识所谈论的特定类型的事件。
 * 
 * 事件目标（event target）是发生的事件或与之相关的对象。当讲事件时，我们必须同时指明类型和目标。例如，window上的load事件或<button>元素的click事件。
 * 
 * 事件处理程序（event handler）或事件监听程序（event listener）是处理或响应事件的函数。（包括HTML5规范在内的一些资料基于它们注册的方式从技术上区分处理程序
 * （handler）和监听程序（listener），但本书视这两个技术术语为同义词。）应用程序通过指明事件类型和事件目标，在Web浏览器中注册它们的事件处理程序函数。当在特定
 * 的目标上发生特定类型的事件时，浏览器会调用对应的处理程序。
 * 当对象上注册的事件处理程序被调用时，我们有时会说浏览器“触发”（fire、trigger）和“派发”（dispatch）了事件。
 * 
 * 事件对象（event object）是与特定事件相关且包含有关该事件详细信息的对象。事件对象作为参数传递给事件处理程序函数（不包括IE 8及之前版本，在这些浏览器中有时仅
 * 能通过全局变量event才能得到）。
 * 所有的事件对象都有用来指定事件类型的type属性和指定事件目标的target属性。（在IE 8及之前版本中用srcElement而非target。）每个事件类型都为其相关事件对象定义
 * 一组属性。例如，鼠标事件的相关对象会包含鼠标指针的坐标，而键盘事件的相关对象会包含按下的键和辅助键的详细信息。
 * 许多事件类型仅定义了像type和target这样少量的标准属性，就无法获取许多其他有用的信息。对于这些事件而言，只是事件简单地发生，无法得到事件的详细信息。
 * （注意，this 与 event.target 两者间存在差别，this注册该事件的元素对象，target（事件冒泡或捕获时）与该事件相关的元素对象）
 * 
 * 事件传播（event propagation）是浏览器决定哪个对象触发其事件处理程序的过程。对于单个对象的特定事件（比如window对象的load事件），必须是不能传播的。
 * 当文档元素上发生某个类型的事件时，然而，它们会在文档树上向上传播或“冒泡”（bubble）。如果用户移动鼠标指针到超链接上，在定义这个链接的<a>元素上首先会触发
 * mousemove事件，然后是在容器元素上触发这个事件，也许是<p>元素、<div>元素或Document对象本身。有时，在Document或其他容器元素上注册单个事件处理程序比在每个
 * 独立的目标元素上都注册处理程序要更方便。
 * 事件处理程序能通过调用方法或设置事件对象属性来阻止事件传播，这样它就能停止冒泡并且将无法在容器元素上触发处理程序。
 * 
 * 事件传播的另外一个形式称为事件捕获（event capturing），在容器元素上注册的特定处理程序有机会在事件传播到真实目标之前拦截（或“捕获”）它。
 * IE 8及之前的版本不支持事件捕获，所以不常用它。但是，当处理鼠标拖放事件时，捕获或“夺取”鼠标事件的能力是必需的。
 * 
 * 一些事件有与之相关的默认操作。例如，当超链接click事件时，浏览器的默认是按照链接加载新页面。事件处理程序可以通过返回一个适当的值、调用事件对象的某个方法或
 * 设置事件对象的某个属性来阻止默认操作的发生。这有时被称为“取消”事件。
 */




/**
 * 事件类型
 * 
 * 
 */

/**
 * 传统事件类型
 * 
 * 1. 表单事件
 *    - 提交表单 <form> 元素触发submit事件
 *    - 重置表单 <form> 元素触发reset事件
 *    - 用户和类按钮表单元素（包括单选按钮和复选框）交互时，它们会发生 click 事件
 *    - 用户输入文字、选择选项或选择复选框来改变相应表单元素状态时，这些通常维护某种状态的表单元素会触发 change 事件
 *    - 文本输入域，只有用户和表单元素完成交互并通过Tab键或单击的方式移动焦点到其他元素上时，才会触发change事件。
 *    - 响应通过键盘改变焦点的表单元素在得到和失去焦点时会分别触发 focus 和 blur 事件。
 *    通过事件处理程序能取消submit和reset事件的默认操作，某些click事件也是如此。focus和blur事件不会冒泡，但其他所有表单事件都可以。IE定义了
 *    focusin和focusout事件可以冒泡，它们可以用于替代focus和blur事件。jQuery库为不支持focusin和focusout事件的浏览器模拟了这两个事件，同时
 *    3级DOM事件规范也正在标准它们。
 *    无论用户何时输入文字（通过键盘或剪切和粘贴）到 <textarea> 和其他文本输入表单元素，除IE外的浏览器都会触发input事件。不像change事件，每次
 *    文字插入都会触发input事件。遗憾的是，input事件的事件对象没有指定输入文本的内容。
 * 
 * 2. Window事件
 *    Window事件是指事件的发生与浏览器窗口本身而非窗口中显示的任何特定文档内容相关。但是，这些事件中有一些会和文档元素上发生的事件同名。
 *    - load事件。当文档和其所有外部资源（比如图片）完全加载并显示给用户时就会触发它。DOMContentLoaded和readystatechange是load事件的替代方案，
 *      当文档和其元素为操作准备就绪，但外部资源完全加载完毕之前，浏览器就会尽早触发它们。
 *    - unload事件。和load事件相对，当用户离开当前文档转向其他文档时会触发。unload事件处理程序可以用于保存用户的状态，但它不能用于取消用户转向
 *      其他地方。
 *    - beforeunload事件。和unload事件类似，但它能提供询问用户是否确定离开当前页面的机会。如果beforeunload的处理程序返回字符串，那么在新页面加
 *      载之前，字符串会出现在展示给用户确认的对话框上，这样用户将有机会取消其跳转而留在当前页上。
 *    - Window对象的onerror属性有点像事件处理程序，当JavaScript出错时会触发它。但是，它不是真正的事件处理程序，因为它能用不同的参数来调用。
 *    - focus和blur事件。这两个事件也能用作Window事件，当浏览器窗口从操作系统中得到或失去键盘焦点时就会触发它们。
 *    - resize事件。用户调整窗口大小时触发。传递给resize事件处理程序的事件对象是一个非常普通的Event对象，它没有指定调整大小的详细信息属性，但可以
 *      通过15.8节介绍的技术来确定新窗口的尺寸。
 *    - scroll事件。用户滚动窗口时触发。scroll事件也能在任何可以滚动的文档元素上触发，比如那些设置CSS的overflow属性的元素。传递给scroll事件处理
 *      程序的事件对象是一个非常普通的Event对象，它没有指定发生滚动的详细信息属性，但可以通过15.8节介绍的技术来确定新窗口的滚动条的位置。
 * 
 * 3. 像<img>元素这样的单个文档元素，也能为load和error事件注册处理程序。当外部资源（例如图片）完全加载或发生阻止加载的错误时就会触发它们。某些浏
 *    览器也支持abort事件（HTML5将其标准化），当图片（或其他网络资源）因为用户停止加载进程而导致失败就会触发它。
 *  
 * 4. 鼠标事件
 *    当用户在文档上移动或单击鼠标时都会产生鼠标事件。这些事件在鼠标指针所对应的最深嵌套元素上触发，但它们会冒泡直到文档最顶层。传递给鼠标事件处理
 *    程序的事件对象有属性集，它们描述了当事件发生时鼠标的位置和案件状态，也指明当时是否有任何辅助键按下。
 *    clientX 和 clientY属性指定了鼠标在窗口坐标中的位置。
 *    button和which属性指定了按下的鼠标键是哪个。（查看Event参考页，这些属性难以简单使用）
 *    当键盘辅助键按下时，对应的属性 altKey、ctrlKey、metaKey、shiftKey 会设置为true。
 *    对于click事件，detail属性指定了其是单击、双击还是三击。
 * 
 *    - mousemove事件。用户每次移动或拖动鼠标时触发。这些事件非常频繁，所以mousemove事件处理程序一定不能触发计算密集型任务。
 *    - mousedown事件和mouseup事件。用户按下或释放鼠标按键时触发。
 *    通过注册mousedown和mousemove事件处理程序，可以探测和响应鼠标的拖动。合理地这样能够捕获鼠标事件，甚至当鼠标从开始元素移出时我们能够持续地接
 *      收到mouseover事件。17.5节包含一个处理拖动的示例。
 * 
 *    - click事件。在mousedown和mousemove事件队列之后，浏览器还会触发click事件。之前介绍过click事件是独立于设备的表单事件，但实际上它不仅仅在表
 *      单元素上触发，它可以在任何文档元素上触发，同时传递拥有之前介绍的所有鼠标相关额外字段的事件对象。
 *    - dbclick事件。如果用户在相当短的时间内连续两次单击鼠标按键，跟在第二个click事件之后是dbclick事件。
 *    - contextmenu事件。当单击鼠标右键时，浏览器通常会显示上下文菜单（context menu）。在显示菜单之前，它们通常会触发contextmenu事件，而取消这个
 *      事件就可以阻止菜单的显示。这个事件也是获得鼠标右击通知的简单方法。
 *    - mouseover事件。当用户移动鼠标指针从而使它悬停到新元素上时，浏览器就会在该元素上触发mouseover事件。
 *    - mouseout事件。当鼠标移动指针从而使它不再悬停在某个元素上时，浏览器就会在该元素上触发mouseout事件。
 *    对于这些事件，事件对象将有relatedTarget属性指明这个过程涉及的其他元素。（到Event参考页面查看relatedTarget属性的IE等效属性。）
 *    mouseover和mouseout事件和这里介绍的所有鼠标事件一样会冒泡。但这通常不方便，因为当触发mouseout事件处理程序时，你不得不检查鼠标是否真的离开
 *      目标元素还是仅仅是从这个元素的一个子元素移动到另一个。正因为如此，IE提供了这些事件的不冒泡版本mouseenter和mouseleave。jQuery模拟非IE的
 *      浏览器中这些事件的支持，同时3级DOM事件规范也标准了它们。
 * 
 *    - mousewheel事件。当用户滚动鼠标滚轮时触发（或在Firefox中是DOMMouseScroll事件）。传递的事件对象属性指定滚轮转动的大小和方向。3级DOM事件规范
 *      正在标准化一个更通用的多维wheel事件，一旦实现将取代mousewheel和DOMMouseScroll事件。17.6节包含一个mousewheel事件的示例。
 * 
 * 5. 键盘事件
 *    当键盘聚焦到Web浏览器时，用户每次按下或释放键盘上的按键时都会产生事件。键盘快捷键对于操作系统和浏览器本身有特殊意义，它们经常被操作系统或浏览器
 *    “吃掉”，并对JavaScript事件处理程序不可见。无论任何文档元素获取键盘焦点都会触发键盘事件，并且它们会冒泡到Document和Window对象。如果没有元素获
 *    得焦点，可以直接在文档上触发事件。传递给鼠标事件处理程序的事件对象有keyCode字段，它指定按下或释放的键是哪个。除了keyCode，键盘事件对象也有
 *    altKey、ctrlKey、metaKey、shiftKey，描述键盘辅助键的状态。
 * 
 *    - keydown和keyup事件，是低级键盘事件。无论何时按下或释放按键（甚至是辅助键）都会触发它们。
 *    - keypress事件，当keydown事件产生可打印字符时，在keydown和keyup之间会触发另一个keypress事件。当按下键重复产生字符时，在keyup事件之前可能产生
 *      很多keypress事件。keypress是较高级的文本事件，其事件对象指定产生的字符而非按下的键。
 *    所有浏览器都支持keydown、keyup和keypress事件，但有一些互用性问题，因为事件对象的keyCode属性值从未标准化过。3级DOM事件规范尝试解决之前的的互用性
 *    问题，但尚未实施。17.9节包含处理keydown事件的示例，17.8节包含处理keypress事件的示例。
 * 
 * 
 */


/**
 * DOM事件
 * 
 */


/**
 * HTML5事件
 * 
 * 用于播放音频和视频的<audio>和<video>元素，两者有长长的事件列表，它们触发各种关于网络事件、数据缓冲状况和播放状态的通知。
 * 
 * HTML5的拖放API允许JavaScript应用参与基于操作系统的拖放操作，实现Web和原生应用间的数据传输。
 * dragstart    drag    dragend    dragenter    dragover    dragleave    drop
 * 
 * HTML5定义了历史管理机制，它允许Web应用同浏览器的返回和前进按钮交互。
 * 
 * HTML5为HTML表单定义了大量的新特性。
 * 
 * HTML5包含了对离线Web应用的支持，它可以安装在本地应用缓存中，所以即使浏览器离线时它们依旧能运行，比如当移动设备不在网络范围内时。
 * 
 * 
 */


/**
 * 触摸屏和移动设备
 * 
 * 
 */




/**
 * 注册时间处理程序
 * 
 * 注册事件处理程序有两种方式
 * - 给事件目标对象或文档元素设置属性
 * - 将事件处理程序传递给对象或元素的一个方法
 * 每种都有两个版本。可以在JavaScript代码中设置事件处理程序为对象属性，或对于文档元素，可以在HTML中直接设置相应属性。
 * 对于通过方法调用的处理程序注册，有一个标准方法，命名为addEventListener()，除IE 8及以前的版本之外，所有浏览器都支持。而IE 9之前支持attachEvent()。
 */

/**
 * 设置JavaScript对象属性为事件处理程序
 * 
 * 按照约定，事件处理程序属性的名字由“on”后面跟事件名组成：onclick、onchange、onload、onmouseover等。注意，这些属性名是区分大小写的，所有都是小写，
 * 即使事件类型是由多个词组成（比如“readystatechange”）。
 * 
 * 这种事件处理程序注册技术适用于所有浏览器的所有常用事件类型。一般情况下，所有广泛实现的Web API定义的事件都允许通过设置事件处理程序属性来注册处理程序。
 * 事件处理程序属性的缺点是其设计都是围绕着假设每个事件目标对于每种事件类型将最多只有一个处理程序。如果想编写能够在任意文档中都能使用的脚本库代码，更好的
 * 方式是使用一种不修改或覆盖任何已有注册处理程序的技术（比如addEventListener()）。
 */
// 设置Window对象的onload属性为一个函数
// 该函数是事件处理程序，当文档加载完毕时调用它
window.onload = function() {
    // 查找一个<form>元素
    var elt = document.getElementById("shipping_address");
    // 注册事件处理程序函数
    // 表单提交之前调用它
    elt.onsubmit = function() { return validate(this); };
}

/**
 * 设置HTML标签属性为事件处理程序
 * 
 * 用于设置的文档元素事件处理程序属性（property）也能换成对应HTML标签的属性（attribute）。如果这样做，属性值应该是JavaScript代码字符串。这段代码应该
 * 应该是事件处理程序函数的主体，而非完整的函数声明。也就是说，HTML事件处理程序代码不应该用大括号包围且使用function关键字作为前缀。
 *      <button onclick="alert('Thank you');">点击这里</button>
 * 如果HTML事件处理程序属性包含多条JavaScript语句，要记住必须使用分号分隔这些语句或断开属性值使其跨多行。
 * 
 * 某些事件类型通常直接在浏览器而非任何特定文档元素上触发。在JavaScript中，这些事件处理程序在Window对象上注册。在HTML中，会把它们放到<body>标签上，但
 * 浏览器会在Window对象上注册它们。下面是HTML5规范草案定义的这类事件处理程序的完整列表：
 * onafterprint        onfocus        ononline          onresize
 * onbeforeprint       onhashchange   onpagehide        onstorage
 * onbeforeunload      onload         onpageshow        onundo
 * onblur              onmessage      onpopstate        onunload
 * onerror             onoffline      onredo
 * 
 * 
 */
// 当指定一串JavaScript代码作为HTML事件处理程序属性的值时，浏览器会把代码串转换为类似如下的函数中
function(event) {
    with(document) {
        with(this.form || {}) {
            with(this) {
                /** 编码 */
            }
        }
    }
}

/**
 * addEventListener()
 * 
 * 接受3个参数。
 * 第一个是要注册处理程序的事件类型，这个事件类型（或名字）是字符串的，但它不应该包括用于设置事件处理程序属性的前缀“on”。
 * 第二个是当指定类型的事件发生时应该调用的函数。
 * 第三个是布尔值，通常情况下，会给这个参数传递false。如果相反传递了true，那么函数将注册为捕获事件处理程序，并在事件不同的调度阶段调用。
 */

/**
 * <button id="mybutton">click me</button>
 * 
 * 下面代码中注册了click事件的两个处理程序。用“click”作为第一个参数调用addEventListener()不会影响onclick的值。
 * 单击按钮会产生2个alert()对话框。更重要的是，能通过多次调用addEventListener()为同一个对象注册同一事件类型的多个处理程序函数。
 * 当对象上发生事件时，所有该事件类型的注册处理程序都会按照注册的顺序调用。
 * 使用相同的参数在同一个对象上多次调用addEventListener()是没用的，处理程序仍然只注册一次，同时重复调用，也不会改变调用处理程序的顺序。
 */
var b = document.getElementById("mybutton");
b.onclick = function() {alert("Thanks")};
b.addEventListener("click", function() {alert("Thanks again.");}, false);

/**
 * removeEventListener()
 * 
 * 与addEventListener()方法相对，它同样有3个参数。它从对象中删除事件处理程序函数而非添加，它常用与临时注册事件处理程序，然后不久就删除它。
 * 例如，当你要得到mousedown事件时，可以为mousemove和mouseup事件注册临时捕获事件处理程序来看看用户是否拖动鼠标。当mouseup事件后，可以注销这些事件处理程序。
 * 
 *  document.removeEventListener("mousemove", handleMouseMove, True);
 *  document.removeEventListener("mouseup", handleMouseUp, True);
 */


 /**
  * attachEvent()
  */




/**
 * 事件处理程序的调用
 */

/**
 * 事件处理程序的参数
 * 
 * 通常调用事件处理程序时把事件对象作为它们的一个参数（有一个例外）。事件对象的属性提供了有关事件的详细信息。例如，type属性指定了发生的事件类型。
 * 在IE8及以前的版本，通过设置属性注册事件处理程序，当调用它们时并未传递事件对象。取而代之，需要通过全局对象window.event来获得事件对象。
 * 出于互通性，你能像如下那样编写事件处理程序，这样如果没有参数就使用window.event。
 */
function handler(event) {
    event = event || window.event;
    // 处理程序代码出现在这里
}

/**
 * 事件处理程序的运行环境
 * 
 * 事件处理程序在事件目标上定义，所以它们作为这个对象的方法来调用。这就是说，在事件处理程序函数内，this关键字指的是事件目标。attachEvent()注册
 * 的处理程序作为函数调用，它们的this值是全局（Window）对象。可以用如下代码解决。
 */
// 在制定事件目标上注册用于处理指定类型事件的指定处理程序函数
// 确保处理程序一直作为事件目标的方法调用
// 注意，这个方法注册的事件处理程序不能删除，因为传递给attachEvent()的包装函数没有保留下来传递给detachEvent()；
function addEvent(target, type, handler) {
    if (target.addEventListener){
        target.addEventListener(type, handler, false);
    }
    else {
        target.attachEvent(
            "on"+type,
            function(event){
                return handler.call(target, event);
            }
        );
    }
}

/**
 * 事件处理程序的作用域
 * 
 * 
 */

/**
 * 事件处理程序的返回值
 * 
 * 通过设置对象属性或HTML属性注册事件处理程序的返回值有时是非常有意义的。通常情况下，返回值false就是告诉浏览器不要执行这个事件相关的默认操作。
 * 例如，表单提交按钮的onclick事件处理程序能返回false阻止浏览器提交表单。（当用户的输入在客户端验证失败时，这是有用的。）类似地，如果用户输入不合适的字符串，
 * 输入域上的onkeypress事件处理程序能通过返回false来过滤键盘输入。
 * 
 * Window对象的onbeforeunload事件处理程序的返回值也非常有意义。当浏览器将要跳转到新页面时触发这个事件。如果事件处理程序返回一个字符串，那么它将出现在询问用户
 * 是否在离开当前页面的标准对话中。
 * 
 */

/**
 * 调用顺序
 * 
 * 文档元素或其他对象可以为指定事件类型注册多个事件处理程序。当适当的事件发生时，浏览器必须按照如下规则调用所有的事件处理程序：
 * - 通过设置对象属性或HTML属性注册的处理程序一直有效调用。
 * - 使用addEventListener()注册的处理程序按照它们的注册顺序调用。
 * - 使用attachEvent()注册的处理程序可能按照任何顺序调用，所以代码不应该依赖于调用顺序。
 */

/**
 * 事件传播
 * 
 * 当事件目标是Window对象或其他一些单独对象（比如XMLHttpRequest对象）时，浏览器简单地通过调用对象上适当的处理程序响应事件。
 * 当事件目标是文档或文档元素时，情况比较复杂。
 * 
 * 在调用目标元素上注册的事件处理函数后，大部分事件会“冒泡”到DOM树根。调用目标的父元素的事件处理程序，然后调用在目标的祖父元素上注册的事件处理程序。
 * 这会一直到Document对象，最后到达Window对象。
 * 事件冒泡为在大量单独文档元素上注册处理程序提供了替代方案，即在共同的祖先元素上注册一个处理程序来处理所有的事件。
 * 例如，可以在<form>元素上注册“change”事件处理程序来取代在表单的每个元素上注册“change”事件处理程序。
 * 
 * 发生在文档元素上的大部分事件都会冒泡，但值得注意的例外是focus、blur和scroll事件。
 * 文档上的load事件会冒泡，但它会在Document对象上停止冒泡而不会传播到Window对象。只有当整个文档都加载完毕时才会触发Window对象的load事件。
 * 
 * 事件冒泡是事件传播的第三个“阶段”。目标对象本身的事件处理程序调用是第二个阶段。第一阶段甚至发生在目标处理程序调用之前，称为“捕获”阶段。
 * addEventListener()把一个布尔值作为其第三个参数。如果这个参数是true，那么事件处理程序被注册为捕获事件处理程序，它会在事件传播的第一阶段调用。
 * 事件冒泡得到广泛的支持，它能用在包括IE在内的所有浏览器中，且无论事件处理程序用哪种方式注册（除非它们被注册为捕获事件处理程序）。而事件捕获只能用于以addEventListener()
 * 注册且第三个参数是true的事件处理程序中。
 * 
 * 事件传播的捕获阶段像反向的冒泡阶段。最先调用Window对象的捕获处理程序，然后是Document对象的捕获处理程序，接着是body对象的，再然后是DOM树向下，以此类推，
 * 直到调用事件目标的父元素的捕获事件处理程序。在目标对象本身上注册的捕获事件处理程序不会被调用。
 * 
 * 事件捕获提供了在事件没有送达目标之前查看它们的机会。事件捕获能用于程序调试，或用于后面介绍的事件取消技术，过滤掉事件从而使目标事件处理程序绝不会被调用。
 * 事件捕获常用于处理鼠标拖放，因为要处理拖放事件的位置不能是这个元素内部的子元素。
 */

/**
 * 事件取消
 * 
 * - 通过设置对象属性或HTML属性注册的事件处理程序，设置其返回值来取消事件的浏览器默认操作。（返回值为false就是告诉浏览器不要执行这个事件相关的默认操作。）
 * - 在支持addEventListener()的浏览器中，也能通过调用事件对象的preventDefault()方法取消事件的默认操作。
 * - 在事件处理程序函数中，通过设置事件对象的returnValue属性为false来取消事件的默认操作。
 */
// 假设一个事件处理程序，使用全部3种取消技术
function cancelHandler(event) {
    var event = event || window.event;
    /* 处理事件的代码 */

    // 现在取消事件相关的默认行为
    if (event.preventDefault) event.preventDefault();
    if (event.returnValue) event.returnValue = false;
    return false;     // 用于处理使用对象属性注册的处理程序
}

/**
 * 当前的DOM事件模型草案定义了Event对象属性defaultPrevented。它尚未得到广泛支持，但其目的是常态下这个属性是false，但如果preventDefault()被调用则将它变为true。
 * 
 * 取消事件相关的默认操作只是事件取消中的一种，我们也能取消事件传播。
 * 在支持addEventListener()的浏览器中，可以调用事件对象的一个stopPropagation()方法以阻止事件的继续传播。
 * 如果在同一对象上定义了其他处理程序，剩下的处理程序将依旧被调用，但调用stopPropagation()之后任何其他对象上的事件处理程序将不会被调用。
 * stopPropagation()方法可以在事件传播期间的任何时间调用，它能工作在捕获阶段，事件目标本身中和冒泡阶段。
 * 
 * IE 9之前的IE不支持stopPropagation()方法。相反，IE事件对象有一个cancelBubble属性，设置这个属性为true能阻止事件进一步传播。（IE8及之前版本不支持事件传播的捕获
 * 阶段，所以冒泡是唯一待取消的事件传播。）
 * 
 * 当前的DOM事件规范草案在Event对象上定义另一个方法，命名为stopImmediatePropagation()。类似stopPropagation()，这个方法阻止了任何其他对象的事件传播，但也阻止了在
 * 相同对象上注册的任何其他事件处理程序的调用。在写本章时，某些浏览器支持stopImmediatePropagation()，但另外的都不支持。一些像jQuery和YUI之类的工具库定义了跨平台的
 * stopImmediatePropagation()方法。
 */





/**
 * 文档加载事件
 * 
 */

/**
 * 例17-1定义了whenReady()函数，它非常像示例13-5的onLoad()的函数。
 * 当文档为操作准备就绪时，传递给whenReady()的函数将会作为Document对象的方法调用。和之前的onLoad()函数不同，whenReady()监听DOMContentLoaded和readystatechange事件，
 * 而使用load事件仅仅是为了兼容那些不支持之前事件的较老浏览器。
 * 
 * 例17-1：当文档准备就绪时调用函数
 */
/**
 * 传递函数给whenReady()，当文档解析完毕且为操作准备就绪时，
 * 函数将作为文档对象的方法调用
 * DOMContentLoaded、readystatechange或load事件发生时会触发注册函数
 * 一旦文档准备就绪，所有函数都将被调用，任何传递给whenReady()的函数都将立即调用
 */
var whenReady = (function() { // 这个函数返回whenReady()函数
    var funcs = [];      // 当获得事件时，要运行的函数
    var ready = false;   // 当触发事件处理程序时，切换到true

    // 当文档准备就绪时，调用事件处理程序
    function handler(e) {
        // 如果已经运行一次，只需要返回
        if (ready) return;

        // 如果发生readystatechange事件
        // 但其状态不是“complete”的话，那么文档尚未准备好
        if (e.type === "readystatechange" && document.readyState != "complete")
            return;

        // 运行所有注册函数
        // 注意每次都要计算funcs.length
        // 以防这些函数的调用可能会导致注册更多的函数
        for(var i=0;i<funcs.length;i++){
            funcs[i].call(document);
        }

        // 现在设置ready标识为true，并移除所有函数
        ready = true;
        funcs = null;
    }

    // 为接收到的任何事件注册处理程序
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", handler, false);
        document.addEventListener("readystatechange", handler, false);
        window.addEventListener("load", handler, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", handler);
        window.attachEvent("onload", handler);
    }

    return function whenReady(f) {
        if (ready) f.call(document);  // 若准备完毕，只需要运行它
        else funcs.push(f);           // 否则，加入到队列
    }
}());





/**
 * 鼠标事件
 * 
 * 除“mouseenter”和“mouseleave”外的所有鼠标事件都能冒泡。
 * 链接和提交按钮上的click事件都有默认操作且能够阻止。
 * 可以取消上下文菜单事件来阻止显示上下文菜单，但一些浏览器有配置选项导致不能取消上下文菜单。
 * 
 * click          高级事件，当用户按下并释放鼠标按键或其他方式“激活”元素时释放
 * contextmenu    可以取消的事件，当上下文菜单即将出现时触发。当前浏览器在鼠标右击时显示上下文菜单，所以这个事件也能像click事件那样使用。
 * dbclick        用户双击鼠标时触发
 * mousedown      用户按下鼠标按键时触发
 * mouseup        用户释放鼠标按键时触发
 * mousemove      用户移动鼠标时触发
 * mouseover      用户移动鼠标使得鼠标进入元素时触发。relatedTarget（在IE中是fromElement）指的是鼠标来自的元素
 * mouseout       用户移动鼠标使得鼠标离开元素时触发。relatedTarget（在IE中是toElement）指的是鼠标要去往的元素
 * mouseenter     类似“mouseover”，但不冒泡。IE将其引入，HTML5将其标准化，但尚未广泛实现
 * mouseleave     类似“mouseout”，但不冒泡。IE将其引入，HTML5将其标准化，但尚未广泛实现
 * 
 * 传递给鼠标事件处理程序的事件对象有clientX和clientY属性，它们指定了鼠标指针相对于包含窗口的坐标。
 * 加入窗口的滚动偏移量就可以把鼠标位置转换成文档坐标。
 * 
 * altKey、ctrlKey、metaKey、shiftKey属性指定了当事件发生时是否有各种键盘辅助键按下。例如，这让你能够区分普通单击和按着shift键的单击。
 * button属性指定当事件发生时哪个鼠标按键按下，但是，不同浏览器给这个属性赋不同的值，所以它很难用，更多详细信息请看Event参考页。
 * 某些浏览器只在单击左键时才出发click事件，所以如果需要探测其他键的单击需要监听mousedown和mouseup事件。
 * 通常contextmenu事件发生的标志是右击，但如上所述，当事件发生时可能无法阻止上下文菜单的显示。
 * 
 * 鼠标事件对象有一些其他的鼠标特定属性，但它们并不常用，具体情况请看Event参考页的列表。
 * 
 * 
 */

/**
 * 例17-2展示了JavaScript函数drag()，它会在 mousedown 事件处理程序中调用，其允许用户拖放绝对定位的文档元素。drag()能够在DOM和IE事件模型中运行。
 * 
 * drag()函数接受两个参数。第一个是要拖动的元素，它可以是发生mousedown事件的元素或包含元素（例如，你可能允许用户拖放的元素看起来像标题栏，而拖动的包含元素像窗口）。
 * 然而，无论是哪种情况，它必须是使用CSS position属性绝对定位的文档元素。第二个参数是触发mousedown事件的事件对象。
 * 
 * 下面是一个使用了drag()的简单例子，它定义了用户在按下Shift键时能够拖动的<img>：
 * <img src="draggable.gif" 
 *      style="position: absolute; left: 100px; top: 100px;" 
 *      onmousedown="if (event.shiftKey) drag(this, event)"/>
 * 
 * drag()函数把mousedown事件发生的位置转换为文档坐标，这是为了计算鼠标指针到正在移动的元素左上角之间的距离。
 * 示例15-8使用getScrollOffsets()帮助转换坐标。然后，drag()注册了接着mousedown事件发生的mousemove和mouseup事件的事件处理程序。
 * mousemove事件处理程序用于响应文档元素的移动，而mouseup事件处理程序用于注销自己和mousemove事件处理程序。
 * 
 * 值得注意的是mousemove和mouseup处理程序注册为捕获事件处理程序。这是因为用户可能移动鼠标比其后的文档元素更快，如果这种情况发生，某些mousemove事件会发生在原始目标
 * 元素之外。没有捕获，这些事件将无法分派正确的处理程序。IE事件模型无法像标准事件模型那样提供事件捕获，但它在这种情况下有一个专门用于捕获鼠标事件的setCapture()方法。
 */





/**
 * 鼠标滚轮事件
 * 
 * 浏览器通常使用鼠标滚轮滚动或缩放文档，但可以通过取消mousewheel事件来阻止这些默认操作。
 * 有一些互用性问题影响滚轮事件，但编写跨平台的代码依旧可行。
 * （事件名不同）在写本章时，除Firefox之外的所有浏览器都支持“mousewheel”事件，但Firefox使用“DOMMouseScroll”，而3级DOM事件规范草案建议使用事件名“wheel”替代。
 * 向各种事件传递的事件对象也使用了不同的属性名来指定滚轮发生的旋转量。
 * 基础硬件也会导致鼠标滚轮之间的区别。某些硬件允许向前向后的一维滚动，而另一些（尤其是在Mac上）也允许向左向右滚动（在这些鼠标上，“滚轮”其实是轨迹球）。3级DOM规范草案甚至包括
 * 支持三维鼠标“滚轮”，除了上下左右，它还能报告顺时针或逆时针旋转。
 * 
 * 转递给“mousewheel”处理程序的事件对象有wheelDelta属性，其指定用户滚动滚轮有多远。远离用户方向的一次鼠标滚轮“单击”的wheelDelta值通常是120，而接近用户方向的一次“单击”的值是-120。
 * （这里的“单击”是指滚动滚轮的最小单位，所以我们得到的wheelDelta值都是120的整数倍，正负值表示滚轮的两个方向，其最小值皆为120。）在Safari和Chrome，为了支持使用二维轨迹球而非
 * 一维滚轮的Apple鼠标，除了wheelDelta属性外，事件对象还有wheelDeltaX和wheelDeltaY，而wheelDelta和wheelDetalY的值一直相同。
 * 
 * 在Firefox浏览器中，可以使用非标准的DOMMouseScroll事件取代mousewheel，使用事件对象的detail属性取代wheeldelta。但是，detail属性值的缩放比率和正负符号不同于wheelDelta，
 * detail值乘以-40和wheelDelta值相等。
 * 
 * 在写本章时，3级DOM事件规范草案标准定义了wheel事件作为mousewheel和DOMMouseScroll的标准版本。传递给wheel事件处理程序的事件对象将有deltaX、deltaY和deltaZ属性，以指定三个维度的
 * 旋转。这些值必须乘以 -120 彩盒mousewheel事件的wheelDelta值和正负符号相匹配。
 * 
 * 对于所有这些事件类型来说，其事件对象就像鼠标事件对象：它包括鼠标指针的坐标和键盘辅助键的状态。
 */

/**
 * 例17-3演示了如何使用鼠标滚轮事件和如何实现跨平台的互用性。它定义了enclose()函数在一个较大的内容元素（比如图片）周围包装了一个指定尺寸的“窗体”或“视口”，并定义了鼠标滚轮事件处理
 * 程序让用户既能在视口内移动内容元素也能调整视口大小。可以像下面这样在代码中使用enclose()函数：
 * 
 * <script src="whenReady.js"></script>
 * <script src="Enclose.js"></script>
 * <script>
 * whenReady(function() {
 *     enclose(document.getElementById("content"), 400, 200, -200, -300);
 * });
 * </script>
 * <style>
 * div.enclose { border: solid black 10px; margin: 10px; }
 * </style>
 * <img id="content" src="testimg.jpg"/>
 * 
 * 为了能够在所有常用浏览器中正确地工作，例17-3必须执行一些浏览器测试。
 * 这个示例提前使用了3级DOM事件规范草案，包括在代码中使用了wheel事件，当浏览器实现它时即可使用。它也包含未来的一些证明，当Firefox开始支持wheel和mousewheel事件时就停止
 * 使用DOMMouseScroll。注意，例17-3也是演示元素几何形状和CSS定位技术的示例，这些技术会在15.8节和16.2.1节中说明
 */

// 例17-3：处理鼠标滚轮事件
// 把内容元素装入到一个指定大小（最小是50 x 50）的窗体或视口内
// 可选参数contentX 和 contentY指定内容相对于窗体的初始值偏移量
// （如果指定，它们必须  <=0）
// 这个窗体有mousewheel事件处理程序
// 它允许用户平移元素和缩放窗体
function enclose(content, framewidth, frameheight, contentX, contentY) {
    // 这些参数不仅仅是初始值
    // 它们保存当前状态，能被mousewheel处理程序使用和修改
    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);

    contentX = Math.min(contentX, 0) || 0;
    contentY = Math.min(contentY, 0) || 0;

    // 创建frame元素，且设置CSS类名和样式
    var frame = document.createElement("div");
    frame.className = "enclose";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";            // 没有滚动条，不能溢出
    frame.style.boxSizing = "border-box";
    frame.style.webkitBoxSizing = "border-box";
    frame.style.MozBoxSizing = "border-box";

    // 把frame放入文档中，并把内容移入frame中
    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);

    // 确定元素相对于frame的位置
    content.style.position = "relative";
    content.style.left = contentX;
    content.style.top = contentY;

    // 我们将需要针对下面的一些特定浏览器进行处理
    var isMacWebkit = (navigator.userAgent.indexOf("Macintosh") !== -1 
                    && Navigator.userAgent.indexOf("Webkit") !== -1);
    var isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);

    // 注册mousewheel事件处理程序
    frame.onwheel = wheelHandler;       // 未来浏览器
    frame.onmousewheel = wheelHandler;  // 大多数当前浏览器
    if (isFirefox)                      // 仅firefox
        frame.addEventListener("DOMMouseScroll", wheelHandler, false);

    function wheelHandler(event) {
        var e = event || window.event;  // 标准或IE事件对象

        // 查找wheel事件对象、mousewheel事件对象（包括2D和1D形式）
        // 和Firefox的DOMMouseScroll事件对象的属性
        // 从事件对象中提取旋转量
        // 缩放delta以便一次鼠标滚轮“单击”相对于屏幕的缩放增量是30像素
        // 如果未来浏览器在同一事件上同时触发“wheel”和“mousewheel”
        // 这里最终会重复计算
        // 所以，希望取消wheel事件将阻止mousewheel事件的产生
        var deltaX = e.deltaX * -30       // wheel事件
                  || e.wheelDeltaX / 4    // mousewheel
                  || 0;                   // 属性未定义
        var deltaY = e.deltaY * -30       // wheel事件
                  || e.wheelDeltaY / 4    // webkit中的mousewheel事件
                  || (e.wheelDeltaY === undefined && e.wheelDelta / 4)   // 如果没有2D属性，那么就使用1D的滚轮属性
                  || e.delta * -10       // Firefox的DOMMouseScroll事件
                  || 0;                   // 属性未定义

        // 在大多数浏览器中，每次鼠标滚轮单机对应的delta是120
        // 但是，在Mac中，鼠标滚轮似乎对速度更敏感
        // 其delta值通常要大120倍，使用Apple鼠标至少如此
        // 使用浏览器测试解决这个问题
        if (isMacWebkit) {
            deltaX /= 30;
            deltaY /= 30;
        }

        // 如果在Firefox（未来版本）中得到mousewheel和wheel事件，
        // 那么就不再需要DOMMouseScroll
        if (isFirefox && e.type !== "DOMMouseScroll") {
            frame.removeEventListener("DOMMouseScroll", wheelHandler, false);
        }

        // 获取内容元素的当前尺寸
        var contentbox = content.getBoundingClientRect();
        var contentwidth = contentbox.right - contentbox.left;
        var contentheight = contentbox.bottom - contentbox.top;

        if (e.altKey) {  // 如果按下ALT键，就可以调整frame大小
            if (deltaX) {
                framewidth -= deltaX;     // 新宽度，不能比内容大，不能小于50
                framewidth = Math.min(framewidth, contentwidth);
                framewidth = Math.max(framewidth, 50);
                frame.style.width = framewidth + "px";
            }
            if (deltaY) {
                frameheight -= deltaY;
                frameheight = Math.min(frameheight, contentheight);
                frameheight = Math.max(frameheight-deltaY, 50);
                frame.style.height = frameheight + "px";
            }
        }
        else {           // 没有按下ALT键，就可以平移frame中的内容
            if (deltaX) {
                // 不能在滚动了
                var minoffset = Math.min(framewidth-contentwidth, 0);
                // 把deltaX添加到contentX中，但不能小于minoffset
                contentX = Math.max(contentX+deltaX, minoffset);
                contentX = Math.min(contentX, 0);
                content.style.left = contentX + "px";
            }
            if (deltaY) {
                var minoffset = Math.min(frameheight-contentheight, 0);
                // 把deltaY添加到contentY，但不能小于minoffset
                contentY = Math.max(contentY+deltaY, minoffset);
                contentY = Math.min(contentY, 0);
                content.style.top = contentY + "px";
            } 
        }

        // 不让这个事件冒泡，阻止任何默认操作
        // 这会阻止浏览器使用mousewheel事件滚动文档
        // 希望对于相同的鼠标滚动
        // 调用wheel事件上的preventDefault()也能阻止mousewheel事件的产生
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}




/**
 * 拖放事件
 * 
 * 拖放（Drag-and-Drop，DnD）是在“拖放源（drag source）”和“拖放目标（drop target）”之间传输数据的用户界面，它可以存在相同应用之间也可是不同应用之间。
 * 拖放是复杂的人机交互，用于实现拖放的API总是很复杂：
 * - 它们必须和底层OS结合，使它们能够在不相关的应用间工作
 * - 它们必须适用于“移动”、“复制”和“链接”数据传输操作，允许拖放源和拖放目标通过设置限制允许的操作，然后让用户选择（通常使用键盘辅助键）许可设置
 * - 它们必须为拖放源提供一种方式指定待拖动的图标或图像。
 * - 它们必须为拖放源和拖放目标的DnD交互过程提供基于事件的通知。
 * 
 * DnD总是基于事件且JavaScript API包含两个事件集，一个在拖放源上触发，另一个在拖放目标上触发。所有传递给DnD事件处理程序的事件对象都类似鼠标事件对象，另外它
 * 拥有dataTransfer属性。这个属性引用DataTransfer对象，该对象定义DnD API的方法和属性。
 * 
 * 拖放源事件相当简单，任何有HTML draggable属性的文档元素都是拖放源。当用户开始用鼠标在拖放源上拖动时，浏览器并没有选择元素的内容，相反，它在这个元素上触发
 * dragstart事件。这个事件的处理程序就调用dataTransfer.setData()指定当前可用的拖放源数据（和数据类型）。
 * （当新的HTML5 API实现时，可以用dataTransfer.items.add()代替。）
 * 这个事件处理程序也可以设置dataTransfer.effectAllowed来指定支持“移动”、“复制”和“链接”传输操作中的几种，同时它可以调用dataTransfer.setDragImage()或dataTransfer.addElement()
 * （在那些支持这些方法的浏览器中）指定图片或文档元素用作拖动时的视觉表现。
 * 
 * 在拖动的过程中，浏览器在拖动源上触发拖动事件。如果想要更新拖动图片或修改提供的数据，可以监听这些事件，但一般不需要注册“拖动”事件处理程序。
 * 当放置数据发生时会触发dragend事件。如果拖动源支持“移动”操作，它就会检查dataTransfer.dropEffect去看看是否执行了移动操作。
 * 如果执行了，数据就被传输到其他地方，你应该从拖放源中删除它。
 * 
 * 实现简单的自定义拖放源只需要dragstart事件。
 * 例17-4就是这样的例子，它在<span>元素中用“hh:mm”格式显示当前时间，并每分钟更新一次时间。
 * 假设这是示例要做的一切，用户能选择时钟中显示的文本，然后拖动这个时间。但在这个例子中JavaScript代码通过设置时钟元素的draggable属性为true和定义ondragstart事件处理程序函数来
 * 使得时钟成为自定义拖放源。
 * 事件处理程序使用dataTransfer.setData()指定一个完整的时间戳字符串（包括日期、秒和时区信息）作为待拖动的数据。它还调用dataTransfer.setDragIcon()指定待拖动的图片（一个时钟图标）。
 * 
 */

/**
 * 拖放目标比拖放源更棘手。任何文档元素都可以是拖放目标，这不需要像拖放源一样设置HTML属性，只需要简单地定义合适的事件监听程序。
 * （但是使用新的HTML5 DnD API，将可以在拖放目标上定义dropzone属性来去取代定义后面介绍的一部分事件处理程序。）
 * 有4个事件在拖放目标上触发。
 * 当拖放对象（dragged object）进入文档元素时，浏览器在这个元素上触发dragenter事件。拖放目标应该使用 dataTransfer.types 属性确定拖放对象的可用数据是否是能理解的格式。
 * （也可以检查dataTransfer.effectAllowed确保拖放源和拖放目标同意使用移动、复制和链接操作中的一个。）
 * 如果检查成功，拖放目标必须要让用户和浏览器都知道它对放置感兴趣。可以通过改变它的边框或背景颜色来向用户反馈。令人吃惊地是，拖放目标通过取消事件来告诉浏览器它对放置感兴趣。
 * 
 * 如果元素不取消浏览器发送给它的dragenter事件，浏览器将不会把它作为这次拖放的拖放目标，并不会向它再发送任何事件。但如果拖放目标取消了dragenter事件，浏览器将发送dragover事件
 * 表示用户继续在目标上拖动对象。再一次令人吃惊的是，拖放目标必须监听且取消所有这些事件来表明它继续对放置感兴趣。如果拖放目标想指定它只允许移动、复制或链接操作，它应该使用
 * dragover事件处理程序来设置dataTransfer.dropEffect。
 * 
 * 如果用户移动拖放对象离开通过取消事件表明有兴趣的拖放目标，那么拖放目标上将触发dragleave事件。
 * 这个事件的处理程序应该恢复元素的边框或背景颜色或取消任何其它为响应dragenter而执行的可视化反馈。
 * 遗憾的是，dragenter和dragleave事件会冒泡，如果拖放目标内部有嵌套元素，想知道dragleave事件表示拖放对象从拖放目标离开到目标外的事件还是到目标内的事件非常困难。
 * 
 * 最后，如果用户把拖放对象放置在拖放目标上，在拖放目标上会触发drop事件。
 * 这个事件的处理程序应该使用dataTransfer.getData()获取传输的数据并做一些适当的处理。
 * 另外，如果用户在拖放目标放置一或多个文件，dataTransfer.files属性将是一个类数组的File对象。
 * 使用新的HTML5 API，drop事件处理程序将能遍历dataTransfer.items[]的元素去检查文件和非文件数据。
 */

/**
 * 例17-5演示如何使<ul>元素成为拖放目标，同时如何使它们中的<li>元素成为拖放源。
 * 这个示例是一段不唐突的JavaScript代码（Unobtrusive JavaScript），它查找class属性包含“dnd：的<ul>元素，在它找到的此类列表上注册DnD事件处理程序。
 * 这些事件处理程序使列表本身成为拖放目标，在这个列表上放置的任何文本会变成新的列表项并插入到列表尾部。
 * 这些事件处理程序也监听列表项的拖动，使得每个列表项的文本可用于传输。拖放源事件处理程序允许“复制”和“移动”操作，并在移动操作下放置对象时会删除原有列表项。
 * （注意，不是所有的浏览器都支持移动操作。）
 */





/**
 * 文本事件
 * 
 * 浏览器有3个传统的键盘输入事件。keydown、keyup是低级事件。keypress是较高级的事件，它产生一个可打印字符。
 * 3级DOM事件规范草案定义了一个更通用的textinput事件，不管来源（例如：键盘、粘贴或拖放形式的数据传输、亚洲语言输入法、声音或手写识别系统），无论何时用户输入
 * 文本时都会触发它。在写本章时，textinput事件尚未得到支持，但Webkit浏览器支持一个非常类似的“textInput”（使用大写字母I）事件。
 * 
 * 建议中的textinput事件和已经实现的textInput事件都传递一个简单的事件对象，它有一个用于保存输入文本的data属性。（另一个属性inputMethod是建议用于指定输入源，
 * 但它尚未实现。） 对于键盘输入，data属性通常只保存单个字符，但其他输入源通常可能包含多个字符。
 * 
 * 通过keypress事件传递的对象更加混乱。一个keypress事件表示输入的单个字符。事件对象以数字Unicode编码的形式指定字符，所以必须用String.fromCharCode()把它转
 * 换成字符串。
 * 在大多数浏览器中，事件对象的keyCode属性指定了输入字符的编码。但是由于历史原因，Firefox使用的是charCode属性。
 * 大多数浏览器只在当产生可打印字符时触发keypress事件。但是Firefox在产生非打印字符时也触发keypress事件。为了检测这种情况（这样就能忽略非打印字符），可以查找
 * 有charCode属性但值为0的事件对象。
 * 
 * 可以通过取消textinput、textInput和keypress事件来阻止字符输入，这意味着可以使用这些事件来过滤输入。例如，你可能想阻止用户在只接受数字数据的域中输入字母。
 * 例17-6是一段不唐突的JavaScript代码模块，它恰好实现了这种过滤。它查找有额外属性（非标准）data-allowed-chars的<input type=text>元素。
 * 这个模块在这类文本输入域上注册了textinput、textInput、keypress事件的处理程序来限制用户只能输入出现在许可属性值中的字符。
 * 
 */

/**
 * keypress和textInput事件是在新输入的文本真正插入到聚焦的文档元素前触发，这就是这些事件处理程序能够取消事件和阻止文本插入的原因。
 * 浏览器也实现了在文本插入到元素后才触发的input事件类型input。虽然这些事件不能取消，不能指定其事件对象中的最新文本，但它们能以某种形式提供元素文本内容发生改变的通知。
 * 例如，如果想确保输入框中输入的任何文本都是大写，那么可以像如下这样使用input事件。
 *      
 *      <input type="text" oninput="this.value = this.value.toUpperCase();">
 * 
 * HTML5标准化了input事件，除IE外的所有浏览器都支持它。在IE中，可以使用不标准的propertychange事件监测文本输入元素的value属性改变来实现相似的效果。
 * 例17=7展示了可以用一种跨平台的方式强制所有输入都大写。
 */
function forceToUpperCase(element) {
    if (typeof element === "string") element = document.getElementById(element);

    element.oninput = upcase;
    element.onpropertychange = upcaseOnPropertyChange;

    // 简易案例，用于input事件的处理程序
    function upcase(event) {
        this.value = this.value.toUpperCase();
    }

    // 疑难案例，用于propertychange事件的处理程序
    function upcaseOnPropertyChange(event) {
        var e = event || window.event;
        // 如果value属性发生变化
        if (e.propertyName === "value") {
            // 移除onpropertychange处理程序，避免循环调用
            this.onpropertychange = null;
            // 把值都变成大写
            this.value = this.value.toUpperCase();
            // 然后恢复原来的propertychange处理程序
            this.onpropertychange = upcaseOnPropertyChange;
        }
    }
}







/**
 * 键盘事件
 * 
 * 当用户在键盘上按下或释放按键时，会发生keydown和keyup事件。它们由辅助键、功能键和字母数字键产生。
 * 辅助键（modifier key）：一般指Shift键、Ctrl（control）键、Alt键、AltGr（Alternate Graphic）键、
 *      Super键（Window键盘上指Windows键，MacOS键盘上指Command键，Sun键盘上指的是Meta键）、Fn键（Function，常见笔记本键盘）
 * 功能键（function key）：一般指类似F1、F2这些以F加数字组成的键。
 * 如果用户按键时间足够长会导致它开始重复，那么在keyup事件到达之前会收到多个keydown事件。
 * 
 * 这些事件相关的事件对象都有数字属性keyCode，指定了按下的键是哪个。对于产生可打印字符的按键，keyCode值是按键上出现的主要字符的Unicode编码。
 * 无论Shift键处于什么状态，子母键总是产生大写keyCode值，这是因为它们出现在物理键盘上。类似地，即使为了输入标点字符而按下了Shift键，但数字键产生的keyCode值就是对应键上的数字。
 * 对于不可打印键，keyCode属性将是一些其他值。keyCode值尚未标准化，但适当的跨浏览器兼容性是可行的。例17-8包含一个从keyCode值到功能键名字的映射。
 * 
 * 类似鼠标事件对象，键盘事件对象有altKey、ctrlKey、metaKey、shiftKey属性，当事件发生时，如果对应的辅助键按下，那么它们会被设置为true。
 * 
 * keydown和keyup事件及keyCode属性已经使用了十多年，但从未标准化。3级DOM事件规范草案标准化了keydown和keyup事件类型，但没有尝试标准化keyCode。
 * 相反，它定义了新属性key，它会以字符串的形式包含键名。如果案件对应的是一个可打印字符，那么key属性将仅仅是这个可打印字符。
 * 如果按键是功能键，那么key属性将是像“F2”、“Home”、“Left”这样的值。
 * 
 * 在写本章时，3级DOM事件的key属性尚未在任何浏览器中实现。但是，像Safari和Chrome这类基于Webkit的浏览器为这些事件的事件对象定义了一个keyIdentifier属性。
 * 类似key，keyIdentifier是字符串而非数字，并且对于功能键，它是像“Shift”、“Enter”有用的值。
 * 对于可打印的字符，该属性保存了这个字符的Unicode编码的字符串表示形式，其用处要小一些。例如，对于A键，它是“U+0041”。
 * 
 * 例17-8定义了一个Keymap类，把像“ PageUp ”、“ Alt_Z ”和“ ctrl+alt+shift+F5 ”这些按键标识符映射到JavaScript函数，这些函数会作为按键的响应而调动。
 * 以JavaScript对象的形式把按键的绑定传给Keymap()构造函数，在对象中属性名是按键标识符，而属性值是处理程序函数。
 * 使用bind()和unbind()方法添加和移除绑定。
 * 使用install()方法在HTML元素（通常是Document对象）上配置Keymap。
 * 通过在元素上注册keydown事件处理程序配置Keymap。每次按键被按下，处理程序检查是否有与按键相关的函数。如果有，就调用它。
 * 在keydown事件处理程序中如果能定义3级DOM事件的key属性就会优先使用它。如果没有，它会查找Webkit的keyIdentifier属性然后使用它。否则，他退回使用不标准的keyCode属性。
 */

/**
 * 例17-8：键盘快捷键的Keymap类
 * 
 * 绑定键盘事件和处理程序函数
 * 
 * 这个模块定义一个Keymap类
 * 这个类的实例表示按键标识符（下面有定义）到处理程序函数的映射
 * Keymap能配置到HTML元素上以处理keydown事件
 * 当此类事件发生时，Keymap会使用它的映射来调用合适的处理程序
 * 
 * 当创建Keymap时，
 * 能传入一个JavaScript对象，它表示Keymap绑定的初始设置
 * 对象的属性名是按键标识符，而属性值是处理程序函数
 * 在创建Keymap之后，
 * 通过给bind()方法传入按键标识符和处理程序函数可以添加一个新绑定
 * 能给unbind()方法传入按键标识符来移除绑定
 * 
 * 通过给Keymap的install()方法传入像document对象这样的HTML元素，然后就可以使用它
 * install()方法给指定的对象添加onkeydown事件处理程序
 * 当调用这个处理程序时，
 * 它判断按下键的按键标识符
 * 如果有这个按键标识符的任何绑定，就调用对应的处理程序函数
 * 一个Keymap可以在多个HTML元素上配置
 * 
 * 按键标识符
 * 
 * 按键标识符是一个区分大小写的字符串
 * 它表示按键加上同一时刻按下的辅助键
 * 按键的名字通常是按键上的字符（不会变）
 * 法定的键名包括“A”、“7”、“F2”、“PageUp”、“Left”、“Backspace”、“Esc”
 * 
 * 请参阅模块的Keymap.keyCodeToKeyName对象中的键名列表
 * 这里有3级DOM规范定义的键名子集
 * 并且当实现时这个类将使用事件对象的key属性
 * 
 * 按键标识符也可能包含辅助键前缀
 * 这些前缀是Alt、Ctrl、Meta、Shift
 * 它们区分大小写，且必须使用空格、下划线、连字符或“+”来和按键名或彼此分开
 * 例如：“SHIFT+A”、“Alt_F2”、“meta-v”、“ctrl alt left”
 * 在Mac中，Meta是Command键，Alt是Option键
 * 一些浏览器把Window键映射到Meta辅助键
 * 
 * 在美国标准键盘布局上
 * 能够支持大多数不需要Shift键的标点字符（`=[];',./\但不包括连字符）
 * 但是它们不特别适合其他键盘布局，应该避免
 */

// 构造函数
function Keymap(bindings) {
    this.map = {};          // 定义按键标识符 -> 处理程序映射
    if (bindings) {         // 给它复制初始绑定
        for(name in bindings) this.bind(name, bindings[name]);
    }
}

// 绑定指定的按键标识符和指定的处理程序函数
Keymap.prototype.bind = function(key, func) {
    this.map[Keymap.normalize(key)] = func;
};

// 删除指定按键标识符的绑定
Keymap.prototype.unbind = function(key) {
    delete this.map[Keymap.normalize(key)];
};

// 这个方法基于keymap绑定分派按键事件
keymap.prototype.dispatch = function(event, element) {
    // 开始没有辅助键和键名
    var modifiers = "";
    var keyname = null;

    // 按照标准的小写字母顺序构建辅助键字符串
    if (event.altKey) modifiers += "alt_";
    if (event.ctrlKey) modifiers += "ctrl_";
    if (event.metaKey) modifiers += "meta_";
    if (event.shiftKey) modifiers += "shift_";

    // 如果实现3级DOM规范的key属性，获取keyname很容易
    if (event.key) 
        keyname = event.key;
    // 在safari和chrome上用keyIdentifier获取功能键键名
    else if (event.keyIdentifier && event.keyIdentifier.substring(0,2) !== "U+")
        keyname = event.keyIdentifier;
    // 否则，使用keyCode属性和后面编码到键名的映射
    else
        keyname = Keymap.keyCodeToKeyName(event.keyCode);
    
    // 如果不能找出键名，只能返回并忽略这个事件
    if (!keyname) return;

    // 标准的按键id是辅助键加上小写的键名
    var keyid = modifiers + keyname.toLowerCase();

    // 现在查看按键标识符是否绑定了任何东西
    var handler = this.map[keyid];
    if(handler) {
        // 调用处理程序
        var retval = handler.call(element, event, keyid);
        // 如果处理程序返回false，取消默认操作并阻止冒泡
        if (retval === false) {
            // 阻止传播
            if (event.stopPropagation) event.stopPropagation();// DOM
            else event.cancelBubble = true;                    // IE
            // 阻止默认行为
            if (event.preventDefault) event.preventDefault();  // DOM
            else event.returnValue = false;                    // IE
        }
        // 返回处理程序的返回值
        return retval;
    }
};

// 在指定HTML元素上配置Keymap
Keymap.prototype.install = function(element) {
    // 这是事件处理程序函数
    var keymap = this;
    function handler(event) { return keymap.dispatch(event, element); }

    // 现在安装它
    if (element.addEventListener)
        element.addEventListener("keydown", handler, false);
    else if (element.attachEvent)
        element.attachEvent("keydown", handler);
}


// 用于把按键标识符转换成标准形式的工具函数
// 在非Mac硬件，我们这里把“meta”映射到“ctrl”
// 这样在Mac中“Meta+C”将变成“Command+C”，其他都是“Ctrl+C”
Keymap.normalize = function(keyid) {
    keyid = keyid.toLowerCase();             // 一切都是小写
    var words = keyid.split(/\s+|[\-+_]/);   // 分割辅助键和键名
    var keyname = words.pop();               // 键名是最后一个
    keyname = Keymap.aliases[keyname] || keyname;   // 别名？
    words.sort();                            // 排序剩下的辅助键
    words.push(keyname);                     // 添加到序列化名字后面
    return words.join("_");                  // 把他们拼接起来
};

// 按键的常见别名映射到正式名
// 键名使用3级DOM规范的定义和后面的编码到键名的映射
// 所有的键和值都只有小写
Keymap.aliases = {
    "escape": "esc",
    "delete": "del",
    "return": "enter",
    "ctrl"  : "control",
    "space" : "spacebar",
    "ins"   : "insert",
};

// 传统的keydown事件对象的keyCode属性是不标准的
// 但下面的值似乎可以在大多数浏览器和OS中可行
Keymap.keyCodeToKeyName = {
    // 使用词或方向键的按键
    8 : "Backspace", 9 : "Tab", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt",
    19: "Pause",     20: "CapsLock",         27: "Esc",   32: "Spacebar",33: "PageUp",
    34: "PageDown",  35: "End", 36: "Home",  37: "Left",  38: "Up",      39: "Right",
    40: "Down",      45: "Insert",           46: "Del",

    // 主键盘（非数字小键盘）上的数字键
    48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9",

    // 字母按键，注意我们不区分大小写
    65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J",
    75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T",
    85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z",

    // 数字小键盘的数字和标点符号按键（Opera不支持这些）
    96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9",
    106: "Multiply", 107: "Add", 109: "Subtract", 110: "Decimal", 111: "Divide",

    // 功能键
    112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6",
    118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12",
    124: "F13", 125: "F14", 126: "F15", 127: "F16", 128: "F17", 129: "F18",
    130: "F19", 131: "F20", 132: "F21", 133: "F22", 134: "F23", 135: "F24",

    // 不需要按下Shift键的 标点符号键
    // 连字符不兼容，FF返回的编码和减号一样
    59: ";", 61: "=", // FIrefox和Opera返回59，61
    186: ";", 187: "=",
    188: ",", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'",
};
