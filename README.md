# nodefinalproject

## Table of Contents

- [About](#about)
- [Usage](#usage)
- [Routes](#routes)

## About <a name = "about"></a>

A Basic Project for final NodeJs Project

### Installing

Download this package, and then run:

```
npm install
```
Then you can run
```
node app.js
```
and the server side runs!


## Usage <a name = "usage"></a>

Server Base URI:  <b>http://localhost:3000</b>
Use this Basic url with the correct route listed below

### Available routes <a name = "routes"></a>

### User Routes
#### Get user  

```http
  GET /user/:id
```  
Response: User Object

| Parameter              |  Description                  |
| :----------------      |  :-------------------------   |
| `id`                   |  **Required**. ID of the user |

#### Sign In  

```http
  POST /user/signin
```  
Response: User Object

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `username`            |  user name the user entered at login |
| `password`            | user password the user entered at login |

#### Sign Up - create User  

```http
  POST /user
``` 
Response: User Object 

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `user`                |  full user object with all parameters, includes username and password|

#### Update User

```http
  PUT /user/:id
``` 
Response: User Object 

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `id`                  |  user id of the user
| `user`                |  full user object with all parameters, includes username and password|

### Business Routes
#### Create Business

```http
  POST /business/
``` 
Response: Business

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `business`                  |  full business object with all data
| `userId`                |  user Id of the business manager|

#### Update Business

```http
  PUT /business/:id
``` 
Response: Business

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `business`                  |  full business object with all data
| `id`                |  business id|

#### Get Business

```http
  GET /business/:userId
``` 
Response: Business

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `userId`                | id of the user!! the business belongs to|

### Service Routes
#### Get All Services of business

```http
  GET /service?business_id={business_id}
``` 
Response: Services list

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `business_id`                | id of the business to get services - send as query params!|

#### Get Service

```http
  GET /service/:id
``` 
Response: Service

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `id`                | id of the service|

#### Create Service

```http
  POST /service/
``` 
Response: Service

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `business_id`                | id of the business|
| `name`                | name of the service|
| `service`                | full service object|

#### Update Service

```http
  PUT /service/:id
``` 
Response: Service

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `id`                | id of the service|
| `service`                | full service object|

#### Delete Service

```http
  DELETE /service/:id
``` 

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `id`                | id of the service|

### Meetings Routes

#### Get All Meeting of business

```http
  GET /meeting?business_id={business_id}
```

Response: Meeting

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `business_id`                | id of the business to get services - send as query params!|

#### Get Meeting

```http
  GET /meeting/:id
```

Response: Meeting

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `id`                | id of the meeting|

#### Create Meeting

```http
  POST /meeting
```

Response: Meeting

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `business_id`                | id of the business|
| `start_time`                | the time the meeting start at|
| `duration`                | the duration of the meeting (minutes)|
| `meeting`             | full meeting object |

#### Update Meeting

```http
  PUT /meeting/:id
```

Response: Meeting

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `id`                | id of the meeting|
| `meeting`             | full meeting object |

#### Delete Meeting

```http
  DELETE /meeting/:id
```

| Parameter             |  Description                  |
| :----------------     |  :-------------------------   |
| `id`                | id of the meeting|




