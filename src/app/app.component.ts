import { Component, HostBinding, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsApiService } from './news-api.service';
import {FormControl} from '@angular/forms';
import {OverlayContainer} from "@angular/cdk/overlay";

const THEME_DARKNESS_SUFFIX = `-dark`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NewsApiService],
})


export class AppComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));


  constructor( 
    private breakpointObserver: BreakpointObserver,
    private newsapi: NewsApiService, 
    private overlayContainer: OverlayContainer) {
    this.setTheme('indigo-pink', false); // Default Theme
  }

    
  mArticles: Array<any>;
  mSources: Array<any>;

  ngOnInit() {
    this.getTestData();
    this.getData();
  }

  getTestData()
  {
    this.mArticles= this.testArticles;
    this.mSources= this.testSources;
  }

  getData()
  {
     this.newsapi.initArticles().subscribe((data) => {
      debugger;
      this.mArticles = data['articles'];
    }),
      (err) => {
        console.error(err);
        this.mArticles = this.testArticles;
      };
    this.newsapi
      .initSources()
      .subscribe((data) => (this.mSources = data['sources'])),
      (err) => {
        console.error(err);
        this.mSources = this.testSources;
      };
  }


  searchArticles(source) {
    console.log('selected source is: ' + source);
    this.newsapi
      .getArticlesByID(source)
      .subscribe((data) => (this.mArticles = data['articles']));
  }

