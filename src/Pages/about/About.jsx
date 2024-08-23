import React, { useState } from 'react';
import { Box, Grid, Tab, Tabs, Typography, styled } from '@mui/material';

// Styled components
const Banner = styled('div')({
  width: '100%',
  height: '50vh',
  backgroundImage: 'url("/assets/About/about-banner-1.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
});

const BannerContent = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
});

const BannerHeader = styled(Typography)(({theme}) => ({
  fontSize: '2.5rem',
  marginBottom: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  borderBottom: `1px solid ${theme.palette.secondary.main}`,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  borderColor: 'white',
  width: '200px',
  color: '#006666',
  '&:hover': {
    border: `1px solid ${theme.palette.secondary.main}`,
    color: 'white',
    backgroundColor: '#006666',
  },
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: '#006666',
    borderBottom: '2px solid white',
  },
  [theme.breakpoints.down('sm')]: {
    width: '10%',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
}));

const Header = styled(Typography)(({theme})=>({
  color: '#006666',
  fontSize: '26px',
  fontWeight: '600',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
  },
}));

const Description = styled(Typography)(({theme})=>({
  color: '#333333',
  fontSize: '18px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));

const tabPanelValues = {
  1: {
    header: "From Humble Beginnings",
    desc: `While riding through the forests of Burma, our founder, Mr. M. Manal, saw a villager pacify a restless elephant by feeding it the root of the plant Rauwolfia serpentina. Fascinated by the plant's effect on the elephant, he returned home to India to seek scientific evidence for why this particular plant would have such a beneficial, calming effect. Young Manal's mother gave him her bangles to sell so he could pursue his work, and Himalaya was born.
           Once he fully understood the science behind this special botanical, Mr. Manal bought a hand-operated, tablet-compressing machine and began his work. At night, his shoulders would ache from producing a few hundred tablets, one small tablet at a time. But his hard work paid off. This remarkable plant would later become Serpina, the world’s first anti-hypertensive drug in 1934.
           We remain in awe of the man who began our company, and the grandfather of our current CEO, Nabeel Manal. Himalaya’s legacy has always been one of researching nature and using the tools of modern science to develop and produce Ayurveda-based, pharmaceutical-grade herbal medicine products. And today, that legacy continues.
           Mr. Manal had a vision of helping people be well. Today, Himalaya Herbal Healthcare has turned a time-honored herbal tradition into a complete range of contemporary, proprietary formulas and single herbs products.`,
    src: "/assets/About/outStory-1.jpeg",
  },
  2: {
    header: "Our Roots",
    desc: `The herbs used in Himalaya Herbal Healthcare's scientific product line are also used in the world's oldest traditional system of medicine, Ayurveda, which dates back over 4,000 years.
           The word Ayurveda comes from the Sanskrit root words ayur, meaning “life” and veda, meaning “to know.” Ayurveda literally means "to know life,” or in the language of today, “the science of life.”
           Ayurveda had a profound, far-reaching influence on Traditional Chinese Medicine and the healthcare systems of many other countries and cultures that followed. Today, thanks to the dedicated efforts of Himalaya’s doctors and scientists, it’s been proven effective through scientific validation.
           Ayurveda acknowledges there are five elements that make up the universe and the human body; earth, water fire, air and space. It seeks to bring the constellation and characteristics of the three body types defined by those elements – the vata, pitta and kapha – back into balance through proper diet, herbal treatment, and emotional well-being.
           We’re proud of the ancient roots and our modern branches that allow us to continue unlocking the powerful healing benefits of Ayurveda, but our formulas are science-based and appropriate for all body types. They require no Ayurvedic knowledge to be used successfully.`,
    src: "/assets/About/ourRoot-2.jpeg",
  },
  3: {
    header: "Our Process",
    desc: `The complexity and timing of the entire seed-to-shelf process for Himalaya and for the plants themselves, is highlighted by three important mandates: purity, efficacy, and batch-to-batch consistency.
           We know the success of traditional plant medicine is based on several integral parts that extend from the most advanced agricultural research and practices, to extraction methodologies, to formulating approaches and dosage strategies.
           To accomplish all of this, Himalaya maintains total control over the farming, harvesting, research, manufacturing, and distribution of all our products.`,
    src: "/assets/About/ourProcess-3.jpeg",
  },
  4: {
    header: "Our Science",
    desc: `Himalaya's core interest has always been to ensure the health benefits of our herbal formulas and standalone solo herbs with product-specific, double-blind, placebo-controlled human clinical trials on all of our products.
           Our commitment to Ayurvedic principles, and research to produce natural, safe, and effective health products is driven by our soul mission, which is to help individual people maintain a healthy, long, and high-quality of life.
           We take pride in the fact that our formulas undergo years of primary research before we offer them to you. Our commitment to ensure we have product-specific science on hand before we launch a product into the marketplace is exceptional within the natural products industry.
           Himalaya has conducted over 1,200 clinical studies, many of which have been published in numerous, highly-regarded medical journals including The European Journal of Pharmacology, Phytotherapy Research, The Indian Journal of Clinical Practice, Australian Journal of Medical Herbalism, and JAMA, India.`,
    src: "/assets/About/ourScience-4.jpeg",
  },
  5: {
    header: "Certification for Environmental Management",
    desc: `Himalaya has taken several steps to conserve water, power and reduce pollution to meet National Quality Assurance (NQA) guidelines. The most significant achievement has been setting up a water treatment plant and sourcing water with low Total Dissolved Solids (TDS) externally. This has reduced Himalaya’s water consumption by as much as 10,000 liters a day.
           Himalaya has been awarded ISO-14001:2004 certification, the most recognized standard globally, for environment management. The certification is granted by National Quality Assurance (NQA), the UK's largest established certification body.`,
    src: "/assets/About/ourInitiatives-5.jpeg",
  },
};

const About = () => {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container>
      <Banner>
        <BannerContent>
          <BannerHeader variant="h1">Our Story</BannerHeader>
          <Typography variant="h6">
            Founded in 1930, Himalaya remains family owned with products offered in over 100 countries.
          </Typography>
        </BannerContent>
      </Banner>
      <Grid item xs={12}>
        <Box>
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <StyledTab value="1" label="OUR STORY" />
            <StyledTab value="2" label="OUR ROOTS" />
            <StyledTab value="3" label="OUR PROCESS" />
            <StyledTab value="4" label="OUR SCIENCE" />
            <StyledTab value="5" label="OUR INITIATIVES" />
          </StyledTabs>
          <ContentBox>
            <img
              src={tabPanelValues[value].src}
              alt={tabPanelValues[value].header}
              style={{ maxWidth: '60%', height: 'auto' }}
            />
            <div>
              <Header variant="h6">
                {tabPanelValues[value].header}
              </Header>
              <Description>
                {tabPanelValues[value].desc}
              </Description>
            </div>
          </ContentBox>
        </Box>
      </Grid>
    </Grid>
  );
};

export default About;
