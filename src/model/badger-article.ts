import crypto from 'crypto'

export default class BadgerArticle {
    readonly id: string;
    readonly name: string;
    readonly price: number;
    readonly upperLimit: number;
    readonly imgSrc: string;

    public constructor(name: string, price: number, upperLimit: number, imgSrc: string) {
        this.id = crypto.createHash('sha256').update(name + String(price) + String(upperLimit) + imgSrc).digest('hex').substring(0,12);
        this.name = name;
        this.price = price;
        this.upperLimit =  upperLimit;
        this.imgSrc = imgSrc;
    }
}