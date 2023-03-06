import {initializeApp} from 'firebase/app'
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCX_CsUWC8NhNLqB6rXNTTNgmeMh4XmNIc",
  authDomain: "echo-cards.firebaseapp.com",
  projectId: "echo-cards",
  storageBucket: "echo-cards.appspot.com",
  messagingSenderId: "598774235695",
  appId: "1:598774235695:web:447566b2aff813fb4b7cda",
  measurementId: "G-CPHB700HN1"
};

export default function Login({setUser, setIsUser}) {
    const loginWithGoogle = async () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        const _user = await signInWithPopup(auth, provider)
            .catch(alert)
        console.log(_user)
        setUser(_user.user)
    }
    // const handleSubmit = async ({email, password}) => {
    //     const app = initializeApp(firebaseConfig);
    //     const auth = getAuth(app)
    //     const _user = await signInWithEmailAndPassword(auth, email, password)
    //         .catch(alert)
    //         console.log(_user)
    //     setUser(_user.user)
    // }
    return(
        <section>
        <h1>Login</h1>
        {/* <Form onFinish={handleSubmit} labelCol={{ span:8 }} wrapperCol={{ span:16 }}>
            <Form.Item label="Email" name="email">
                <Input type='email' />
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>Login</Button>
            </Form.Item>
        </Form> */}
        <button onClick={loginWithGoogle}>Login with Google</button>
        </section>
    )
}