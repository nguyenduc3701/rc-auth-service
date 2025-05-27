import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservations.repository';
import { ReservationDocument } from './models/reservation.schema';
import { Types } from 'mongoose';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepository: ReservationRepository) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<ReservationDocument> {
    return await this.reservationRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: '123',
    });
  }

  async findAll(): Promise<ReservationDocument[]> {
    return await this.reservationRepository.find({});
  }

  async findOne(_id: string): Promise<ReservationDocument> {
    return await this.reservationRepository.findOne({
      _id: new Types.ObjectId(_id),
    });
  }

  async update(
    _id: string,
    updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDocument> {
    return await this.reservationRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(_id) },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string): Promise<ReservationDocument> {
    return await this.reservationRepository.findOneAndDelete({
      _id: new Types.ObjectId(_id),
    });
  }
}
