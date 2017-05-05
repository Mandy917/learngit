## 定义
对象可以通过两种形式定义：
- 声明（文字）形式
- 构造形式(这种形式创建对象是非常少见的)
```
文字形式：
var myObj = {
    key:value
}
构造形式：
var myObj = new Object();
myObj.key = value;
```
> 区别：文字声明中可以添加多个键/值对，但是构造形式中必须逐个添加属性

## 类型
javascript中一共有6中主要类型(语言类型)
- number
- string
- null
- undefined
- boolean
- object

简单基本类型：string number boolean null undefined
> typeof null ==>字符串"object"
> 不同的对象在底层都表示为二进制，在javascript中二进制前三位都为0的话会被判断为object类型，null的二进制表示是全0，所以执行typeof时会返回"object"。

## 内置对象
- String
- Number
- Boolean
- Object
- Function
- Array
- RegExp
- Date
- Error
Object、Function、Array、RegExp 无论使用文字形式或者构造形式，它们都是对象，不是字面量

## 内容
- .a 语法称为属性访问，.操作符要求属性名满足标识符的命名规范
- ['a']语法称为键访问，此语法可以接受任意UTF-8/Unicode**字符串**作为属性名
在对象中，属性名永远都是**字符串**

### 属性名
- myObj[prefix+'bar']可计算的属性名，使用文字形式声明对象时不能这样写
- ES6增加了可计算属性名，可以在文字形式中使用[]包裹一个表达式来当做属性名
```
var prefix = 'foo';
var myObj = {
    [prefix+'bar']:'hello',
    [prefix+'baz']:'world'
}
myObj['foobar'] //hello
myObj['foobaz'] //world
```
可计算的属性名最常用的场景可能是ES6的符号(Symbol),一种新的基础数据类型，包含一个不透明且无法预测的值(一个字符串)




- TypeError  错误表示无法修改一个不可写的属性