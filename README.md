#Authentication with Express and JSON Web Tokens

This repo is an example of how you would use JSON Web Tokens (JWTs) as part of your app's authentication.  JWTs would replace using cookies, which are stateful.  Also, cookies require a browser environment to work, so would not help for native mobile apps (at least not without some workarounds).  JWTs are more flexible and work in both environments.

You will need:
- Node v6+
- Firebase
