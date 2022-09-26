<!--
title: 'Twitter Bot for Web3 Projects'
description: 'This is simple REST API powered by a AWS Lambda and Serverless framework.'
layout: Doc
framework: v1
platform: NA
language: nodeJS
priority: 10
authorLink: 'https://github.com/albertocevallos'
authorName: 'Alberto Cevallos'
-->

# MEV Boost Relay Bot

This repo contains a simple bot that polls for block rewards using  Flashbot's [relay api](http://boost-relay.flashbots.net)  interacting with the Twitter v2 API. It is powered by AWS Lambda and Serverless framework.

## Also supports

- REST API with typescript
- Multi-environment management under Serverless
- Mocha unit tests and lambda-tester interface test
- AWS lambda function log view

## Setup AWS

```
sls config credentials --provider aws \
 --key <aws_access_key_id> \
 --secret <aws_secret_access_key>
```

## Invoke the function locally

```bash
serverless invoke local --function find
```

Which should result in:

```bash
Serverless: Compiling with Typescript...
Serverless: Using local tsconfig.json
Serverless: Typescript compiled.

{
    "statusCode": 200,
    "body": "{\"code\":0,\"message\":\"success\",\"data\":[{\"_id\":\"5dff21f71c9d440000a30dad\",\"createdAt\":\"2020-05-16T09:27:51.219Z\"},{\"_id\":\"5dff22ba1c9d440000a30dae\",\"createdAt\":\"2020-05-16T09:27:51.220Z\"}]}"
}
```

## Deploy

### To Test It Locally

- Run `yarn install` to install all the necessary dependencies.
- Run `yarn dev` use serverless offline to test locally.

### Deploy on AWS, simply run:

```bash
$ yarn deploy #for staging

# or

$ deploy:prod #for production
```
