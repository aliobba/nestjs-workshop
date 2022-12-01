"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const express = require("express");
const serverless = require("serverless-http");
const helmet = require("helmet");
const module_1 = require("./module");
const bootstrap = async (module) => {
    const app = express();
    const nestApp = await core_1.NestFactory.create(module, new platform_express_1.ExpressAdapter(app));
    nestApp.setGlobalPrefix('/.netlify/functions/main');
    nestApp.enableCors({
        origin: ['http://localhost:3000', process.env.REACT_FRONT_URI],
    });
    nestApp.use(helmet());
    nestApp.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
    }));
    nestApp.use(express.json({ limit: '50mb' }));
    nestApp.use(express.urlencoded({ limit: '50mb', extended: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Workshop example')
        .setDescription('The Workshop API description')
        .setVersion('1.0')
        .addTag('Workshop')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(nestApp, config);
    swagger_1.SwaggerModule.setup('api', nestApp, document);
    await nestApp.init();
    return app;
};
let cachedHadler;
const proxyApi = async (module, event, context) => {
    if (!cachedHadler) {
        const app = await bootstrap(module);
        cachedHadler = serverless(app);
    }
    return cachedHadler(event, context);
};
const handler = async (event, context) => proxyApi(module_1.AppModule, event, context);
exports.handler = handler;
//# sourceMappingURL=main.js.map