testArticles : Array<any> = [
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Riana Pfefferkorn',
      title:
        'The FBI is mad because it keeps getting into locked iPhones without Apple’s help',
      description:
        'The debate over device encryption isn’t dead, it was merely resting. And it just won’t go away.',
      url:
        'https://techcrunch.com/2020/05/22/the-fbi-is-mad-because-it-keeps-getting-into-locked-iphones-without-apples-help/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/05/GettyImages-1168923033.jpg?w=600',
      publishedAt: '2020-05-22T21:33:05Z',
      content:
        'The debate over encryption continues to drag on without end.\r\nIn recent months, the discourse has largely swung away from encrypted smartphones to focus instead on end-to-end encrypted messaging. But… [+8531 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Darrell Etherington',
      title:
        'How to make the most of your at-home videoconference setup: Microphone edition',
      description:
        'Working from home isn’t going anywhere anytime soon, and a slew of companies just announced longer-term initiatives to make their remote work practices either extend or permanent. That means for some it’s the perfect time to take their at-home videoconferenci…',
      url:
        'https://techcrunch.com/2020/05/22/how-to-make-the-most-of-your-at-home-videoconference-setup-microphone-edition/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/05/mic-three-up-hero.jpg?w=600',
      publishedAt: '2020-05-22T20:03:26Z',
      content:
        'Working from home isn’t going anywhere anytime soon, and a slew of companies just announced longer-term initiatives to make their remote work practices either extend or permanent. That means for some… [+6950 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Kirsten Korosec',
      title:
        'Scale AI releases free lidar dataset to power self-driving car development',
      description:
        'High quality data is the fuel that powers AI algorithms. Without a continual flow of labeled data, bottlenecks can occur and the algorithm will slowly get worse and add risk to the system. It’s why labeled data is so critical for companies like Zoox, Cruise a…',
      url:
        'https://techcrunch.com/2020/05/22/scale-ai-releases-free-lidar-dataset-to-power-self-driving-car-development/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/05/LiDAR-comparison-credit_-Scale-AI.png?w=764',
      publishedAt: '2020-05-22T19:56:39Z',
      content:
        'High quality data is the fuel that powers AI algorithms. Without a continual flow of labeled data, bottlenecks can occur and the algorithm will slowly get worse and add risk to the system.\r\nIt’s why … [+3911 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Greg Kumparak',
      title: 'Box will let employees work from home until at least 2021',
      description:
        'Another tech company is joining the list of those planning on going remote for the long haul: Box . Box CEO Aaron Levie announced this morning that the company will “remain a digital-first organization” moving forward. While it sounds like they’re still worki…',
      url:
        'https://techcrunch.com/2020/05/22/box-will-let-employees-work-from-home-until-at-least-2021/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/04/GettyImages-611385448.jpg?w=600',
      publishedAt: '2020-05-22T19:53:47Z',
      content:
        'Another tech company is joining the list of those planning on going remote for the long haul: Box .\r\nBox CEO Aaron Levie announced this morning that the company will “remain a digital-first organizat… [+1232 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Natasha Lomas',
      title: 'First major GDPR decisions looming on Twitter and Facebook',
      description:
        'The lead data regulator for much of big tech in Europe is moving inexorably towards issuing its first major cross-border GDPR decision — saying today it’s submitted a draft decision related to Twitter’s business to its fellow EU watchdogs for review. “The dra…',
      url:
        'https://techcrunch.com/2020/05/22/first-major-gdpr-decisions-looming-on-twitter-and-facebook/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/03/GettyImages-1055352580.jpg?w=601',
      publishedAt: '2020-05-22T19:30:19Z',
      content:
        'The lead data regulator for much of big tech in Europe is moving inexorably towards issuing its first major cross-border GDPR decision — saying today it’s submitted a draft decision related to Twitte… [+8527 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Devin Coldewey',
      title:
        'Minecraft Dungeons has charm and potential, but needs lot more time in the furnace',
      description:
        'Minecraft is one of the popular games on the planet, so it’s natural that Microsoft, after buying creator Mojang some years back, would attempt to apply the genre’s playful, blocky aesthetic to other genres. After modest success with the Story Mode adventure …',
      url:
        'https://techcrunch.com/2020/05/22/minecraft-dungeons-has-charm-and-potential-but-needs-lot-more-time-in-the-furnace/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/05/minecraft-dungeons-3.jpg?w=686',
      publishedAt: '2020-05-22T19:28:48Z',
      content:
        'Minecraft is one of the popular games on the planet, so it’s natural that Microsoft, after buying creator Mojang some years back, would attempt to apply the genre’s playful, blocky aesthetic to other… [+8448 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Danny Crichton, Alex Wilhelm, Natasha Mascarenhas',
      title:
        '3 views on the life and death of college towns, remote work and the future of startup hubs',
      description:
        'The global pandemic has halted travel, shunted schools online and shut down many cities, but the future of college-town America is an area of deep concern for the startup world. College towns have done exceedingly well with the rise of the knowledge economy a…',
      url:
        'https://techcrunch.com/2020/05/22/3-views-on-the-life-and-death-of-college-towns-remote-work-and-the-future-of-startup-hubs/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/05/GettyImages-1216618760.jpg?w=712',
      publishedAt: '2020-05-22T19:00:03Z',
      content:
        'The global pandemic has halted travel, shunted schools online and shut down many cities, but the future of college-town America is an area of deep concern for the startup world.\r\nCollege towns have d… [+1996 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Darrell Etherington',
      title:
        "SpaceX's first crewed spacecraft launch is officially cleared to proceed on May 27",
      description:
        'SpaceX has received approval on its mission to launch NASA astronauts for the first time ever on May 27, having passed the final Flight Readiness Review (FRR) conduced by the agency to ensure everything is go for launch. This final check, conducted over the p…',
      url:
        'https://techcrunch.com/2020/05/22/spacexs-first-crewed-spacecraft-launch-is-officially-cleared-to-proceed-on-may-27/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2020/05/crew-demo-2-spacex.jpg?w=732',
      publishedAt: '2020-05-22T18:35:44Z',
      content:
        'SpaceX has received approval on its mission to launch NASA astronauts for the first time ever on May 27, having passed the final Flight Readiness Review (FRR) conduced by the agency to ensure everyth… [+2180 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Neesha A. Tambe',
      title:
        'Startup Battlefield is going virtual with TechCrunch Disrupt 2020',
      description:
        'You read that right. The big announcement came yesterday – TechCrunch Disrupt is now fully virtual. What does this mean for Startup Battlefield? More opportunity. The best companies from across the globe, an even bigger launch platform, the eyes of more inves…',
      url:
        'https://techcrunch.com/2020/05/22/startup-battlefield-is-going-virtual-with-techcrunch-disrupt-2020/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2015/08/9726191699_6ba4b89744_o.jpg?w=601',
      publishedAt: '2020-05-22T17:05:10Z',
      content:
        'You read that right. The big announcement came yesterday – TechCrunch Disrupt is now fully virtual. What does this mean for Startup Battlefield? More opportunity. The best companies from across the g… [+3913 chars]',
    },
    {
      source: {
        id: 'techcrunch',
        name: 'TechCrunch',
      },
      author: 'Brian Heater',
      title:
        'Netflix’s beloved animated series Tuca & Bertie is getting a second life on Adult Swim',
      description:
        'Tuca & Bertie was wonderful. It was a hilarious and heartfelt examination of adult relationships, coupled with whimsical animated visuals. And like most good things in this world, it was simple too beautiful to live. The Netflix series, which starred comedian…',
      url:
        'https://techcrunch.com/2020/05/22/netflixs-beloved-animated-series-tuca-bertie-is-getting-a-second-life-on-adult-swim/',
      urlToImage:
        'https://techcrunch.com/wp-content/uploads/2019/06/tuca-bertie.jpg?w=710',
      publishedAt: '2020-05-22T17:04:28Z',
      content:
        'Tuca &amp; Bertie was wonderful. It was a hilarious and heartfelt examination of adult relationships, coupled with whimsical animated visuals. And like most good things in this world, it was simple t… [+1012 chars]',
    },
  ];

