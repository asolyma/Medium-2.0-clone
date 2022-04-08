/* eslint-disable @next/next/no-img-element */
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  NextPage,
} from "next";
import Link from "next/link";
import PortableText from "react-portable-text";
import Header from "../../components/Header";
import { urlFor } from "../../lib/sanity";
import { sanityClient } from "../../lib/sanity.server";
import { Post } from "../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Spinner from "../../components/Spinner";
interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}
const Post: NextPage<{ slug: Post }> = ({ slug }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const onSubmitFunc: SubmitHandler<IFormInput> = async (data) => {
    try {
      setloading(true);
      const response = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setloading(false);
      setSubmitted(true);
    } catch (error) {
      setloading(false);
      setError(true);
      console.log(error);
    }
  };
  return (
    <main>
      <Header />
      <img
        className="h-40 w-full object-cover"
        src={urlFor(slug.mainImage).url()}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-4xl mt-10 mb-3">{slug.title}</h1>
        <h2 className="text-gray-500 text-xl font-light mb-2">
          {slug.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            src={urlFor(slug.author.image).url()}
            className="h-10 w-10 rounded-full"
            alt=""
          />
          <p className="font-extralight">
            Blogpost by
            <span className="text-green-600"> {slug.author.name}</span>{" "}
            published at {new Date(slug._createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            content={slug.body}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold my-5" {...props} />
              ),
              h2: (props: any) => (
                <h2 className="my-5 text-xl font-bold" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <Link href={href}>
                  <a className="text-blue-600 hover:underline">{children}</a>
                </Link>
              ),
            }}
          />
        </div>
      </article>
      <hr className="border border-yellow-400 max-w-lg my-5 mx-auto" />
      {!submitted && (
        <form
          action=""
          className=" flex flex-col  max-w-2xl p-5 mb-10 mx-auto"
          onSubmit={handleSubmit(onSubmitFunc)}
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below</h4>
          <hr className="mt-2 py-3" />
          <input
            {...register("_id")}
            type={"hidden"}
            name="_id"
            value={slug._id}
          />
          <label htmlFor="name" className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              placeholder="Will Smith"
              id="name"
              type={"text"}
              className="shadow border rounded px-3 py-2 form-input mt-1 block w-full focus:ring ring-yellow-400"
            />
          </label>
          <label htmlFor="name" className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              placeholder="Will Smith"
              id="name"
              type={"email"}
              className="shadow border rounded px-3 py-2 form-input mt-1 block w-full focus:ring ring-yellow-400 form-textarea "
            />
          </label>
          <label htmlFor="Comment" className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              rows={8}
              id="Comment"
              className="border rounded shadow block focus:ring ring-yellow-400 PX-3 PY-2 rouned w-full"
            />
          </label>
          <button
            disabled={loading}
            type="submit"
            className="outline-none justify-center text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5  text-center mr-2  inline-flex items-center w-full py-3"
          >
            {loading ? (
              <svg
                role="status"
                className="inline mr-3 w-4 h-4 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </button>

          <div>
            {error ? (
              <div>OOps Somthing wwent Wrong try agin later 🙄</div>
            ) : (
              ""
            )}
          </div>
          <div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message} </p>
            )}
          </div>
          <div>
            {errors.email && (
              <p className="text-red-500 text-sm">name is required</p>
            )}
          </div>
          <div>
            {errors.comment && (
              <p className="text-red-500 text-sm">
                {errors.comment.ref?.name} is {errors.comment.type}
              </p>
            )}
          </div>
        </form>
      )}

      {submitted && (
        <div className="bg-yellow-400 text-white max-w-2xl mx-auto p-10 mt-5">
          <h3 className="font-bold text-3xl">Thank you for submitting</h3>
          <p>your comment will show below after bieng approved</p>
        </div>
      )}
      {/**
       * comments
       */}
      <div className="flex flex-col p-10 my-10 max-w-2xl shadow-yellow-400 shadow space-y-2 mx-auto">
        <h3 className="text-4xl">Comments</h3>
        <hr />
        {slug.comments?.map((comment) => {
          return (
            <div key={comment._id}>
              <p>
                <span className="text-yellow-500"> {comment.name}</span>:{" "}
                {comment.comment}
              </p>
            </div>
          );
        })}
      </div>
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
     _createdAt,
     title,
     author -> {name,image},
   'comments':*[
     _type=="comment" 
     && post._ref==^._id
     && approved==true
   ],
    slug,
     body,
     description,
     mainImage,
   
   }
    `;

  try {
    const slug = await sanityClient.fetch(query, { slug: params?.slug });
    return {
      props: { slug },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};
export default Post;
