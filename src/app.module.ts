import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersModule } from './orders/orders.module';

ConfigModule.forRoot({ envFilePath: ['.env'] });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DATABASE,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      entities: [Order],
      synchronize: true,
      autoLoadEntities: true,
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
