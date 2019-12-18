/**
 * 脚本化HTTP
 * 
 * 超文本传输协议（HyperText Transfer Protocol，HTTP）规定Web浏览器如何从Web服务器获取文档和向Web服务器提交表单内容，以及Web服务器如何响应这些请求和提交。
 * 浏览器会处理大量HTTP。通常，HTTP并不在脚本的控制下，只是当用户单击链接、提交表单和输入URL时才发生。
 * 
 * 但是，用JavaScript代码操纵HTTP是可行的。当用脚本设置window的location属性或调用表单对象的submit()方法时，都会初始化HTTP请求。
 * 这两种情况下，浏览器会加载新页面。这种用脚本控制HTTP的方法在多框架页面中非常有用，但这并非我们在此讨论的主题。相反，本章会说明在没有导致Web浏览器重新加载任何窗口或
 * 窗体的内容情况下，脚本如何实现Web浏览器与服务器之间的通信。
 * 
 * 术语Ajax描述了一种主要使用脚本操纵HTTP的Web应用架构。Ajax应用的主要特点是使用脚本操纵HTTP和Web服务器进行数据交换，不会导致页面重载。
 * 避免页面重载（这是Web初期的标准做法）的能力使Web应用感觉更像传统的桌面应用。Web应用可以使用Ajax技术把用户的交互数据记录到服务器中；
 * 也可以开始只显示简单页面，之后按需加载额外的数据和页面组件来提升应用的启动时间。
 * 
 * Comet是和使用脚本操纵HTTP的Web应用架构相关的术语。在某种意义上，Comet和Ajax相反。在Comet中，Web服务器发起通信并异步发送消息到客户端。
 * 如果Web应用需要响应服务器发送的消息，则它会使用Ajax技术发送或请求数据。在Ajax中，客户端从服务端“拉”数据，而在Comet中，服务端向客户端
 * “推”数据。Comet还包括其他名词（如“服务器推”、“Ajax推”和“HTTP流”）。
 * 
 * 实现Ajax和Comet的方式有很多种，而这些底层的实现有时称为传输协议（transport）。
 * 例如，<img>元素有一个src属性。当脚本设置这个属性为URL时，浏览器发起的HTTP GET请求会从这个URL下载图片。因此，脚本通过设置<img>元素的
 * src属性，且把信息作为图片URL的查询字符串部分，就把能经过编码信息传递给Web服务器。Web服务器实际上必须返回某个图片来作为请求结果，但它
 * 不一定可见：例如，一个 1 X 1 像素的透明图片。（这种类型的图片也称为网页信标（web bug）。当网页信标不是与当前网页服务器而是其他服务器
 * 交流信息时，会担心隐私泄露。这种第三方网页信标的方式通常用于统计点击次数和网站流量分析。）
 * 
 * <img>元素无法实现完整的Ajax传输协议，因为数据交换是单向的：客户端能发送数据到服务器，但服务器响应一直是张图片导致客户端无法轻易从中提取
 * 信息。然而，<iframe>元素更加强大，为了把<iframe>作为Ajax传输协议使用，脚本首先要把发送给Web服务器的信息编码到URL中，然后设置<iframe>
 * 的src属性为该URL。服务器能创建一个包含响应内容的HTML文档，并把它返回给Web浏览器，并且在<iframe>中显示它。
 * <iframe>需要对用户不可见，例如可以使用CSS隐藏它。脚本能遍历<iframe>的文档对象来读取服务器的响应。注意，这种访问受限于13.6.2节介绍的同源策略问题。
 * 
 * 实际上，<script>元素的src属性能设置URL并发起HTTP GET请求。使用<script>元素实现脚本操纵HTTP是非常吸引人的，因为它们可以跨域通信而不受限于
 * 同源策略。通常，使用基于<script>的Ajax传输协议时，服务器的响应采用JSON编码的格式，当执行脚本时，JavaScript解析器能自动将其“解码”。由于使用
 * JSON数据格式，因此这种Ajax传输协议也叫做“JSONP”。（JSON Protocol）
 * 
 * 虽然在<iframe>和<script>传输协议上能实现Ajax技术，但通常还有更简单的方式。一段时间以来，所有浏览器都支持XMLHttpRequest对象，它定义了用脚本
 * 操纵HTTP的API。除了常用的GET请求，这个API还包含实现POST请求的能力，同时它能用文本或Document对象的形式返回服务器的响应。
 * 虽然它的名字叫XMLHttpRequest API，但并未没有限定只能使用XML文档，它能获取任何类型的文本文档。
 * 18.1节涵盖了XMLHttpRequest API和本章的大部分。本章的大部分Ajax示例都使用XMLHttpRequest对象来实现协议方案，我们也将在18.2节演示如何使用基于
 * <script>的传输协议，因为<script>元素有规避同源策略限制的能力。
 * 
 * Comet传输协议比Ajax更精妙，但都需要客户端和服务器之间建立（必要时重新建立）连接，同时需要服务器保持连接处于打开状态，这样它才能够发送异步信息。
 * 隐藏的<iframe>能像Comet传输协议一样有用，例如，如果服务器以<iframe>中待执行的<script>元素的形式发送每条消息。
 * 实现Comet的一种更可靠跨平台方案是客户端建立一个和服务器的连接（使用Ajax传输协议），同时服务器保持这个连接打开直到它需要推送一条消息。服务器每
 * 发送一条消息就关闭这个连接，这样可以确保客户端正确接收到消息。处理该消息之后，客户端马上为后续的消息推送建立一个连接。
 * 
 * 实现可靠的跨平台Comet传输协议是非常有挑战性的，所以大部分使用Comet架构的Web应用开发者依赖于像Dojo这样的Web框架库中的传输协议。
 * 在写本章时，浏览器正开始实现HTML5相关草案中的Sever-Sent，它用EventSource对象的形式定义了简单的Comet API。
 * 18.3节涵盖EventSource API且演示了一个使用XMLHttpRequest实现的简单模拟示例。
 * 
 * 在Ajax和Comet之间构建更高级的通信协议是可行的。例如，这些客户端/服务器技术可以用做RPC（Remote Produce Call，远程过程调用）机制或发布/订阅事件系统的基础。
 * 但是本章不会介绍像上面这样更高级的协议，我们重点在能使Ajax和Comet可用的API上。
 */




/**
 * 使用XMLHttpRequest
 * 
 * 浏览器在XMLHttpRequest类上定义了它们的HTTP API。
 * 这个类的每一个实例都表示一个独立的请求/响应对，并且这个对象的属性和方法允许指定请求细节和提取响应数据。
 * 很多年前Web浏览器就开始支持XMLHttpRequest，并且其API已经到了W3C制定标准的最后阶段。同时，W3C正在制定“2级XMLHttpRequest”标准草案（XHR2）。
 */

// 实例化XMLHttpRequest对象，来使用HTTP API；
// 也可以重用已存在的XMLHttpRequest，但注意这将会终止之前通过该对象挂起的任何请求。
var request = new XMLHttpRequest();

