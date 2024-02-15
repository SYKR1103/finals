import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.common';

@Entity()
export class Movie extends BaseEntity {
  @Column()
  public title: string;

  @Column()
  public overview: string;

  @Column({ nullable: true })
  public release_date: string;

  @Column()
  public adult: boolean;

  @Column()
  public vote_average: string;
}
