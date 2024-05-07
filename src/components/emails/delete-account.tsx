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

const baseUrl = env.BASE_URL;

type DeleteAccountEmailProps = {
  firstName: string;
};

export const DeleteAccountEmail = ({
  firstName,
}: DeleteAccountEmailProps) => (
  <Html>
    <Head />
    <Preview>{siteConfig.description}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.png`}
          width="170"
          height="50"
          alt=""
          style={logo}
        />
        <Text style={paragraph}>Hi, {firstName}</Text>
        <Text style={paragraph}>
          We are sad to see you leave {siteConfig.name} 😿
        </Text>
        <Section style={btnContainer}>
          <Text style={paragraph}>
            Know that this is not the end for us, you can always come back
            anytime you want.
          </Text>
          <Text style={paragraph}>
            Anyways, if you happen to change your mind about leaving, you can
            login to your account and cancel the delete process.
          </Text>
        </Section>

        <Section>
          <Text style={paragraph}>
            To cancel the delete process, Login here
          </Text>
          <Button style={button} href={`${baseUrl}/login`}>
            Login
          </Button>
          <Hr style={hr} />
          <Text style={paragraph}>
            Note: Only when you did not login to your account within 7 days
            after initiating a delete that we would delete your account
            automatically.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The {siteConfig.name} team.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Internet</Text>
      </Container>
    </Body>
  </Html>
);

export default DeleteAccountEmail;

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
