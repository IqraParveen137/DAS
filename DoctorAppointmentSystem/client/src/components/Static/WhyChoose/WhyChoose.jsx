import React from 'react';
import image1 from '../../../assets/images/excellence.png';
import image3 from '../../../assets/images/wellness.png';
import image2 from '../../../assets/images/trust.png';
import './WhyChoose.css';

const WhyChoose = () => {
  return (
    <>
      <h1 className='text-center mt-5'>Why Choose Us?</h1>
      <div className='row why-container'>
        <div className='col-md-3'>
          <img src={image1} alt='image1' width='150px' />
          <h2>Personalize Excellence</h2>
          <p>
            By matching individual needs with seamless access, the system
            ensures every patient feels seen, heard, and valued from the very
            first click.
          </p>
        </div>
        <div className='col-md-3'>
          <img src={image2} alt='image2' width='150px' />
          <h2>Trusted Care</h2>
          <p>
            By combining clinical precision with a human touch, a system ensures
            patients feel secure, supported, and confident that their health is
            in the most capable hands
          </p>
        </div>
        <div className='col-md-3'>
          <img src={image3} alt='image3' width='150px' height='150px' />
          <h2>Empowering Wellness</h2>
          <p>
            By providing the tools and insights for patients to engineer their
            own health, every interaction becomes a direct step toward lifelong
            vitality.
          </p>
        </div>
      </div>
    </>
  );
};

export default WhyChoose;
