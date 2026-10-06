# Digi Work Backend

> **Simple answers to everyday tech problems.**

Digi work is a full-stack portfolio project inspired by the idea of a searchable, step-by-step technology guide platform. The backend provides the REST APIs needed to browse categories, subcategories, read published guides, search articles, and manage content through a protected admin panel.

DigiWork does not sell products or services. Its purpose is to help people find clear, practical solutions to everyday technology problems.

---

## 📌 Project Overview

DigiWork follows a simple content hierarchy:

```text
Category
   ↓
Subcategory
   ↓
Article / Guide
```

Example:

```text
Devices & Hardware
   ↓
iPhone
   ↓
How to Reset an iPhone Safely
```

The same hierarchy is reflected in the public URLs:

```text
/devices-and-hardware/
/devices-and-hardware/iphone/
/devices-and-hardware/iphone/how-to-reset-an-iphone-safely
```

The backend exposes APIs for this structure and provides a separate protected API area for administrators.

---

# 🛠️ Tech Stack

- **Node.js** — JavaScript runtime
- **Express.js** — REST API framework
- **MongoDB** — Database
- **Mongoose** — MongoDB object modeling
- **JWT** — Admin authentication
- **HTTP-only Cookies** — Secure authentication cookie
- **bcryptjs** — Password hashing
- **Zod** — Request validation
- **Helmet** — Security headers
- **CORS** — Frontend/API access control
- **express-rate-limit** — Login rate limiting
- **cookie-parser** — Cookie handling
- **Postman** — API testing

### Intentionally kept simple

The current project does not require:

- Redis
- Elasticsearch
- Algolia
- Meilisearch
- Microservices
- WebSockets
- Redux
- Public user authentication
- Payments
- Comments
- Likes/favorites
- Image upload
- Cloudinary
- Tiptap
- Advanced SEO infrastructure

These should only be added if a real project requirement appears.

---

# 🏗️ Backend Architecture

```text
                    DigiWork Frontend
                           |
                           | HTTP / REST API
                           ↓
                    Node.js + Express
                           |
             ┌─────────────┴─────────────┐
             ↓                           ↓
       Public APIs                  Admin APIs
             |                           |
             |                     Authentication
             |                           |
             └─────────────┬─────────────┘
                           ↓
                       Controllers
                           ↓
                        Services
                           ↓
                       Mongoose
                           ↓
                        MongoDB
```

## Request Flow

```text
HTTP Request
     ↓
Express Server
     ↓
Security / Authentication / Validation Middleware
     ↓
Route
     ↓
Controller
     ↓
Service
     ↓
Mongoose Model
     ↓
MongoDB
     ↓
JSON Response
```

This separation keeps responsibilities clear:

- **Routes** decide which endpoint handles a request.
- **Middleware** handles authentication, validation, rate limiting, etc.
- **Controllers** handle request/response logic.
- **Services** contain business logic.
- **Models** define MongoDB data structures.
- **Utils** contain reusable helper functions.

---

# 📁 Folder Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── category.controller.js
│   │   ├── subcategory.controller.js
│   │   └── article.controller.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── error.middleware.js
│   │   ├── rateLimit.middleware.js
│   │   └── validate.middleware.js
│   │
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Category.js
│   │   ├── Subcategory.js
│   │   └── Article.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── category.routes.js
│   │   ├── subcategory.routes.js
│   │   ├── article.routes.js
│   │   ├── search.routes.js
│   │   └── admin/
│   │       ├── category.routes.js
│   │       ├── subcategory.routes.js
│   │       └── article.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── category.service.js
│   │   ├── subcategory.service.js
│   │   ├── article.service.js
│   │   └── search.service.js
│   │
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── category.validator.js
│   │   ├── subcategory.validator.js
│   │   └── article.validator.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── asyncHandler.js
│   │   ├── generateSlug.js
│   │   └── readingTime.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
JWT_EXPIRES_IN=7d
```

### Important

Never commit `.env` to GitHub.

The repository should contain `.env.example` with placeholders:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=7d
```

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
npm install
```

## 2. Configure `.env`

Add your MongoDB connection string and JWT secret.

## 3. Start development server

```bash
npm run dev
```

## 4. Start normally

```bash
npm start
```

The development server runs on:

```text
http://localhost:5000
```

---

# ❤️ Health Check

```http
GET /api/health
```

Full URL:

```text
http://localhost:5000/api/health
```

Expected:

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

---

# 🔐 Authentication

DigiWork has **admin-only authentication**.

Visitors do not need an account to:

- Browse categories
- Browse subcategories
- Read guides
- Search guides

Only administrators need authentication to manage content.

## Authentication Flow

```text
Admin Login
    ↓
