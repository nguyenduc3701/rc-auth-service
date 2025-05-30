import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('login', () => {
    it('should call login service', () => {
      const mockUser = {} as UserDocument;
      const mockResponse = {
        send: jest.fn(),
      } as unknown as Response;
      return appController.login(mockUser, mockResponse).then(() => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(appService.login).toHaveBeenCalledWith(mockUser, mockResponse);
      });
    });
  });
});
