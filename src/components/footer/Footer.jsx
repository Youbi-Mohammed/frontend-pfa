"use client"

import { Box, Typography, Link, Container, IconButton } from "@mui/material"
import { styled } from "@mui/material/styles"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"

const FooterContainer = styled(Box)({
  backgroundColor: "#ffffff",
  borderTop: "1px solid #e6f2f2",
  padding: "24px 0 16px 0",
  marginTop: "auto",
  fontFamily: "'Inter', sans-serif",
})

const FooterContent = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    textAlign: "center",
    gap: "12px",
  },
})

const FooterBrand = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    gap: "8px",
  },
})

const BrandText = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  color: "#1a1a1a",
  letterSpacing: "-0.2px",
})

const FooterLinks = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "24px",
  "@media (max-width: 768px)": {
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
})

const FooterLink = styled(Link)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  color: "#4a4a4a",
  textDecoration: "none",
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    color: "#2d7a7a",
    textDecoration: "none",
  },
})

const SocialSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "8px",
})

const SocialIconButton = styled(IconButton)({
  width: "32px",
  height: "32px",
  backgroundColor: "#f8fafa",
  color: "#4a9a9a",
  border: "1px solid #e6f2f2",
  borderRadius: "6px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#2d7a7a",
    color: "#ffffff",
    borderColor: "#2d7a7a",
    transform: "translateY(-1px)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "16px",
  },
})

const CopyrightText = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "12px",
  color: "#6bb6b6",
  textAlign: "center",
  marginTop: "16px",
  paddingTop: "16px",
  borderTop: "1px solid #f1f5f9",
})

const UniversityInfo = styled(Typography)({
  fontFamily: "'Inter', sans-serif",
  fontSize: "12px",
  color: "#4a4a4a",
  fontWeight: 500,
})

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <FooterContent>
          <FooterBrand>
            <BrandText>PFA Management System</BrandText>
            <UniversityInfo>ENSAO - Mohammed First University</UniversityInfo>
          </FooterBrand>

          <FooterLinks>
            <FooterLink href="#">About</FooterLink>
            <FooterLink href="#">Support</FooterLink>
            <FooterLink href="#">Documentation</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
          </FooterLinks>

          <SocialSection>
            <SocialIconButton href="#" aria-label="LinkedIn">
              <LinkedInIcon />
            </SocialIconButton>
            <SocialIconButton href="#" aria-label="GitHub">
              <GitHubIcon />
            </SocialIconButton>
            <SocialIconButton href="#" aria-label="Twitter">
              <TwitterIcon />
            </SocialIconButton>
            <SocialIconButton href="#" aria-label="Facebook">
              <FacebookIcon />
            </SocialIconButton>
          </SocialSection>
        </FooterContent>

        <CopyrightText>© {currentYear} ENSAO. All rights reserved. Built with care for academic excellence.</CopyrightText>
      </Container>
    </FooterContainer>
  )
}

export default Footer
