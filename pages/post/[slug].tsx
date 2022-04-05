import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from "next";
import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity.server";
import { Post } from "../../types/types";
const post: NextPage<{ slug: Post }> = ({ slug }) => {
  return (
    <main>
      <img src={urlFor(slug.mainImage).url()} alt="" />
    </main>
  );
};
export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
    *[_type=="post"]{
        _id,
        slug,
         description,
         author -> {name,image}
       }
    `;
  const posts = await sanityClient.fetch(query);
  const _paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });
  return {
    paths: _paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
    *[_type=="post" && slug.current ==$slug][0]{
        _id,
        slug,
         body,
         description,
         mainImage,
         author -> {name,image}
       }
    `;

  try {
    const slug = await sanityClient.fetch(query, { slug: params?.slug });
    console.log(slug, "ssss");
    return {
      props: { slug },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
export default post;
