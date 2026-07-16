# Firestore rules for Account ID login (website)

The website stores passwordless accounts in collection `accounts`.

Your Unity game already uses anonymous Firebase Auth + `players/{uid}`.

Add rules for `accounts` (merge into your existing rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Passwordless Account ID login for the website
    match /accounts/{accountId} {
      // Anyone signed in (anonymous is fine) can read/create accounts.
      // Knowing the Account ID is the only "credential" — as requested.
      allow read: if request.auth != null;
      allow create: if request.auth != null
                    && request.resource.data.accountId == accountId
                    && request.resource.data.keys().hasAll(['accountId', 'displayName', 'firebaseUid']);
      allow update: if request.auth != null;
      allow delete: if false;
    }

    // Keep your existing players / alliances rules here…
  }
}
```

## Firebase Console checklist

1. **Authentication → Sign-in method → Anonymous → Enable**
2. **Firestore → Rules** → add the `accounts` block above → Publish
3. Optional: register a **Web app** in Project settings (Android app id already works for the JS SDK)

## How login works

- **Create**: generates `DD-XXXXXXXX`, writes `accounts/{id}`
- **Log in**: looks up `accounts/{id}` — **no password**
- Session is cached in the browser (localStorage)
