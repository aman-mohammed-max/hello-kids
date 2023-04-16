import { Box, Card, Grid, Heading } from "grommet";
import React from "react";

export default function ABCD() {
  return (
    <Box height="100%" pad="medium">
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
        <Card justify="center" align="center" onClick={() => {}}>
          <Heading margin="none"> Slate</Heading>
        </Card>
        <Card justify="center" align="center" onClick={() => {}}>
          <Heading margin="none"> ABCD</Heading>
        </Card>

        <Card />
        <Card />
      </Grid>
    </Box>
  );
}
