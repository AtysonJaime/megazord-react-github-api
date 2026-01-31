FROM node:20-alpine3.20

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Garante que o lockfile não seja atualizado, equivalente ao npm ci no npm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD [ "pnpm", "start" ]

