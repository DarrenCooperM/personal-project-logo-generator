import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Button } from "~/component/Button";
import { FormGroup } from "~/component/FormGroup";
import { Input } from "~/component/Input";
import { api } from "~/utils/api";
import { FiDownload } from "react-icons/fi";

const colours = [
  "blue",
  "red",
  "orange",
  "purple",
  "yellow",
  "pink",
  "green",
  "teal",
  "grey",
  "black",
  "light green",
];

const shapes = ["square", "circle", "rounded"];

const styles = [
  "metallic",
  "polygon",
  "pixelated",
  "clay",
  "gradient",
  "flat",
  "illustrated",
  "minimalistic",
  "hand-drawn",
  "watercolor",
  "isometric",
  "neon",
  "cartoonish",
  "3D",
  "pop-art",
  "doodle",
  "grunge",
  "sticket",
  "realistic",
  "mosaic",
  "origami",
  "chalkboard",
  "woodcut",
];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    company: "",
    colour: "",
    shape: "",
    style: "",
    numberOfIcons: "1",
  });
  const [error, setError] = useState("");
  const [imagesUrl, setImagesUrl] = useState<{ imageUrl: string }[]>([]);

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImagesUrl(data);
    },
    onError(error) {
      setError(error.message);
    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    generateIcon.mutate({
      ...form,
      numberOfIcons: parseInt(form.numberOfIcons),
    });
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  function handleDownload(imageUrl: string) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Head>
        <title>Generate Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-24 flex min-h-screen flex-col gap-4 px-8">
        <h1 className="text-6xl">Generate your icons</h1>
        <p className="mb-12 text-2xl">
          Fill out the form below to start generating your icons.
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2 className="text-2xl ">1. What business is your industry in?</h2>
          <FormGroup className="mb-12">
            <Input
              placeholder="e.g. Technology, Telecommunications"
              required
              value={form.company}
              onChange={updateForm("company")}
            ></Input>
          </FormGroup>

          <h2 className="text-2xl ">
            2. Describe what your want your logo to look like.
          </h2>
          <FormGroup className="mb-12">
            <Input
              placeholder="e.g. a single letter or a rainbow"
              required
              value={form.prompt}
              onChange={updateForm("prompt")}
            ></Input>
          </FormGroup>

          <h2 className="text-2xl ">4. Pick your logo colour.</h2>
          <FormGroup className="mb-12 flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid md:grid-cols-4">
            {colours.map((colour) => (
              <label
                key={colour}
                className=" flex items-center gap-2 text-2xl sm:text-xl md:mb-0 md:text-xl"
              >
                <input
                  required
                  type="radio"
                  name="colour"
                  checked={colour === form.colour}
                  onChange={() => setForm((prev) => ({ ...prev, colour }))}
                ></input>
                {colour}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-2xl ">5. Pick your logo shape.</h2>
          <FormGroup className="mb-12 flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid md:grid-cols-4">
            {shapes.map((shape) => (
              <label
                key={shape}
                className=" flex items-center gap-2 text-2xl sm:text-xl md:mb-0 md:text-xl"
              >
                <input
                  required
                  type="radio"
                  name="shape"
                  checked={shape === form.shape}
                  onChange={() => setForm((prev) => ({ ...prev, shape }))}
                ></input>
                {shape}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-2xl ">6. Pick your logo style.</h2>
          <FormGroup className="mb-12 flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid md:grid-cols-4">
            {styles.map((style) => (
              <label
                key={style}
                className=" flex items-center gap-2 text-2xl sm:text-xl md:mb-0 md:text-xl"
              >
                <input
                  required
                  type="radio"
                  name="style"
                  checked={style === form.style}
                  onChange={() => setForm((prev) => ({ ...prev, style }))}
                />
                {style}
              </label>
            ))}
          </FormGroup>

          <h2 className="text-xl">5. How many do you want.</h2>
          <FormGroup className="mb-12">
            <label>Number of icons</label>
            <Input
              inputMode="numeric"
              pattern="[1-9]|10"
              value={form.numberOfIcons}
              required
              onChange={updateForm("numberOfIcons")}
            ></Input>
          </FormGroup>

          {error && (
            <div className="rounded bg-red-500 p-8 text-xl text-white">
              {error}
            </div>
          )}

          <Button
            isLoading={generateIcon.isLoading}
            disabled={generateIcon.isLoading}
          >
            Generate
          </Button>
        </form>

        {imagesUrl.length > 0 && (
          <>
            <h2 className="text-xl">Your Icons</h2>
            <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {imagesUrl.map(({ imageUrl }) => (
                <div key={imageUrl}>
                  <div className="relative">
                    <Image
                      src={imageUrl}
                      alt="an image of your generated prompt"
                      width="1024"
                      height="1024"
                      className="w-full rounded-xl"
                    />
                    <FiDownload
                      className="absolute right-0 top-0 cursor-pointer text-3xl text-white hover:text-black dark:text-white dark:hover:text-black"
                      onClick={() => handleDownload(imageUrl)}
                    />
                  </div>
                </div>
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
