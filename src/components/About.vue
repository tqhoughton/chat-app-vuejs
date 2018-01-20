<template>
  <article>
    <div class="inner">
      <h2>AWS Chat</h2>
      <hr>
      <h3>Creator: Turner Houghton</h3>
      <p>The purpose of this project was to take everything I've learned about serverless architecture and put it to the test.</p>
      <p>The reason that I've chosen to call this project AWS Chat is because all of the infrastructure is hosted on Amazon Web Services.</p>
      <h3>Technologies used:</h3>
      <ul>
        <li>Amazon Web Services
          <ul>
            <li>API Gateway</li>
            <li>Lambda</li>
            <li>Cognito</li>
            <li>S3</li>
            <li>DynamoDB</li>
            <li>Internet of Things</li>
            <li>CodeCommit</li>
            <li>CloudFront</li>
            <li>Amazon Certificate Manager</li>
          </ul>
        </li>
        <li>Serverless Framework</li>
        <li>VueJS
          <ul>
            <li>Vue Router</li>
            <li>Vue Resource</li>
            <li>Vuex</li>
          </ul>
        </li>
      </ul>
      <h3>How it Works</h3>
      <p>This application is hosted in a static S3 bucket, which is used as an origin for a CloudFront distribution. The distribution also has a custom SSL certificate provided by Amazon Certificate Manager.</p>
      <p>My front end framework of choice for this project is VueJS. I make use of many add-ons for vue, including Vue Router, Vue Resource, as well as Vuex for state management.</p>
      <p>I am proud to say that this application makes full use of a serverless architecture. The advantage of this kind of architecture is that there are no servers to manage or scaling to worry about. Another advantage is that this application is billed by execution time, meaning the costs are directly proportional to how often and how much it is used.</p>
      <p>All API requests are sent to an API hosted on API Gateway. This service allows us to map custom endpoints to Lambda functions. We also use a Cognito User Pool to authenticate our requests to ensure that no one is using our API without first signing up for an account.</p>
      <p>Once the request has been mapped to the appropriate Lambda function, the Lambda functions access our database solution as needed. For this project, I have chosen DynamoDB, Amazon's NoSQL managed database solution. Since this application is fairly simple, I have only 3 tables: a users table, a chats table, and a messages table.</p>
      <p>For certain actions, we also want to be able to notify users other than the request sender about what is going on. This is where IoT comes in. We use the IoT message broker to publish data to users who are logged into the app so that they can get new messages and other notifications in real time.</p>
      <h3>Possible Improvements</h3>
      <ol>
        <li>Tighten IoT permissions for users. If someone tried hard enough, they could use the mqtt client to listen in on other users' conversations.</li>
        <li>Add profile picture upload functionality. Right now everyone has the same anonymous profile picture.</li>
        <li>UI/Design improvements. UI/Design was not a high priority for this project, but could become one later.</li>
      </ol>
    </div>
  </article>
</template>
<style lang="scss" scoped>
  h2 {
    font-size: 3em;
    text-align: center;
    margin-top: .5em;
    margin-bottom: .5em;
  }
  
  h3 {
    font-size: 1.25em;
    color: #efefef;
    text-align: center;
  }
  
  hr {
    border-bottom: 2px solid white;
  }
  
  .inner {
    max-width: 750px;
    margin-left: auto;
    margin-right: auto;
  }
  
  article {
    font-size: 1em;
    padding-left: 5%;
    padding-right: 5%;
    box-sizing: border-box;
    min-height: 100vh;
    background: #4a4a4a;
    color: white;
    
    ul {
      font-size: 1.1em;
      list-style: square;
      margin-bottom: .5em;
      margin-left: 1em;
      list-style-position: outside;
      li {
        display: list-item;
      }
    }
    
    ol {
      list-style-position: outside;
      margin-left: 1em;
      padding-left: 0;
      li {
        display: list-item;
      }
    }
    
    p {
      text-align: left;
    }
  }
</style>