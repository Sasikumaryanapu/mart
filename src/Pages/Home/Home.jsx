import { Link } from 'react-router-dom';
import { Box, Typography, Button, styled } from '@mui/material';
import ShopByCategory from '../shopbycategory/ShopByCategory';
import BestSeller from '../bestSeller/BestSeller';
import FollowUs from '../followUs/FollowUs';

const Banner = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '80vh',
  backgroundImage: 'url(/src/assets/Home/banner1.png)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    height: '50vh',
  },
}));

const BannerContent = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left:'0%',
  transform: 'translateY(-50%)',
  maxWidth: '80%',

}));

const BannerHeader = styled(Typography)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: '#333333',
  padding: theme.spacing(1, 2),
  fontWeight: 500,
  marginBottom: theme.spacing(2),
  borderRadius: '4px',

}));

const BannerText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const BannerButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(72, 202, 178)',
  color: 'white',
  padding: theme.spacing(1.5, 3),
  fontSize: '1.25rem',
  '&:hover': {
    backgroundColor: '#777777',
  },
  textDecoration: 'none',
}));

const Home = () => {
  return (
    <>
      <Banner>
        <BannerContent>
          <BannerHeader variant="h2">
            BERBERINE
          </BannerHeader>
          <BannerText variant="h6">
            Potent Plant-Based Support <br /> for Daily Wellness.
          </BannerText>
          <BannerButton
            component={Link}
            to="/overview/669ffdafd233551429073e1a"
          >
            Shop Now
          </BannerButton>
        </BannerContent>
      </Banner>
      <ShopByCategory />
      <BestSeller />
      <FollowUs />
    </>
  );
};

export default Home;
