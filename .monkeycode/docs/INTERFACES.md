# 接口定义

## 概述

ShoeShop 的接口分为三部分：Shopify Storefront API（GraphQL）、SvelteKit 服务端 API 路由、以及 PayPal SDK 前端接口。

## Shopify Storefront API

### 基础信息

- **Endpoint**: `https://{shop}.myshopify.com/api/{version}/graphql.json`
- **认证**: `X-Shopify-Storefront-Access-Token` Header
- **版本**: `2024-07` (建议定期更新到最新稳定版)

### 主要查询

#### 产品列表

```graphql
query Products($first: Int!, $after: String, $query: String, $sortKey: ProductSortKeys) {
  products(first: $first, after: $after, query: $query, sortKey: $sortKey) {
    pageInfo { hasNextPage endCursor }
    edges {
      node {
        id
        handle
        title
        description
        featuredImage { url altText width height }
        priceRange { minVariantPrice { amount currencyCode } }
        variants(first: 10) { edges { node { id title availableForSale price { amount } } } }
      }
    }
  }
}
```

#### 产品详情

```graphql
query Product($handle: String!) {
  productByHandle(handle: $handle) {
    id handle title descriptionHtml
    images(first: 10) { edges { node { url altText } } }
    options { name values }
    variants(first: 50) { edges {
      node {
        id title availableForSale
        selectedOptions { name value }
        price { amount currencyCode }
        compareAtPrice { amount }
        image { url }
      }
    }}
    collections(first: 5) { edges { node { handle title } } }
    seo { title description }
  }
}
```

#### 购物车

```graphql
# 创建购物车
mutation CartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id checkoutUrl
      totalQuantity
      lines(first: 10) { edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount } image { url } product { handle title } } } } } }
      cost { totalAmount { amount currencyCode } subtotalAmount { amount } }
    }
  }
}
```

#### 客户认证

```graphql
# 客户登录
mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerAccessToken { accessToken expiresAt }
    customerUserErrors { code message }
  }
}

# 客户注册
mutation CustomerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer { id firstName lastName email }
    customerUserErrors { code message }
  }
}
```

### GraphQL 查询参数映射

| SvelteKit 路由 | GraphQL 查询 | 参数 |
|---------------|-------------|------|
| `/products` | Products | `$first`, `$after`, `$query`, `$sortKey` |
| `/products/[handle]` | ProductByHandle | `$handle` |
| `/collections/[handle]` | CollectionByHandle | `$handle`, `$first`, `$after` |
| `/search` | Products | `$query` (搜索关键词) |
| `/cart` | Cart | cart `$id` |

## SvelteKit 服务端 API

### 路由结构

```
src/routes/api/
├── products/
│   └── +server.ts          # GET 产品列表代理
├── products/[handle]/
│   └── +server.ts          # GET 产品详情代理
├── cart/
│   └── +server.ts          # GET/POST 购物车操作
├── customer/
│   ├── login/
│   │   └── +server.ts      # POST 客户登录
│   ├── register/
│   │   └── +server.ts      # POST 客户注册
│   └── orders/
│       └── +server.ts      # GET 订单列表
├── sitemap.xml/
│   └── +server.ts          # GET 动态 sitemap 生成
└── feed.xml/
    └── +server.ts          # GET RSS/Atom Feed
```

### API 端点定义

#### GET /api/products

产品列表代理接口，添加缓存层减少 Shopify API 调用。

**响应**:
```json
{
  "products": [],
  "pageInfo": { "hasNextPage": true, "endCursor": "..." }
}
```

#### GET /api/products/[handle]

产品详情代理接口。

**响应**:
```json
{
  "product": { "handle": "nike-air-max-90", "title": "Nike Air Max 90", ... }
}
```

#### POST /api/cart

购物车操作（添加/更新/删除行项目）。

**请求**:
```json
{
  "cartId": "gid://...",
  "action": "add|update|remove",
  "lines": [{ "merchandiseId": "...", "quantity": 1 }]
}
```

#### POST /api/customer/login

客户登录代理。

**请求**:
```json
{ "email": "user@example.com", "password": "****" }
```

**响应** (Set-Cookie):
```json
{ "customer": { "firstName": "John", "email": "user@example.com" } }
```

#### GET /api/sitemap.xml

动态生成多语言 sitemap，返回 XML。

**返回**: `application/xml`
- 产品页面链接（多语言 hreflang）
- 博客文章链接（多语言 hreflang）
- 静态页面链接

#### GET /api/feed.xml

生成博客 RSS/Atom Feed，用于 SEO 和内容分发。

## PayPal SDK 接口

### 初始化

```typescript
// src/lib/payment/paypal.ts
import { loadScript } from '@paypal/paypal-js';

const paypal = await loadScript({
  clientId: 'PAYPAL_CLIENT_ID',
  currency: 'EUR', // 动态根据当前语言确定
  intent: 'capture'
});
```

### 支付按钮

```typescript
paypal.Buttons({
  createOrder: async () => {
    // 调用 Shopify Storefront API 创建 checkout
    // 返回 checkout.webUrl 或自定义 order ID
  },
  onApprove: async (data) => {
    // 支付完成回调
    // 重定向到订单确认页
  }
}).render('#paypal-button-container');
```

## 数据结构

### 产品 (Product)

```typescript
interface Product {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  featuredImage: Image;
  images: Image[];
  variants: ProductVariant[];
  options: ProductOption[];
  collections: Collection[];
  seo: { title: string; description: string };
  priceRange: { minVariantPrice: Money; maxVariantPrice: Money };
}

interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  compareAtPrice: Money | null;
  selectedOptions: { name: string; value: string }[];
  image: Image | null;
}

interface Money {
  amount: string;
  currencyCode: string;
}
```

### 博客文章 (BlogPost)

```typescript
interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'style-guide' | 'review' | 'size-guide' | 'brand-story';
  author: string;
  image: string;
  tags: string[];
  content: string; // HTML rendered from Markdown
  seo: { title: string; description: string };
  translations: Record<string, { slug: string }>;
}
```

### 购物车 (Cart)

```typescript
interface CartItem {
  id: string;
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  price: Money;
  image: string;
  quantity: number;
}
```

## 国际化接口

### 翻译文件结构

```
src/lib/i18n/translations/
├── en/
│   ├── common.json     # {"home": "Home", "cart": "Cart", ...}
│   ├── product.json    # {"addToCart": "Add to Cart", "size": "Size", ...}
│   ├── checkout.json   # {"checkout": "Checkout", "paypal": "Pay with PayPal", ...}
│   └── blog.json       # {"readMore": "Read More", "category": "Category", ...}
├── fr/
│   └── ...
├── de/
│   └── ...
├── it/
│   └── ...
└── es/
    └── ...
```

### 货币映射

| 语言 | 货币 | PayPal 支持 |
|------|------|------------|
| en | USD | Yes |
| en-GB | GBP | Yes |
| fr | EUR | Yes |
| de | EUR | Yes |
| it | EUR | Yes |
| es | EUR | Yes |
