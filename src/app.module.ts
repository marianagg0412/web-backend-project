import { Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelsModule } from './models/models.module';
import { ProductsModule } from './products/products.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { MembershipsModule } from './memberships/memberships.module';
import { Logger } from '@nestjs/common';
import { RoleModule } from './role/role.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), // To load environment variables
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const host = process.env.DB_HOST;
        const port = Number(process.env.DB_PORT);
        const username = process.env.DB_USER;
        const password = process.env.DB_PASSWORD;
        const database = process.env.DB_NAME;
    
        // Logger.log(`DB Host: ${host}`, 'AppModule');
        // Logger.log(`DB Port: ${port}`, 'AppModule');
        // Logger.log(`DB User: ${username}`, 'AppModule');
        // Logger.log(`DB Database: ${database}`, 'AppModule');
    
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: true,
        };
      },
      inject: [],
    }),
    ModelsModule,
    ProductsModule,
    EventsModule,
    UsersModule,
    PhotosModule,
    MembershipsModule,
    RoleModule,
    AuthModule,
    // CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit, OnModuleDestroy {

  onModuleInit() {
    Logger.log('AppModule initialized!', 'AppModule');
  }

  onModuleDestroy() {
    Logger.log('AppModule destroyed!', 'AppModule');
  }
}
