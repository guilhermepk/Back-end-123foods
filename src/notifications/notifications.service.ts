import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private notificationRepository: Repository<Notifications>,
  ) {}
  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<Notifications> {
    const notification = this.notificationRepository.create(
      createNotificationDto,
    );
    return this.notificationRepository.save(notification);
  }

  async findAll(): Promise<Notifications[]> {
    return this.notificationRepository.find();
  }

  async remove(id: number): Promise<void> {
    const notifications = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notifications) {
      throw new NotFoundException('notificação não encontrada');
    }
    const result = await this.notificationRepository.delete(id);
  }
}
