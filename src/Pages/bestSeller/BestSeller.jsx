import { Box, Typography, styled } from '@mui/material';

const Parent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(12.5),
  textAlign: 'center',
}));

const ParentContent = styled(Box)(({ theme }) => ({
  width: '70%',
  height: '270px',
  margin: '40px auto',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

const ParentChild = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '80%',
  textAlign: 'left',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const Image = styled('img')(({ theme }) => ({
  width: '140px',
  height: '200px',
  objectFit: 'cover',
  [theme.breakpoints.down('md')]: {
    width: '100px',
    height: 'auto',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '29px',
  color: '#333333',
  fontWeight: 500,
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '29px',
  color: '#333333',
  fontWeight: 300,
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
  },
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#333333',
  lineHeight: '28px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '24px',
  },
}));

const Container = styled(Box)(({ theme }) => ({
  width: '70%',
  height: '250px',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'column-reverse',
  gap: theme.spacing(3),
  margin: '0px auto',
  alignItems: 'center',
  padding: theme.spacing(3.75),
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    width: '70%',
  },
}));

const BoxItem = styled(Box)(({ theme }) => ({
  width: '32%',
  height: '200px',
  border: '0.5px solid #ababab',
  textAlign: 'left',
  marginBottom: theme.spacing(2.5),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
  },
}));

const BoxTitle = styled(Typography)(({ theme }) => ({
  color: '#333333',
  fontSize: '16px',
  lineHeight: '28px',
  fontWeight: 400,
  marginLeft: theme.spacing(2.5),
  marginTop: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
}));

const BoxParagraph = styled(Typography)(({ theme }) => ({
  color: '#ababab',
  fontSize: '13px',
  lineHeight: '22px',
  marginLeft: theme.spacing(2.5),
  marginTop: theme.spacing(2.5),
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));

const BoxSpan = styled(Box)(({ theme }) => ({
  width: '30px',
  height: '5px',
  backgroundColor: '#48cab2',
  display: 'inline-block',
  marginLeft: theme.spacing(2.5),
  marginTop: theme.spacing(3),
}));

const Anchors = styled(Box)(({ theme }) => ({
  width: '200px',
  display: 'flex',
  gap: theme.spacing(1.25),
  margin: '20px auto',
  [theme.breakpoints.down('sm')]: {
    width: '150px',
  },
}));

const Anchor = styled(Box)(({ theme }) => ({
  width: '30px',
  height: '5px',
  backgroundColor: '#48cab2',
  cursor: 'pointer',
}));

const BestSeller = () => {
  const handleSlide = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      console.error(`Element with id ${id} not found`);
    }
  };

  return (
    <>
      <Parent>
        <Typography variant="h4">Best Seller</Typography>
        <ParentContent>
          <Image src="/assets/Home/bestSeller.png" alt="Best Seller" />
          <ParentChild>
            <Title>Unlock the Wisdom of Herbs</Title>
            <Subtitle>with Herbal Supplements, Toothpaste & More!</Subtitle>
            <Paragraph>
              Since 1930, Himalaya has been passionate about the healing wisdom
              of herbs. We offer a wide range of clinically-studied herbal
              supplements, toothpaste, and personal care products that unlock the
              powerful healing benefits of herbs.
            </Paragraph>
          </ParentChild>
        </ParentContent>
      </Parent>
      <Container>
        <BoxItem>
          <BoxSpan />
          <BoxTitle id="1">
            We have tried countless fluoride-free toothpastes, and this is our
            favorite!
          </BoxTitle>
          <BoxParagraph>Botanique Complete Care Toothpaste - Peppermint</BoxParagraph>
        </BoxItem>
        <BoxItem>
          <BoxSpan />
          <BoxTitle>
            I am amazed. I am less irritable and tired, and more calm and
            centered.
          </BoxTitle>
          <BoxParagraph>Ashwagandha</BoxParagraph>
        </BoxItem>
        <BoxItem>
          <BoxSpan />
          <BoxTitle id="3">
            Recommended to me by my local health food store. This product is a
            godsend.
          </BoxTitle>
          <BoxParagraph>LiverCare®</BoxParagraph>
        </BoxItem>
        <BoxItem>
          <BoxSpan />
          <BoxTitle>
            I have seen such a drastic difference in my memory, it is hard to
            believe.
          </BoxTitle>
          <BoxParagraph>Bacopa</BoxParagraph>
        </BoxItem>
        <BoxItem>
          <BoxSpan />
          <BoxTitle>
            Other whitening toothpastes have not given me these kinds of
            results.
          </BoxTitle>
          <BoxParagraph>Botanique Complete Care Whitening Toothpaste - Mint</BoxParagraph>
        </BoxItem>
        <BoxItem>
          <BoxSpan />
          <BoxTitle id="6">
            “Since taking this product, I have cut back considerably on sugary
            snacks.”
          </BoxTitle>
          <BoxParagraph>Gymnema</BoxParagraph>
        </BoxItem>
      </Container>
      <Anchors>
        <Anchor onClick={() => handleSlide('1')} />
        <Anchor onClick={() => handleSlide('3')} />
        <Anchor onClick={() => handleSlide('6')} />
      </Anchors>
    </>
  );
};

export default BestSeller;
