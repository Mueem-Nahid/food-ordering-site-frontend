import React from "react";
import {Container, Stack, Box} from "@mui/material";
import {Facebook, Instagram} from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer id="footer">
      <Container>
        <Stack
          direction={{xs: "column", sm: "row"}}
          spacing={{xs: 2, sm: 4, md: 6}}
          sx={{marginBottom: {xs: "2rem", md: "5rem"}}}
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{textAlign: "center"}}>
            <Image src="/images/deshi-q-logo.jpeg" height={70} width={70} alt="DeshiQ" style={{ borderRadius: "50%" }}/>
          </Box>
          <Box className="footer-box-cont" sx={{display: {xs: "none", md: "flex"}, alignItems: "center"}}>
            <Box id="footer-box"></Box>
          </Box>
          <Box sx={{textAlign: "center"}}>
            <span>Find Us On</span>
            <Stack direction="row" spacing={2} sx={{marginTop: "1rem", justifyContent: "center"}}>
              <Link target="_blank" href="https://www.instagram.com/deshiq__/" className="insta">
                <Instagram fontSize="large"/>
              </Link>
              <Link target="_blank" href="https://www.facebook.com/profile.php?id=61585522453607" className="fb">
                <Facebook fontSize="large"/>
              </Link>
            </Stack>
          </Box>
        </Stack>
        <Stack
          direction={{xs: "column", sm: "row"}}
          spacing={{xs: 3, sm: 6, md: 10}}
          justifyContent={{xs: "flex-start", sm: "center"}}
        >
          <Box>
            <Box>
              <strong>Information</strong>
            </Box>
            <Box className="footer-links">
              <Link href="/about">About Us</Link>
            </Box>
            <Box className="footer-links">
              <Link href="/privacy">Privacy</Link>
            </Box>
          </Box>
          <Box>
            <Box>
              <strong>Location</strong>
            </Box>
            <Box className="footer-links">
              <Link href="/contact">Contact Us</Link>
            </Box>
          </Box>
          <Box>
            <Box>
              <strong>Get In Touch</strong>
            </Box>
            <Box className="footer-links">
              <Link href="/terms">Terms & Conditions</Link>
            </Box>
          </Box>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
