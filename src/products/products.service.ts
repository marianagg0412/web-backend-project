import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productCategories } from './product-categories';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (!productCategories.includes(createProductDto.category)) {
        throw new Error(`Invalid category: ${createProductDto.category}. Must be one of: ${productCategories.join(', ')}`);
    }
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
}

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({where: {isActive: 1}});
    // console.log('Products before return:', products);  // Log raw data
    return products.map(product => ({
      ...product,
      price: Number(product.price)  // Ensure price is explicitly set as a number if necessary
    }));
  }
  

  async findAllLegal() {
    const products = await this.productRepository.find({ where: { isLegal: 1, isActive: 1 } });
    return products.map(product => ({
      ...product,
      price: Number(product.price)  // Ensure price is explicitly set as a number if necessary
    }));
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({where: {id}});
  
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    // Set the product as inactive
    product.isActive = 0;
  
    // Save the updated product back to the database
    await this.productRepository.save(product);
  }
}
