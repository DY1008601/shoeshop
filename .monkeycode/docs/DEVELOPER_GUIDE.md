# 开发指南

## 环境要求

- Node.js 20.x+
- npm 10.x+ 或 pnpm 9.x+
- Git
- Shopify Partner 账号 + 开发 Store
- PayPal Developer 账号 (Sandbox)
- Cloudflare 账号

## 快速开始

```bash
# 克隆项目
git clone <repo-url> shoeshop
cd shoeshop

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 填入 Shopify Storefront API Token 等

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 本地预览生产构建
pnpm preview
```

## 环境变量

```bash
# .env.example
PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your-storefront-access-token
PUBLIC_SHOPIFY_API_VERSION=2024-07
PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
PUBLIC_SITE_URL=https://yoursite.com
PUBLIC_DEFAULT_LOCALE=en
PUBLIC_SUPPORTED_LOCALES=en,fr,de,it,es
```

## 项目结构说明

| 目录/文件 | 说明 |
|----------|------|
| `src/lib/shopify/` | Shopify Storefront API GraphQL 客户端与查询 |
| `src/lib/components/` | 可复用的 Svelte 组件 |
| `src/lib/stores/` | Svelte writable stores（购物车、用户状态等） |
| `src/lib/i18n/` | 多语言配置、翻译文件、语言检测 |
| `src/lib/seo/` | SEO 工具函数（meta、结构化数据、sitemap） |
| `src/lib/utils/` | 通用工具函数（格式化、校验等） |
| `src/routes/` | SvelteKit 文件路由系统 |
| `src/routes/(app)/[lang]/` | 多语言应用路由 |
| `src/routes/api/` | 服务端 API 代理路由 |
| `src/content/blog/` | Markdown 博客内容，按语言分目录 |
| `static/` | 静态资源（favicon、robots.txt 等） |
| `svelte.config.js` | SvelteKit 配置（adapter 等） |
| `tailwind.config.js` | Tailwind CSS 配置 |
| `wrangler.toml` | Cloudflare Pages/Workers 配置 |

## 开发规范

### 命名规范

- **文件名**: kebab-case (`product-card.svelte`, `shopify-client.ts`)
- **组件名**: PascalCase (`ProductCard`, `Header`)
- **变量/函数**: camelCase (`productList`, `getProducts`)
- **常量**: UPPER_SNAKE_CASE (`MAX_PRODUCTS_PER_PAGE`)
- **Store**: 后缀 `Store` (`cartStore`, `userStore`)
- **TypeScript 接口**: PascalCase, 不加 `I` 前缀 (`Product`, `CartItem`)

### 代码风格

- 使用 TypeScript 严格模式
- 组件中优先使用 Svelte 5 runes (`$state`, `$derived`, `$effect`)
- 每个 `.svelte` 文件最多 300 行，超出则拆分
- GraphQL 查询放在 `src/lib/shopify/queries/` 独立文件
- 博客文章使用 Frontmatter 格式

### Git 提交规范

遵循 Conventional Commits:

```
feat(scope): 简短描述
fix(scope): 简短描述
chore(scope): 简短描述
docs(scope): 简短描述
refactor(scope): 简短描述
```

Scope 示例: `product`, `cart`, `blog`, `i18n`, `seo`, `shopify`

### SEO 开发规范

- 每个页面必须有 `<svelte:head>` 中设置 title 和 meta description
- 产品页必须包含 Product 结构化数据 (JSON-LD)
- 博客文章必须包含 Article 结构化数据
- 所有图片必须设置 `alt` 和 `width/height` 属性
- 性能目标: Lighthouse 评分 > 90, Core Web Vitals 全绿

### 国际化规范

- 所有面向用户的文本必须通过 i18n 系统获取，禁止硬编码
- 翻译 key 命名: `namespace.key` (`product.addToCart`)
- 新增语言时同步更新 `PUBLIC_SUPPORTED_LOCALES` 环境变量
- URL 语言前缀与 HTML lang 属性必须一致

## 常见任务

### 添加新产品类型

1. 在 Shopify Admin 中创建产品，添加标签分类
2. 确保产品的 meta title/description 填写完整
3. 前端会自动通过 Storefront API 拉取

### 发布新博客文章

```bash
# 1. 在对应语言目录创建 Markdown 文件
# 2. 文件格式: YYYY-MM-DD-slug.md
mkdir -p src/content/blog/en
```

```markdown
---
title: "2024 Best Running Shoes Guide"
date: "2024-07-15"
category: "style-guide"
author: "ShoeShop Team"
image: "/images/blog/running-shoes-2024.jpg"
tags: ["running", "guide", "2024"]
excerpt: "Discover the top running shoes of 2024..."
---

Content here...
```

### 添加新语言

```bash
# 1. 创建翻译文件目录
mkdir -p src/lib/i18n/translations/{lang}/

# 2. 复制英文翻译文件作为模板
cp src/lib/i18n/translations/en/*.json src/lib/i18n/translations/{lang}/

# 3. 翻译 JSON 文件内容

# 4. 更新 .env
# PUBLIC_SUPPORTED_LOCALES=en,fr,de,it,es,{new_lang}

# 5. 创建博客内容目录
mkdir -p src/content/blog/{lang}/
```

### 本地测试 SEO

```bash
# 构建生产版本
pnpm build

# 使用 Lighthouse CI
pnpm dlx @lhci/cli collect --url=http://localhost:4173

# 检查结构化数据
# 使用 Google Rich Results Test: https://search.google.com/test/rich-results
```

## 构建与发布

### 构建

```bash
# 生产构建
pnpm build

# 输出目录: .svelte-kit/cloudflare/
```

### 部署到 Cloudflare Pages

```bash
# 安装 Wrangler CLI
pnpm add -D wrangler

# 登录 Cloudflare
pnpm wrangler login

# 部署
pnpm run deploy
# 实际执行: wrangler pages deploy .svelte-kit/cloudflare
```

### CI/CD (推荐)

Cloudflare Pages 支持 Git 集成，推送到主分支自动部署：

1. 在 Cloudflare Dashboard 连接 Git 仓库
2. 构建设置:
   - Build command: `pnpm build`
   - Build output: `.svelte-kit/cloudflare`
   - Environment variables: 同上 env 列表
3. 配置自定义域名
4. 启用 `*.monkeycode-ai.online` 开发预览域名

### 发布前检查清单

- [ ] 所有翻译文件完整无缺
- [ ] sitemap.xml 正常生成
- [ ] robots.txt 配置正确
- [ ] 结构化数据验证通过
- [ ] Lighthouse 评分 > 90
- [ ] PayPal Sandbox 支付流程测试通过
- [ ] 所有语言的 hreflang 标签正确
- [ ] 图片 alt 属性完整
- [ ] .env 变量已在 Cloudflare 配置
- [ ] Shopify webhook 已配置回调地址
