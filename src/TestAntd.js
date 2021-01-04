import { Button, Row, Col, Divider  } from 'antd';

function TestAntd() {
  return (
    <div>
      <h1>Test Antd</h1>
      <Button>Button</Button>
      <Row>
        <Col xs={6}>col-6</Col>
        <Col xs={6}>col-6</Col>
      </Row>
    </div>
  );
}

export default TestAntd;