import fs from 'fs'

import express, { Express } from 'express';

import { CS571Initializer } from '@cs571/f23-api-middleware'
import BadgerArticle from './model/badger-article';
import { CS571ArticlesRoute } from './routes/articles';
import { CS571ArticleRoute } from './routes/article';

console.log("Welcome to HW8!");

const app: Express = express();

const appBundle = CS571Initializer.init(app, {
  allowNoAuth: [],
  skipAuth: false
});

const parsedArticles = JSON.parse(fs.readFileSync("includes/_articles.json").toString())
const articles = parsedArticles.map((article: any) => new BadgerArticle(
  article.name,
  article.price,
  article.upperLimit,
  article.imgSrc
));


appBundle.router.addRoutes([
  new CS571ArticlesRoute(articles),
  new CS571ArticleRoute(articles)
])

app.listen(appBundle.config.PORT, () => {
  console.log(`Running at :${appBundle.config.PORT}`);
});