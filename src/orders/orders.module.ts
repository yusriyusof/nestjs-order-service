import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsApi } from '../api/payments.api';
import { Order } from '../entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, PaymentsApi],
})
export class OrdersModule {}
