/**
 * 脚本化CSS
 */

/**
 * CSS概览+
 * 
 */




/**
 * 重要的CSS属性
 * 
 * 可见性、尺寸、定位
 * 
 * position                     指定元素的定位类型
 * top、left                    指定元素上、左边缘的位置
 * bottom、right                指定元素下、右边缘的位置
 * width、height                指定元素的尺寸
 * z-index                      指定元素相对于其他重叠元素的“堆叠次序”，定义了元素定位的第三个维度
 * display                      指定元素是否以及如何显示
 * visibility                   指定元素是否可见
 * clip                         定义元素的“裁剪区域”，只显示元素在区域内的部分
 * overflow                     指定元素比分配的空间要大时的处理方法
 * margin、border、padding      指定元素的空白和边框
 * background                   指定元素的背景颜色或图片
 * opacity                      指定元素的不透明度（或半透明度），它是CSS3的属性，有些浏览器支持，IE中另有它法
 */




/**
 * 脚本化内联样式
 * 
 * e.style.cssText 元素e的style属性值
 */




/**
 * 查询计算出的样式
 * 
 * 元素的计算样式是一组属性值，它由浏览器通过把内联样式结合所有链接样式表中所有可应用的样式规则后导出（或计算）得到的：它就是一组在现实元素时实际使用的属性值。
 * 类似内联样式，计算样式也是用一个CSSStyleDeclaration对象来表示的，区别是，计算样式是只读的。
 * 浏览器窗口对象的getComputedStyle()方法来获得一个元素的计算样式。此方法的第一个参数就是要获取其计算样式的元素，第二个参数也是必需的，通常是null或空字符串，
 * 但它也可以是命名CSS伪对象的字符串，如“:before”、“:after”、“:first-line”或“:first-letter”。
 * 
 *      var title = document.getElementById("section1title");
 *      var titlestyles = window.getComputedStyle(title, null);
 * 
 * getComputedStyle()方法的返回值是一个CSSStyleDeclaration对象，它代表了应用在指定元素（或伪对象）上的所有样式。
 * 表示计算样式的CSSStyleDeclaration对象和表示内联样式的对象之间有一些重要区别：
 * - 计算样式的属性是只读的
 * - 计算样式的值是绝对值：类似百分比和点之类相对的单位将全部转换为绝对值。所有指定尺寸（例如外边距大小和字体大小）的属性都有一个以像素为度量单位的值。该值将是
 *   一个冠以“px”后缀的字符串，使用时仍然需要解析它，但是不用担心单位的解析或转换。其值是颜色的属性将以“rgb(#,#,#)”或“rgba(#,#,#,#)”的格式返回。
 * - 不计算复合属性，它们只基于最基础的属性。例如，不要查询margin属性，应该使用marginLeft和marginTop等。
 * - 计算样式的cssText属性未定义。
 * 
 * 计算样式和内联样式可以同时使用。例16-4定义了scale()和scaleColor()函数。一个用来查询和解析指定元素的计算文本尺寸，另一个查询和解析元素的计算背景颜色。两个
 * 函数都将结果值按比例缩放并作为元素的内联样式设置缩放值。（这些函数在IE 8 和更早期的版本中无法工作，这些版本的IE不支持getComputedStyle()方法。）
 * 
 * 例16-4：查询计算样式与设置内联样式
 */
// 用指定的因子缩放元素e的大小
function scale(e, factor) {
    // 用计算样式查询当前文本的尺寸
    var size = parseInt(window.getComputedStyle(e, "").fontSize);
    // 用内联样式来放大尺寸
    e.style.fontSize = size*factor + "px";
}

// 用指定的因子修改元素e的背景颜色
// factor > 1 颜色变浅，factor < 1颜色变暗
function scaleColor(e, factor) {
    var color = window.getComputedStyle(e, "").backgroundColor;
    var components = color.match(/[\d\.]+/g);    // 解析r、g、b和a分量
    for(var i=0;i<3;i++) {
        var x = Number(components[i]) * factor;
        x = Math.round(Math.min(255, Math.max(x, 0)));  // 缩放每个值
        components[i] = x;
    }
    if (components.length == 3)
        e.style.backgroundColor = "rgb(" + components.join(",") + ")";
    else
        e.style.backgroundColor = "rgba(" + components.join(",") + ")";
}

