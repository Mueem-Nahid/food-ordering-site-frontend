import React from "react";
import {Container} from "@mui/system";
import {Box, Grid} from "@mui/material";
/* image import removed, use public path */
import {Facebook, Instagram, YouTube} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
/* image import removed, use public path */
/* image import removed, use public path */

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <Container>
        <Grid
          container
          sx={{marginBottom: "5rem"}}
          spacing={4}
          justifyContent="center"
          alignItems="center"
          gridTemplateColumns={{xs: 12, sm: 12, md: 12}}
        >
          <Grid
            sx={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box>
              <Image src="/images/deshi-q-logo.jpeg" height={70} width={70} alt="DeshiQ" style={{ borderRadius: "50%" }}/>
            </Box>
          </Grid>
          <Grid className="footer-box-cont" sx={{alignItems: "center"}}>
            <Box id="footer-box"></Box>
          </Grid>
          <Grid sx={{textAlign: "center"}}>
            <span>Find Us On</span>
            <div className="footer-icons" style={{marginTop: "1rem"}}>
              <div className="icon-item">
                <Link href="/" className="youtube">
                  <YouTube fontSize="large"/>
                </Link>
              </div>
              <div className="icon-item">
                <Link href="/" className="insta">
                  <Instagram fontSize="large"/>
                </Link>
              </div>
              <div className="icon-item">
                <Link href="/" className="fb">
                  <Facebook fontSize="large"/>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={17}
          gridTemplateColumns={{xs: 12, sm: 12, md: 12}}
          justifyContent="center"
        >
          <div>
            <div>
              <strong>Information</strong>
            </div>
            <div className="footer-links">
              <Link href="/">About Us</Link>
            </div>
            <div className="footer-links">
              <Link href="/">Mitao Bhook</Link>
            </div>
            <div className="footer-links">
              <Link href="/">Privacy</Link>
            </div>
            <div className="footer-links">
              <Link href="/">Careers</Link>
            </div>
          </div>
          <div>
            <div>
              <strong>Location</strong>
            </div>
            <div className="footer-links">
              <Link href="/">Contact Us</Link>
            </div>
          </div>
          <div>
            <div>
              <strong>Get In Touch</strong>
            </div>
            <div className="footer-links">
              <Link href="/">Terms & Conditions</Link>
            </div>
          </div>
          <div>
            <div>
              <img src="/images/app-store.png" alt="App Store"/>
            </div>
            <div className="footer-links">
              <img src="/images/google-store.png" alt="Google Store"/>
            </div>
          </div>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
