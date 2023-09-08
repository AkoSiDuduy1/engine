Web3-API supports Google KMS for signing & sending transactions over any EVM chain. This is a guide on how to set up Google KMS for Web3-API.

### Steps to set up Google KMS

1. Enable Google KMS API for your Google project, see [here](https://cloud.google.com/kms/docs/create-encryption-keys#before-you-begin) for more details.
2. Create a Service Account (here)[https://cloud.google.com/iam/docs/service-accounts-create] and create a key under this service account and download the JSON file. This JSON file details will be used to authenticate with Google KMS.
3. Add the below permissions to the service account created in step 2.

```
Cloud KMS Admin
Cloud KMS CryptoKey Signer/Verifier
```

4. Create a keyring in Google KMS, see [here](https://cloud.google.com/kms/docs/create-key-ring) for more details.

Optional: Create a key in the keyring, see [here](https://cloud.google.com/kms/docs/create-key) for more details. or, you can use the `/wallet/create` to create a key in the keyring.

### Set up Web3-API with Google KMS

Create a `.env` file in the root directory of the project and add the below details.

```
# Required for Google Auth
GOOGLE_APPLICATION_CREDENTIAL_EMAIL=<client_email_from_download_service_account_json>
GOOGLE_APPLICATION_CREDENTIAL_PRIVATE_KEY=<private_key_from_download_service_account_json>

# Required for Google KMS
GOOGLE_APPLICATION_PROJECT_ID=<google_project_id>
GOOGLE_KMS_KEY_RING_ID=<key_ring_id>
GOOGLE_KMS_LOCATION_ID=<location_of_key_ring>
GOOGLE_KMS_CRYPTO_KEY_ID=<kms_key_id> # If created on Google Console
```