import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  ParseUUIDPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';

import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { NATS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':status')
  findAllByStatus(
    @Param() { status }: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.client.send('findAllOrders', { ...paginationDto, status }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() { status }: StatusDto,
  ) {
    return this.client.send('changeOrderStatus', { id, status }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
