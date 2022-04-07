// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { config } from "../../lib/config";
import sanityClient from "@sanity/client";
type Data = {
  name: string;
};
const client = sanityClient(config);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body);
  try {
    const obj = await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      comment,
    });
    return res.status(200).send(JSON.stringify(obj));
  } catch (error: any) {
    return res.status(500).send({ msg: error.message });
  }
}
