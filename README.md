<p align="center">
    <a href="https://travis-ci.org/wmui/essay"><img src="https://travis-ci.org/wmui/essay.svg?branch=main" alt="Build Status"></a>
    <a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/node-%3E%3D16.0.0-orange.svg" alt="Version"></a>
    <a href="https://github.com/wmui/essay"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

<p align="center"><a href="https://ppx.link" target="_blank">演示网站</a></p>

> Essay - 个性化博客系统

### Essay

4.0.0正在开发中...

解析分类、标题、缩略图、置顶、导航菜单等
自动把文章存在本地
设置：

SEO信息：
标题：
关键字：
描述：

博客信息：
博客名字：
个性签名：
ICP备案：

账号重置：
登录邮箱：
登录密码：

key的问题
csrf问题
cookie有效期问题
文章迁移
docker配置
评论问题
浏览量 ok
orm删除字段无法同步问题
排序
id错误渲染404 ok
删除后返回上一页或者首页刷新 ok

编辑状态：隔几秒同步一次
创建状态：先创建然后走编辑逻辑

评论保存ip，如果IP相同并且评论间隔太短，则数据插入失败

===
标题：这是标题
缩略图：''
显示到菜单：否
置顶：否
===

const data = `
===
标题：这是标题
缩略图：''
显示到菜单：否
置顶：否
===
`;

const pattern = /===\s*标题：(.*?)\s*缩略图：(.*?)\s*显示到菜单：(.*?)\s*置顶：(.*?)\s*===/s;

const match = data.match(pattern);

if (match) {
  const result = {
    "标题": match[1],
    "缩略图": match[2],
    "显示到菜单": match[3],
    "置顶": match[4]
  };

  const jsonResult = JSON.stringify(result, null, 2);
  console.log(jsonResult);
} else {
  console.log("未找到匹配的内容。");
}