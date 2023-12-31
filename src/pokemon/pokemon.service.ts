import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  private defaultLimit: number =
    this._configservice.get<number>('defaultLimit');
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly _configservice: ConfigService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleException(error);
    }
  }

  findAll(pagination: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = pagination;
    return this.pokemonModel
      .find()
      .limit(limit) // trgistros por pagina
      .skip(offset) //pagina
      .sort({
        numero: 1,
      }) //ordena de manera ascendente
      .select('-__v'); //Quita esa columna
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    console.log(typeof +term);
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ numero: term });
    }
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }
    if (!pokemon) {
      throw new NotFoundException(`No se encontro el Pokemon con el ${term}`);
    }
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
    try {
      await pokemon.updateOne(updatePokemonDto);

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleException(error);
    }
  }

  async remove(id: string) {
    /*     const pokemon = await this.findOne(id);
    await pokemon.deleteOne(); */
    //const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0)
      throw new BadRequestException(`El Pokemon con el id ${id} no existe`);
    return `El Pokemon con el id ${id} ha sido eliminado`;
  }

  private handleException(err: any) {
    if (err.code === 11000) {
      throw new BadRequestException(
        `Pokemos existe en la BD ${JSON.stringify(err.keyValue)}`,
      );
    }
    console.log(err);
    throw new InternalServerErrorException(`No se pudo crear el Pokemon`);
  }
}
