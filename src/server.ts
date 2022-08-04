import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import { app } from './app';
import swaggerDocument from './doc/openapi.json';

const PORT = process.env.PORT || 3000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
