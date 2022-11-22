# Vitepress 评论插件

<a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/lang-typescript-informational?style=flat-square" alt="TypeScript" />
</a>
<a href="https://github.com/prettier/prettier" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/%E4%BB%A3%E7%A0%81%E9%A3%8E%E6%A0%BC-prettier-ff69b4?style=flat-square" alt="code style: prettier" />
</a>

> 尚未完成与发布

基于 Gitlab API 的 Vitepress 评论插件。

## 初衷

我在使用 Vitepress 作为文档工具，为了方便阅读者在文档中留下评论，调研了一些目前开源的评论插件，如 vssue, gitalk, giscus, valine, twikoo 等

最后还是决定造个轮子，主要原因如下：

1. 很多公司内部都私有部署了 Gitlab，接入成本很低
2. vitepress 使用 vue3，而大部分开源评论不支持 vue3
3. 在公司内部受行业限制无法普及新技术，但文档工具不存在此限制

因此功能对公司来说并不是非常必要的，所以打算作为个人项目，利用空闲时间来完成。

## 感谢

以下排名不分先后.

- [Axios](https://axios-http.com/)
- [Gitlab](https://about.gitlab.com/)
- [Vssue](https://github.com/meteorlxy/vssue)
- [Vitepress](https://vitepress.vuejs.org/)
- And more.

## License

MIT
