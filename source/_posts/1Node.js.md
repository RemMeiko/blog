---
title: 关于Node.js的简单学习
date: 2021-01-27 22:00:00
top: false
cover: false
password:
toc: true
mathjax: false
summary:
categories: Node.js
author: RemMeiko
tags: [Node.js,前端,广度]
img: http://acg.toubiec.cn/random.php
banner_img: https://remmeiko.gitee.io/img-bed/anime/wallhaven-72pe8v_1920x1080.png
---


**<font size=6>知识需要足够的广度和一定的深度</font>**

> 前言：因为搭建博客接触到node.js，所以对node.js进行简单的了解，扩充一下广度同时记录一些大佬的文章方便自己日后查询，记录如下：

## Node.js
### Node.js是什么 
官方文档：http://nodejs.cn/learn 
下面是官方文档首段的介绍　　　　　　　　　　　　　
![](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/9-官网介绍.png)

* Node.js是一个基于Chrome V8引擎的能够在服务器运行JavaScript的跨平台JavaScript运行环境(可以理解为服务端的的JavaScript的代码解析器)
* Node.js采用事件驱动，非阻塞I/O模型（对于这方面的理解，我只知道因为JS是单线程的，不像Java中有多线程）
* node中一部分就是V8引擎，用来解释JS代码，另一部分是封装了大量的工具库，可以用来实现各种文件操作、操作系统、程序等等，因此可以说node打通了JavaScript的前后端。
* node可以用来作为中间层调用分发数据接口，像淘宝服务器后台是Java，在服务器在下面还设置有Node.js搭建在服务器

>浏览器中存在着渲染引擎和JS引擎，JS引擎是用来解释JavaScript执行语言的

> Node.js为JavaScript提供了操作文件、创建Http服务，创建TCP/UDP服务等的接口，让JavaScript可以完成其他后台语言(Java,python等)的工作，譬如对文件操作，处理数据库等。为了安全浏览器中JavaScript是无法实现这些功能的

>我们经常说Node.js打通了JavaScript的前端和后端，其实原因就是在Node.js出现之前JS是一项完全的客户端技术，被用于浏览器中的各种动画加载，界面交互，对DOM操作等，而后端，即服务端完全是由JAVA等语言实现，在node.js出现后为其提供了上述所说的功能，使得前后端使用同一种语言成为了可能。

### node.js能用来做什么
* Web服务API，比如REST
* 实时多人游戏
* 后端Web服务，譬如跨域、服务端的请求
* 基于Web的应用
* 多客户端的通信，如即时通信
* 本地应用程序等等

### **npm介绍**

> 1.npm是随Node.js一起安装的包管理工具，看名字就知道是用来对包进行管理的  
> 2.npm允许用户从npm服务器下载和安装第三包进行使用，用户也可以自己编写包进行上传一起丰富这个庞大的生态系统
1. 是全球最大的开源库生态系统
> 对于包：在Node.js中一个js文件就可以成为一个模块，将多个模块放在一起完成特定功能就可以看作成一个包，使用npm包管理工具可以在工程中快捷的安装、引入自己需要的包,在安装过程中npm还会将目标包中所依赖的其他包一并下载
2. 类似Java语法中的maven，gradle，python中的pip

>命令使用
~~~JavaScript
// 查看npm的命令列表
npm help
// 查看npm的版本
npm -v
// 查看npm的配置（设置全局模块，镜像源，缓存，都可以进行查看是否成功）
npm config ls -l
~~~
> 初始化命令
> * 将当前目录作为工作空间  
> * 在当前目录下创建一个package.json文件，用来记录名字，版本，依赖等信息。 
> * 不加-y参数在创建package.json过程中会让你设置名字，版本，依赖等信息，加上后不会提问会直接默认创建
~~~JavaScript
npm init
npm init -y
~~~
下面是加上-y后默认创建的package.json中的内容
![默认内容](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/10-默认创建的packagejson文件.png)
> 安装第三方包（install）
> * 这是npm非常重要也是使用得非常多的功能  
> * 安装包时会将包下载至node_modules目录中(不存在会自动创建)  
> * 安装时候不加-g参数会默认安装在当前目录下
> * 安装的时候加-g参数则是全局安装，会安装至设置的node_global中

