import launchSupplyServer from './dev.supply';

const runServer = async () => {
  const { port: supplyServerPort } = await launchSupplyServer();
  console.log(`http://localhost:${supplyServerPort}`);
};

runServer();