Email + Password
    ↓
Find Admin
    ↓
Check Account
    ↓
Compare bcrypt Password
    ↓
Create JWT
    ↓
HTTP-only Cookie
    ↓
Protected Admin APIs
```

---

# 🔑 Authentication APIs

## POST `/api/auth/login`

Logs the admin in.

### Request

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

### Success

```text
200 OK
```

The JWT is stored in an HTTP-only cookie.

---

## GET `/api/auth/me`

Returns the currently authenticated admin.

### Authentication

Required.

```http
GET /api/auth/me
```

### Success

```text
200 OK
```

### Without authentication

```text
401 Unauthorized
```

---

## POST `/api/auth/logout`

Logs out the admin by clearing the authentication cookie.

### Authentication

Required.

```http
POST /api/auth/logout
```

### Success

```text
200 OK
```

---

# 📂 Category System

Categories are the top-level sections of DigiWork.

Examples:

```text
Devices & Hardware
Computers & Operating Systems
Email & Communication
Security & Privacy
Gaming
Internet & Networking
```

A category contains multiple subcategories.

```text
Category 1
   ├── Subcategory 1
   ├── Subcategory 2
   └── Subcategory 3
```

---

# 🌐 Public Category APIs

## GET `/api/categories`

Returns all active categories.

```http
GET /api/categories
```

Categories are ordered by:

```text
order
↓
name
```

---

## GET `/api/categories/:categorySlug`

Returns one active category.

Example:

```http
GET /api/categories/devices-and-hardware
```

---

# 🔒 Admin Category APIs

All endpoints below require admin authentication.

## POST `/api/admin/categories`

Creates a category.

```http
POST /api/admin/categories
```

### Body

```json
{
  "name": "Devices & Hardware",
  "description": "Complete device guides.",
  "icon": "smartphone",
  "order": 2
}
```

The backend generates the slug automatically:

```text
Devices & Hardware
        ↓
devices-and-hardware
```

---

## PATCH `/api/admin/categories/:id`

Updates a category.

```http
PATCH /api/admin/categories/CATEGORY_ID
```

Example:

```json
{
  "description": "Complete device guides and solutions."
}
```

---

## DELETE `/api/admin/categories/:id`

Soft-deletes a category.

```http
DELETE /api/admin/categories/CATEGORY_ID
```

Instead of physically deleting it:

```text
isActive = false
```

The category therefore disappears from public APIs.

---

# 📁 Subcategory System

Subcategories belong to a specific category.

Example:

```text
Devices & Hardware
   ├── iPhone
   ├── Android
   └── Windows
```

Database relationship:

```text
Category 1 ─────── N Subcategories
```

---

# 🌐 Public Subcategory APIs

## GET `/api/categories/:categorySlug/subcategories`

Returns active subcategories under a category.

Example:

```http
GET /api/categories/devices-and-hardware/subcategories
```

---

## GET `/api/categories/:categorySlug/:subcategorySlug`

Returns a specific subcategory under a category.

Example:

```http
GET /api/categories/devices-and-hardware/iphone
```

The backend verifies that:

```text
iPhone
   ↓
actually belongs to
   ↓
Devices & Hardware
```

---

# 🔒 Admin Subcategory APIs

## POST `/api/admin/subcategories`

Creates a subcategory.

```http
POST /api/admin/subcategories
```

### Body

```json
{
  "categoryId": "CATEGORY_ID",
  "name": "iPhone",
  "description": "Complete guides and solutions for iPhone.",
  "order": 1
}
```

---

## PATCH `/api/admin/subcategories/:id`

Updates a subcategory.

```http
PATCH /api/admin/subcategories/SUBCATEGORY_ID
```

Example:

```json
{
  "name": "iPhone Guides",
  "order": 1
}
```

---

## DELETE `/api/admin/subcategories/:id`

Soft-deletes a subcategory.

```http
DELETE /api/admin/subcategories/SUBCATEGORY_ID
```

Sets:

```text
isActive = false
```

---

# 📝 Article / Guide System

Articles are the main content of DigiWork.

Relationship:

```text
Category
    ↓
