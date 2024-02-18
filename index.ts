import 'dotenv/config';

import { Application } from './src/application';

const PORT = Number(process.env.PORT) || 4000;

const app = new Application();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
