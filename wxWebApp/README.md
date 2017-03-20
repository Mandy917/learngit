---
title: Git小结
tags: git
---
## git工作流程

1. 用户设置
``` 
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```
    说明：因为Git是分布式版本控制系统，所以每个机器都必须自报家门 :你的名字和Email地址
2. 创建版本库
    - 创建一个空目录
    - 初始化仓库
``` bash
git init    "说明：初始化成功，会多一个.git的文件"
```
    说明：ls -al(查看隐藏文件.git)

3. 添加文件到暂存区
```
git add . 或者 git add <name> 
```
4. 添加文件到历史区
```
git commit -m "注释"
```
    > 如果没有-m，定位到第一行，按i进入编辑模式，按ESC退出编辑模式，再按:wq退出vim编辑器，如果不想输入注释，直接按:q!退出编辑器




## 分支

1. 查看分支：
```
git branch
```
2. 创建分支：
```
git branch <name>
```
3. 切换分支：
``` bash
git checkout <name>   "注意：分支上有未提交的内容时，不能切换分支"
```
4. 分支上的工作区不干净时(即有未提交)时，通过隐藏工作台，可以切换分支去修复bug:
    - 隐藏工作台:
    ```
    git stash 
    ```
    - 查看有哪些stash:
    ```
    git stash list
    ```
    - 恢复(方法1)
    ``` bash
    git stash apply    "注：恢复但不删除stash内容"     
    git stash drop     "注：删除stash"
    ```
    - 恢复:
    ``` bash
    git stash pop "注：恢复并删除stash内容"
    ```
    - 恢复指定的stash:
    ``` bash
    git stash apply stash@{0}   "stash@{0}通过git stash list获得"
    ```
    - 一次性清理所有的stash,从而回到工作现场
    ```
    git stash clear 
    ```
5. 创建+切换分支： 
```
git checkout -b <name>
```
6. 合并某分支到当前分支：
``` bash
git merge <name>   "说明：这种合并分支的方法是用的Fast forward模式，这种模式下，删除分支后，会丢掉分支信息"
```
7. 用普通模式合并分支:
```
git merge --no-ff -m "注释" <name>
```
8. 删除分支：
```
git branch -d <name>
```
9. 查看分支合并图:
```
git log --graph --oneline
```
10. 放弃这次合并: 
```
git merge --abort
```
    注意：当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。

## 标签
发布一个版本时，我们通常先在版本库中打一个标签
1. 打标签:
```
git tag v1.0
```
2. 查看所有标签:
```
git tag
```
3. 忘记打标签:
    - 找到历史提交的commit id:
    ```
    git log --oneline
    ```
    - 打标签:
    ```
    git tag v0.9 <commit id>
    ```
4. 查看标签信息:
```
git show v1.0
```
5. 创建带有说明的标签:
```
git tag -a v1.0 -m "标签注释"
```
6. 切换标签:
```
git checkout v0.9
```
7. 用当前的创建一个分支并切换到这个分支上面，而这个分支名还是指向我们的那个tag
注意:标签是按字母排序的
``` 
git checkout -b v0.8 
```
8. 推送本地标签
```
git push origin <tagname>
git push origin --tags //推送全部未推送过的本地标签
```
9. 删除一个本地标签
```
git tag -d <tagname>
```
10. 删除一个远程标签，先从本地删除，然后远程删除
```
git push origin :refs/tags/<tagname>
```


## 远程仓库

1. 本地仓库与远程仓库连接(关联远程库)
    - 获得SSH KEY ，设置SSH KEY
    ``` bash
    ssh-keygen -t rsa -C "2375050767@qq.com" 
    "获得SSH Key,id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人"
    github==>settings==>SSH and GPG keys==>New SSH key
    ```
    - 关联远程库
    ```
    git remote add origin git@github.com:Mandy917/learngit.git
    ```
2. 把版本库里面的文件推送到远程仓库
``` bash
git push -u origin master   "注：第一次推送带-u参数"
git push origin master  "注：之后可以简化"
```
    > 远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
    > 关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
    此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改。

