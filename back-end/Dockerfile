# Dockerfile cho Laravel
FROM php:8.2-apache

# Cài đặt các extension cần thiết
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    bash \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Cài đặt Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Cài đặt Node.js (dùng cho Laravel Mix)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /var/www/html

COPY . .

# Cài đặt các package
RUN composer install --optimize-autoloader --no-dev
RUN npm install && npm run production

RUN chown -R www-data:www-data /var/www/html \
    && echo '<Directory /var/www/html/public>\n    AllowOverride All\n</Directory>' > /etc/apache2/conf-available/allow-override.conf \
    && a2enconf allow-override \
    && sed -i 's#DocumentRoot /var/www/html#DocumentRoot /var/www/html/public#' /etc/apache2/sites-available/000-default.conf

EXPOSE 80
