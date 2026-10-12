# Orchid Management

Ứng dụng web quản lý bộ sưu tập hoa lan, gồm giao diện React và REST API Spring Boot kết nối cơ sở dữ liệu SQL Server. Người dùng có thể xem danh sách, thêm, chỉnh sửa và xóa thông tin hoa lan.

## Công nghệ

- **Frontend:** React, Vite, React Router, Axios, Bootstrap
- **Backend:** Java 21, Spring Boot, Spring Data JPA
- **Cơ sở dữ liệu:** Microsoft SQL Server

## Cấu trúc dự án

- `frontend-reactjs/` — giao diện và các chức năng quản lý hoa lan.
- `backend-api/` — REST API, xử lý dữ liệu và kiểm thử dịch vụ.
- `backend-api/db/create_database.sql` — script khởi tạo cơ sở dữ liệu `SBA301_OrchidDB`.

## API

Các endpoint sử dụng tiền tố `/orchids`:

| Phương thức | Endpoint | Chức năng |
| --- | --- | --- |
| `GET` | `/orchids/` | Lấy danh sách hoa lan |
| `GET` | `/orchids/{id}` | Lấy thông tin một hoa lan |
| `POST` | `/orchids/` | Thêm hoa lan |
| `PUT` | `/orchids/{id}` | Cập nhật hoa lan |
| `DELETE` | `/orchids/{id}` | Xóa hoa lan |
