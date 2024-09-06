import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(book: Book): Promise<Book> {
    return this.booksRepository.save(book);
  }
  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }
  async findOne(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({ id });
  }
  async update(id: number, updateBookDto: Partial<Book>): Promise<void> {
    await this.booksRepository.update(id, updateBookDto);
  }
  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
