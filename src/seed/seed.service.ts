import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/httpAdapters/axios.adapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=650';
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>(url);
    /*   const insertPromisesArray = [];

    data.results.forEach(async ({ name, url }) => {
      const seg = url.split('/');
      const numero = +seg[seg.length - 2];

      //await this.pokemonModel.create({ name, numero });
      insertPromisesArray.push(this.pokemonModel.create({ name, numero }));
    });
    await Promise.all(insertPromisesArray); */

    const pokeonToInsert: { name: string; numero: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const seg = url.split('/');
      const numero = +seg[seg.length - 2];

      //await this.pokemonModel.create({ name, numero });
      pokeonToInsert.push({ name, numero });
    });

    this.pokemonModel.insertMany(pokeonToInsert);
    return `Se crearon ${650} registros`;
  }
}