Subcategory
    ↓
Article
```

Example:

```text
Devices & Hardware
    ↓
iPhone
    ↓
How to Reset an iPhone Safely
```

---

# 🌐 Public Article APIs

## GET `/api/articles/:categorySlug/:subcategorySlug`

Returns published articles for a subcategory.

Example:

```http
GET /api/articles/devices-and-hardware/iphone
```

Only articles with:

```text
status = published
```

are returned.

---

## Article Pagination

```http
GET /api/articles/devices-and-hardware/iphone?page=1&limit=10
```

Parameters:

| Parameter | Purpose | Default |
|---|---|---:|
| `page` | Page number | `1` |
| `limit` | Number of articles | `10` |

The API currently caps the limit at 50.

Example:

```json
{
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

---

## GET `/api/articles/:categorySlug/:subcategorySlug/:articleSlug`

Returns one published article.

Example:

```http
GET /api/articles/devices-and-hardware/iphone/how-to-reset-an-iphone-safely
```

The backend verifies:

```text
Category exists
      ↓
Subcategory exists
under that category
      ↓
Article exists
under that subcategory
      ↓
Article is published
```

This prevents invalid hierarchical URLs from returning unrelated articles.

---

# 🔒 Admin Article APIs

## POST `/api/admin/articles`

Creates an article.

```http
POST /api/admin/articles
```

### Body

```json
{
  "categoryId": "CATEGORY_ID",
  "subcategoryId": "SUBCATEGORY_ID",
  "title": "How to Reset an iPhone Safely",
  "excerpt": "Learn the safe way to reset your iPhone.",
  "content": "Before resetting your iPhone, make sure your important information is backed up.",
  "status": "published"
}
```

The backend automatically:

- Generates the slug
- Calculates reading time
- Stores the authenticated admin as author
- Validates the category
- Validates the subcategory
- Confirms the subcategory belongs to the category

---

## PATCH `/api/admin/articles/:id`

Updates an article.

```http
PATCH /api/admin/articles/ARTICLE_ID
```

Example:

```json
{
  "title": "How to Reset an iPhone Safely Again"
}
```

If the title changes:

```text
Title
 ↓
Slug automatically regenerated
```

If content changes:

```text
Content
 ↓
Reading time recalculated
```

If category/subcategory changes:

```text
New Category
      +
New Subcategory
      ↓
Relationship validated
```

---

## DELETE `/api/admin/articles/:id`

Deletes an article.

```http
DELETE /api/admin/articles/ARTICLE_ID
```

Articles are currently hard-deleted.

---

# 📰 Draft and Published Articles

Articles support two states:

```text
draft
published
```

### Draft

```text
status = draft
```

Draft articles are not visible through public article APIs or public search.

### Published

```text
status = published
```

Published articles become publicly readable and searchable.

---

# 🔎 Search API

## GET `/api/search`

Searches published articles.

Example:

```http
GET /api/search?q=iphone
```

The current search checks:

```text
title
excerpt
content
```

Search is case-insensitive.

Therefore:

```text
iphone
iPhone
IPHONE
```

can match the same article.

---

## Search Pagination

```http
GET /api/search?q=iphone&page=1&limit=10
```

---

## No Results

```http
GET /api/search?q=xyzabcdef
```

Example response:

```json
{
  "success": true,
  "message": "Search results fetched successfully",
  "data": {
    "query": "xyzabcdef",
    "articles": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

---

## Empty Search

```http
GET /api/search
```

Returns:

```text
400 Bad Request
```

with:

```text
Search query is required
```

---

# 🗃️ Database Models

## Admin

```text
name
email
password
isActive
createdAt
updatedAt
```

The password is stored as a bcrypt hash.

---

## Category

```text
name
slug
description
icon
isActive
order
createdAt
updatedAt
```

The slug is unique.

---

## Subcategory

```text
category
name
slug
description
isActive
order
createdAt
updatedAt
```

Unique combination:

```text
category + slug
```

---

## Article

```text
category
subcategory
title
slug
excerpt
content
readingTime
status
author
createdAt
updatedAt
```

Unique combination:

```text
subcategory + slug
```

---

# 🔗 Data Relationships

```text
Admin
  │
  └──────────────→ Article
                       │
                       ├── Category
                       │
                       └── Subcategory
                              │
                              └── Category
```

Conceptually:

```text
Category
   │
   ├── Subcategory
   │      ├── Article
   │      ├── Article
   │      └── Article
   │
   └── Subcategory
          └── Article
```

---

# 🔗 Slug System

Slugs are generated automatically.

Example:

```text
How to Reset an iPhone Safely
            ↓
how-to-reset-an-iphone-safely
```

Public URL:

```text
/devices-and-hardware/iphone/how-to-reset-an-iphone-safely
```

Slugs make the URL hierarchy easy to understand and map directly to the content structure.

---

# ⏱️ Reading Time

Reading time is calculated automatically from article content.

Current rule:

```text
200 words ≈ 1 minute
```

Example:

```text
100 words → 1 minute
200 words → 1 minute
350 words → 2 minutes
500 words → 3 minutes
```

The minimum value is 1 minute.

---

# ✅ Request Validation

Zod validates incoming request bodies before controllers execute.

Flow:

```text
Request
   ↓
Zod Validation
   ↓
Valid?
 ├── No → 400 Error
 │
 └── Yes
       ↓
    Controller
       ↓
     Service
```

Validation covers things such as:

- Required fields
- String length
- Email format
- Status values
- Numeric values

Business rules are still checked inside services.

Example:

```text
Zod:
"Is categoryId provided?"

Service:
"Does this category actually exist?"

Service:
"Does this subcategory belong to this category?"
```

---

# 🛡️ Security

DigiWork uses several basic security layers.

## Helmet

Adds common HTTP security headers.

## CORS

Restricts browser requests to the configured frontend origin.

```env
CLIENT_URL=http://localhost:5173
```

## HTTP-only Cookie

The authentication cookie cannot be directly accessed by normal browser JavaScript.

## Password Hashing

Admin passwords are hashed with bcrypt.

## JWT

JWT is used to authenticate protected admin requests.

## Validation

Invalid request data is rejected before reaching business logic.

## Rate Limiting

The login endpoint is rate-limited.

Current configuration:

```text
15 login requests
within 15 minutes
```

Exceeding the limit returns:

```text
429 Too Many Requests
```

---

# 🚨 Error Handling

The backend uses a centralized error middleware.

Custom errors are created with:

```text
ApiError
```

Common statuses:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
429 Too Many Requests
500 Internal Server Error
```

Async controllers use:

```text
asyncHandler
```

so errors are passed to the central error handler.

---

# 📦 API Response Format

## Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Article not found"
}
```

## Pagination

```json
{
  "success": true,
  "message": "Articles fetched successfully",
  "data": {
    "articles": [],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 0,
      "totalPages": 0
    }
  }
}
```

---

# 📋 Complete API Reference

## Public APIs

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server |
| GET | `/api/categories` | Get active categories |
| GET | `/api/categories/:categorySlug` | Get category |
| GET | `/api/categories/:categorySlug/subcategories` | Get subcategories |
| GET | `/api/categories/:categorySlug/:subcategorySlug` | Get subcategory |
| GET | `/api/articles/:categorySlug/:subcategorySlug` | Get published articles |
| GET | `/api/articles/:categorySlug/:subcategorySlug/:articleSlug` | Get published article |
| GET | `/api/search?q=...` | Search published articles |

## Authentication

| Method | Endpoint | Authentication |
|---|---|---|
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Admin |
| POST | `/api/auth/logout` | Admin |

## Admin Categories

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/admin/categories` | Create category |
| PATCH | `/api/admin/categories/:id` | Update category |
| DELETE | `/api/admin/categories/:id` | Soft delete category |

