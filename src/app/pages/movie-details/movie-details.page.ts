import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AlertController, LoadingController} from '@ionic/angular';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie = null;
  imageBaseUrl = environment.images;
  movieDetailImageUrl: string = null;
  data = null;


  constructor(private route: ActivatedRoute,
              private movieService: MovieService,
              private http: HttpClient,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe( res => {
      console.log(res);
      this.movie = res;
     // this.movieDetailImageUrl = 'https://cors-anywhere.herokuapp.com/'+this.imageBaseUrl + '/w400' + this.movie.poster_path;
      this.movieDetailImageUrl = this.imageBaseUrl + '/w400' + this.movie.poster_path;
      console.log(this.movie.release_date);
    });

  }
  openHomepage() {
    window.open(this.movie.homepage);

  }
  openImageUrl() {
    window.open(this.movieDetailImageUrl);
  }
  openHtml(){
    this.getData(this.movieDetailImageUrl);
  }

  async getData(httpLink: string){
      const loading = await this.loadingCtrl.create({
        message: 'Loading data ...'
      });
      await loading.present();
      const url ='https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations';
      //
      this.http.get('https://cors-anywhere.herokuapp.com/https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations').subscribe(
        async res=>{
        await loading.dismiss();
        this.data = res;
      },async err=> {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: err.message,
          buttons: ['OK']
        });
        await alert.present();
      });
  }


  }
