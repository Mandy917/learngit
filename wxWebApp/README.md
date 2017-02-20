git安装
用户设置
- git config --global user.name "Your Name"
- git config --global user.email "email@example.com"

创建版本库
初始化仓库
- git init
- ls -al(查看隐藏文件.git)

添加文件到暂存区
- git add .
添加文件到历史区
- git commit -m "注释"
> 如果没有-m  定位到第一行,按i进入编辑模式，按ESC退出编辑模式，再按:wq退出vim编辑器，如果不想输入注释，直接按:q!退出编辑器

本地仓库与远程仓库连接(关联远程库)
- ssh-keygen -t rsa -C "2375050767@qq.com" (获得SSH Key,id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人)
- github==>settings==>SSH and GPG keys==>New SSH key
- git remote add origin git@github.com:Mandy917/learngit.git

把版本库里面的文件推送到远程仓库
- git push -u origin master（第一次推送）
- git push origin master(之后可以简化)

> 远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
> 关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改。

从远程库克隆
- git clone git@github.com:Mandy917/learngit.git(方法1，速度快)
- git clone https://github.com/Mandy917/learngit.git(方法2)












