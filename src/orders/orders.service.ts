import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsApi } from '../api/payments.api';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  public static readonly CREATED = 'created';
  public static readonly CONFIRMED = 'confirmed';
  public static readonly DELIVERED = 'delivered';
  public static readonly CANCELLED = 'cancelled';

  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    private paymentsApi: PaymentsApi,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.ordersRepository.find();
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const savedOrder = await this.ordersRepository.save({
      ...createOrderDto,
      status: OrdersService.CREATED,
    });
    this.verifyOrder(savedOrder);
  }

  private async verifyOrder(order: Order) {
    const verified = await this.paymentsApi.verifyPayment(order);

    if (verified.status === 'approved') {
      await this.ordersRepository.update(order.id, {
        status: OrdersService.CONFIRMED,
      });
      this.deliveredOrder(order.id);
    }

    if (verified.status === 'declined') {
      await this.ordersRepository.update(order.id, {
        status: OrdersService.CANCELLED,
      });
    }
  }

  private deliveredOrder(id: number) {
    setTimeout(async () => {
      await this.ordersRepository.update(id, {
        status: OrdersService.DELIVERED,
      });
    }, 10000);
  }
}
