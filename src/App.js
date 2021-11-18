import { useState } from 'react';

// react-tostify import 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// reactstrap import
import 'bootstrap/dist/css/bootstrap.css';
import { Card, CardBody, Button, Container, Col, Row } from 'reactstrap';
import Icon from './components/Icon';

// Import css after reactstarp
import './App.css'
// Matrix 
const itemArray = new Array(9).fill("empty");
const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setwinMessage] = useState("");

  const reloadGame = () => {
    //Reset every state
    setIsCross(false);
    setwinMessage("");
    itemArray.fill("empty", 0, 9);
  }

  const checkIsWinner = () => {
    //  Check for rowwise
    if (itemArray[0] === itemArray[1] && itemArray[2] === itemArray[1] && itemArray[0] !== "empty") {
      setwinMessage(`${itemArray[0]} Wins`)
    } else if (itemArray[3] === itemArray[4] && itemArray[5] === itemArray[4] && itemArray[3] !== "empty") {
      setwinMessage(`${itemArray[3]} Wins`)
    }
    else if (itemArray[6] === itemArray[7] && itemArray[8] === itemArray[7] && itemArray[6] !== "empty") {
      setwinMessage(`${itemArray[6]} Wins`)
    }

    //  Check for colwise {(0,3,6) , (1,4,7) , (2,5,8)}
    if (itemArray[0] === itemArray[3] && itemArray[6] === itemArray[3] && itemArray[0] !== "empty") {
      setwinMessage(`${itemArray[0]} Wins`)
    } else if (itemArray[1] === itemArray[4] && itemArray[7] === itemArray[4] && itemArray[1] !== "empty") {
      setwinMessage(`${itemArray[1]} Wins`)
    }
    else if (itemArray[2] === itemArray[5] && itemArray[8] === itemArray[5] && itemArray[2] !== "empty") {
      setwinMessage(`${itemArray[2]} Wins`)
    }

    //  Check for diagonal wise (0,4,8) , (2,4,6)
    if (itemArray[0] === itemArray[4] && itemArray[8] === itemArray[4] && itemArray[0] !== "empty") {
      setwinMessage(`${itemArray[0]} Wins`)
    } else if (itemArray[2] === itemArray[4] && itemArray[6] === itemArray[4] && itemArray[2] !== "empty") {
      setwinMessage(`${itemArray[2]} Wins`)
    }
  }

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" })
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("Already Filled", { type: "error" });
    }

    checkIsWinner();
  }
  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMessage}
              </h1>
              <Button color="success" block onClick={reloadGame}> Reload Game</Button>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {isCross ? "Cross" : "Circle"} Turn
            </h1>
          )}
          <div className="grid">
            {
              itemArray.map((item, index) => (
                <Card color="warning" onClick={() => changeItem(index)}>
                  <CardBody className="box">
                    <Icon name={item} />
                  </CardBody>
                </Card>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
