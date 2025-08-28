# Environment Variables Configuration

## 📁 Files

- `.env` - Development environment (default)
- `.env.staging` - Staging environment  
- `.env.production` - Production environment

## 🚀 Build Commands

### Development (Debug)
```bash
yarn android:debug    # Android debug (sử dụng .env)
yarn ios:debug        # iOS debug (sử dụng .env)
```

### Staging
```bash
yarn android:staging  # Android staging (sử dụng .env.staging)
yarn ios:staging      # iOS staging (sử dụng .env.staging)
```

### Production (Release)
```bash
yarn android:release  # Android release (sử dụng .env.production)
yarn ios:release      # iOS release (sử dụng .env.production)
```

## 💻 Usage in Code

```typescript
import { getEnvironmentConfig } from '@config/environment';

const config = getEnvironmentConfig();

// Access environment variables
const apiUrl = config.api.baseUrl;
const isProduction = config.app.environment === 'production';
const analyticsEnabled = config.features.analytics;
```

## 🔧 Configuration

### Babel Config
Environment variables are automatically loaded based on `NODE_ENV`:
- `development` → `.env`
- `staging` → `env.staging`
- `production` → `env.production`

### Type Definitions
All environment variables are typed in `src/types/env.d.ts`

## 📝 Available Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `API_BASE_URL` | API endpoint URL | `https://api.example.com` |
| `API_TIMEOUT` | API timeout in ms | `30000` |
| `APP_NAME` | Application name | `RNTemplate` |
| `NODE_ENV` | Environment name | `development` |
| `LOG_LEVEL` | Logging level | `debug` |
| `ENABLE_ANALYTICS` | Enable analytics | `true` |

## ⚠️ Important Notes

1. **Never commit `.env` files** - They are in `.gitignore`
2. **Use `env.staging` and `env.production`** for different environments
3. **Restart Metro bundler** after changing environment files
4. **Environment variables are build-time** - Changes require rebuild
