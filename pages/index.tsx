import Blogs from "../components/blogs";
import { NextSeo } from "next-seo";


export default function Home() {

  return (
    <>
    <NextSeo
      description="This is Blog application Home page..All blogs from different author will be appear here.."
    />
      <h1>WELCOME TO THE BLOG</h1>
      <br />
      <br />

      <div>
        <Blogs />
      </div>
    </>
  );
}
