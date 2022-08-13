# Reproduce the results

1. Setup

Using node 16.15.0

```sh
npm install
cdk deploy
npm run build:local
node invoke.js
```

2. Then execute the Lambda function that was deployed on AWS

3. Compare local & remote results
