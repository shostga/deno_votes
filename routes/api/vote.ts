import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  if (req.method == "POST") {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (id && option) {
      const kv = await Deno.openKv();
      const question = await kv.get<string>([id]);
      if (question.value !== null) {
        const questionObj = JSON.parse(question.value);
        await kv.set(
          [id],
          JSON.stringify({
            ...questionObj,
            ...(option === "1" && {
              optionOneVotes: questionObj.optionOneVotes + 1,
            }),
            ...(option === "2" && {
              optionTwoVotes: questionObj.optionTwoVotes + 1,
            }),
          })
        );
        return new Response(null, { status: 200 });
      }
    }
  }
};
