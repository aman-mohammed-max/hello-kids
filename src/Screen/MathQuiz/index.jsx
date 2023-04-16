import {
  Box,
  Button,
  Card,
  Header,
  Heading,
  Page,
  PageContent,
  Paragraph,
  Text,
  Layer,
  CardBody,
  CardFooter,
} from "grommet";
import { SpeechBubble } from "react-kawaii";
import styles from "./index.module.css";
import { FormPreviousLink } from "grommet-icons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MathQuiz() {
  const [question, setQuestion] = useState(generateQuestion());
  const [userAnswer, setUserAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [fmessage, setFMessage] = useState("");
  const [buttonlabel, setbuttonlabel] = useState();
  const [show, setShow] = useState();
  const [mood, setmood] = useState();

  const navigate = useNavigate();

  function generateQuestion() {
    const operators = ["*", "/", "+"];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let answer;

    switch (operator) {
      case "*":
        answer = num1 * num2;
        break;
      case "/":
        num2 = num2 || 1;
        answer = num1 / num2;
        break;
      case "+":
        answer = num1 + num2;
        break;
      default:
        break;
    }

    return { num1, num2, operator, answer };
  }

  function clear() {
    setMessage("");
    setFMessage("");
    setShow(false);
  }

  function tryagin() {
    setMessage("");
    setFMessage("");
    setUserAnswer("");
    setShow(false);
    setQuestion(generateQuestion());
  }

  function checkAnswer() {
    const correctAnswer = question.answer;
    if (userAnswer === "") {
      setFMessage("Please enter your answer.");
    } else if (userAnswer == correctAnswer) {
      setMessage("Correct!");
      setFMessage("");
      setmood("blissful");
      setbuttonlabel("let's do it again");
      setShow(true);
      setQuestion(generateQuestion());
      setUserAnswer("");
    } else {
      setmood("sad");
      setbuttonlabel("Try again");
      setMessage("Incorrect. Please try again.");
      setShow(true);
    }
  }

  return (
    <>
      <Header background="#a8aedb">
        <Button
          icon={<FormPreviousLink />}
          hoverIndicator
          onClick={() => navigate("/")}
        />
        <Heading alignSelf="center" margin="none">
          Math Quiz
        </Heading>
        <Text></Text>
      </Header>
      <Page className={styles.page} kind="narrow" height="100%">
        <PageContent
          pad={{ vertical: "xlarge" }}
          justify="center"
          background="#e6f0dd"
          height="100%"
        >
          <Heading margin={{ horizontal: "medium", vertical: "none" }}>
            What is ?
          </Heading>

          <Box
            justify="center"
            pad={{ vertical: "large" }}
            align="center"
            direction="row"
          >
            <Card
              height="small"
              align="center"
              justify="center"
              width="small"
              background="light-1"
            >
              <Heading margin="large">{question.num1}</Heading>
            </Card>
            <Heading margin="small">{question.operator}</Heading>
            <Card
              height="small"
              align="center"
              justify="center"
              width="small"
              background="light-1"
            >
              <Heading margin="large">{question.num2}</Heading>
            </Card>
            <Heading margin="small"> = </Heading>
            <Card
              height="small"
              justify="center"
              align="center"
              width="small"
              background="light-1"
            >
              <Heading className={styles.inputcon} level={2} margin="none">
                <input
                  className={styles.ansinput}
                  placeholder="Answer"
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
              </Heading>
            </Card>
          </Box>
          <Box
            pad={{ horizontal: "large", left: "medium" }}
            justify="between"
            direction="row"
          >
            <Paragraph
              margin={{ left: "small", vertical: "none", right: "none" }}
            >
              {fmessage}
            </Paragraph>
            <Button
              type="submit"
              size="medium"
              color="#fab100"
              label="Submit"
              onClick={checkAnswer}
            />
          </Box>
          <Box>
            {show && (
              <Layer
                background="tansparent"
                onEsc={clear}
                onClickOutside={clear}
              >
                <Card
                  round="medium"
                  background="background"
                  elevation="none"
                  width="large"
                >
                  <CardBody
                    pad={{
                      top: "xlarge",
                      horizontal: "medium",
                      bottom: "small",
                    }}
                  >
                    <Box align="center">
                      <SpeechBubble mood={mood} color="#83D1FB" />
                      <Heading margin="medium" level={4}>
                        {message}
                      </Heading>
                    </Box>
                  </CardBody>
                  <CardFooter
                    justify="center"
                    pad={{
                      top: "none",
                      horizontal: "medium",
                      bottom: "large",
                    }}
                  >
                    <Button
                      onClick={tryagin}
                      label={buttonlabel}
                      hoverIndicator
                    />
                  </CardFooter>
                </Card>
              </Layer>
            )}
          </Box>
        </PageContent>
      </Page>
    </>
  );
}

export default MathQuiz;
