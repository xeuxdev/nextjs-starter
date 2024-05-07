import { env } from "@/config/env";
import { siteConfig } from "@/config/site";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerifyEmailProps {
  verificationCode?: string;
}

const baseUrl = env.BASE_URL;

export default function VerifyEmail({
  verificationCode = "596853",
}: VerifyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview> Email Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`${baseUrl}/logo.png`}
                width="75"
                height="45"
                alt="'s Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your email address</Heading>
              <Text style={mainText}>
                Thanks for signing up on {siteConfig.name}. <br /> We want to
                make sure it&apos;s really you. Please click on the link below
                to verify your email. If you don&apos;t want to proceed, you can
                ignore this message.
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>Verification Link</Text>

                <Button
                  style={button}
                  href={`${baseUrl}/verify-account/${verificationCode}`}
                >
                  Verify Email
                </Button>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                {siteConfig.name} will never email you and ask you to disclose
                or verify your password.
              </Text>
            </Section>
          </Section>
          <Section>
            <Text style={footerText}>
              <Link href={baseUrl} target="_blank" style={link}>
                {siteConfig.name}
              </Link>{" "}
              |{" "}
              <Link href={`${baseUrl}/privacy`} target="_blank" style={link}>
                privacy policy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
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

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: "bold",
  textAlign: "center" as const,
};

const verificationSection = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px", paddingTop: "20px" };
