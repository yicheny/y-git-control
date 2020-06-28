[TOC]

# 功能目标
1. 提交当前代码
> 支持备注
2. 将当前目录下所有文件复制到指定目录下并覆盖原文件
> 支持自动删除多余文件【包括版本提交记录】<br/>
> 支持忽略指定目录或文件【比如node_modules】<br/>
3. 指定目录均进行版本提交

# 使用
## svn
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
    "./node_modules"
  ]
}
```

指令
```
const {superOrder} = require('y-project-share/src/scripts_svn_simple');

superOrder(require('./Setting'),__dirname);
```

# 实现思路

# 备注
- 需要支持`svn`命令行
> tortoisesvn已经集成到shell中，不能在命令行下使用

下面是具体支持步骤：
1. 下载这个命令行工具，这个工具可以在cmd下使用命令行 [下载链接](https://www.visualsvn.com/downloads/)
2. 下载完成后，解压，得到一个bin目录。将这个目录放在你能找到位置即可
3. 进入环境变量编辑【方法很多，不知道的可以查一下，我是直接用系统自带的搜索功能找到的】
4. 选择环境变量-系统变量-Path，在里面新加一条路径即可，新加的路径就是刚刚存放bin的路径
5. 打开cmd，执行`svn help`，测试是否成功支持svn命令行
