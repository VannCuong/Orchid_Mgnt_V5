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

## Cơ sở dữ liệu

Ứng dụng sử dụng Microsoft SQL Server. Cấu hình mặc định kết nối tới `localhost:1433`, database `SBA301_OrchidDB`, với mã hóa kết nối bật và tin cậy chứng chỉ máy chủ. Tạo database trước khi chạy backend bằng cách chạy `backend-api/db/create_database.sql` trong SQL Server Management Studio hoặc Azure Data Studio.

Backend đọc cấu hình kết nối từ các biến môi trường:

- `DB_URL` — JDBC URL; mặc định là `jdbc:sqlserver://localhost:1433;databaseName=SBA301_OrchidDB;encrypt=true;trustServerCertificate=true`.
- `DB_USERNAME` — tên tài khoản SQL Server; mặc định là `sa`.
- `DB_PASSWORD` — mật khẩu tài khoản SQL Server.

Đặt thông tin đăng nhập phù hợp với SQL Server trên máy của bạn. Không lưu mật khẩu thật vào Git.

## Cách chạy

Yêu cầu: JDK 21, Maven, Node.js và npm; SQL Server phải đang chạy và truy cập được.

### Backend

Mở terminal tại `backend-api/`, đặt mật khẩu SQL Server và chạy ứng dụng:

```powershell
$env:DB_PASSWORD = "<mat-khau-SQL-Server-cua-ban>"
mvn spring-boot:run
```

Nếu SQL Server không dùng địa chỉ, port, database hoặc tài khoản mặc định, đặt thêm `DB_URL` và `DB_USERNAME` trước khi chạy. Backend chạy tại `http://localhost:8080`.

### Frontend

Mở terminal thứ hai tại `frontend-reactjs/`:

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Frontend chạy tại `http://localhost:5173`. API URL mặc định được đặt trong `.env.example` là `http://localhost:8080/orchids`. Nếu backend chạy ở địa chỉ khác, cập nhật `VITE_API_URL` trong `frontend-reactjs/.env`, sau đó khởi động lại Vite.

## API

Base URL: `http://localhost:8080/orchids`. Các endpoint là:

| Phương thức | Endpoint | Chức năng |
| --- | --- | --- |
| `GET` | `/` | Lấy danh sách hoa lan |
| `GET` | `/{id}` | Lấy thông tin một hoa lan |
| `POST` | `/` | Thêm hoa lan |
| `PUT` | `/{id}` | Cập nhật hoa lan |
| `DELETE` | `/{id}` | Xóa hoa lan |

Ví dụ: `GET http://localhost:8080/orchids/`.

## Lưu ý và vấn đề thường gặp

- Backend cần SQL Server hoạt động, database đã được tạo và thông tin đăng nhập hợp lệ. Lỗi kết nối hoặc đăng nhập thường do sai `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, port hoặc cấu hình SQL Server.
- CORS chỉ cho phép frontend origin `http://localhost:5173` theo mặc định. Nếu dùng origin khác, đặt `CORS_ALLOWED_ORIGIN` cho backend tương ứng rồi khởi động lại backend.
- Frontend cần `VITE_API_URL` trỏ tới API đang chạy. Nếu không truy cập được API, kiểm tra backend và URL trong `.env`; khởi động lại Vite sau khi thay đổi biến này.
- Hibernate đang dùng `ddl-auto=update` để cập nhật schema. Hãy sao lưu dữ liệu trước khi thay đổi cấu trúc database.
- API hiện chưa cấu hình xác thực người dùng; không triển khai công khai nếu chưa bổ sung cơ chế bảo vệ phù hợp.
