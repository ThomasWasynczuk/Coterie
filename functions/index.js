const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const { ethers } = require("ethers");

const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// admin.initializeApp();
const db = admin.firestore();
const auth = admin.auth();

exports.getNonceToSign = functions.https.onRequest((request, response) =>
  cors({ origin: true })(request, response, async () => {
    try {
      if (request.method !== "POST") {
        return response.sendStatus(403);
      }
      if (!request.body.address) {
        return response.sendStatus(400);
      }
      // Find User if they exist
      const userRef = await db
        .collection("users")
        .doc(request.body.address)
        .get();

      if (userRef.exists) {
        const currentNonce = userRef.data().nonce;
        return response.status(200).json({ nonce: currentNonce });
      } else {
        //Must create a random nonce
        const newNonce = Math.floor(Math.random() * 1000000).toString();

        // Create a new user
        const newUser = await auth.createUser({
          uid: request.body.address,
        });

        //Add Nonce to user document
        await db.collection("users").doc(newUser.uid).set({
          nonce: newNonce,
        });
        return response.status(200).json({ nonce: newNonce });
      }
    } catch (err) {
      console.log(err);
      return response.sendStatus(500);
    }
  })
);

exports.verifySignedMessage = functions.https.onRequest((request, response) =>
  cors({ origin: true })(request, response, async () => {
    try {
      if (request.method !== "POST") {
        return response.sendStatus(403);
      }
      if (!request.body.address || !request.body.signature) {
        return response.sendStatus(400);
      }
      const address = request.body.address;
      const sig = request.body.signature;
      // Get user document

      const userDocRef = db.collection("users").doc(address);
      const userRef = await userDocRef.get();

      if (userRef.exists) {
        const currentNonce = userRef.data().nonce;
        //Find address that signed thenonce
        const recoveredAddress = ethers.utils.verifyMessage(currentNonce, sig);

        // Verify that the addresses match
        if (recoveredAddress === address) {
          //Same address so update nonce for next time
          await userDocRef.update({
            nonce: Math.floor(Math.random() * 1000000).toString(),
          });

          // Create user token for this user
          const firebaseToken = await auth.createCustomToken(address);

          // Return token
          return response.status(200).json({ token: firebaseToken });
        } else {
          // Addresses dont match
          return response.sendStatus(401);
        }
      } else {
        //THis user doesnt exist
        console.log("user doc does not exist");
        return response.sendStatus(500);
      }
    } catch (err) {
      console.log(err);
      return response.sendStatus(500);
    }
  })
);
