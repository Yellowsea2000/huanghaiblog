# 前端面试总结

## CSS&HTML

### 1. HTML5 元素的分类

```
HTML4中，元素被分成两大类: inline（内联元素）与 block（块级元素）。

但在实际的开发过程中，因为页面表现的需要，前端工程师经常把 inline 元素的 display 值设定为 block （比如 a 标签），也经常把 block 元素的 display 值设定为inline 之后更是出现了 inline-block 这一对外呈现 inline 对内呈现 block 的属性。

因此，简单地把 HTML 元素划分为inline 与 block 已经不再符合实际需求。

HTML5中，元素主要分为7类：Metadata Flow Sectioning Heading Phrasing Embedded Interactive
```

### 2. 介绍一下你对浏览器内核的理解？

```
主要分成两部分：渲染引擎和 JS 引擎。

渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容。默认情况下，渲染引擎可以显示 html、xml 文档及图片，它也可以借助插件（一种浏览器扩展）显示其他类型数据，例如使用 PDF 阅读器插件，可以显示 PDF 格式。

JS 引擎：解析和执行 javascript 来实现网页的动态效果。

最开始渲染引擎和 JS 引擎并没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎。
```

### 3.渲染过程中遇到 JS 文件怎么处理？（浏览器解析过程）

```
JavaScript 的加载、解析与执行会阻塞文档的解析，也就是说，在构建 DOM 时，HTML 解析器若遇到了 JavaScript，那么 , 它会暂停文档的解析，将控制权移交给 JavaScript 引擎，等 JavaScript 引擎运行完毕，浏览器再从中断的地方恢复继续解析文档。

也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件，这也是都建议将 script 标签放在 body 标签底部的原因。当然在当下，并不是说 script 标签必须放在底部，因为你可以给 script 标签添加 defer 或者 async 属性。
```

### 4. async 和 defer 的作用是什么？有什么区别

```
（1）脚本没有 defer 或 async，浏览器会立即加载并执行指定的脚本，也就是说不等待后续载入的文档元素，读到就加载并执行。

 （2）defer 属性表示延迟执行引入的 JavaScript，即这段 JavaScript 加载时 HTML 并未停止解析，这两个过程是并行的。当整个 document 解析完毕后再执行脚本文件，在 DOMContentLoaded 事件触发之前完成。多个脚本按顺序执行。

 （3）async 属性表示异步执行引入的 JavaScript，与 defer 的区别在于，如果已经加载好，就会开始执行，也就是说它的执行仍然会阻塞文档的解析，只是它的加载过程不会阻塞。多个脚本的执行顺序无法保证。
```

### 5. 前端需要注意哪些 SEO ？

```
（1）合理的 title、description、keywords：搜索对着三项的权重逐个减小，title 只强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面 title 要有所不同；description 把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面 description 有所不同；keywords 列举出重要关键词即可。

 （2）语义化的 HTML 代码，符合 W3C 规范：语义化代码让搜索引擎容易理解网页。

 （3）重要内容 HTML 代码放在最前：搜索引擎抓取 HTML 顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容肯定被抓取。

 （4）重要内容不要用 js 输出：爬虫不会执行 js 获取内容

 （5）少用 iframe：搜索引擎不会抓取 iframe 中的内容

 （6）非装饰性图片必须加 alt

 （7）提高网站速度：网站速度是搜索引擎排序的一个重要指标
```

### 6. Canvas 和 SVG 有什么区别？

```
Canvas 是一种通过 JavaScript 来绘制 2D 图形的方法。Canvas 是逐像素来进行渲染的，因此当我们对 Canvas 进行缩放时，会出现锯齿或者失真的情况。

 SVG 是一种使用 XML 描述 2D 图形的语言。SVG 基于 XML，这意味着 SVG DOM 中的每个元素都是可用的。我们可以为某个元素附加 JavaScript 事件监听函数。并且 SVG 保存的是图形的绘制方法，因此当 SVG 图形缩放时并不会失真。
```

## 微信小程序

### 1. 性能优化

小程序官方针对小程序性能表现制订了权威的数值指标，主要围绕 **渲染表现**、<font color=red size=3 face="黑体">setData</font>、**元素节点数** 和 **网络请求延时** 这几个维度来给予定义（下面只列出部分关键指标）：

- 首屏时间不超过 5 秒；

- 渲染时间不超过 500ms；

- 每秒调用<font color=red size=3 face="黑体">setData</font> 的次数不超过 20 次；

- <font color=red size=3 face="黑体">setData</font> 的数据在<font color=red size=3 face="黑体">JSON.stringify</font> 后不超过 256kb；

- 页面 WXML 节点少于 1000 个，节点树深度少于 30 层，子节点数不大于 60 个；

- 所有网络请求都在 1 秒内返回结果

