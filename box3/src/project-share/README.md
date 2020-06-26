[TOC]

# 功能目标
1. 提交当前代码
> 支持备注
2. 将当前目录下所有文件复制到指定目录下并覆盖原文件
> 已支持自动删除多余文件【其实是将原来的全删了再复制】<br/>
> 已支持忽略指定目录【比如node_modules】
3. 指定目录均进行版本提交

# 使用
## svn
>  缺陷：不能在版本上进行已删除文件的提交

数据（定义Setting.json文件）
```
{
  "commitInfo": "测试脚本 提交target目录 第9次提交！",
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
const {copyDirListSync} = require('./scripts/DirOpertion');
const {addAndCommit,targetListCommit} = require('./scripts/scripts_svn');

main();

async function main(){
    const {targetList,ignoreList,commitInfo,sourcePath} = require('./Setting');
    await addAndCommit(commitInfo);
    copyDirListSync(sourcePath, targetList,ignoreList);
    await targetListCommit(__dirname,targetList,commitInfo);
}
```

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
