import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver:ApolloGatewayDriver,
      server:{
        cors:true,
      },
      gateway:{
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            {name:'userService', url: 'http://localhost:3001/graphql'}
          ]
        })
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
