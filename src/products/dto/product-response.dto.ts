// product.response.dto.ts
import { Event } from '../../events/entities/event.entity';
export class ProductResponseDto {
  id: number;
  name: string;
  description: string;
  stock: number;
  imageUrl: string;
  isLegal: number;
  price: number; // Price in dollars
  event: Event; // Define a proper type for the event if needed
}
