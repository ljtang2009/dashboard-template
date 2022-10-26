import { init as appConfigInit } from '@/bootstrap/appConfig';

export default async () => {
  await appConfigInit();
};