/**
 * IE6中的XMLHttpRequest
 * MIcrosoft最早把XMLHttpRequest对象引入到IE5中，且在IE5和IE6中它是一个ActiveX对象。
 * IE7之前的版本不支持非标准的XMLHttpRequest()构造函数，它能像如下这样模拟：
 */
(function() {
    // 在IE5和IE6中模拟XMLHttpRequest()构造函数
    if (window.XMLHttpRequest === undefined){
        window.XMLHttpRequest = function() {
            try {
                // 如果可用，则使用ActiveX对象的最新版本
                return new ActiveXObject("Msxml2.XMLHTTP.6.0");
            }
            catch (e1) {
                try {
                    // 否则，回退到较旧的版本
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                }
                catch (e2) {
                    // 否则报错
                    throw new Error("XMLHttpRequest is not supported.");
                }
            }
        }
    }
}());

/**
 * HTTP请求
 * 
 * 一个HTTP请求由4部分组成：
 * - HTTP请求方法或“动作”（verb）
 * - 正在请求的URL
 * - 一个可选的请求头集合，其中可能包括身份验证信息
 * - 一个可选的请求主体
 * 
 * 服务器返回的HTTP响应包含3部分：
 * - 一个数字和文字组成的状态码，用来显示请求的成功和失败
 * - 一个响应头集合
 * - 响应主体
 * 
 * 接下来两节会展示：
 * - 如何设置HTTP请求的每个部分
 * - 如何查询HTTP响应的每个部分
 * 
 * 随后的核心章节会涵盖更多的专门议题。HTTP的基础请求/响应架构非常简单并且易于使用。
 * 但在实践中会有各种各样随之而来的复杂问题：客户端和服务器交换cookie，服务器重定向浏览器到其他服务器，缓存某些资源而剩下的不缓存，某些客户端通过代理服务器发送所有的请求等。
 * XMLHttpRequest不是协议级的HTTP API而是浏览器级的API。浏览器需要考虑cookie、重定向、缓存和代理，但代码只需要担心请求和响应。
 */

/**
 * 指定请求
 * 
 * 创建XMLHttpRequest对象之后，发起HTTP请求的下一步就是调用XMLHttpRequest对象的open()方法去指定这个请求的两个必需部分：方法和URL。
 * 
 * open()的第1个参数指定HTTP方法或动作。这个字符串不区分大小写，通常用大写匹配HTTP协议。
 * “GET”和“POST”方法是得到广泛支持的。
 * “GET”用于常规请求，它适用于当URL完全指定请求资源，当请求对服务器没有任何副作用以及当服务器的响应是可缓存时。
 * “POST”方法常用于HTML表单。它在请求主题中包含额外数据（表单数据）且这些数据常存储到服务器上的数据库中（副作用）。相同URL的重复POST请求从服务器得到的响应可能不同，
 * 同时不应该缓存使用这个方法的请求。
 * 还允许将“DELETE”、“HEAD”、“OPTIONS”、“PUT”作为open()的第一个参数。（“HTTP CONNECT”、“TRACE”、“TRACK”因为安全问题已被明确禁止。）旧浏览器不支持所有这些方法，
 * 但至少“HEAD”得到广泛支持。
 * 
 * open()的第2个参数是URL，它是请求的主题。这是相对于文档的URL，这个文档包含调用open()的脚本。
 * 如果指定绝对URL、协议、主机和端口通常必须匹配所在文档的对应内容：跨域的请求通常报错。（但是当服务器明确允许跨域请求时，2级XMLHttpRequest规范会允许它。）
 */
request.open(
    "GET",      // 开始一个HTTP GET请求
    "data.csv"  // URL的内容
    );

/**
 * 如果有请求头的话，请求进程的下个步骤是设置它。
 * 如果对相同的头调用 setRequestHeader() 多次，新值不会取代之前指定的值，相反，HTTP请求将包含这个头的多个副本或这个头指定多个值。
 * 
 * 你不能自己指定“Content-Length”、“Date”、“Referer” 或 “User-Agent”头，XMLHttpRequest会自动添加这些头而防止伪造它们。
 * 类似地，XMLHttpRequest对象自动处理cookie、连接时间、字符集和编码判断，所以你无法向serRequestHeader()传递这些头：
 * Accept-Charset              Content-Transfer-Encoding               TE
 * Accept-Encoding             Date                                    Trailer
 * Connection                  Expect                                  Transfer-Encoding
 * Content-Length              Host                                    Upgrade
 * Cookie                      Keep-Alive                              User-Agent
 * Cookie2                     Referer                                 Via
 * 
 * 你能为请求指定“Authorization”头，但通常不需要这么做。如果请求一个受密码保护的URL，把用户名和密码作为第4个和第5个参数传递给open()，则XMLHttpRequest将设置适当的头。
 * 
 */
// POST请求需要“Content-Type”头指定请求主题的MIME类型
request.setRequestHeader("Content-Type", "text/plain");

/**
 * 使用XMLHttpRequest发起HTTP请求的最后一步是指定可选的请求主体并向服务器发送它。
 * 使用send()方法像如下这样做。
 * 
 * GET请求绝对没有主体，所以应该传递null或省略这个参数。POST请求通常拥有主体，同时它应该匹配使用setRequestHeader()指定的“Content-Type”头。
 * 
 */
request.send(null);

/**
 * 顺讯问题
 * HTTP请求的各部分有指定顺序：请求方法和URL首先到达，然后是请求头，最后是请求主体。XMLHttpRequest实现通常直到调用send()方法才开始启动网络。
 * 但XMLHttpRequest API的设计似乎使每个方法都将写入网络流。这意味着调用XMLHttpRequest方法的顺序必须匹配HTTP请求的架构。例如，setRequestHeader()
 * 方法的调用必须在调用open()之后和调用send()之前，否则它将抛出异常。
 */


// 例18-1：用POST方法发送纯文本给服务器
function postMessage(msg) {
    var request = new XMLHttpRequest();    // 新请求
    request.open("POST", "/log.php");      // 用POST向服务端发送脚本
    // 请求主体发送纯文本消息
    request.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
    // send()方法启动请求，然后返回，当它等待服务端的响应时并不阻塞
    request.send(msg);                     // 把msg作为请求主体发送
    // 请求完成，我们将忽略任何响应和任何错误
}