/**
 * 计算样式也具有欺骗性，查询它们得到的信息也不总是如人所愿。考虑一下font-family属性：为适应性跨平台可移植性，它可以接受以逗号隔开的字体系列列表。
 * 当查询一个计算样式的fontFamily属性时，只能得到应用到该元素上具体的font-family样式的值。可能返回类似“arial,helvetica,sans-serif”的值，它无法
 * 告诉你实际使用了哪种字体。类似地，如果没有绝对定位元素，试图通过计算样式的top和left属性查询它的位置和尺寸通常会返回“auto”值。
 * 
 * getComputedStyle()在IE 8或更早的版本中没有实现，但有望在IE 9中实现。在IE中，每个HTML元素都有自己的currentStyle属性，他的值是CSSStyleDeclaration
 * 对象。IE的currentStyle组合内联样式和样式表，但它不是真正的计算样式，因为那些相对值都没有转化成绝对值。
 * 查询IE的当前样式属性会返回带相对性单位（如“%”或“em”）的尺寸或者非精确的颜色值（如“red”）。
 */




/**
 * 脚本化CSS类
 * 
 * 通过内联style属性脚本化CSS样式的一个可选方案是脚本化HTML的class属性值。改变元素的class就改变了应用于元素的一组样式表选择器，它能在同一时刻改变多个
 * CSS属性。例如，假设想让用户对文档中单独的段落（或其他元素）引起注意。首先，为任意元素定义一个名为“attention”的类：
 * 
 * 黑框、粗体、黄色高亮背景
 * .attention {
 *     background-color: yellow;
 *     font-weight: bold;
 *     border: solid black 2px;
 * }
 * 
 * 标识符class在JavaScript中是保留字，所以HTML属性class在JavaScript代码中应该可用于使用className的JavaScript。如下代码设置和清除元素的className属性
 * 来为元素添加和移除“attention”类：
 *      function grabAttention(e) { e.className = "attention"; }
 *      function releaseAttention(e) { e.className = ""; }
 * 
 * HTML元素可以有多个CSS类名，class属性保存了一个用空格隔开的类名列表。className属性是一个容易误解的名字：classNames可能更好。上面的函数假设className
 * 属性只指定零个或一个类名，如果有多个类名就无法工作了。如果元素已经有一个类了，为该元素调用grabAttention()函数将覆盖已存在的类。
 * 
 * HTML5解决了这个问题，为每个元素定义了classList属性。该属性是DOMTokenList对象：一个只读的类数组对象，它包含元素的单独类名。
 * 但是，和数组元素相比，DOMTokenList定义的方法更加重要。
 * add()和remove()从元素的class属性中添加和清除一个类名。
 * toggle()表示如果不存在类名就添加一个；否则，删除它。
 * contains()方法检测class属性中是否包含一个指定的类名。
 * 
 * 类似其他DOM集合类型，DOMTokenList对象“实时地”代表了元素类名集合，而并非是在查询classList属性时类名的一个静态快照。
 * 如果从元素的classList属性中获得了一个DOMTokenList对象，然后元素的className属性改变了，这些变化在标识列表中及时可见。
 * 同样，改变标识列表，在className属性及时可见。
 */

/**
 * 例16-5：classList() ：将className当做一个CSS类集合。
 * 
 * 如果e有classList属性则返回它。否则，返回一个为e模拟DOMTokenList API的对象
 * 返回的对象有contains()、add()、remove()、toggle()和toString()等方法
 * 
 * 来检测和修改元素e的类集合。
 * 如果classList属性是原生支持的，返回的类数组对象有length属性和数组索引。
 * 模拟DOMTokenList不是类数组对象，但是它有一个toArray()方法来返回一个含元素类名的纯数组快照
 */
function classList(e) {
    if (e.classList) return e.classList;
    else return new CSSClassList(e);
}

// CSSClassList 是一个模拟DOMTokenList的JavaScript实现
function CSSClassList(e) {
    this.e = e;
}

