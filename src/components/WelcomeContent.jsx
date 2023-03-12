import Button from "react-bootstrap/Button";
import "../styles/welcome.css";

export default function WelcomeContent() {
  return (
    <div className="welcome-page-background">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div>
              <h1 className="text-center">RETAIN MORE, FORGET LESS</h1>
              <h2 className="text-center">
                Learn more effectively and remember info for longer periods of
                time.
              </h2>
              <div className="d-flex align-items-center justify-content-center">
                <Button className='button-welcome'>Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//

// export default function WelcomeContent() {
//     return (
//         <div className='welcome-page-background'>
//         <div className='container-fluid'>
//             <div className='row'>
//                 <div className='col-md-6 d-flex align-items-center justify-content-center'>
//                     <div>
//                         <h1 className='text-center'>RETAIN MORE, FORGET LESS</h1>
//                         <h2 className='text-center'>Learn more effectively and remember info for longer periods of time.</h2>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </div>
//     )
// }

// import '../styles/welcome.css'

// export default function WelcomeContent() {
//     return(
//         <body className='welcome-page-background'>

//         <div>
//         <h1>RETAIN MORE, FORGET LESS</h1>
//         </div>
//         <div>
//         <h2>Learn more effectively and remember info for longer periods of time.</h2>
//         </div>
//         </body>
//     )
// }
