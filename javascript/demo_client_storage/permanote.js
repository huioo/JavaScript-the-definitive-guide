// 一些贯穿始终的变量
var editor, statusline, savebutton, idletimer;

// 首次载入应用
window.onload = function() {
    // 第一次载入时，初始化本地变量
    if (localStorage.note == null) localStorage.note = "";
    if (localStorage.lastModified == null) localStorage.lastModified = 0;
    if (localStorage.lastSaved == null) localStorage.lastSaved = 0;

    // 查找编辑器UI元素，并初始化全局变量
    editor = document.getElementById("editor");
    statusline = document.getElementById("statusline");
    savebutton = document.getElementById("savebutton");

    // 初始化编辑器，将保存的笔记数据填充为其内容
    editor.value = localStorage.note;
    // 同步前禁止编辑
    editor.disabled = true;
    // 一旦文本区有内容输入
    editor.addEventListener("input", 
                            function(e) {
                                // 将新的值保存到localStorage中
                                localStorage.note = editor.value;
                                localStorage.lastModified = Date.now();
                                // 重置闲置计时器
                                if (idletimer) clearTimeout(idletimer);
                                idletimer = setTimeout(save, 5000);
                                // 启动保存按钮
                                savebutton.disabled = false;
                            },
                            false
    )
    // 每次载入应用程序时，尝试同步服务器
    sync();
};

// 离开页面前，保存数据到服务器
window.onbeforeunload = function() {
    if (localStorage.lastModified > localStorage.lastSaved)
        save(); 
};

// 离线时，通知用户
window.onoffline = function() { status("Offline"); };

// 再次返回在线状态时，进行同步
window.ononline = function() { sync() };

// 当有新版本应用的时候，提醒用户
// 这里我们也可以采用location.reload()方法来强制重新载入应用
window.applicationCache.onupdateready = function() {
    status("A new version of this application is available. Reload to run it");
};

// 当没有新版本的时候也通知用户
window.applicationCache.onnoupdate = function() {
    status("You are running the lasted version of the appliation.");
}

// 用于在状态栏中显示状态消息的一个函数
function status(msg) {
    statusline.innerHTML = msg;
}

// 每当笔记内容更新后，如果用户停止编辑超过5分钟，
// 就会自动将笔记文本上传到服务器（在线状态下）
function save() {
    if (idletimer) clearTimeout(idletimer);
    idletimer = null;
    // if (navigator.onLine) {
    if (false) {
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/note");
        xhr.send(editor.value);
        xhr.onload = function(){
            localStorage.lastSaved = Date.now();
            savebutton.disabled = true;
        };
    }
}

// 检查服务端是否有新版本的笔记
// 如果没有，则将当前版本保存到服务器端
function sync() {
    // if (navigator.onLine) {
    if (false) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/note");
        xhr.send();
        xhr.onload = function() {
            var remoteModTime = 0;
            if (xhr.status == 200) {
                var remoteModTime = xhr.getResponseHeader("Last-Modified");
                remoteModTime = new Date(remoteModTime).getTime();
            }
            if (remoteModTime > localStorage.lastModified) {
                status("Newer note found on server.");
                var useit = confirm(
                    "There is a newer version of the note\n" +
                    "on the server. Click Ok to use that version\n" +
                    "or click Cancel to continue editing this\n" +
                    "version and overwrite the server.");
                var now = Date.now();
                if (useit) {
                    editor.value = localStorage.note = xhr.responseText;
                    localStorage.lastSaved = now;
                    status("Newest version downloaded.");
                }
                else {
                    status("Ignoring newer version of the note.");
                }
                localStorage.lastModified = now
            }
            else {
                status("You are editing the currentversion of the note.")
            }

            if (localStorage.lastModified > localStorage.lastSaved) {
                save();
            }
            editor.disabled = false;
            editor.focus();
        }

    }
    else {
        // 离线状态下，不能同步
        status("Can't sync while offline.");
        editor.disabled = false;
        editor.focus();
    }
}