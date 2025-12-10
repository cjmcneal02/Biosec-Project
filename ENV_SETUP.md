# Environment Setup for OpenAI Integration

## Required Steps

1. Create a `.env.local` file in the root directory of the project

2. Add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Get your API key from: https://platform.openai.com/api-keys

4. The `.env.local` file is already in `.gitignore`, so it won't be committed to version control.

5. Restart your development server after adding the API key:
   ```bash
   npm run dev
   ```

## Notes

- The app will automatically fall back to mock AI if the API key is not configured or if API calls fail
- All OpenAI API calls are made server-side through Next.js API routes for security
- Using `gpt-3.5-turbo` model for cost efficiency

