Available scripts
npm install — install dependencies
npm run dev — start Vite dev server
npm run build — production build
npm run preview — preview production build locally
Tech
React 18 with TypeScript
Vite
Tailwind CSS
Features
Add todos
Mark todos completed
Delete todos
Local persistence via localStorage

## Docker Usage

This project can be run using Docker.
- Docker Desktop installed and running

### Build Docker Image

Run the following command in the project root directory:

```bash
docker build -t vibecoding-project .
docker run -p 8080:80 vibecoding-project
