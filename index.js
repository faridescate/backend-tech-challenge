'use strict';

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const Routes = require('./src/routes/basket/endpoint');

const init = async () => {

  const server = Hapi.server({
    port: process.env.NODE_PORT || 3000,
    host: 'localhost'
  });

  const swaggerOptions = {
    info: {
      title: 'Test API Documentation',
      version: Pack.version,
    },
  };

  const yarOptions = {
    storeBlank: false,
    cookieOptions: {
      password: process.env.SESSION_TOKEN,
      isSecure: false
    }
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    {
      plugin: require('@hapi/yar'),
      options: yarOptions
    }
  ]);

  try {
    await server.start();
    console.log('Server running on %s', server.info.uri);
  } catch (err) {
    console.log(err);
  }

  server.route(Routes);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
