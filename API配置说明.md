# API 配置说明

## 如何获取 Alpha Vantage API Key

1. 访问：https://www.alphavantage.co/support/#api-key
2. 填写表单：
   - First Name（名）
   - Last Name（姓）
   - Email（邮箱）
   - Organization（组织，可以填个人）
   - Website（网站，可选）
3. 点击 "GET FREE API KEY"
4. 你会立即收到 API Key（一串字母数字组合，例如：`ABC123XYZ456`）

## 配置步骤

### 方法一：手动创建 .env 文件（推荐）

1. 在项目根目录（`ValueGlance Project` 文件夹）中创建一个新文件
2. 文件名：`.env`（注意：文件名就是 `.env`，没有其他名字）
3. 在文件中输入：
   ```
   VITE_ALPHA_VANTAGE_API_KEY=你的API_KEY
   ```
   例如：
   ```
   VITE_ALPHA_VANTAGE_API_KEY=ABC123XYZ456
   ```
4. 保存文件

### 方法二：使用命令行（如果你熟悉命令行）

在项目文件夹中打开 PowerShell 或 CMD，运行：

```bash
echo VITE_ALPHA_VANTAGE_API_KEY=你的API_KEY > .env
```

（记得把 `你的API_KEY` 替换成真实的 API key）

## 验证配置

1. 确保 `.env` 文件在项目根目录
2. 确保 API key 正确（没有多余的空格）
3. 重启开发服务器（如果正在运行）

## 重要提示

- ✅ `.env` 文件已经在 `.gitignore` 中，不会被提交到 GitHub
- ✅ 如果没有配置 API key，项目会使用模拟数据（仍然可以运行）
- ✅ API 免费版限制：每分钟 5 次请求，每天 500 次请求
- ⚠️ 如果 API 请求失败或达到限制，会自动使用模拟数据作为后备

## 测试 API 是否工作

配置好 API key 后，运行项目：

```bash
npm run dev
```

打开浏览器控制台（F12），查看 Network 标签：
- 如果看到对 `alphavantage.co` 的请求 = API 正在工作
- 如果只看到本地请求 = 使用的是模拟数据

## 部署时的配置

如果部署到 Vercel 或 Netlify，需要在部署平台设置环境变量：

### Vercel:
1. 在项目设置中找到 "Environment Variables"
2. 添加：`VITE_ALPHA_VANTAGE_API_KEY` = 你的 API key

### Netlify:
1. 在 Site settings > Build & deploy > Environment
2. 添加：`VITE_ALPHA_VANTAGE_API_KEY` = 你的 API key

