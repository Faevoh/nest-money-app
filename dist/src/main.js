"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors();
    app.setGlobalPrefix("api");
    await app.listen(process.env.PORT || 3000, () => {
        console.log("Server is Connected");
    });
}
bootstrap();
//# sourceMappingURL=main.js.map