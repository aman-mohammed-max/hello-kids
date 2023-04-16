import { Box, Button, Header, RangeInput } from "grommet";
import { Colors } from "grommet-controls";
import { Edit, Erase, FormPreviousLink, Trash } from "grommet-icons";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Slate() {
  const canvasRef = useRef(null);
  const headerRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);

  const navigate = useNavigate();

  const colr = {
    50: "#ff0000",
    100: "#00ff00",
    200: "#0000ff",
    300: "#ffff00",
    400: "#00ffff",
    500: "#000000",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const headr = headerRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    setCtx(context);
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - headr.offsetHeight - 5;
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.height = window.innerHeight - headr.offsetHeight - 5.0;
  }, []);

  const handleMouseDown = (event) => {
    setDrawing(true);
    ctx.beginPath();
    ctx.moveTo(
      event.clientX - canvasRef.current.offsetLeft,
      event.clientY - canvasRef.current.offsetTop
    );
  };

  const handleMouseMove = (event) => {
    if (drawing) {
      if (tool === "pencil") {
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineTo(
          event.clientX - canvasRef.current.offsetLeft,
          event.clientY - canvasRef.current.offsetTop
        );
        ctx.stroke();
      } else if (tool === "eraser") {
        ctx.clearRect(
          event.clientX - canvasRef.current.offsetLeft - size / 2,
          event.clientY - canvasRef.current.offsetTop - size / 2,
          size,
          size
        );
      }
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleColorChange = (event) => {
    setColor(event.color);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleClearAll = () => {
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <>
      <Header ref={headerRef} background="brand">
        <Button
          icon={<FormPreviousLink />}
          hoverIndicator
          onClick={() => {
            navigate("/");
            document.exitFullscreen();
          }}
        />
        <Box direction="row" justify="center" align="center" gap="small">
          <Button
            active={tool === "pencil" ? true : false}
            onClick={() => setTool("pencil")}
            icon={<Edit />}
          />
          <Button
            active={tool === "eraser" ? true : false}
            onClick={() => setTool("eraser")}
            icon={<Erase />}
          />
          <RangeInput
            min={1}
            max={20}
            id="size"
            value={size}
            onChange={handleSizeChange}
          />
          <Colors
            size="small"
            onChange={(e) => console.log(e.target.value)}
            onSelect={handleColorChange}
            columns={Object.keys(colr).length}
            colors={colr}
          />
          <Button onClick={handleClearAll} icon={<Trash />} />
        </Box>
      </Header>

      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  );
}

export default Slate;
