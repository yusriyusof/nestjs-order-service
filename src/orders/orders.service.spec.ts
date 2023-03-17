import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PaymentsApi } from '../api/payments.api';

describe('OrdersService', () => {
  let ordersService: OrdersService;

  const ordersRepoMock = {
    save: jest.fn(),
    update: jest.fn(),
  };

  const paymentsApiMock = {
    verifyPayment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: 'OrderRepository',
          useValue: ordersRepoMock,
        },
        {
          provide: PaymentsApi,
          useValue: paymentsApiMock,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  describe('create new order', () => {
    it('should create order successfully', async () => {
      const createOrder = {
        name: 'Test Order',
        status: OrdersService.CREATED,
      };

      const order = {
        name: 'Test Order',
        status: 'created',
      };

      ordersRepoMock.save.mockResolvedValue(order);
      paymentsApiMock.verifyPayment.mockResolvedValue({ status: 'approved' });

      await ordersService.createOrder(order);

      expect(ordersRepoMock.save).toHaveBeenCalledWith(createOrder);
      expect(paymentsApiMock.verifyPayment).toHaveBeenCalledWith(order);
    });
  });
});