/**
 * 取得响应
 * 
 * 一个完整的HTTP响应由状态码、响应头和响应主体组成。这些都可以通过XMLHttpRequest对象的属性和方法使用：
 * - status 和 statusText 属性，以数字和文本的形式返回HTTP状态码。这些属性保存标准的HTTP值，像200和“OK”表示成功请求，404和“Not Found”表示URL不能匹配服务器上的任何资源。
 * - getResponseHeader() 和 getAllResponseHeaders() 方法，查询响应头。XMLHttpRequest会自动处理cookie：它会从getAllResponseHeaders()方法返回的集合中过滤掉cookie头，
 *      且如果给getResponseHeader()方法传递“Set-Cookie” 和 “Set-Cookie2” 则返回null。
 * - 响应主体可以从 responseText 属性中得到文本形式的，或从 responseXML 属性中得到Document形式的。（这个属性名是有历史的，它实际上对XHTML和XML文档有效，但XHR2说它也应该
 *      对普通的HTML文档工作。）
 * 
 * XMLHttpRequest通常异步使用：发送请求后，send()方法立即返回，而直到响应返回，前面列出的响应方法和属性才有效。
 * 为了在响应准备就绪时得到通知，必须监听XMLHttpRequest对象上的 readystatechange 事件。为了理解这个事件类型，必须理解readyState属性。
 * readyState是一个整数，它指定了HTTP请求的状态，同时下面列出了它可能的值。第一列的符号是XMLHttpRequest构造函数定义的常量。这些常量是XMLHttpRequest规范的一部分，但老的
 * 浏览器和IE8没有定义它们，通常看到使用硬编码值4来表示XMLHttpRequest.DONE。
 * 常量                值                 含义
 * UNSENT              0                 open()尚未调用
 * OPENED              1                 open()已调用
 * HEADERS_RECEICED    2                 接收到头信息
 * LOADING             3                 接收到响应主体
 * DONE                4                 响应完成
 * 
 * 理论上，每次readyState属性改变都会触发 readystatechange 事件。实际中，当readyState改变为0或1时可能没有触发这个事件。
 * 当调用send()时，即使readyState仍处于OPENED状态，也通常触发它。某些浏览器在LOADING状态时能触发多次事件来给出进度反馈。
 * 当readyState值改变为4或服务器的响应完成时，所有的浏览器都触发readystatechange事件。因为在响应完成之前也会触发事件，所以事件处理程序应该一直检验readyState值。
 * 
 * 为了监听readystatechange事件，请把事件处理函数设置为XMLHttpRequest对象的onreadystatechange属性。也能使用addEventListener()（或IE8以及之前版本中使用attachEvent()），
 * 但通常每个请求只需要一个处理程序，所以只设置onreadystatechange更容易。
 * 
 * 例18-2定义了getText()函数来演示如何监听readystatechange事件。事件处理程序首先要确保请求完成。如果这样，它会检查响应状态码来确保请求成功。
 * 然后它查找“Content-Type”头来验证响应主体是否是期望的类型。如果3个条件都满足，它会把响应主体（以文本形式）发送给指定的回调函数。
 */
// 发出一个HTTP GET请求以获得指定URL的内容
// 当响应成功到达，验证它是否是纯文本
// 如果是，把它传递给指定回调函数
function getText(url, callback) {
    var request = new XMLHttpRequest();        // 创建新请求
    request.open("GET", url);                  // 指定待获取的URL
    request.onreadystatechange = function() {  // 定义事件处理程序
        // 如果请求完成，则它是成功的
        if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader("Content-Type");
            if (type.match(/^text/))           // 确保响应类型是文本
                callback(request.responseText);// 传递给回调函数
        }
    };
    request.send(null);                        // 立即发送请求
}

/**
 * 1. 同步响应：由于其本身的性质，异步处理HTTP响应是最好的方式。
 *      然而，XMLHttpRequest也支持同步响应。如果把false作为第3个参数传递给open()，那么send()方法将阻塞直到请求完成。
 *      在这种情况下，不需要使用事件处理程序：一旦send()返回，仅需要检查XMLHttpRequest对象的status和responseText属性。
 * 
 *      同步请求是吸引人的，但应该避免它们。客户端JavaScript是单线程的，当send()方法阻塞时，它通常会导致整个浏览器UI冻结。
 *      如果连接的服务器响应慢，那么用户的浏览器将冻结。
 */
// 比较例18-2中getText()函数的同步代码
// 发起同步的HTTP GET 请求以获得指定URL的内容
// 返回响应文本，或如果请求不成功或响应不是文本就报错
function getTextSync(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, false);           // 传递false实现同步
    request.send(null);                        // 立即发送

    // 请求不是200 OK，就报错
    if (request.status !== 200) throw new Error(request.statusText);

    // 如果类型错误，就报错
    var type = request.getResponseHeader("Content-Type");
    if (!type.match(/^text/))
        throw new Error("Excepted textval response; got " + type);

    return request.responseText;
}

/**
 * 2. 响应解码：
 *      前面我们假设服务器使用像“text/plain”、“text/html”、“text/css”这样的MIME类型发送文本响应，然后我们使用XMLHttpRequest对象的responseText属性得到它。
 *      但是还有其他形式的服务器响应。
 * 
 *      如果服务器发送XML或XHTML文档作为其响应，你能通过responseXML属性获得一个解析形式的XML文档。这个属性的值是一个Document对象，可以使用第15章的内容来搜索和遍历它。
 *      （XHR2草案规范指出浏览器也应该自动解析“text/html”类型的响应，使它们也能通过responseXML属性获取其Document文档对象，但在写本章时当前浏览器还没有这么做。）
 *      
 *      如果服务器想发送诸如对象或数组这样的结构化数据作为其响应，它应该传输JSON编码的字符串数据。当接受它时，可以把responseText属性传递给JSON.parse()。
 * 
 * 例18-3是例18-2的归纳：它实现指定URL的GET请求并当URL内容准备就绪时把它们传递给指定的回调函数。但它不是一直传递文本，而是传递Document对象或使用JSON.parse()编码的对象或字符串。
 * 
 * 例18-3检查该响应的“Content-Type”头且专门处理“application/json”响应。你可能希望特殊编码的另一个响应类型是“application/javascript”或“text/javascript”。你能使用
 * XMLHttpRequest请求JavaScript脚本，然后使用全局eval()执行这个脚本。但是，这种情况下，不需要使用XMLHttpRequest对象，因为<script>元素本身操纵HTTP脚本的能力完全可以
 * 实现加载执行脚本。见例13-4，且记住<script>元素能发起跨域HTTP请求，而XMLHttpRequest API则禁止。
 */
// 发起HTTP GET响应以获取指定URL的内容
// 当响应到达时，把它以解析后的XML Document对象、解析后的JSON对象或字符串形式传递给回调函数
function get(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            // 响应类型
            var type = request.getResponseHeader("Content-Type");
            // 检查类型
            if (type.indexOf("xml") !== -1 && request.responseXML) {
                // Document对象响应
                callback(request.responseXML);
            }
            else if (type === "application/json") {
                // JSON响应
                callback(JSON.parse(request.responseText));
            }
            else {
                // 字符串响应
                callback(request.responseText);
            }
        }
    };
    request.send(null);
}

/**
 * Web服务器通常使用二进制数据（例如，图片文件）响应HTTP请求。responseText属性只能用于文本，且它不能妥善处理二进制响应，即使对最终字符串使用了charCodeAt()方法。
 * XHR2 定义了处理二进制响应的方法，但在写本章时，浏览器厂商还没有实现它。进一步详情参见22.6.2节。
 * 
 * 服务器响应的正常解码是假设服务器为这个响应发送了“Content-Type”头和正确的MIME类型。例如，如果服务器发送XML文档但没有设置适当的MIME类型，那么XMLHttpRequest对象
 * 将不会解析它且设置responseXML属性。
 * 或者，如果服务器在“Content-Type”头中包含了错误的“charset”参数，那么XMLHttpRequest将使用错误的编码来解析响应，并且responseText中的字符可能是错的。XHR2定义了
 * overrideMimeType()方法来解决这个问题，并且大量的浏览器已经实现了它。
 * 如果相对于服务器你更了解资源的MIME类型，那么在调用send()之前把类型传递给overrideMimeType()，这将使XMLHttpRequest忽略“Content-Type”头而使用指定的类型。
 * 假设你将下载XML文件，而你计划把它当成纯文本对待。可以使用setOverrideMimeType()让XMLHttpRequest知道它不需要把文件解析成XML文档。
 * 
 *  // 不要把响应作为XML文档处理
 *  request.overrideMimeType("text/plain;charset=utf-8");
 */

