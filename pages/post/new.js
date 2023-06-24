import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { AppLayout } from "../../components/AppLayout";
import { useState } from "react";
import { useRouter } from "next/router";
import { getAppProps } from "../../utils/getAppProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBrain, faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function NewPost(props) {
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch(`/api/generatePost`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ topic, keywords }),
      });
      const json = await response.json();

      if (json?.postId) {
        router.push(`/post/${json.postId}`);
      }
    } catch (e) {
      setGenerating(false);
    }
  };
  return (
    <div className="h-screen overflow-hidden">
      {!!generating && (
        <div className=" grid h-screen place-items-center">
          {" "}
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      {!generating && (
        <div className="min-h-screen grid place-items-center overflow-auto mx-2">
          <form
            onSubmit={handleSubmit}
            className="card card-bordered border-base-content bg-base-100 w-fit shadow-xl p-10 "
          >
            <div className="mb-5 ">
              <label className="label grid place-content-center mb-4">
                <span className="label-text text-md font-semibold ">Topic</span>
              </label>
              <textarea
                placeholder="Top 10 tips for happiness"
                className="textarea border-base-content w-full"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={80}
              />
            </div>
            <div className="mb-10">
              <label className="label grid place-content-center mb-4">
                <span className="label-text text-md font-semibold ">
                  Keywords (Seperate with comma)
                </span>
              </label>
              <textarea
                placeholder="happines, self-steem, Anthony Robins"
                className="textarea w-full border-base-content"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                maxLength={80}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block "
              disabled={!topic.trim() || !keywords.trim()}
            >
              Generate
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
