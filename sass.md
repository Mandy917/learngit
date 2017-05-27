## Sass和SCSS之间的区别
-Sass和SCSS其实是同一种东西，我们平时都称之为Sass，两者之间不同之处有以下两点：
1. 文件扩展名不同，Sass是以“.sass”后缀为扩展名，而SCSS是以“.scss”后缀为扩展名
2. 语法书写方式不同，Sass是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而SCSS的语法书写和我们的CSS语法书写方式非常类似。
## 安装Sass
- http://rubyinstaller.org/downloads  下载Ruby，安装Ruby
- gem install sass

## 卸载Sass
- gem uninstall sass

## 检测Sass及更新
- sass -v 检测
- gem update sass 更新

## 输出不同风格
- 嵌套输出方式 nested
- 展开输出方式 expanded 
- 紧凑输出方式 compact (单行)
- 压缩输出方式 compressed(压缩输出方式会去掉标准的 Sass 和 CSS 注释及空格。也就是压缩好的 CSS 代码样式风格)

## 编译
- sass sass文件路径:输出css的路径
- 检测改变，时时编译：sass --watch base.scss:base.css
- 编译风格：sass --watch base.scss:base.css --style nested(默认方式)

```
nested风格:
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;}
expanded风格:
nav ul{
    margin:0;
    padding:0;
    list-style:none;
}
compact风格：
nav ul{margin:0;padding:0;list-style:none;}
compressed风格：
nav ul{margin:0;padding:0;list-style:none;}nav li{float:left;}

```
## 声明变量
- 默认变量的价值在于进行**组件化开发**的时候会非常有用
- $width:300px    $ + 变量名 + 变量值
- 全局变量--在选择器、函数、混合宏...的外面定义的变量
- 局部变量--定义在元素的内部（全局变量的影子）
- 创建变量的条件：
    - 该值至少重复出现了两次
    - 该值至少可能会被更新一次
    - 该值所有的表现都与变量有关（非巧合）

## 嵌套
- 选择器嵌套(尽可能避免使用)
- 属性嵌套
- 伪类嵌套

```
选择器嵌套
nav{
    a{
        color:red;
        header & {
            color:green;
        }
    }

}
输出结果：
nav a{color:red;}
header nav a{color:green;}

属性嵌套
.box{
    border{
        right:1px solid red;
        left:1px solid green;
    }
}
输出结果：
.box{
    border-right:1px solid red;
    border-left:1px solid green;
}

伪类嵌套
.clearfix{
    &:before,
    &:after{
        content:'';
        display:table;
    }
    &:after{
        clear:both;
        overflow:hidden;
    }
}
输出结果：
.clearfix:before,.clearfix:after{content:'',display:table;}
.clearfix:after{clear:both;overflow:hidden;}

```

## 混合宏
- 不足：造成代码的冗余
- 声明混合宏：@mixin
```
不带参数的混合宏
@mixin border-radius{
    -webkit-border-radius:5px;
    border-radius:5px;
}
带有参数的混合宏
@mixin border-radius($radius:5px){
    -webkit-border-radius:$radius;
    border-radius:$radius;
}
复杂的混合宏
@mixin box-shadow($shadow...){
    @if length($shadow) >= 1{
        @include prefixer(box-shadow,$shadow);
    }@else{
        $shadow:0 0 4px rgba(0,0,0,0.3);
        @include prefixer(box-shadow,$shadow);
    }
}
传一个不带值的参数
@mixin border-radius($radius){
    -webkit-border-radius:$radius;
    border-radius:$radius;
}

.box{
    @include border-radius(3px)
}
编译后
.box{
    -webkit-border-radius:3px;
    border-radius:3px;
}
```
- @mixin--声明混合宏的关键词
- {}里面是复用的样式代码

- 调用混合宏 @include 
- 混合宏的参数
    - 传一个不带值的参数
    - 传一个带值的参数
    - 传两个参数
    - 传多个参数

## 继承
## 占位符
## 数据类型
- 数字
- 字符串
- 颜色
- 布尔型
- 空值
- 值列表


## sass的控制命令
- @if @else if  @else
- @for $i from <start> through <end> {} (包含end)
- @for $i from <start> to <end> {} (不包含end)
- @while 条件{}
- @each $var in <list> {}

## sass的函数简介
- 字符串函数
    - unquote($string):删除字符串中的引号(删除的是开头和结尾的引号)
    - quote($string):给字符串添加引号
        1.只能给字符串增加双引号
        2.中间有单引号或者空格时，需要用单引号或者双引号括起，否则编译的时候会报错
        3.碰到特殊符号:!  ? > 等，除中折号 - 和下划线_都需要使用引号括起，否则编译器会报错
    - To-upper-case()
    - To-lower-case()
- 数字函数
    - percentage($value):将一个不带单位的数转换成百分比值
    - round($value):四舍五入
    - ceil($value):向上取整
    - floor($value):向下取整
    - abs($value):返回一个数的绝对值
    - min($numbers...):找出几个数值之间的最小值(不能同时出现两种不同类型的单位)
    - max($numbers...):找出几个数值之间的最大值(不能同时出现两种不同类型的单位)
    - random():获取随机数
- 列表函数
    - length($list): 返回一个列表的长度值
    - nth($list,$n): 返回一个列表中指定的某个标签值($n必须是大于0的整数)
    - join($list1,$list2,[$separator]): 连接两个列表为一个列表
        1.只能把两个列表连接成一个列表，不可连接多个列表
        2.$separator参数是设置连接列表的分隔符：auto(默认值),comma(逗号),space(空格)
        3.不指定该参数会出现多种情况连接，建议指定
        4.当两个列表中的列表项小于2时，将会以空格分隔：join(blue,red)==>(#0000ff #ff0000)
    - append($list1,$val,[$separator]): 将某个值放在列表的最后
        1.$separator参数:auto(默认值),comma(逗号),space(空格)
        2.未设置$separator参数时，如果只有一个列表项，以空格的方式分隔
    - zip($lists...): 将几个列表结合成一个多维的列表(每个单一的列表个数必须是相同的)
    - index($list,$value): 返回一个值在列表中的位置值
        1.索引从1开始
        2.指定的值不在列表中，返回false
- 颜色函数
- Introspection函数(包含了几个判断型函数，这几个函数主要用来对值做一个判断的作用)
    - type-of($value):返回一个值的类型
        1.number:数值型
        2.string:字符串型
        3.bool:布尔型
        4.color:颜色型
    - unit($number):返回一个值的单位
    - unitless($number):判断一个值是否带有单位
    - comparable($number-1,$number-2):判断两个值是否可以做加，减和合并
- 三元函数(Miscellaneous函数)
    - if(true,1px,3px)==>1px
- map
    -定义map:
    ```
    $theme-color:(
        default:(
            bgcolor:#fff,
            text-color:#444,
            link-color:#39f
        ),
        primary:(
            bgcolor:#000,
            text-color:#fff,
            link-color:#93f
        ),
        negative:(
            bgcolor:#f36,
            text-color:#fefefe,
            link-color:#d4e 
        )
    )
    ```



## 关键词
- @mixin  &&  @include
- @if{}@else{}
- className  &&  @extend 
- %placeholder  占位符  @extend  这俩配套使用
- @each in
- #{}




