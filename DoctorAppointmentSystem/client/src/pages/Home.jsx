import React from 'react';
import Slider from '../components/Slider/Slider';
import Facility from '../components/Static/Facility/Facility';
import ShortIntro from '../components/Static/ShortIntro/ShortIntro';
import WhyChoose from '../components/Static/WhyChoose/WhyChoose';

const Home = () => {
  return (
    <div>
      <Slider />
      <Facility />
      <ShortIntro />
      <WhyChoose />
    </div>
  );
};

export default Home;