/**
 * 编码请求主体
 * 
 * HTTP POST请求包括一个请求主体，它包含客户端传递给服务器的数据。在例18-1中请求主体是简单的文本字符串。
 * 但是，我们通常使用HTTP请求发送的都是更复杂的数据。
 */

/**
 * 1. 表单编码的请求
 * 
 * 考虑HTML表单。当用户提交表单时，表单中的数据（每个表单元素的名字和值）编码到一个字符串中并随请求发送。
 * 默认情况下，HTML表单通过POST方法发送给服务器，而编码后的表单数据则用做请求主体。
 * 对表数据使用的编码方案相对简单：对每个表单元素的名字和值执行普通的URL编码（使用十六进制转义码替换特殊字符），使用等号把编码后的名字和值分开，并使用
 * “&”符号分开 名/值 对，一个简单的编码像如下这样：
 *      find=pizza&zipcode=02134&radius=1km
 * 
 * 表单数据编码格式有一个正式的MIME类型：
 *      application/x-www-form-urlencoded
 * 
 * 当使用POST方法提交这种顺序的表单数据时，必须设置“Content-Type”请求头为这个值。
 * 注意，这种类型的编码并不需要HTML表单，在本章我们实际上将不需要直接使用表单。在Ajax应用中，你希望发送给服务器的可能是一个JavaScript对象。
 * （这个对象可能从HTML表单的用户输入中得到，但这里不是问题。）前面展示的数据变成JavaScript对象的表单编码形式可能是：
 *      {
 *          find: "pizza",
 *          zipcode: 02134,
 *          radius: "1km"
 *      }
 * 
 * 表单编码在Web上如此广泛使用，同时所有服务器端的编程语言都能得到良好的支持，所以非表单数据的表单编码通常也是容易实现的事情。
 * 例18-4展示了如何实现对象属性的表单编码
 */
// 编码对象的属性
// 如果它们是来自HTML表单的 名/值 对，使用application/x-www-form-urlencoded格式
function encodeFormData(data) {
    if (!data) return "";           // 一直返回字符串
    var pairs = [];
    for(var name in data) {
        if (!data.hasOwnProperty(name)) continue;    // 跳过继承属性
        if (typeof data[name] === "function") continue;   // 跳过方法
        var value = data[name].toString();
        name = encodeURIComponent(name.replace('%20', "+"));    // 编码名字
        value = encodeURIComponent(value.replace('%20', "+"));  // 编码值
        pairs.push(name + "=" + value);      // 记住名值对
    }
    return pairs.join("&");     // 返回使用“&”连接的名/值对
}

/**
 * 例18-5：使用表单编码数据发起一个HTTP POST请求
 */
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);                      // 对指定URL发生POST请求
    request.onreadystatechange = function() {
        if (request.readyState === 4 && callback)   // 当响应完成
            callback(request);                      // 调用回调函数
    };
    request.setRequestHeader("Content-Type", 
            "application/x-www-form-urlencoded");   // 设置Content-Type
    request.send(encodeFormData(data));             // 发送表单编码的数据
}

/**
 * 如果表单提交的目的是为了执行只读查询，因此GET请求比POST请求更合适。
 * GET请求从来没有主体，所以需要发送给服务器的表单编码数据“负载”要作为URL（后跟一个问号）的查询部分。
 * 例18-6：使用表单编码数据发起HTTP GET请求
 */
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url + "?" + encodeFormData(data));  // 通过添加的编码数据获取指定的URL
    request.onreadystatechange = function() {
        if (request.readyState === 4 & callback) callback(request);
    };
    request.send(null);
}

/**
 * 2. JSON编码的请求
 * 
 * 例18-7：使用JSON编码主体来发起HTTP POST请求
 */
function postJSON(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function() {
        if (request.readyState === 4 & callback)
            callback(request);
    };
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}

/**
 * 3. XML编码的请求
 * 
 * JavaScript对象的表单编码或JSON编码版本表达的pizza的查询，也能用XML文档来表示它。例如，它看起来如下所示
 * <query>
 *     <find zipcode="02134" radius="1km">
 *         pizza
 *     </find>
 * </query>
 * 
 * XMLHttpRequest对象的send()方法的参数除了可以是字符串或null，还可以传入XML Document对象。
 * 例18-8：使用XML文档作为其主体的HTTP POST请求
 * 
 * 下例中不曾为请求设置“Content-Type”头。当给send()方法传入XML文档时，并没有指定“Content-Type”头，但XMLHttpRequest对象会自动设置一个合适的头。
 * （类似地，如果给send()传入一个字符串但没有指定Content-Type头，那么XMLHttpRequest将会添加“text/plain;charset=utf-8”头。）
 * 在例18-1的代码中显式地设置了这个头，但实际上对于纯文本的请求主体并不需要这么做。
 */
// 在XML中编码什么东西、在哪儿和半径，然后向指定的URL发送POST请求
// 当接收到响应时，调用回调函数
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function() {
        if (request.readyState === 4 & callback)
            callback(request);
    };

    // 以<query>元素为根节点，创建一个XML Document
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement;
    var find = doc.createElement("find");
    query.appendChild(find);
    find.setAttribute("zipcode", where);
    find.setAttribute("radius", radius);
    find.appendChild(doc.createTextNode(what));
    // 现在向服务器发送XML编码的数据，注意，将自动设置 Content-Type 头
    request.send(query);
}

/**
 * 4. 上传文件
 * 
 * HTML表单的特性之一是当用户通过 <input type="file"> 元素选择文件时，表单将在它产生的POST请求主体中发送文件内容。
 * HTML表单始终能上传文件，但到目前为止它还不能使用XMLHttpRequest API做相同的事情。然后，XHR2 API允许通过向send()方法传入File对象来实现文件上传。
 * 
 * 没有File()对象构造函数，脚本仅能获得表示用户当前选择文件的File对象。在支持File对象的浏览器中，每个<input type="file">元素有一个files属性，它是
 * File对象中的类数组对象。拖放API（参见17.7节）允许通过拖放事件的dataTransfer.files属性访问用户“拖放”到元素上的文件。
 * 
 * 例18-9是一个自然的JavaScript函数，它对某些文件上传元素添加了change事件处理程序，这样它们，能自动把任何选择过的文件内容通过POST方法自动发送到指定的URL。
 * 
 * 正如22.6节所看到的，文件类型是更通用的二进制大对象（Blob）类型中的一个子类型。XHR2允许向send()方法传入任何Blob对象。
 * 如果没有显示设置Content-Type头，这个Blob对象的type属性用于设置上传的Content-Type头。如果需要上传已经产生的二进制数据，可以使用22.5节和22.6节展示的技术
 * 把数据转换为Blob并将其作为请求主体。
 */
