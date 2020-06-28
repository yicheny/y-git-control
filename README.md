[TOC]

# 功能目标
1. 提交当前代码
> 支持备注
2. 将当前目录下所有文件复制到指定目录下并覆盖原文件
> 已支持自动删除多余文件【其实是将原来的全删了再复制】<br/>
> 已支持忽略指定目录【比如node_modules】
> 已支持忽略指定文件【比如Setting.json】
3. 指定目录均进行版本提交

# 使用
## svn
> 已支持版本上进行已删除文件的提交【支持目录删除】【注意，文件改名同样是删除操作】<br/>

数据（定义Setting.json文件）
```
{
  "commitInfo": "测试脚本 提交target目录 第13次提交！",
  "sourcePath": ".",
  "targetList": [
    "../box1/src/project-share",
    "../box2/src/project-share",
    "../box3/src/project-share"
  ],
  "ignoreList": [
    "./node_modules",
    "./Setting.json"
  ],
  "delList": []
}
```

指令
```
const {superOrder} = require('y-project-share/src/scripts_svn_simple');

superOrder(require('./Setting'),__dirname);
```

### 备注：关于删除操作
1. 如果此文件还没有提交到svn上，直接本地删除即可
> 这里推荐手动删除，因为没有提交到svn，意味着只在当前目录下有此文件，手动删简单快速

2. 如果此文件已提交到svn,则在`Setting.json`文件里设置`delList`即可
> 关于这里，手动提交删除也行，不过很麻烦，因为所有targetList的版本控制里都有这一文件的提交记录，如果手动删除就需要找到涉及的目录进行删除，在这么繁琐的操作容易出问题，所以推荐利用`Setting.json`设置删除项，当前目录及所有目标目录下的提交都会删除对应文件

3. 暂时`Setting.json`的`delList`只支持常规删除，不支持未被版本控制和修改文件的提交。【这是svn的默认删除行为，如果需要支持这两种情况，加上`--force`即可，但是暂时不想支持对这两种类型的删除】

# 实现思路

# 版本管理指令
## git
### 提交所有修改文件至日志
`git commit -am '备注信息'`

# 备注
- 需要支持`svn`命令行
> tortoisesvn已经集成到shell中，不能在命令行下使用

下面是具体支持步骤：
1. 下载这个命令行工具，这个工具可以在cmd下使用命令行 [下载链接](https://www.visualsvn.com/downloads/)
2. 下载完成后，解压，得到一个bin目录。将这个目录放在你能找到位置即可
3. 进入环境变量编辑【方法很多，不知道的可以查一下，我是直接用系统自带的搜索功能找到的】
4. 选择环境变量-系统变量-Path，在里面新加一条路径即可，新加的路径就是刚刚存放bin的路径
5. 打开cmd，执行`svn help`，测试是否成功支持svn命令行
