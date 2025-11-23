'use server';
import Redis from 'ioredis';
import { loadSecret } from '../utilities/load-secret';

const redis = new Redis({
  host: process.env['REDIS_HOST'],
  password: loadSecret('REDIS_PASSWORD_FILE'),
});

export default redis;