// 查找有 data-uploadto 属性的全部<input type="file">元素，并注册onchange事件处理程序
// 这样任何选择的文件都会自动通过POST方法发送到指定的“uploadto” URL，服务器的响应是忽略的
// whenReady(uploadto);
// 文档准备就绪时运行
function uploadto() {
    var elts = document.getElementsByTagName("iput")
    for(var i=0;i<elts.length;i++) {
        var input = elts[i];
        if (input.type != "file") continue;        // 跳过非文件上传元素

        var url = input.getAttribute("data-uploadto");
        if (!url) continue;

        input.addEventListener("change", function(event) {
            var e = event || window.event;
            var file = this.files[0];              // 假设单个文件选择
            if (!file) return;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(file);
        }, false);
    }
}

/**
 * 5. multipart/form-data 请求
 * 
 * 当HTML表单同时包含文件上传元素和其他元素时，浏览器不能使用普通的表单编码而必须使用称为“multipart/form-data”的特殊Content-Type来
 * 用POST方法提交表单。这种编码包括使用长“边界”字符串把请求主体分离成多个部分。对于文本数据，手动创建“multipart/form-data”请求主体
 * 是可能的，但很复杂。
 * 
 * XHR2定义了新的FormData API，它容易实现多部分请求主体。首先，使用FormData()构造函数创建FormData对象，然后按需多次调用这个对象的
 * append()方法把个体“部分”（可以是字符串、File或Blob对象）添加到请求中。最后，把FormData对象传递给send()方法。
 * send()方法将对请求定义合适的边界字符串和设置“Content-Type”头。
 * 
 * 例18-10演示了FormData的使用，同时我们将在例18-11再次看到它。
 */
// 例18-10：使用POST方法发送multipart/form-data请求主体
function postFormData(url, data, callback) {
    if (typeof data === "undefined")
        throw new Error("FormData is not implemented");
    
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && callback)
            callback(request);
        
        var formdata = new FormData();
        for(var name in data) {
            if (!data.hasOwnProperty(name)) continue;

            var value = data[name];
            if (typeof value === "function") continue;
            // 每个属性变成请求的一部分，这里允许File对象
            // 作为一部分，添加名/值对
            formdata.append(name, value);
        }

        // 在multipart/form-data请求主体中发送名/值对
        // 每队都是请求的一部分，注意，当传入FormData对象时
        // send()会自动设置Content-Type头
        request.send(formdata);
    }

}


/**
 * HTTP进度事件
 * 
 * 使用readystatechange事件探测HTTP请求的完成。XHR2规范草案定义了更多有用的事件集，有些已经在Firefox、Chrome和Safari中得到支持。
 * 在这个新的事件模型中，XMLHttpRequest对象在请求的不同阶段触发不同类型的事件，所以它不再需要检查readyState属性。
 * 
 * 在支持它们的浏览器中，这些新事件会像如下这样触发。
 * - 当调用send()时，触发单个loadstart事件。
 * - 当正在加载服务器的响应时，XMLHttpRequest对象会发生progress事件，通常每隔 50ms 左右，所有可以使用这些事件给用户反馈请求的进度。
 * 如果请求快速完成，它可能不会触发progress事件。
 * - 当事件完成时，会触发load事件。
 * 
 * 一个完成的请求不一定是成功的请求，例如，load事件的处理程序应该检查XMLHttpRequest对象的status状态码来确定收到的是“200 OK”而不是
 * “404 Not Found”的HTTP响应。
 * 
 * HTTP请求无法完成有3种情况，对应3种事件。
 * - 如果请求超时，会触发timeout事件。
 * - 如果请求中止，会触发abort事件。
 * - 像太多重定向这样的网络错误会阻止请求完成，但这些情况发生时会触发error事件。
 * 
 * 对于任何具体请求，浏览器将只会触发load、abort、timeout和error事件中的一个。XHR2规范草案指出一旦这些事件中的一个发生后，浏览器应该
 * 触发loadend事件，但在写本章时，尚未有浏览器实现loadend事件。
 * 
 * 可以通过XMLHttpRequest对象的addEventListener()方法为这些progress事件中的每一个都注册事件处理程序。如果每种事件都只有一个事件处理
 * 程序，通常更容易的方法是只设置对应的处理程序属性，比如onprogress和onload。甚至可以使用这些事件属性是否存在来检测浏览器是否支持progress事件。
 *  if ("onprogress" in (new XMLHttpRequest())) {
 *      // 支持progress事件
 *  }
 * 
 * 除了像type和timestamp这样常用的Event对象属性外，与这些progress事件相关联的事件对象还有3个有用的属性。
 * loaded属性是目前传输的字节数值。
 * total属性是自“Content-Length”头传输的数据的整体长度（单位是字节），如果不知道内容长度则为0。
 * 如果知道内容长度则lengthComputable属性为true；否则为false。
 * 显然，total和loaded属性对progress事件处理程序相当有用。
 *  request.onprogress = function(e) {
 *      if (e.lengthComputable) {
 *          progress.innerHTML = Math.round(100 * e.loaded / total) + "% Complete";
 *      }
 *  }
 * 
 */

/**
 * 上传进度事件
 * 除了为监控HTTP响应的加载定义的这些有用的事件外，XHR2也给出了用于监控HTTP请求上传的事件。
 * 在实现这些特性的浏览器中，XMLHttpRequest对象将有upload属性。upload属性值是一个对象，它定义了addEventListener()方法和整个progress事件
 * 集合，比如onprogress和onload。（但upload对象没有定义onreadystatechange属性，upload仅能触发新的事件类型。）
 * 
 * 你能仅仅像使用常见的progress事件处理程序一样使用upload事件处理程序。
 * 对于XMLHttpRequest对象x，设置x.onprogress以监控响应的下载速度，并且设置x.upload.onprogress以监控请求的上传进度。
 * 
 * 例18-11演示了如何使用upload progress事件把上传进度反馈给用户。这个示例也演示了如何从拖放API中获得File对象和如何使用FormData API在单个
 * XMLHttpRequest请求中上传多个文件。在写本书时，这些功能依旧在草案中，并且这些示例不能在所有的浏览器中工作。
 */
