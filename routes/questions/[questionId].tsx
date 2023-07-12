import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

interface Question {
  id: string;
  question: string;
  optionOne: string;
  optionTwo: string;
  optionOneVotes: number;
  optionTwoVotes: number;
}

export const handler: Handlers<Question> = {
  async GET(req, ctx) {
    const kv = await Deno.openKv();
    const question = await kv.get<string>([ctx.params.questionId]);
    if (question.value === null) {
      return new Response(null, {
        status: 404,
      });
    }
    return ctx.render(JSON.parse(question.value));
  },
};

export default function Question(props: PageProps<Question>) {
  return (
    <>
      <Head>
        <title>{props.data.question}</title>
      </Head>
      <div class="p-10 mx-auto max-w-screen-sm flex flex-col items-center">
        <h1 class="text-4xl mb-10 font-defium">{props.data.question}</h1>
        <Button
          questionId={props.data.id}
          votes={props.data.optionOneVotes}
          option={props.data.optionOne}
          optionNumber={1}
        />
        <Button
          questionId={props.data.id}
          votes={props.data.optionTwoVotes}
          option={props.data.optionTwo}
          optionNumber={2}
        />
      </div>
    </>
  );
}
