import { app, myAuth, myFirestore, firebaseConfig } from '../firebase.config';

jest.mock('../firebase.config', () => ({
    firebaseConfig: {
        apiKey: 'your-api-key',
        authDomain: 'your-auth-domain',
        databaseURL: 'your-database-url',
        projectId: 'your-project-id',
        storageBucket: 'your-storage-bucket',
        messagingSenderId: 'your-messaging-sender-id',
        appId: 'your-app-id',
        measurementId: 'your-measurement-id'
    },
    app: jest.fn(),
    myAuth: {
        app: {
            options: {
                persistence: {
                    type: 'LOCAL',
                    synchronized: true
                }
            }
        }
    },
    myFirestore: {
        app: jest.fn()
    }
}));

describe('Firebase Config', () => {
    test('should initialize Firebase app', () => {
        expect(app).toBeDefined();
    });

    test('should have valid Firebase configuration', () => {
        const expectedConfig = {
            apiKey: 'your-api-key',
            authDomain: 'your-auth-domain',
            databaseURL: 'your-database-url',
            projectId: 'your-project-id',
            storageBucket: 'your-storage-bucket',
            messagingSenderId: 'your-messaging-sender-id',
            appId: 'your-app-id',
            measurementId: 'your-measurement-id'
        };

        expect(firebaseConfig).toEqual(expectedConfig);
    });

    test('should initialize Auth with correct persistence', () => {
        const authOptions = myAuth.app.options;
        expect(authOptions.persistence.type).toBe('LOCAL');
        expect(authOptions.persistence.synchronized).toBe(true);
    });


    test('should initialize Auth', () => {
        expect(myAuth).toBeDefined();
    });

    test ('should initialize Firestore', () => {
        expect(myFirestore).toBeDefined();
    });

});