// 例18-11：监控HTTP上传进度
// 查找所有含有“fileDropTarget”类的元素
// 并注册DnD事件处理程序使它们能响应文件的拖放
// 当文件放下时，上传它们到data-uploadto属性指定的URL
// whenReady(monitorUpload);
function monitorUpload() {
    var elts = document.getElementsByClassName("fileDropTarget");
    for(var i=0;i<elts.length;i++) {
        var target = elts[i];
        var url = target.getAttribute("data-uploadto");
        if (!url) continue;
        createFileUploadTarget(target, url);
    }

    function createFileUploadTarget(target, url) {
        // 跟踪当前是否正在上传，因此我们能拒绝放下
        // 我们可以处理多个并发上传
        // 但对这个例子使用进度通知太困难了
        var uploading = false;
        console.log(target, url);

        target.ondragenter = function(e) {
            console.log("dragenter");
            if (uploading) return;      // 如果正在忙忽略拖放
            var types = e.dataTransfer.types;
            if (types &&
                ((types.contains && types.contains("Files"))) ||
                (types.indexOf && types.indexOf("Files") !== -1)) {
                target.classList.add("wantdrop");
                return false;
            }
        }

        target.ondragover = function(e) { if (!uploading) return false; };

        target.ondragleave = function(e) {
            if (!uploading) target.classList.remove("wantdrop");
        };

        target.ondrop = function(e) {
            if (uploading) return false;
            var files = e.dataTransfer.files;
            if (files && files.length) {
                uploading = true;
                var message = "Uploading files:<ul>";
                for(var i=0;i<files.length;i++)
                    message += "<li>" + files[i].name + "</li>";
                message += "</ul>";

                target.innerHTML = message;
                target.classList.remove("wantdrop");
                target.classList.add("uploading");

                var xhr = new XMLHttpRequest();
                xhr.open("POST", url);
                var body = new FormData();
                for(var i=0;i<files.length;i++) body.append(i, files[i]);
                xhr.upload.onprogress = function(e) {
                    if (e.lengthComputable) {
                        target.innerHTML = message +
                            Math.round(e.loaded / e.total * 100) +
                            "% Complete";
                    }
                };

                xhr.upload.onload = function(e) {
                    uploading = false;
                    target.classList.remove("uploading");
                    target.innerHTML = "Drop files to upload";
                }

                xhr.send(body);

                return false;
            }

            target.classList.remove("wantdrop");
        }
    }
}


/**
 * 5. 中止请求和超时
 * 
 * 可以通过调用XMLHttpRequest对象的abort()方法来取消正在进行的HTTP请求。
 * abort()方法在所有的XMLHttpRequest版本和XHR2中可用，调用abort()方法在这个对象上触发abort事件。
 * （在写本章时，某些浏览器支持abort事件。可以通过XMLHttpRequest对象的“onabort”属性是否存在来判断。）
 * 
 * 调用abort()方法的主要原因是完成取消或超时请求消耗的时间太长或当响应变得无关时。假设使用XMLHttpRequest为文本输入域请求自动完成推荐。
 * 如果用户在服务器的建议达到之前输入了新字符，这时等待请求不再有趣，应该中止。
 * 
 * XHR2定义了timeout属性来指定请求自动中止后的毫秒数，也定义了timeout事件用于当超时发生时触发（不是abort事件）。
 * 在写本章时，浏览器不支持这些自动超时（并且它们的XMLHttpRequest对象没有timeout和ontimeout属性）。可以使用setTimeout()和abort()实现自己的超时。
 */
// 例18-12：实现超时
// 发起HTTP GET请求获取指定URL的内容
// 如果响应成功到达，传入reqsponseText给回调函数
// 如果响应在timeout毫秒内没有到达，中止这个请求
// 浏览器可能在abort()后触发“readystatechange”
// 如果是部分请求结果到达，甚至可能设置status属性
// 所以需要设置一个标记，当部分且超时的响应到达时不会调用回调函数
// 如果使用load事件就没有这个风险
function timedGetText(url, timeout, callback) {
    var timeout = false;                   // 是否超时
    // 启动计时器，在timeout毫秒后将中止请求
    var timer = setTimeout(function() {
        timeout = true;                    // 设置标记
        request.abort();                   // 中止请求
    }, timeout);
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function(e) {
        if (request.readyState !== 4) return;  // 忽略未完成的请求
        if (timeout) return;               // 忽略中止请求
        clearTimeout(timer);               // 取消等待的超时
        if (request.status === 200)
            callback(request.responseText);
    };
    request.send(null);
}


/**
 * 跨域HTTP请求
 * 
 * 作为同源策略的一部分，XMLHttpRequest对象通常仅可以发起和文档具有相同服务器的HTTP请求。这个限制关闭了安全漏洞，但它笨手笨脚并且阻止了大量
 * 合适使用的跨域请求。可以在<form>和<iframe>元素中使用跨域URL，而浏览器显示最终的跨域文档。但因为同源策略，浏览器不允许原始脚本查找跨域文档
 * 的内容。使用XMLHttpRequest，文档内容都是通过responseText属性暴露，所以同源策略不允许XMLHttpRequest进行跨域请求。（注意<script>元素并未
 * 真正受限于同源策略：它加载并执行任何来源的脚本。如果我们看18.2节，跨域请求的灵活性使得<script>元素成为取代XMLHttpRequest的主流Ajax传输
 * 协议。）
 * 
 * XHR2通过在HTTP响应中选择发送合适的CORS（Cross-Origin Resource Sharing，跨域资源共享）允许跨域访问网站。在写本书时，Firefox、Safari、
 * Chrome的当前版本都支持CORS，而IE8通过这里没有列出的专用XDomainRequest对象支持它。作为Web程序员，使用这个功能并不需要做什么额外的工作：
 * 如果浏览器支持XMLHttpRequest的CORS且实现跨域请求的网站决定使用CORS允许跨域请求，那么同源策略将不放宽而跨域请求就会正常工作。
 * 
 * 虽然实现CORS支持的跨域请求工作不需要做任何事情，但有一些安全细节需要了解。
 * 首先，如果给XMLHttpRequest的open()方法传入用户名和密码，那么它们绝对不会通过跨域请求发送（这使分布式密码破解攻击成为可能）。
 * 除外，跨域请求通常也不会包含其他任何的用户证书：cookie和HTTP身份验证令牌（Token）通常不会作为请求的内容部分发送且任何作为跨域响应来接受的cookie都会丢弃。
 * 如果跨域请求需要这几种凭证才能成功，那么必须在用send()发送请求前设置XMLHttpRequest的withCredentials属性为true。
 * 这样不常见，但测试withCredentials的存在性是测试浏览器是否支持CORS的一种方法。
 * 
 * 示例18-13是常见的JavaScript代码，它使用XMLHttpRequest实现HTTP HEAD请求以下载文档中<a>元素链接资源的类型、大小和时间等信息。这个HEAD
 * 请求按需发起，且由此产生的链接信息会出现在工具提示中。这个示例假设跨域链接的信息不可用，但通过支持CORS的浏览器尝试下载它。
 */ 
// 例18-13：使用HEAD和CORS请求链接详细信息
/**
 * linkdetails.js
 * 
 * 这个常见的JavaScript模块查询有href属性但没有title属性的所有<a>元素
 * 并给它们注册onmouseover事件处理程序
 * 这个事件处理程序使用XMLHttpRequest HEAD请求取得链接资源的详细信息
 * 然后把这些详细信息设置为链接的title属性
 * 这样它们将会在工具提示中显示
 */