// 如果e.className包含类名c则返回true，否则，返回false
CSSClassList.prototype.contains = function(c) {
    // 检查c是否是合法的类名；不含空格字符串，长度不为0，
    if (c.length === 0 || c.indexOf(" ") != -1)
        throw new Error("Invalid class name: '" + c +"'.");
    // 首先是常规检查
    var classes = this.e.className;
    if (!classes) return false;
    if (classes === c) return true;
    // 否则，把c看成一个单词，利用正则表达式搜索c
    // \b在正则表达式里代表单词的边界
    return classes.search("\\b" + c + "\\b") != -1;
};

// 如果c不存在，将c添加到e.className中
CSSClassList.prototype.add = function(c) {
    if (this.contains(c)) return;
    var classes = this.e.className;
    if (classes && classes[classes.length-1] != " ")
        c = " " + c;
    this.e.className += c;
};

// 将在e.className中出现的所有c都删除
CSSClassList.prototype.remove = function(c) {
    if (c.length === 0 || c.indexOf(" ") != -1)
        throw new Error("Invalid class name: '" +c+ ";.");
    // 将所有作为单词的c和多余的尾随空格全部删除
    var pattern = new RegExp("\\b" + c + "\\b\\s*", "g");
    this.e.className = this.e.className.replace(pattern, "");
}

// 如果c不存在，将c添加到e.className中，并返回true
// 否则，将在e.className中出现的所有c都删除，并返回false
CSSClassList.prototype.toggle = function(c) {
    if (this.contains(c)) {
        this.remove(c);
        return false;
    }
    else {
        this.add(c);
        return true;
    }
}

// 返回e.className本身
CSSClassList.prototype.toString = function() {
    return this.e.className;
}

// 返回在e.className中的类名
CSSClassList.prototype.toArray = function() {
    return this.e.className.match(/\b\w+\b/g) || [];
}




/**
 * 脚本化样式类
 * 
 * 在脚本化样式表时，将会碰到两类需要使用的对象。第一类是元素对象，由 <style> 和 <link> 元素表示，两种元素包含或引用样式表。这些常规的文档元素，如果它们有
 * id属性值，可以用document.getElementById()函数来选择它们。第二类是CSSStyleSheet对象，它表示样式表本身。document.styleSheets属性是一个只读的类数组对象，
 * 它包含CSSStyleSheet对象，表示与文档关联在的一起的样式表。如果为定义或引用了样式表的 <style> 和 <link>元素设置title属性值，该title作为对应CSSStyleSheet
 * 对象的title属性就可用。
 */

/**
 * 开启和关闭样式表
 * 
 * <style>、<link>元素和CSSStyleSheet对象都定义了一个在JavaScript中可以设置和查询的disabled属性。
 * 如果disabled属性为true，样式表就被浏览器关闭并忽略。
 * 
 * 以下disableStylesheet()函数说明这一点。
 * 如果传递一个数字，函数将其当做document.styleSheets数组中的一个索引。
 * 如果传递一个字符串，函数将其当做CSS选择器并传递给document.querySelectorAll()
 * 然后设置所有返回元素的disabled属性。
 */
function disableStylesheet(ss) {
    if (typeof ss === "number")
        document.styleSheets[ss].disabled = true;
    else {
        var sheets = document.querySelectorAll(ss);
        for(var i=0;i<sheets.length;i++) {
            sheets[i].disabled = true;
        }
    }
}


