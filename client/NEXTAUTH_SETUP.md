# NextAuth.js Setup Guide

## ✅ Что сделано:

- Удален Clerk
- Установлен NextAuth.js
- Создана базовая конфигурация
- Обновлены компоненты

## 🔧 Настройка OAuth провайдера:

### Google OAuth:

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google+ API
4. Создайте OAuth 2.0 credentials
5. Добавьте authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (для разработки)
   - `https://your-domain.vercel.app/api/auth/callback/google` (для продакшена)

## 🔑 Environment Variables:

### Локальная разработка (.env):

```env
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Vercel Production:

В Vercel Dashboard → Settings → Environment Variables добавьте:

```env
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🔐 Генерация NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

## 🚀 Запуск:

```bash
npm run dev
```

## ✅ Преимущества NextAuth:

- ✅ Бесплатный
- ✅ Поддерживает Vercel домены
- ✅ Множество провайдеров
- ✅ Простая настройка
- ✅ Хорошая документация