// whenReady(linkDetails);
function linkDetails() {
    // 是否有机会使用跨域请求？
    var supportsCORS = (new XMLHttpRequest()).withCredentials !==  undefined;

    // 遍历文档中的所有链接
    var links = document.getElementsByTagName("a");
    for(var i=0;i<links.length;i++) {
        var link = linkes[i];
        if (!link.href) continue;
        if (link.title) continue;
        // 如果这是一个跨域链接
        if (link.host !== location.host ||
            link.protocol !== location.protocol)
        {
            link.title = "站外链接";      // 假设不能得到任何信息
            if (!supportsCORS) continue; // 如果没有CORS支持就略过
            // 否则，我们能了解这个链接的更多信息
            // 所以继续前进、注册事件处理程序，于是我们可以尝试
        }
        // 注册事件处理程序，当鼠标悬停时下载链接详细信息
        if (link.addEventListener)
            link.addEventListener("mouseover", mouseroverHandler, false);
        else
            link.attachEvent("onmouseover", mouseroverHandler);
    }

    function mouseroverHandler(e) {
        var link = e.target || e.srcElement;    // <a>元素
        var url = link.href;

        var req = new XMLHttpRequest();
        req.open("HEAD", url);                  // 仅询问头信息
        req.onreadystatechange = function() {
            if (req.readyState !== 4) return;
            if (req.status === 200) {
                var type = req.getResponseHeader("Content-Type");
                var size = req.getResponseHeader("Content-Length");
                var date = req.getResponseHeader("Last-modified");
                // 在工具 提示中显示详细信息
                link.title = "类型：" + type + " \n" +
                    "大小：" + size + " \n" + "时间：" + date;
            }
            else {
                // 如果请求失败，且链接没有“站外链接”的工具提示
                // 那么显示这个错误
                if (!link.title) 
                    link.title = "Could't fetch details:\n" +
                        req.status + " " + req.statusText;
            }
        };
        req.send(null);

        // 移除处理程序：仅想一次获取这些头信息
        if (link.removeEventListener)
            link.removeEventListener("mouseover", mouseroverHandler, false);
        else
            link.detachEvent("onmouseover", mouseroverHandler);
    }
}




/**
 * 借助<script>发送HTTP请求：JSONP
 * 
 * 本章概述提到过<script>元素可以作为一种Ajax传输机制：只须设置<script>元素的src属性（假如它还没插入到document中，需要插入进去），然后
 * 浏览器会发送一个HTTP请求以下载 src 属性所指向的URL。使用<script>元素进行Ajax传输的一个主要原因是，它不受同源策略的影响，因此可以使用
 * 它们从其他的服务器请求数据，第二个原因是包含JSON编码数据的响应会自动解码（即，执行）。
 * 
 * 这种使用<script>元素作为Ajax传输的技术称为JSONP，若HTTP请求所得到的响应数据是经过JSON编码的，则适合使用该技术。P代表“填充”或“前缀”。
 * 假设你已经写了一个服务，它处理GET请求并返回JSON编码的数据。同源的文档可以在代码中使用XMLHttpRequest和JSON.parse()，就像例18-3中的代
 * 码一样。假如在服务器上启用了CORS，在新的浏览器下，跨域的文档也可以使用XMLHttpRequest享受到该服务。在不支持CORS的旧浏览器下，跨域文档
 * 只能通过<script>元素访问这个服务。
 * 使用JSONP，JSON响应数据（理论上）是合法的JavaScript代码，当它到达时浏览器将执行它。相反，不使用JSONP，而是对JSON编码过的数据解码，结
 * 果还是数据，并没有做任何事情。
 * 
 * 这就是JSONP中的P的意义所在。当使用<script>元素调用数据时，响应内容必须用JavaScript函数名和圆括号包裹起来。而不是发送这样一段JSON数据：
 *      [1, 2, {"buckle": "my shoe"}]
 * 它会发送这样一个包裹后的JSON响应：
 *      handleResponse(
 *          [1, 2, {"buckle": "my shoe"}]
 *      )
 * 包裹后的响应会成为<script>元素的内容，它先判断JSON编码后的数据（毕竟就是一个JavaScript表达式），然后把它传递给handleResponse()函数，
 * 我们可以假设，文档会拿这些数据做一些有用的事情。
 * 
 * 为了可行起见，我们必须通过某种方式告诉服务，它正在从一个<script>元素调用，必须返回一个JSONP响应，而不应该是普通的JSON响应。这个可以通过
 * 在URL中添加一个查询参数来实现：例如，追加“?json”（或&json）。
 * 
 * 在实践中，支持JSONP的服务不会强制指定客户端必须实现的回调函数名称，比如handleResponse。相反，它们使用查询参数的值，允许客户端指定一个
 * 函数名，然后使用函数名去填充响应。
 * 例18-14使用一个名为jsonp的查询参数来指定回调函数的名称。许多支持JSONP的服务都会分辨除这个参数名。
 * 另一个常见的参数名是callback，为了让使用到的服务支持类似特殊的需求，就需要在代码上做一些修改了。
 * 
 * 例18-14定义了一个getJSONP()函数，它发送JSONP请求。这个例子有点复杂，有几点值得注意。首先，注意它是如何创建一个新的<script>元素，设置
 * 其URL，并把它插入到文档中的。正是该插入操作触发HTTP请求。其次，注意例18-14为每个请求都创建了一个全新的内部回调函数，回调函数作为getJSONP()
 * 函数的一个属性存储起来。最后要注意的是回调函数做了一些必要的清理工作：删除脚本元素，并删除自身。
 */
// 例18-14：使用script元素发送JSONP请求
// 根据指定的URL发送一个JSONP请求
// 然后把解析得到的响应数据传递给回调函数
// 在URL中添加一个名为jsonp的查询参数，用于指定该请求的回调函数的名称
function getJSONP(url, callback) {
    // 为本次请求创建一个唯一的回调函数名称
    var cbnum = "cb" + getJSONP.counter++;     // 自增计数器
    var cbname = "getJSONP" + cbnum;           // 作为JSONP函数的属性

    // 将回调函数名称以表单编码的形式添加到URL的查询部分中
    // 使用jsonp作为参数名，一些支持jsonp的服务
    // 可能使用其他的参数名，比如callback
    if (url.indexOf("?") === -1)               // URL没有查询部分
        url += "?jsonp=" + cbname;             // 作为查询部分添加参数
    else                                       // 否则
        url += "&jsonp" + cbname;              // 作为新的参数添加它

    // 创建script元素用于发送请求
    var script = document.createElement("script");

    // 定义将被脚本执行的回调函数
    getJSONP[cbnum] = function(response) {
        try {
            callback(response);                // 处理响应数据
        }
        finally {                              // 即使回调函数或响应抛出错误
            delete getJSONP[cbnum];            // 删除该函数
            script.parentNode.removeChild(script);
        }
    };

    // 立即触发HTTP请求
    script.src = url;
    document.body.appendChild(script);
}
getJSONP.counter = 0;     // 用于创建唯一回调函数名称的计数器




