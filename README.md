For the gallery:

## Environment Variables

This project requires the following environments for the fetch instagram posts:

```
Go to settings -> Secrets and variables sidebar -> Actions
1. Secrets tab:
Environment secrets - >INSTAGRAM_ACCESS_TOKEN (your actual token)
Repository secrets -> INSTAGRAM_ACCESS_TOKEN (your actual token)

2. Variables tab:
Name: INSTAGRAM_ACCESS_TOKEN

Value:
env:
INSTAGRAM_ACCESS_TOKEN: $ {{ secrets.INSTAGRAM_ACCESS_TOKEN }}
```

Make sure to:
1. Create a `.gitignore` file in the root directory  (click add new file and paste relevant text)
2. Create a '.github/workflows/instagram.yml' (click add new file and paste relevant text)
3. Add your Instagram access token as mentioned above
4. Never commit hard coded tokens like in the example gallery_Local_Token.html
