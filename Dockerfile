FROM node:22-alpine AS build
RUN corepack enable
RUN corepack prepare pnpm@9.15.9 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:22-alpine
RUN corepack enable
RUN corepack prepare pnpm@9.15.9 --activate
WORKDIR /app
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
ENV NODE_ENV=production PORT=3000
EXPOSE $PORT
CMD ["node", "server.js"]
