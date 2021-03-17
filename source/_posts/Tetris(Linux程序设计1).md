---
title: Linux作业(俄罗斯方块Tetris)
date: 2021-03-07 10:00:00
top: false
cover: false
password:
toc: true
mathjax: true
summary:
categories: C语言
author: RemMeiko
tags: [作业,C语言,记录]
img: https://remmeiko.gitee.io/img-bed/anime/7.jpg
banner_img: https://api.mz-moe.cn/img.php
---


# Tetris(俄罗斯方块小游戏)

* github地址：https://github.com/Gregwar/ASCII-Tetris.git
* 文件：
  * main.c 
  * tetris.c 
  * tetris.h

## 文件

### 1.terris.h

~~~c
#ifndef TETRIS_H
# define TETRIS_H

// 定义了一个结构体
struct tetris;

void tetris_cleanup_io();

void tetris_signal_quit(int);

void tetris_set_ioconfig();

void tetris_init(struct tetris *t,int w,int h);

void tetris_clean(struct tetris *t);

void tetris_print(struct tetris *t);

void tetris_run(int width, int height);

void tetris_new_block(struct tetris *t);

void tetris_new_block(struct tetris *t);

void tetris_print_block(struct tetris *t);

void tetris_rotate(struct tetris *t);

void tetris_gravity(struct tetris *t);

void tetris_fall(struct tetris *t, int l);

void tetris_check_lines(struct tetris *t);

int tetris_level(struct tetris *t);

#endif //TETRIS_H
~~~

这里面定义了一个tetris结构体，其他就是一些函数声明。参数基本上都是tetris结构体指针，关注tetris结构体和tetris_run方法(因为在main函数中被调用)，根据tetris_run调用其他函数的顺序逐渐分析其他函数

> C语言程序中，项目一般按功能模块化进行结构化设计，每个功能的相关程序放在一个C程序文档中，称之为一个模块。一个模块通常由两个文件组成，一个是头文件.h文件，包含了C函数声明和宏定义，简单来说就是对模块中的数据结构和函数原型进行描述，另一个则是.c文件，对数据实例或对象定义，以及函数算法具体实现。

### 2.main.c

~~~c
#include <stdio.h>
#include <stdlib.h>
#include <tetris.h>

int main(void) {
    tetris_run(12, 15);
    return EXIT_SUCCESS;
}
~~~

main函数中只调用了tetris_run()方法，参数是两个int整数，看函数声明估计是宽度和长度。

### 3.tetris.c

* 这里只是简单贴一下tetris结构体

~~~c
struct tetris {
    // 定义了一个二级指针
    char **game;
    // 宽度
    int w;
    // 高度
    int h;
    // 等级
    int level;
    // 游戏是否结束标志位
    int gameover;
    // 分数
    int score;
    // 定义了一个下坠俄罗斯方块的结构体
    struct tetris_block {
        char data[5][5];
        int w;
        int h;
    } current;
    
    int x;
    int y;
};
~~~

* 关于tetris_block结构体中下坠的俄罗斯方块的结构体相关的结构体数组(用于后面的俄罗斯方块随机下落)

~~~c
// data[][],w,h
// 形状，宽度，长度
struct tetris_block blocks[] =
{
    {{"##", 
         "##"},
    2, 2
    },
    {{" X ",
         "XXX"},
    3, 2
    },
    {{"@@@@"},
        4, 1},
    {{"OO",
         "O ",
         "O "},
    2, 3},
    {{"&&",
         " &",
         " &"},
    2, 3},
    {{"ZZ ",
         " ZZ"},
    3, 2}
};
~~~

## 知识点介绍

### timespec结构体

`  struct timespec tm;`

> 这是一个系统时钟的结构体数据类型，有两个成员，一个是秒，一个是纳秒，所以最高精确度是纳秒，函数定义：

> struct timespec {
> 	time_t tv_sec; // seconds 
> 	long tv_nsec; // and nanoseconds 
> };

###  srand()函数

``` srand(time(NULL));```

> 作用：进行重新播种

> 使用<stdlib.h>头文件中的rand函数产生伪随机数，int rand(void)

> 随机数的本质：rand() 函数产生的随机数是伪随机数，是根据一个数值按照某个公式推算出来的，这个数值我们称之为“种子”。种子和随机数之间的关系是一种正态分布，种子在每次启动计算机时是随机的，但是一旦计算机启动以后它就不再变化了；也就是说，每次启动计算机以后，种子就是定值了，所以根据公式推算出来的结果（也就是生成的随机数）就是固定的。

> 通过 srand() 函数来重新“播种”，这样种子就会发生改变。在实际开发中，我们可以用时间作为参数，只要每次播种的时间不同，那么生成的种子就不同，最终的随机数也就不同。使用 <time.h> 头文件中的 time() 函数即可得到当前的时间（精确到秒）。函数声明：

> ```C
> void srand (unsigned int seed);
> ```

### nanosleep()函数

```   nanosleep(&tm, NULL);```

