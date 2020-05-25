import { Component, HostBinding, OnInit } from '@angular/core';
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
    
  constructor( private newsapi: NewsApiService, private overlayContainer: OverlayContainer) {
    this.setTheme('indigo-pink', false); // Default Theme
  }

  mArticles: Array<any>;
  mSources: Array<any>;
  allArticles: Array<any>;
  allSources: Array<any>;
  show:boolean = true;


  getData()
  {
     this.newsapi.initArticles().subscribe((data) => {
      debugger;
      this.mArticles = data['articles'];
    }),
      (err) => {
        console.error(err);
        //this.getTestData()
      };
    this.newsapi
      .initSources()
      .subscribe((data) => (this.mSources = data['sources'])),
      (err) => {
        console.error(err);
      // this.getTestData()
      };
  }

  ngOnInit() {
    //load articles
    this.newsapi.initArticles().subscribe(data => this.mArticles = data['articles']);
    //load news sources
    this.newsapi.initSources().subscribe(data => this.mSources = data['sources']);

    this.getData();
  }


  searchArticles(source) {
    console.log("selected source is: " + source);
    this.newsapi.getArticlesByID(source).subscribe(data => this.mArticles = data['articles']);
  }



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
