const aws = require('aws-sdk'),
      args = require('minimist')(process.argv.slice(2)),
      distributionId = args.d

const credentials = new aws.SharedIniFileCredentials();
console.log(credentials)

if (credentials.accessKeyId) {
  aws.config.credentials = credentials
}

const cloudfront = new aws.CloudFront()

const cloudfrontParams = {
  DistributionId: distributionId,
  InvalidationBatch: {
    CallerReference: '' + new Date().getTime()/1000,
    Paths: {
      Quantity: 1,
      Items: [
          '/*'
      ]
    }
  }
}

cloudfront.createInvalidation(cloudfrontParams, (data) => {
  console.log(data)
  console.log('done!')
})