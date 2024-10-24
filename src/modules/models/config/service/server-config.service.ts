import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrUpdateServerConfigDto } from '../dto/create-or-update-server-config.dto';
import { ServerConfigDocument } from '../../../../schemas/server-config.schema';

export class ServerConfigService {
  constructor(
    @InjectModel('ServerConfig')
    private readonly serverConfig: Model<ServerConfigDocument>,
  ) {}
  async createOrUpdateServerConfig(
    serverConfigDto: CreateOrUpdateServerConfigDto,
  ) {
    const entry = await this.serverConfig.findOne({
      channelId: serverConfigDto.channelId,
      serverId: serverConfigDto.serverId,
    });
    if (entry) {
      return await this.updateEntry(serverConfigDto);
    } else {
      return await this.create(serverConfigDto);
    }
  }

  async create(
    birthdayEntryDto: CreateOrUpdateServerConfigDto,
  ): Promise<ServerConfigDocument> {
    try {
      return await this.serverConfig.create({
        channelId: birthdayEntryDto.channelId,
        serverId: birthdayEntryDto.serverId,
      });
    } catch (e) {
      return null;
    }
  }

  async updateEntry(
    dto: CreateOrUpdateServerConfigDto,
  ): Promise<ServerConfigDocument> {
    try {
      return await this.serverConfig.findOneAndUpdate(
        { serverId: dto.serverId },
        {
          channelId: dto.channelId,
        },
        { new: true },
      );
    } catch (e) {
      return null;
    }
  }

  async getEntryForServer(serverId: string): Promise<ServerConfigDocument> {
    try {
      const entry = await this.serverConfig.findOne<ServerConfigDocument>({
        serverId: serverId,
      });
      if (!entry) {
        return null;
      }

      return entry;
    } catch (e) {
      return null;
    }
  }

  async getAll(): Promise<ServerConfigDocument[]> {
    try {
      return await this.serverConfig.find();
    } catch (e) {
      return null;
    }
  }
}