> 详见 [小程序性能评分规则](https://developers.weixin.qq.com/miniprogram/dev/framework/audits/performance.html)

**无用文件、函数、样式剔除：**

> 经过多次业务迭代，无可避免的会存在一些弃用的组件/页面，以及不被调用的函数、样式规则，这些冗余代码会白白占据宝贵的代码包空间。而且，目前小程序的打包会将工程下所有文件都打入代码包内，并没有做依赖分析。
>
> 因此，我们需要及时地剔除不再使用的模块，以保证代码包空间利用率保持在较高水平。通过一些工具化手段可以有效地辅助完成这一工作。

- 文件依赖分析

  在小程序中，所有页面的路径都需要在小程序代码根目录 <font color="red" size=3 >app.json</font> 中被声明，类似地，自定义组件也需要在页面配置文件 <font color="red" size=3 >page.json </font> 中被声明。另外，WXML、WXSS 和 JS 的模块化都需要特定的关键字来声明依赖引用关系。

### 2.小程序底层架构

微信小程序是大前端跨平台技术的其中一种产物，与当下其他热门的技术 React Native、Weex、Flutter 等不同，小程序的最终渲染载体依然是浏览器内核，而不是原生客户端。

而对于传统的网页来说，UI 渲染和 JS 脚本是在同一个线程中执行，所以经常会出现 “阻塞” 行为。微信小程序基于性能的考虑，启用了**双线程模型**：

- **视图层**：也就是 webview 线程，负责启用不同的 webview 来渲染不同的小程序页面；
- **逻辑层**：一个单独的线程执行 JS 代码，可以控制视图层的逻辑；

然而，**任何线程间的数据传输都是有延时的**，这意味着逻辑层和视图层间通信是异步行为。除此之外，微信为小程序提供了很多客户端原生能力，在调用客户端原生能力的过程中，微信主线程和小程序双线程之间也会发生通信，这也是一种异步行为。这种异步延时的特性会使运行环境复杂化，稍不注意，就会产出效率低下的编码。

作为小程序开发者，我们常常会被下面几个问题所困扰：

- 小程序启动慢；
- 白屏时间长；
- 页面渲染慢；
- 运行内存不足；

在小程序打开时，微信会默默完成下面几项工作：

**1. 准备运行环境：**

在小程序启动前，微信会先启动双线程环境，并在线程中完成小程序基础库的初始化和预执行。

> 小程序基础库包括 WebView 基础库和 AppService 基础库，前者注入到视图层中，后者注入到逻辑层中，分别为所在层级提供其运行所需的基础框架能力。

**2. 下载小程序代码包：**

在小程序初次启动时，需要下载编译后的代码包到本地。如果启动了小程序分包，则只有主包的内容会被下载。另外，代码包会保留在缓存中，后续启动会优先读取缓存。

**3. 加载小程序代码包：**

小程序代码包下载好之后，会被加载到适当的线程中执行，基础库会完成所有页面的注册。

> 在此阶段，主包内的所有页面 JS 文件及其依赖文件都会被自动执行。
>
> 在页面注册过程中，基础库会调用页面 JS 文件的 Page 构造器方法，来记录页面的基础信息（包括初始数据、方法等）

**4. 初始化小程序首页**

在小程序代码包加载完之后，基础库会根据启动路径找到首页，根据首页的基础信息初始化一个页面实例，并把信息传递给视图层，视图层会结合 WXML 结构、WXSS 样式和初始数据来渲染界面。

综合考虑，为了节省小程序的“点点点”时间（小程序的启动动画是三个圆点循环跑马灯），除了给每位用户发一台高配 5G 手机并顺带提供千兆宽带网络之外，还可以尽量 **控制代码包大小**，缩小代码包的下载时间。



### 3. 小程序和H5的区别

- 运行环境：

  简单来说，小程序是一种应用，运行的环境是微信（App）；H5 是一种技术，依附的外壳是是浏览器。

  H5 的运行环境是浏览器，包括 WebView，而微信小程序的运行环境并非完整的浏览器，因为小程序的开发过程中只用到一部分H5 技术。

  小程序的运行环境是微信开发团队基于浏览器内核完全重构的一个内置解析器，针对性做了优化，配合自己定义的开发语言标准，提升了小程序的性能。

  小程序中无法使用浏览器中常用的 window 对象和 document 对象，H5 可以随意使用。

- 开发成本

  H5 的开发，涉及开发工具（vscode、Atom等）、前端框架（Angular、react等）、模块管理工具（Webpack 、Browserify 等）、任务管理工具（Grunt、Gulp等），还有 UI 库选择、接口调用工具（ajax、Fetch Api等）、浏览器兼容性等等。

  尽管这些工具可定制化非常高，大部分开发者也有自己的配置模板，但对于项目中各种外部库的版本迭代、版本升级，这些成本加在一起那就是个不小数目了。

  而开发一个微信小程序，由于微信团队提供了开发者工具，并且规范了开发标准，则简单得多。前端常见的 HTML、CSS 变成了微信自定义的 WXML、WXSS，官方文档中都有明确的使用介绍，开发者按照说明专注写程序就可以了。

  需要调用后端接口时，调用发起请求API；需要上传下载时，调用上传下载API；需要数据缓存时，调用本地存储API；引入地图、使用罗盘、调用支付、调用扫码等等功能都可以直接使用；UI 库方面，框架带有自家 weui 库加成。

  并且在使用这些 API 时，不用考虑浏览器兼容性，不用担心出现 BUG，显而易见微信小程序的开发成本相对低很多

- 系统权限

  微信小程序相对于 H5 能获得更多的系统权限，比如：网络通信状态、数据缓存能力等，这些系统级权限都可以和微信小程序无缝衔接。

  而这一点恰巧是 H5 被诟病的地方，这也是 H5 的大多应用场景被定位在业务逻辑简单、功能单一的原因。

- 运行流畅度

  这条无论对于用户还是开发者来说，都是最直观的感受。长久以来，当HTML5应用面对复杂的业务逻辑或者丰富的页面交互时，它的体验总是不尽人意，需要不断的对项目优化来提升用户体验。但是由于微信小程序运行环境独立，尽管同样用 HTML +CSS + JS 去开发，但配合微信的解析器最终渲染出来的是原生组件的效果，自然体验上将会更进一步。

  最容易区分小程序与H5的一点， 打开H5，实际上是打开一个网页，而网页需要在浏览器中渲染，面对复杂的业务逻辑或者丰富的页面交互时页面会卡顿。

  而微信小程序，直接在微信上运行，省去了通过浏览器渲染的步骤，因此，在微信中使用小程序，才会比H5流畅很多。除了首次打开需要几秒的加载时间外，小程序各个页面的切换、跳转等体验已经媲美原生App，非常顺畅。

  小程序不能跳转外部链接，H5没有限制。

  概括来说、小程序相对H5有着开发成本低、功能更丰富、用户体验更佳的优点。

### 4.小程序的限制

- 用户分享

  只能分享到群聊和好友 不支持分享朋友圈。

- web-view

  网页web-view 基础库 1.6.4 开始支持，网页与小程序之间不支持除JSSDK提供的接口之外的通信。
   微信后台配置业务域名。

  1. 每个小程序帐号仅支持配置最多20个域名；

  2. 每个域名仅支持绑定最多20个小程序；

  3. 每个小程序一年内最多支持修改域名50次；

  4. 公众平台后台域名配置成功后，才可使用web-view组件。

  5. 业务域名必须是HTTPS加密的

- tab 标签数量不得少于2个，最多不得超过5个，为确保点击区域，建议标签数量不超过4项

- 页面路径最多10层

- 下拉刷新 样式无法自定义

- 支付仅支持微信支付

- 小程序代码包限制为 2MB

## javascript

### 1.什么是闭包，为什么要用它

```
闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

闭包有两个常用的用途。

闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，我们可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。

闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。

其实闭包的本质就是作用域链的一个特殊的应用，只要了解了作用域链的创建过程，就能够理解闭包的实现原理。
```

### 2.Javascript 的作用域链？

```
  作用域链的作用是保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，我们可以访问到外层环境的变量和函数。
  作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。

 当我们查找一个变量时，如果当前执行环境中没有找到，我们可以沿着作用域链向后查找。

 作用域链的创建过程跟执行上下文的建立有关....
```

### 3..call() 和 .apply() 的区别？

```
 它们的作用一模一样，区别仅在于传入参数的形式的不同。

 apply 接受两个参数，第一个参数指定了函数体内 this 对象的指向，第二个参数为一个带下标的集合，这个集合可以为数组，也可以为类数组，apply 方法把这个集合中的元素作为参数传递给被调用的函数。

 call 传入的参数数量不固定，跟 apply 相同的是，第一个参数也是代表函数体内的 this 指向，从第二个参数开始往后，每个参数被依次传入函数。
```

### 4.原型和原型链

```
在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 prototype 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。

当我们使用构造函数新建一个对象后，在这个对象的内部将包含一个指针，这个指针指向构造函数的 prototype 属性对应的值，在 ES5 中这个指针被称为对象的原型。

一般来说我们是不应该能够获取到这个值的，但是现在浏览器中都实现了 __proto__ 属性来让我们访问这个属性，但是我们最好不要使用这个属性，因为它不是规范中规定的。ES5 中新增了一个 Object.getPrototypeOf() 方法，我们可以通过这个方法来获取对象的原型。

当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 Object.prototype 所以这就是我们新建的对象为什么能够使用 toString() 等方法的原因。

 特点：
JavaScript 对象是通过引用来传递的，我们创建的每个新对象实体中并没有一份属于自己的原型副本。当我们修改原型时，与之相关的对象也会继承这一改变。

获取原型的方法：
	1）p.__proto__

  2）p.constructor.prototype

  3）Object.getPrototypeOf(p)
```

### 5.typeof返回几种类型

**javascript的typeof返回的数据类型有：**

- undefined
- string
- boolean
- number
- Object
- Function
- Symbol

```
1.undefined
var x;
console.log(typeof(x));    // undefined
console.log("typeof (undefined) : "+typeof (undefined)); //undefined

2.string
var str = 'abc'
console.log(typeof(str)); // string

3.boolean
var flag = true;
console.log(typeof(flag));  // boolean

4.nuber
var num = 10;
console.log(typeof(num));   // number

5.function
var func = function(){}
console.log(typeof(func));  //function

6.object
var arr = [1,'a',true];
console.log(typeof(arr));  //object
var obj = { a: 10, b: 20 };
console.log(typeof (obj));  //object
var y = null;
console.log(typeof (y)); //Object

7.symbol
var s = Symbol();
console.log(typeof (s));//symbol
```

**注意：**

1. symbol是ES6中新增的数据类型

2. typeof(null)结果是Object

3. typeof(Object)和typeof(Array)的结果是function，因为Object和Array本身就是内置函数。

到这里是不是发现了什么问题？数组、对象和 <font color=red size=3 face="黑体">null</font> 使用 <font color=red size=3 face="黑体">typeof</font> 的方法都是 <font color=red size=3 face="黑体">object</font> 类型，我们可以自己来创建一种数据检测方式，如下：

```
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
```

**引用类型判断：**

> 判断一个变量是不是对象，基本类型的判断用typeof，引用类型的判断用instanceof

- 数组

```
[1,2] instanceof Object //输出：true
```

- 对象

```
var obj = {a:1,b:2} 
obj instanceof Object //输出：true
```

- 函数

```
var fun = function(){} ;
fun instanceof Object //输出：true
```

- null

```
null instanceof Object //输出：false
//通过instanceof可知，null不是引用类型
```

### 6.Symbol类型

在ES6中新增了一中类型，这个类型叫做Symbol，最大的特点号称独一无二，下面我们来说一下这东西怎么用，最后再说一下他用在哪。

首先要注意的一点是，Symbol函数前**不能使用new命令**，否则会报错。这是因为生成的Symbol是一个原始类型的值，而不是个对象。

Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```
// 没有参数的情况
var s1 = Symbol();
var s2 = Symbol();
s1 === s2 // false
// 有参数的情况
var s1 = Symbol("foo");
var s2 = Symbol("foo");
s1 === s2 // false
```

作为一个独一无二的类型，他也有自己的脾气，那就是不能和任何类型进行运算，否则就会报错。但是他也有大众化的一点，那就是他可以作为属性名

```
var mySymbol = Symbol();
// 第一种写法
var a = {};
a[mySymbol] = 'Hello!';
// 第二种写法
var a = { [mySymbol]: 'Hello!'};
// 第三种写法
var a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });
// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

如果你想问我用a.mySymbol来赋值可不可以，如果你用了，那么你就应该去补补基础了，因为点运算符后面的值必须是**字符串**，用点运算符访问会报错

**用途：**

- 避免名称冲突

  当使用 Symbol 作为变量时，我们不必建立可用标识符的全局注册表，也不必费心思想标识符名字，只需要创建一个 Symbol 就行了。一些外部库的做法也是这样。

- 使用Symbol来代替常量

  例如：

  ```
  const TYPE_AUDIO = 'AUDIO'
  const TYPE_VIDEO = 'VIDEO'
  const TYPE_IMAGE = 'IMAGE'
  
  function handleFileResource(resource) {
    switch(resource.type) {
      case TYPE_AUDIO:
        playAudio(resource)
        break
      case TYPE_VIDEO:
        playVideo(resource)
        break
      case TYPE_IMAGE:
        previewImage(resource)
        break
      default:
        throw new Error('Unknown type of resource')
    }
  }
  ```

  如上面的代码中那样，我们经常定义一组常量来代表一种业务逻辑下的几个不同类型，我们通常希望这几个常量之间是唯一的关系，为了保证这一点，我们需要为常量赋一个唯一的值（比如这里的'AUDIO'、'VIDEO'、 'IMAGE'），常量少的时候还算好，但是常量一多，你可能还得花点脑子好好为他们取个好点的名字。

  现在有了 <font color=red size=3 face="黑体">Symbol</font>，我们大可不必这么麻烦了：

  ```
  const TYPE_AUDIO = Symbol()
  const TYPE_VIDEO = Symbol()
  const TYPE_IMAGE = Symbol()
  ```

- 使用Symbol定义类的私有属性/方法

  我们知道在JavaScript中，是没有如Java等面向对象语言的访问控制关键字 <font color=red size=3 face="黑体">private</font> 的，类上所有定义的属性或方法都是可公开访问的。因此这对我们进行API的设计时造成了一些困扰。

  而有了 <font color=red size=3 face="黑体">Symbol</font> 以及 <font color=red size=3 face="黑体">模块化机制</font> ，类的私有属性和方法才变成可能。例如：

  - a.js中

  ```
  const PASSWORD = Symbol()
  
  class Login {
    constructor(username, password) {
      this.username = username
      this[PASSWORD] = password
    }
  
    checkPassword(pwd) {
        return this[PASSWORD] === pwd
    }
  }
  
  export default Login
  ```

  - b.js中

  ```
  import Login from './a'
  
  const login = new Login('admin', '123456')
  
  login.checkPassword('123456')  // true
  
  login.PASSWORD  // oh!no!
  login[PASSWORD] // oh!no!
  login["PASSWORD"] // oh!no!
  ```

  由于Symbol常量 <font color=red size=2 face="黑体">PASSWORD</font>被定义在a.js所在的模块中，外面的模块获取不到这个<font color=red size=3 face="黑体">Symbol</font>，也不可能再创建一个一模一样的 <font color=red size=3 face="黑体">Symbol</font>出来（因为<font color=red size=3 face="黑体">Symbol</font>是唯一的），因此这个<font color=red size=2 face="黑体">PASSWORD</font>的<font color=red size=3 face="黑体">Symbol</font>只能被限制在a.js内部使用，所以使用它来定义的类属性是没有办法被模块外访问到的，达到了一个私有化的效果。

### 7.数组的操作方法

**1、join()**

> join(separator): 将数组的元素组起一个字符串，以separator为分隔符，省略的话则用默认用逗号为分隔符，该方法只接收一个参数：即分隔符。

```
var arr = [1,2,3];
console.log(arr.join()); // 1,2,3
console.log(arr.join("-")); // 1-2-3
console.log(arr); // [1, 2, 3]（原数组不变）
```

**2、push()和pop()**

>push(): 可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。 
>pop()：数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。

```
var arr = ["Lily","lucy","Tom"];
var count = arr.push("Jack","Sean");
console.log(count); // 5
console.log(arr); // ["Lily", "lucy", "Tom", "Jack", "Sean"]
var item = arr.pop();
console.log(item); // Sean
console.log(arr); // ["Lily", "lucy", "Tom", "Jack"]
```

**3、shift() 和 unshift()**

>shift()：删除原数组第一项，并返回删除元素的值；如果数组为空则返回undefined 。 
>unshift:将参数添加到原数组开头，并返回数组的长度 。
>
>这组方法和上面的push()和pop()方法正好对应，一个是操作数组的开头，一个是操作数组的结尾。

```
var arr = ["Lily","lucy","Tom"];
var count = arr.unshift("Jack","Sean");
console.log(count); // 5
console.log(arr); //["Jack", "Sean", "Lily", "lucy", "Tom"]
var item = arr.shift();
console.log(item); // Jack
console.log(arr); // ["Sean", "Lily", "lucy", "Tom"]
```

**4、sort()**

>sort()：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。
>
>在排序时，sort()方法会调用每个数组项的 toString()转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， sort()方法比较的也是字符串，因此会出现以下的这种情况：

```
var arr1 = ["a", "d", "c", "b"];
console.log(arr1.sort()); // ["a", "b", "c", "d"]
arr2 = [13, 24, 51, 3];
console.log(arr2.sort()); // [13, 24, 3, 51]
console.log(arr2); // [13, 24, 3, 51](元数组被改变)
```

> 为了解决上述问题，sort()方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。以下就是一个简单的比较函数

```
function compare(value1, value2) {
if (value1 < value2) {
return -1;
} else if (value1 > value2) {
return 1;
} else {
return 0;
}
}
arr2 = [13, 24, 51, 3];
console.log(arr2.sort(compare)); // [3, 13, 24, 51]
```

> 也相当于这样

```
function compare(a,b){
   return a-b;
}
```

**5、reverse()**

> reverse()：反转数组项的顺序。

```
var arr = [13, 24, 51, 3];
console.log(arr.reverse()); //[3, 51, 24, 13]
console.log(arr); //[3, 51, 24, 13](原数组改变)
```

**6、concat()**

> concat() ：将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。在没有给 concat()方法传递参数的情况下，它只是复制当前数组并返回副本

```
var arr = [1,3,5,7];
console.log(arr.concat(9,[11,13])); //[1, 3, 5, 7, 9, 11, 13]
console.log(arr2.concat('9',999,{name:'fd'},[123,456])); 
 // [1,3,5,7,'9',999,{name:'fd'},[123,456]]
 
console.log(arr); // [1, 3, 5, 7](原数组未被修改)
```

> 从上面测试结果可以发现：传入的不是数组，则直接把参数添加到数组后面，如果传入的是数组，则将数组中的各个项添加到数组中。但是如果传入的是一个二维数组呢？

```
var arrCopy2 = arr.concat([9,[11,13]]);
console.log(arrCopy2); //[1, 3, 5, 7, 9, Array[2]]
console.log(arrCopy2[5]); //[11, 13]
```

> 上述代码中，arrCopy2数组的第五项是一个包含两项的数组，也就是说concat方法只能将传入数组中的每一项添加到数组中，如果传入数组中有些项是数组，那么也会把这一数组项当作一项添加到arrCopy2中。

**7、slice()**

> slice()：返回从原数组中指定开始位置到结束位置之间的项组成的新数组。slice()方法可以接受一或两个参数，即要返回项的起始和结束位置。在只有一个参数的情况下， slice()方法返回从该参数指定位置开始到当前数组末尾的所有项。如果有两个参数，该方法返回起始和结束位置之间的项——但不包括结束位置的项。

```
var arr = [1,3,5,7,9,11];
var arrCopy = arr.slice(1);
var arrCopy2 = arr.slice(1,4);
var arrCopy3 = arr.slice(1,-2);
var arrCopy4 = arr.slice(-4,-1);
console.log(arr); //[1, 3, 5, 7, 9, 11](原数组没变)
console.log(arrCopy); //[3, 5, 7, 9, 11]
console.log(arrCopy2); //[3, 5, 7]
console.log(arrCopy3); //[3, 5, 7]
console.log(arrCopy4); //[5, 7, 9]
```

>arrCopy只设置了一个参数，也就是起始位置下标为1，所以返回的数组为下标1（包括位置1）开始到数组最后。 
>arrCopy2设置了两个参数，返回起始下标（包括1）开始到终止下标（不包括4）的子数组。 
>arrCopy3设置了两个参数，终止下标为负数，当出现负数时，将负数加上数组长度的值（6）来替换该位置的数，因此就是从1开始到4（不包括）的子数组。 
>arrCopy4中两个参数都是负数，所以都加上数组长度6转换成正数，因此相当于slice(2,5)。

```

//正参数
arr.slice(1,4) 
  // 从数组位置1(包括1)开始 至 4(不包括4)结束  数学表达式： [1,4)
 
//负参数
arr.slice(-4,-1) 
 
  // 从数组位置-1(不包括1)开始 至 -4(包括4)结束  数学表达式： (1,4]
 
 
//截取数组后面3位
arr.slice(-3) //  [7,9,11]
```

**8、splice()**

>splice()：很强大的数组方法，它有很多种用法，可以实现删除、插入和替换。

删除：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2)会删除数组中的前两项。

插入：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。例如，splice(2,0,4,6)会从当前数组的位置 2 开始插入4和6。
替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,4,6)会删除当前数组位置 2 的项，然后再从位置 2 开始插入4和6。

splice()方法始终都会返回一个数组，该数组中包含从原始数组中删除的项，如果没有删除任何项，则返回一个空数组。

```
var arr = [1,3,5,7,9,11];
var arrRemoved = arr.splice(0,2);
console.log(arr); //[5, 7, 9, 11]
console.log(arrRemoved); //[1, 3]
var arrRemoved2 = arr.splice(2,0,4,6);
console.log(arr); // [5, 7, 4, 6, 9, 11]
console.log(arrRemoved2); // []
var arrRemoved3 = arr.splice(1,1,2,4);
console.log(arr); // [5, 2, 4, 4, 6, 9, 11]
console.log(arrRemoved3); //[7]
```

**9、indexOf()和 lastIndexOf()**

>indexOf()：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的开头（位置 0）开始向后查找。 
>lastIndexOf：接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。其中， 从数组的末尾开始向前查找。
>
>这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回1。在比较第一个参数与数组中的每一项时，会使用全等操作符

```
var arr = [1,3,5,7,7,5,3,1];
console.log(arr.indexOf(5)); //2
console.log(arr.lastIndexOf(5)); //5
console.log(arr.indexOf(5,2)); //2
console.log(arr.lastIndexOf(5,4)); //2
console.log(arr.indexOf("5")); //-1
```

### 8.判断一个变量是对象还是数组

**1.通过instanceof**

> 这个操作符和JavaScript中面向对象有点关系，了解这个就先得了解JavaScript中的面向对象。因为这个操作符是检测对象的原型链是否指向构造函数的prototype对象的。

```
var arr = [1,2,3,1];
alert(arr instanceof Array); // true
```

**2.对象的constructor属性**

```
var arr = [1,2,3,1];
alert(arr.constructor === Array); // true
```

**3.Array.isArray() (ES6方法)**

```
var a=[];
var b={};
Array.isArray(a);//true
Array.isArray(b)//false
```

**4.Object.prototype.toString**

调用toString( )方法试着将该变量转化为代表其类型的string。

> Object.prototype.toString的行为：首先，取得对象的一个内部属性[[Class]]，然后依据这个属性，返回一个类似于"[object Array]"的字符串作为结果(看过ECMA标准的应该都知道，[[]]用来表示语言内部用到的、外部不可直接访问的属性，称为“内部属性”)。利用这 个方法，再配合call，我们可以取得任何对象的内部属性[[Class]]，然后把类型检测转化为字符串比较，以达到我们的目的。
>
> call改变toString的this引用为待检测的对象，返回此对象的字符串表示，然后对比此字符串是否是'[object Array]'，以判断其是否是Array的实例。为什么不直接o.toString()?嗯，虽然Array继承自Object，也会有 toString方法，但是这个方法有可能会被改写而达不到我们的要求，而Object.prototype则是老虎的屁股，很少有人敢去碰它的，所以能一定程度保证其“纯洁性”：) 
>
> JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个： Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String. 
> 这种方法在识别内置对象时往往十分有用，但对于自定义对象请不要使用这种方法。

```
var a=[];
var b={};
Object.prototype.toString.call(a)  === '[object Array]'//true
Object.prototype.toString.call(b)  === '[object Array]'//false
```

**注意：**

第1种和第2方法在跨域时会失效，当你在多个frame中来回穿梭的时候，由于每个iframe都有一套自己的执行环境，跨frame实例化的对象彼此是不共享原型链的，因此导致上述检测代码失效。

### 9.javaScript中的new() 做了哪些事

要创建 Person 的新实例，必须使用 new 操作符。以这种方式调用构造函数实际上会经历以下 4
个步骤：

- 创建一个新对象；
-  将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象） ；
- 执行构造函数中的代码（为这个新对象添加属性） ；
-  返回新对象。

在有上面的基础概念的介绍之后，在加上new操作符，我们就能完成传统面向对象的class + new的方式创建对象，在 **JavaScript** 中，我们将这类方式成为**Pseudoclassical**。
基于上面的例子，我们执行如下代码：

```
var obj = new Base();
//上面等同于下面三行代码
var obj = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
```

>第一行，我们创建了一个空对象obj
第二行，我们将这个空对象的__proto__成员指向了Base函数对象prototype成员对象
第三行，我们将Base函数对象的this指针替换成obj，然后再调用Base函数，于是我们就给obj对象赋值了一个id成员变量，这个成员变量的值是”base”，关于call函数的用法。

如果我们给Base.prototype的对象添加一些函数会有什么效果呢？
例如代码如下：

```
Base.prototype.toString = function() {
	return this.id;
}
```

那么当我们使用new创建一个新对象的时候，根据__proto__的特性，toString这个方法也可以做新对象的方法被访问到。于是我们看到了：
**构造子中，我们来设置‘类’的成员变量（例如：例子中的id），构造子对象prototype中我们来设置‘类’的公共方法。于是通过函数对象和Javascript特有的__proto__与prototype成员及new操作符，模拟出类和类实例化的效果。**

### 10.Map&Set

es6中增加了Map和Set两种新的数据结构

- Map

  JavaScript的默认对象表示方式**{}**可以视为其他语言中的**Map**或**Dictionary**的数据结构，即一组键值对。

  但是**JavaScript**的对象有个小问题，就是键必须是字符串。但实际上**Number**或者其他数据类型作为键也是非常合理的。

  Map是类似Object的一种键值对集合，区别在于Map的键不仅限于是字符串，其他各种类型的值包括对象都可以成为Map的键

  举个例子，假设要根据同学的名字查找对应的成绩，如果用<font color=red size=3>Array</font>实现，需要两个<font color=red size=3>Array</font>：

  ```
  var names = ['Michael', 'Bob', 'Tracy'];
  var scores = [95, 75, 85];
  ```

  给定一个名字，要查找对应的成绩，就先要在names中找到对应的位置，再从scores取出对应的成绩，Array越长，耗时越长。

  如果用Map实现，只需要一个“名字”-“成绩”的对照表，直接根据名字查找成绩，无论这个表有多大，查找速度都不会变慢。用JavaScript写一个Map如下：

  ```
  var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
  m.get('Michael'); // 95
  ```

  初始化`Map`需要一个二维数组，或者直接初始化一个空`Map`。`Map`具有以下方法

  ```
  var m = new Map(); // 空Map
  m.set('Adam', 67); // 添加新的key-value
  m.set('Bob', 59);
  m.has('Adam'); // 是否存在key 'Adam': true
  m.get('Adam'); // 67
  m.delete('Adam'); // 删除key 'Adam'
  m.get('Adam'); // undefined
  ```

  由于一个key只能对应一个value，所以，多次对一个key放入value，后面的值会把前面的值冲掉：

  ```
  var m = new Map();
  m.set('Adam', 67);
  m.set('Adam', 88);
  m.get('Adam'); // 88
  ```

- Set

  <font color=red size=3>Set</font>和<font color=red size=3>Map</font>类似，也是一组key的集合，但不存储<font color=red size=3>value</font>。由于<font color=red size=3>key</font>不能重复，所以，在<font color=red size=3>Set</font>中，没有重复的key。

  要创建一个<font color=red size=3>Set</font>，需要提供一个<font color=red size=3>Array</font>作为输入，或者直接创建一个空<font color=red size=3>Set</font>：

  ```
  var s1 = new Set(); // 空Set
  var s2 = new Set([1, 2, 3]); // 含1, 2, 3
  ```

  重复元素在<font color=red size=3>Set</font>中自动被过滤：

  ```
  var s = new Set([1, 2, 3, 3, '3']);
  s; // Set {1, 2, 3, "3"}
  ```

  通过<font color=red size=3>add(key)</font>方法可以添加元素到<font color=red size=3>Set</font>中，可以重复添加，但不会有效果

  ```
  s.add(4);
  s; // Set {1, 2, 3, 4}
  s.add(4);
  s; // 仍然是 Set {1, 2, 3, 4}
  ```

  通过<font color=red size=3>delete(key)</font>方法可以删除元素

  ```
  var s = new Set([1, 2, 3]);
  s; // Set {1, 2, 3}
  s.delete(3);
  s; // Set {1, 2}
  ```

## VUE

### 1. vue 双向数据绑定原理

```
vue 通过使用双向数据绑定，来实现了 View 和 Model 的同步更新。vue 的双向数据绑定主要是通过使用数据劫持和发布订阅者模式来实现的。

首先我们通过 Object.defineProperty() 方法来对 Model 数据各个属性添加访问器属性，以此来实现数据的劫持，因此当 Model 中的数据发生变化的时候，我们可以通过配置的 setter 和 getter 方法来实现对 View 层数据更新的通知。

数据在 html 模板中一共有两种绑定情况，一种是使用 v-model 来对 value 值进行绑定，一种是作为文本绑定，在对模板引擎进行解析的过程中。

如果遇到元素节点，并且属性值包含 v-model 的话，我们就从 Model 中去获取 v-model 所对应的属性的值，并赋值给元素的 value 值。然后给这个元素设置一个监听事件，当 View 中元素的数据发生变化的时候触发该事件，通知 Model 中的对应的属性的值进行更新。

如果遇到了绑定的文本节点，我们使用 Model 中对应的属性的值来替换这个文本。对于文本节点的更新，我们使用了发布订阅者模式，属性作为一个主题，我们为这个节点设置一个订阅者对象，将这个订阅者对象加入这个属性主题的订阅者列表中。当 Model 层数据发生改变的时候，Model 作为发布者向主题发出通知，主题收到通知再向它的所有订阅者推送，订阅者收到通知后更改自己的数据。
```

### 2. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？

```
有一些对属性的操作，使用这种方法无法拦截，比如说通过下标方式修改数组数据或者给对象新增属性，vue 内部通过重写函数解决了这个问题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为这是 ES6 的语法。
```

### 3. Vue 组件间的参数传递方式？

```
（1）父子组件间通信
第一种方法是子组件通过 props 属性来接受父组件的数据，然后父组件在子组件上注册监听事件，子组件通过 emit 触发事件来向父组件发送数据。

第二种是通过 ref 属性给子组件设置一个名字。父组件通过 $refs 组件名来获得子组件，子组件通过 $parent 获得父组件，这样也可以实现通信。

第三种是使用 provider/inject，在父组件中通过 provider 提供变量，在子组件中通过 inject 来将变量注入到组件
中。不论子组件有多深，只要调用了 inject 那么就可以注入 provider 中的数据。

（2）兄弟组件间通信
第一种是使用 eventBus 的方法，它的本质是通过创建一个空的 Vue 实例来作为消息传递的对象，通信的组件引入这个实
例，通信的组件通过在这个实例上监听和触发事件，来实现消息的传递。

第二种是通过 $parent.$refs 来获取到兄弟组件，也可以进行通信。

（3）任意组件之间
使用 eventBus ，其实就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件。

如果业务逻辑复杂，很多组件之间需要同时处理一些公共的数据，这个时候采用上面这一些方法可能不利于项目的维护。这个时候可以使用 vuex ，vuex 的思想就是将这一些公共的数据抽离出来，将它作为一个全局的变量来管理，然后其他组件就可以对这个公共数据进行读写操作，这样达到了解耦的目的。
```

### 4. computed 和 watch 的差异？

```
（1）computed 是计算一个新的属性，并将该属性挂载到 Vue 实例上，而 watch 是监听已经存在且已挂载到 Vue 实例上的数据，所以用 watch 同样可以监听 computed 计算属性的变化。

（2）computed 本质是一个惰性求值的观察者，具有缓存性，只有当依赖变化后，第一次访问 computed 属性，才会计算新的值。而 watch 则是当数据发生变化便会调用执行函数。

（3）从使用场景上说，computed 适用一个数据被多个数据影响，而 watch 适用一个数据影响多个数据。
```

### 5. vue-router 中的导航钩子函数

```
（1）全局的钩子函数 beforeEach 和 afterEach

beforeEach 有三个参数，to 代表要进入的路由对象，from 代表离开的路由对象。next 是一个必须要执行的函数，如果不传参数，那就执行下一个钩子函数，如果传入 false，则终止跳转，如果传入一个路径，则导航到对应的路由，如果传入 error ，则导航终止，error 传入错误的监听函数。

（2）单个路由独享的钩子函数 beforeEnter，它是在路由配置上直接进行定义的。

（3）组件内的导航钩子主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。它们是直接在路由组
件内部直接进行定义的。
```

### 6. Vue中哪些变化监测不到

- 由于js的限制，vue不能监听以下变动的数组对象

  1. 利用索引直接设置对象中的某一项，例如vm.items[indexOfItem] = newValue

  2. 当你修改数组的长度时，例如vm.items.length = newLength

  解决方法：

  对象用$set（设置对象的属性，值）

  例如：Vue.set(example1.items, indexOfItem, newValue)

  数组用splice()方法（向数组中添加删除项目，并且返回新的数组，会改变原始数组）

  例如：example1.items.splice(newLength)

- 还是由于js的限制，vue不能检测对象属性的添加或删除，一方面可以用vm.$set()方法，另外还可以用Object.assign()浅拷贝一个对象

  例如：this.user = Object.assign({}, this.userPlice, {age：27， name: 'zhangsan'})

## React

### 1.react生命周期

组件在进入和离开DOM时要经历一系列生命周期方法，下面是这些生命周期方法。

1. **componentWillMount()**

在渲染前调用,在客户端也在服务端，它只发生一次。

2. **componentDidMount()**

在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过<font color=red size=3 face="黑体">this.getDOMNode()</font>来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用<font color=red size=3 face="黑体">setTimeout</font>， <font color=red size=3 face="黑体">setInterval</font>或者发送AJAX请求等操作(防止异部操作阻塞UI)。

3. **componentWillReceiveProps()**

在组件接收到一个新的 <font color=red size=3 face="黑体">prop</font> (更新后)时被调用。这个方法在初始化render时不会被调用。

4. **shouldComponentUpdate()**

返回一个布尔值。在组件接收到新的 <font color=red size=3 face="黑体">props</font> 或者<font color=red size=3 face="黑体">state</font>时被调用。在初始化时或者使用<font color=red size=3 face="黑体">forceUpdate</font>时不被调用。 可以在你确认不需要更新组件时使用。

5. **componentWillUpdate()**

在组件接收到新的<font color=red size=3 face="黑体">props</font>或者<font color=red size=3 face="黑体">state</font>但还没有render时被调用。在初始化时不会被调用。

6. **componentDidUpdate()**

在组件完成更新后立即调用。在初始化时不会被调用。

7. **componentWillUnMount()**

组件从 DOM 中移除的时候立刻被调用。

8.  **getDerivedStateFromError()**

这个生命周期方法在<font color=red size=3 face="黑体">ErrorBoundary</font>类中使用。实际上，如果使用这个生命周期方法，任何类都会变成<font color=red size=3 face="黑体">ErrorBoundary</font>。这用于在组件树中出现错误时呈现回退UI，而不是在屏幕上显示一些奇怪的错误。

9. **componentDidCatch()**

这个生命周期方法在<font color=red size=3 face="黑体">ErrorBoundary</font>类中使用。实际上，如果使用这个生命周期方法，任何类都会变成<font color=red size=3 face="黑体">ErrorBoundary</font>。这用于在组件树中出现错误时记录错误。

### 2. react-router-dom 组件

`BrowserRouter` 和 `HashRouter` 是路由器。

`Route` 用于路由匹配。

`Link` 组件用于在应用程序中创建链接。 它将在HTML中渲染为锚标记。

`NavLink`是突出显示当前活动链接的特殊链接。

`Switch` 不是必需的，但在组合路由时很有用。

`Redirect` 用于强制路由重定向

### 3. 什么是 Hooks

Hooks 是React版本16.8中的新功能。 请记住，我们不能在函数组件中使用`state` ，因为它们不是类组件。**Hooks 让我们在函数组件中可以使用state 和其他功能。**

目前没有重大变化，我们不必放弃类组件。

Hook 不会影响你对 React 概念的理解。 恰恰相反，Hook 为已知的 React 概念提供了更直接的 API：props， state，context，refs 以及生命周期。稍后我们将看到，Hook 还提供了一种更强大的方式来组合他们。

我们可以使用一些钩子，例如useState，useEffect，useContext，useReducer等。

下面是 Hooks 的基本规则：

- Hooks 应该在外层使用，不应该在循环，条件或嵌套函数中使用
- Hooks 应该只在函数组件中使用。

## 其它

### 1. WebSocket了解吗？

```
WebSocket 是 Html5 定义的一个新协
 议，与传统的 http 协议不同，该协议允许由服务器主动的向客户端推送信息。使用 WebSocket 协议的缺点是在服务器端的配置
 比较复杂。WebSocket 是一个全双工的协议，也就是通信双方是平等的，可以相互发送消息，而 SSE 的方式是单向通信的，只能
 由服务器端向客户端推送信息，如果客户端需要发送信息就是属于下一个 http 请求了。
```

### 2. 前端性能优化？

```
 前端性能优化主要是为了提高页面的加载速度，优化用户的访问体验。我认为可以从这些方面来进行优化。

 第一个方面是页面的内容方面

 （1）通过文件合并、css 雪碧图、使用 base64 等方式来减少 HTTP 请求数，避免过多的请求造成等待的情况。

 （2）通过 DNS 缓存等机制来减少 DNS 的查询次数。

 （3）通过设置缓存策略，对常用不变的资源进行缓存。

 （4）使用延迟加载的方式，来减少页面首屏加载时需要请求的资源。延迟加载的资源当用户需要访问时，再去请求加载。

 （5）通过用户行为，对某些资源使用预加载的方式，来提高用户需要访问资源时的响应速度。

 第二个方面是服务器方面

 （1）使用 CDN 服务，来提高用户对于资源请求时的响应速度。

 （2）服务器端启用 Gzip、Deflate 等方式对于传输的资源进行压缩，减小文件的体积。

 （3）尽可能减小 cookie 的大小，并且通过将静态资源分配到其他域名下，来避免对静态资源请求时携带不必要的 cookie

 第三个方面是 CSS 和 JavaScript 方面

 （1）把样式表放在页面的 head 标签中，减少页面的首次渲染的时间。

 （2）避免使用 @import 标签。

 （3）尽量把 js 脚本放在页面底部或者使用 defer 或 async 属性，避免脚本的加载和执行阻塞页面的渲染。

 （4）通过对 JavaScript 和 CSS 的文件进行压缩，来减小文件的体积。
```

### 3.在网址中输入一个网站后面都做了什么？

```
1.浏览器首先通过 HTTP 协议或者 HTTPS 协议，向服务器请求页面，当然这个其中也可能有缓存什么的；

2.把请求回来的HTML 代码经过解析，构建成 DOM 树；

3.计算 DOM 树上的 CSS 属性，生成 CSSOM 树(CSS Object Model)；

4.将 DOM 树和 CSSOM 树合并成一个渲染树(rendering tree)；

5.渲染树的每个元素包含的内容都是计算过的，它被称之为布局 layout。浏览器使用一种流式处理的方法，只需要一次 pass 绘制操作就可以布局所有的元素；

6.将渲染树的各个节点绘制到屏幕上，这一步被称为绘制 painting；

7.按照合理的顺序合并图层然后显示到屏幕上 Composite（渲染层合并）
```