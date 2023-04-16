import {
  Anchor,
  Box,
  Button,
  Card,
  Footer,
  Grid,
  Header,
  Heading,
  Menu,
  Page,
  PageContent,
  Text,
} from "grommet";
import { Home, User } from "grommet-icons";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/FirebaseAuth";
import string from "../../Global/json/strings.json";
import React from "react";

export default function Main() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload();
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <>
      <Header background="brand">
        <Box direction="row">
          <Button icon={<Home />} hoverIndicator />
          <Heading level={3} margin="small">
            {string.appname}
          </Heading>
        </Box>
        <Menu
          dropBackground="brand"
          kind="toolbar"
          hoverIndicator
          icon={<User />}
          items={[
            {
              label: "logout",
              onClick: handleLogout,
            },
          ]}
        />
      </Header>
      <Page kind="wide" pad={"large"}>
        <PageContent>
          <Grid
            columns={{ count: "fill", size: "medium" }}
            rows="medium"
            gap="large"
          >
            <Card />
            <Card
              justify="center"
              align="center"
              onClick={() => navigate("/mathquiz")}
            >
              <Heading margin="none"> MathQuiz</Heading>
            </Card>
            <Card
              justify="center"
              align="center"
              onClick={() => {
                navigate("/Slate");
                document.documentElement.requestFullscreen();
              }}
            >
              <Heading margin="none"> Slate</Heading>
            </Card>
            <Card
              justify="center"
              align="center"
              onClick={() => {
                navigate("/abcd");
              }}
            >
              <Heading margin="none"> ABCD</Heading>
            </Card>

            <Card />
            <Card />
          </Grid>
        </PageContent>
      </Page>
      <Footer background="brand" pad="medium">
        <Text>Copyright</Text>
        <Anchor label="About" />
      </Footer>
    </>
  );
}
