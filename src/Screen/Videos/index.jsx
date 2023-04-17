import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Header,
  Heading,
  Image,
  Layer,
  Paragraph,
  Text,
} from "grommet";
import ReactPlayer from "react-player";
import { FormPreviousLink } from "grommet-icons";
import { useNavigate } from "react-router-dom";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [show, setShow] = useState(false);
  const [videoid, setvideoid] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchVideos() {
      const url =
        "https://www.googleapis.com/youtube/v3/search?key=" +
        import.meta.env.VITE_REACT_APP_GOOGLE_CONSOLE_KEY +
        "&type=video&part=snippet&q=kidssongs&maxResults=100";

      const response = await fetch(url);
      const data = await response.json();
      console.log(data.items);

      setVideos(data.items);
    }

    fetchVideos();
  }, []);

  function videohadio(videoid) {
    setShow(true);
    setvideoid(videoid);
  }

  return (
    <>
      <Header background="brand">
        <Button
          icon={<FormPreviousLink />}
          hoverIndicator
          onClick={() => navigate("/")}
        />
        <Heading alignSelf="center" margin="none">
          Videos
        </Heading>
        <Text></Text>
      </Header>
      <Box height="100%" pad="medium">
        <Grid columns={{ count: "fill", size: "medium" }} gap="small">
          {videos.map((video) => (
            <Card
              key={video.id.videoId}
              onClick={() => videohadio(video.id.videoId)}
            >
              <CardBody>
                <Image src={video.snippet.thumbnails.medium.url} />
              </CardBody>
              <CardFooter>
                <Box pad="small">
                  <Paragraph margin="none">{video.snippet.title}</Paragraph>
                </Box>
              </CardFooter>
            </Card>
          ))}
        </Grid>
        {show && (
          <Layer
            onEsc={() => setShow(false)}
            onClickOutside={() => setShow(false)}
          >
            <Box round>
              <ReactPlayer
                width={window.innerWidth - 100}
                height={window.innerHeight - 100}
                playing={true}
                url={`https://www.youtube.com/watch?v=${videoid}`}
              />
            </Box>
          </Layer>
        )}
      </Box>
    </>
  );
}