~~~JavaScript
// 安装本地包
npm install 包名
// 安装全局包 
npm install 包名 -g
// --save参数(加上此参数会将包信息写进package.json的dependencies中)
npm install 包名 --save
// --save-dev参数(加上此参数会将包信息添加到package.json的devDependencies中)
npm install 包名 --save-dev
~~~
> dependencies与devDependenices  
> * 都是指定项目依赖的包
> * dependencies——这些包是需要发布到生产环境中去的，devDependencies——这些包只用于开发环境，不用于生产环境  
>  【eg】:一个项目需要依赖于JQuery,没有这个包依赖运行就会报错，这时候需要将依赖写进dependenies。如果这个包只在开发测试过程中需要，上线后就不需要了，就写进devDependencies中

> 卸载包(uninstall)【和安装相反其他一样】
~~~JavaScript
// 卸载本地包
npm uninstall 包名
// 卸载全局包 
npm uninstall 包名 -g
// --save参数(加上此参数会将包信息写进package.json的dependencies中)
npm uninstall 包名 --save
// --save-dev参数(加上此参数会将包信息添加到package.json的devDependencies中)
npm uninstall 包名 --save-dev
~~~

npm学习网站：https://www.runoob.com/nodejs/nodejs-npm.html

## node.js安装和配置

> <font face="Helvetica">安装Node.js此处介绍两种安装方式，一是通过msi程序引导安装，另一种是通过下载压缩包自己配置环境变量进行安装</font>

