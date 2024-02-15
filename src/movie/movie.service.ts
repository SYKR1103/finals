import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Column, Repository } from 'typeorm';
import { PageOptionsDto } from '../dtos/page-options.dto';
import { PageMetaDto } from '../dtos/page-meta.dto';
import { PageDto } from '../dtos/page.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async createMovie() {
    const { data, status } = await this.httpService
      .get(this.configService.get('TMDB_URL'), {
        headers: { Authorization: this.configService.get('TMDB_KEY') },
      })
      .toPromise();

    if (status === 200) {
      const datas = data.results;
      const movielist = [];

      datas?.map((data) =>
        movielist.push({
          title: data['title'],
          overview: data['overview'],
          release_data: data['release_data'],
          adult: data['adult'],
          vote_average: data['vote_average'],
        }),
      );
      await this.movieRepo.save(movielist);
    }
  }

  async getList(pageOptionDto: PageOptionsDto) {
    const queryBuilder = await this.movieRepo.createQueryBuilder('movie');
    await queryBuilder
      .orderBy('movie.createdAt', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaEn = new PageMetaDto({ pageOptionDto, itemCount });

    return new PageDto(entities, pageMetaEn);
  }
}
