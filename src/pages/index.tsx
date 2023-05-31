import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Body } from "~/component/Body";
import { GeneralInfo } from "~/component/GeneralInfo";
import { PrimaryLinkButton } from "~/component/PrimaryLinkButton";
import { Testimonials } from "~/component/Testimonials";

function HeroBanner() {
  const { data: sessionData } = useSession();

  const image = "/logos.jpg";

  return (
    <>
      <section className="mb-24 grid grid-cols-1 gap-12 rounded-lg p-20 px-8 text-center md:gap-40 lg:mt-0 lg:grid lg:grid-cols-2 lg:bg-black lg:bg-opacity-50 lg:text-left">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-xl font-bold lg:text-2xl ">
            {sessionData && <span>Kia Ora {sessionData.user?.name}!</span>}
          </h1>
          <h1 className="text-4xl font-bold lg:text-6xl ">
            Use AI to generate logos at the click of a button!
          </h1>
          <p className="mt-8 text-xl font-medium lg:text-2xl">
            Don&apos;t wait for a designer to make a logo, generate one now by
            clicking the &apos;Get Started&apos; button below!
          </p>
          <PrimaryLinkButton
            href="/generate"
            className="mt-12 text-center font-medium md:w-3/5 md:self-center"
          >
            GET STARTED
          </PrimaryLinkButton>
        </div>
        <div className=" grid items-center md:m-0 xl:ml-12 xl:items-start">
          <Image
            src={image}
            width={600}
            height={600}
            quality={100}
            alt="logo Image"
            className="flex items-center justify-center rounded-lg shadow-2xl"
          />
        </div>
      </section>
    </>
  );
}

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Logo Generator from MaoriWebDev</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/maori.jpg" />
      </Head>
      <div>
        <div className="custom-img flex items-center justify-center bg-cover bg-fixed bg-center lg:h-screen">
          <main className="container mx-auto flex flex-col items-center justify-center">
            <HeroBanner />
          </main>
        </div>
        <Body />
        <GeneralInfo />
        <Testimonials />
      </div>
    </>
  );
};

export default HomePage;
