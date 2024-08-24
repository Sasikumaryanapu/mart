import { Box, Typography, Link, styled } from '@mui/material';

const Parent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(12.5),
  textAlign: 'center',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  color: '#333333',
  fontWeight: 500,
}));

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
  marginTop: theme.spacing(5),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

const BoxItem = styled(Box)(({ theme }) => ({
  width: '350px',
  height: '350px',
  textAlign: 'center',
  '& img': {
    width: '70%',
    height: '70%',
    objectFit: 'cover',
    transition: 'width 0.3s ease, height 0.3s ease',
  },
  '& img:hover':{
    width:'90%',
    height:'90%'
  }
}));

const BoxTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  marginTop: theme.spacing(1),
}));

const BoxLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  color: '#a3b49b',
  textDecoration: 'none',
  display: 'block',
  marginTop: theme.spacing(1),
}));

const ShopByCategory = () => {
  return (
    <Parent>
      <Title>Shop By Category</Title>
      <Container>
        <BoxItem>
          <Link href="/products/health-interests">
            <img src="/assets/Home/shopCategory-banner-1.webp" alt="Supplements" />
          </Link>
          <BoxTitle>Supplements</BoxTitle>
          <BoxLink href="/products/health-interests">See All Supplements</BoxLink>
        </BoxItem>
        <BoxItem>
          <Link href="/products/oral-care">
            <img src="/assets/Home/shopCategory-banner-2.webp" alt="Oral Care" />
          </Link>
          <BoxTitle>Oral Care</BoxTitle>
          <BoxLink href="/products/oral-care">See All Oral Care</BoxLink>
        </BoxItem>
        <BoxItem>
          <Link href="/products/personal-care">
            <img src="/assets/Home/shopCategory-banner-3.webp" alt="Personal Care" />
          </Link>
          <BoxTitle>Personal Care</BoxTitle>
          <BoxLink href="/products/personal-care">See All Personal Care</BoxLink>
        </BoxItem>
      </Container>
    </Parent>
  );
};

export default ShopByCategory;
