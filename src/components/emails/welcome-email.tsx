import { env } from "@/config/env";
import { siteConfig } from "@/config/site";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = env.BASE_URL;

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>{siteConfig.description}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width="170"
          height="50"
          alt="Koala"
          style={logo}
        />
        <Text style={paragraph}>Hi,</Text>
        <Text style={paragraph}>
          Welcome to {siteConfig.name}, {siteConfig.description}
        </Text>
        <Section style={btnContainer}>
          Kindly setup your profile by clicking on the button below.
          <Button style={button} href={`${siteConfig.url}/login`}>
            Get started
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The {siteConfig.name} team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Internet</Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
