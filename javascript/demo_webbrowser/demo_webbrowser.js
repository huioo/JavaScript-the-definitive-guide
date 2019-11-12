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
 * 共用同一个全局window对象。如果一个脚本定义了新的全局变量或函数，那么这个变量或函数会在脚本执行之后对任意JavaScript代码可见。
 * 
 * 如果Web页面中嵌入一个窗体（通常使用`<iframe>`元素），嵌入文档中的JavaScript代码和被嵌入文档里的JavaScript代码有不同全局对象，
 * 它可以当做一个单独的JavaScript程序。
 * 
 */



