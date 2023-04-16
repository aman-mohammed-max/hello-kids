import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/FirebaseAuth";
import {
  Box,
  Page,
  PageContent,
  MaskedInput,
  Button,
  TextInput,
  Grommet,
  grommet,
  Heading,
  Text,
  Anchor,
  CardBody,
  Card,
  CardFooter,
  Layer,
} from "grommet";
import styles from "./index.module.css";
import { deepMerge } from "grommet/utils";
import { MailOption, Hide, View } from "grommet-icons";
import { Browser } from "react-kawaii";

export default function Login() {
  const { user, signIn } = UserAuth();
  if (user) return <Navigate to="/" />;

  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mood, setmood] = useState("lovestruck");
  const [h1, seth1] = useState({ msg: "", color: "" });
  const [show, setShow] = useState();
  const [passfoco, setpassfoco] = useState("transparent");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
      if (e.code === "auth/user-not-found") {
        seth1((prevState) => ({
          ...prevState,
          msg: "we can't find this user",
          color: "status-critical",
        }));
      } else if (e.message === "") {
        setShow(false);
      } else setShow(true);
    }
  };

  const handlepassword = (event) => {
    setPassword(event.target.value);

    if (event.target.value.length < 6) {
      setmood("sad");
      setpassfoco("status-critical");
      seth1((prevState) => ({
        ...prevState,
        msg: "Password should be at least 6 characters",
      }));
    } else {
      setmood("lovestruck");
      setpassfoco("status-ok");
      seth1((prevState) => ({
        ...prevState,
        msg: "",
      }));
    }

    switch (event.target.value.length) {
      case 0:
        setpassfoco("transparent");
        seth1((prevState) => ({
          ...prevState,
          msg: "",
        }));
        break;
      default:
        break;
    }
  };

  const emailMask = [
    {
      regexp: /^[\w\-_.]+$/,
      placeholder: "example",
    },
    { fixed: "@" },
    {
      regexp: /^[\w]+$/,
      placeholder: "my",
    },
    { fixed: "." },
    {
      regexp: /^[\w]+$/,
      placeholder: "com",
    },
  ];

  return (
    <Page kind="narrow" height="100%" className={styles.page}>
      <PageContent
        background="#FCFBF5"
        align="center"
        height="100%"
        pad={{ vertical: "xlarge" }}
      >
        <Box pad={{ vertical: "large" }}>
          <Browser size={260} mood={mood} color="#83D1FB" />
        </Box>
        <Heading level={2} margin="none">
          Playtime Portal Login
        </Heading>
        <Box align="center" justify="start" pad="large">
          <Box width="medium" gap="medium">
            <MaskedInput
              icon={<MailOption />}
              mask={emailMask}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Box>
              <Grommet
                theme={deepMerge(grommet, {
                  global: {
                    colors: {
                      focus: passfoco,
                      background: "transparent",
                    },
                  },
                })}
              >
                <Box width="medium" direction="row" round="xxsmall" border>
                  <TextInput
                    plain
                    placeholder="Password"
                    type={reveal ? "text" : "password"}
                    value={password}
                    onChange={handlepassword}
                    aria-label="Input Password"
                  />
                  <Button
                    icon={
                      reveal ? <View size="medium" /> : <Hide size="medium" />
                    }
                    onClick={() => setReveal(!reveal)}
                  />
                </Box>
              </Grommet>
              <Text
                size="small"
                color={h1.color}
                margin={h1.msg === "" ? "nano" : "xsmall"}
              >
                {h1.msg}
              </Text>
            </Box>
            <Button onClick={handleSubmit} primary label="Login" />
            <Text>
              Join in on the Fun -{" "}
              <Anchor href="/signup" label=" Sign Up Now!" />
            </Text>
          </Box>
        </Box>
        <Box>
          {show && (
            <Layer
              background="tansparent"
              onEsc={() => setShow(false)}
              onClickOutside={() => setShow(false)}
            >
              <Card
                round="medium"
                background="background"
                elevation="none"
                width="medium"
              >
                <CardBody
                  pad={{
                    top: "xlarge",
                    horizontal: "medium",
                    bottom: "small",
                  }}
                >
                  <Box align="center">
                    <Heading margin="medium" level={4}>
                      {error}
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
                    onClick={() => setShow(false)}
                    label="close"
                    hoverIndicator
                  />
                </CardFooter>
              </Card>
            </Layer>
          )}
        </Box>
      </PageContent>
    </Page>
  );
}
