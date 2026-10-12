IF DB_ID(N'SBA301_OrchidDB') IS NULL
    CREATE DATABASE SBA301_OrchidDB;
GO

USE SBA301_OrchidDB;
GO

IF OBJECT_ID(N'dbo.Orchid', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Orchid (
        OrchidID INT IDENTITY(1,1) PRIMARY KEY,
        OrchidName NVARCHAR(100) NOT NULL,
        IsNatural BIT NOT NULL,
        OrchidDescription NVARCHAR(1000),
        OrchidCategory NVARCHAR(100),
        IsAttractive BIT NOT NULL,
        OrchidURL NVARCHAR(500)
    );
END;
GO

INSERT INTO dbo.Orchid
    (OrchidName, IsNatural, OrchidDescription, OrchidCategory, IsAttractive, OrchidURL)
SELECT samples.OrchidName, samples.IsNatural, samples.OrchidDescription,
       samples.OrchidCategory, samples.IsAttractive, samples.OrchidURL
FROM (VALUES
    (N'Taichung Beauty', 1, N'Popular Cattleya orchid', N'Cattleya', 1,
     N'https://example.com/orchid1.jpg'),
    (N'Phalaenopsis White', 1, N'White moth orchid', N'Phalaenopsis', 1,
     N'https://example.com/orchid2.jpg'),
    (N'Dendrobium Purple', 1, N'Purple dendrobium orchid', N'Dendrobium', 0,
     N'https://example.com/orchid3.jpg')
) AS samples
    (OrchidName, IsNatural, OrchidDescription, OrchidCategory, IsAttractive, OrchidURL)
WHERE NOT EXISTS (
    SELECT 1
    FROM dbo.Orchid AS existing
    WHERE existing.OrchidName = samples.OrchidName
);
GO
