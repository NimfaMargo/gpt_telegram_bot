# используем официальный образ Node.js в качестве базового
FROM node:16-alpine

# задаем рабочую директорию внутри контейнера
WORKDIR /app

# копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# устанавливаем зависимости
RUN npm ci

# копируем исходный код в контейнер
COPY . .

# Определите порт, который будет использоваться контейнером
ENV PORT=3000
EXPOSE $PORT

# указываем команду, которая будет запускаться при запуске контейнера
CMD ["npm", "start"]