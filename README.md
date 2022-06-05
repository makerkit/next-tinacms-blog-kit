A free and open-source starter by MakerKit.

# Blog Starter Template with Next.js, Tina CMS, MDX and Tailwind CSS

This Blog Starter is the perfect foundation for writing your next blog, portfolio or online publication using Next.js, Tina CMS and Tailwind CSS.

## Features

- ✅ **Responsive, fast and ready-to-deploy Next.js Blog Starter**
- 📄 **Write your articles with all the power of Tina CMS and MDX**
-  ⚡ **Live-reloading MDX content**
- 🚀 **Search Engine Optimized (SEO) out-of-the-box**
- 📂 **Sitemap and RSS generated automatically**
- 🎨 **Dark and Light themes**
- ✨ **Written with strict Typescript, validated with EsLint, formatted with Prettier**
- 👨‍💻 **Developed, maintained and used by [Makerkit](https://makerkit.dev)**

## Getting Started

Clone the repository:

```
git clone https://github.com/makerkit/next-tinacms-blog-kit
```

Rename your project and jump into the folder.

### Install Node dependencies
Install the Node dependencies:

```
npm i
```

### Initialize Tina CMS

Initialize [Tina CMS](https://tina.io/) with the following command:

```
npx @tinacms/cli@latest init
```

When Tina prompts to override your App component, reject by typing "n" (it's already set up):
```
✔ do you want us to override your _app.tsx? … no
```

Decorate the following commands with `--experimentalData` to enable querying and filtering your graphql content with Tina:

```
"dev": "tinacms server:start -c \"next dev\" --experimentalData",
"build": "tinacms server:start -c \"next build\" --experimentalData",
"start": "tinacms server:start -c \"next start\" --experimentalData",
```

### Run the application

Then, run the development server:

```bash
npm run dev
# or
yarn devs
```

1. Visit [http://localhost:3000](http://localhost:3000) to see your blog
2. Visit [http://localhost:3000/admin](http://localhost:3000/admin) to access the Tina CMS admin
3. Visit [http://localhost:4001/altair](http://localhost:4001/altair) to access the GraphqQL playground

### Setting the upstream folder

If you want, reinitialize the git repository and set this repository as your upstream, so you can continue getting updates:

```
rm -rf .git
git init
git remote add upstream https://github.com/makerkit/next-tinacms-blog-kit
```

To keep your repository up-to-date with this, use `git pull`:

```
git pull upstream main 
```

Solve the eventual conflicts and merge 😃

### Configuration

Open the configuration file at `./configuration.ts`. It will have the following content:

```tsx
const configuration = {
  site: {
    name: '',
    description: '',
    themeColor: '',
    siteUrl: '',
    siteName: '',
    twitterHandle: '',
    githubHandle: '',
    language: 'en',
  },
  blog: {
    maxReadMorePosts: 6,
  },
  production: process.env.NODE_ENV === 'production',
};
```

Update it with your own data, or leave as is to begin with.

### Enter the Tina CMS Admin

After starting the development server, access the following URL: https://localhost:3000/admin.

Time to get writing!

### Add Articles, Categories and Authors manually

Before creating a blog post, we define which collection it belongs to and the author of the post.

To define a category, create a JSON file at `content/categories`:

```json
{
  "name": "Tutorials",
  "emoji": "🖥️"
}
```

Alternatively, you can choose to assign a picture to each collection (or neither):

```json
{
  "name": "Tutorials",
  "picture": "/assets/images/tutorials.png"
}
```

Next, we need to add the author of the article. Add a JSON file at `_authors`:

```json
{
  "name": "MakerKit",
  "picture": "/assets/images/makerkit.png",
  "url": "https://twitter.com/makerkit_dev"
}
```

We can now create a blog post. Add an MDX file at `_posts`:

```yaml
---
title: 'Dextera Sibi Orbes'
category: 'content/categories/lorem-ipsum.json'
author: 'content/authors/makerkit.json'
date: 2022-03-30
live: true
image: ''
description: "Lorem markdownum ictu; leti quae, paenituisse venere. Liquet praemia omne di
amarunt dicta."
---
```

As you can see, the properties `category` and `author` are references to the path of each.

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
