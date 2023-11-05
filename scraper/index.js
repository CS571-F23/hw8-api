import jsdom from 'jsdom'
import fs from 'fs'

const URLS = [
    {
        url: "https://news.wisc.edu/michael-finley-nba-all-star-and-badger-legend-will-address-graduates-at-winter-commencement/",
        img: "finley.jpg",
        tags: ["social"]
    },
    {
        url: "https://news.wisc.edu/ice-cream-flavor-chosen-to-mark-175th-anniversary/",
        img: "ice-cream.jpg",
        tags: ["social"]
    },
    {
        url: "https://news.wisc.edu/from-to-ezacces-your-browser-extension-could-grab-your-password-and-sensitive-info/",
        img: "passwords.jpg",
        tags: ["science"]
    },
    {
        url: "https://news.wisc.edu/common-chemotherapy-drugs-dont-work-like-doctors-thought-with-big-implications-for-drug-discovery/",
        img: "chemo.jpg",
        tags: ["science", "health"]
    },
    {
        url: "https://news.wisc.edu/sharing-discoveries-and-imagining-the-future-at-the-second-annual-sustainability-symposium/",
        img: "sustain.jpg",
        tags: ["science"]
    },
    {
        url: "https://news.wisc.edu/science-on-the-square-a-festival-of-learning/",
        img: "square.jpg",
        tags: ["science", "social"]
    },
    {
        url: "https://news.wisc.edu/wisconsin-designated-as-regional-tech-hub-for-biohealth-with-uw-madison-helping-lead-the-way/",
        img: "bio.jpg",
        tags: ["science"]
    },
    {
        url: "https://news.wisc.edu/conservation-community-and-a-love-for-big-monkeys-karen-strier-celebrates-40-year-study-of-northern-muriqui/",
        img: "muriqui.jpg",
        tags: ["science"]
    },
    {
        url: "https://news.wisc.edu/how-to-approach-the-campus-career-fair/",
        img: "career.jpeg",
        tags: ["social"]
    },
    {
        url: "https://news.wisc.edu/newest-bucky-on-parade/",
        img: "bucky.jpg",
        tags: ["social", "bucky"]
    },
    {
        url: "https://news.wisc.edu/wisconsins-beloved-mascot-returns-to-the-streets-of-madison-in-a-big-way/",
        img: "many_bucky.jpg",
        tags: ["social", "bucky"]
    },
    {
        url: "https://news.wisc.edu/study-finds-mindfulness-training-may-not-be-enough-to-increase-eco-friendliness/",
        img: "mindful.jpg",
        tags: ["health"]
    },
    {
        url: "https://news.wisc.edu/breaking-through-the-noise-of-cellular-signaling/",
        img: "cells.jpg",
        tags: ["health", "science"]
    },
    {
        url: "https://news.wisc.edu/scenes-from-a-spooky-halloween-night/",
        img: "halloween.jpg",
        tags: ["social"]
    },
    {
        url: "https://news.wisc.edu/wisconsin-named-national-center-of-excellence-for-wastewater-surveillance/",
        img: "waste.jpg",
        tags: ["health", "science"]
    },
    {
        url: "https://news.wisc.edu/bakke-center-qualities-nature-wellness-one-stop-shop-and-welcoming-atmosphere/",
        img: "bakke.jpg",
        tags: ["health"]
    }
]

const articles = [];

for(const url of URLS) {
    console.log("Processing " + url.url);
    const resp = await fetch(url.url);
    const data = await resp.text();
    // https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js
    const dom = new jsdom.JSDOM(data);
    const story = dom.window.document.getElementsByClassName("story-body")[0].textContent
        .replace(/(\r?\n)+/g, "\n")
        .replace(/Share via .*/g, "")
        .replace(/Photo by .*/g, "")
        .split("\n")
        .map(cleanStr)
        .filter(t => t)
    const title = dom.window.document.getElementsByClassName("story-head")[0].getElementsByTagName("h1")[0].textContent
    const author = dom.window.document.getElementsByClassName("writer")[0]?.textContent.replace(/By /g, "")
    const dt = dom.window.document.getElementsByClassName("date")[0]?.textContent
    await sleep(500 + Math.ceil(500 * Math.random()))
    articles.push({
        title: cleanStr(title),
        body: story,
        posted: dt ?? "unknown",
        url: url.url,
        author: author ?? "unknown",
        img: url.img,
        tags: url.tags
    })
}

fs.writeFileSync("_articles.json", JSON.stringify(articles, null, 2))

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanStr(s) {
    return s.trim()
        .replace(/“/g, '"')
        .replace(/”/g, '"')
        .replace(/’/g, '\'')
        .replace(/–/g, "-")
        .replace(/ /g, " ")
}