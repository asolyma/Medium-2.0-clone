import { sanityClient } from "../lib/sanity.server";
import { urlFor } from "../lib/sanity";
/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { Post } from "../types/types";
import Link from "next/link";
interface HomeProps {
  posts: Post[];
}
const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <div className="">
      <Head>
        <title>Medium Blog</title>
        <link rel="iocn" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-20 max-w-7xl mx-auto">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to read ,write and connect
          </h1>
          <h2>
            It is easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>
        <img
          className="hidden md:inline-flex h-32 lg:h-52 py-2 px-10"
          src="/M.png"
          alt=""
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
        {posts.map((post) => {
          return (
            <Link key={post._id} passHref href={`/post/${post.slug.current}`}>
              <div className="border rou group cursor-pointer overflow-hidden ">
                <img
                  className="h-60 w-full object-cover group-hover:scale-105 transition-transform ease-in-out "
                  src={urlFor(post.mainImage).url()}
                  alt=""
                />
                <div className="flex justify-between p-5 bg-white">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-xs">
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `
  *[_type=="post"]{
    _id,
     title,
     mainImage,
    slug,
     description,
     author -> {name,image}
   }
  `;
  try {
    const posts = await sanityClient.fetch(query);
    return {
      props: { posts },
    };
  } catch (error: any) {
    console.log(error.response.body.error.description);

    return {
      props: {},
    };
  }
};
