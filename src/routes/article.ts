import { Express } from 'express';

import { CS571Route } from "@cs571/f23-api-middleware/src/interfaces/route";
import BadgerArticle from '../model/badger-article';

export class CS571ArticleRoute implements CS571Route {

    public static readonly ROUTE_NAME: string = '/article';

    private readonly articles: BadgerArticle[];
    private readonly presentableArticles: any;

    public constructor(articles: BadgerArticle[]) {
        this.articles = articles;
    }

    public addRoute(app: Express): void {
        app.get(CS571ArticleRoute.ROUTE_NAME, (req, res) => {
            // TODO Get article by query num
            res.status(200).set('Cache-control', 'private, max-age=60').send(undefined);
        })
    }

    public getRouteName(): string {
        return CS571ArticleRoute.ROUTE_NAME;
    }
}