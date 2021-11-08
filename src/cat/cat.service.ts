import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';
import { UpdateCatDTO } from './dto/updateCat.dto';

@Injectable()
export class CatService {
  public cat1: Cat = { id: 1, name: 'First Cat' };
  public cat2: Cat = { id: 2, name: 'Second Cat' };
  private cats: Cat[] = [this.cat1, this.cat2];

  async create(cat: Cat): Promise<Cat> {
    this.cats.push(cat);
    return cat;
  }

  async getAllCats(): Promise<Cat[]> {
    return this.cats;
  }

  async findCatById(id: number): Promise<Cat> {
    return this.cats.find((value) => value.id === id);
  }

  async updateCat(catToUpdate: UpdateCatDTO, id: number): Promise<Cat> {
    const updateToCat = this.cats.find((value) => value.id === id);
    updateToCat.name = catToUpdate.name;
    return updateToCat;
  }

  async deleteCat(id: number): Promise<Cat[]> {
    const catToDelete = this.cats.find((value) => value.id === id);
    return this.cats.splice(catToDelete.id - 1, 1);
  }
}