/**
 * 查询、插入与删除样式表规则
 * 
 * 除了样式表的开启与关闭以外，CSSStyleSheet对象也定义了用来查询、插入和删除样式表规则的API。IE 8及更早版本实现的API和
 * 其他浏览器实现的标准API之间有一些轻微的区别。
 * 直接操作样式表通常没有什么意义。典型的，相对编辑样式表或增加新规则而言，让样式表保持静态并对元素的className属性编程更好。
 * 
 * 另一方面，如果允许用户完全控制页面上的样式，可能就需要动态操作样式表。
 * 
 * document.styleSheetsp[] 数组的元素是CSSStyleSheet对象。CSSStyleSheet对象有一个cssRules[] 数组，它包含样式表的所有规则。
 *      var firstRule = document.styleSheets[0].cssRules[0];
 * 
 * IE使用不同的属性名rules代替cssRules。
 * cssRules[] 或 rules[] 数组的元素为CSSRule对象。
 * 在标准的API中，CSSRule对象代表所有cSS规则，包含如 @import 和 @page 等指令。
 * 但是，在IE中，rules[] 数组只包含样式表中实际存在的样式规则。
 * 
 * CSSRule对象有两个属性可以很便捷地使用。（在标准API中，非样式规则没有定义这些属性，当遍历样式表时希望能跳过去它。）
 * selectText 是规则的CSS选择器，它引用一个描述与选择器相关联的样式的可写CSSStyleDeclaration对象。CSSStyleDeclaration是用来表示内
 * 联和计算样式的相同类型。可以利用它来查询规则的样式值或设置新样式表。通常，当遍历样式表时，你对规则的文本比它解析后的表示形式更感兴趣。
 * 此时，使用CSSStyleDeclaration对象的cssText属性来获得规则的文本表示形式。
 * 
 * 除了查询和修改样式表中已存在的规则外，也能向样式表添加和从中删除规则。标准的API接口定义了insertRule()和deleteRule()方法来添加和删除规则：
 *      document.styleSheets[0].insertRule("H1 { text-weight: bold; }", 0);
 * 
 * IE不支持insertRule()和deleteRule()，但定义了大致等效的函数addRule()和removeRule()。
 * （除了名字以外）仅有的不同是addRule()希望选择器文本和样式文本作为两个参数。
 * 
 */
var ss = document.styleSheets[0];
var rules = ss.cssRules || ss.rules;
for(var i=0;i<rules.length;i++) {
    var rule = rules[i];
    if (!rule.selectorText) continue;
    
    var selector = rule.selectorText;    // 选择器
    var ruleText = rule.style.cssText;   // 文本形式的样式

    // 如果规则应用在h1元素上，也将其应用到h2元素上
    // 注意，仅当选择器在字面上为“h1”时才起作用
    if (selector == "h1") {
        if (ss.insertRule) ss.insertRule("h2 {"+ ruleText +"}", rules.length);
        else if (ss.addRule) ss.addRule("h2", ruleText, rules.length);
    }

    // 如果规则设置了text-decoration属性，则将其删除
    if (rule.style.textDecoration) {
        if (ss.deleteRule) ss.deleteRule(i);
        else if (ss.removeRule) ss.removeRule(i);
        i--; // 调整循环索引，因为以上的规则i+1现在即为规则i
    }
}


/**
 * 创建新样式表
 * 
 * 最后，创建整个新样式表并将其添加到文档中是可能的。在大多数浏览器中，可以用标准的DOM技术：只要创建一个全新的 <style> 元素，
 * 将其插入到文档的头部，然后用其innerHTML属性来设置样式表的内容。
 * 但是在IE 8以及更早的版本中，CSSStyleSheet对象通过非标准方法document.createStyleSheet()来创建，其样式文本用cssText属性
 * 值来指定。
 * 
 * 例16-6：创建一个新样式表
 */
// 对文档添加一个 样式表，用指定的样式填充它
// styles参数可能是字符组或对象。如果它是字符串，就把它作为样式表的文本
// 如果它是对象，将每个定义样式规则的每个属性添加到样式表中
// 属性名即为选择器，其值即为对应的样式
function addStyles(styles) {
    // 首先，创建一个新样式表
    var styleElt, styleSheet;
    if (document.createStyleSheet) {
        styleSheet = document.createStyleSheet();
    }
    else {
        var head = document.getElementsByTagName("head")[0];
        styleElt = document.createElement("style");
        head.appendChild(head);
        // 现在，新的样式表应该是最后一个
        styleSheet = document.styleSheets[document.styleSheets.length-1];
    }

    // 现在向其中插入样式
    if (typeof styles === "string") {
        if (styleElt)
            styleElt.innerHTML = styles;
        else
            styleSheet.cssText = styles;
    }
    else {
        var i = 0;
        for(selector in styles) {
            if (styleSheet.insertRule) {
                var rule = selector + " {" + styles[selector] + "}";
                styleSheet.insertRule(rule, i++);
            }
            else {
                styleSheet.insertRule(selector, styles[selector], i++);
            }
        }
    }
}







