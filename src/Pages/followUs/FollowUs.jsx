import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { Box, Typography, Modal, IconButton, Paper } from "@mui/material";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const StyledModalBox = styled(Paper)(({ theme }) => ({
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  display: "flex",
  flexDirection: "column",
  bgcolor: "#ffffff",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    padding: theme.spacing(2),
  },
}));

const Container = styled(Box)(({ theme }) => ({
  width: "90%",
  margin: "20px auto",
  paddingTop: theme.spacing(5),
  [theme.breakpoints.up("sm")]: {
    width: "70%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "95%",
    padding: theme.spacing(2),
  },
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: 240,
  overflow: "hidden",
  [theme.breakpoints.up("sm")]: {
    width: 260,
    height: 240,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "auto",
  display: "block",
});

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: 0,
  transition: "opacity 0.3s ease",
  color: "white",
  "&:hover": {
    opacity: 1,
  },
}));

const Child1 = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(2),
  },
}));

const Child2 = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2.5),
  marginTop: theme.spacing(2.5),
  overflowX: "auto",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const IconGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1.25),
  marginTop: theme.spacing(3),
}));

const ModalContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginLeft: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: theme.spacing(2),
  },
}));

const NavigationContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
  display: "flex",
  gap: theme.spacing(1),
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  zIndex: 10,
}));

const images = [
  "/assets/Home/followUs-banner1.webp",
  "/assets/Home/followUs-banner2.webp",
  "/assets/Home/followUs-banner3.webp",
  "/assets/Home/followUs-banner4.webp"
];

const contents = [
  {
    content: "Himalaya Herbals Nourishing Skin Cream",
    desc: "Enriched with natural ingredients like Aloe Vera and Indian Kino Tree, this face cream deeply nourishes and revitalizes your skin, providing a soft, smooth texture while improving overall skin health.",
  },
  {
    content: "Himalaya Complete Care Toothpaste",
    desc: "Formulated with a unique blend of herbal ingredients, this toothpaste provides comprehensive care for your teeth and gums, protecting against cavities, plaque, and bad breath while ensuring fresh breath throughout the day.",
  },
  {
    content: "Himalaya Ashwagandha",
    desc: "Ashwagandha is a powerful adaptogen known for its ability to help the body adapt to stress and support overall wellness. This supplement enhances stamina, reduces anxiety, and improves cognitive function.",
  },
  {
    content: "Himalaya Botanique Whitening Toothpaste",
    desc: "Designed to enhance your smile, this whitening toothpaste combines natural whitening agents with herbal extracts to gently remove stains and restore your teeth's natural whiteness while maintaining oral health.",
  },
];

const FollowUs = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledModalBox>
          <ImageWrapper>
            <Image src={images[currentIndex]} alt={`Modal Content ${currentIndex + 1}`} />
          </ImageWrapper>
          <NavigationContainer>
            <NavigationButton onClick={handlePrev} aria-label="Previous">
              {'<'}
            </NavigationButton>
            <NavigationButton onClick={handleNext} aria-label="Next">
              {'>'}
            </NavigationButton>
          </NavigationContainer>
          <ModalContent>
            <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
              {contents[currentIndex].content}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              {contents[currentIndex].desc}
            </Typography>
          </ModalContent>
        </StyledModalBox>
      </Modal>

      <Container>
        <Child1>
          <Typography variant="h4" sx={{ fontWeight: 500, color: '#333' }}>
            Follow us @himalayausa
          </Typography>
          <IconGroup>
            <IconButton
              component="a"
              href="https://www.instagram.com/himalayausa/"
              target="_blank"
              sx={{ color: '#777777', '&:hover': { color: '#a3b49b' } }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/HimalayaUSA"
              target="_blank"
              sx={{ color: '#777777', '&:hover': { color: '#a3b49b' } }}
            >
              <FacebookOutlinedIcon />
            </IconButton>
          </IconGroup>
        </Child1>

        <Child2>
          {images.map((src, index) => (
            <Box key={index} component="a" sx={{ flex: '0 0 auto' }}>
              <ImageWrapper>
                <Image src={src} alt={`category-${index + 1}`} />
                <Overlay>
                  <IconButton
                    onClick={() => handleOpen(index)}
                    sx={{ color: 'white' }}
                  >
                    <InstagramIcon />
                  </IconButton>
                </Overlay>
              </ImageWrapper>
            </Box>
          ))}
        </Child2>
      </Container>
    </>
  );
};

export default FollowUs;
