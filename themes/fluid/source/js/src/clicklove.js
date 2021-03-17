(function(){
      var a_idx = 0;
      var fso;

      jsReadFiles("e:\\1-暂定\\js调试.txt");
      window.onclick = function(event){
         var a = new Array(
        "帅有个屁用,还不是被卒吃掉",
        "人丑就要多读书",
        "读书犯困,因为那是梦想启航的地方",
        "迷茫时就学习",
        "只有努力过了才知道，智商上的差距是不可逾越的。",
        "世界上唯一一件公平的事就是我们都会死。",
        "天将降大任于斯人也，必先苦其心志劳其筋骨，后来天改主意了。",
        "比你优秀的人还在努力，你努力有什么用呢？",
        "吾日三省吾身，吾没钱 吾没车 吾没房。",
        "有困难要帮，没有困难，制造困难也要帮。",
        "王子拿着四十三码的鞋子陷入了沉思",
        "暗恋就是你在心里，为他盖了一座城堡，他却连门都不想进。",
        "喜欢一个人是藏不住的，就算躲在衣柜里，还是会被她老公发现。",
        "出卖灵魂并不丢人，丢人的是，没能卖一个好价钱。",
        "半夜给你留灯的，只有自动售货机。",
        "如果全世界都不要你了，记得来找我，我认识好几个人贩子",
        "不想养狗不想养猫，只想养你，毕竟养猪能致富。",
        "没有人能够让你放弃梦想，你自己试试，就会放弃了。",
        "遇到困难的时候暂时放一放，第二天的时候，就再也想不起来了。",
        "你和学霸的区别就是，你所有的灵光一闪，都是他的基本题型。",
        "你要吃饱 要早睡 不要仗着自己长得丑就可以任意熬夜",
        "你就一甘蔗男，刚开始可甜了，到后面全成渣。",
        "世上没有钱解决不了的事，如果有，那就是你的钱不够。",
        "不要在意现在的低谷，未来还有很长的下坡路要走。",
        "没有什么事情能把人一次击倒，只要足够坚强，它会持续的把你击倒",
        "脱发怎么办？要健康饮食保持良好心态，这样就能接受这个事实了。",
        "假如生活欺骗了你，不要悲伤不要心急，生活还将继续欺骗你。",
        "你必须敢爱敢恨，才会发现你的爱恨，别人真的不在乎。",
        "长得丑就是病，不然整形医院为什么叫医院。",
        "放心，每个班级都有傻逼的，如果你觉得没有，那要仔细想想自己会不会就是那个傻逼？",
        "你总想等你优秀了再去向她表白，后来才发现你都这么优秀了干嘛还喜欢她",
        "别以为世界没了你，没什么区别，没了你地球转得更快。",
        "国庆节想和女朋友去旅行，请大家帮忙推荐一下，哪里有好女朋友",
        "机会，永远留给，有胸有颜的人。",
        "不尝试问一次，你怎么知道，你不是爸妈避孕失败的结果？",
        "若你的朋友每天生活都这么幸福，也就不会拍成照片发到朋友圈了。",
        "暗恋的人没有，想暗杀的倒有一堆。",
        "别看我挣的少，但是我省的多，昨天法拉利又省下两百多万。",
        "最近改掉了熬夜的壞習慣，改通宵了。",
        "你知道你和一盘屎的区别吗？就是一个盘子",
        "我上班就是为了赚钱，别和我谈理想，我的理想是不上班。"
         );

        var heart = document.createElement("b");  //创建b元素
        heart.onselectstart = new Function('event.returnValue=false');  //防止拖动

        document.body.appendChild(heart).innerHTML = a[a_idx];    //将b元素添加到页面上
        a_idx = (a_idx + 1) % a.length;
        heart.style.cssText = "position: fixed;left:-100%;";  //给p元素设置样式

        var f = 6,   // 字体大小
                  x = event.clientX - f / 2, // 横坐标
                  y = event.clientY - f, // 纵坐标
                  c = randomColor(),  // 随机颜色
                  a = 10,        // 透明度
                  s = 1;      // 放大缩小

        var timer = setInterval(function(){   //添加定时器
          if(a <= 0){
            document.body.removeChild(heart);
            clearInterval(timer);
          }else{
            heart.style.cssText = "font-size:16px;cursor: default;position: fixed;color:" + c + ";left:" + x + "px;top:" + y + "px;opacity:" + a + ";transform:scale(" + s + ");";

                      y--;
                      a -= 0.07;
                      //s += 0.001;
          }
        },15)

      }

      function jsReadFiles(files) {
        if (files.length) {
            var file = files[0];
            var reader = new FileReader();//new一个FileReader实例
            if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
                reader.onload = function() {
                    $('body').append('<pre>' + this.result + '</pre>');
                }
                reader.readAsText(file);
            } else if(/image+/.test(file.type)) {//判断文件是不是imgage类型
                reader.onload = function() {
                    $('body').append('<img src="' + this.result + '"/>');
                }
                reader.readAsDataURL(file);
            }

        }
      }

       // 随机颜色
          function randomColor() {

              return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";

          }
    }());