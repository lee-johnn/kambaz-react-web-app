import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// import { Link } from "react-router-dom";
export default function Dashboard() {
  return (

    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/reactjs.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/2000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/chewy.png" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CHEW2000 Intro to Chewy</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Learn about the Chewy company</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/3000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/hubspot.png" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">HUBS3000 HubSpot CRM</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">What's HubSpot</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/2510/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/java.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS2510 Fundies 2</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Fundamentals of CS 2</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/4000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/toast.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">TOAST4000 Toast</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Learn about Toast</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/5200/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/ai.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS5200 Intro to AI</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Learn AI Advancements</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/1000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/cybersecurity.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">CS1000 Cybersecurity 1</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Cybersecurity for beginners</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link to="/Kambaz/Courses/4000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark">
                <Card.Img variant="top" src="/images/finance.jpg" width="100%" height={160} />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">FINA4000 Finance</Card.Title>
                  <Card.Text className="wd-dashboard-course-description">Learn corporate finance</Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>);
}