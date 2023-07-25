import { NextPage } from "next";
import { useContext, useEffect } from "react";
import Details from "../../components/Page/Details";
import { SITE_URL } from "../../lib/constants";
import Head from "next/dist/shared/lib/head";
import { useRouter } from "next/router";
import { MainContext } from "../../contexts/MainContext";

export const getServerSideProps = async (context: any) => {
  const result = await fetch(`${SITE_URL}api/pages/${context.params.slug}`);
  const res = await result.json();

  return {
    props: {
      slug: context.params.slug,
      page_data: res,
    },
  };
};

const Page: NextPage = ({ slug, page_data }: any) => {
  let route = useRouter();
  const { setIsLoading } = useContext(MainContext);
  useEffect(() => {
    setIsLoading(false);
    if (
      page_data.redirect != undefined &&
      page_data.page_type == "redirect_target"
    ) {
      route.push(`/${page_data.redirect.target_url}`);
    }
  }, [slug, page_data, setIsLoading, route]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        {page_data.page != undefined && (
          <>
            <title>{`${page_data.page.meta_title}`}</title>
            <meta
              name="description"
              content={page_data.page.meta_description}
            />
            <meta
              name="keywords"
              content={page_data.page.meta_keywords}
            />
          </>
        )}
      </Head>
      {slug != undefined && slug != false && (
        <Details
          page={page_data.page}
          slug={slug}
        />
      )}
    </>
  );
};

export default Page;
