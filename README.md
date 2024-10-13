# RAM : API limiter

Welcome to the **RAM API** project! This platform allows users to manage, save, and edit JSON policies while offering built-in rate-limiting functionalities, user authentication, and algorithm comparison features. RAM API is designed to be a flexible and scalable solution for controlling access and efficiently managing JSON-based policies.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Architecture](#architecture)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Rate Limiting Algorithms](#rate-limiting-algorithms)
- [Lambda Role policies](#lambda-role-policies-required)
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

## Rate Limiting Algorithms

The RAM API supports the following rate-limiting algorithms:

- **Fixed Window**: Simple fixed window-based rate limiting.

- **Sliding Window**: A more accurate sliding window algorithm.

- **Token Bucket**: Allows burst traffic while maintaining control over the rate.

- **Leaky Bucket**: Controls the rate of requests in a smooth, predictable way.

- **Step Ladder (Custom Algorithm)**: A custom-made algorithm designed to gradually scale the rate limits based on traffic behavior. This algorithm allows for dynamic adjustments in the rate limit, stepping up or down based on usage patterns. It is useful for scenarios where traffic varies significantly over time, and a static rate limit is inefficient.


## Setup and Installation

### Prerequisites

- **Node.js** (version 16.x or later)
- **AWS CLI** (configured with access to your AWS account)
- **Firebase CLI**
- **Redis** (local or cloud-based instance)
- **Vite** for frontend development

### Steps

1. Clone the repository:
   ```
   https://github.com/Hexton09/RAM-API-rate-limiter
   cd ram-api
   ```
2. Install dependencies:

   Install the required Node.js dependencies for the project:
   ```
   npm install
   ```
3.  Set up your environment variables:
   
   Create a .env file in the root directory and add the necessary AWS, Redis, and Firebase credentials:
   ```
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   REDIS_HOST=your_redis_host
   REDIS_PORT=your_redis_port
   FIREBASE_API_KEY=your_firebase_api_key
   FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   FIREBASE_PROJECT_ID=your_firebase_project_id
   ```
4. Backend Deployment
   * We need to create 6 AWS Lambda Functions (All scripts are present in the server) [Go to the server directory](/server)
      * 4 for DIfferent algorithm
      * One for controller function
      * One for compare function
   * For the 4 algorithm lambda you need to upload the zip file first and then create (Given in the server page)
      ```
      lambda_function.py
      ```
      And paste those scripts
   * Create tthe 2 lambda functions (for these you do not require zip file)
   
6. Start the frontend:

   After deploying the backend, you can start the frontend development server:
   ```
   npm run dev
   ```



## Lambda role policies required

- Lambda Role Policies Required
-  AmazonAPIGatewayAdministrator
-  AmazonEC2FullAccess
-  AmazonElastiCacheFullAccess
-  AWSLambda_FullAccess
-  [Custom Policy](server/Lambda%20functions/Lambda_function_Policy): Ensure you have a custom policy for Redis access if needed.

Custom Policy

## Redis URL
In this format the environment variable should be set up in lambda function

URL - rediss://redis-endpoint


