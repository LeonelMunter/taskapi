import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config/dist';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL), 
    TasksModule,
    ConfigModule.forRoot(),
  ]
})
export class AppModule {}
