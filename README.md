# fennecs ECS documentation
This is a [VitePress](https://vitepress.dev) static site generator to create the website and documentation seen on [fennecs.net](https://fennecs.net)

A GitHub action will integrate all changes made to `main` and deploy a new website to the appropriate S3 bucket.

## Developing
```bash
npm run dev
```

### Deploying (from local or CI)
```bash
npm run deploy
```
or
```bash
npm run build
npm run upload
npm run invalidate
```

# Important
To build the site, you also need [**fenn**ecs](https://github.com/outfox/fennecs) checked out in the same parent directory as this project, i.e. the relative path `../fennecs`.

This is necessary because the site includes source code snippets from fennecs during static sitegeneration.
