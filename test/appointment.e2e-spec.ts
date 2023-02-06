import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Appointment (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/appointments (GET)', () => {
    console.log(
      '%cappointment.e2e-spec.ts line:19 new Date()',
      'color: #007acc;',
      new Date(),
    );
    return request(app.getHttpServer())
      .post('/appointments')
      .send({
        start: 'invalid',
        end: '2023-02-06T09:15:02.179Z',
      })
      .expect(400);
  });
});