3. 从远程库克隆
    - 方法1，速度快
    ```
    git clone git@github.com:Mandy917/learngit.git
    ```
    - 方法2
    ```
    git clone https://github.com/Mandy917/learngit.git
    ```
4. 查看远程库信息
``` bash
git remote
git remote -v   "查看更详细的信息"
```
5. 推送分支
    - master分支是主分支，因此要时刻与远程同步；
    - dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
    - bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
    - feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
6. 抓取分支
``` 
git clone git@github.com:Mandy917/learngit.git

$ git branch
* master

git fetch origin dev //命令来把远程分支拉到本地
From github.com:zhufengnodejs/gitclone
 * branch            dev        -> FETCH_HEAD

git checkout -b dev origin/dev //在本地创建分支dev并切换到该分支
Branch dev set up to track remote branch dev from origin.//本地dev分支跟踪远程origin的dev分支 
Switched to a new branch 'dev' //切换到了新的分支dev下

git pull origin dev //就可以把某个分支上的内容都拉取到本地了
From github.com:zhufengnodejs/gitclone
 * branch            dev        -> FETCH_HEAD
Already up-to-date. //表示已经是最新的了

echo devbranch >> README.md //修改

git add README.md

git commit -m"devbranch" //提交
1 file changed, 1 insertion(+)

git push origin dev //向远程服务器推送修改
To git@github.com:zhufengnodejs/gitclone.git
0406230..2d131a7  dev -> dev

```
7. 你的小伙伴已经向origin/dev分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送：
```
echo masterbranch >> README.md //修改
git add README.md
git commit -m"masterbranch" //提交
1 file changed, 1 insertion(+)
git push origin dev //向远程服务器推送修改
To git@github.com:zhufengnodejs/gitclone.git
! [rejected]        dev -> dev (fetch first)
error: failed to push some refs to 'git@github.com:Mandy917/learngit.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
8. 推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送：
```
git pull origin dev
```
9. 这回git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push：
```
git add README.md
git commit -m"merge"
[dev 849949c] merge
git push origin dev
Counting objects: 8, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (4/4), 389 bytes | 0 bytes/s, done.
Total 4 (delta 2), reused 0 (delta 0)
To git@github.com:zhufengnodejs/gitclone.git
   2d131a7..849949c  dev -> dev
```
10. 多人协作工作模式
    -  推送自己的修改
    ```
    git push origin <branch name>
    ```
    - 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并
    ```
    git pull origin <branch name>
    ```
    - 如果合并有冲突，则解决冲突，并在本地提交
    ```
    git add <name>
    git commit -m "注释"
    ```
    - 没有冲突或者解决掉冲突后，再推送
    ```
    git push origin <branch-name>
    ```
    - 如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令连接起来
    ```
    git branch --set-upstream-to=origin/dev(<branch-name>)
    ```
    说明：本地新建的分支如果不推送到远程，对其他人就是不可见的
11. 小结
    - 查看远程库信息
    ```
    git remote -v
    ```
    - 从本地推送分支
    ```
    git push origin <branch-name>
    ```
    - 推送失败，抓取远程分支
    ```
    git pull origin <branch-name>
    ```
    - 在本地创建和远程分支对应的分支
    ```
    git checkout -b <branch-name> origin/<branch-name>
    ```
    - 建立本地分支和远程分支的关联
    ```
    git branch --set-upstream-to=origin/branch-name
    ```
## 自定义git
1. 配置别名
```
git config --global alias.st status  //git st  ===  git status
```
2. 查看用户配置
```
cat ~/.gitconfig  //[alias]后面是别名，删除别名，删除对应的行即可
```




## 命令拓展
- echo 1 > index.html :清空并写入 
- echo 2 >> index.html :在原来文件的末尾追加
- cat index.html :查看文件内容
- pwd :显示当前目录
- mkdir <filename> :新建文件夹
- touch <textname> :新建文件
- ls :列出目录下的文件名
- ls -l :详细列出目录下的文件，等价于 ll
- ls -al :列出所有文件(包括隐藏的文件)












