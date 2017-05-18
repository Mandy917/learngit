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