## Admin Subcategories

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/admin/subcategories` | Create subcategory |
| PATCH | `/api/admin/subcategories/:id` | Update subcategory |
| DELETE | `/api/admin/subcategories/:id` | Soft delete subcategory |

## Admin Articles

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/admin/articles` | Create article |
| PATCH | `/api/admin/articles/:id` | Update article |
| DELETE | `/api/admin/articles/:id` | Delete article |

---

# 🧪 Postman Testing

The backend has been tested with Postman for:

### Authentication

- Valid login
- Invalid password
- Invalid email
- Authenticated `/me`
- Unauthenticated `/me`
- Logout
- Login rate limiting

### Categories

- Create
- Read
- Update
- Soft delete
- Duplicate category
- Invalid data
- Unauthorized request

### Subcategories

- Create
- Read
- Update
- Soft delete
- Invalid category
- Unauthorized request

### Articles

- Create
- List
- Detail
- Update
- Delete
- Draft protection
- Published filtering
- Pagination
- Hierarchy validation
- Duplicate slug protection
- Reading-time calculation

### Search

- Search with results
- Case-insensitive search
- Content search
- No results
- Empty query
- Pagination

---

# 🧭 Example API Flow

For this page:

```text
/devices-and-hardware/iphone/how-to-reset-an-iphone-safely
```

