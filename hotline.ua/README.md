# Hotline.ua Playwright Tests

## Setup

1. **Create your own `.env` file**

Copy the example environment file:

```bash
cp .env.example .env
```

2. **Add your Hotline.ua credentials**

Edit `.env` and replace placeholders:

```
LOGIN_EMAIL=your-email@example.com
LOGIN_PASSWORD=your-password
```

**Never commit your real `.env` file.** It is gitignored for security.

## Running tests

From the `hotline.ua` directory, run:

```bash
npx playwright test
```

## Notes

- The `.env.example` file provides the required environment variable names.
- Your real `.env` file is ignored by git.
- Credentials are loaded automatically during test runs.