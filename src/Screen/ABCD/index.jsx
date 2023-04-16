import { Box, Button, Card, Grid, Header, Heading, Text } from "grommet";
import React, { useRef } from "react";
import letters from "./letter";
import { FormPreviousLink } from "grommet-icons";
import { useNavigate } from "react-router-dom";

export default function ABCD() {
  const audioRef = useRef(null);

  const navigate = useNavigate();

  const handleCardClick = (audioSrc) => {
    audioRef.current.src = audioSrc;
    audioRef.current.play();
  };
  return (
    <>
      <Header background="brand">
        <Button
          icon={<FormPreviousLink />}
          hoverIndicator
          onClick={() => navigate("/")}
        />
        <Heading alignSelf="center" margin="none">
          ABCD
        </Heading>
        <Text></Text>
      </Header>
      <Box height="100%" pad="medium">
        <Grid
          columns={{ count: "fill", size: "small" }}
          rows="small"
          gap="small"
        >
          {letters.map((letter) => (
            <Card
              onClick={() => handleCardClick(letter.audio)}
              justify="center"
              align="center"
              key={letter.letter}
            >
              <Heading margin="none">
                {letter.letter} {letter.letter.toLowerCase()}
              </Heading>
            </Card>
          ))}
        </Grid>
        <audio ref={audioRef} />
      </Box>
    </>
  );
}
