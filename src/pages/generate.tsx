import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { FormGroup } from "~/component/FormGroup";
import { Input } from "~/component/Input";
import { api } from "~/utils/api";
import Image from "next/image";
import { Button } from "~/component/Button";

const colours = [
  "blue",
  "red",
  "pink",
  "green",
  "orange",
  "yellow",
  "white",
  "black",
];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    colour: "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("mutation finished", data.imageUrl);
      if (!data.imageUrl) return;
      setImageUrl(data.imageUrl);
    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    generateIcon.mutate(form);
    setForm((prev) => ({ ...prev, prompt: "" }));
  }

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  return (
    <>
      <Head>
        <title>Generate Icons</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto mt-24 flex min-h-screen flex-col gap-4 px-8">
        <h1 className="text-6xl">Generate your Icons</h1>
        <p className="mb-12 text-2xl">
          Fill out the form below to start generating your Icons
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <h2 className="text-xl">
            1. Decribe what you want your icon to look like.
          </h2>
          <FormGroup className="mb-12">
            <label>Prompt</label>
            <Input value={form.prompt} onChange={updateForm("prompt")}></Input>
          </FormGroup>

          <h2 className="text-xl">2. Pick your icon colour</h2>
          <FormGroup className="mb-12 grid grid-cols-4">
            {colours.map((colour) => (
              <label key={colour} className="flex gap-2 text-2xl">
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

          <Button
            isLoading={generateIcon.isLoading}
            disabled={generateIcon.isLoading}
          >
            Submit
          </Button>
        </form>

        {imageUrl && (
          <>
            <h2 className="text-xl">Your Icons</h2>
            <section className="mb-12 grid grid-cols-4 gap-4">
              <Image
                src={imageUrl}
                alt="an image of your generated prompt"
                width="512"
                height="512"
                className="w-full"
              />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
