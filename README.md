# toast

## 安装

1. 主项目增加 .npmrc

```config
@kering-technologies:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<PERSONAL_ACCESS_TOKEN>
```

2. 安装依赖

```bash
npm install @kering-technologies/eagle_china-package-toast@<version>
```

## 开发

```bash
npm run dev
```

## 文档

```bash
npm run build:docs
```

## 发布

```bash
# 自动打 tag 并修改 package.json，收集 CHANGELOG 并提交
npm version  [<newversion> | major | minor | patch]
# 提交 tag 至远程仓库，CI 自动发布
git push origin [<version>]
# （可选） 同步更新该分支
git push
```

## 本地打包

```bash
npm run build
```

## 发布进度

<https://github.com/kering-technologies/eagle_china-package-toast/actions>

## 其他版本

<https://github.com/kering-technologies/eagle_china-package-toast/packages/1512219>

## CHANGELOG

[CHANGELOG.md](CHANGELOG.md)

## Reference

> <https://blog.devgenius.io/eslint-prettier-typescript-and-react-in-2022-e5021ebca2b1>