The frontend can make:

```text
GET /api/categories/devices-and-hardware
```

then:

```text
GET /api/categories/devices-and-hardware/iphone
```

then:

```text
GET /api/articles/devices-and-hardware/iphone
```

and finally:

```text
GET /api/articles/devices-and-hardware/iphone/how-to-reset-an-iphone-safely
```

The backend validates each relationship rather than blindly trusting the URL.

---

# 🧩 Current Scope

DigiWork currently focuses on:

```text
Find a problem
      ↓
Search
      ↓
Find a guide
      ↓
Read clear steps
```

The admin focuses on:

```text
Admin Login
     ↓
Create Category
     ↓
Create Subcategory
     ↓
Create Article
     ↓
Draft / Publish
     ↓
Manage Content
```

There is intentionally no public account requirement.

---

# 🔮 Future Improvements

These features can be added later when the frontend/admin requirements actually need them:

### Rich Article Editor

```text
Admin
 ↓
Tiptap Editor
 ↓
Formatted Article Content
```

### Image Management

```text
Admin
 ↓
Image Upload
 ↓
Cloudinary
 ↓
Image URL / Metadata in MongoDB
```

### Additional Content Features

Possible future additions:

- Related articles
- Article tags
- Featured guides
- Admin article listing/filtering
- Media library
- Better search ranking
- Search suggestions
- Analytics
- Redirect management

These are deliberately not part of the current MVP.

---

# 🚀 Backend Status

```text
Express Server              ✅
MongoDB                     ✅
Environment Configuration   ✅
Central Error Handling      ✅

Admin Authentication        ✅
JWT                         ✅
HTTP-only Cookie            ✅
bcrypt Password Hashing     ✅

Category CRUD               ✅
Subcategory CRUD            ✅
Article CRUD                ✅

Hierarchical APIs           ✅
Published/Draft System      ✅
Slug Generation             ✅
Reading Time                ✅
Pagination                  ✅
Search                      ✅

Zod Validation              ✅
Login Rate Limiting         ✅
Basic Security              ✅

Postman Testing             ✅
```

## Backend is ready for frontend integration.

---

# 🎨 Next Phase

The next phase is the DigiWork React frontend:

```text
React
   ↓
React Router
   ↓
DigiWork UI
   ↓
Homepage
   ↓
Category Page
   ↓
Subcategory Page
   ↓
Article Page
   ↓
Search Page
   ↓
Admin Login
   ↓
Admin Dashboard
   ↓
Admin Content Management
   ↓
Axios API Integration
   ↓
Responsive Website
```

---

## Project Identity

**Project Name:** DigiWork

**Tagline:**

> Simple answers to everyday tech problems.

**Project Type:**

> Full-stack step-by-step technology guide platform

**Backend:**

> Node.js + Express.js + MongoDB + Mongoose

**Frontend:**

> React.js

