import { siteConfig } from "@/config/site";
import { getUserAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SetupProfileForm from "../_components/setup-profile";
import { getUserInfo } from "../_data-access/server";

export const metadata = {
  title: `Setup Your Profile on ${siteConfig.name}`,
  description: `Setup your ${siteConfig.name} account`,
};

export default async function page() {
  const { session } = await getUserAuth();
  const userInfo = await getUserInfo(session?.user.id);

  if (!userInfo) {
    redirect("/login");
  }

  return <SetupProfileForm userInfo={userInfo} />;
}
