/**
 * 服务端JavaScript
 * 
 * JavaScript嵌入：
 * - Rhino是基于Java的JavaScript解析器，实现了通过JavaScript程序访问整个Java API
 * - node是Google的V8 JavaScript解析器的一个特别版本，它在底层绑定了POSIX（UNIX）API，包括文件、进程、流和套接字等，
 *   并侧重于I/O、网络和HTTP。
 */


/**
 * 用Rhino脚本化Java
 * 
 * Rhino是一种用Java编写的JavaScript解释器，其设计目标是借助于强大的Java平台API轻松编写JavaScript程序。Rhino能自动
 * 完成JavaScript原生类型的Java原生类型之间的相互转换。因此，JavaScript脚本可以设置、查询Java属性，并调用Java方法。
 */


/**
 * 用node实现异步I/O
 * 
 * node是基于C++的高速JavaScript解释器，绑定用于进程、文件和网络套接字等底层Unix API，还绑定了HTTP客户端和服务器API。
 * 除了一些专门命名的同步方法外，Node的绑定都是异步的，且Node程序默认绝不阻塞，这意味着它们通常具有强大的可伸缩能力并能
 * 有效地处理高负荷。由于API是异步的，因此Node依赖事件处理程序，其通常使用嵌套函数和闭包来实现。
 */
