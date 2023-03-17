import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../entities/order.entity';
import { OrdersService } from './orders.service';

interface Response {
  message?: string;
  error?: string;
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOkResponse({ status: 200, type: Order, isArray: true })
  async index(): Promise<Order[]> {
    return await this.ordersService.getAllOrders();
  }

  @Post()
  @ApiCreatedResponse({ status: 201, type: Order })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Response> {
    try {
      await this.ordersService.createOrder(createOrderDto);
      return { message: 'Successfully created new order' };
    } catch (error) {
      return { error: error.message };
    }
  }
}
