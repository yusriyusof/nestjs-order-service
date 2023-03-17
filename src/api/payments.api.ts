import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Order } from 'src/entities/order.entity';

@Injectable()
export class PaymentsApi {
  async verifyPayment(order: Order): Promise<{ status: string }> {
    const res = await axios.post(
      'http://localhost:3001/payments/verify',
      order,
    );
    return await res.data;
  }
}
