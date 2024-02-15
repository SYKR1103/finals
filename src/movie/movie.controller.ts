import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PageOptionsDto } from '../dtos/page-options.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovie() {
    return this.movieService.createMovie();
  }

  @Get('all')
  async getMovieList(@Query() pageOptionDto: PageOptionsDto) {
    return this.movieService.getList(pageOptionDto);
  }
}
