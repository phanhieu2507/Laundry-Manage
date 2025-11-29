# Hướng dẫn build và chạy Docker cho dự án Laravel + React

## 1. Build và chạy các container

```bash
docker-compose up --build -d
```
- Tham số `--build` sẽ build lại các image nếu có thay đổi.
- Tham số `-d` sẽ chạy các container ở chế độ nền.

## 2. Dừng các container

```bash
docker-compose down
```

## 3. Truy cập ứng dụng
- Laravel API: http://localhost:9000
- React Frontend: http://localhost:3000
- MySQL: cổng 3306 (có thể dùng các tool như DBeaver, TablePlus để kết nối)

## 4. Một số lệnh hữu ích
- Xem log container:
  ```bash
  docker-compose logs laravel
  docker-compose logs react
  docker-compose logs db
  ```
- Truy cập shell vào container Laravel:
  ```bash
  docker-compose exec laravel bash
  ```

## 5. Lưu ý
- Cần cài đặt Docker và Docker Compose trên máy.
- Có thể cần chỉnh sửa file `.env` của Laravel để khớp thông tin database.
- Nếu lần đầu chạy, cần migrate database:
  ```bash
  docker-compose exec laravel php artisan migrate
  ```
