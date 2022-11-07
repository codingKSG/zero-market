import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MarketsModule } from './markets/markets.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    MarketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
//mongoose query
export class AppModule implements NestModule {
  configure() {
    const isDev: boolean = process.env.MODE === 'dev' ? true : false;
    mongoose.set('debug', isDev);
  }
}