/**
 * 基于服务器端推送事件的Comet技术
 * 
 * 在服务器端推送事件的标准草案中定义了一个EventSource对象，简化了Comet应用程序的编写可以传递一个URL给EventSource()构造函数，然后在返回的实例上监听消息事件。
 *  var ticker = new EventSource("stockprices.php");
 *  tricker.onmessage = function(e) {
 *      var type = e.type;
 *      var data = e.data;
 *      // 现在处理事件类型和事件的字符串数据
 *  }
 * 
 * 与message事件关联的事件对象有一个data属性，这个属性保存服务器作为该事件的负载发送的任何字符串。如同其他类型的事件一样，该对象还有一个type属性，默认值是message，
 * 事件源可以修改这个值。onmessage事件处理程序接收从一个给定的服务器事件源发出的所有事件，如果有必要，也可以根据type属性派发一个事件。
 * 
 * 服务器端推送事件的协议很简单。客户端（创建一个EventSource对象时会）建立一个到服务器端的连接，服务器保持这个连接处于打开状态。当发生一个事件时，服务器端在
 * 连接中写入几行文本，抛给客户端的事件可能开起来是这样：
 *  event: bid    设置事件对象的类型
 *  data: GOOG    设置data属性
 *  data: 999     追加新的一行和更多的数据
 *                一个空行会触发消息事件
 * 
 * 该协议还有一些额外的细节，比如允许事件携带给定ID，然后再次连上的客户端告诉服务器它收到的最后一个事件的ID，这样的服务器就可以重新发送客户端错过的事件。
 * 但是这些细节在此处并不重要。
 */

/**
 * Comet架构的一个常见应用是聊天应用，聊天客户端可以通过XMLHttpRequest向聊天室发送新的消息，也可以通过EventSource对象订阅聊天信息。
 * 例18-15展示了使用EventSource写一个聊天客户端是多么容易。
 */

/**
 * 在写本书的时候，Chrome和Safari已经开始支持EventSource，Mozilla也准备在Firefox 4.0之后的第一个版本中实现它。
 * 其XMLHttpRequest实现在下载过程中会（为readyState 3）触发readystatechange事件的浏览器，可以很容易地使用XMLHttpRequest模拟EventSource。
 * 例18-16展示了如何完成。配合这个模拟模块，例18-15就可以工作在Chrome、Safari和Firefox下了。
 * （例18-16在IE或Opera下不可用，直到它们的XMLHttpRequest实现在下载过程中能够产生事件为止。）
 */
// 例18-16：用XMLHttpRequest模拟EventSource
// 在不支持EventSource API的浏览器里进行模拟
// 需要有一个XMLHttpRequest对象在新数据写到长期存在的HTTP连接中时发送readystatechange事件
// 注意，这个API的实现是不完善的
// 它不支持readyState属性，close()方法，open和error事件。
// 消息事件也是通过onmessage属性注册的 —— 这个版本还没有定义addEventListener()方法
if (window.EventSource === undefined) {
    // 未定义EventSource
    // 模拟
    window.EventSource = function(url) {
        var xhr;                       // HTTP连接器
        var evtsrc = this;             // 在事件处理程序中用到
        var charsReveived = 0;         // 这样我们就可以知道什么是新的
        var type = null;               // 检查属性响应类型
        var data = "";                 // 存放消息数据
        var eventName = "message";     // 事件对象的类型字段
        var lastEventId = "";          // 用于和服务器再次同步
        var retrydelay = 1000;         // 在多个连接请求之间设置延迟
        var aborted = false;           // 设置为true表示放弃连接

        // 创建一个XHR对象
        xhr = new XMLHttpRequest();

        // 定义一个事件处理程序
        xhr.onreadystatechange = function() {
            switch(xhr.readyState){
                case 3:
                    processData(); break; // 当数据块到达时
                case 4:
                    reconnect(); break;   // 当请求关闭的时候
            }
        };
        // 通过connect()创建一个长期存在的连接
        connect();

        // 如果连接正常关闭，等待1s钟再尝试连接
        function reconnect() {
            if (aborted) return;          // 在终止连接后不进行重连操作
            if (xhr.status >= 300) return;// 在报错后不进行重连操作
            setTimeout(connect, 1000);    // 等待1s后进行重连
        }

        // 这里的代码展示了如何建立一个连接
        function connect() {
            charsReceiced = 0;
            type = null;
            xhr.open("GET", url);
            xhr.setRequestHeader("Cache-Control", "no-cache");
            if (lastEventId)
                xhr.setRequestHeader("Last-Event-ID", lastEventId);
            xhr.send();
        }

        // 每当数据到达的时候，会处理并触发onmessage处理程序
        // 这个函数处理Server-Send Events协议的细节
        function processData() {
            if (!type) {   // 如果没有准备好，先检查类型
                type = xhr.getResponseHeader("Content-Type");
                if (type !== "text/event-stream") {
                    aborted = true;
                    xhr.abort();
                    return
                }
            }
            // 记录接收的数据
            // 获得响应中未处理的数据
            var chunk = xhr.responseText.substring(charsReveived);
            charsReveived = xhr.responseText.length;

            // 将大块的文本数据分成多行并遍历它们
            var lines = chunk.replace(/(\r\n|\r|\n)$/, "").split(/\r\n|\r|\n/);
            for(var i=0;i<lines.length;i++) {
                var line = lines[i],
                    pos = line.indexOf(":"),
                    name,
                    value = "";
                if (pos == 0) continue;               // 忽略注释
                if (pos > 0) {                        // 字段：name:value
                    name = line.substring(0, pos);
                    value = line.substring(pos+1);
                    if (value.charAt(0) == " ") value = value.substring(1);
                }
                else
                    name = line;                      // 只有字段name
                
                switch(name) {
                    case "event": eventName = value; break;
                    case "data": data += value + "\n"; break;
                    case "id": lastEventId = value; break;
                    case "retry": retrydelay = parseInt(value) || 1000; break;
                    default: break;
                }
                if (line === "") {  // 一个空行意味着发送事件
                    if (evtsrc.onmessage && data !== "") {
                        // 如果末尾有新行，就裁剪新行
                        if (data.charAt(data.length-1) == "\n")
                            data = data.substring(0, data.length-1);
                        // 这是一个伪造的事件对象
                        evtsrc.onmessage({
                            type: eventName,    // 事件类型
                            data: data,         // 事件数据
                            origin: url,        // 数据源
                        });
                        data = ""
                        continue;
                    }
                }
            }
        }
    };
}

/**
 * 我们通过一个服务器示例结束了Comet架构的探讨。
 * 例18-17展示了一个用服务器端JavaScript为Node编写的定制HTTP服务器。当一个客户端请求根URL“/”时，它会把例18-15里展示的聊天室客户端代码
 * 和例18-16中的模拟代码发送到客户端。当客户端创建了一个指向URL“/chat”的GET请求时，它会用一个数组来保存响应数据流并保持连接处于打开状态。
 * 当客户端发起针对“chat” POST请求时，它会将响应的主体部分作为一条聊天消息使用并写入数据，以“data:”作为Server-Sent Events前缀，添加到
 * 每个已打开的响应数据流上。如果安装了Node，那就可以在本地运行这个服务器例子。它监听8000端口，因此在启动服务器之后，就可以用浏览器访问
 * http://localhost:8000来进行聊天。
 */

