import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../../services/movie.service';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie = null;
  imageBaseUrl = environment.images;
  movieDetailImageUrl=null;


  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetails(id).subscribe( res => {
      console.log(res);
      this.movie = res;
      this.movieDetailImageUrl = this.imageBaseUrl + '/w400' + this.movie.poster_path;
      console.log('Bite ->  ' ,this.movieDetailImageUrl);
    });

  }
  openHomepage() {
    window.open(this.movie.homepage);

  }
  openImageUrl() {
    window.open(this.movieDetailImageUrl);
  }


  }
