import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
// import ImageSlider from "~/component/ImageSlider";
import { PrimaryLinkButton } from "~/component/PrimaryLinkButton";

function HeroBanner() {
  const { data: sessionData } = useSession();

  // const images = [
  //   "/horse.jpg",
  //   "/horse1.jpg",
  //   "/horse2.jpg",
  //   "/horse3.jpg",
  //   "/horse4.jpg",
  //   "/horse5.jpg",
  // ];

  const image = "/logos.jpg";

  return (
    <>
      <section className="mb-24 mt-12 grid grid-cols-1 gap-12 px-8 text-center md:gap-40 lg:mt-24 lg:grid lg:grid-cols-2 lg:text-left">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold lg:text-2xl ">
            {sessionData && <span>Kia Ora {sessionData.user?.name}!</span>}
          </h1>
          <h1 className="text-4xl font-bold lg:text-6xl ">
            Generate Logos for your business at the click of a button
          </h1>
          <p className="mt-8 text-xl lg:text-2xl">
            Use AI to generate logos in seconds instead of paying a designer and
            waiting for them to create them for you.
          </p>
          <PrimaryLinkButton href="/generate" className="mt-12 xl:self-start">
            Generated your logo now!
          </PrimaryLinkButton>
        </div>
        <div className=" grid items-center md:m-0 xl:ml-12 xl:items-start">
          {/* <ImageSlider images={images} /> */}
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
      <main className="container mx-auto flex flex-col items-center justify-center">
        <HeroBanner />
      </main>
    </>
  );
};

export default HomePage;