> nanosleep函数,暂停某个进程直到规定时间后恢复，参数rqtp是你定义的时间间隔，或者在指定时间间隔内有信号传递到当前线程。由于调用nanosleep是是进程进入TASK_INTERRUPTIBLE,这种状态是会相应信号而进入TASK_RUNNING状态的，这就意味着有可能会没有等到你规定的时间就因为其它信号而唤醒，此时函数返回-1，切还剩余的时间会被记录在rmtp中。函数原型：

> \#include <time.h>
> int nanosleep(const struct timespec *rqtp, struct timespec *rmtp);
>
> 接受的参数是timespec 结构体数据类型,在前面介绍过

### getchar()函数

```getchar()```

+ 头文件：<stdio.h>
+ 函数原型：int getchar(void)
+ 返回值：以无符号 char 强制转换为 int 的形式返回读取的字符，如果到达文件末尾或发生读错误，则返回 EOF
+ 函数原理：当程序调用getchar时，程序会阻塞，等着用户按键。用户输入的字符被存放在键盘缓冲区中。直到用户按回车为止。当用户键入回车之后，getchar才开始从缓冲区每次读入一个字符。getchar函数的返回值是用户输入的字符的ASCII码，若文件结尾则返回-1(EOF)，且将用户输入的字符回显到屏幕。如用户在按回车之前输入了不止一个字符，其他字符会保留在键盘缓存区中，等待后续getchar调用读取。也就是说，后续的getchar调用不会等待用户按键，而直接读取缓冲区中的字符，直到缓冲区中的字符读完后，才等待用户按键

### malloc()函数

* 头文件: stdlib

* 函数原型：void *molloc(unsigned int size);
* 参数：无符号整数型unsigned int size，要分配的字节数
* 返回值：成功则返回分配空间的起始地址
* 注意：需要和free配套使用，防止内存泄漏

> free函数原型: void free(void * ptr)

### 坐标系

* 这个程序中使用了两个坐标系：**笛卡尔坐标系**(整体界面)和**行列式坐标系**(俄罗斯方块)

* 这两个坐标系的区别个人理解就是，笛卡尔坐标系就是我们平常使用的坐标系，x坐标代表的是所在列，y代表的是所在行，

* 行列式刚好相反坐标系，x代表的是所在行，y代表的是坐在列

> eg:一个3*3的网格，第二行第三个网格使用笛卡尔坐标系表示是(3，2)，采用行列式坐标系表示是(2，3)

## 程序函数分析

#### 整体程序流程