testSources : Array<any>= [
    {
      id: 'abc-news',
      name: 'ABC News',
      description:
        'Your trusted source for breaking news, analysis, exclusive interviews, headlines, and videos at ABCNews.com.',
      url: 'https://abcnews.go.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'abc-news-au',
      name: 'ABC News (AU)',
      description:
        "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
      url: 'http://www.abc.net.au/news',
      category: 'general',
      language: 'en',
      country: 'au',
    },
    {
      id: 'al-jazeera-english',
      name: 'Al Jazeera English',
      description:
        'News, analysis from the Middle East and worldwide, multimedia and interactives, opinions, documentaries, podcasts, long reads and broadcast schedule.',
      url: 'http://www.aljazeera.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'ars-technica',
      name: 'Ars Technica',
      description:
        "The PC enthusiast's resource. Power users and the tools they love, without computing religion.",
      url: 'http://arstechnica.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'associated-press',
      name: 'Associated Press',
      description:
        'The AP delivers in-depth coverage on the international, politics, lifestyle, business, and entertainment news.',
      url: 'https://apnews.com/',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'australian-financial-review',
      name: 'Australian Financial Review',
      description:
        'The Australian Financial Review reports the latest news from business, finance, investment and politics, updated in real time. It has a reputation for independent, award-winning journalism and is essential reading for the business and investor community.',
      url: 'http://www.afr.com',
      category: 'business',
      language: 'en',
      country: 'au',
    },
    {
      id: 'axios',
      name: 'Axios',
      description:
        'Axios are a new media company delivering vital, trustworthy news and analysis in the most efficient, illuminating and shareable ways possible.',
      url: 'https://www.axios.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'bbc-news',
      name: 'BBC News',
      description:
        'Use BBC News for up-to-the-minute news, breaking news, video, audio and feature stories. BBC News provides trusted World and UK news as well as local and regional perspectives. Also entertainment, business, science, technology and health news.',
      url: 'http://www.bbc.co.uk/news',
      category: 'general',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'bbc-sport',
      name: 'BBC Sport',
      description:
        'The home of BBC Sport online. Includes live sports coverage, breaking news, results, video, audio and analysis on Football, F1, Cricket, Rugby Union, Rugby League, Golf, Tennis and all the main world sports, plus major events such as the Olympic Games.',
      url: 'http://www.bbc.co.uk/sport',
      category: 'sports',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'bleacher-report',
      name: 'Bleacher Report',
      description:
        'Sports journalists and bloggers covering NFL, MLB, NBA, NHL, MMA, college football and basketball, NASCAR, fantasy sports and more. News, photos, mock drafts, game scores, player profiles and more!',
      url: 'http://www.bleacherreport.com',
      category: 'sports',
      language: 'en',
      country: 'us',
    },
    {
      id: 'bloomberg',
      name: 'Bloomberg',
      description:
        'Bloomberg delivers business and markets news, data, analysis, and video to the world, featuring stories from Businessweek and Bloomberg News.',
      url: 'http://www.bloomberg.com',
      category: 'business',
      language: 'en',
      country: 'us',
    },
    {
      id: 'breitbart-news',
      name: 'Breitbart News',
      description:
        'Syndicated news and opinion website providing continuously updated headlines to top news and analysis sources.',
      url: 'http://www.breitbart.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'business-insider',
      name: 'Business Insider',
      description:
        'Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.',
      url: 'http://www.businessinsider.com',
      category: 'business',
      language: 'en',
      country: 'us',
    },
    {
      id: 'business-insider-uk',
      name: 'Business Insider (UK)',
      description:
        'Business Insider is a fast-growing business site with deep financial, media, tech, and other industry verticals. Launched in 2007, the site is now the largest business news site on the web.',
      url: 'http://uk.businessinsider.com',
      category: 'business',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'buzzfeed',
      name: 'Buzzfeed',
      description:
        'BuzzFeed is a cross-platform, global network for news and entertainment that generates seven billion views each month.',
      url: 'https://www.buzzfeed.com',
      category: 'entertainment',
      language: 'en',
      country: 'us',
    },
    {
      id: 'cbc-news',
      name: 'CBC News',
      description:
        "CBC News is the division of the Canadian Broadcasting Corporation responsible for the news gathering and production of news programs on the corporation's English-language operations, namely CBC Television, CBC Radio, CBC News Network, and CBC.ca.",
      url: 'http://www.cbc.ca/news',
      category: 'general',
      language: 'en',
      country: 'ca',
    },
    {
      id: 'cbs-news',
      name: 'CBS News',
      description:
        'CBS News: dedicated to providing the best in journalism under standards it pioneered at the dawn of radio and television and continue in the digital age.',
      url: 'http://www.cbsnews.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'cnn',
      name: 'CNN',
      description:
        'View the latest news and breaking news today for U.S., world, weather, entertainment, politics and health at CNN',
      url: 'http://us.cnn.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'crypto-coins-news',
      name: 'Crypto Coins News',
      description:
        'Providing breaking cryptocurrency news - focusing on Bitcoin, Ethereum, ICOs, blockchain technology, and smart contracts.',
      url: 'https://www.ccn.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'engadget',
      name: 'Engadget',
      description:
        'Engadget is a web magazine with obsessive daily coverage of everything new in gadgets and consumer electronics.',
      url: 'https://www.engadget.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'entertainment-weekly',
      name: 'Entertainment Weekly',
      description:
        'Online version of the print magazine includes entertainment news, interviews, reviews of music, film, TV and books, and a special area for magazine subscribers.',
      url: 'http://www.ew.com',
      category: 'entertainment',
      language: 'en',
      country: 'us',
    },
    {
      id: 'espn',
      name: 'ESPN',
      description:
        'ESPN has up-to-the-minute sports news coverage, scores, highlights and commentary for NFL, MLB, NBA, College Football, NCAA Basketball and more.',
      url: 'http://espn.go.com',
      category: 'sports',
      language: 'en',
      country: 'us',
    },
    {
      id: 'espn-cric-info',
      name: 'ESPN Cric Info',
      description:
        'ESPN Cricinfo provides the most comprehensive cricket coverage available including live ball-by-ball commentary, news, unparalleled statistics, quality editorial comment and analysis.',
      url: 'http://www.espncricinfo.com/',
      category: 'sports',
      language: 'en',
      country: 'us',
    },
    {
      id: 'financial-post',
      name: 'Financial Post',
      description:
        'Find the latest happenings in the Canadian Financial Sector and stay up to date with changing trends in Business Markets. Read trading and investing advice from professionals.',
      url: 'http://business.financialpost.com',
      category: 'business',
      language: 'en',
      country: 'ca',
    },
    {
      id: 'football-italia',
      name: 'Football Italia',
      description:
        'Italian football news, analysis, fixtures and results for the latest from Serie A, Serie B and the Azzurri.',
      url: 'http://www.football-italia.net',
      category: 'sports',
      language: 'en',
      country: 'it',
    },
    {
      id: 'fortune',
      name: 'Fortune',
      description: 'Fortune 500 Daily and Breaking Business News',
      url: 'http://fortune.com',
      category: 'business',
      language: 'en',
      country: 'us',
    },
    {
      id: 'four-four-two',
      name: 'FourFourTwo',
      description:
        'The latest football news, in-depth features, tactical and statistical analysis from FourFourTwo, the UK&#039;s favourite football monthly.',
      url: 'http://www.fourfourtwo.com/news',
      category: 'sports',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'fox-news',
      name: 'Fox News',
      description:
        'Breaking News, Latest News and Current News from FOXNews.com. Breaking news and video. Latest Current News: U.S., World, Entertainment, Health, Business, Technology, Politics, Sports.',
      url: 'http://www.foxnews.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'fox-sports',
      name: 'Fox Sports',
      description:
        'Find live scores, player and team news, videos, rumors, stats, standings, schedules and fantasy games on FOX Sports.',
      url: 'http://www.foxsports.com',
      category: 'sports',
      language: 'en',
      country: 'us',
    },
    {
      id: 'google-news',
      name: 'Google News',
      description:
        'Comprehensive, up-to-date news coverage, aggregated from sources all over the world by Google News.',
      url: 'https://news.google.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'google-news-au',
      name: 'Google News (Australia)',
      description:
        'Comprehensive, up-to-date Australia news coverage, aggregated from sources all over the world by Google News.',
      url: 'https://news.google.com',
      category: 'general',
      language: 'en',
      country: 'au',
    },
    {
      id: 'google-news-ca',
      name: 'Google News (Canada)',
      description:
        'Comprehensive, up-to-date Canada news coverage, aggregated from sources all over the world by Google News.',
      url: 'https://news.google.com',
      category: 'general',
      language: 'en',
      country: 'ca',
    },
    {
      id: 'google-news-in',
      name: 'Google News (India)',
      description:
        'Comprehensive, up-to-date India news coverage, aggregated from sources all over the world by Google News.',
      url: 'https://news.google.com',
      category: 'general',
      language: 'en',
      country: 'in',
    },
    {
      id: 'google-news-uk',
      name: 'Google News (UK)',
      description:
        'Comprehensive, up-to-date UK news coverage, aggregated from sources all over the world by Google News.',
      url: 'https://news.google.com',
      category: 'general',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'hacker-news',
      name: 'Hacker News',
      description:
        'Hacker News is a social news website focusing on computer science and entrepreneurship. It is run by Paul Graham\'s investment fund and startup incubator, Y Combinator. In general, content that can be submitted is defined as "anything that gratifies one\'s intellectual curiosity".',
      url: 'https://news.ycombinator.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'ign',
      name: 'IGN',
      description:
        'IGN is your site for Xbox One, PS4, PC, Wii-U, Xbox 360, PS3, Wii, 3DS, PS Vita and iPhone games with expert reviews, news, previews, trailers, cheat codes, wiki guides and walkthroughs.',
      url: 'http://www.ign.com',
      category: 'entertainment',
      language: 'en',
      country: 'us',
    },
    {
      id: 'independent',
      name: 'Independent',
      description:
        'National morning quality (tabloid) includes free online access to news and supplements. Insight by Robert Fisk and various other columnists.',
      url: 'http://www.independent.co.uk',
      category: 'general',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'mashable',
      name: 'Mashable',
      description:
        'Mashable is a global, multi-platform media and entertainment company.',
      url: 'https://mashable.com',
      category: 'entertainment',
      language: 'en',
      country: 'us',
    },
    {
      id: 'medical-news-today',
      name: 'Medical News Today',
      description:
        'Medical news and health news headlines posted throughout the day, every day.',
      url: 'http://www.medicalnewstoday.com',
      category: 'health',
      language: 'en',
      country: 'us',
    },
    {
      id: 'msnbc',
      name: 'MSNBC',
      description:
        'Breaking news and in-depth analysis of the headlines, as well as commentary and informed perspectives from The Rachel Maddow Show, Morning Joe & more.',
      url: 'http://www.msnbc.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'mtv-news',
      name: 'MTV News',
      description:
        "The ultimate news source for music, celebrity, entertainment, movies, and current events on the web. It's pop culture on steroids.",
      url: 'http://www.mtv.com/news',
      category: 'entertainment',
      language: 'en',
      country: 'us',
    },
    {
      id: 'mtv-news-uk',
      name: 'MTV News (UK)',
      description:
        'All the latest celebrity news, gossip, exclusive interviews and pictures from the world of music and entertainment.',
      url: 'http://www.mtv.co.uk/news',
      category: 'entertainment',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'national-geographic',
      name: 'National Geographic',
      description:
        'Reporting our world daily: original nature and science news from National Geographic.',
      url: 'http://news.nationalgeographic.com',
      category: 'science',
      language: 'en',
      country: 'us',
    },
    {
      id: 'national-review',
      name: 'National Review',
      description:
        'National Review: Conservative News, Opinion, Politics, Policy, & Current Events.',
      url: 'https://www.nationalreview.com/',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'nbc-news',
      name: 'NBC News',
      description:
        'Breaking news, videos, and the latest top stories in world news, business, politics, health and pop culture.',
      url: 'http://www.nbcnews.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'news24',
      name: 'News24',
      description:
        "South Africa's premier news source, provides breaking news on national, world, Africa, sport, entertainment, technology and more.",
      url: 'http://www.news24.com',
      category: 'general',
      language: 'en',
      country: 'za',
    },
    {
      id: 'new-scientist',
      name: 'New Scientist',
      description:
        'Breaking science and technology news from around the world. Exclusive stories and expert analysis on space, technology, health, physics, life and Earth.',
      url: 'https://www.newscientist.com/section/news',
      category: 'science',
      language: 'en',
      country: 'us',
    },
    {
      id: 'news-com-au',
      name: 'News.com.au',
      description:
        'We say what people are thinking and cover the issues that get people talking balancing Australian and global moments — from politics to pop culture.',
      url: 'http://www.news.com.au',
      category: 'general',
      language: 'en',
      country: 'au',
    },
    {
      id: 'newsweek',
      name: 'Newsweek',
      description:
        'Newsweek provides in-depth analysis, news and opinion about international issues, technology, business, culture and politics.',
      url: 'https://www.newsweek.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'new-york-magazine',
      name: 'New York Magazine',
      description:
        'NYMAG and New York magazine cover the new, the undiscovered, the next in politics, culture, food, fashion, and behavior nationally, through a New York lens.',
      url: 'http://nymag.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'next-big-future',
      name: 'Next Big Future',
      description:
        'Coverage of science and technology that have the potential for disruption, and analysis of plans, policies, and technology that enable radical improvement.',
      url: 'https://www.nextbigfuture.com',
      category: 'science',
      language: 'en',
      country: 'us',
    },
    {
      id: 'nfl-news',
      name: 'NFL News',
      description:
        'The official source for NFL news, schedules, stats, scores and more.',
      url: 'http://www.nfl.com/news',
      category: 'sports',
      language: 'en',
      country: 'us',
    },
    {
      id: 'nhl-news',
      name: 'NHL News',
      description:
        'The most up-to-date breaking hockey news from the official source including interviews, rumors, statistics and schedules.',
      url: 'https://www.nhl.com/news',
      category: 'sports',
      language: 'en',
      country: 'us',
    },
    {
      id: 'politico',
      name: 'Politico',
      description:
        'Political news about Congress, the White House, campaigns, lobbyists and issues.',
      url: 'https://www.politico.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'polygon',
      name: 'Polygon',
      description:
        'Polygon is a gaming website in partnership with Vox Media. Our culture focused site covers games, their creators, the fans, trending stories and entertainment news.',
      url: 'http://www.polygon.com',
      category: 'entertainment',
      language: 'en',
      country: 'us',
    },
    {
      id: 'recode',
      name: 'Recode',
      description:
        'Get the latest independent tech news, reviews and analysis from Recode with the most informed and respected journalists in technology and media.',
      url: 'http://www.recode.net',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'reddit-r-all',
      name: 'Reddit /r/all',
      description:
        "Reddit is an entertainment, social news networking service, and news website. Reddit's registered community members can submit content, such as text posts or direct links.",
      url: 'https://www.reddit.com/r/all',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'reuters',
      name: 'Reuters',
      description:
        'Reuters.com brings you the latest news from around the world, covering breaking news in business, politics, entertainment, technology, video and pictures.',
      url: 'http://www.reuters.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'rte',
      name: 'RTE',
      description:
        "Get all of the latest breaking local and international news stories as they happen, with up to the minute updates and analysis, from Ireland's National Broadcaster.",
      url: 'https://www.rte.ie/news',
      category: 'general',
      language: 'en',
      country: 'ie',
    },
    {
      id: 'talksport',
      name: 'TalkSport',
      description:
        "Tune in to the world's biggest sports radio station - Live Premier League football coverage, breaking sports news, transfer rumours &amp; exclusive interviews.",
      url: 'http://talksport.com',
      category: 'sports',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'techcrunch',
      name: 'TechCrunch',
      description:
        'TechCrunch is a leading technology media property, dedicated to obsessively profiling startups, reviewing new Internet products, and breaking tech news.',
      url: 'https://techcrunch.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'techradar',
      name: 'TechRadar',
      description:
        'The latest technology news and reviews, covering computing, home entertainment systems, gadgets and more.',
      url: 'http://www.techradar.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-american-conservative',
      name: 'The American Conservative',
      description:
        'Realism and reform. A new voice for a new generation of conservatives.',
      url: 'http://www.theamericanconservative.com/',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-globe-and-mail',
      name: 'The Globe And Mail',
      description:
        'The Globe and Mail offers the most authoritative news in Canada, featuring national and international news.',
      url: 'https://www.theglobeandmail.com',
      category: 'general',
      language: 'en',
      country: 'ca',
    },
    {
      id: 'the-hill',
      name: 'The Hill',
      description:
        'The Hill is a top US political website, read by the White House and more lawmakers than any other site -- vital for policy, politics and election campaigns.',
      url: 'http://thehill.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-hindu',
      name: 'The Hindu',
      description:
        "The Hindu. latest news, analysis, comment, in-depth coverage of politics, business, sport, environment, cinema and arts from India's national newspaper.",
      url: 'http://www.thehindu.com',
      category: 'general',
      language: 'en',
      country: 'in',
    },
    {
      id: 'the-huffington-post',
      name: 'The Huffington Post',
      description:
        'The Huffington Post is a politically liberal American online news aggregator and blog that has both localized and international editions founded by Arianna Huffington, Kenneth Lerer, Andrew Breitbart, and Jonah Peretti, featuring columnists.',
      url: 'http://www.huffingtonpost.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-irish-times',
      name: 'The Irish Times',
      description:
        'The Irish Times online. Latest news including sport, analysis, business, weather and more from the definitive brand of quality news in Ireland.',
      url: 'https://www.irishtimes.com',
      category: 'general',
      language: 'en',
      country: 'ie',
    },
    {
      id: 'the-jerusalem-post',
      name: 'The Jerusalem Post',
      description:
        'The Jerusalem Post is the leading online newspaper for English speaking Jewry since 1932, bringing news and updates from the Middle East and all over the Jewish world.',
      url: 'https://www.jpost.com/',
      category: 'general',
      language: 'en',
      country: 'is',
    },
    {
      id: 'the-lad-bible',
      name: 'The Lad Bible',
      description:
        'The LAD Bible is one of the largest community for guys aged 16-30 in the world. Send us your funniest pictures and videos!',
      url: 'https://www.theladbible.com',
      category: 'entertainment',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'the-next-web',
      name: 'The Next Web',
      description:
        'The Next Web is one of the world’s largest online publications that delivers an international perspective on the latest news about Internet technology, business and culture.',
      url: 'http://thenextweb.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-sport-bible',
      name: 'The Sport Bible',
      description:
        'TheSPORTbible is one of the largest communities for sports fans across the world. Send us your sporting pictures and videos!',
      url: 'https://www.thesportbible.com',
      category: 'sports',
      language: 'en',
      country: 'gb',
    },
    {
      id: 'the-times-of-india',
      name: 'The Times of India',
      description:
        'Times of India brings the Latest News and Top Breaking headlines on Politics and Current Affairs in India and around the World, Sports, Business, Bollywood News and Entertainment, Science, Technology, Health and Fitness news, Cricket and opinions from leading columnists.',
      url: 'http://timesofindia.indiatimes.com',
      category: 'general',
      language: 'en',
      country: 'in',
    },
    {
      id: 'the-verge',
      name: 'The Verge',
      description:
        'The Verge covers the intersection of technology, science, art, and culture.',
      url: 'http://www.theverge.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-wall-street-journal',
      name: 'The Wall Street Journal',
      description:
        'WSJ online coverage of breaking news and current headlines from the US and around the world. Top stories, photos, videos, detailed analysis and in-depth reporting.',
      url: 'http://www.wsj.com',
      category: 'business',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-washington-post',
      name: 'The Washington Post',
      description:
        'Breaking news and analysis on politics, business, world national news, entertainment more. In-depth DC, Virginia, Maryland news coverage including traffic, weather, crime, education, restaurant reviews and more.',
      url: 'https://www.washingtonpost.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'the-washington-times',
      name: 'The Washington Times',
      description:
        'The Washington Times delivers breaking news and commentary on the issues that affect the future of our nation.',
      url: 'https://www.washingtontimes.com/',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'time',
      name: 'Time',
      description:
        'Breaking news and analysis from TIME.com. Politics, world news, photos, video, tech reviews, health, science and entertainment news.',
      url: 'http://time.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'usa-today',
      name: 'USA Today',
      description:
        'Get the latest national, international, and political news at USATODAY.com.',
      url: 'http://www.usatoday.com/news',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'vice-news',
      name: 'Vice News',
      description:
        'Vice News is Vice Media, Inc.\'s current affairs channel, producing daily documentary essays and video through its website and YouTube channel. It promotes itself on its coverage of "under - reported stories".',
      url: 'https://news.vice.com',
      category: 'general',
      language: 'en',
      country: 'us',
    },
    {
      id: 'wired',
      name: 'Wired',
      description:
        'Wired is a monthly American magazine, published in print and online editions, that focuses on how emerging technologies affect culture, the economy, and politics.',
      url: 'https://www.wired.com',
      category: 'technology',
      language: 'en',
      country: 'us',
    },
  ];



  // mArticles: Array<any>;
  // mSources: Array<any>;
  // allArticles: Array<any>;
  // allSources: Array<any>;
  // show:boolean = true;


  // getData()
  // {
  //    this.newsapi.initArticles().subscribe((data) => {
  //     debugger;
  //     this.mArticles = data['articles'];
  //   }),
  //     (err) => {
  //       console.error(err);
  //       //this.getTestData()
  //     };
  //   this.newsapi
  //     .initSources()
  //     .subscribe((data) => (this.mSources = data['sources'])),
  //     (err) => {
  //       console.error(err);
  //     // this.getTestData()
  //     };
  // }

  // ngOnInit() {
  //   //load articles
  //   this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
  //   //load news sources
  //   this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);

  //   this.getData();
  // }


  // searchArticles(source) {
  //   console.log("selected source is: " + source);
  //   this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  // }



// THEME
  themes: string[] = [
		"deeppurple-amber",
		"indigo-pink",
		"pink-bluegrey",
		"purple-green",
	];

  @HostBinding('class') activeThemeCssClass: string;
	isThemeDark = false;
	activeTheme: string;

    
  setTheme(theme: string, darkness: boolean = null) {
		if (darkness === null)
			darkness = this.isThemeDark;
		else if (this.isThemeDark === darkness) {
			if (this.activeTheme === theme) return;
		} else
			this.isThemeDark = darkness;
		
		this.activeTheme = theme;
		
		const cssClass = darkness === true ? theme + THEME_DARKNESS_SUFFIX : theme;
		
		const classList = this.overlayContainer.getContainerElement().classList;
		if (classList.contains(this.activeThemeCssClass))
			classList.replace(this.activeThemeCssClass, cssClass);
		else
			classList.add(cssClass);
		
		this.activeThemeCssClass = cssClass;
	}
	
	toggleDarkness() {
		this.setTheme(this.activeTheme, !this.isThemeDark);
	}
}
