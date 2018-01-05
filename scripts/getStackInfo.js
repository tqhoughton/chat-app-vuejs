const fs = require('fs'),
      Promise = require('bluebird'),
      aws = require('aws-sdk'),
      args = require('minimist')(process.argv.slice(2)),
      region = args.region || 'us-west-2',
      stackName = args.stack || 'chat-app-serverless-dev'

const credentials = new aws.SharedIniFileCredentials({ profile: 'personal' });

if (credentials.accessKeyId) {
  aws.config.credentials = credentials
}

aws.config.update({
    region
})

const cloudformation = Promise.promisifyAll(new aws.CloudFormation()),
      iot = Promise.promisifyAll(new aws.Iot())

const params = {
  StackName: stackName
}
  
Promise.all([iot.describeEndpointAsync(), cloudformation.describeStacksAsync(params)]).then(([iotEndpoint, data]) => {
  console.log(iotEndpoint)
  if (!data || !data.Stacks.length) throw new Error('return was empty.')
  const outputs = data.Stacks[0].Outputs
  //console.log(data.Stacks[0])
  
  const userPoolId = outputs.find((i) => {
    return i.OutputKey === 'UserPoolId'
  }).OutputValue
  const appClientId = outputs.find((i) => {
    return i.OutputKey === 'UserPoolAppClient'
  }).OutputValue
  const apiEndpoint = outputs.find((i) => {
    return i.OutputKey === 'ServiceEndpoint'
  }).OutputValue
  const iotChannel = outputs.find((i) => {
    return i.OutputKey === 'IotChannel'
  }).OutputValue
  const identityPoolId = outputs.find((i) => {
    return i.OutputKey === 'IdentityPoolId'
  }).OutputValue
  let file = `module.exports = {
  USER_POOL_ID: '${userPoolId}',
  USER_POOL_APP_CLIENT: '${appClientId}',
  API_GATEWAY_ENDPOINT: '${apiEndpoint}',
  IOT_CHANNEL: '${iotChannel}',
  AWS_REGION: '${region}',
  IOT_ENDPOINT: '${iotEndpoint.endpointAddress}',
  IDENTITY_POOL_ID: '${identityPoolId}'
}`
  fs.writeFile('src/globals/resources.js', file, (err, data) => { console.log('success! exiting...')})
})