![整体流程图](https://remmeiko.gitee.io/img-bed/boke-img/Linux程序设计作业/(作业1)整体流程图.png)

* 下面是整个程序中使用到的部分函数

#### tetris_hittest函数

```c
int tetris_hittest(struct tetris *t) {
    int x,y,X,Y;
    struct tetris_block b=t->current;
    /*
    双重循环 以俄罗斯方块的宽为第一重循环，俄罗斯方块的高为第二重循环，在分别加上其在整体界面上的x,y坐标，表示将区域限定在了俄罗斯小方块的界面上，并从左至右，从上至下进行遍历，对方块的每个格子进行判定
    */
    for (x=0; x<b.w; x++)
        for (y=0; y<b.h; y++) {
            X=t->x+x;
            Y=t->y+y;
            // 方块是否越过左右边界
            if (X<0 || X>=t->w)
                return 1;
            // 俄罗斯方块是否为空
            if (b.data[y][x]!=' ') {
                // 判断俄罗斯方块的底层布局上是否已经有下落方块
                if ((Y>=t->h) || 
                        (X>=0 && X<t->w && Y>=0 && t->game[X][Y]!=' ')) {
                    return 1;
                }
            }
        }
    return 0;
}
```

* 参数：tetris结构体指针
* 返回类型：int(0，1)---0代表正常返回，1代表异常结束返回
* 功能：主要是通过判定条件返回1或0，其他函数根据1或0进行功能的设计
* 在整个程序中被频繁使用,具体作用需要具体分析

#### tetris_print函数

```c
// 整个俄罗斯方块程序是一个终端程序，因此是采用间隔打印的方式来实现动态游戏的
	// 意思就是每个一定的时间就会重新打印一次界面
void
tetris_print(struct tetris *t) {
    int x,y;
    // 打印30次回车空行来将上一次打印的界面给隐藏起来，毕竟一个屏幕也只能显示这么多行
    for (x=0; x<30; x++)
        printf("\n");
    // 打印等级和分数
    printf("[LEVEL: %d | SCORE: %d]\n", t->level, t->score);
    for (x=0; x<2*t->w+2; x++)
        printf("~");
    printf("\n");
    
    /*
    重点就在这:因为这里还需要打印在整个界面中间打印俄罗斯方块，将整体界面当作一个棋盘，重点是if语句
    使用的是双重for循环来遍历整个棋盘，遍历到的地方当作一个格子
    x:棋盘的宽，从左边开始
    y:棋盘的高，从上面开始
    t->w:棋盘的整个宽度
    t->h:棋盘的整个高度
    t->x:俄罗斯方块在整个棋盘中的x坐标
    t->y:俄罗斯方块在整个棋盘中的y坐标
    t->current.w：俄罗斯方块的宽
    t->current.h: 俄罗斯方块的高
    先从y开始循环，就是从最上面一行开始
    */
    for (y=0; y<t->h; y++) {
        printf ("!");
        for (x=0; x<t->w; x++) {
            /*
            这里需要理解的是，前面说过这个程序是两个界面，一个是底层的整体界面，就是这个棋盘，另一个就是俄罗斯方块界面，是一个小的重叠在底层界面之上的一个独立界面。
            这个循环就是将目标区域缩小在了俄罗斯方块这个小界面上(大于等于俄罗斯方块的x和y坐标，小于其位置加上俄罗斯方块的宽度和高度)，然后将这个小区域中非空的区域继续打印，其他地方即else所表示的地方打印game数组中存放的数据即可，就是打印空或者已经降下的俄罗斯方块。
            */
            if (x>=t->x && y>=t->y 
                    && x<(t->x+t->current.w) && y<(t->y+t->current.h) 
                    && t->current.data[y-t->y][x-t->x]!=' ')
                printf("%c ", t->current.data[y-t->y][x-t->x]);
            else
                printf("%c ",t->game[x][y]);
        }
        printf ("!\n");
    }
    
    for (x=0; x<2*t->w+2; x++)
        printf("~");
    printf("\n");
    printf(" 方块横坐标(t->x)：%d\n 方块纵坐标(t->y)：%d\n 方块的宽度(t->current.w)：%d\n 方块的长度(t->current.h)：%d\n",t->x,t->y,t->current.w,t->current.h);
```

* 参数：tetris结构体指针
* 返回类型：void
* 功能：打印整个游戏界面

> 整个程序是使用有两个界面，一个是底层的整体界面，还有一个就是俄罗斯方块的界面，但是计算机只能一行一行打印，因此打印的时候就需要设计一些简单的算法(譬如什么时候打印空格，什么时候打印俄罗斯方块等等)，具体可以看注释

#### tetris_print_block()函数

```c
void tetris_print_block(struct tetris *t) {
    int x,y,X,Y;
    struct tetris_block b=t->current;
    /*
    循环遍历整个俄罗斯方块界面，如果非空则存入game数组中
    */
    for (x=0; x<b.w; x++)
        for (y=0; y<b.h; y++) {
            if (b.data[y][x]!=' ')
                // 存入game数组中
                t->game[t->x+x][t->y+y]=b.data[y][x];
        }
}
```

* 参数：tetris结构体指针
* 返回类型：void
* 功能：将已经下落☞最底层的俄罗斯方块存入game数组(底层接界面)中

> 这里有一点，就是程序中有一个tetris_gravity函数，用来控制方块下降使用的，除了加速调用过之外，每循环350次也会被调用一次，在这里会根据tetris_hittest()函数的返回结果决定是否调用tetris_hittest函数

* 在这个调用的时候，如果tetris_hittest()函数返回1则表示已经有方块存在了，说明已经到底了

> 其实一开始我也很好奇这个是怎样判断下落的下一个位置已经存在方块了。

#### tetris_gravity()函数

```c
void tetris_gravity(struct tetris *t) {
    int x,y;
    // 方块的的y坐标加1,表示额外下降一格，从视觉上就如加速一样
    t->y++;
    // 如果返回1 表示下一个+1的位置已经有方块了，不能在下降了
    if (tetris_hittest(t)) {
        // y--将y重新设置回去
        t->y--;
        // 这个方块就此结束，已经触底了，将方块存入至game数组中
        tetris_print_block(t);
        tetris_new_block(t);
    }
}
```



#### 白话文瞎说一通(23333)

* 游戏界面 W*H    小俄罗斯方块界面  w *h 

流程：main方法调用tetris_run()函数，tetris_run()函数创建系统时间结构体tm和俄罗斯方块结构体t,tetris_set_ioconfig(),tetris_init()函数进行初始化，利用srand()产生随机数种子用于随机生成俄罗斯方块，接下来tetris_new_block()方法随机生成俄罗斯方块，方块生成位置为中间位置，整个界面的初始点是左上角，方块初始位置(W/2-w/2,0),根据gameover标志位的值判断游戏是否结束，未结束进入while循环，执行nanosleep休眠函数，定义记录变量count,循环一次加1，每50次调用一次tetris_print()函数打印界面，每350次会先后调用tetris_gravity()函数tetris_check_lines()函数来将方块的 位置加1和检查界面中是否有方块已经存满一行了，其中tetris_gravity()函数中有tetris_print_block()函数来将下落的方块存入game数组中，如果有则调用tetris_fall()方法消去，在while循环中同时定义了一个键盘扫描的while循环函数，通过getchar()获取键盘输入，getchar()函数前面有介绍，根据按下的按键执行对应的函数，s和w对应tetris_gravity()和tetris_rotate()函数。a和d则分别对于位置的x进行减加，同时每次调用tetris_hittest()函数进行检查。

## 附录：

[srand和随机数](http://c.biancheng.net/view/2043.html)

[getchar函数](https://baike.baidu.com/item/getchar%28%29/6876946?fr=aladdin)