> 新版的node.js自带npm，安装时会同时安装npm
### **引导程序安装**：
* 第一步：在[官网](https://nodejs.org/zh-cn/)下载node的msi程序安装文件。
![官网界面](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/1-官网界面.png)

* 第二步:双击进入安装过程,正常情况下下一步就行了
其中有两个过程需要注意  
    第一：安装模块的选择  
    ![](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/2-安装选择.png)  
    Node.js runtime是Node.js的核心模块  
    npm package manager是包管理工具  
    Online documentation shortcut是相关介绍文档  
    Add to PATH是将node和npm添加到环境变量
    **默认就行**
    第二： 
    ![](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/3-安装选择.png)
    勾选后会自动安装2个工具，Python 2和Visual Studio构建工具,这两个构建工具是因为一些npm模块需要使用C/C++编译，如果想要编译这些模块则需要安装，不安装的话后续碰到这些模块会出问题，建议直接勾选避免不必要的麻烦，虽然后续可以手动安装
  
> 关于这两个构建工具勾选后，Node.js安装完成后会跳出powershell窗口，光标一直会闪，不要关闭，会等一段时间才进行下载，如果安装失败就只能手动安装了。不过使用Node.js不是很多的话不安装也没什么大的影响。
* 第三步:如果安装时勾选了Add to PATH，环境就已经安装完毕了，打开cmd窗口输入"node -v"和"npm -v"命令进行检测，如下图所示就是已经安装成功了
![测试图片](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/4-测试安装.png)
  
### **压缩包安装**
> 通过下载压缩包进行安装（这是我最喜欢的方式）
* 第一步：还是在[官网](https://nodejs.org/zh-cn/download/)下载压缩包
![下载界面](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/5-压缩包下载.png)
* 下载解压后和第一种方式安装的内容是一样的
* 第二步：配置环境变量  
将解压的目录路径添加到用户变量的path中去
如图：
![环境变量](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/6-环境变量配置.png)
到这里基本工作已经做完，在cmd中输入"node -v"和"npm -v"此时应该是已经能够正常显示的

### **其他配置**
> 上述两种方式中无论选择哪种方式都是一样的，安装好后就进行接下来的操作

> 在后续使用npm命令(如npm install 模块名 -g)[-g 是代表全局安装的参数，具体可以看npm的相关介绍]会默认安装在【C:\Users\用户名\AppData\Roaming\npm】占用C盘空间,接下来是设置为自定义路径 

> 此处是以第二种方式进行说明
* 配置npm安装模块时全局模块以及缓存cache的路径
    + 在安装的node文件下新建node_cache和node_global两个文件夹  
    然后在cmd中输入以下两行命令  
    ~~~
    npm config set prefix "node_global路径"  
    npm config set cache "node_cache路径"
    ~~~
    ![命令输入](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/7-模块安装路径更改.png)
    
* 配置安装模块的镜像源  
    + 在cmd中使用命令 
    ~~~
    npm config set registry https://registry.npm.taobao.org --global
    ~~~
    + 进行验证,命令：npm config ls -l
    ![更换配置](https://remmeiko.gitee.io/img-bed/boke-img/%E7%AC%AC%E4%B8%80%E7%AF%87(Node.js%E7%AE%80%E5%8D%95%E5%AD%A6%E4%B9%A0)/8--更换淘宝镜像.png)

> 之所以更换镜像源是因为npm的默认镜像源是在国外，由于网络的原因会安装失败，因此更换为淘宝的镜像源(https://registry.npm.taobao.org/") 



## 附录

### JS介绍
> 此处只做简单介绍，毕竟此文章是作为知识广度的扩充

> 建议仔细阅读阮一峰的JavaScript诞生记
http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html   
> 知乎上关于JavaScript是什么
https://www.zhihu.com/question/19813265

JavaScript是什么呢？下面开始扯名词

* JavaScript是一种轻量级的解释型脚本语言
> 何为脚本语言  
> 1. 介于标记语言和编程语言之间的一种语言
> 2. 灵活，语法和结构规则没有编程语言那么严谨和复杂，学习和使用相对简单
> 3. 属于解释性语言(相对的是编译型语言)，由解释器进行解释  
> + 注：现在很多脚本语言已经不止停留于编写简单的用户命令序列的指令，可以编写更为复杂的程序， **脚本语言和编程语言没有明显的界限和规定**
* 是一门基于原型，函数先行的语言

> 基于原型的粗略理解就是JavaScript中是没有Class的，而是直接使用对象。

> 阮一峰JavaScript诞生记部分内容：  
> * Javascript中没有类(Class)的概念，因此也就没有"子类"和"父类"的概念，存在一种"原型链"模式来实现继承 **JS虽然没有类，但是存在继承**  
> * 历史诞生记：  
    1. JS是由网景公司(Netscape)的工程师Brendan Eich负责开发  
    2. 诞生的原因：在JS出现之前，浏览器只能用来进行浏览，无法与使用者进行互动，网景公司需要一种网页脚本实现浏览器与网页的互动
    3. 在此时1994年，面向对象编程最兴盛时期，Sun公司与网景结成联盟，允许Java程序以applet（小程序）的形式，直接在浏览器中运行。但是现在Java和JavaScript没有任何关系
    4. 设计之初要求该语言要简单，易于上手
> * 最终JS涵盖了两种语言风格：(简化)函数式编程和(简化)面向对象编程
> * JS构造对象，没有类的概念，所以构造对象时new后面直接跟构造函数，例如：  
    function DOG(name) {
        this.name = name;
    }
> * 对于其他的例如prototype和__proto__如果想要学习JS需要找其他资料
* 浏览器中的JavaScript不提供对内存或CPU的底层访问，IO操作等，进行这些操作或者更复杂的操作需要借助Node.js等运行环境

>吐糟：第一篇博客，还有许多地方需要改进，目前只能自己作为日后回顾时学习。(ps：前面的几篇都是搭建博客时测试用的草稿一样，不能算博客，本来想删的，思来想去还是留着吧，当个挂件)
----
## 参考
其他大佬的文章：
node.js学习：https://www.w3cschool.cn/nodejs/node-js-npm.html  
网址：https://juejin.cn/post/6844903906116370445      
Node.js:https://segmentfault.com/a/1190000006121183  
V8引擎：https://zhuanlan.zhihu.com/p/27628685  
V8引擎如何工作：https://blog.fundebug.com/2019/07/16/how-does-v8-work/  
npm命令：https://www.cnblogs.com/hongdada/p/9144668.html
Node.js安装:https://www.cnblogs.com/liangxfng/p/12675115.html  
https://zhuanlan.zhihu.com/p/77594251

