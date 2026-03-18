# Frontend Web Deployment Guide

## Chuẩn bị trước khi deploy

### 1. Kiểm tra file .gitignore
Đảm bảo file `.gitignore` đã có:
```
node_modules/
dist/
.env.local
.env.production.local
```

### 2. Cập nhật package.json
Kiểm tra scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

### 3. Tạo file .env.production
```bash
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Option 1: Deploy lên Vercel (Khuyến nghị cho React)

### Bước 1: Cài Vercel CLI
```bash
npm install -g vercel
```

### Bước 2: Push code lên GitHub
```bash
cd Frontend_web
git init
git add .
git commit -m "Initial frontend commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Bước 3: Deploy qua Vercel Dashboard

#### 3.1. Tạo tài khoản
1. Truy cập https://vercel.com
2. Đăng ký với GitHub

#### 3.2. Import Project
1. Click "Add New..." → "Project"
2. Import GitHub repository Frontend_web
3. Cấu hình:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (hoặc `Frontend_web` nếu monorepo)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### 3.3. Environment Variables
Thêm trong Vercel Dashboard:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### 3.4. Deploy
- Click "Deploy"
- Vercel sẽ build và deploy
- URL: `https://your-project.vercel.app`

### Bước 4: Cấu hình Custom Domain (Optional)
1. Vào Settings → Domains
2. Thêm domain của bạn
3. Cập nhật DNS records theo hướng dẫn

## Option 2: Deploy lên Netlify

### Bước 1: Tạo tài khoản
1. Truy cập https://netlify.com
2. Đăng ký với GitHub

### Bước 2: Deploy

#### 2.1. Qua Netlify Dashboard
1. Click "Add new site" → "Import an existing project"
2. Connect GitHub
3. Chọn repository Frontend_web
4. Cấu hình:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `./` (hoặc `Frontend_web`)

#### 2.2. Environment Variables
Vào Site settings → Environment variables:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

#### 2.3. Deploy
- Click "Deploy site"
- URL: `https://your-site.netlify.app`

### Bước 3: Cấu hình Redirects cho React Router
Tạo file `public/_redirects`:
```
/*    /index.html   200
```

Hoặc tạo file `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Option 3: Deploy lên GitHub Pages

### Bước 1: Cài gh-pages
```bash
npm install --save-dev gh-pages
```

### Bước 2: Cập nhật package.json
```json
{
  "homepage": "https://your-username.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Bước 3: Cập nhật vite.config.ts
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

### Bước 4: Deploy
```bash
npm run deploy
```

## Cấu hình axios baseURL

### Cập nhật Frontend_web/src/apis/axios.ts
```typescript
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ... rest of config
export default instance;
```

## Sau khi deploy

### 1. Test Frontend
- Truy cập URL frontend
- Kiểm tra login/register
- Kiểm tra API calls

### 2. Cập nhật CORS trên Backend
Thêm frontend URL vào CORS whitelist:
```typescript
// Backend/src/server.ts
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.vercel.app',
    'https://your-frontend.netlify.app'
  ],
  credentials: true
}));
```

### 3. Cập nhật Backend Environment Variables
```
CLIENT_URL_PROD=https://your-frontend.vercel.app
```

## Troubleshooting

### Lỗi API Connection
- Kiểm tra VITE_API_URL có đúng không
- Kiểm tra CORS trên backend
- Mở DevTools → Network để xem request

### Lỗi 404 khi refresh page
- Thêm file `_redirects` hoặc `netlify.toml`
- Vercel tự động handle routing

### Lỗi Build Failed
- Kiểm tra `npm run build` chạy được local không
- Xem build logs trên Vercel/Netlify
- Kiểm tra TypeScript errors

### Environment Variables không hoạt động
- Đảm bảo prefix `VITE_` cho Vite
- Rebuild sau khi thêm env vars
- Kiểm tra `import.meta.env.VITE_API_URL`

## Auto Deploy

### Vercel/Netlify
- Mỗi khi push code lên GitHub branch main
- Tự động trigger build và deploy
- Preview deployments cho pull requests

### Disable Auto Deploy
- Vào Settings → Git
- Tắt "Auto Deploy"

## Performance Optimization

### 1. Enable Compression
Vercel/Netlify tự động enable gzip/brotli

### 2. Caching
```toml
# netlify.toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 3. Lazy Loading
Đã implement trong code với React.lazy

## Monitoring

### Vercel Analytics
1. Vào Dashboard → Analytics
2. Enable Web Analytics
3. Xem traffic, performance metrics

### Netlify Analytics
1. Vào Site → Analytics
2. Enable Analytics (có phí)

## Custom Domain

### Vercel
1. Settings → Domains
2. Add domain
3. Update DNS:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### Netlify
1. Domain settings → Add custom domain
2. Update DNS theo hướng dẫn

## SSL Certificate
- Vercel/Netlify tự động cấp SSL certificate miễn phí
- HTTPS được enable tự động
