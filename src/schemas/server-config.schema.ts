import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ServerConfig {
  @Prop({ required: true })
  channelId: string;

  @Prop({ required: true, unique: true })
  serverId: string;

  constructor(data) {
    Object.assign(this, data);
  }
}

export type ServerConfigDocument = ServerConfig & Document;

export const ServerConfigSchema = SchemaFactory.createForClass(ServerConfig);

