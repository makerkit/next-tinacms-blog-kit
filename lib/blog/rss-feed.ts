/*
- This file gets processed by ts-node as a post-build script
- Please leave the file imports as relative
 */

import { Feed } from 'feed';
import { writeFile } from 'fs';
import { promisify } from 'util';
import 'isomorphic-fetch';

import configuration from '../../configuration';
import BlogPost from './blog-post';
import { getPosts } from './queries';

const writeFileAsync = promisify(writeFile);

const DEFAULT_RSS_PATH = 'public/rss.xml';
const DEFAULT_JSON_PATH = 'public/rss.json';
const DEFAULT_ATOM_PATH = 'public/atom.xml';

async function generateRSSFeed(posts: BlogPost[]) {
  const baseUrl = configuration.site.siteUrl;
  const description = configuration.site.description;
  const title = `${configuration.site.name} - Blog`;

  const author = {
    email: ``,
    link: configuration.site.twitterHandle,
  };

  const feed = new Feed({
    title,
    description,
    id: baseUrl,
    link: baseUrl,
    favicon: `${baseUrl}/assets/favicon/favicon.ico`,
    language: configuration.site.language ?? `en`,
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
      json: `${baseUrl}/rss.json`,
      atom: `${baseUrl}/atom.xml`,
    },
    author,
    copyright: '',
  });

  for (const post of posts) {
    const { date, slug, title, description, category, image, live } = post;

    if (!live) {
      continue;
    }

    const url = `${baseUrl}/${category.slug}/${slug}`;

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      content: '',
      author: [author],
      date: new Date(date),
      image: `${baseUrl}/${image}`,
    });
  }

  await Promise.all([
    writeFileAsync(DEFAULT_RSS_PATH, feed.rss2()),
    writeFileAsync(DEFAULT_ATOM_PATH, feed.atom1()),
    writeFileAsync(DEFAULT_JSON_PATH, feed.json1()),
  ]);
}

async function main() {
  console.log(`Generating RSS Feed...`);

  try {
    const posts = await getPosts({
      shouldDisplayAllPosts: false,
    });

    await generateRSSFeed(posts);

    console.log(`RSS Feed generated successfully...`);
    process.exit(0);
  } catch (e) {
    console.error(e);
    console.error(`RSS Feed not generated: ${JSON.stringify(e)}`);
    process.exit(1);
  }
}

void main();
