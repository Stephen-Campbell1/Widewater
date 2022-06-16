import "./App.css";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  CredentialResponse,
} from "@react-oauth/google";

import ResumeApp from "./Resume/App.js";

import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const REGION = "us-east-1";
const GOOGLE_CLIENT_ID =
  "178721302077-1nv3gqu24u73q75u1ggq0sthsdviv236.apps.googleusercontent.com";

async function responseGoogle(response: CredentialResponse) {
  console.log("Google's message", response);
  if (!response.credential) {
    return;
  }
  const credentials = fromCognitoIdentityPool({
    // Required. The unique identifier for the identity pool from which an identity should be
    // retrieved or generated.
    identityPoolId: "us-east-1:734d42db-e058-4bb6-8f17-bf850f1813aa",
    // Optional. A standard AWS account ID (9+ digits)
    // accountId: "123456789",
    // Optional. A cache in which to store resolved Cognito IdentityIds.
    // cache: custom_storage,
    // Optional. A unique identifier for the user used to cache Cognito IdentityIds on a per-user
    // basis.
    // userIdentifier: "user_0",
    // Optional. The ARN of the role to be assumed when multiple roles were received in the token
    // from the identity provider.
    // customRoleArn: "arn:aws:iam::1234567890:role/MYAPP-CognitoIdentity",
    // Optional. A set of name-value pairs that map provider names to provider tokens.
    // Required when using identities associated with external identity providers such as Facebook.
    logins: {
      // "graph.facebook.com": "FBTOKEN",
      // "www.amazon.com": "AMAZONTOKEN",
      "accounts.google.com": response.credential,
      // "api.twitter.com": "TWITTERTOKEN",
      // "www.digits.com": "DIGITSTOKEN",
    },
    // Optional. Custom client config if you need overwrite default Cognito Identity client
    // configuration.
    clientConfig: { region: REGION },
  });

  const aw_creds = await credentials();
  console.log(aw_creds);
  const client = new DynamoDBClient({ region: REGION, credentials });
  const command = new GetItemCommand({
    TableName: "Beancount-Main",
    Key: {
      "User-SUB": {
        S: aw_creds.identityId,
      },
    },
  });
  const ddbResponse = await client.send(command);
  console.log("ddb", ddbResponse);
}

function App() {
  return (
    <ResumeApp />
    // <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <p>Hello world</p>
    //     <GoogleLogin
    //       onSuccess={responseGoogle}
    //       onError={() => console.log("Failed")}
    //     />
    //   </div>
    // </GoogleOAuthProvider>
  );
}

export default App;
