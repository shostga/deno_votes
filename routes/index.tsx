import { Head } from "https://deno.land/x/fresh@1.2.0/runtime.ts";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    const form = await req.formData();
    const question = form.get("question")?.toString();
    const optionOne = form.get("option_1")?.toString();
    const optionTwo = form.get("option_2")?.toString();

    const payload = {
      id: crypto.randomUUID(),
      question,
      optionOne,
      optionTwo,
      optionOneVotes: 0,
      optionTwoVotes: 0,
    };
    const kv = await Deno.openKv();
    await kv.set([payload.id], JSON.stringify(payload));
    const headers = new Headers();
    headers.set("location", `/questions/${payload.id}`);

    return new Response(null, {
      status: 302,
      headers,
    });
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Deno Links</title>
      </Head>
      <div class="p-10 mx-auto max-w-screen-md flex flex-col items-center">
        <h1 class="text-4xl font-medium">Deno Vote</h1>
        <form class="mt-5 flex-col flex item-center" method="post">
          <label class="mt-10 text-2xl font-medium mb-5">
            What is your question?
          </label>
          <input
            required
            type="text"
            name="question"
            placeholder="JavaScript is better than TypeScript"
            class="border-2 w-full border-gray-800 rounded-md mb-2 p-2"
          />
          <div className={"flex mb-5 mt-2.5 gap-5"}>
            <div class="flex flex-col gap-2 items-center">
              <label class="font-medium text-lg">Option 1</label>
              <input
                required
                type="text"
                name="option_1"
                placeholder="Yes"
                class="border-2 w-full border-gray-800 rounded-md mb-2 p-2"
              />
            </div>
            <div class="flex flex-col gap-2 items-center">
              <label class="font-medium text-lg">Option 2</label>
              <input
                required
                type="text"
                name="option_2"
                placeholder="No"
                class="border-2 w-full border-gray-800 rounded-md mb-2 p-2"
              />
            </div>
          </div>
          <button class="w-full bg-gray-800 text-white text-xl rounded-md mb-2 p-2">
            Ask away
          </button>
        </form>
      </div>
    </>
  );
}
