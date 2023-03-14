import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../styles/welcome.css";

export default function WelcomeContent() {
  const navigate = useNavigate();
  
  return (
    <div className="welcome-page-background">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div className="text-container">
              <h1 className="text-center">RETAIN MORE, FORGET LESS</h1>
              <h2 className="text-center">
                Learn more effectively and remember info for longer periods of
                time.
              </h2>
              <div className="d-flex align-items-center justify-content-center">
                <Button className='button-welcome' onClick={() => navigate(`/signup`)}>Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

