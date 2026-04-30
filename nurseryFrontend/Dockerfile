# Build stage
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ✅ ENV inject karo build time pe
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# Production stage
FROM node:22

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]