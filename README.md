# RAM : API limiter

Welcome to the **RAM API** project! This platform allows users to manage, save, and edit JSON policies while offering built-in rate-limiting functionalities, user authentication, and algorithm comparison features. RAM API is designed to be a flexible and scalable solution for controlling access and efficiently managing JSON-based policies.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Rate Limiting Algorithms](#rate-limiting-algorithms)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **JSON Lab**: Create, save, and edit JSON policies in real-time.
- **Policy Comparison**: Compare different rate-limiting algorithms' performance.
- **Rate Limiting**: Supports Fixed Window, Sliding Window, Token Bucket, Leaky Bucket, and the custom Step Ladder algorithm.
- **Authentication**: User authentication using Firebase.
- **Session Management**: Firebase is used to manage user sessions effectively.
- **API Request Storage**: Redis is used to store API request data while Lambda functions are running.
- **API Gateway**: Integrates with Lambda functions for API management.

## Technologies Used

- **Backend**: AWS Lambda, Redis, API Gateway
- **Frontend**: React, Vite, Tailwind CSS
- **Authentication & Session Management**: Firebase
- **Data Storage**: Redis (for API request data)
- **Algorithms**: Fixed Window, Sliding Window, Token Bucket, Leaky Bucket, Step Ladder

## Architecture

The RAM API uses a microservices-based architecture with the following components:

1. **Main Lambda Function**: Receives API requests and routes them to the appropriate rate-limiting algorithm.
2. **Rate-Limiting Lambdas**: Implements Fixed Window, Sliding Window, Token Bucket, Leaky Bucket, and Step Ladder algorithms.
3. **Redis**: Temporarily stores API request data while Lambda functions are running.
4. **Firebase**: Manages user authentication and sessions.
5. **API Gateway**: Manages all incoming API requests and forwards them to the Lambda functions.

![image](https://github.com/user-attachments/assets/f27738dc-cb9b-4329-a4ad-5e02887fb121)

## Setup and Installation

### Prerequisites

- **Node.js** (version 16.x or later)
- **AWS CLI** (configured with access to your AWS account)
- **Firebase CLI**
- **Redis** (local or cloud-based instance)
- **Vite** for frontend development

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Aditya-567/ram-api.git
   cd ram-api



## lambda role policies required

AmazonAPIGatewayAdministrator

AmazonEC2FullAccess

AmazonElastiCacheFullAccess

AWSLambda_FullAccess

Custom Policy

## Redis URL
rediss://redis-endpoint
